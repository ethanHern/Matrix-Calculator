import InputBox from "@/components/InputBox";
import { AddColumn, AddRow, GetMatrixRows, MultiplyMatrices, RemoveColumn, RemoveRow } from "@/utils/matrix-operations";
import { useState } from "react"

export default function Home() {
  const [A, setA] = useState<number[][]>([[0, 0], [0, 0]]);
  const [B, setB] = useState<number[][]>([[0, 0], [0, 0]]);
  const [output, setOutput] = useState<number[][]>([[0, 0], [0, 0]]);

  return (
    <div>
      <div className="flex w-fill px-16 place-content-between">
        <InputBox matrix={A} matrixName={"A"} setMatrixFunction={setA}/>
        <InputBox matrix={B} matrixName={"B"} setMatrixFunction={setB}/>
      </div>

      <button onClick={()=> {
        setOutput(MultiplyMatrices(A, B));
        console.log(output);
      }}>
        <div className="bg-orange-500 p-3 rounded-xl">
          Set
        </div>
      </button>
      <div id={"output"}>
        {output && output.map((row, rowIndex)=>(
          <div key={"Output-" + rowIndex} className="flex">
            {row.map((cell, cellIndex)=>(
              <div key={"Output-" + cellIndex} className="p-3">{cell}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}