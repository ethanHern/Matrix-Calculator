import { AddColumn, AddRow, GetMatrixColumns, GetMatrixRows, Matrix, RemoveColumn, RemoveRow } from "@/utils/elementary-operations";
import { SetStateAction } from "react";
import Brace from "./Brace";

type InputProps = {
    matrix: Matrix,
    matrixName: string,
    setMatrixFunction: (value: SetStateAction<Matrix>) => void,
}
export default function InputBox({matrix, matrixName, setMatrixFunction}: InputProps) {

    return (
    <div className="p-2 gap-y-1.5 flex-1">
      {/* Matrix title */}
      <p className="text-4xl font-extrabold font-serif text-center">{matrixName}</p>

      {/* Buttons to set rows and columns */}
      <div id={`Buttons-${matrixName}`} className="flex gap-2 justify-center">
        {/* Row Buttons */}
        <div id={`Rows-${matrixName}`} className="flex gap-1">
          <p>Rows:</p>
          <button onClick={()=> {
            setMatrixFunction(RemoveRow(matrix));
          }}>
            <div className="bg-red-500 px-4 rounded-xl font-bold hover:cursor-pointer hover:inset-shadow-md hover:bg-red-600 active:bg-red-700">
              -
            </div>
          </button>
          {GetMatrixRows(matrix)}
          <button onClick={()=> {
            setMatrixFunction(AddRow(matrix));
            }}>
            <div className="bg-green-500 px-4 rounded-xl font-bold hover:cursor-pointer hover:inset-shadow-md hover:bg-green-600 active:bg-green-700">
              +
            </div>
          </button>
        </div>
        {/* Column Buttons */}
        <div id={`Columns-${matrixName}`} className="flex gap-1">
          <p>Columns:</p>
          <button onClick={()=> {
            setMatrixFunction(RemoveColumn(matrix));
          }}>
            <div className="bg-red-500 px-4 rounded-xl font-bold hover:cursor-pointer hover:inset-shadow-md hover:bg-red-600 active:bg-red-700">
              -
            </div>
          </button>
          {GetMatrixColumns(matrix)}
          <button onClick={()=> {
            setMatrixFunction(AddColumn(matrix));
            }}>
            <div className="bg-green-500 px-4 rounded-xl font-bold hover:cursor-pointer hover:inset-shadow-md hover:bg-green-600 active:bg-green-700">
              +
            </div>
          </button>
        </div>
      </div>

      {/* The input container */}
      <div className="flex max-w-xl h-fit justify-self-center items-stretch py-1">
        <Brace matrixName={matrixName} side="left"/>
        <div id="matrix" className="overflow-x-auto py-2 justify-center">
          {matrix && matrix.map((row, rowIndex)=>(
            <div key={`${matrixName}-${rowIndex}`} className="flex gap-2">
              {row.map((cell, cellIndex)=>(
                <input title={`${matrixName}[${rowIndex + 1}, ${cellIndex + 1}]`} key={`${matrixName}-${cellIndex}`} type={"number"} value={cell} onChange={(e)=>{
                  let temp = matrix.map(r => [...r]);
                  temp[rowIndex][cellIndex]=e.target.valueAsNumber;
                  setMatrixFunction(temp);
                }}
                className={`hover:shadow-inner w-[90px] rounded-xs ${rowIndex % 2 == 0 ? `bg-gray-100`: `bg-white`} text-center`}
                />
              ))}
            </div>
          ))}
        </div>
        <Brace matrixName={matrixName} side="right" />
      </div>

      {/* The Clear button */}
      <div className="">
        <button>
          <div className="bg-neutral-500">
            <h3>Clear</h3>
          </div>
        </button>
      </div>
    </div>)
}