import {configureStore} from "@reduxjs/toolkit";
import paletteSlice from "@/store/palette-sclice";
import choiceSlice from "@/store/choice-slice";

const store = configureStore({
    reducer:{choice:choiceSlice.reducer ,palette: paletteSlice.reducer}
})

export default store;