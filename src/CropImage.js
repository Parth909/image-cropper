import React, { useState, useCallback, useRef, useEffect } from "react";
import ReactCrop from "react-image-crop";
import Resizer from "react-image-file-resizer";
import Brain from "./brain.png";
import "react-image-crop/dist/ReactCrop.css";
import No_img_found from "./no_image_found.jpg";

const CustomImage = () => {
  const [upImg, setUpImg] = useState();
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const closeBtnRef = useRef(null);
  const [crop, setCrop] = useState({ unit: "%", aspect: 1 / 1 });
  const [completedCrop, setCompletedCrop] = useState(null);
  const [cropImgUrl, setCropImgUrl] = useState({
    // this will be uploaded
    imageUrl: "",
    blob: "",
    success: "",
    error: "",
  });
  // customTile will be downloaded using filename
  const [filename, setFilename] = React.useState(null);
  const [alert, setAlert] = React.useState(null);
  const [aspectRatio, setAspectRatio] = React.useState("1/1");

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
            success: "Custom Tile has been set successfully",
            error: "",
            blob: "",
          });
          console.log("Custom Tile has been set successfully ! ", "mem-blue");

          saveBase64AsFile(uri, filename);
          setAlert("Image Downloaded");
        },
        "base64", // Is the output type of the resized new image.
        // While uploading to S3 use *base64*
        canvas.width,
        canvas.height
      );
    }
  };

  function saveBase64AsFile(base64, fileName) {
    var link = document.createElement("a");

    document.body.appendChild(link); // for Firefox

    link.setAttribute("href", base64);
    link.setAttribute("download", fileName);
    link.click();
  }

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

  useEffect(() => {
    let time = null;
    if (alert && alert.length > 0) {
      time = setTimeout(() => {
        setAlert(null);
      }, 4000);
    }
    // If manually clicked Interval will be cleared, this also prevents Memory Leak
    return () => {
      if (time) {
        clearInterval(time);
      }
    };
  }, [alert]);

  useEffect(() => {
    setCrop({
      ...crop,
      aspect: aspectRatio.split("/")[0] / aspectRatio.split("/")[1],
    });
  }, [aspectRatio]);

  const changeAspectRatio = (e) => {
    e.preventDefault();
    setAspectRatio(e.target.value);
  };

  return (
    <div className="container pb-5">
      <div className="row">
        <div className="col-md-8 col-xl-6 col-sm-12 offset-md-2 offset-xl-3">
          <div className="d-flex justify-content-center">
            <div className="mx-auto mt-5" style={{ width: "100%" }}>
              <div className="text-center">
                <img src={Brain} style={{ height: "100px", width: "100px" }} />
              </div>
              <div className="mt-3 text-center">
                <React.Fragment>
                  <div className="mb-3">
                    <label
                      htmlFor="custom-image-accept"
                      className="btn btn-lg btn-custom-primary"
                    >
                      Choose Image{" "}
                    </label>
                    <input
                      id="custom-image-accept"
                      type="file"
                      accept="image/*"
                      className="d-none"
                      onChange={onSelectFile}
                    />
                  </div>
                  <div className="mb-3">
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      value={aspectRatio}
                      onChange={changeAspectRatio}
                    >
                      <option value="1/1">1 : 1 Aspect Ratio</option>
                      <option value="3/2">3 : 2 Aspect Ratio</option>
                      <option value="4/3">4 : 3 Aspect Ratio</option>
                      <option value="16/9">16 : 9 Aspect Ratio</option>
                      <option value="7/5">7 : 5 Aspect Ratio</option>
                      <option value="10/8">10 : 8 Aspect Ratio</option>
                      <option value="2/1">2 : 1 Aspect Ratio</option>
                      <option value="1/2">1 : 2 Aspect Ratio</option>
                    </select>
                  </div>
                </React.Fragment>
                <ReactCrop
                  src={upImg}
                  onImageLoaded={onLoad}
                  crop={crop}
                  onChange={(c) => setCrop(c)}
                  onComplete={(c) => setCompletedCrop(c)}
                />

                <div
                  className="mt-3"
                  style={{
                    padding: "20px",
                    backgroundColor: "#ececec",
                    borderRadius: "20px",
                  }}
                >
                  <div
                    className=""
                    style={{ color: "#7f7f7f", fontSize: "20px" }}
                  >
                    Preview Cropped Image
                    <hr />
                  </div>

                  <canvas
                    id="image_canvas"
                    ref={previewCanvasRef}
                    // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
                    style={{
                      width: Math.round(completedCrop?.width ?? 0),
                      height: Math.round(completedCrop?.height ?? 0),
                    }}
                  />
                </div>

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
                  className="btn btn-lg btn-custom-primary mt-3"
                >
                  Download Image
                </button>

                {alert && (
                  <div
                    className="my-3 alert alert-primary alert-dismissible fade show"
                    role="alert"
                  >
                    <h5>{alert}</h5>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomImage;
// export default CustomImage;
