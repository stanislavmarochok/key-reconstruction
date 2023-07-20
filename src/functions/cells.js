const removeEmptyCells = (_row, _selectedPlainTextCells, _selectedCipherTextCells) => {
    // remove empty cells from the end
    while (true){
        let idx = _row.length - 1;
        if (idx < 0)
            return;

        let cell = _row[idx];
        if (!cell || (cell.plainText === false && cell.cipherText === false)){
            _row.pop();
        }
        else
            break;
    }

    // remove empty cells from the start
    while (true){
        let idx = 0;
        let cell = _row[idx];
        if (!cell || (cell.plainText === false && cell.cipherText === false)){
            _row.shift();

            if (_selectedPlainTextCells && _selectedPlainTextCells.length > 0)
                for (let i = 0; i < _selectedPlainTextCells.length; i++)
                    _selectedPlainTextCells[i] -= 1;

            if (_selectedCipherTextCells && _selectedCipherTextCells.length > 0)
                for (let i = 0; i < _selectedCipherTextCells.length; i++)
                    _selectedCipherTextCells[i] -= 1;
        }
        else
            break;
    }
}

export const mergeCellsF = (row, selectedPlainTextCells, selectedCipherTextCells) => {
    const mergeCells = () => {
        let _row = JSON.parse(JSON.stringify(row));
        let _selectedPlainTextCells = JSON.parse(JSON.stringify(selectedPlainTextCells));
        let _selectedCipherTextCells = JSON.parse(JSON.stringify(selectedCipherTextCells));
        if (_row.length <= 1) {
            return false;
        }

        mergeRowCells(_row, _selectedPlainTextCells, 'plainText');
        mergeRowCells(_row, _selectedCipherTextCells, 'cipherText');

        removeEmptyCells(_row, _selectedPlainTextCells, _selectedCipherTextCells);

        return {
            row: _row,
            selectedPlainTextCells: _selectedPlainTextCells,
            selectedCipherTextCells: _selectedCipherTextCells
        };
    }

    const mergeRowCells = (_row, _selectedTextCells, text) => {
        let idx = 0;
        while (true) {
            if (idx >= _row.length)
                break;

            if (!_selectedTextCells.includes(idx)) {
                idx++;
                continue;
            }

            let cell1 = _row[idx];
            let idx2 = idx + 1;
            while (true) {
                if (!_selectedTextCells.includes(idx2)) {
                    idx = idx2 + 1;
                    break;
                }

                // merge cells 1 and 2
                let cell2 = _row[idx2];
                cell1[text] += cell2[text] ? cell2[text] : ' ';
                for (let i = idx2; i < _row.length - 1; i++)
                    _row[i][text] = _row[i + 1][text];

                _row[_row.length - 1][text] = false;

                for (let i = 0; i < _selectedTextCells.length; i++) {
                    if (_selectedTextCells[i] > idx)
                        _selectedTextCells[i] -= 1;
                }
            }
        }
    }

    return mergeCells();
}

export const splitCellsF = (row, selectedPlainTextCells, selectedCipherTextCells) => {
    const splitCells = () => {
        let _row = JSON.parse(JSON.stringify(row));
        let _selectedPlainTextCells = JSON.parse(JSON.stringify(selectedPlainTextCells));
        let _selectedCipherTextCells = JSON.parse(JSON.stringify(selectedCipherTextCells));
        if (_row.length <= 1) {
            return false;
        }

        splitRowCells(_row, _selectedPlainTextCells, 'plainText');
        splitRowCells(_row, _selectedCipherTextCells, 'cipherText');

        return {
            row: _row,
            selectedPlainTextCells: _selectedPlainTextCells,
            selectedCipherTextCells: _selectedCipherTextCells
        };
    }

    const splitRowCells = (_row, _selectedTextCells, text) => {
        let idx = 0;
        while (true) {
            if (idx >= _row.length)
                break;

            if (!_selectedTextCells.includes(idx)) {
                idx++;
                continue;
            }

            while (true){

                let val = _row[idx][text];
                if (val.length <= 1){
                    idx++;
                    break;
                }

                if (_row[_row.length - 1][text])
                    _row.push({plainText: false, cipherText: false});

                for (let i = _row.length - 1; i > idx; i--){
                    _row[i][text] = _row[i - 1][text];
                }

                _row[idx + 1][text] = val[val.length - 1];
                val = val.substring(0, val.length - 1);
                _row[idx][text] = val;

                for (let i = 0; i < _selectedTextCells.length; i++)
                    if (_selectedTextCells[i] > idx)
                        _selectedTextCells[i] += 1;

                _selectedTextCells.push(idx + 1);
            }
        }
    }

    return splitCells();
}

export const shiftCellsRightF = (row, selectedPlainTextCells, selectedCipherTextCells) => {
    const shiftCellsRight = () => {
        let _row = JSON.parse(JSON.stringify(row));
        let _selectedPlainTextCells = JSON.parse(JSON.stringify(selectedPlainTextCells));
        let _selectedCipherTextCells = JSON.parse(JSON.stringify(selectedCipherTextCells));
        if (_row.length <= 1) {
            return false;
        }

        shiftRowCellsRight(_row, _selectedPlainTextCells, 'plainText');
        shiftRowCellsRight(_row, _selectedCipherTextCells, 'cipherText');

        removeEmptyCells(_row, _selectedPlainTextCells, _selectedCipherTextCells);

        return {
            row: _row,
            selectedPlainTextCells: _selectedPlainTextCells,
            selectedCipherTextCells: _selectedCipherTextCells
        };
    }

    const shiftRowCellsRight = (_row, _selectedTextCells, text) => {
        let idx = _row.length - 1;
        while (true) {
            if (idx >= _row.length || idx < 0)
                break;

            if (!_selectedTextCells.includes(idx)) {
                idx--;
                continue;
            }

            let firstFreeCell = false;
            for (let i = idx + 1; i < _row.length; i++){
                let cell = _row[i];
                if (!cell[text]){
                    firstFreeCell = i;
                    break;
                }
            }

            if (!firstFreeCell)
                _row.push({plainText: false, cipherText: false});

            for (let i = firstFreeCell !== false ? firstFreeCell : _row.length - 1; i > idx; i--){
                _row[i][text] = _row[i - 1][text];
            }

            _row[idx][text] = false;

            for (let i = 0; i < _selectedTextCells.length; i++)
                if (_selectedTextCells[i] >= idx && (firstFreeCell === false || _selectedTextCells[i] < firstFreeCell))
                    _selectedTextCells[i] += 1;
        }
    }

    return shiftCellsRight();
}

export const shiftCellsLeftF = (row, selectedPlainTextCells, selectedCipherTextCells) => {
    const shiftCellsLeft = () => {
        let _row = JSON.parse(JSON.stringify(row));
        let _selectedPlainTextCells = JSON.parse(JSON.stringify(selectedPlainTextCells));
        let _selectedCipherTextCells = JSON.parse(JSON.stringify(selectedCipherTextCells));
        if (_row.length <= 1) {
            return false;
        }

        shiftRowCellsLeft(_row, _selectedPlainTextCells, 'plainText');
        shiftRowCellsLeft(_row, _selectedCipherTextCells, 'cipherText');

        removeEmptyCells(_row, _selectedPlainTextCells, _selectedCipherTextCells);

        return {
            row: _row,
            selectedPlainTextCells: _selectedPlainTextCells,
            selectedCipherTextCells: _selectedCipherTextCells
        };
    }

    const shiftRowCellsLeft = (_row, _selectedTextCells, text) => {
        let idx = 0;
        while (true) {
            if (idx >= _row.length || idx < 0)
                break;

            if (!_selectedTextCells.includes(idx)) {
                idx += 1;
                continue;
            }

            let firstFreeCellToLeft = false;
            for (let i = idx - 1; i >= 0; i--){
                if (_row[i][text] === false){
                    firstFreeCellToLeft = i;
                    break;
                }
            }

            if (firstFreeCellToLeft === false){
                _row.unshift({plainText: false, cipherText: false});
                idx += 1;
            }

            for (let i = firstFreeCellToLeft !== false ? firstFreeCellToLeft : 0; i < idx; i++){
                _row[i][text] = _row[i + 1][text];
            }

            _row[idx][text] = false;

            if (firstFreeCellToLeft !== false)
                for (let i = 0; i < _selectedTextCells.length; i++)
                    if (_selectedTextCells[i] > firstFreeCellToLeft && _selectedTextCells[i] <= idx)
                        _selectedTextCells[i] -= 1;

            if (firstFreeCellToLeft === false)
                for (let i = 0; i < _selectedTextCells.length; i++)
                    if (_selectedTextCells[i] > idx)
                        _selectedTextCells[i] += 1;

            idx += 1;
        }
    }

    return shiftCellsLeft();
}

export const separateCellsF = (row, rowName, textSeparator, groupItems) => {
    const separateCells = () => {
        let _row = JSON.parse(JSON.stringify(row));

        let wholeText = "";
        for (let i = 0; i < _row.length; i++){
            let cell = _row[i];
            if (cell[rowName] !== false)
                wholeText += cell[rowName];
        }

        let splittedTextGroups = [];
        if (textSeparator){
            let groups = wholeText.split(textSeparator);
            for (let i = 0; i < groups.length; i++){
                splittedTextGroups.push(groups[i]);
                splittedTextGroups.push(textSeparator);
            }
        }

        if (groupItems){
            splittedTextGroups = [];
            for (let i = 0; i < wholeText.length; i += groupItems){
                let groups = [];
                for (let j = 0; j < groupItems; j++){
                    groups.push(wholeText[i + j]);
                }
                splittedTextGroups.push(groups.join(''));
            }
        }

        for (let i = 0; i < splittedTextGroups.length; i++){
            if (i >= _row.length)
                break;
            _row[i][rowName] = splittedTextGroups[i];
        }

        for (let i = splittedTextGroups.length; i < _row.length; i++){
            if (i >= _row.length)
                break;
            _row[i][rowName] = false;
        }

        removeEmptyCells(_row);

        return {
            row: _row,
            selectedPlainTextCells: [],
            selectedCipherTextCells: []
        };
    }

    return separateCells();
}
