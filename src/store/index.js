import {configureStore} from "@reduxjs/toolkit";
import choiceSlice from "@/store/choice-slice";
import tableSlice from "@/store/table-slice";
import fontSlice from "@/store/font-slice";
import canvasSlice from "@/store/canvas-sclice";

const store = configureStore({
    reducer:{
        choice: choiceSlice.reducer, 
        canvas: canvasSlice.reducer,
        table: tableSlice.reducer,
        font: fontSlice.reducer
    }
})

export default store;