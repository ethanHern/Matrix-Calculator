import InputBox from "@/components/InputBox";
import OutputBox from "@/components/OutputBox";
import { GetMatrixColumns, GetMatrixRows, Matrix, MultiplyMatrices } from "@/utils/elementary-operations";
import { useState } from "react";


export default function Multiplication() {
  const [A, setA] = useState<Matrix>([[0, 0], [0, 0]]);
  const [B, setB] = useState<Matrix>([[0, 0], [0, 0]]);
  const [output, setOutput] = useState<Matrix>([[0, 0], [0, 0]]);
  const [multPossible, setMultPossible] = useState<boolean>(true);

  return (
    <div className="mt-2 flex-col">
      <h1 className="font-extrabold text-4xl text-center">Matrix Multiplication</h1>
      <h3 className="text-center mb-3">Multiply a matrix A by another matrix B</h3>

      {/*The container for the input matrices*/}
      <div className="flex px-16 min-w-screen">
        {/*Input A*/}
        <InputBox matrix={A} matrixName={"A"} setMatrixFunction={setA}/>

        {/*The swap button*/}
        <button className="self-start" onClick={()=>{setA(B); setB(A);}}>
          <div className="bg-gradient-to-tl bg-gray-300 rounded-xl p-3">Swap</div>
        </button>

        {/*Input B*/}
        <InputBox matrix={B} matrixName={"B"} setMatrixFunction={setB}/>
      </div>

      {/*The container for the output*/}
      <div className="flex flex-col items-center">
        {/*The Set button*/}
        <button onClick={()=> {
          if (GetMatrixColumns(A) == GetMatrixRows(B)) {
            setOutput(MultiplyMatrices(A, B));
            setMultPossible(true);
          }
          else {
            setMultPossible(false);
          }
        }}>
          <div className="bg-orange-500 p-3 rounded-xl">
            Set
          </div>
        </button>

        {/*This element only displays when the matrices are not eligible for multiplication*/}
        {!multPossible && <p className="text-red-500">The number of columns in A must match the number of rows in B!</p>}

        {/*The output matrix*/}
        <OutputBox rows={GetMatrixRows(output)} columns={GetMatrixColumns(output)} output={output} matrixName="output" showName={false}/>
      </div>
    </div>
  )
}