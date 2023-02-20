import {createSlice} from "@reduxjs/toolkit";

const table = createSlice({
    name: "table",
    initialState: {isInit: true, tableData: []},
    reducers: {
        setTable(state, action) {
            if (state.isInit) {
                action.payload.map(tableData => (
                    state.tableData.push(tableData)
                ));
                state.isInit = false;
            }
            return
        },
        addTable(state) {
            const tableDefaultData = {
                id: Math.random(),
                positionX: 0,
                positionY: 0,
                positionZ: 10,
                width: 200,
                height: 220,
                userId: "userid",
                style: "",
                pinned: false,
                contents: {titles: ["타이틀1", "타이틀2"], contents: [['내용1', '내용2'], ['내용3', '내용4']]}
            }
            state.tableData.push(tableDefaultData);
        },
        addColumn(state, action) {
            const id = action.payload;
            const editAry = state.tableData.find((table) => table.id === id);
            editAry.contents.titles.push("타이틀")
            for(let i =0; i<editAry.contents.contents.length;i++){
                editAry.contents.contents[i].push("내용")
            }
        },
        deleteColumn(state, action) {
            const id = action.payload;
            const editAry = state.tableData.find((table) => table.id === id);
            editAry.contents.titles.pop()
            for(let i =0; i<editAry.contents.contents.length;i++){
                editAry.contents.contents[i].pop()
            }
        },
        addRow(state, action) {
            const id = action.payload;
            const editAry = state.tableData.find((table) => table.id === id);
            editAry.contents.contents.push(Array(editAry.contents.titles.length).fill("내용"))
        },
        deleteRow(state, action) {
            const id = action.payload;
            const editAry = state.tableData.find((table) => table.id === id);
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
        deleteTable(state, action) {
            const newData = action.payload;
            const editAry = state.tableData.find((table) => table.id === newData.id);
            console.log(editAry);
            // for (let i = 0; i < state.tableData.length; i++) {
            //     if (state.tableData[i].id === action.payload) {
            //         state.tableData.splice(i, 1)
            //     }
            // }
        },
    }
});

export const tableActions = table.actions;
export default table;