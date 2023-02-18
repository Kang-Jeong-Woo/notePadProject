import {createSlice} from "@reduxjs/toolkit";

let saveableCanvas;

const initialState = {
    drawingOn: false,
    lineStyle: "",
    lineWidth: "",
    penColor: "",
    saveableCanvas:saveableCanvas
}

const paletteSlice = createSlice({
    name: "palette",
    initialState,
    reducers: {
        ctrlZ(state,action){
            state.saveableCanvas.undo();
        }
    }
});

export const paletteActions = paletteSlice.actions;
export default paletteSlice;