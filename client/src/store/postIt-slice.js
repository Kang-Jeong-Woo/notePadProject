import {createSlice} from "@reduxjs/toolkit";

const initialState = {isInit: true, postItData: []}

const postItSlice = createSlice({
    name: "postIt",
    initialState,
    reducers: {
        setPostIt(state, action) {
            if (state.isInit) {
                action.payload.map(postItData => {
                    postItData.id = postItData._id
                    state.postItData.push(postItData)
                });
                state.isInit = false;
            }
            return
        },
        addPostIt(state, action) {

            const postItDefaultData = {
                id: Math.random(),
                positionX: 0,
                positionY: 0,
                positionZ: 10,
                width: 200,
                height: 220,
                userId: action.payload.userId,
                style: "",
                pinned: false,
                isDelete: false,
                title:action.payload.title,
                content: action.payload.content
            }
            state.postItData.push(postItDefaultData);

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
        deletePostIt(state, action) {
            const editAry = state.postItData.find((postIt) => postIt.id === action.payload);
            editAry.isDelete = true
        },
        clear() {
            return initialState
        }
    }
});

export const postItActions = postItSlice.actions;
export default postItSlice;