import {configureStore} from "@reduxjs/toolkit";
import tableSlice from "@/store/table-slice";
import fontSlice from "@/store/font-slice";
import canvasSlice from "@/store/canvas-slice";
import addSlice from "@/store/addMenu-slice";
import postItSlice from "@/store/postIt-slice";
import userSlice from "@/store/user-slice";

const store = configureStore({
    reducer:{
        postIt: postItSlice.reducer,
        canvas: canvasSlice.reducer,
        user:userSlice.reducer,
        table: tableSlice.reducer,
        font: fontSlice.reducer,
        add: addSlice.reducer,
    }
})

export default store;