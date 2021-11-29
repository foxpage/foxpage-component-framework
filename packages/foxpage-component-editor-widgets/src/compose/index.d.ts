import { BaseDivStyledComponent } from '../interface';

export type FlexColType = BaseDivStyledComponent;

export type FlexCol2Type = BaseDivStyledComponent;

export type FlexCol3Type = BaseDivStyledComponent;

export type FlexCol4Type = BaseDivStyledComponent;

declare let FlexCol: FlexColType;
declare let FlexCol2: FlexCol2Type;
declare let FlexCol3: FlexCol3Type;
declare let FlexCol4: FlexCol4Type;

export { FlexCol, FlexCol2, FlexCol3, FlexCol4 };

export * from './Collapse';
export { default as Collapse } from './Collapse';

export * from './group/index';
export { default as Group } from './group/index';
