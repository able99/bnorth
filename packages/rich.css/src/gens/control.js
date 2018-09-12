import { triangleImage } from '../styles/shape'
import { getSelector } from '../utils';


export function genButton({textColors, stateOpacityDisabled, stateOpacityActive}) {
  let ret = {};

  ret['button:disabled, button[disabled], button.disabled'] = {
    'opacity': stateOpacityDisabled,
    'cursor': 'not-allowed',
    'pointer-events': 'none',
  }

  ret['.status:disabled, .status[disabled], .status.disabled'] = {
    'opacity': stateOpacityDisabled,
    'cursor': 'not-allowed',
    'pointer-events': 'none',
  }

  ret['button:active, button[active], button.active'] = {
    'opacity': stateOpacityActive,
  }

  ret['.status:active, .status[active], .status.active'] = {
    'opacity': stateOpacityActive,
  }

  ret['.button-active:not(.selected)'] = {
    'color': textColors.normal,
  }

  ret['.button-underline'] = {
    color: 'red',
  }

  return ret;
}

export function genSwitchStatus() {
  let ret = {};

  
  ret['.switch-status input + .status .on'] = {
    'display': 'none !important',
  }
  ret['.switch-status input + .status .off'] = {
    'display': 'inline-block !important',
  }

  ret['.switch-status input:checked + .status .on'] = {
    'display': 'inline-block !important',
  }
  ret['.switch-status input:checked + .status .off'] = {
    'display': 'none !important',
  }

 
  return ret;
}

export function genInput({utilColors, mainColors}) {
  let ret = {};

  ret['input:focus, textarea:focus, select:focus'] = {
    'outline': 0,
  }

  ret['input.disabled, textarea.disabled, select.disabled, input[disabled], textarea[disabled], select[disabled], input[readonly], textarea[readonly], select[readonly], fieldset[disabled]'] = {
    'cursor': 'not-allowed',
  }

  ret['select'] = {
    'background': `url(${triangleImage(mainColors.primary)}) right 0.5em center no-repeat`,
    'background-size': '0.5em',
    'padding-left': '0.5em',
    'padding-right': '1em',
  }

  ret['select::-ms-expand'] = {
    'display': 'none',
  }

  return ret;
}

export function genState({stateOpacityDisabled, stateOpacityActive}) {
  let ret = {};

  ret[getSelector('state', 'disabled')] = {
    'opacity': stateOpacityDisabled,
  }

  ret[getSelector('state', 'active')] = {
    'opacity': stateOpacityActive,
  }

  return ret;
}


export default function gen(config) {
  return {
    ...genButton(config), 
    ...genSwitchStatus(config),
    ...genInput(config), 
    ...genState(config), 
  };
}