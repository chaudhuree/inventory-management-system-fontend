import React, { useEffect, useRef } from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetProfileDetails, ProfileUpdateRequest } from "../../APIRequest/UsersAPIRequest";
// GetProfileDetails is used to set profile data in localstorage
// then using useSelector we will get data from redux store

// ProfileUpdateRequest is the main api call to update profile
import { ErrorToast, IsEmail, IsEmpty, IsMobile, getBase64 } from "../../helper/FormHelper";

const Profile = () => {

    let emailRef, firstNameRef, lastNameRef, mobileRef, passwordRef, userImgRef, userImgView = useRef();
    // userImgRef is used to get image file from the input
    // userImgView is used to set the preview image reference
    // so after getting the data by userImgRef we will convert it into base64
    // then set it to userImgView.src
    // this userImgView is ref to the preview image so when we change the userImgView.src then by dom manipulation the preview image will change
    // this userImgView is also used to update the profile image

    
    useEffect(() => {
        // this is a self invoking function
        (async () => {
            await GetProfileDetails()
        })();
    }, [])

    // after setting data in the localstorage using GetProfileDetails
    // we will get data from redux store using useSelector hook by ProfileData
    const ProfileData = useSelector((state) => state.profile.value);

    let navigate = useNavigate();

    // 
    const PreviewImage = () => {
        let ImgFile = userImgRef.files[0];
        // by userImgRef we will get image file from the input
        // then convert it to base64 and set it to userImgView
        getBase64(ImgFile).then((base64Img) => {
            userImgView.src = base64Img;
            // as the preview image ref is set to userImgView
            // so when we change the userImgView.src it will change the preview image
            // it is like dom manipulation
        })
    }

    const UpdateMyProfile = async () => {
        let email = emailRef.value;
        let fastName = firstNameRef.value;
        let lastName = lastNameRef.value;
        let mobile = mobileRef.value;
        let password = passwordRef.value;
        let photo = userImgView.src

        if (IsEmail(email)) {
            ErrorToast("Valid Email Address Required !")
        } else if (IsEmpty(fastName)) {
            ErrorToast("First Name Required !")
        } else if (IsEmpty(lastName)) {
            ErrorToast("Last Name Required !")
        } else if (!IsMobile(mobile)) {
            ErrorToast("Valid Mobile  Required !")
        } else if (IsEmpty(password)) {
            ErrorToast("Password Required !")
        } else {
            let result = await ProfileUpdateRequest(email, fastName, lastName, mobile, password, photo)
            if (result === true) {
                navigate("/")
            }
        }
    }

    return (
        <div className="container">
            <div className="row d-flex justify-content-center">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="container-fluid">
                                <img ref={(input) => userImgView = input} className="icon-nav-img-lg" src={ProfileData['photo']} alt="" />
                                <hr />
                                <div className="row">
                                    <div className="col-4 p-2">
                                        <label>Profile Picture</label>
                                        <input onChange={PreviewImage} ref={(input) => userImgRef = input} placeholder="User Email" className="form-control animated fadeInUp" type="file" />
                                    </div>
                                    <div className="col-4 p-2">
                                        <label>Email Address</label>
                                        <input key={Date.now()} defaultValue={ProfileData['email']} readOnly={true} ref={(input) => emailRef = input} placeholder="User Email" className="form-control animated fadeInUp" type="email" />
                                    </div>
                                    <div className="col-4 p-2">
                                        <label>First Name</label>
                                        <input key={Date.now()} defaultValue={ProfileData['firstName']} ref={(input) => firstNameRef = input} placeholder="First Name" className="form-control animated fadeInUp" type="text" />
                                    </div>
                                    <div className="col-4 p-2">
                                        <label>Last Name</label>
                                        <input key={Date.now()} defaultValue={ProfileData['lastName']} ref={(input) => lastNameRef = input} placeholder="Last Name" className="form-control animated fadeInUp" type="text" />
                                    </div>
                                    <div className="col-4 p-2">
                                        <label>Mobile</label>
                                        <input key={Date.now()} defaultValue={ProfileData['mobile']} ref={(input) => mobileRef = input} placeholder="Mobile" className="form-control animated fadeInUp" type="mobile" />
                                    </div>
                                    <div className="col-4 p-2">
                                        <label>Password</label>
                                        <input key={Date.now()} defaultValue={ProfileData['password']} ref={(input) => passwordRef = input} placeholder="User Password" className="form-control animated fadeInUp" type="password" />
                                    </div>
                                    <div className="col-4 p-2">
                                        <button onClick={UpdateMyProfile} className="w-100  btn btn-success">Update</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Profile;