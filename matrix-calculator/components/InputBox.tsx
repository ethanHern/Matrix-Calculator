import { AddColumn, AddRow, GetMatrixColumns, GetMatrixRows, Matrix, RemoveColumn, RemoveRow } from "@/utils/elementary-operations";
import { SetStateAction } from "react";
import brace from "@/public/matrix-brace.svg"

type InputProps = {
    matrix: Matrix,
    matrixName: string,
    setMatrixFunction: (value: SetStateAction<Matrix>) => void,
}
export default function InputBox({matrix, matrixName, setMatrixFunction}: InputProps) {

    return (
    <div className="p-2 gap-y-1.5 flex-1">
      <div id="buttons" className="flex gap-2 justify-center">
        <div id={`Rows-${matrixName}`} className="flex gap-0.5">
          <p>Rows:</p>
          <button onClick={()=> {
            setMatrixFunction(RemoveRow(matrix));
          }}>
            <div className="bg-red-500 px-2 rounded-xl">
              -
            </div>
          </button>
          {GetMatrixRows(matrix)}
          <button onClick={()=> {
            setMatrixFunction(AddRow(matrix));
            }}>
            <div className="bg-green-500 px-2 rounded-xl">
              +
            </div>
          </button>
        </div>
        <div id={`Columns-${matrixName}`} className="flex gap-0.5">
          <p>Columns:</p>
          <button onClick={()=> {
            setMatrixFunction(RemoveColumn(matrix));
          }}>
            <div className="bg-red-500 px-2 rounded-xl">
              -
            </div>
          </button>
          {GetMatrixColumns(matrix)}
          <button onClick={()=> {
            setMatrixFunction(AddColumn(matrix));
            }}>
            <div className="bg-green-500 px-2 rounded-xl">
              +
            </div>
          </button>
        </div>
      </div>
      <div className="flex max-w-xl max-h-xl justify-self-center">
        <img src={brace}/>
        <div id="matrix" className="overflow-x-auto overflow-auto">
          {matrix && matrix.map((row, rowIndex)=>(
            <div key={`${matrixName}-${rowIndex}`} className="flex gap-2">
              {row.map((cell, cellIndex)=>(
                <input key={`${matrixName}-${cellIndex}`} type={"number"} defaultValue={cell} onChange={(e)=>{
                  let temp=matrix;
                  temp[rowIndex][cellIndex]=e.target.valueAsNumber;
                  setMatrixFunction(temp);
                }}
                className={`hover:shadow-inner w-[90px] rounded-xs ${rowIndex % 2 == 0 && `bg-gray-100`}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      </div>
    )
}