import {
  Props,

  // basic
  CheckboxType,
  InputType,
  RadioType,
  SelectType,
  SwitchType,

  // combine
  EventInputType,

  // advanced
  CodeAreaType,
  CodeEditorType,
  ColorPickerType,
  JSONEditorType,
  JSONEditorAceType,
  NumericInputType,
  RichTextType,

  // $ prop
  AttributesType,
  StyleType,

  // layout
  FlexColType,
  FlexCol2Type,
  FlexCol3Type,
  FlexCol4Type,
  CollapseType,
  GroupType,
  TitleType,
  FieldType,
  LabelType,
} from './components.d';

/**
 * base widgets，和 props 无关
 */
export interface EditorStaticWidgets {
  // $ injection
  Attributes: AttributesType;
  Style: StyleType;

  // compose
  FlexCol: FlexColType;
  FlexCol2: FlexCol2Type;
  FlexCol3: FlexCol3Type;
  FlexCol4: FlexCol4Type;
  Collapse: CollapseType;
  Group: GroupType;
  Title: TitleType;
  Field: FieldType;
  Label: LabelType;
}

export interface EditorWidgets<P extends Props = Record<string, unknown>> extends EditorStaticWidgets {
  // basic
  Input: InputType<P>;
  Select: SelectType<P>;
  Switch: SwitchType<P>;
  Checkbox: CheckboxType<P>;
  Radio: RadioType<P>;

  // combine
  EventInput: EventInputType<P>;

  // advanced
  NumericInput: NumericInputType<P>;
  ColorPicker: ColorPickerType<P>;
  CodeArea: CodeAreaType<P>;
  CodeEditor: CodeEditorType<P>;
  JSONEditor: JSONEditorType<P>;
  JSONEditorAce: JSONEditorAceType<P>;
  RichText: RichTextType<P>;
}

export * from './components.d';
