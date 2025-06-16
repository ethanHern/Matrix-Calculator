import { AddColumn, AddRow, GetMatrixColumns, GetMatrixRows, RemoveColumn, RemoveRow } from "@/utils/matrix-operations";
import { SetStateAction } from "react";

type InputProps = {
    matrix: number[][],
    matrixName: string,
    setMatrixFunction: (value: SetStateAction<number[][]>) => void,
}
export default function InputBox({matrix, matrixName, setMatrixFunction}: InputProps) {

    return (
    <div className="p-2 gap-y-1.5">
      <div className="flex gap-2">
        <div id={`Rows-${matrixName}`} className="flex gap-0.5">
          <p>Rows:</p>
          <button onClick={()=> {
            setMatrixFunction(RemoveRow(matrix));
          }}>
            <div className="bg-red-500 px-1 rounded-xl">
              -
            </div>
          </button>
          {GetMatrixRows(matrix)}
          <button onClick={()=> {
            setMatrixFunction(AddRow(matrix));
            }}>
            <div className="bg-green-500 rounded-xl">
              +
            </div>
          </button>
        </div>
        <div id={`Columns-${matrixName}`} className="flex gap-0.5">
          <p>Columns:</p>
          <button onClick={()=> {
            setMatrixFunction(RemoveColumn(matrix));
          }}>
            <div className="bg-red-500 px-1 rounded-xl">
              -
            </div>
          </button>
          {GetMatrixColumns(matrix)}
          <button onClick={()=> {
            setMatrixFunction(AddColumn(matrix));
            }}>
            <div className="bg-green-500 rounded-xl">
              +
            </div>
          </button>
        </div>
      </div>
      {matrix && matrix.map((row, rowIndex)=>(
        <div key={`${matrixName}-${rowIndex}`} className="flex gap-2">
          {row.map((cell, cellIndex)=>(
            <input key={`${matrixName}-${cellIndex}`} type={"number"} defaultValue={cell} onChange={(e)=>{
              let temp=matrix;
              temp[rowIndex][cellIndex]=e.target.valueAsNumber;
              setMatrixFunction(temp);
            }}
            className="shadow-inner"
            size={60}
            />
          ))}
        </div>
      ))}
      </div>
    )
}