import InputBox from "@/components/InputBox";
import OutputBox from "@/components/OutputBox";
import { GaussianElimination, GaussJordanElimination } from "@/utils/advanced-operations";
import { GetMatrixColumns, GetMatrixRows, Matrix } from "@/utils/elementary-operations";
import { useState } from "react";

export default function Elimination() {
  const [A, setA] = useState<Matrix>([[0, 0], [0, 0]]);
  const [output, setOutput] = useState<Matrix>([[0, 0], [0, 0]]);
  const [failed, setFailed] = useState<boolean>(false);

    return (
        <div className="mt-2 flex-col">
          <h1 className="font-extrabold text-4xl text-center">Gaussian Elimination</h1>
          <h3 className="text-center mb-3">Perform Gaussian Elimination on a matrix to bring it into Row Echelon Form (REF)</h3>

          {/*The input matrix*/}
          <InputBox matrix={A} matrixName="A" setMatrixFunction={setA} />

          {/*The container for the output*/}
          <div className="flex flex-col items-center">
            <button onClick={()=> {
              let data = GaussJordanElimination(A);
              setFailed(data.failed);
              if (data.result) {setOutput(data.result);}
            }}>
              <div className="bg-orange-500 p-3 rounded-xl">
                Eliminate
              </div>
            </button>
            {failed &&
            <div className="text-center justify-self-center">
              <p>Elimination Failed! (Zero pivot encountered)</p>
              <p>Below is the last step before failure</p>
            </div>
            }
            <OutputBox rows={GetMatrixRows(output)} columns={GetMatrixColumns(output)} output={output} matrixName="output"/>
          </div>
        </div>
    )
}