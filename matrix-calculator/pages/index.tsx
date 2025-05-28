import { useState } from "react"

export default function Home() {
  const [A, setA] = useState<number[][]>([[2, 2, 2], [2, 2, 2]]);
  const [B, setB] = useState<number[][]>([[2, 2], [2, 2], [2, 2]]);
  const [output, setOutput] = useState<number[][]>([]);
  const [ARows, setARows] = useState<number>(2);
  const [ACols, setACols] = useState<number>(3);
  const [BRows, setBRows] = useState<number>(3);
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
      <button onClick={()=> {
        multiplyMatrices();
        console.log(output);
      }}>Set</button>
    </div>
  )
}