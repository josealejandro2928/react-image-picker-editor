import React, { useState } from 'react'

import ReactImagePickerEditor, { ImagePickerConf } from 'react-image-picker-editor';

import 'react-image-picker-editor/dist/index.css'
import Header from './components/Header/Header';

const App = () => {

  const config2: ImagePickerConf = {
    borderRadius: '8px',
    language: 'en',
    width: '330px',
    height: '250px',
    objectFit: 'contain',
    // aspectRatio: 4 / 3,
    compressInitial: null,
  };

  const [imageSrc, setImageSrc] = useState<string | null | undefined>('');

  // const initialImage: string = '/assets/images/8ptAya.webp';
  const initialImage = '';

  return <div className='container'>
    <Header />

    < ReactImagePickerEditor
      config={config2}
      imageSrcProp={initialImage}
      imageChanged={(newDataUri: any) => { setImageSrc(newDataUri) }} />

    <br /> <br />
    <hr />
    <br />
    <p>setImageSrc:</p>
    {imageSrc && <img src={imageSrc} alt="example" style={{ maxHeight: '900px', maxWidth: '100%', objectFit: 'contain', background: 'black' }} />}
    {!imageSrc && <h2 style={{ textAlign: 'center' }}>No image loaded yet</h2>}

  </div>
}

export default App
