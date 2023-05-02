import { configureStore } from "@reduxjs/toolkit";
import settingsReducer from "../state-slice/settings-slice";
import profileReducer from "../state-slice/profile-slice";
import brandReducer from "../state-slice/brand-slice";
import categoryReducer from "../state-slice/category-slice";
import customerReducer from "../state-slice/customer-slice";
import expenseReducer from "../state-slice/expense-slice";
import expensetypeReducer from "../state-slice/expensetype-slice";
import supplierReducer from "../state-slice/supplier-slice";
import productReducer from "../state-slice/product-slice";
import purchaseReducer from "../state-slice/purchase-slice";
import returnReducer from "../state-slice/return-slice"
import saleReducer from "../state-slice/sale-slice"
import dashboardSlice from "../state-slice/dashboard-slice";
import reportSlice from "../state-slice/report-slice";

export default configureStore({
    reducer: {
        settings: settingsReducer,
        dashboard: dashboardSlice,
        profile: profileReducer,
        brand: brandReducer,
        category: categoryReducer,
        customer: customerReducer,
        expense: expenseReducer,
        expensetype: expensetypeReducer,
        supplier: supplierReducer,
        purchase: purchaseReducer,
        product: productReducer,
        return: returnReducer,
        sale: saleReducer,
        report: reportSlice
    }
})