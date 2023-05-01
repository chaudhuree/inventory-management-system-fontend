import {configureStore} from "@reduxjs/toolkit";
import settingsReducer from "../state-slice/settings-slice";
import profileReducer from "../state-slice/profile-slice";
import brandReducer from "../state-slice/brand-slice";
import categoryReducer from "../state-slice/category-slice";
import customerReducer from "../state-slice/customer-slice";

export default configureStore({
    reducer:{
        settings:settingsReducer,
        profile:profileReducer,
        brand:brandReducer,
        category:categoryReducer,
        customer:customerReducer,
    }
})