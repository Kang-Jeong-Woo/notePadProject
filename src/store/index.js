import {configureStore} from "@reduxjs/toolkit";
import paletteSlice from "@/store/palette-sclice";
import choiceSlice from "@/store/choice-slice";
import tableSlice from "@/store/table-slice";
import fontSlice from "@/store/font-slice";

const store = configureStore({
    reducer:{
        choice: choiceSlice.reducer, 
        palette: paletteSlice.reducer,
        table: tableSlice.reducer,
        font: fontSlice.reducer
    }
})

export default store;