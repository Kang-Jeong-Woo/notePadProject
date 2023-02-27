import {createSlice} from "@reduxjs/toolkit";

const initialState = {isInit:true, fontData:[]};

const fontSlice = createSlice({
    name: "font",
    initialState,
    reducers:{
        setFont(state, action) {
            if (state.isInit) {
                action.payload.map((fontData) => {
                    fontData.id = fontData._id
                    state.fontData.push(fontData)
                });
                state.isInit = false;
            }
            return
        },
        addFont(state, action){
            console.log(action.payload);
            const newFontData = {
                id: Math.random(),
                userId: action.payload.id,
                content: action.payload.content,
                pinned: false,
                isDelete: false,
                style: action.payload.style,
                degree: 0,
                color:action.payload.color,
                width: 300,
                height: 200,
                positionX: 0,
                positionY: 0,
                positionZ: 10
            }
            state.fontData.push(newFontData);
        },
        deleteFont(state, action) {
            const editAry = state.fontData.find((font) => font.id === action.payload);
            editAry.isDelete = true
        },
        updateZIndex(state, action){
            const newData = action.payload;
            const editAry = state.fontData.find((font) => font.id === newData.id);
            editAry.positionZ=newData.z
        },
        updateXYPosition(state,action){
            const newData = action.payload;
            const editAry = state.fontData.find((font) => font.id === newData.id);
            editAry.positionX=newData.x
            editAry.positionY=newData.y
        },
        updateWHPosition(state, action){
            const newData = action.payload;
            const editAry = state.fontData.find((font) => font.id === newData.id);
            editAry.positionX=newData.x
            editAry.positionY=newData.y
            editAry.width=newData.w
            editAry.height=newData.h
        },
        updateDegree(state, action) {
            const newData = action.payload;
            const editAry = state.fontData.find((font) => font.id === newData.id);
            editAry.degree = newData.degree
        },
        clear() {
            return initialState
        }
    }
})

export const fontActions = fontSlice.actions;
export default fontSlice;