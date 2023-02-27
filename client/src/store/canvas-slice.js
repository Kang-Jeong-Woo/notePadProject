import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    drawingOn: true,
    color: "#ffffff",
    radius: 1,
    drawData: {userId:"", drawData:undefined},
};

const canvasSlice = createSlice({
    name: "palette",
    initialState,
    reducers: {
        setColor(state, action) {
            state.color = action.payload
        },
        setRadius(state, action) {
            state.radius = action.payload

        },
        setIsDraw(state) {
            state.drawingOn=(!state.drawingOn)
        },
        setDrawData(state, action) {
            if (state.isInit) {
                state.dawData = action.payload;
                state.isInit = false;
            }
            return
        },
        setSliceData(state, action){
            state.drawData.userId = "userid";
            state.drawData.drawData = action.payload;
        },
        clear() {
            return initialState
        }
    }
});

export const canvasActions = canvasSlice.actions;
export default canvasSlice;