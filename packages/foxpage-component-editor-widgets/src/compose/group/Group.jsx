import styled from 'styled-components';

import Title from './Title';
import Field from './Field';
import Label from './Label';

const Group = styled.div`
  padding: 16px;
  border-top: 1px solid #f2f2f2;
  border-bottom: 1px solid #e5e5e5;
  background: #fafafa;
  margin-bottom: 2px;
`;

Group.Title = Title;
Group.Field = Field;
Group.Label = Label;

export default Group;
