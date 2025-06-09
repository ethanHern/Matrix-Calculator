import InputBox from "@/components/InputBox";
import { AddColumn, AddRow, RemoveColumn, RemoveRow } from "@/utils/matrix-operations";
import { useState } from "react"

export default function Home() {
  const [A, setA] = useState<number[][]>([[0, 0], [0, 0]]);
  const [B, setB] = useState<number[][]>([[0, 0], [0, 0]]);
  const [output, setOutput] = useState<number[][]>([[0, 0], [0, 0]]);
  const [ARows, setARows] = useState<number>(2);
  const [ACols, setACols] = useState<number>(2);
  const [BRows, setBRows] = useState<number>(2);
  const [BCols, setBCols] = useState<number>(2);

  async function multiplyMatrices() {
    'use server'
    if (ACols != BRows) {return;}
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
      <div className="flex">
        <button onClick={()=> {
          setA(AddRow(A));
          setARows(ARows+1);
          }}>
          <div className="bg-green-500 p-3 rounded-xl">
            Add Row to A
          </div>
        </button>
        <button onClick={()=> {
          if (ARows > 1) {
            setA(RemoveRow(A));
            setARows(ARows-1);
          }
        }}>
          <div className="bg-red-500 p-3 rounded-xl">
            Remove Row From A
          </div>
        </button>
        <button onClick={()=> {
          setA(AddColumn(A));
          setACols(ACols+1);
        }}>
          <div className="bg-green-500 p-3 rounded-xl">
            Add Column to A
          </div>
        </button>
        <button onClick={()=> {
          if (ACols > 1) {
            setA(RemoveColumn(A));
            setACols(ACols-1);
          }
        }}>
          <div className="bg-red-500 p-3 rounded-xl">
            Remove Column from A
          </div>
        </button>
        <button onClick={()=> {
          setB(AddRow(B));
          setBRows(BRows+1)
        }}>
          <div className="bg-green-500 p-3 rounded-xl">
            Add Row to B
          </div>
        </button>
        <button onClick={()=> {
          if (BRows > 1) {
            setB(RemoveRow(B));
            setBRows(BRows-1);
          }
        }}>
          <div className="bg-red-500 p-3 rounded-xl">
            Remove Row from B
          </div>
        </button>
        <button onClick={()=> {
          setB(AddColumn(B));
          setBCols(BCols+1);
        }}>
          <div className="bg-green-500 p-3 rounded-xl">
            Add Column to B
          </div>
        </button>
        <button onClick={()=> {
          if (BCols > 1) {
            setB(RemoveColumn(B));
            setBCols(BCols-1);
          }
        }}>
          <div className="bg-red-500 p-3 rounded-xl">
            Remove Column from B
          </div>
        </button>

      </div>
      <div className="flex w-fill px-16 place-content-between">
        <InputBox matrix={A} matrixName={"A"} setMatrixFunction={setA}/>
        <InputBox matrix={B} matrixName={"B"} setMatrixFunction={setB}/>
      </div>

      <button onClick={()=> {
        multiplyMatrices();
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