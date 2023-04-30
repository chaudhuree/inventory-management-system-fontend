import axios from "axios";
import { ErrorToast, SuccessToast } from "../helper/FormHelper";
import {
  getToken,
  setEmail,
  setOTP,
  setToken,
  setUserDetails,
} from "../helper/SessionHelper";
import { BaseURL } from "../helper/config";
import { SetProfile } from "../redux/state-slice/profile-slice";
import { HideLoader, ShowLoader } from "../redux/state-slice/settings-slice";
import store from "../redux/store/store";

// this is used where login is used. and token need to be send.
// getToken is a helper function used to get token from the local storage
// it will only true if login is done successfully
const AxiosHeader = { headers: { token: getToken() } };

export async function LoginRequest(email, password) {
    // this is used to show loader
    // this will remove default d-none class from loader(FullScreenLoader.jsx)
  store.dispatch(ShowLoader());
  let URL = BaseURL + "/Login";

  let PostBody = { email: email, password: password };

  let res = await axios.post(URL, PostBody);

  if (res.data["status"] !== "unauthorized") {
    setToken(res.data["token"]);

    setUserDetails(res.data["data"]);

    // SuccessToast("Login Success");

    store.dispatch(HideLoader());

    return true;
  }
  store.dispatch(HideLoader());
  ErrorToast("Invalid Email or Password");
  return false;
}

export async function RegistrationRequest(
  email,
  firstName,
  lastName,
  mobile,
  password,
  photo
) {
  try {
    store.dispatch(ShowLoader());
    let URL = BaseURL + "/Registration";
    let PostBody = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      mobile: mobile,
      password: password,
      photo: photo,
    };
    let res = await axios.post(URL, PostBody);
    store.dispatch(HideLoader());
    if (res.status === 200) {
      if (res.data["status"] === "fail") {
        if (res.data["data"]["keyPattern"]["email"] === 1) {
          ErrorToast("Email Already Exist");
          return false;
        } else {
          ErrorToast("Something Went Wrong");
          return false;
        }
      } else {
        SuccessToast("Registration Success");
        return true;
      }
    } else {
      ErrorToast("Something Went Wrong");
      return false;
    }
  } catch (e) {
    store.dispatch(HideLoader());
    ErrorToast("Something Went Wrong");
    return false;
  }
}

// get profile details and store in redux
export async function GetProfileDetails() {
  try {
    store.dispatch(ShowLoader());
    let URL = BaseURL + "/ProfileDetails";
    let res = await axios.get(URL, AxiosHeader);
    store.dispatch(HideLoader());
    if (res.status === 200) {
      store.dispatch(SetProfile(res.data["data"][0])); 
        // store profile details in redux
      // from the backend i have used aggregate match.
      // so data is in array of 1 element
    } else {
      ErrorToast("Something Went Wrong");
    }
  } catch (e) {
    store.dispatch(HideLoader());
    ErrorToast("Something Went Wrong");
  }
}

// this is used to update profile
export async function ProfileUpdateRequest(
  email,
  firstName,
  lastName,
  mobile,
  password,
  photo
) {
  try {
    store.dispatch(ShowLoader());
    let URL = BaseURL + "/ProfileUpdate";
    let PostBody = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      mobile: mobile,
      password: password,
      photo: photo,
    };
    // after updating need to update data in the locals storage
    // so then UserDetails is used to update in the local storage
    let UserDetails = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      mobile: mobile,
      photo: photo,
    };
    let res = await axios.post(URL, PostBody, AxiosHeader);
    store.dispatch(HideLoader());
    if (res.status === 200) {
      SuccessToast("Profile Update Success");
      // to update in the local storage 🔽🔽
      setUserDetails(UserDetails);
      return true;
    } else {
      ErrorToast("Something Went Wrong");
      return false;
    }
  } catch (e) {
    ErrorToast("Something Went Wrong");
    store.dispatch(HideLoader());
    return false;
  }
}

export async function RecoverVerifyEmailRequest(email) {
  try {
    store.dispatch(ShowLoader());
    let URL = BaseURL + "/RecoverVerifyEmail/" + email;
    let res = await axios.get(URL);
    store.dispatch(HideLoader());
    if (res.status === 200) {
      if (res.data["status"] === "fail") {
        ErrorToast("No user found");
        return false;
      } else {
        setEmail(email);
        SuccessToast(
          "A 6 Digit verification code has been sent to your email address. "
        );
        return true;
      }
    } else {
      ErrorToast("Something Went Wrong");
      return false;
    }
  } catch (e) {
    ErrorToast("Something Went Wrong");
    store.dispatch(HideLoader());
    return false;
  }
}

export async function RecoverVerifyOTPRequest(email, OTP) {
  debugger;
  try {
    store.dispatch(ShowLoader());
    let URL = BaseURL + "/RecoverVerifyOTP/" + email + "/" + OTP;
    let res = await axios.get(URL);
    store.dispatch(HideLoader());
    if (res.status === 200) {
      if (res.data["status"] === "fail") {
        ErrorToast("Code Verification Fail");
        return false;
      } else {
        setOTP(OTP);
        SuccessToast("Code Verification Success");
        return true;
      }
    } else {
      ErrorToast("Something Went Wrong");
      return false;
    }
  } catch (e) {
    ErrorToast("Something Went Wrong");
    store.dispatch(HideLoader());
    debugger;
    return false;
  }
}

export async function RecoverResetPassRequest(email, OTP, password) {
  try {
    store.dispatch(ShowLoader());
    let URL = BaseURL + "/RecoverResetPass";
    let PostBody = { email: email, OTP: OTP, password: password };
    let res = await axios.post(URL, PostBody);
    store.dispatch(HideLoader());
    if (res.status === 200) {
      if (res.data["status"] === "fail") {
        ErrorToast(res.data["data"]);
        return false;
      } else {
        setOTP(OTP);
        SuccessToast("NEW PASSWORD CREATED");
        return true;
      }
    } else {
      ErrorToast("Something Went Wrong");
      return false;
    }
  } catch (e) {
    ErrorToast("Something Went Wrong");
    store.dispatch(HideLoader());
    return false;
  }
}
