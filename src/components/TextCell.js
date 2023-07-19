import {useEffect, useState} from "react";

function TextCell(props){
    let data = props.data;
    const [showInput, setShowInput] = useState(false);

    const handleAuxClick = (event) => {
        if (event.button !== 1)
            return;

        setShowInput(!showInput);
    }

    const handleOnChange = event => {
        props.setCellData(event.target.value);
    }

    return <div className="m-1" onAuxClick={handleAuxClick}>
        {showInput && <input
            type={"text"}
            value={data ? data : ''}
            size={(data ? data : '').length}
            onChange={handleOnChange}
            className="bg-transparent outline-0 border-b-2 border-black"
            style={{ textAlign : "center" }}
            /> }
        {!showInput && <div>{data ? data : ''}</div>}
    </div>;
}

export default TextCell;
