import {createSlice} from "@reduxjs/toolkit";
export const productSlice=createSlice({
    name:'product',
    initialState:{
        List:[],
        ListTotal:0,
        ProductCategoryDropDown:[],
        ProductBrandDropDown:[],
        FormValue:{
            CategoryID:"",
            BrandID:"",
            Name:"",
            Unit:"",
            Details:""
        }
    },
    reducers:{
        SetProductList:(state,action)=>{
            state.List=action.payload
        },
        SetProductListTotal:(state,action)=>{
            state.ListTotal=action.payload
        }
        
    }
})

export  const {SetProductList,SetProductListTotal}=productSlice.actions;
export default  productSlice.reducer;