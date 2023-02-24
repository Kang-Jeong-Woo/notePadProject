import {configureStore} from "@reduxjs/toolkit";
import choiceSlice from "@/store/choice-slice";
import tableSlice from "@/store/table-slice";
import fontSlice from "@/store/font-slice";
import canvasSlice from "@/store/canvas-slice";
import addSlice from "@/store/addMenu-slice";

const store = configureStore({
    reducer:{
        choice: choiceSlice.reducer, 
        canvas: canvasSlice.reducer,
        table: tableSlice.reducer,
        font: fontSlice.reducer,
        add: addSlice.reducer,
    }
})

export default store;