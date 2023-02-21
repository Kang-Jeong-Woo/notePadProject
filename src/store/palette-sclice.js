import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    drawingOn: false,
    lineStyle: "",
    lineWidth: "",
    penColor: "",
}

const paletteSlice = createSlice({
    name: "palette",
    initialState,
    reducers: {
    }
});

export const paletteActions = paletteSlice.actions;
export default paletteSlice;