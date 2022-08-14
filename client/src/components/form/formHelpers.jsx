import { useRef, useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "../../firebase";
import check from "../../check.png";

export const FileInput = ({
   namer,
   label,
   value,
   type,
   handleInputImage,
   formErrors,
   ...rest
}) => {
   const inputRef = useRef();
   const [progress, setProgress] = useState(0);
   const [track, setTrack] = useState(false);

   const handleUpload = () => {
      setTrack(true);
      const fileName = new Date().getTime() + value.name;
      const storageRef = ref(storage, `/files/${fileName}`);

      const uploadTask = uploadBytesResumable(storageRef, value);
      uploadTask.on(
         "state_changed",
         (snapshot) => {
            const percentile = Math.floor(
               (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(percentile);
         },
         (error) => {
         },
         () => {
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
               handleInputImage(namer, url);
            });
         }
      );
   };
   return (
      <div className="col-md-12">
         <label htmlFor="c_iiPassword" className="text-black bold-text">
            {label}
         </label>

         <input
            type="file"
            id="c_iiPassword"
            ref={inputRef}
            onChange={(e) => handleInputImage(namer, e.currentTarget.files[0])}
            className="form-control"
            {...rest}
         />

         <button
            type="button"
            onClick={() => inputRef.current.click()}
            className="btn btn-danger btn-block bold-text"
         >
            {label}
         </button>
         {value !== null && !track && typeof value !== "string" && (
            <button
               onClick={handleUpload}
               className="btn btn-danger btn-block bold-text"
            >
               Upload
            </button>
         )}
         {track && progress < 100 && (
            <div className="outerbar">
               <p>{progress}%</p>
            </div>
         )}
         {progress === 100 && (
            <div className="outerbar">
               <img src={check} alt="notify" className="input_img"/>
            </div>
         )}

         <p className="text-danger">{formErrors?.image}</p>
      </div>
   );
};