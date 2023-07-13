function Main(props){
    return (<>
        <div className="w-[80%] max-w-[80%] mx-auto h-max max-h-max bg-amber-200 overflow-auto">
            {props.plainText}
        </div>
    </>);
}

export default Main;
