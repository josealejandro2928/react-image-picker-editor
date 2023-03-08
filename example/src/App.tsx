import React, { useState } from 'react'

import ReactImagePickerEditor, { ImagePickerConf } from 'react-image-picker-editor';

import 'react-image-picker-editor/dist/index.css'
import Header from './components/Header/Header';

const App = () => {

  const config2: ImagePickerConf = {
    borderRadius: '8px',
    language: 'en',
    width: '280px',
    height: '200px',
    objectFit: 'contain',
    // aspectRatio: 4 / 3,
    compressInitial: null,
  };

  const [imageSrc, setImageSrc] = useState<string | null | undefined>('');
  const [imageSrc2, setImageSrc2] = useState<string | null | undefined>('');



  return <div className='container'>
    <Header />

    <div className="flex-wrap">
      <div className="left">
        <p>Pick and edit an image:</p>
        < ReactImagePickerEditor
          config={config2}
          imageChanged={(newDataUri: any) => { setImageSrc(newDataUri) }} />
      </div>
      <div className="right">
        <p>Output from the component:</p>
        {imageSrc && <img src={imageSrc} height={200} />}
      </div>
    </div>



    <div className="flex-wrap" style={{ marginTop: "4rem" }}>
      <div className="left">
        <p>Pick and edit an image:</p>
        < ReactImagePickerEditor
          imageSrcProp='https://upload.wikimedia.org/wikipedia/commons/e/ef/LYF_WATER_2_Smartphone.JPG'
          config={{ ...config2, borderRadius: "50%", width: "200px" }}
          imageChanged={(newDataUri: any) => { setImageSrc2(newDataUri) }} />
      </div>
      <div className="right">
        <p>Output from the component:</p>
        {imageSrc2 && <img src={imageSrc2} height={200} />}
      </div>
    </div>




  </div>
}

export default App
