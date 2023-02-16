import {configureStore} from "@reduxjs/toolkit";
import paletteSlice from "@/store/palette-sclice";
import choiceSlice from "@/store/choice-slice";
import table from "@/store/table-slice";

const store = configureStore({
    reducer:{
        choice: choiceSlice.reducer, 
        palette: paletteSlice.reducer,
        table: table.reducer
    }
})

export default store;