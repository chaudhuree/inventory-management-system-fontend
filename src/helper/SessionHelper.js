class SessionHelper {
    // set token in local storage
    setToken(token) {
        localStorage.setItem("token", token)
    }
    // get token from local storage
    getToken() {
        return localStorage.getItem("token")
    }
    // set user details in local storage
    setUserDetails(UserDetails) {
        localStorage.setItem("UserDetails", JSON.stringify(UserDetails))
    }
    // get user details from local storage
    getUserDetails() {
        return JSON.parse(localStorage.getItem("UserDetails"))
    }
    // set email in local storage
    setEmail(Email) {
        localStorage.setItem("Email", Email)
    }
    // get email from local storage
    getEmail() {
        return localStorage.getItem("Email")
    }
    // for forget password set OTP in local storage
    setOTP(OTP) {
        localStorage.setItem("OTP", OTP)
    }
    getOTP() {
        return localStorage.getItem("OTP")
    }
    // remove all sessions for logout
    removeSessions = () => {
        localStorage.clear();
        window.location.href = "/login"
    }
}
export const { setEmail, getEmail, setOTP, getOTP, setToken, getToken, setUserDetails, getUserDetails, removeSessions } = new SessionHelper();