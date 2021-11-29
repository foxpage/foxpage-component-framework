import React from 'react';
export interface DecorationsProps {
  fold?: boolean;
  propsRootKey?: string;
}
export type DecorationsType = React.ComponentClass<DecorationsProps>;

declare let Decorations: DecorationsType;
export default Decorations;
