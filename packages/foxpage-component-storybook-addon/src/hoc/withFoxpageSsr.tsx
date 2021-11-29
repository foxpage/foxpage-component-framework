import React, { useState, useRef, useEffect, useCallback, useMemo, ComponentType } from 'react';
import { FoxpageCtxOverridesProvider, useFoxpageContext } from '@foxpage/foxpage-component-context';
import { Context as RootContextType, StructureNode as StructureNodeType } from '@foxpage/foxpage-types';
import { useFoxpageSsrContext } from '../context/SsrProvider';
import { useStateRef } from '../hooks/useStateRef';

const RootCtx: RootContextType = {} as RootContextType;
const NodeData: StructureNodeType = {
  id: 'test-id',
  name: 'test-name',
  props: {},
} as StructureNodeType;

export type FoxpageComponentSsrContext<T = Record<string, never>> = T & RootContextType;
export type FoxpageComponentSsrNodeData<T = Record<string, never>> = StructureNodeType<T>;

export interface FoxpageSsrDecoratorOptions<C = Record<string, any>, T = Record<string, any>> {
  context?: Record<string, any>;
  ssrContext?: Partial<FoxpageComponentSsrContext<T>>;
  nodeData?: Partial<StructureNodeType<C>>;
}

type BeforeNodeBuildReturn<P> = Partial<P> | void | null | undefined;

export interface FoxpageComponentSsrLifecycle<C = Record<string, never>, T = Record<string, never>> {
  beforeNodeBuild?(
    ctx: FoxpageComponentSsrContext<T>,
    nodeData: FoxpageComponentSsrNodeData<C>,
  ): Promise<BeforeNodeBuildReturn<C>> | BeforeNodeBuildReturn<C>;
}

export type FoxpageComponent<C = Record<string, never>, T = Record<string, never>, RC = ComponentType<C>> = RC &
  FoxpageComponentSsrLifecycle<C, T>;

function callComponentInitialProps<C = Record<string, never>, T = Record<string, never>>(
  Component: FoxpageComponent<C, T>,
  ctxOptions: FoxpageComponentSsrContext<T>,
  nodeData: FoxpageComponentSsrNodeData<C>,
) {
  if (typeof Component.beforeNodeBuild === 'function') {
    return Promise.resolve(Component.beforeNodeBuild(ctxOptions, nodeData));
  }
  return Promise.resolve(undefined);
}

export const withFoxpageSsr = function <A = Record<string, any>, B = Record<string, any>>(
  ssrDecoratorOption: FoxpageSsrDecoratorOptions<A, B> = {},
) {
  return function <C = A, T = B>(Component: FoxpageComponent<C, T>): React.MemoExoticComponent<React.FC<C>> {
    // console.debug(`[withFoxpageSsr] "${Component.displayName || 'UnKnow'}":`, ssrDecoratorOption);
    const Wrapper: React.FC<C> = props => {
      const outerCtx = useFoxpageContext() as Record<string, any>;
      const outerSsrCtx = useFoxpageSsrContext();
      const [loaded, setLoaded] = useState(false);
      const [initialProps, setInitialProps, initialPropsRef] = useStateRef<{ [index: string]: any } | undefined>(
        undefined,
      );
      const [error, setError] = useState<Error | null>(null);
      const fallbackRef = useRef(<div>foxpage ssr loading...</div>);
      const { context = {}, ssrContext = {}, nodeData = {} } = ssrDecoratorOption;
      const callInitialProps = useCallback(
        async (ctxOptions: FoxpageComponentSsrContext<T>, nodeData: FoxpageComponentSsrNodeData<C>) => {
          if (initialPropsRef.current) {
            return Promise.resolve(initialPropsRef.current);
          }
          return callComponentInitialProps<C, T>(Component, ctxOptions, nodeData).then(initialProps => {
            if (typeof initialProps === 'object' && initialProps !== null) {
              setInitialProps(initialProps);
              console.debug(`[beforeNodeBuild return] "${Component.displayName || 'UnKnow'}":`, initialProps);
            }
            return initialProps;
          });
        },
        [],
      );
      const loadRef = useRef(() => {});
      // eslint-disable-next-line react-hooks/exhaustive-deps
      const load = () => {
        setLoaded(false);
        const mergedOptions = {
          ...RootCtx,
          ...outerSsrCtx,
          ...outerCtx,
          ...ssrContext,
          ...context,
        } as FoxpageComponentSsrContext<T>;
        const mergedNodeData = {
          ...NodeData,
          props,
          ...nodeData,
        } as FoxpageComponentSsrNodeData<C>;
        callInitialProps(mergedOptions, mergedNodeData)
          .then(() => {
            setError(null);
            setLoaded(true);
          })
          .catch((err: Error) => {
            setError(err);
            setLoaded(true);
          });
      };
      useMemo(() => {
        loadRef.current = load;
      }, [load]);
      useEffect(() => {
        // console.debug('[foxpage]: ssr wrapper, reset initialProps');
        setInitialProps(undefined);
        loadRef.current?.();
      }, [props, ssrContext, context]);
      return loaded ? (
        <FoxpageCtxOverridesProvider value={context}>
          <Component {...props} {...(initialProps || {})} />
        </FoxpageCtxOverridesProvider>
      ) : error ? (
        <pre>{error}</pre>
      ) : (
        fallbackRef.current
      );
    };
    return React.memo(Wrapper);
  };
};
