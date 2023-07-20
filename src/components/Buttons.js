import {
    Button, ButtonGroup, Dialog, DialogBody, DialogHeader, Input
} from "@material-tailwind/react";
import {useState} from "react";

function Buttons(props) {
    const [isImportTextDialogOpen, setIsImportTextDialogOpen] = useState(false);
    const [isSeparateCellsDialogOpen, setIsSeparateCellsDialogOpen] = useState(false);

    const handleOpenImportTextDialog = () => setIsImportTextDialogOpen(!isImportTextDialogOpen);

    const handleOpenSeparateCellsDialog = () => setIsSeparateCellsDialogOpen(!isSeparateCellsDialogOpen);

    const uploadText = async (e, onChangeHandler) => {
        e.preventDefault();
        const reader = new FileReader();
        reader.onload = async (e) => {
            const text = (e.target.result);
            onChangeHandler(text);
        };
        reader.readAsText(e.target.files[0]);
    }

    const renderDropDownFileInputArea = (text) => {
        return (
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">{text}</p>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span
                    className="font-semibold">Click to upload</span> or drag and drop</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">TXT</p>
            </div>
        );
    }

    const renderDialog = (title) => {
        return (
            <Dialog open={isImportTextDialogOpen} handler={handleOpenImportTextDialog}>
                <DialogHeader className="uppercase">Import text</DialogHeader>
                <DialogBody divider>
                    <div className="flex gap-4">
                        <div className="flex items-center justify-center w-full">
                            <label htmlFor="dropzone-file"
                                   className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                {renderDropDownFileInputArea('PLAIN TEXT')}
                                <input id="dropzone-file" type="file" className="hidden" onChange={(e) => uploadText(e, props.setPlainText)} />
                            </label>
                        </div>
                        <div className="flex items-center justify-center w-full">
                            <label htmlFor="dropzone-file-2"
                                   className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                {renderDropDownFileInputArea('CIPHER TEXT')}
                                <input id="dropzone-file-2" type="file" className="hidden" onChange={(e) => uploadText(e, props.setCipherText)} />
                            </label>
                        </div>
                    </div>
                </DialogBody>
            </Dialog>
        );
    }

    const renderSeparateCellsDialog = () => {
        return (
            <Dialog open={isSeparateCellsDialogOpen} handler={handleOpenSeparateCellsDialog}>
                <DialogHeader className="uppercase">Separate cells</DialogHeader>
                <DialogBody divider>
                    <div className="mb-4 flex flex-col gap-6">
                        <Input size="lg" label="Name" />
                        <Input size="lg" label="Email" />
                        <Input type="password" size="lg" label="Password" />
                    </div>
                </DialogBody>
            </Dialog>
        );
    }

    return (
        <div className="flex flex-col w-max gap-4 mx-auto mt-2">
            <ButtonGroup className="mx-auto">
                <Button onClick={handleOpenImportTextDialog}>import text</Button>
                <Button>import json</Button>
                <Button>export json</Button>
            </ButtonGroup>
            <ButtonGroup color="green" className="mx-auto">
                <Button onClick={props.handleMergeCells}>merge cells</Button>
                <Button onClick={props.handleSplitCells}>split cells</Button>
                <Button onClick={props.handleShiftCellsRight}>shift right</Button>
                <Button onClick={props.handleShiftCellsLeft}>shift left</Button>
                <Button onClick={handleOpenSeparateCellsDialog}>separate text</Button>
            </ButtonGroup>

            {renderDialog("import plain text here", props.setPlainText)}
            {renderSeparateCellsDialog()}
        </div>
    );
}

export default Buttons;
