import { PropsWithChildren, ReactElement } from 'react';
import { CollapseProps as AntdCollapseProps, CollapsePanelProps as AntdCollapsePanelProps } from 'antd/lib/collapse';

export interface CollapseType {
  (props: PropsWithChildren<CollapseProps>): ReactElement | null;
  Panel: React.ComponentClass<AntdCollapsePanelProps>;
}

export type CollapseProps = Omit<AntdCollapseProps, 'bordered'>;

declare let Collapse: CollapseType;

export default Collapse;
