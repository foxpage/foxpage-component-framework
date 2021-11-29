import { BaseDivStyledComponent } from '../../interface';

export type FieldType = BaseDivStyledComponent;

export type FlexFieldType = BaseDivStyledComponent & {
  width?: number;
};

export type LabelType = BaseDivStyledComponent;

export type TitleType = BaseDivStyledComponent;

export type GroupType = BaseDivStyledComponent & {
  Field: FieldType;
  Label: LabelType;
  Title: TitleType;
};

declare let Field: FieldType;
declare let FlexField: FlexFieldType;
declare let Label: LabelType;
declare let Title: TitleType;
declare let Group: GroupType;

export { Field, FlexField, Label, Title };
export default Group;
