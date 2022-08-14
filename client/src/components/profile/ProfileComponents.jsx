import React, { useState, useRef, useEffect } from "react";
import { useCookies } from "react-cookie";
import { handleInput, validateEmpty } from "../../helpers/input";
import { changeImage, changePassword } from "../../actions/users";
import { FileInput } from "../form/formHelpers";
import { toast } from "react-toastify";

const ProfileComponents = () => {
   const [password, setPassword] = useState({
      newPassword: "",
      oldPassword: "",
   });
   const [image, setImage] = useState({image: null});
   const [formErrors, setFormErrors] = useState({});
   const [isPass, setIsPass] = useState(false);
   const closeRef = useRef();
   const referal = useRef();

   const [cookies] = useCookies();
   const user = cookies.user;

   const reset = () => {
      setPassword({
         oldPassword: "",
         newPassword: "",
      });
   };

   
   const handleInputImage = (name, value) => {
      setImage((prev) => ({ ...prev, [name]: value }));
   };

   const handleUpdatePassword = async (e) => {
      e.preventDefault();
      setFormErrors(validateEmpty(password));
      setIsPass(true)
   };

   const handleChangeImage = async (e) => {
      e.preventDefault();
      if (image.image === null) {
         toast.error("Image required", {autoClose:2000})
      } else {
         const res = await changeImage(image, user.token);
         if (res?.status === 200) {
            setImage({ image: null });
            closeRef.current.click()
            toast.success("image updated", {autoClose:2000})
         } else {
            toast.error("please try again", {autoClose:2000})
         }
      }
   };

   useEffect(() => {
      referal.current()
   }, [formErrors])

 

   const updateUser = async()=>{
      if (Object.keys(formErrors).length === 0 && isPass) {
         const res = await changePassword(
            { ...password, id: user._id },
            user.token
         )
         if (res?.status === 200) {
            toast.success("Password Changed", {autoClose:2000})
            closeRef.current.click();
            reset();
         } else {
            toast.error(`${res.data}`, {autoClose:2000})
         }
         
      }
   }

   referal.current = updateUser


   return (
      <div className="site-section">
         <div className="container">
            <div className="row mb-5 d-flex">
               <div className="col-md-12 justify-content-center, align-items-center">
                  <div className="site-blocks-table">
                     <div
                        style={{
                           alignItems: "center",
                           justifyContent: "center",
                           display: "flex",
                        }}
                     >
                        <img
                           src={user.image}
                           alt={user._id}
                           className="img-fluid"
                           style={{ borderRadius: "50%", height: 300, width: 250 }}
                        />
                     </div>
                  </div>
               </div>
            </div>

            <div className="row">
               <div className="col-md-6">
                  <div className="row mb-5 d-flex">
                     <div className="col-md-6 mb-3 mb-md-0 justify-content-center, align-items-center">
                        <button
                           className="btn btn-danger btn-sm btn-block"
                           data-toggle="modal"
                           data-target="#uploadProfilePictureModal"
                        >
                           Update Profile Picture
                        </button>
                     </div>
                     <div className="col-md-6">
                        <button
                           className="btn btn-outline-danger btn-sm btn-block"
                           data-toggle="modal"
                           data-target="#changePasswordModal"
                        >
                           Change password
                        </button>
                        
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <div
            className="modal fade mt-5"
            id="changePasswordModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
            style={{ marginTop: "10rem", zIndex: 10000 }}
         >
            <div className="modal-dialog">
               <div className="modal-content">
                  <div className="modal-header">
                     <h5 className="modal-title" id="exampleModalLabel">
                        Update Password
                     </h5>
                     <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                     >
                        <span aria-hidden="true">&times;</span>
                     </button>
                  </div>
                  <div className="modal-body">
                     <form>
                        <div className="form-group row">
                           <div className="col-md-12">
                              <label
                                 for="c_oldPassword"
                                 className="text-black bold-text"
                              >
                                 Old Password{" "}
                                 <span className="text-danger">*</span>
                              </label>
                              <input
                                 type="password"
                                 className="form-control"
                                 name="oldPassword"
                                 value={password.oldPassword}
                                 onChange={(e) => handleInput(e, setPassword)}
                                 placeholder="enter old password"
                              />
                           </div>
                        </div>
                        <div className="form-group row">
                           <div className="col-md-12">
                              
                              <label
                                 for="c_newPassword"
                                 className="text-black bold-text"
                              >
                                 New Password{" "}
                                 <span className="text-danger">*</span>
                              </label>
                              <input
                                 type="password"
                                 className="form-control"
                                 id="c_newPassword"
                                 name="newPassword"
                                 value={password.newPassword}
                                 onChange={(e) => handleInput(e, setPassword)}
                                 placeholder="enter new password"
                              />
                           </div>
                           <p className="h5 text-danger m-2">{formErrors?.all}</p>
                        </div>
                     </form>
                  </div>
                  <div className="modal-footer">
                     <button
                        type="button"
                        className="btn btn-secondary"
                        data-dismiss="modal"
                        ref={closeRef}
                     >
                        Close
                     </button>
                     <button
                        type="button"
                        onClick={handleUpdatePassword}
                        className="btn btn-danger"
                     >
                        Update
                     </button>
                  </div>
               </div>
            </div>
         </div>

         <div
            className="modal fade mt-5"
            id="uploadProfilePictureModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
            style={{ marginTop: "10rem", zIndex: 10000 }}
         >
            <div className="modal-dialog">
               <div className="modal-content">
                  <div className="modal-header">
                     <h5 className="modal-title" id="exampleModalLabel">
                        Update Profile Picture
                     </h5>
                     <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                     >
                        <span aria-hidden="true">&times;</span>
                     </button>
                  </div>
                  <div className="modal-body">
                     <form>
                        <div className="form-group row">
                           <div className="col-md-12">
                              <label
                                 for="c_oldPassword"
                                 className="text-black bold-text"
                              >
                                 Select Picture{" "}
                                 <span className="text-danger">*</span>
                              </label>
                              <FileInput
                                 namer="image"
                                 label="Choose Image"
                                 handleInputImage={handleInputImage}
                                 type="image"
                                 value={image.image}
                              />
                           </div>
                        </div>
                     </form>
                  </div>
                  <div className="modal-footer">
                     <button
                        type="button"
                        className="btn btn-secondary"
                        data-dismiss="modal"
                        ref={closeRef}
                     >
                        Close
                     </button>
                     <button
                        type="button"
                        className="btn btn-danger"
                        onClick={handleChangeImage}
                     >
                        Save changes
                     </button>
                  </div>
               </div>
            </div>
         </div>


      </div>
   );
};

export default ProfileComponents;
