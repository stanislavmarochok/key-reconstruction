import Header from "./Header";
import Buttons from "./Buttons";
import Main from "./Main";
import {useRef, useState} from "react";

const App = () => {
  const ref = useRef();

  const [plainText, setPlainText] = useState(false);
  const [cipherText, setCipherText] = useState(false);

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

  return (<>
    <Header />
    <Buttons
        setPlainText={setPlainText}
        setCipherText={setCipherText}
        handleMergeCells={handleMergeCells}
        handleSplitCells={handleSplitCells}
        handleShiftCellsRight={handleShiftCellsRight}
        handleShiftCellsLeft={handleShiftCellsLeft} />

    <Main ref={ref} isJson={false} data={{plainText, cipherText}}  />
  </>);
}

export default App;
