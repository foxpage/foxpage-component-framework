import React from 'react';
import styled from 'styled-components';

const Box = styled.div`

  margin-top: 12px;
  flex: ${props => (props.width ? `1 1 ${props.width}px` : '1 1 300px')};
  '&:first-child': {
    margin-top: 0;
  }
`;

const FlexField = props => {
  const { width, children } = props;
  return <Box width={width}>{children}</Box>;
};

export default FlexField;
