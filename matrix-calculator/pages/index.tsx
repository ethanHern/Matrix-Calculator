import InputBox from "@/components/InputBox";
import OutputBox from "@/components/OutputBox";
import { GetMatrixColumns, GetMatrixRows, Matrix, MultiplyMatrices } from "@/utils/elementary-operations";
import { useState } from "react"

export default function Home() {
  const [A, setA] = useState<Matrix>([[0, 0], [0, 0]]);
  const [B, setB] = useState<Matrix>([[0, 0], [0, 0]]);
  const [output, setOutput] = useState<Matrix>([[0, 0], [0, 0]]);
  const [multPossible, setMultPossible] = useState<boolean>(true);

  return (
    <div className="mt-2 flex-col">
      <div className="flex px-16 min-w-screen">
        <InputBox matrix={A} matrixName={"A"} setMatrixFunction={setA}/>
        <button className="self-start" onClick={()=>{
          setA(B);
          setB(A);
        }}>
          <div className="bg-gradient-to-tl bg-gray-300 rounded-xl p-3">Swap</div>
        </button>
        <InputBox matrix={B} matrixName={"B"} setMatrixFunction={setB}/>
      </div>
      <div className="justify-items-center">
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
        {!multPossible && <p className="text-red-500">The number of columns in A must match the number of rows in B!</p>}
        <OutputBox rows={GetMatrixRows(output)} columns={GetMatrixColumns(output)} output={output} matrixName="output"/>
      </div>
    </div>
  )
}