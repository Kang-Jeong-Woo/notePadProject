import {createSlice} from "@reduxjs/toolkit";

const table = createSlice({
    name: "table",
    initialState: [],
    reducers: {
        addTable(state) {
            const tableDefaultData = {
                id: 0, x: 100, y: 100, z: 0, width: 200, height: 220, 
                titles: ["타이틀", "타이틀"], contents: [['내용', '내용'], ['내용', '내용']]
            }
            if(state.length > 0) {
                state.push({
                    id: state[state.length-1].id++, x: state[state.length-1].x, y: state[state.length-1].y, z: state[state.length-1].z++, 
                    width: state[state.length-1].width, height: state[state.length-1].height, 
                    titles: state[state.length-1].titles, contents: state[state.length-1].contents
                })
            } else {                        
                state.push(tableDefaultData)
            }
        },
        deleteTable(state, action) {
            for(let i = 0; i<state.length; i++) {
                if(state[i].id === action.payload) {
                    state.splice(i, 1)
                }
            }
        },
        updateTable(state, action) {
            for(let i = 0; i<state.length; i++) {
                if(state[i].id === action.payload.id) {
                    if(action.payload.type === 'title') {
                        state[i].titles[action.payload.i] = action.payload.value
                    } else {
                        state[i].contents[action.payload.column][action.payload.i] = action.payload.value
                    }
                }
            }
        },
        addRow(state, action) {
            for(let i = 0; i<state.length; i++) {
                if(state[i].id === action.payload) {
                    if (state[i].titles.length>9) {
                        alert("적당히 하지?")
                    } else {
                        state[i].width += 100; 
                        state[i].titles.push('타이틀');
                        for(let j=0; j<state[i].contents.length; j++) {
                            state[i].contents[j].push('내용')
                        }
                    }
                }
            }
        },
        deleteRow(state, action) {
            for(let i = 0; i<state.length; i++) {
                if(state[i].id === action.payload) {
                    if (state[i].titles.length < 2) {
                        alert("그만해")
                    } else {
                        state[i].width -= 100; 
                        state[i].titles.pop();
                        for(let j=0; j<state[i].contents.length; j++) {
                            state[i].contents[j].pop()
                        }
                    }
                }
            }
        },
        addColumn(state, action) {
            for(let i = 0; i<state.length; i++) {
                if(state[i].id === action.payload) {
                    if (state[i].contents.length>9) {
                        alert("적당히 하지?")
                    } else {
                        state[i].height += 100; 
                        state[i].contents.push(Array(state[i].titles.length).fill('내용'))
                    }
                }
            }
        },
        deleteColumn(state, action) {
            for(let i = 0; i<state.length; i++) {
                if(state[i].id === action.payload) {
                    if (state[i].contents.length < 2) {
                        alert("그만해")
                    } else {
                        state[i].height -= 100;
                        state[i].contents.pop()
                    }
                }
            }
        }
    }
});

export const tableActions = table.actions;
export default table;