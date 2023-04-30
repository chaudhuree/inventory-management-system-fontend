import {configureStore} from "@reduxjs/toolkit";
import settingsReducer from "../state-slice/settings-slice";
import profileReducer from "../state-slice/profile-slice";
import brandReducer from "../state-slice/brand-slice";


export default configureStore({
    reducer:{
        settings:settingsReducer,
        profile:profileReducer,
        brand:brandReducer,
    }
})