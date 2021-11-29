import { default as Decorations } from './decorations/index';
import { default as Dimension } from './dimension/index';
import { default as Flex } from './flex/index';
import { default as General } from './general/index';
import { default as Position } from './position/index';
import { default as Spacing } from './spacing/index';

export interface StyleType {
  Spacing: typeof Spacing;
  Position: typeof Position;
  Dimension: typeof Dimension;
  Flex: typeof Flex;
  Decorations: typeof Decorations;
  General: typeof General;
}

declare let Style: StyleType;
export default Style;
