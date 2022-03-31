export interface ImagePickerConf {
  width?: string;
  height?: string;
  borderRadius?: string;
  aspectRatio?: number | null;
  objectFit?: "cover" | "contain" | "fill" | "revert" | "scale-down";
  compressInitial?: number | undefined | null;
  language?: string;
  hideDeleteBtn?: boolean;
  hideDownloadBtn?: boolean;
  hideEditBtn?: boolean;
  hideAddBtn?: boolean;
}

export interface IState {
  quality: number;
  maxHeight: number;
  maxWidth: number;
  cropHeight: number;
  cropWidth: number;
  maintainAspectRatio: boolean;
  format: string;
  arrayCopiedImages: Array<ICacheData>;
  originImageSrc: string | null | undefined;
  basicFilters?: IBasicFilterState;
}

export interface ICacheData {
  lastImage: string;
  originImageSrc: string;
  width: number;
  height: number;
  quality: number;
  format: string;
  basicFilters?: IBasicFilterState | null | undefined;
}

export interface IBasicFilterState {
  contrast: number;
  blur: number;
  brightness: number;
  grayscale: number;
  invert: number;
  saturate: number;
  sepia: number;
}
