import {createSlice} from "@reduxjs/toolkit";

const initialState = {isInit:true, fontData:[]};

const fontSlice = createSlice({
    name: "font",
    initialState,
    reducers:{
        setFont(state, action) {
            if (state.isInit) {
                action.payload.map(tableData => (
                    state.fontData.push(tableData)
                ));
                state.isInit = false;
            }
            return
        },
        addFont(state, action){
            console.log(action.payload);
            const newFontData = {
                id: Math.random(),
                userId: "userid",
                content: action.payload.content,
                pinned: false,
                style: action.payload.style,
                degree: 0,
                color:action.payload.color,
                width: 300,
                height: 200,
                positionX: 0,
                positionY: 0,
                positionZ: 10
            }
            console.log(newFontData);
            state.fontData.push(newFontData);
        },
        updateZIndex(state, action){
            const newData = action.payload;
            const editAry = state.fontData.find((table) => table.id === newData.id);
            editAry.positionZ=newData.z
        },
        updateXYPosition(state,action){
            const newData = action.payload;
            const editAry = state.fontData.find((table) => table.id === newData.id);
            editAry.positionX=newData.x
            editAry.positionY=newData.y
        },
        updateWHPosition(state, action){
            const newData = action.payload;
            const editAry = state.fontData.find((table) => table.id === newData.id);
            editAry.positionX=newData.x
            editAry.positionY=newData.y
            editAry.width=newData.w
            editAry.height=newData.h
        },
        updateDegree(state, action){
            const newData = action.payload;
            const editAry = state.fontData.find((table) => table.id === newData.id);
            editAry.degree=newData.degree
        }
    }
})

export const fontActions = fontSlice.actions;
export default fontSlice;