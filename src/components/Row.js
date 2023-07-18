import {forwardRef, useEffect, useImperativeHandle, useState} from "react";
import TextCell from "./TextCell";

const Row = forwardRef((props, ref) => {
    const [row, setRow] = useState(props.data);
    const [selectedPlainTextCells, setSelectedPlainTextCells] = useState([]);
    const [selectedCipherTextCells, setSelectedCipherTextCells] = useState([]);

    useImperativeHandle(ref, () => ({
        mergeCells() {
            mergeCells();
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

    const renderRow = (isPlainText, key, isSelected) => {
        return <tr>
            {row.map((rowItem, idx) => {
                const keyFull = `${key}-${isPlainText ? 'plainText' : 'cipherText'}-${idx}`;

                return <td key={keyFull} align={"center"} className={`border-solid border-2 border-black p-0 m-0 hover:cursor-pointer hover:bg-blue-300 hover:text-white transition duration-200 ${isSelected(idx) ? 'bg-deep-purple-200' : isPlainText ? 'bg-amber-200' : 'bg-blue-100'}`} onClick={() => handleCellClicked(idx, isPlainText)}>
                    <TextCell data={isPlainText ? rowItem.plainText : rowItem.cipherText} />
                </td>;
            })}
        </tr>
    }

    const mergeCells = () => {
        let _row =  JSON.parse(JSON.stringify(row));
        let _selectedPlainTextCells = JSON.parse(JSON.stringify(selectedPlainTextCells));
        let _selectedCipherTextCells = JSON.parse(JSON.stringify(selectedCipherTextCells));
        if (_row.length <= 1) {
            return;
        }

        // first merge plain text cells
        mergeRowCells(_row, _selectedPlainTextCells, 'plainText');
        mergeRowCells(_row, _selectedCipherTextCells, 'cipherText');

        setRow(_row);
        setSelectedPlainTextCells(_selectedPlainTextCells);
        setSelectedCipherTextCells(_selectedCipherTextCells);
    }

    const mergeRowCells = (_row, _selectedTextCells, text) => {
        let idx = 0;
        while (true){
            if (idx >= _row.length)
                break;

            if (!_selectedTextCells.includes(idx)){
                idx++;
                continue;
            }

            let cell1 = _row[idx];
            let idx2 = idx + 1;
            while (true){
                if (!_selectedTextCells.includes(idx2)){
                    idx = idx2 + 1;
                    break;
                }

                // merge cells 1 and 2
                let cell2 = _row[idx2];
                cell1[text] += cell2[text];
                for (let i = idx2; i < _row.length - 1; i++)
                    _row[i][text] = _row[i + 1][text];

                _row[_row.length - 1][text] = false;

                for (let i = 0; i < _selectedTextCells.length; i++){
                    if (_selectedTextCells[i] > idx)
                        _selectedTextCells[i] -= 1;
                }
            }
        }
    }

    return (<>
        <div className="mt-2">
            <table className="w-fit">
                <tbody>
                    {renderRow(true, props._key, isPlainTextCellSelected)}
                    {renderRow(false, props._key, isCipherTextCellSelected)}
                </tbody>
            </table>
        </div>
    </>);
});

export default Row;
