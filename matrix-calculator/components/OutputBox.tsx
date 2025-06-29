import { Matrix } from "@/utils/elementary-operations";
import Brace from "./Brace";

type OutputProps = {
    rows: number,
    columns: number,
    output: Matrix,
    matrixName: string,
}
export default function OutputBox({rows, columns, output, matrixName}: OutputProps) {
    return (
        <div className="flex h-fit justify-self-center py-2">
            <Brace matrixName={matrixName} side="left" />
            <div className="grid py-2" style={{gridTemplateColumns: `repeat(${columns}, auto)`, gridTemplateRows: `repeat(${rows}, auto)`,}}>
                {output && output.map((row, rowIndex)=>(
                    row.map((cell, cellIndex)=>(
                    <div key={`Output-${rowIndex}-${cellIndex}`} className={`p-3 rounded-sm shadow ${rowIndex % 2 == 0 && `bg-gray-300`}`}>{cell}</div>
                ))
                ))}
            </div>
            <Brace matrixName={matrixName} side="right" />
        </div>
    )
}