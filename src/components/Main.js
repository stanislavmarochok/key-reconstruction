import {forwardRef, useImperativeHandle, useRef} from "react";
import Rows from "./Rows";

const Main = forwardRef((props, ref) => {
    const _ref = useRef();

    const rows = props.data.rows ? props.data.rows : mergePlainAndCipherText(props.data.plainText, props.data.cipherText);

    useImperativeHandle(ref, () => ({
        mergeCells() {
            _ref.current.mergeCells();
        },
        splitCells() {
            _ref.current.splitCells();
        },
        shiftCellsRight() {
            _ref.current.shiftCellsRight();
        },
        shiftCellsLeft() {
            _ref.current.shiftCellsLeft();
        },
        separateCells(row, textSeparator, groupItems) {
            _ref.current.separateCells(row, textSeparator, groupItems);
        },
        exportData() {
            return _ref.current.exportData();
        },
        reconstructKey() {
            return _ref.current.reconstructKey();
        }
    }));

    return (<>
        <div className="max-w-[80%] mx-auto h-max max-h-max overflow-auto mt-4">
            <Rows ref={_ref} data={rows} />
        </div>
    </>);
});

const mergePlainAndCipherText = (plainText, cipherText) => {
    let plainTextRows = splitRows(plainText);
    let cipherTextRows = splitRows(cipherText);

    let rows = [];
    for (let i = 0; ; i++){
        if ((!plainTextRows || (plainTextRows.length <= i)) && (!cipherTextRows || (cipherTextRows.length <= i)))
            break;

        let row = [];
        let plainTextRowItems = false;
        let cipherTextRowItems = false;

        if (plainTextRows && plainTextRows.length > i){
            let splittedPlainTextRow = plainTextRows[i];
            plainTextRowItems = splittedPlainTextRow.split('');
        }

        if (cipherTextRows && cipherTextRows.length > i){
            let splittedCipherTextRow = cipherTextRows[i];
            cipherTextRowItems = splittedCipherTextRow.split('');
        }

        for (let j = 0; ; j++){
            if ((!plainTextRowItems || (plainTextRowItems.length <= j)) && (!cipherTextRowItems || (cipherTextRowItems.length <= j)))
                break;

            let rowItem = {};
            if (plainTextRowItems && plainTextRowItems.length > j)
                rowItem.plainText = plainTextRowItems[j];
            else
                rowItem.plainText = false;

            if (cipherTextRowItems && cipherTextRowItems.length > j)
                rowItem.cipherText = cipherTextRowItems[j];
            else
                rowItem.cipherText = false;

            row.push(rowItem);
        }

        rows.push(row);
    }

    return rows;
}

const splitRows = (text) => {
    if (!text)
        return [];

    return text.replaceAll('\r', '').split('\n');
}

export default Main;
