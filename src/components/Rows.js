import Row from "./Row";
import {forwardRef, useEffect, useImperativeHandle, useRef} from "react";

const Rows = forwardRef((props, ref) => {
    const rows = props.data;

    const rowsRef = useRef([]);
    useEffect(() => {
        rowsRef.current = rowsRef.current.slice(0, rows.length);
    }, [rows]);

    useImperativeHandle(ref, () => ({
        mergeCells() {
            for (let i = 0; i < rowsRef.current.length; i++){
                rowsRef.current[i].mergeCells();
            }
        },
        splitCells() {
            for (let i = 0; i < rowsRef.current.length; i++){
                rowsRef.current[i].splitCells();
            }
        },
        shiftCellsRight() {
            for (let i = 0; i < rowsRef.current.length; i++){
                rowsRef.current[i].shiftCellsRight();
            }
        },
        shiftCellsLeft() {
            for (let i = 0; i < rowsRef.current.length; i++){
                rowsRef.current[i].shiftCellsLeft();
            }
        },
        separateCells(row, textSeparator, groupItems) {
            for (let i = 0; i < rowsRef.current.length; i++){
                rowsRef.current[i].separateCells(row, textSeparator, groupItems);
            }
        },
        exportData() {
            let rows = [];
            for (let i = 0; i < rowsRef.current.length; i++){
                rows.push(rowsRef.current[i].exportData());
            }
            return rows;
        }
    }));

    return (<>
        <div className="w-full">
            {rows && rows.map((row, idx) => {
                const key = `row-${idx}`;
                return <Row ref={el => rowsRef.current[idx] = el} key={key} _key={key} data={row} />
            })}
        </div>
    </>);
});

export default Rows;
