import {Rnd} from "react-rnd";
import {useRef, useState} from "react";
import classes from "./TablePostIt.module.css";
import {useDispatch} from "react-redux";
import {tableActions} from "@/store/table-slice";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCircleXmark,
    faThumbtack,
    faGears,
    faArrowDownWideShort,
    faArrowsLeftRightToLine,
    faCheck
} from "@fortawesome/free-solid-svg-icons";

const TablePostIt = (props) => {
    const tabRef = useRef(undefined);
    const dispatch = useDispatch();
    const [dragable, setDragable] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [diagramWidth, setDiagramWidth] = useState();
    const [diagramHeight, setDiagramHeight] = useState();
    const [picWidth, setPicWidth] = useState();
    const [picHeight, setPicHeight] = useState();
    const [isFirstLoad, setFirstLoad] = useState(true);
    const setZIndex = (current, next) => {
        return next > current ? next : current;
    };
    const pinEvent = () => {
        setDragable(!dragable);
    }
    const editEvent = () => {
        setIsEdit(!isEdit);
    }
    const closeEvent = async () => {
        const id = await props.id;
        const delData = {id: id, colName: "tableData"}
        deleteTable(delData);
        // props.onDel(delData);
    }
    const mouseIn = () => {
        tabRef.current.style.top = "0px";
    }
    const mouseOut = () => {
        tabRef.current.style.top = "-23px";
    }
    const updateTable = (data) => {
        dispatch(tableActions.updateTable(data))
    };
    const addRow = (id) => {
        dispatch(tableActions.addRow(id))
    };
    const deleteRow = (id) => {
        dispatch(tableActions.deleteRow(id))
    };
    const addColumn = (id) => {
        dispatch(tableActions.addColumn(id))
    };
    const deleteColumn = (id) => {
        dispatch(tableActions.deleteColumn(id))
    };
    const updateZIndex = (data) => {
        dispatch(tableActions.updateZIndex(data))
    };
    const updateXYPosition = (data) => {
        dispatch(tableActions.updateXYPosition(data))
    };
    const updateWHPosition = (data) => {
        dispatch(tableActions.updateWHPosition(data))
    };
    const deleteTable = (data) => {
        dispatch(tableActions.deleteTable(data))
    };

    const dragStart = (e, d, id = props.id) => {
        const setIndex = setZIndex(d.node.style.zIndex, +d.node.style.zIndex + 1);
        d.node.style.zIndex = setIndex
        const Z = {id: id, z: setIndex, colName: "tableData"};
        updateZIndex(Z);
        // props.onZpst(Z);
    }
    const dragStop = (e, d, id = props.id) => {
        const XY = {id: id, x: d.x, y: d.y, colName: "tableData"}
        updateXYPosition(XY);
        // props.onDragPst(XY);
    }
    const resizeStart = (e, d, ref, delta, position) => {
        setFirstLoad(false);
        setPicWidth(+ref.style.width.replace("px", ""));
        setPicHeight(+ref.style.height.replace("px", ""));
        setDiagramWidth(ref.style.width);
        setDiagramHeight(ref.style.height);
    }
    const resizeStop = (e, d, ref, delta, position, id = props.id) => {
        const width = props.width + delta.width
        const height = props.height + delta.height
        const XYHW = {id: id, x: position.x, y: position.y, h: height, w: width, colName: "tableData"}
        updateWHPosition(XYHW);
        // props.onSizePst(XYHW);
    }

    const editComponent = (<>
        <span className={classes.tabText}><FontAwesomeIcon className={classes.icon} style={{color: "orange"}}
                                                           icon={faArrowsLeftRightToLine}/><button onClick={() => {
            addColumn(props.id)
        }}>+</button>
            {props.table.titles.length}
            <button onClick={() => {
                deleteColumn(props.id)
            }}>-</button></span>
        <span className={classes.tabText}><FontAwesomeIcon className={classes.icon} style={{color: "orange"}}
                                                           icon={faArrowDownWideShort}/><button onClick={() => {
            addRow(props.id)
        }}>+</button>
            {props.table.contents.length}
            <button onClick={() => {
                deleteRow(props.id)
            }}>-</button></span>
        <span className={classes.tabBtn} onClick={editEvent}><FontAwesomeIcon className={classes.icon}
                                                                              style={{color: "green"}} icon={faCheck}/></span>
    </>)
    const defaultComponent = (<>
        <span onClick={closeEvent}><FontAwesomeIcon className={classes.icon} style={{color: "red"}}
                                                    icon={faCircleXmark}/></span>
        <span onClick={editEvent}><FontAwesomeIcon className={classes.icon} style={{color: "yellow"}}
                                                   icon={faGears}/></span>
        <span onClick={pinEvent}><FontAwesomeIcon className={classes.icon}
                                                  style={{color: dragable ? "green" : "yellow"}}
                                                  icon={faThumbtack}/></span>
    </>)
    const titleComponent = (<>
        {props.table.titles.map((title, index) => (
            <td key={"T" + index}>{title}</td>
        ))}
    </>)
    const titleEditComponent = (<>
        {props.table.titles.map((title, index) => (
            <td key={"T" + index}><input className={classes.editInput} type={"text"} defaultValue={title}
                                         onChange={e => {
                                             updateTable({id: props.id, i: index, type: "title", value: e.target.value})
                                         }}/></td>
        ))}
    </>)
    const contentComponent = (<>
        {props.table.contents.map((content, index) => (
            <tr key={"B" + index}>
                {content.map((data, index) => (
                    <td key={index}>{data}</td>
                ))}
            </tr>
        ))}
    </>)
    const contentEditComponent = (<>
        {props.table.contents.map((content, colIndex) => {
            return (
                <tr key={"B" + colIndex}>
                    {content.map((data, index) => (
                        <td key={index}><input className={classes.editInput} type={"text"} defaultValue={data}
                                               onChange={e => {
                                                   updateTable({
                                                       id: props.id,
                                                       column: colIndex,
                                                       type: "content",
                                                       i: index,
                                                       value: e.target.value
                                                   })
                                               }}/></td>
                    ))}
                </tr>
            )
        })}
    </>)
    return (
        <Rnd minWidth={100} minHeight={100} bounds={"parent"}
             default={{x: props.positionX, y: props.positionY, width: props.width, height: props.height + 23}}
             disableDragging={dragable} onDragStart={dragStart} onDragStop={dragStop} onResize={resizeStart}
             onResizeStop={resizeStop}
             style={{zIndex: props.positionZ}}
        >
            <div className={classes.postIt} style={{width: diagramWidth, height: diagramHeight + 23}}
                 onMouseEnter={mouseIn} onMouseLeave={mouseOut}>
                <span className={classes.tab} ref={tabRef}>
                    {isEdit ? editComponent : defaultComponent}
                </span>
                <table className={classes.table} style={{
                    width: isFirstLoad ? props.width : +picWidth,
                    height: isFirstLoad ? props.height : +picHeight - 23,
                }}>
                    <thead>
                    <tr>
                        {isEdit ? titleEditComponent : titleComponent}
                    </tr>
                    </thead>
                    <tbody>
                    {isEdit ? contentEditComponent : contentComponent}
                    </tbody>
                </table>
            </div>
        </Rnd>
    )
}
export default TablePostIt;