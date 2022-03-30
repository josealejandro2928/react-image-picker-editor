
import React, { memo, useState, useEffect, useRef } from 'react';
import { IBasicFilterState, ICacheData, IState } from '../../models/index.models';
import { ResizeObserver } from 'resize-observer'

import './EditImage.scss';
import TabContainer, { TabItem } from '../Tab/Tab';

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
  const allFormats = ['webp', 'jpeg', 'png'];


  useEffect(() => {
    setState(JSON.parse(JSON.stringify({ ...state, ...initialState })));
  }, [initialState])

  useEffect(() => {
    setImageSrc(image)
  }, [image])

  function updateState(values: {
    quality?: number;
    maxHeight?: number;
    maxWidth?: number;
    cropHeight?: number;
    cropWidth?: number;
    maintainAspectRatio?: boolean;
    format?: string;
    arrayCopiedImages?: Array<ICacheData>;
    originImageSrc?: string | null | undefined;
    basicFilters?: IBasicFilterState;
  }) {
    setState({ ...state, ...values });
  }

  useEffect(() => {
    console.log("🚀 ~ file: EditImage.tsx ~ line 63 ~ EditImage ~ state", state)
  }, [state])


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
                <input readOnly={showCrop} disabled={showCrop} className="input-range"
                  onChange={(e) => { updateState({ quality: e.target.valueAsNumber }) }}
                  style={{
                    maxWidth: '100%', width: '100%', color: color
                  }}
                  type="range"
                  min={1}
                  max={100}
                  value={state.quality}
                />
              </div>

            </TabItem>
            <TabItem name="Filters">
            </TabItem>

          </TabContainer>

        </div>
      </div>
    </div>
  </div>
})


export default EditImage

