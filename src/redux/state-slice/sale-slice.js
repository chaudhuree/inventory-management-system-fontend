import { createSlice } from "@reduxjs/toolkit";
export const saleSlice = createSlice({
    name: 'sale',
    initialState: {
        List: [],
        ListTotal: 0,
        CustomerDropDown: [],
        ProductDropDown: [],
        SaleFormValue: {
            CustomerID: "",
            VatTax: "",
            Discount: "",
            OtherCost: "",
            ShippingCost: "",
            GrandTotal: "",
            Note: "",
        },
        SaleItemList: [],
    },
    reducers: {
        SetSaleList: (state, action) => {
            state.List = action.payload
        },
        SetSaleListTotal: (state, action) => {
            state.ListTotal = action.payload
        },
        SetCustomerDropDown: (state, action) => {
            state.CustomerDropDown = action.payload
        },
        SetProductDropDown: (state, action) => {
            state.ProductDropDown = action.payload
        },
        OnChangeSaleInput: (state, action) => {
            state.SaleFormValue[`${action.payload.Name}`] = action.payload.Value;
        },
        SetSaleItemList: (state, action) => {
            state.SaleItemList.push(action.payload)
        },
        RemoveSaleItem: (state, action) => {
            state.SaleItemList.splice(action.payload, 1)
        },
        ResetSaleFormValue: (state, action) => {
            Object.keys(state.SaleFormValue).forEach((i) => state.SaleFormValue[i] = "");
            state.SaleItemList = []
        }
    }
})

export const { RemoveSaleItem, SetSaleList, SetProductDropDown, SetSaleItemList, SetSaleListTotal, SetCustomerDropDown, OnChangeSaleInput,ResetSaleFormValue } = saleSlice.actions;
export default saleSlice.reducer;