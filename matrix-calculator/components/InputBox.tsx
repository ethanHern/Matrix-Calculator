import { SetStateAction } from "react";

type InputProps = {
    matrix: number[][],
    matrixName: string,
    setFunction: (value: SetStateAction<number[][]>) => void,
}
export default function InputBox({matrix, matrixName, setFunction}: InputProps) {

    return (
    <div>
        {matrix && matrix.map((row, rowIndex)=>(
          <div key={`${matrixName}-${rowIndex}`} className="flex gap-2">
            {row.map((cell, cellIndex)=>(
              <input key={`${matrixName}-${cellIndex}`} type={"number"} defaultValue={cell} onChange={(e)=>{
                let temp=matrix;
                temp[rowIndex][cellIndex]=e.target.valueAsNumber;
                setFunction(temp);
              }}
              className="shadow-inner w-[30px]"
              />
            ))}
          </div>
        ))}
      </div>
    )
}