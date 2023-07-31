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
        },
        reconstructKey() {
            let key = {};
            for (let i = 0; i < rowsRef.current.length; i++){
                let rowKey = rowsRef.current[i].reconstructKey();
                for (let plainTextKey in rowKey){
                    let rowKeyCipherTextValues = rowKey[plainTextKey];

                    if (key[plainTextKey] === undefined){
                        key[plainTextKey] = rowKeyCipherTextValues;
                    }

                    if (key[plainTextKey] !== undefined){
                        let keyCipherTextValues = key[plainTextKey];
                        for (let j = 0; j < rowKeyCipherTextValues.length; j++){
                            if (!keyCipherTextValues.includes(rowKeyCipherTextValues[j])){
                                keyCipherTextValues.push(rowKeyCipherTextValues[j]);
                            }
                        }
                    }
                }
            }
            return key;
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
