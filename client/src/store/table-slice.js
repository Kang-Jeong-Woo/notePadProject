import {createSlice} from "@reduxjs/toolkit";

const initialState = {isInit: true, tableData: []}

const tableSlice = createSlice({
    name: "table",
    initialState,
    reducers: {
        setTable(state, action) {
            if (state.isInit) {
                action.payload.map((tableData) => {
                    tableData.id = tableData._id
                    state.tableData.push(tableData)
                });
                state.isInit = false;
            }
            return
        },
        addTable(state, action) {
            const tableDefaultData = {
                id: Math.random(),
                positionX: 0,
                positionY: 0,
                positionZ: 10,
                width: 200,
                height: 220,
                userId: action.payload.userId,
                style: {
                    font: action.payload.style.font
                },
                color: {
                    font: action.payload.color.font,
                    border: action.payload.color.border,
                    back: action.payload.color.back
                },
                pinned: false,
                isDelete: false,
                contents: {titles: ["타이틀1", "타이틀2"], contents: [['내용1', '내용2'], ['내용3', '내용4']]}
            }
            state.tableData.push(tableDefaultData);
        },
        deleteTable(state, action) {
            const editAry = state.tableData.find((table) => table.id === action.payload);
            editAry.isDelete = true;
        },
        addColumn(state, action) {
            const editAry = state.tableData.find((table) => table.id === action.payload);
            editAry.contents.titles.push("타이틀")
            for(let i =0; i<editAry.contents.contents.length;i++){
                editAry.contents.contents[i].push("내용")
            }
        },
        deleteColumn(state, action) {
            const editAry = state.tableData.find((table) => table.id === action.payload);
            editAry.contents.titles.pop()
            for(let i =0; i<editAry.contents.contents.length;i++){
                editAry.contents.contents[i].pop()
            }
        },
        addRow(state, action) {
            const editAry = state.tableData.find((table) => table.id === action.payload);
            editAry.contents.contents.push(Array(editAry.contents.titles.length).fill("내용"))
        },
        deleteRow(state, action) {
            const editAry = state.tableData.find((table) => table.id === action.payload);
            editAry.contents.contents.pop()
        },
        updateTable(state, action) {
            const newData = action.payload;
            const editAry = state.tableData.find((table) => table.id === newData.id);
            if (action.payload.type === 'title') {
                editAry.contents.titles[newData.i] = newData.value
            } else {
                editAry.contents.contents[newData.column][newData.i] = newData.value
            }
        },
        updateZIndex(state, action){
            const newData = action.payload;
            const editAry = state.tableData.find((table) => table.id === newData.id);
            editAry.positionZ=newData.z
        },
        updateXYPosition(state,action){
            const newData = action.payload;
            const editAry = state.tableData.find((table) => table.id === newData.id);
            editAry.positionX=newData.x
            editAry.positionY=newData.y
        },
        updateWHPosition(state, action){
            const newData = action.payload;
            const editAry = state.tableData.find((table) => table.id === newData.id);
            editAry.positionX=newData.x
            editAry.positionY=newData.y
            editAry.width=newData.w
            editAry.height=newData.h
        },
        clear() {
            return initialState
        }
    }
});

export const tableActions = tableSlice.actions;
export default tableSlice;