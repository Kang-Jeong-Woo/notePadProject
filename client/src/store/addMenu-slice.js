import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    modal: false,
    font: false,
    post: false,
    table: false
};

const addSlice = createSlice({
    name: "addMenu",
    initialState,
    reducers: {
        setFont(state) {
            state.modal = true
            state.font = true
            state.post = false
            state.table = false
        },
        setPost(state) {
            state.modal = true
            state.post = true
            state.font = false
            state.table = false
        },
        setTable(state) {
            state.modal = true
            state.table = true
            state.font = false
            state.post = false
        },
        close(state) {
            state.modal = false
            state.post = false
            state.font = false
            state.table = false
        },
    }
});

export const addActions = addSlice.actions;
export default addSlice;