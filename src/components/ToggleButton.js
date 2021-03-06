import { h } from 'preact';
import { noop } from '../functions';
import { EXTENSION_PREFIX, FORM_STYLE_BASIC, FORM_STYLE_CARTOON } from '../constants';
import { BASE, useStyles } from './index';

const ToggleButton = ({ formStyle = FORM_STYLE_BASIC, active = false, onClick = noop }) => {
  const getElementClassNames = useStyles(CLASS_NAMES, [ formStyle ]);

  const buttonState = active ? BUTTON__ACTIVE : BUTTON__INACTIVE;

  return (
    <button
      onClick={onClick}
      onKeyDown={event => event.preventDefault()}
      onKeyUp={event => event.preventDefault()}
      className={getElementClassNames([ BUTTON, buttonState ])} />
  );
};

export default ToggleButton;

const BUTTON = 'button';
const BUTTON__ACTIVE = 'button__active';
const BUTTON__INACTIVE = 'button__inactive';

const CLASS_NAMES = {
  [BASE]: {
    [BUTTON]: [
      `${EXTENSION_PREFIX}control-form-toggle-button`,
    ],
    [BUTTON__ACTIVE]: [
      `${EXTENSION_PREFIX}control-form-toggle-button_active`,
    ],
  },
  [FORM_STYLE_BASIC]: {
    // Copied from the original playback buttons, ignoring the class names that set dimensions.
    [BUTTON]: [
      '_2dIjg',
      'XepLJ',
      '_1bJB-',
      'vy3TL',
      '_3iIWE',
      '_1Mkpg',
      '_1Dtxl',
      '_1sVAI',
      'sweRn',
      '_1BWZU',
      '_2bW5I',
      '_3ZpUo',
      '_2odwU',
    ],
  },
  [FORM_STYLE_CARTOON]: {
    // Copied from the original playback buttons, ignoring the class names that apply dimensions.
    [BUTTON]: [
      '_1kiAo',
      '_3iIWE',
      '_1Mkpg',
      '_2bW5I',
      '_1Dtxl',
    ],
    // Copied by searching for the main link color, without side effects.
    // This choice requires extra care for Darklingo++ (the button color must change when it's active).
    [BUTTON__ACTIVE]: [
      '_2rA41',
    ],
    // Copied by searching for the same color as the "Use keyboard" / "Use Word Bank" button,
    // without the hover and pointer styles.
    [BUTTON__INACTIVE]: [
      'D9gQ7',
    ],
  },
};
