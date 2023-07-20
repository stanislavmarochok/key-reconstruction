import {forwardRef, useEffect, useImperativeHandle, useState} from "react";
import TextCell from "./TextCell";
import {mergeCellsF, shiftCellsLeftF, shiftCellsRightF, splitCellsF} from "../functions/cells";

const Row = forwardRef((props, ref) => {
    const [row, setRow] = useState(props.data);
    const [selectedPlainTextCells, setSelectedPlainTextCells] = useState([]);
    const [selectedCipherTextCells, setSelectedCipherTextCells] = useState([]);

    useImperativeHandle(ref, () => ({
        mergeCells() {
            mergeCells();
        },
        splitCells() {
            splitCells();
        },
        shiftCellsRight() {
            shiftCellsRight();
        },
        shiftCellsLeft() {
            shiftCellsLeft();
        }
    }));

    useEffect(() => {
        setRow(props.data);
    }, [props]);

    const isPlainTextCellSelected = (idx) => selectedPlainTextCells.includes(idx);
    const isCipherTextCellSelected = (idx) => selectedCipherTextCells.includes(idx);

    const handleCellClicked = (idx, isPlainText) => {
        if (isPlainText){
            if (selectedPlainTextCells.includes(idx))
                setSelectedPlainTextCells(selectedPlainTextCells.filter(x => x !== idx))
            else {
                const newCells = [...selectedPlainTextCells];
                newCells.push(idx);
                setSelectedPlainTextCells(newCells);
            }
        } else {
            if (selectedCipherTextCells.includes(idx))
                setSelectedCipherTextCells(selectedCipherTextCells.filter(x => x !== idx))
            else {
                const newCells = [...selectedCipherTextCells];
                newCells.push(idx);
                setSelectedCipherTextCells(newCells);
            }
        }
    };

    const handleUpdateCellData = (idx,isPlainText, data) => {
        let _row = JSON.parse(JSON.stringify(row));
        _row[idx][isPlainText ? 'plainText' : 'cipherText'] = data;
        setRow(_row);
    }

    const renderRow = (isPlainText, key, isSelected) => {
        return <tr>
            {row.map((rowItem, idx) => {
                const keyFull = `${key}-${isPlainText ? 'plainText' : 'cipherText'}-${idx}`;

                return <td key={keyFull} align={"center"} className={`border-solid border-2 border-black p-0 m-0 hover:cursor-pointer hover:bg-blue-300 hover:text-white transition duration-200 ${isSelected(idx) ? 'bg-deep-purple-200' : isPlainText ? 'bg-amber-200' : 'bg-blue-100'}`} onClick={() => handleCellClicked(idx, isPlainText)}>
                    <TextCell data={isPlainText ? rowItem.plainText : rowItem.cipherText} setCellData={(data) => handleUpdateCellData(idx, isPlainText, data)} />
                </td>;
            })}
        </tr>
    }

    const mergeCells = () => {
        let result = mergeCellsF(row, selectedPlainTextCells, selectedCipherTextCells);
        if (!result){
            return;
        }

        setRow(result.row);
        setSelectedPlainTextCells(result.selectedPlainTextCells);
        setSelectedCipherTextCells(result.selectedCipherTextCells);
    };

    const splitCells = () => {
        let result = splitCellsF(row, selectedPlainTextCells, selectedCipherTextCells);
        if (!result){
            return;
        }

        setRow(result.row);
        setSelectedPlainTextCells(result.selectedPlainTextCells);
        setSelectedCipherTextCells(result.selectedCipherTextCells);
    };

    const shiftCellsRight = () => {
        let result = shiftCellsRightF(row, selectedPlainTextCells, selectedCipherTextCells);
        if (!result){
            return;
        }

        setRow(result.row);
        setSelectedPlainTextCells(result.selectedPlainTextCells);
        setSelectedCipherTextCells(result.selectedCipherTextCells);
    };

    const shiftCellsLeft = () => {
        let result = shiftCellsLeftF(row, selectedPlainTextCells, selectedCipherTextCells);
        if (!result){
            return;
        }

        setRow(result.row);
        setSelectedPlainTextCells(result.selectedPlainTextCells);
        setSelectedCipherTextCells(result.selectedCipherTextCells);
    };

    return (<>
        <div className="mt-2 mx-auto w-full">
            <table className="w-fit mx-auto">
                <tbody>
                    {renderRow(true, props._key, isPlainTextCellSelected)}
                    {renderRow(false, props._key, isCipherTextCellSelected)}
                </tbody>
            </table>
        </div>
    </>);
});

export default Row;
