function TextCell(props){
    const data = props.data;

    return <div className="m-1">
        {data ? data : ''}
    </div>;
}

export default TextCell;
