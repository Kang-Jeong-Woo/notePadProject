// import classes from "./Table.module.css";
// import {tableActions} from "@/store/table-slice";
// import {Rnd} from "react-rnd";
// import {useRef, useState} from "react";
// import { useDispatch } from "react-redux";

// const Table = (props) => {
//     const table = props.table;
//     const [mode, setMode] = useState('read');
//     const dispatch = useDispatch();
//     const deleteTable = (id) => {
//         dispatch(tableActions.deleteTable(id));
//     };
//     const updateTable = (data) => {
//         dispatch(tableActions.updateTable(data));
//     };
//     const addRow = (id) => {
//         dispatch(tableActions.addRow(id));
//     };
//     const deleteRow = (id) => {
//         dispatch(tableActions.deleteRow(id));
//     };
//     const addColumn = (id) => {
//         dispatch(tableActions.addColumn(id));
//     };
//     const deleteColumn = (id) => {
//         dispatch(tableActions.deleteColumn(id));
//     };

//     const tabRef = useRef(undefined);
//     const [dragable, setDragable] = useState(false);
//     const pinEvent = () => {
//         setDragable(!dragable);
//     }
//     const mouseIn = () => {
//         if (mode === 'read') {
//             tabRef.current.style.top = "0px";
//         }
//     }
//     const mouseOut = () => {
//         if (mode === 'read') {
//             tabRef.current.style.top = "-30px";
//         }
//     }

//     return (
//         <Rnd
//             default={{
//                 x: table.x,
//                 y: table.y,
//                 width: table.width,
//                 height: table.height,
//             }}
//             disableDragging={dragable}
//         >
//             <div className={classes.postIt} style={{width: 200, height: 30}}
//                  onMouseEnter={mouseIn} onMouseLeave={mouseOut}>

//                 {mode === 'read' ?
//                     <span className={classes.tab} ref={tabRef}>
//                 <span className={classes.tabBtn}
//                       style={{
//                           background: `${dragable === true ? 'lightblue' : 'tomato'}`,
//                           border: `${dragable === true ? 'lightblue' : 'tomato'} 2px ridge`
//                       }}
//                       onClick={pinEvent}>고정</span>
//                         &nbsp;
//                         <span className={classes.tabBtn} onClick={() => {
//                             setMode('update')
//                         }}>수정</span>
//                         &nbsp;
//                         <span className={classes.tabBtn} onClick={() => {
//                             deleteTable(table.id)
//                         }}>삭제</span>
//             </span>
//                     :
//                     <span className={classes.tab} ref={tabRef}>
//                 <span className={classes.tabText}>행
//                     <button className={classes.btn} onClick={() => {
//                         addRow(table.id)
//                     }}>+</button>{table.contents[0].length}
//                     <button className={classes.btn} onClick={() => {
//                         deleteRow(table.id)
//                     }}>-</button>
//                 </span>
//                         &nbsp;
//                         <span className={classes.tabText}>열
//                     <button className={classes.btn} onClick={() => {
//                         addColumn(table.id)
//                     }}>+</button>{table.contents.length}
//                             <button className={classes.btn} onClick={() => {
//                                 deleteColumn(table.id)
//                             }}>-</button>
//                 </span>
//                         &nbsp;
//                         <span className={classes.tabBtn} onClick={() => {
//                             setMode('read')
//                         }}>완료</span>
//             </span>
//                 }
//             </div>
//             <div>
//                 <table className={classes.table} onDoubleClick={() => {
//                     if (mode === 'read') {
//                         setMode('update')
//                         tabRef.current.style.top = "0px";
//                     } else {
//                         setMode('read')
//                     }
//                 }} style={{width: table.width, height: table.height}}>
//                     <thead>
//                     <tr>
//                         {mode === 'read' ?
//                             table.titles.map((title, i) => {
//                                 return <td key={i}>{title}</td>
//                             })
//                             :
//                             table.titles.map((title, i) => {
//                                 return (<td key={i}><input type='text' defaultValue={title} style={{
//                                     textAlign: 'center',
//                                     width: '100%',
//                                     height: '100%',
//                                     fontSize: '16px',
//                                     border: '0px',
//                                     background: 'lightpink'
//                                 }} onChange={(e) => {
//                                     updateTable({id: table.id, type: "title", i: i, value: e.target.value})
//                                 }}></input></td>)
//                             })
//                         }
//                     </tr>
//                     </thead>
//                     <tbody>
//                     {mode === "read" ?
//                         table.contents.map((content, i) => {
//                             return <tr key={i}>
//                                 {content.map((data, j) => {
//                                     return <td key={j}>{data}</td>
//                                 })}
//                             </tr>
//                         })
//                         :
//                         table.contents.map((content, i) => {
//                             const column = i
//                             return <tr key={i}>
//                                 {content.map((data, j) => {
//                                     return (<td key={j}><input defaultValue={data} style={{
//                                         textAlign: 'center',
//                                         width: '100%',
//                                         height: '100%',
//                                         fontSize: '16px',
//                                         border: '0px',
//                                         background: 'lightpink'
//                                     }} onChange={(e) => {
//                                         updateTable({
//                                             id: table.id,
//                                             type: "content",
//                                             column: column,
//                                             i: j,
//                                             value: e.target.value
//                                         })
//                                     }}></input></td>)
//                                 })}
//                             </tr>
//                         })
//                     }
//                     </tbody>
//                 </table>
//             </div>
//         </Rnd>
//     )
// }

// export default Table;