export interface AttributesProps {
  fold?: boolean;
  propsRootKey?: string;
}
export type AttributesType = typeof Attributes;

declare let Attributes: React.FC<AttributesProps>;
export default Attributes;
