/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  forwardRef,
  memo,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { ImagePickerConf, ImagePickerEditorRef, IState } from "./models/index.models";
import "./styles.scss";
import labelEs from "./i18n/es.json";
import labelPT from "./i18n/pt.json";
import labelEn from "./i18n/en.json";
import labelFr from "./i18n/fr.json";
import labelDe from "./i18n/de.json";
import { convertImageUsingCanvas } from "./functions/image-processing";
import EditImage from "./components/EditImage/EditImage";
export * from "./models/index.models";

interface ImagePickerEditorProps {
  config?: ImagePickerConf;
  imageSrcProp?: string;
  color?: string;
  imageChanged?: Function;
}

const initialConfig: ImagePickerConf = {
  language: "en",
  objectFit: "cover",
  hideDeleteBtn: false,
  hideDownloadBtn: false,
  hideEditBtn: false,
  hideAddBtn: false,
  compressInitial: null,
};

const initialState: IState = {
  maxHeight: 3000,
  maxWidth: 3000,
  cropHeight: 150,
  cropWidth: 150,
  maintainAspectRatio: true,
  format: "jpeg",
  arrayCopiedImages: [],
  originImageSrc: "",
  basicFilters: undefined,
  quality: 100,
};

const ReactImagePickerEditor = memo(
  forwardRef<ImagePickerEditorRef, ImagePickerEditorProps>(
    (
      {
        config = {},
        imageSrcProp = "",
        color = "#1e88e5",
        imageChanged = () => {},
      }: {
        config: ImagePickerConf;
        imageSrcProp?: string;
        color?: string;
        imageChanged?: Function;
      },
      ref
    ) => {
      const [state, setState] = useState<IState>({
        ...initialState,
      });
      const [imageSrc, setImageSrc] = useState<string | null>("");
      const [loadImage, setLoadImage] = useState<boolean>(false);
      const [showEditPanel, setShowEditPanel] = useState<boolean>(false);
      const [labels, setLabels] = useState<any>(labelEn);
      const [configuration, setConfiguration] = useState<ImagePickerConf>(initialConfig);
      const imagePicker = useRef<any>(null);
      const fileType = useRef("");
      const urlImage = useRef("");
      const uuidFilePicker = Date.now().toString(20);
      const imageName = useRef("download");
      const mounted = useRef(false);

      useEffect(() => {
        appendLinkIconsToHead();
        processConfig();
      }, [config]);

      useEffect(() => {
        loadImageFromProps();
      }, [imageSrcProp]);

      async function loadImageFromProps() {
        if (imageSrcProp) {
          let result = await parseToBase64(imageSrcProp);
          let newState: IState = result.state;
          newState.originImageSrc = imageSrcProp;
          newState.arrayCopiedImages = [
            {
              lastImage: result.imageUri,
              width: newState.maxWidth,
              height: newState.maxHeight,
              quality: newState.quality,
              format: newState.format,
              originImageSrc: imageSrcProp,
            },
          ];
          // console.log("NEW STATE", newState)
          setImageSrc(result.imageUri);
          setState(newState);
          setLoadImage(true);
        } else {
          let newState = { ...state };
          newState.originImageSrc = null;
          newState.arrayCopiedImages = [];
          setLoadImage(false);
          setImageSrc(null);
          setState(newState);
        }
      }

      useEffect(() => {
        imageChanged(imageSrc);
      }, [imageSrc]);

      function processConfig() {
        let dataConf = { ...configuration, ...config };
        setConfiguration(dataConf);

        if (config.language != undefined) {
          if (config.language == "en") {
            setLabels({ ...labelEn });
          }
          if (config.language == "pt") {
            setLabels({ ...labelPT });
          }
          if (config.language == "es") {
            setLabels({ ...labelEs });
          }
          if (config.language == "fr") {
            setLabels({ ...labelFr });
          }
          if (config.language == "de") {
            setLabels({ ...labelDe });
          }
        }
      }

      function appendLinkIconsToHead() {
        let head: HTMLElement = document.head;
        let linkIcons: HTMLElement | null = head.querySelector("#ngp-image-picker-icons-id");
        if (linkIcons) return;
        let link = document.createElement("link");
        link.href = "https://fonts.googleapis.com/icon?family=Material+Icons";
        link.rel = "stylesheet";
        link.id = "ngp-image-picker-icons-id";
        head.appendChild(link);
      }

      function onUpload(event: any) {
        event.preventDefault();
        imagePicker?.current?.click();
      }

      function handleFileSelect(this: typeof handleFileSelect, event: any) {
        const files = event.target?.files;
        if (files) {
          const file = files[0];
          imageName.current = file.name.split(".")[0];
          fileType.current = file.type;
          if (!fileType.current.includes("image")) return;
          urlImage.current = `data:${file.type};base64,`;
          if (file) {
            setState({ ...state, format: fileType.current.split("image/")[1] });
            const reader = new FileReader();
            reader.onload = handleReaderLoaded.bind(this);
            reader.readAsBinaryString(file);
          }
        }
      }

      async function handleReaderLoaded(readerEvt: any) {
        const binaryString = readerEvt.target.result;
        const base64textString = btoa(binaryString);
        let newState = { ...state };
        let newImageSrc = urlImage.current + base64textString;
        newState.originImageSrc = urlImage.current + base64textString;
        if (configuration.compressInitial) {
          newState = {
            ...newState,
            quality: Math.min(configuration.compressInitial || 92, 100),
            maintainAspectRatio: true,
            format: "jpeg",
          };
          let result = await convertImageUsingCanvas(
            newState.originImageSrc as string,
            false,
            newState,
            { getDimFromImage: true }
          );
          setState(result.state);
          setImageSrc(result.imageUri);
          setLoadImage(true);
        } else {
          let img = document.createElement("img");
          img.src = newImageSrc;
          img.onload = () => {
            newState.arrayCopiedImages = [];
            newState.maxHeight = img.height;
            newState.maxWidth = img.width;
            newState.format = fileType.current.split("image/")[1];
            newState.arrayCopiedImages.push({
              lastImage: newImageSrc,
              width: img.width,
              height: img.height,
              quality: newState.quality,
              format: fileType.current.split("image/")[1],
              originImageSrc: newState.originImageSrc as string,
            });
            setState(newState);
            setImageSrc(newImageSrc);
            setLoadImage(true);
          };
        }
      }

      const sizeImage = useMemo(() => {
        if (imageSrc && imageSrc.length) {
          return Math.ceil(((3 / 4) * imageSrc.length) / 1024);
        } else {
          return "";
        }
      }, [imageSrc]);

      function parseToBase64(imageUrl: string): Promise<{ imageUri: string; state: IState }> {
        let newState = { ...state };
        let types = imageUrl.split(".");
        let type = types[types.length - 1];
        if (type && (type == "png" || type == "jpeg" || type == "webp")) {
          type = type;
        } else {
          type = "jpeg";
        }
        newState.format = type;
        if (config.compressInitial != null) {
          let quality = 1;
          if (config.compressInitial >= 0 && config.compressInitial <= 100) {
            quality = config.compressInitial;
          }
          newState.quality = quality;
        }

        return new Promise((resolve, reject) => {
          let img = new Image();
          img.crossOrigin = "Anonymous";
          newState.maxHeight = img.height;
          newState.maxWidth = img.width;

          img.onload = () => {
            let canvas = document.createElement("canvas");
            let ctx: any = canvas.getContext("2d");
            let ratio = 1.0;
            canvas.width = img.width * ratio;
            canvas.height = img.height * ratio;
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            console.log(newState.quality);
            let dataURI = canvas.toDataURL(`image/${type}`, newState.quality / 100);
            return resolve({
              dataUri: dataURI,
              width: canvas.width,
              height: canvas.height,
            });
          };
          img.onerror = (e: any) => {
            return reject(e.message || `Error loading the src = ${imageUrl}`);
          };
          img.src = imageUrl;
        }).then((data: any) => {
          newState = {
            ...newState,
            maxHeight: data.height,
            maxWidth: data.width,
          };
          return { imageUri: data.dataUri, state: newState };
        });
      }

      function onOpenEditPanel() {
        setShowEditPanel(true);
      }

      function onCloseEditPanel(data: any) {
        setShowEditPanel(false);
        if (data) {
          setState(data.state);
          setImageSrc(data.imageSrc);
        }
      }

      function onRemove() {
        setImageSrc(null);
        setLoadImage(false);
        const newState: IState = {
          ...state,
          ...initialState,
        };
        setState(newState);
        setShowEditPanel(false);
      }

      useImperativeHandle(ref, () => ({
        onRemove,
        onOpenEditPanel,
        handleFileSelect,
      }));

      return (
        <div className="ReactImagePickerEditor">
          {!loadImage && (
            <div className="place-image">
              <div
                className="image-holder"
                style={{
                  width: configuration.width,
                  height: configuration.height,
                  borderRadius: configuration.borderRadius,
                  aspectRatio: configuration.aspectRatio + "",
                }}
              >
                <button
                  type="button"
                  title={labels["Upload a image"]}
                  className="icon-btn image-upload-btn"
                  onClick={onUpload}
                >
                  <span className="material-icons">add_a_photo</span>
                </button>

                <input
                  ref={imagePicker}
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  id={"filePicker-" + uuidFilePicker}
                  onChange={handleFileSelect}
                />
              </div>
            </div>
          )}
          {loadImage && (
            <div className="place-image">
              <div
                className="image-holder-loaded"
                style={{
                  width: configuration.width,
                  height: configuration.height,
                  borderRadius: configuration.borderRadius,
                  aspectRatio: configuration.aspectRatio + "",
                }}
              >
                <img
                  src={imageSrc as string}
                  alt="image-loaded"
                  style={{
                    borderRadius: configuration.borderRadius,
                    objectFit: configuration.objectFit,
                  }}
                />
                <div className="curtain" onClick={onUpload}>
                  <button type="button" title={labels["Upload a image"]}>
                    <span className="material-icons">add_a_photo</span>
                  </button>
                </div>
                <input
                  ref={imagePicker}
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  id={"filePicker-" + uuidFilePicker}
                  onChange={handleFileSelect}
                />
              </div>
              <div
                style={{
                  flexDirection: "column",
                  boxSizing: "border-box",
                  display: "flex",
                  placeContent: "center",
                  alignItems: "center",
                  gap: "5%",
                  background: "#000",
                  borderTopRightRadius: "7px",
                  borderBottomRightRadius: "7px",
                  height: configuration.height,
                }}
                className="editing-bar-btn"
              >
                {!configuration.hideAddBtn && (
                  <button
                    type="button"
                    className="icon-btn"
                    id="upload-img"
                    title={labels["Upload a image"]}
                    onClick={onUpload}
                  >
                    <span className="material-icons">add_a_photo</span>
                  </button>
                )}

                {!configuration.hideEditBtn && (
                  <button
                    type="button"
                    className="icon-btn"
                    id="edit-img"
                    title={labels["Open the editor panel"]}
                    onClick={onOpenEditPanel}
                  >
                    <span className="material-icons">edit</span>
                  </button>
                )}
                {!configuration.hideDownloadBtn && (
                  <a
                    id="download-img"
                    title={labels["Download the image"]}
                    href={imageSrc as string}
                    download={imageName.current}
                  >
                    <span className="material-icons">cloud_download</span>
                  </a>
                )}

                {!configuration.hideDeleteBtn && (
                  <button
                    type="button"
                    className="icon-btn"
                    id="delete-img"
                    title={labels["Remove"]}
                    onClick={() => onRemove()}
                  >
                    <span className="material-icons">delete</span>
                  </button>
                )}
              </div>
            </div>
          )}
          {showEditPanel && (
            <EditImage
              saveUpdates={onCloseEditPanel}
              labels={labels}
              color={color}
              image={imageSrc}
              initialState={state}
            ></EditImage>
          )}
        </div>
      );
    }
  )
);

export default ReactImagePickerEditor;
