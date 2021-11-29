import React from 'react';
export interface FlexProps {
  fold?: boolean;
  propsRootKey?: string;
}
export type FlexType = React.ComponentClass<FlexProps>;

declare let Flex: FlexType;
export default Flex;
