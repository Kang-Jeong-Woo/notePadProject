import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    drawingOn: false,
    lineStyle: "",
    lineWidth: "",
    penColor: "",
    drawData: "",
    canvasRef: undefined,
}

const canvasSlice = createSlice({
    name: "palette",
    initialState,
    reducers: {
        setDrawData(state, action) {
            if (state.isInit) {
                state.dawData = action.payload;
                state.isInit = false;
            }
            return
        },
        setSliceData(state, action){
            state.saveableCanvas = action.payload;
        }
    }
});

export const canvasActions = canvasSlice.actions;
export default canvasSlice;