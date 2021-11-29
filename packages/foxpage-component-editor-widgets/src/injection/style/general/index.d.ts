import React from 'react';

export interface GeneralProps {
  fold?: boolean;
  propsRootKey?: string;
}
export type GeneralType = React.ComponentClass<GeneralProps>;

declare let General: GeneralType;
export default General;
