import {createSlice} from "@reduxjs/toolkit";

const initialState = {isInit: true, postItData: []}

const postItSlice = createSlice({
    name: "postIt",
    initialState,
    reducers: {
        setPostIt(state, action) {
            if (state.isInit) {
                action.payload.map(postItData => (
                    state.postItData.push(postItData)
                ));
                state.isInit = false;
            }
            return
        },
        updateZIndex(state, action){
            const newData = action.payload;
            const editAry = state.postItData.find((postIt) => postIt.id === newData.id);
            editAry.positionZ=newData.z
        },
        updateXYPosition(state,action){
            const newData = action.payload;
            const editAry = state.postItData.find((postIt) => postIt.id === newData.id);
            editAry.positionX=newData.x
            editAry.positionY=newData.y
        },
        updateWHPosition(state, action){
            const newData = action.payload;
            const editAry = state.postItData.find((postIt) => postIt.id === newData.id);
            editAry.positionX=newData.x
            editAry.positionY=newData.y
            editAry.width=newData.w
            editAry.height=newData.h
        },
        deleteTable(state, action) {
            const newData = action.payload;
            const editAry = state.postItData.findIndex((postIt) => postIt.id === newData.id);
            state.postItData.splice(editAry, 1);
        },
    }
});

export const postItActions = postItSlice.actions;
export default postItSlice;