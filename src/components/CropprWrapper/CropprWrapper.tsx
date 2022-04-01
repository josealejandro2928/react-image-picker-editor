import React, { memo, useEffect, useRef, useState } from 'react'
import Croppr from '../../functions/croppr/index';

import './croppr.scss';

const CropprWrapper = memo(({ src, size, croppUpdate }:
  {
    src: string,
    size: any,
    croppUpdate: (data: { x: number; y: number; width: number; height: number }) => void
  }) => {
  const [imageSrc, setImageSrc] = useState<string | undefined | null>()
  const [croppSize, setCroppSize] = useState<{ width: number; height: number }>({ width: 150, height: 150 })
  const croppr = useRef<Croppr | undefined | null>(null);
  const mount = useRef<HTMLImageElement | undefined | null>();

  useEffect(() => {
    if (size) {
      setCroppSize({ ...size });
      if (croppr.current) croppr.current.resizeTo(size.width, size.height);
    }
  }, [size])

  useEffect(() => {
    if (src) {
      setImageSrc(src);
    }
  }, [src])

  useEffect(() => {
    if (mount.current && imageSrc) {
      croppr.current = new Croppr('#croppr', {
        minSize: [32, 32, 'px'],
        startSize: [croppSize.width, croppSize.height, 'px'],
        onInitialize: (data: Croppr | any) => {
          croppUpdate(data?.getValue());
        },
        onCropEnd: (data: { x: number; y: number; width: number; height: number }) => {
          croppUpdate(data);
        },
      });
    }
    return () => (croppr?.current?.destroy())
  }, [mount.current, imageSrc])


  return <div className='CropprWrapper'>
    <img ref={mount as any} src={imageSrc as string} id="croppr" />
  </div>

})

export default CropprWrapper
