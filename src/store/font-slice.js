import {createSlice} from "@reduxjs/toolkit";

const initialState = {};

const fontSlice = createSlice({
    name: "font",
    initialState,
    reducers:{

    }
})

export const FontAction = fontSlice.actions;
export default fontSlice;