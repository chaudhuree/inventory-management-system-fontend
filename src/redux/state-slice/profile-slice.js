import { createSlice } from "@reduxjs/toolkit";
export const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        value: []
    },
    reducers: {
        SetProfile: (state, action) => {
            state.value = action.payload
        }
    }
})
export const { SetProfile } = profileSlice.actions;
export default profileSlice.reducer;

// it is used in the UsersAPIRequest GetProfileDetails
// then in the Profile components it is called in the useEffect
// by this data will be stored in this slice
// finally used this data in the Profile component to view and update