import InputBox from "@/components/InputBox";
import OutputBox from "@/components/OutputBox";
import { GaussianElimination } from "@/utils/advanced-operations";
import { GetMatrixColumns, GetMatrixRows, Matrix } from "@/utils/elementary-operations";
import { useState } from "react";

export default function Elimination() {
  const [A, setA] = useState<Matrix>([[0, 0], [0, 0]]);
  const [output, setOutput] = useState<Matrix>([[0, 0], [0, 0]]);

    return (
        <div className="mt-2 flex-col">
          <h1 className="font-extrabold text-4xl text-center">Gaussian Elimination</h1>
          <h3 className="text-center mb-3">Perform Gaussian Elimination on a matrix to bring it into Row Echelon Form (REF)</h3>

          {/*The input matrix*/}
          <InputBox matrix={A} matrixName="A" setMatrixFunction={setA} />

          {/*The container for the output*/}
          <div className="justify-items-center">
            <button onClick={()=> {
              setOutput(GaussianElimination(A));
            }}>
              <div className="bg-orange-500 p-3 rounded-xl">
                Eliminate
              </div>
            </button>
            <OutputBox rows={GetMatrixRows(output)} columns={GetMatrixColumns(output)} output={output} matrixName="output"/>
          </div>
        </div>
    )
}