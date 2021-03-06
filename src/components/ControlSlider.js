import { h } from 'preact';
import { useCallback, useRef } from 'preact/hooks';
import { noop } from '../functions';
import { EXTENSION_PREFIX } from '../constants';
import { BASE, useStyles } from './index';

export const TYPE_POSITION = 'position';
export const TYPE_RATE = 'rate';
export const TYPE_VOLUME = 'volume';

const TYPES = [
  TYPE_POSITION,
  TYPE_RATE,
  TYPE_VOLUME,
];

const ControlSlider =
  ({
     type,
     value = 1.0,
     min = value,
     max = value,
     step = 0.1,
     hint = '',
     disabled = false,
     onChangeStart = noop,
     onChange = noop,
     onChangeEnd = noop,
   }) => {
    const isChanging = useRef(false);

    const onInput = useCallback(event => {
      const value = event.target.value;

      if (!isChanging.current) {
        isChanging.current = true;
        onChangeStart(value);
      } else {
        onChange(value);
      }
    }, [ onChangeStart, onChange, isChanging ]);

    const onLastInput = useCallback(event => {
      if (isChanging.current) {
        isChanging.current = false;
        onChangeEnd(event.target.value);
      }
    }, [ onChangeEnd, isChanging ]);

    const getElementClassNames = useStyles(CLASS_NAMES, [ type ]);

    return (
      <div className={getElementClassNames(WRAPPER)}>
        <span
          onClick={() => onChangeEnd(min)}
          className={getElementClassNames([ BUTTON, MIN_BUTTON ])} />

        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          disabled={disabled}
          // Prevent the original keyboard handling from interfering with our keyboard shortcuts.
          onKeyDown={event => event.preventDefault()}
          onKeyUp={event => event.preventDefault()}
          onInput={onInput}
          onChange={onLastInput}
          onMouseUp={onLastInput}
          className={getElementClassNames(INPUT)} />

        <span
          onClick={() => onChangeEnd(max)}
          className={getElementClassNames([ BUTTON, MAX_BUTTON ])} />

        {('' !== hint) && (
          <span className={getElementClassNames(HINT)}>
            {hint}
          </span>
        )}
      </div>
    );
  };

export default ControlSlider;

const WRAPPER = 'wrapper';
const BUTTON = 'button';
const MIN_BUTTON = 'min_button';
const MAX_BUTTON = 'max_button';
const INPUT = 'input';
const HINT = 'hint';

const CLASS_NAMES = {
  [BASE]: {
    [WRAPPER]: [
      `${EXTENSION_PREFIX}slider`,
    ],
    [BUTTON]: [
      // Copied from the "Use keyboard" / "Use word bank" button.
      '_104UW',
      '_1a2L9',
      `${EXTENSION_PREFIX}slider-button`
    ],
    [MIN_BUTTON]: [
      `${EXTENSION_PREFIX}slider-min-button`,
    ],
    [MAX_BUTTON]: [
      `${EXTENSION_PREFIX}slider-max-button`,
    ],
    [INPUT]: [
      // Copied from the session progress bar.
      '_2iSv6',
      // Copied from the most appropriate background of the session progress bar.
      '_7gXTk',
      `${EXTENSION_PREFIX}slider-input`,
    ],
    [HINT]: [
      // Copied by searching for the same color as the button, without the hover and pointer styles.
      'D9gQ7',
      `${EXTENSION_PREFIX}slider-hint`,
    ],
  },
};

TYPES.forEach(type => {
  CLASS_NAMES[type] = {
    [WRAPPER]: [ `${EXTENSION_PREFIX}slider-${type}` ],
  };
});
