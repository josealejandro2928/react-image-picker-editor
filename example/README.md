# ReactImagePickerEditor

React library for the selection, edition and compression of images in png, jpeg and webp formats
This package is made completely with html and css without any extra components or npm packages.
It's based in functional components based in hooks, for optimization were used memo, useMemo and useCalback for avoiding any extra-renders.
This package is the React version of **[ngp-image-picker](https://www.npmjs.com/package/ngp-image-picker)**

### Description

In many projects it is of interest to upload images for a backend, and sometimes we have to consult other programs for the compression of images and the change of format to improve the performance of the page. With `ReactImagePickerEditor` this is possible in real time with for each image that you want to upload.

### Installation

```sh
npm i react-image-picker-editor --save
```

or yarn

```sh
yarn add react-image-picker-editor
```

### External Resource

`ReactImagePickerEditor`, for use the functionality of cropping images, the ResizeObserver api is used
The ResizeObserver interface reports changes to the dimensions of an Element's content or border box, or the bounding box of an SVGElement.
Install the package

```sh
npm i resize-observer-polyfill --save
```

### Usages

You must import the following where you will use it:

``` tsx
...
import ReactImagePickerEditor, { ImagePickerConf } from 'react-image-picker-editor';
import 'react-image-picker-editor/dist/index.css'
...
  const config2: ImagePickerConf = {
    borderRadius: '8px',
    language: 'en',
    width: '330px',
    height: '250px',
    objectFit: 'contain',
    compressInitial: null,
  };
  // const initialImage: string = '/assets/images/8ptAya.webp';
  const initialImage = '';

 return <div>
       ...
        < ReactImagePickerEditor
            config={config2}
            imageSrcProp={initialImage}
            imageChanged={(newDataUri: any) => { setImageSrc(newDataUri) }} />
        </div>
      ...
```

### Here is an example with different configurations

```tsx
<h2>Basic ussage</h2>
  <ReactImagePickerEditor config={config2}/>
<br />
<h2>Initial Image , a callback to get the updates of the dataUri image </h2>
<ReactImagePickerEditor
      config={config2}
      imageSrcProp={initialImage}
      imageChanged={(newDataUri: any) => { setImageSrc(newDataUri) }} />
```

![Image 1](https://ngp-image-picker.surge.sh/assets/images/1.png)

### More about the component

The `ReactImagePickerEditor` component has a setting to change the width, length, the aspectRatio, and objectFit properti of the loaded image. In addition to the language ( en | es | fr | de ). It also has an initial compression ratio option that by default is null.
It is important to note that the quality factor for image compression is only for formats such as: jpeg and webp.
The interface looks like this:

```typescript
export interface ImagePickerConf {
  width?: string;
  height?: string;
  borderRadius?: string;
  aspectRatio?: number | null;
  objectFit?: 'cover' | 'contain' | 'fill' | 'revert' | 'scale-down';
  compressInitial?: number; // Range from [1-100]
  language?: string;
  hideDeleteBtn?: boolean;
  hideDownloadBtn?: boolean;
  hideEditBtn?: boolean;
  hideAddBtn?: boolean;
}
```

| name   |      type      |  description | default|
|----------|:-------------:|:------|------:|
| width |  string | Set the specific width of the div that contain the image uploaded | null |
| height |    string   |   Set the specific height of the div that contain the image uploaded | null|
| borderRadius | string |    Set the property for the holder of the image and the image |null|
| aspectRatio | string |    This apply a specifict aspect ratio to the div, use this with only setting a width and you can archive the ratio that you want it |null |
| objectFit | string | Default is 'cover', but if 'contain' is used the content will be scaled to maintain its aspect ratio while fitting inside the element's content box. |'cover'|
| compressInitial | number | Quality factor applied to images with format: "webp, jpeg"  |null|
| language | string | set the translations object |'en'|
| hideDeleteBtn | boolean | hide the botton |false|
| hideDownloadBtn | boolean | hide the botton |false|
| hideEditBtn | boolean | hide the botton |false|
| hideAddBtn | boolean | hide the botton |false|

A basic configuration object with compression applied would be:

```typescript
  ...
  config1: ImagePickerConf = {
    language: 'en',
    compressInitial: 90
  };
  ...
 ```

 The above example means that once an image is loaded from the file system, a compression quality is applied to it with a value of 0.9, and the resulting image will be reformatted as a jpeg.

### Editing panel

Once you have selected an image, 4 buttons are enabled below the image:

1. load a new image.
2. Open the editing panel.
3. Download the image.
4. Delete the image.

In the edit panel, you can change the quality ratio to compress the file size (in kb). Also changing width and height in px keeping aspect ratio or not, is selectable. You can change the image format as you wish, the options are 'png', 'webp','jpeg'.
The 'Png' format is not affected by changing the quality ratio.
Another capability is that you can crop the image by simply dragging and dropping the cropping component. And by clicking on the crop button.

**I just added a new tab for applying filters**. Now you can not only crop, compress and reformat your image, but you have new features like:

1. Contrast level
2. Brigthness level
3. Gray
4. Sepia
5. Saturation
6. Blur

🔥🔥🔥🔥🔥 You can have in your website a component like the instagram or linkedin for editing your images. 🔥🔥🔥🔥🔥

![Image 1](https://ngp-image-picker.surge.sh/assets/images/tab-section.png)
![Image 2](https://ngp-image-picker.surge.sh/assets/images/2.png)

### Control section

![Image 3](https://ngp-image-picker.surge.sh/assets/images/n-1.png)
![Image 3](https://ngp-image-picker.surge.sh/assets/images/n-2.png)
![Image 3](https://ngp-image-picker.surge.sh/assets/images/n-3.png)
![Image 3](https://ngp-image-picker.surge.sh/assets/images/n-4.png)

### Croping images

![Image 4](https://ngp-image-picker.surge.sh/assets/images/5.png)

#### [DEMO](https://ngp-image-picker.surge.sh/)

##### Stackblitz example

#### [stackblitz example](https://stackblitz.com/edit/react-ts-ww1wtm?file=index.tsx)

##### Angular version

#### [ngp-image-picker](https://www.npmjs.com/package/ngp-image-picker)

##### More useful Npm packages

#### 1. [ngp-lazy-load](https://www.npmjs.com/package/ngp-lazy-load)

#### 2. [ngp-material-rating](https://www.npmjs.com/package/ngp-material-rating)

#### 3. [react-hook-modal](https://www.npmjs.com/package/react-hook-modal)

#### 4. [react-basic-stepper](https://www.npmjs.com/package/react-basic-stepper)

#### 5. [tabs-react-component](https://www.npmjs.com/package/tabs-react-component)
