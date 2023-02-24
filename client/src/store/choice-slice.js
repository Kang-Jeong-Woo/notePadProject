import {createSlice} from "@reduxjs/toolkit";

const initialState = {plus: true, pen: false, table: false, font: false,}

const choiceSlice = createSlice({
    name: "palette",
    initialState,
    reducers: {
        changePlus(state, action){
            state.plus = true
            state.pen = false
            state.table = false
            state.font = false
        },
        changeDraw(state, action){
            state.plus = false
            state.pen = true
            state.table = false
            state.font = false
        },
        changeTable(state, action){
            state.plus = false
            state.pen = false
            state.table = true
            state.font = false
        },
        changeFont(state, action){
            state.plus = false
            state.pen = false
            state.table = false
            state.font = true
        }
    }
});

export const choiceActions = choiceSlice.actions;
export default choiceSlice;