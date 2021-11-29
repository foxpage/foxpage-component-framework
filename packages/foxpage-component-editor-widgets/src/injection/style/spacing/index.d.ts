import React from 'react';

export interface SpacingProps {
  fold?: boolean;
  propsRootKey?: string;
}
export type SpacingType = React.FC<SpacingProps>;

declare let Spacing: SpacingType;
export default Spacing;
