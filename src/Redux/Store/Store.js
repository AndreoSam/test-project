import { configureStore } from "@reduxjs/toolkit";
import reducer from "../Reducer/mediaSlice";

const Store = configureStore({
    reducer: {
        pro: reducer,
    }
})

export default Store