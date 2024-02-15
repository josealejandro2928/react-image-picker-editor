import React, { useState } from 'react'

import ReactImagePickerEditor, { ImagePickerConf } from 'react-image-picker-editor';

import 'react-image-picker-editor/dist/index.css'
import Header from './components/Header/Header';
import img1 from './assets/images/1.jpg';
import img2 from './assets/images/2.jpg';

const App = () => {

  const config1: ImagePickerConf = {
    borderRadius: '8px',
    language: 'pt',
    width: '280px',
    height: '200px',
    objectFit: 'contain',
    // aspectRatio: 4 / 3,
    compressInitial: 85
  };

  const config2: ImagePickerConf = {
    borderRadius: "50%",
    language: 'pt',
    objectFit: 'contain',
    height: '200px',
    width: "200px",
    compressInitial: 50
  };

  const [imageSrc, setImageSrc] = useState<string | null | undefined>('');
  const [imageSrc2, setImageSrc2] = useState<string | null | undefined>('');
  const [logo, setLogo] = useState<string | null | undefined>(img1);



  return <div className='container'>
    <Header />

    <div className="flex-wrap">
      <div className="left">
        <p>Pick and edit an image:</p>
        < ReactImagePickerEditor
          config={config1}
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
          imageSrcProp={logo as any}
          config={config2}
          imageChanged={(newDataUri: any) => { setImageSrc2(newDataUri) }} />
      </div>
      <div className="right">
        <p>Output from the component:</p>
        {imageSrc2 && <img src={imageSrc2} height={200} />}
        <p>Image loaded: <strong>{logo}</strong></p>
        <button onClick={()=>{
          if(logo == img1) setLogo(img2);
          if(logo == img2) setLogo(img1);
        }}>Load another image from internal</button>
      </div>
    </div>




  </div>
}

export default App
