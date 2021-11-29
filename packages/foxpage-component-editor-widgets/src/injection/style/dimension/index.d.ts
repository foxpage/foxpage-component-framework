import React from 'react';
export interface DimensionProps {
  fold?: boolean;
  propsRootKey?: string;
}
export type DimensionType = React.ComponentClass<DimensionProps>;

declare let Dimension: DimensionType;
export default Dimension;
