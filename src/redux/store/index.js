import { configureStore } from "@reduxjs/toolkit";
import xemayReducer from "../reducers/XeMayReducer";

export default configureStore({
    reducer: {
        listXeMay: xemayReducer
    }
});