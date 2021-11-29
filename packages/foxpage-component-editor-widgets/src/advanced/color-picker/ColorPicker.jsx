import React from 'react';
import ReactDOM from 'react-dom';
import * as ObPathImmutable from 'object-path-immutable';
import PropTypes from 'prop-types';
import { EditContext } from '@foxpage/foxpage-component-editor-context';

import VariableComp from '../../components/VariableComp/VariableComp';
import Swatch from './Swatch';
import PopOver from './PopOver';

class ColorPicker extends React.Component {
  static contextType = EditContext;

  constructor() {
    super();
    this.state = {
      show: false,
      popOverPos: {},
    };
  }

  handleClose = () => {
    this.setState({ show: false });
  };

  handleClick = e => {
    const { top, left, right, bottom, width } = e.currentTarget.getBoundingClientRect();
    const windowHeight = document.body.clientHeight;
    const windowWidth = document.body.clientWidth;

    const popOverPos = {};

    if (windowHeight - bottom > 320) {
      popOverPos.top = bottom;
    } else {
      popOverPos.top = top - 305;
    }

    if (windowWidth - right > 220 - width) {
      popOverPos.left = left;
    } else {
      popOverPos.left = right - 220;
    }

    const { show } = this.state;
    this.setState({
      show: !show,
      popOverPos,
    });
  };

  handleChangeComplete = color => {
    const { propChange, applyState } = this.context;
    const { propKey } = this.props;
    if (propChange && propKey) {
      if (color.rgb.a < 1) {
        propChange(propKey, `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`);
      } else {
        propChange(propKey, color.hex);
      }
      if (applyState) {
        applyState();
      }
    }
  };

  render() {
    const { componentProps } = this.context;
    const { propKey, style, disableVariables, hideVariableBtn } = this.props;
    const { show, popOverPos } = this.state;
    const color = ObPathImmutable.get(componentProps, propKey);

    return (
      <VariableComp
        propKey={propKey}
        value={color}
        disable={disableVariables}
        hideVariableBtn={hideVariableBtn}
        size="small"
      >
        <>
          <div>
            <Swatch color={color} style={style} onClick={this.handleClick} />
          </div>
          {show &&
            ReactDOM.createPortal(
              <PopOver
                popOverPos={popOverPos}
                color={color}
                onChangeComplete={this.handleChangeComplete}
                onClose={this.handleClose}
              />,
              document.body,
            )}
        </>
      </VariableComp>
    );
  }
}

ColorPicker.defaultProps = {
  propKey: '',
};

ColorPicker.propTypes = {
  propKey: PropTypes.string,
};

export default ColorPicker;
