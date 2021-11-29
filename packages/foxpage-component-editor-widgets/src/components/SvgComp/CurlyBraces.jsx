import * as React from 'react';

const CurlyBraces = ({ size = '24', color = '#707070', pathClassName = '', ...others }) => {
  return (
    <svg viewBox="0 0 1024 1024" width={size} height={size} {...(others || {})}>
      <path
        className={pathClassName}
        d="M256 256a85.333333 85.333333 0 0 1 85.333333-85.333333 42.666667 42.666667 0 1 0 0-85.333334 170.666667 170.666667 0 0 0-170.666666 170.666667v128a85.333333 85.333333 0 0 1-85.333334 85.333333 42.666667 42.666667 0 1 0 0 85.333334 85.333333 85.333333 0 0 1 85.333334 85.333333v128a170.666667 170.666667 0 0 0 170.666666 170.666667 42.666667 42.666667 0 1 0 0-85.333334 85.333333 85.333333 0 0 1-85.333333-85.333333v-128a170.666667 170.666667 0 0 0-58.88-128A170.666667 170.666667 0 0 0 256 384V256z m682.666667 213.333333a85.333333 85.333333 0 0 1-85.333334-85.333333V256a170.666667 170.666667 0 0 0-170.666666-170.666667 42.666667 42.666667 0 0 0 0 85.333334 85.333333 85.333333 0 0 1 85.333333 85.333333v128a170.666667 170.666667 0 0 0 58.88 128A170.666667 170.666667 0 0 0 768 640v128a85.333333 85.333333 0 0 1-85.333333 85.333333 42.666667 42.666667 0 0 0 0 85.333334 170.666667 170.666667 0 0 0 170.666666-170.666667v-128a85.333333 85.333333 0 0 1 85.333334-85.333333 42.666667 42.666667 0 1 0 0-85.333334z"
        fill={color}
      />
    </svg>
  );
};

export default CurlyBraces;
