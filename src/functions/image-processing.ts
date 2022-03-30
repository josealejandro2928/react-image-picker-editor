import { IState } from '../models/index.models';

export const MAX_BUFFER_UNDO_MEMORY = 25;
let rotate = 1;

export const convertImageUsingCanvas = (
  dataSrc: string,
  changeHeight = false,
  state: IState,
  options?: { getDimFromImage?: boolean; rotate?: number },
): Promise<{ imageUri: string; state: any }> => {
  return new Promise(async (resolve, _) => {
    let img = document.createElement('img');
    img.src = dataSrc + '';
    img.crossOrigin = 'Anonymous';
    let quality = state.quality / 100;
    let maintainRatio = state.maintainAspectRatio;

    img.onload = () => {
      var canvas = document.createElement('canvas');
      let ctx: CanvasRenderingContext2D | null | any = canvas.getContext('2d');
      let ratio = img.width / img.height;
      let width = state.maxWidth;
      let height = state.maxHeight;

      if (options?.getDimFromImage) {
        width = img.width;
        height = img.height;
      }

      if (maintainRatio) {
        canvas.width = width;
        canvas.height = width / ratio;
        if (changeHeight) {
          canvas.width = height * ratio;
          canvas.height = height;
        }
      } else {
        canvas.width = width;
        canvas.height = height;
      }
      if (state.basicFilters) {
        ctx.filter = processFilter(state.basicFilters);
      }
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      let type = state.format;
      var dataURI = canvas.toDataURL(`image/${type}`, quality);
      // console.log("🚀 ~ file: image-processing.ts ~ line 48 ~ returnnewPromise ~ quality", quality)
      resolve({
        dataUri: dataURI,
        width: canvas.width,
        height: canvas.height,
      });
    };
  }).then((data: any) => {
    state.maxHeight = data.height;
    state.maxWidth = data.width;
    saveState(state, data.dataUri);
    return { imageUri: data.dataUri, state };
  });

  function processFilter(data: any) {
    return Object.keys(data)
      .map((key) => {
        if (['blur'].includes(key)) {
          return `${key}(${data[key]}px)`;
        } else {
          return `${key}(${data[key]})`;
        }
      })
      .join('');
  }
};

export const dragElement = (element: any) => {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById(element.id + '-header')) {
    /* if present, the header is where you move the DIV from:*/
    let x: any = document.getElementById(element.id + '-header');
    x.onmousedown = dragPressOn;
    let y: any = document.getElementById(element.id + '-header');
    y.ontouchstart = dragPressOn;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    element.ontouchstart = dragPressOn;
    element.onmousedown = dragPressOn;
  }

  function dragPressOn(e: any) {
    let popup: any = document.querySelector('#popup');
    popup.style.overflowY = 'hidden';
    e = e || window.event;
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.ontouchend = closeDragElement;
    document.onmouseup = closeDragElement;
    document.ontouchmove = elementDragTouch;
    document.onmousemove = elementDragMouse;
  }

  function elementDragMouse(e: any) {
    let holderImage = document.getElementById('image-full');
    e = e || window.event;
    pos1 = pos3 - e.clientX;
    pos3 = e.clientX;
    pos2 = pos4 - e.clientY;
    pos4 = e.clientY;

    let newTop = element.offsetTop - pos2;
    let newLeft = element.offsetLeft - pos1;
    let rectHolder = holderImage?.getBoundingClientRect();
    let rectElemnt = element.getBoundingClientRect();
    // console.log('====================================');
    // console.log(rectElemnt,rectHolder);
    // console.log('====================================');
    newTop = Math.max(newTop, rectHolder?.top as number);
    newTop = Math.min(
      newTop,
      (rectHolder?.bottom as number) - rectElemnt.height,
    );
    newLeft = Math.max(newLeft, rectHolder?.left as number);
    newLeft = Math.min(
      newLeft,
      (rectHolder?.right as number) - rectElemnt.width,
    );
    element.style.top = newTop + 'px';
    element.style.left = newLeft + 'px';
  }

  function elementDragTouch(e: any) {
    let holderImage = document.getElementById('image-full');
    e = e || window.event;

    if (e?.changedTouches?.length) {
      pos1 = pos3 - e.changedTouches[0]?.clientX;
      pos3 = e.changedTouches[0]?.clientX;
    }
    if (e?.changedTouches?.length) {
      pos2 = pos4 - e.changedTouches[0]?.clientY;
      pos4 = e.changedTouches[0]?.clientY;
    }

    let newTop = element.offsetTop - pos2;
    let newLeft = element.offsetLeft - pos1;
    let rectHolder = holderImage?.getBoundingClientRect();
    let rectElemnt = element.getBoundingClientRect();

    // console.log('====================================');
    // console.log(rectElemnt,rectHolder);
    // console.log('====================================');

    newTop = Math.max(newTop, rectHolder?.top as number);
    newTop = Math.min(
      newTop,
      (rectHolder?.bottom as number) - rectElemnt.height,
    );
    newLeft = Math.max(newLeft, rectHolder?.left as number);
    newLeft = Math.min(
      newLeft,
      (rectHolder?.right as number) - rectElemnt.width,
    );
    element.style.top = newTop + 'px';
    element.style.left = newLeft + 'px';
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    let popup: any = document.querySelector('#popup');
    popup.style.overflowY = 'auto';
    document.onmouseup = null;
    document.onmousemove = null;
    document.ontouchend = null;
    document.ontouchmove = null;
  }
};

export const saveState = (state: IState, lastImage?: string) => {
  if (state.arrayCopiedImages.length <= MAX_BUFFER_UNDO_MEMORY) {
    state.arrayCopiedImages.push({
      lastImage: lastImage as any,
      width: state.maxWidth,
      height: state.maxHeight,
      quality: state.quality,
      format: state.format,
      originImageSrc: state.originImageSrc as any,
      basicFilters: state.basicFilters,
    });
  } else {
    state.arrayCopiedImages[state.arrayCopiedImages.length - 1] = {
      lastImage: lastImage as any,
      width: state.maxWidth,
      height: state.maxHeight,
      quality: state.quality,
      format: state.format,
      originImageSrc: state.originImageSrc as any,
      basicFilters: state.basicFilters,
    };
  }
};
