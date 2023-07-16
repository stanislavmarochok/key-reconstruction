import {
    Button, ButtonGroup, Dialog, DialogBody, DialogHeader
} from "@material-tailwind/react";
import {useState} from "react";

function Buttons(props) {
    const [isImportPlainTextDialogOpen, setIsImportPlainTextDialogOpen] = useState(false);
    const [isImportCipherTextDialogOpen, setIsImportCipherTextDialogOpen] = useState(false);

    const handleOpenImportPlainTextDialog = () => setIsImportPlainTextDialogOpen(!isImportPlainTextDialogOpen);
    const handleOpenImportCipherTextDialog = () => setIsImportCipherTextDialogOpen(!isImportCipherTextDialogOpen);

    const uploadText = async (e, onClickHandler, onChangeHandler) => {
        e.preventDefault();
        const reader = new FileReader();
        reader.onload = async (e) => {
            const text = (e.target.result);
            onChangeHandler(text);
            onClickHandler();
        };
        reader.readAsText(e.target.files[0]);
    }

    const renderDialog = (title, isOpen, onClickHandler, onChangeHandler) => {
        return (
            <Dialog open={isOpen} handler={onClickHandler}>
                <DialogHeader className="uppercase">{title}</DialogHeader>
                <DialogBody divider>
                    <div className="flex items-center justify-center w-full">
                        <label htmlFor="dropzone-file"
                               className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                </svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span
                                    className="font-semibold">Click to upload</span> or drag and drop</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">TXT</p>
                            </div>
                            <input id="dropzone-file" type="file" className="hidden" onChange={(e) => uploadText(e, onClickHandler, onChangeHandler)} />
                        </label>
                    </div>
                </DialogBody>
            </Dialog>
        );
    }

    return (
        <div className="flex flex-col w-max gap-4 mx-auto mt-2">
            <ButtonGroup className="mx-auto">
                <Button onClick={handleOpenImportPlainTextDialog}>import plain text</Button>
                <Button onClick={handleOpenImportCipherTextDialog}>import cipher text</Button>
                <Button>import json</Button>
                <Button>export json</Button>
            </ButtonGroup>
            <ButtonGroup color="green" className="mx-auto">
                <Button onClick={props.handleMergeCells}>merge cells</Button>
                <Button>split cells</Button>
                <Button>shift right</Button>
                <Button>shift left</Button>
            </ButtonGroup>

            {renderDialog("import plain text here", isImportPlainTextDialogOpen, handleOpenImportPlainTextDialog, props.setPlainText)}
            {renderDialog("import cipher text here", isImportCipherTextDialogOpen, handleOpenImportCipherTextDialog, props.setCipherText)}

        </div>
    );
}

export default Buttons;
