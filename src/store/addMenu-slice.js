import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    modal: false,
    font: false,
    post: false,
};

const addSlice = createSlice({
    name: "addMenu",
    initialState,
    reducers: {
        setFont(state) {
            state.modal = true
            state.font = true
        },
        setPost(state) {
            state.modal = true
            state.post = true
        },
        close(state) {
            state.modal = false
            state.post = false
            state.font = false
        },
    }
});

export const addActions = addSlice.actions;
export default addSlice;