import React, { memo, useRef } from 'react';
import { useState, useEffect } from 'react';

interface InputProps extends React.InputHTMLAttributes<any> {
  onInputChangedEnd?: Function;
  onChangedDelayed?: Function;
  onChangedValue?: Function;
  delayMs?: number;
  testID?: string;
}

const Input = memo((props: InputProps) => {
  const { onInputChangedEnd, onChangedDelayed, onChangedValue, delayMs, testID, ...restProps } =
    props as InputProps;
  const [state, setState] = useState<any>(props.value);
  const timerRef = useRef<any>();
  const mountRef = useRef<boolean>(true);
  const flagRef = useRef<boolean>(false);

  // useEffect(() => {
  //   if (['checkbox', 'radio'].includes(props.type as string)) {
  //     setState(props.checked);
  //   } else {
  //     setState(props.value);
  //     console.log("Here in the prop")
  //   }
  // }, [props.value])

  useEffect(() => {
    if (!onChangedDelayed) return;
    if (mountRef.current) {
      mountRef.current = false;
      return;
    }

    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      clearTimeout(timerRef.current);
      onChangedDelayed(state);
    }, delayMs || 100);

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [state]);

  function changeValue(e: any) {
    if (['checkbox', 'radio'].includes(props.type as string)) {
      setState(e.target.checked);
      onChangedValue && onChangedValue(e.target.checked);
    } else {
      setState(e.target.value);
      onChangedValue && onChangedValue(e.target.value);
    }
  }

  return (
    <React.Fragment>
      {onInputChangedEnd && (
        <input
          data-testid={testID}
          {...restProps}
          className={restProps?.className}
          style={restProps.style}
          value={props.value}
          onChange={changeValue}
          onBlur={(e) => {
            onInputChangedEnd(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key == 'Enter') onInputChangedEnd(state);
          }}
        />
      )}
      {!onInputChangedEnd && (
        <input
          data-testid={testID}
          {...restProps}
          className={restProps?.className}
          style={restProps.style}
          value={props.value}
          onChange={changeValue}
        />
      )}
    </React.Fragment>
  );
});

export default Input;
