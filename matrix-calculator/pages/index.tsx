import InputBox from "@/components/InputBox";
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

  function AddRowToA() { // Adds a row of 0's to A and updates row count
    let temp=A;
    temp.push(new Array(ACols).fill(0));
    setA(temp);
    setARows(ARows+1);
  }

  function RemoveRowFromA() { // Removes a row from A
    if (ARows == 1) { // Cannot have less than 1 row in a matrix
      return;
    }
    let temp = A;
    temp.pop();
    setARows(ARows - 1);
    setA(temp);
  }
  
  function AddColToA() { // Adds a column to A and a Row to B to match
    let temp=A;
    for (let i = 0; i < ARows; i++) {
      temp[i].push(0);
    }
    setA(temp);
    setACols(ACols+1);
  }
  
  function RemoveColFromA() {
    if (ACols == 1) { // Cannot have less than 1 column
      return
    }
    let temp = A;
    for (let i = 0; i < ARows; i++) {
      temp[i].pop();
    }
    setACols(ACols-1);
    setA(temp);
  }

  function AddRowToB() {
    let temp=B;
    temp.push(new Array(BCols).fill(0));
    setB(temp);
    setBRows(BRows+1);
    if (BRows+1 != ACols) {AddColToA();}
  }

  function RemoveRowFromB() { // Removes a row from B, and a column from A
    if (BRows == 1) { // Cannot have less than 1 row in a matrix
      return;
    }
    let temp = B;
    temp.pop();
    setBRows(BRows - 1);
    setB(temp);
    if (BRows-1 != ACols) {RemoveColFromA();}
  }

  function AddColToB() {// Adds a column to B
    let temp=B;
    for (let i = 0; i < BRows; i++) {
      temp[i].push(0);
    }
    setB(temp);
    setBCols(BCols+1);
  }

  function RemoveColFromB() {
    if (BCols == 1) { // Cannot have less than 1 column
      return
    }
    let temp = B;
    for (let i = 0; i < BRows; i++) {
      temp[i].pop();
    }
    setBCols(BCols-1);
    setB(temp);
  }

  return (
    <div>
      <div className="flex">
        <button onClick={()=> {AddRowToA();}}>
          <div className="bg-green-500 p-3 rounded-xl">
            Add Row to A
          </div>
        </button>
        <button onClick={()=> {RemoveRowFromA();}}>
          <div className="bg-red-500 p-3 rounded-xl">
            Remove Row From A
          </div>
        </button>
        <button onClick={()=> {AddRowToB();}}>
          <div className="bg-green-500 p-3 rounded-xl">
            Add Column to A
          </div>
        </button>
        <button onClick={()=> {RemoveRowFromB();}}>
          <div className="bg-red-500 p-3 rounded-xl">
            Remove Column from A
          </div>
        </button>
        <button onClick={()=> {AddRowToB();}}>
          <div className="bg-green-500 p-3 rounded-xl">
            Add Row to B
          </div>
        </button>
        <button onClick={()=> {RemoveRowFromB();}}>
          <div className="bg-red-500 p-3 rounded-xl">
            Remove Row from B
          </div>
        </button>
        <button onClick={()=> {AddColToB();}}>
          <div className="bg-green-500 p-3 rounded-xl">
            Add Column to B
          </div>
        </button>
        <button onClick={()=> {RemoveColFromB();}}>
          <div className="bg-red-500 p-3 rounded-xl">
            Remove Column from B
          </div>
        </button>

      </div>
      <div className="flex w-fill px-16 place-content-between">
        <InputBox matrix={A} matrixName={"A"} setFunction={setA}/>
        <InputBox matrix={B} matrixName={"B"} setFunction={setB}/>
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