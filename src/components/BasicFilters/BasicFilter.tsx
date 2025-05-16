import React, { memo, useEffect, useState } from 'react';
import { IBasicFilterState } from '../../models/index.models';
import Input from '../Input/Input';

export interface BasicFilterProps {
  labels: any;
  color: string;
  initialState: IBasicFilterState | undefined | null;
  changeFilter: Function;
}
const _initialState: IBasicFilterState = {
  contrast: 1,
  blur: 0,
  brightness: 1,
  grayscale: 0,
  invert: 0,
  saturate: 1,
  sepia: 0,
};

const BasicFilter = memo(
  ({ labels, color, initialState = _initialState, changeFilter = () => {} }: BasicFilterProps) => {
    const [state, setState] = useState<IBasicFilterState>(initialState as any);

    useEffect(() => {
      if (initialState) {
        setState(JSON.parse(JSON.stringify({ ...state, ...initialState })));
      } else {
        setState(_initialState);
      }
    }, [initialState]);

    function onUpdateContrast(contrast: number) {
      changeFilter({ ...state, contrast });
    }

    function onUpdateBrightness(brightness: number) {
      changeFilter({ ...state, brightness });
    }

    function onUpdateGrayscale(grayscale: number) {
      changeFilter({ ...state, grayscale });
    }
    function onUpdateSaturate(saturate: number) {
      changeFilter({ ...state, saturate });
    }
    function onUpdateSepia(sepia: number) {
      changeFilter({ ...state, sepia });
    }
    function onUpdateBlur(blur: number) {
      changeFilter({ ...state, blur });
    }

    function onUpdateNoiseReduction(noiseReduction: number) {
      changeFilter({ ...state, noiseReduction });
    }

    return (
      <div>
        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
          <p className='item-panel' data-testid='contrast-label'>
            {labels['Contrast']}
          </p>
          <p className='item-panel' data-testid='contrast-value'>
            {(+state.contrast).toFixed(2)}
          </p>
        </div>

        <div className='flex-row-start'>
          <Input
            testID='contrast'
            id='contrast'
            name='contrast'
            className='input-range'
            onChangedDelayed={onUpdateContrast}
            delayMs={100}
            onChangedValue={(value: number) => {
              setState({ ...state, contrast: value });
            }}
            style={{
              maxWidth: '100%',
              width: '100%',
              color: color,
            }}
            type='range'
            min='0'
            max='5'
            step='0.01'
            value={state.contrast}
          />
        </div>

        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
          <p className='item-panel' data-testid='brightness-label'>
            {labels['Brightness']}
          </p>
          <p className='item-panel' data-testid='brightness-value'>
            {(+state.brightness).toFixed(2)}
          </p>
        </div>

        <div className='flex-row-start'>
          <Input
            testID='brightness'
            id='brightness'
            name='brightness'
            className='input-range'
            onChangedDelayed={onUpdateBrightness}
            onChangedValue={(value: number) => {
              setState({ ...state, brightness: value });
            }}
            style={{
              maxWidth: '100%',
              width: '100%',
              color: color,
            }}
            type='range'
            min='0'
            max='5'
            step='0.01'
            value={state.brightness}
          />
        </div>

        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
          <p className='item-panel'>{labels['Grayscale']}</p>
          <p className='item-panel'>{(+state.grayscale).toFixed(2)}</p>
        </div>

        <div className='flex-row-start'>
          <Input
            testID='grayscale'
            id='grayscale'
            name='grayscale'
            className='input-range'
            onChangedDelayed={onUpdateGrayscale}
            delayMs={100}
            onChangedValue={(value: number) => {
              setState({ ...state, grayscale: value });
            }}
            style={{
              maxWidth: '100%',
              width: '100%',
              color: color,
            }}
            type='range'
            min='0'
            max='5'
            step='0.01'
            value={state.grayscale}
          />
        </div>
        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
          <p className='item-panel'>{labels['Saturate']}</p>
          <p className='item-panel' data-testid='grayscale-value'>{(+state.saturate).toFixed(2)}</p>
        </div>

        <div className='flex-row-start'>
          <Input
            className='input-range'
            onChangedDelayed={onUpdateSaturate}
            onChangedValue={(value: number) => {
              setState({ ...state, saturate: value });
            }}
            style={{
              maxWidth: '100%',
              width: '100%',
              color: color,
            }}
            type='range'
            min='0'
            max='5'
            step='0.01'
            value={state.saturate}
          />
        </div>

        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
          <p className='item-panel'>{labels['Sepia']}</p>
          <p className='item-panel'>{(+state.sepia).toFixed(2)}</p>
        </div>

        <div className='flex-row-start'>
          <Input
            className='input-range'
            onChangedDelayed={onUpdateSepia}
            onChangedValue={(value: number) => {
              setState({ ...state, sepia: value });
            }}
            style={{
              maxWidth: '100%',
              width: '100%',
              color: color,
            }}
            type='range'
            min='0'
            max='5'
            step='0.01'
            value={state.sepia}
          />
        </div>

        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
          <p className='item-panel'>{labels['Blur']}</p>
          <p className='item-panel'>{(+state.blur).toFixed(2)}</p>
        </div>

        <div className='flex-row-start'>
          <Input
            className='input-range'
            onChangedDelayed={onUpdateBlur}
            onChangedValue={(value: number) => {
              setState({ ...state, blur: value });
            }}
            style={{
              maxWidth: '100%',
              width: '100%',
              color: color,
            }}
            type='range'
            min='0'
            max='5'
            step='0.01'
            value={state.blur}
          />
        </div>

        {/* <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
          <p className='item-panel'>{labels['Noise Reduction']}</p>
          <p className='item-panel'>{(+state.noiseReduction).toFixed(2)}</p>
        </div>

        <div className='flex-row-start'>
          <Input
            className='input-range'
            onChangedDelayed={onUpdateNoiseReduction}
            onChangedValue={(value: number) => {
              setState({ ...state, noiseReduction: value });
            }}
            style={{
              maxWidth: '100%',
              width: '100%',
              color: color,
            }}
            type='range'
            min='0'
            max='10'
            step='0.1'
            value={state.noiseReduction}
          />
        </div> */}
      </div>
    );
  }
);

export default BasicFilter;
