
import React, { memo, useState, useEffect, useRef, useMemo } from 'react';
import { IBasicFilterState, ICacheData, IState } from '../../models/index.models';
import { ResizeObserver } from 'resize-observer'

import './EditImage.scss';
import TabContainer, { TabItem } from '../Tab/Tab';
import { convertImageUsingCanvas } from '../../functions/image-processing';
import Input from '../Input/Input';

export interface EditImageProps {
  labels: any;
  image: string | null | undefined;
  color: string;
  initialState: IState,
  saveUpdates: Function
}
const _initialState: IState = {
  quality: 92,
  maxHeight: 1000,
  maxWidth: 1000,
  cropHeight: 150,
  cropWidth: 150,
  maintainAspectRatio: true,
  format: 'jpeg',
  arrayCopiedImages: [],
  originImageSrc: '',
}

const EditImage = memo(({ labels = {}, image = '', color = '#1e88e5', initialState = _initialState, saveUpdates = () => { } }: EditImageProps) => {
  const [state, setState] = useState<IState>(initialState)
  const [imageSrc, setImageSrc] = useState<string | null>('')
  const [showCrop, setShowCrop] = useState<boolean>(false);


  const observer = useRef<ResizeObserver>();
  const updateStateRef = useRef<number>(0);
  const allFormats = ['webp', 'jpeg', 'png'];
  // const timeout = useRef<any>(null);
  // const flag = useRef<any>(false);


  useEffect(() => {
    setState(JSON.parse(JSON.stringify({ ...state, ...initialState })));
  }, [initialState])

  useEffect(() => {
    setImageSrc(image)
  }, [image])


  async function applyChanges(stateIntance: IState, changeHeight = false) {
    try {
      const { state: newState, imageUri } = await convertImageUsingCanvas(state.originImageSrc as string, changeHeight, stateIntance);
      setImageSrc(imageUri)
      setState(newState);
      console.log("Here");
    } catch (error) {
      console.log("🚀 ~ file: EditImage.tsx ~ line 73 ~ applyChanges ~ error", error)
    }
  }

  async function onUpdateQuality(quality: number) {
    quality = Math.max(Math.min(quality, 100), 1);
    const newState: IState = { ...state, quality }
    setState(newState);
    try {
      await applyChanges(newState, false);
    } catch (error) {
      console.log("🚀 ~ file: EditImage.tsx ~ line 89 ~ onChangeSize ~ error", error)
    }
  }

  async function onChangeSize(value: number, changeHeight = false) {
    let m = Math.max(Math.min(value, 4000), 32);
    const newState: IState = { ...state }
    if (changeHeight) newState.maxHeight = m;
    else newState.maxWidth = m;
    setState(newState);
    try {
      await applyChanges(newState, changeHeight);
    } catch (error) {
      console.log("🚀 ~ file: EditImage.tsx ~ line 89 ~ onChangeSize ~ error", error)
    }
  }

  const sizeImage = useMemo(() => {
    if (imageSrc && imageSrc.length) {
      return Math.ceil(((3 / 4) * imageSrc.length) / 1024);
    } else {
      return '';
    }
  }, [imageSrc])


  return <div className="EditImage">
    <div id="popup" className="popup">
      <div
        style={{
          flexDirection: 'row',
          'boxSizing': 'border-box',
          display: 'flex',
          'placeContent': 'center flex-end',
          'alignItems': 'center'
        }}>
        <button className="icon-btn" onClick={() => { saveUpdates(false) }}>
          <span className="material-icons">clear</span>
        </button>
      </div>
      <div className="image-container">
        <div className="image-holder-full">
          <img id="image-full" src={imageSrc as string} />

          <div id="image-croper" className="image-croper" style={{ display: showCrop ? '' : 'none' }} >
            <div className="grid"></div>
            <div id="image-croper-header">
              {new Array(10).map((_, index) => (
                <div
                  style={{
                    border: '1px dashed #fafafa',
                    backgroundColor: 'rgba(0, 0, 0, 0.48)'

                  }}
                />
              ))}
              <span className="material-icons" style={{ position: 'absolute', top: 0, left: 0 }}>drag_indicator</span>
            </div>
          </div>
        </div>

        <div className="control-panel">
          <TabContainer borderLine>
            <TabItem name="Basic">
              <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                <p className="item-panel">{labels['Quality']}</p>
                <p className="item-panel">{state.quality + '%'}</p>
              </div>

              <div className='flex-row-start'>
                {/* <input readOnly={showCrop} disabled={showCrop} className="input-range"
                  onChange={(e) => (onUpdateQuality(e.target.valueAsNumber))}
                  style={{
                    maxWidth: '100%', width: '100%', color: color
                  }}
                  type="range"
                  min={1}
                  max={100}
                  value={state.quality}
                /> */}
                <Input readOnly={showCrop} disabled={showCrop}

                  className="input-range"
                  onChangedDelayed={onUpdateQuality}
                  style={{
                    maxWidth: '100%', width: '100%', color: color
                  }}
                  type="range"
                  min={1}
                  max={100}
                  value={state.quality} />
              </div>

              <div className="item-panel" style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                {labels['Max dimensions']}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <input type="checkbox" checked={state.maintainAspectRatio} onChange={(e) => setState({ ...state, maintainAspectRatio: e.target.checked })}
                    style={{ color: color }} />
                  <span className="caption">{labels['aspect-ratio']}</span>
                </div>
              </div>

              <div className='flex-row-start' style={{ marginTop: '10px', justifyContent: 'space-between' }}>
                <div className="form-field" style={{ maxWidth: '48%', width: '48%' }}>
                  <label>{labels['max-width(px)']}</label>
                  <Input
                    readOnly={showCrop}
                    disabled={showCrop}
                    placeholder={labels['max-width(px)']}
                    value={state.maxWidth}
                    type="number"
                    min={0}
                    max={2000}
                    onInputChangedEnd={(value: number) => { onChangeSize(value, false) }}
                  />
                </div>


                <div className="form-field" style={{ maxWidth: '48%', width: '48%' }}>
                  <label>{labels['max-height(px)']}</label>
                  <Input
                    readOnly={showCrop}
                    disabled={showCrop}
                    placeholder={labels['max-height(px)']}
                    value={state.maxHeight}
                    type="number"
                    min={0}
                    max={2000}
                    onInputChangedEnd={(value: number) => { onChangeSize(value, true) }}
                  />
                </div>
              </div>

              {sizeImage && <p
                className="caption image-caption"
                style={{
                  color: sizeImage > 120 ? '#f44336' : 'unset',
                  fontWeight: sizeImage > 120 ? '500' : 'unset'
                }}
              >
                size: {sizeImage}Kb &nbsp; {state.format}
              </p>
              }

            </TabItem>
            <TabItem name="Filters">
            </TabItem>

          </TabContainer>

        </div>
      </div>
    </div>
  </div >
})


export default EditImage


