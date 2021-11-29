import React from 'react';
import PropTypes from 'prop-types';
import tinycolor from 'tinycolor2';
import styled from 'styled-components';

const Root = styled.div`
  padding: 4px;
  background: #fff;
  border-radius: 4px;
  border: 1px solid #d9d9d9;
  display: inline-block;
  cursor: pointer;
`;

const Color = styled.div`
  width: 170px;
  height: 22px;
  border-radius: 4px;
  background-color: ${props => props.color};
`;

const ColorValue = styled.div`
  line-height: 23px;
  font-size: 12px;
  text-align: center;
  font-family: monospace, sans-serif !important;
  color: ${props => {
    const { tcolor } = props;
    return tcolor.isDark() && tcolor.getAlpha() ? '#fff' : '#000';
  }};
`;

function Swatch(props) {
  const { color, style = {}, onClick } = props;
  const tcolor = tinycolor(color);
  return (
    <Root onClick={onClick}>
      <Color color={color} style={style}>
        <ColorValue tcolor={tcolor}>{color}</ColorValue>
      </Color>
    </Root>
  );
}

Swatch.defaultProps = {
  color: '#000000',
};

Swatch.propTypes = {
  color: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default Swatch;
