import {PropTypes} from 'react'

const {
  func,
  oneOfType,
  string,
} = PropTypes;

export const component = oneOfType([func, string]);
