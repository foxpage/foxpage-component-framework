import React from 'react';

export interface PositionProps {
  fold?: boolean;
  propsRootKey?: string;
}
export type PositionType = React.ComponentClass<PositionProps>;

declare let Position: PositionType;
export default Position;
