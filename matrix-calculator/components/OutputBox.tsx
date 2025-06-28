import { Matrix } from "@/utils/elementary-operations";

type OutputProps = {
    rows: number,
    columns: number,
    output: Matrix,
}
export default function OutputBox({rows, columns, output}: OutputProps) {
    return (
        <div 
        className="grid"
        style={{
            gridTemplateColumns: `repeat(${columns}, auto)`,
            gridTemplateRows: `repeat(${rows}, auto)`,
        }}
        >
            {output && output.map((row, rowIndex)=>(
                row.map((cell, cellIndex)=>(
                <div key={`Output-${rowIndex}-${cellIndex}`} className={`p-3 rounded-sm shadow ${rowIndex % 2 == 0 && `bg-gray-300`}`}>{cell}</div>
                ))
            ))}
        </div>
    )
}