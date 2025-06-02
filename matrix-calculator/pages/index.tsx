import { useState } from "react"

export default function Home() {
  const [A, setA] = useState<number[][]>([[2, 2], [2, 2]]);
  const [B, setB] = useState<number[][]>([[2, 2], [2, 2]]);
  const [output, setOutput] = useState<number[][]>([[0, 0], [0, 0]]);
  const [ARows, setARows] = useState<number>(2);
  const [ACols, setACols] = useState<number>(2);
  const [BRows, setBRows] = useState<number>(2);
  const [BCols, setBCols] = useState<number>(2);

  async function multiplyMatrices() {
    'use server'
    let c : number[][] = Array(ARows).fill(null).map(() => Array(BCols).fill(0));
    for (let i = 0; i < ARows; i++) {
      for (let j = 0; j < BCols; j++) {
        let temp = 0;
        for (let k = 0; k < ACols; k++) {
          temp += A[i][k] * B[k][j];
        }
        c[i][j] = temp;
      }
    }
    setOutput(c);
  }

  return (
    <div>
      <div>
        {A && A.map((row, rowIndex)=>(
          <div key={"A-" + rowIndex} className="flex">
            {row.map((cell, cellIndex)=>(
              <input key={"A-" + cellIndex} type={"number"} defaultValue={cell} onChange={(e)=>{
                let temp=A;
                temp[rowIndex][cellIndex]=e.target.valueAsNumber;
                setA(temp);
              }}
              className="shadow-inner w-[30px]"/>
            ))}
          </div>
        ))}
      </div>
      <div>
        {B && B.map((row, rowIndex)=>(
          <div key={"B-" + rowIndex} className="flex">
            {row.map((cell, cellIndex)=>(
              <input key={"B-" + cellIndex} type={"number"} defaultValue={cell} onChange={(e)=>{
                let temp=B;
                temp[rowIndex][cellIndex]=e.target.valueAsNumber;
                setB(temp);
              }}
              className="shadow-inner w-[30px]"/>
            ))}
          </div>
        ))}
      </div>
      <button onClick={()=> {
        multiplyMatrices();
        console.log(output);
      }}>
        <div className="bg-red-500 p-3 rounded-xl">
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