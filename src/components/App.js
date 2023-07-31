import Header from "./Header";
import Buttons from "./Buttons";
import Main from "./Main";
import {useRef, useState} from "react";

const App = () => {
  const ref = useRef();

  const [plainText, setPlainText] = useState(false);
  const [cipherText, setCipherText] = useState(false);
  const [rows, setRows] = useState(false);

  const handleMergeCells = () => {
    ref.current.mergeCells();
  }

  const handleSplitCells = () => {
    ref.current.splitCells();
  }

  const handleShiftCellsRight = () => {
    ref.current.shiftCellsRight();
  }

  const handleShiftCellsLeft = () => {
    ref.current.shiftCellsLeft();
  }

  const handleSeparateCells = (row, textSeparator, groupItems) => {
    ref.current.separateCells(row, textSeparator, groupItems);
  }

  const handleExportData = () => {
    const data = ref.current.exportData();
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
        JSON.stringify(data)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "data.json";

    link.click();
  }

  const handleReconstructKey = () => {
    const data = ref.current.reconstructKey();
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
        JSON.stringify(data)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "reconstructedKey.json";

    link.click();
  }

  const handleImportData = (text) => {
    const data = JSON.parse(text);
    console.log(data);
    setRows(data);
  }

  return (<>
    <Header />
    <Buttons
        setPlainText={setPlainText}
        setCipherText={setCipherText}
        handleMergeCells={handleMergeCells}
        handleSplitCells={handleSplitCells}
        handleShiftCellsRight={handleShiftCellsRight}
        handleShiftCellsLeft={handleShiftCellsLeft}
        handleSeparateCells={handleSeparateCells}
        handleExportData={handleExportData}
        handleReconstructKey={handleReconstructKey}
        handleImportData={handleImportData} />

    <Main ref={ref} data={{plainText, cipherText, rows}}  />
  </>);
}

export default App;
