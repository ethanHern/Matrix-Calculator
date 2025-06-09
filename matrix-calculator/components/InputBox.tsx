import { SetStateAction } from "react";

type InputProps = {
    matrix: number[][],
    matrixName: string,
    setMatrixFunction: (value: SetStateAction<number[][]>) => void,
}
export default function InputBox({matrix, matrixName, setMatrixFunction}: InputProps) {

    return (
    <div className="p-2 gap-y-1.5">
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