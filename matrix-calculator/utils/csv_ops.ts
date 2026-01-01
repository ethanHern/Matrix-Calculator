import { SetStateAction } from "react";
import { Matrix, StringMatrix, StringToNum } from "./elementary-operations";

const default_matrix: StringMatrix = [['2', '2'], ['2', '2']];
export function ReadCSV(file: File, setMatrixFunction: (value: SetStateAction<Matrix>) => void) {
    
    const reader = new FileReader();
    reader.onload = () => {
        const text = reader.result;
        const rows = (text as string).split('\n').map((row) => row.split(','));
        if (rows[rows.length-1][0] == '') {rows.pop();}
        setMatrixFunction(StringToNum(rows));
    };
    reader.readAsText(file);
}

const noDigits = /^[^0-9]+/;
function CleanCSV(text: string[][]): StringMatrix {
    let cleaned_text = text.slice(0, -1);
    for (const row in cleaned_text){ // Remove spaces from CSV cells
        row.replace(' ', '');
    }
    return cleaned_text;
}