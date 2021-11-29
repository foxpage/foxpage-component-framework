import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { SketchPicker } from 'react-color';

const Root = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
  & input {
    box-sizing: content-box;
  }
`;

const Cover = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

function PopOver(props) {
  const { color, onClose, onChangeComplete, popOverPos } = props;
  const { top, left } = popOverPos;

  return (
    <Root>
      <Cover onClick={onClose} />
      <div style={{ top, left, position: 'absolute' }}>
        <SketchPicker
          color={color}
          onChangeComplete={onChangeComplete}
          presetColors={[
            '#287DFA',
            '#FFB400',
            '#FF9500',
            '#FF6F00',
            '#F5594A',
            '#06AEBD',
            '#4FB443',
            '#4978CE',
            '#EE3B28',
            '#0F294D',
            '#455873',
            '#8592A6',
            '#ACB4BF',
            '#CED2D9',
            '#FFFFFF',
            'transparent',
          ]}
        />
      </div>
    </Root>
  );
}

PopOver.defaultProps = {
  color: '#000000',
};

PopOver.propTypes = {
  color: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  onChangeComplete: PropTypes.func.isRequired,
};

export default PopOver;
