import Header from "./Header";
import Buttons from "./Buttons";
import Main from "./Main";
import {useState} from "react";

function App() {
  const [plainText, setPlainText] = useState(false);
  const [cipherText, setCipherText] = useState(false);

  return (<>
    <Header />
    <Buttons setPlainText={setPlainText} setCipherText={setCipherText} />

    <Main plainText={plainText} cipherText={cipherText} />
  </>);
}

export default App;
