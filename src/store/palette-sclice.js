import {createSlice} from "@reduxjs/toolkit";

const initialState = {}

const paletteSlice = createSlice({
    name: "palette",
    initialState,
    reducers: {

    }
});

export const paletteActions = paletteSlice.actions;
export default paletteSlice;