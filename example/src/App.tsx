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
    compressInitial: 92,
  };

  return <div className='container'>
    <Header />

    <ReactImagePickerEditor config={config2} ></ReactImagePickerEditor>

  </div>
}

export default App
