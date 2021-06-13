import React, { useState, useCallback, useRef, useEffect } from "react";
import ReactCrop from "react-image-crop";
import Resizer from "react-image-file-resizer";
import "react-image-crop/dist/ReactCrop.css";
import { connect } from "react-redux";
import { setAlert } from "./actions/alert";

const CustomImage = ({
  aspectRatio,
  setAlert,
  setImgCropSec,
  setCustomImage,
}) => {
  const [upImg, setUpImg] = useState();
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState({
    unit: "%",
    aspect: aspectRatio.split("/")[0] / aspectRatio.split("/")[1],
  });
  const [completedCrop, setCompletedCrop] = useState(null);
  const [cropImgUrl, setCropImgUrl] = useState({
    // this will be uploaded
    imageUrl: "",
    blob: "",
  });
  // customImage downloaded with same filename
  const [filename, setFilename] = React.useState(null);

  const generateUpload = (canvas, crop, setCropImgUrl) => {
    if (!crop || !canvas) {
      return;
    }

    canvas.toBlob(
      // This is cropped image
      (blob) => {
        setCropImgUrl({
          ...cropImgUrl,
          imageUrl: URL.createObjectURL(blob),
          blob,
        });
        // sending cropped image blob
        uploadResizedImg(canvas, blob);
      },
      "image/png",
      1
    );
  };

  const uploadResizedImg = (canvas, blob) => {
    // canvas.width & canvas.height correspond to real width & height of the image
    if (blob) {
      Resizer.imageFileResizer(
        blob, // file to be resized
        canvas.width, // maxWidth in px of new img
        canvas.height, // maxHeight in px of new img
        "JPEG", // compressFormat of new img
        100, // quality
        0, // It is the degree of clockwise rotation to apply to uploaded image
        (uri) => {
          setCropImgUrl({
            //  **Cropped & resized uri**
            imageUrl: uri,
            blob: "",
          });
          console.log("Custom Tile has been set successfully ! ");

          // saveBase64AsFile(uri, filename);
          setCustomImage(uri);
          setAlert("Image Set Successfully", "uni-blue", 4000);
        },
        "base64", // Is the output type of the resized new image.
        // While uploading to S3 use *base64*
        canvas.width,
        canvas.height
      );
    }
  };

  // function saveBase64AsFile(base64, fileName) {
  //   var link = document.createElement("a");

  //   document.body.appendChild(link); // for Firefox

  //   link.setAttribute("href", base64);
  //   link.setAttribute("download", fileName);
  //   link.click();
  // }

  const onSelectFile = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setUpImg(reader.result));
      // https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL
      setFilename(e.target.files[0].name);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    // https://thisthat.dev/natural-width-vs-width/
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    // will always return the same drawing context instance
    const ctx = canvas.getContext("2d");
    // ratio of the resolution in physical pixels to the resolution in CSS pixels for the current display device
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;

    // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setTransform
    // https://www.w3schools.com/tags/tryit.asp?filename=tryhtml5_canvas_setTransform
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
  }, [completedCrop]);

  const cancelCrop = (e) => {
    e.preventDefault();
    setImgCropSec(null);
  };

  return (
    <div className="row">
      <div className="col-12">
        <div className="d-flex justify-content-center">
          <div className="mx-auto mt-3" style={{ width: "100%" }}>
            <div className="text-center">
              <div>Drag & Select part of the image</div>
              <div>
                <input
                  id="custom-image-accept"
                  type="file"
                  accept="image/*"
                  className="d-none"
                  onChange={onSelectFile}
                />
              </div>
              <ReactCrop
                src={upImg}
                onImageLoaded={onLoad}
                crop={crop}
                onChange={(c) => setCrop(c)}
                onComplete={(c) => setCompletedCrop(c)}
              />

              <div
                className="mt-1"
                style={{
                  paddingTop: "1.3rem",
                  paddingBottom: "1.3rem",
                  backgroundColor: "#ececec",
                  borderRadius: "1.3rem",
                }}
              >
                <div
                  className=""
                  style={{ color: "#7f7f7f", fontSize: "1rem" }}
                >
                  Preview Cropped Image
                  <hr />
                </div>

                <canvas
                  id="image_canvas"
                  ref={previewCanvasRef}
                  className="px-2"
                  // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
                  style={{
                    width: Math.round(completedCrop?.width ?? 0),
                    height: Math.round(completedCrop?.height ?? 0),
                  }}
                />
              </div>

              <div className="d-flex justify-content-between">
                <div className="">
                  <label
                    htmlFor="custom-image-accept"
                    className="btn btn-sm btn-primary mt-1"
                  >
                    Choose Image{" "}
                  </label>
                </div>
                <div className="">
                  <button
                    type="button"
                    disabled={!completedCrop?.width || !completedCrop?.height}
                    onClick={(e) =>
                      generateUpload(
                        previewCanvasRef.current,
                        completedCrop,
                        setCropImgUrl
                      )
                    }
                    className="btn btn-sm btn-primary mt-1"
                  >
                    Set Image
                  </button>
                </div>
                <div className="">
                  <button
                    type="button"
                    className="btn btn-sm btn-secondary mt-1"
                    onClick={(e) => cancelCrop(e)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { setAlert })(CustomImage);
// export default CustomImage;
