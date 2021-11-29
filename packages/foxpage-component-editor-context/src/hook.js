import React, { useContext } from 'react';
import EditContext from './EditContext';

export const useEditContext = () => {
  return useContext(EditContext);
};

/**
 *
 * @param {{ data: Record<string, any> }} param0
 */
export const useEditObject = ({ data }) => {
  const [value, setValue] = React.useState(() => ({ ...data }));

  const setProperty = (k, v) => {
    setValue({ ...value, [k]: v });
  };

  const setObject = partial => {
    setValue({ ...value, ...partial });
  };

  const contextValueRef = React.useRef({
    componentProps: value,
    propChange: setProperty,
    propsChange: setObject,
    get widgets() {
      return null;
    },
  });

  /** @type {React.FC<{}>} */
  const Provider = ({ children }) => {
    return React.createElement(EditContext.Provider, { value: contextValueRef.current }, children);
  };

  return {
    get value() {
      return value;
    },

    Provider,
    setProperty,
    setValue: setObject,
  };
};
