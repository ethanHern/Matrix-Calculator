import InputBox from "@/components/InputBox";
import OutputBox from "@/components/OutputBox";
import { GaussianElimination, GaussJordanElimination } from "@/utils/advanced-operations";
import { GetMatrixColumns, GetMatrixRows, Matrix } from "@/utils/elementary-operations";
import { useState } from "react";

export default function Elimination() {
  const [A, setA] = useState<Matrix>([[0, 0], [0, 0]]);
  const [refForm, setRefForm] = useState<Matrix>();
  const [normalizedForm, setNormalizedForm] = useState<Matrix>();
  const [output, setOutput] = useState<Matrix>();
  const [failed, setFailed] = useState<boolean>(false);
  const [eliminationMode, setEliminationMode] = useState<boolean>(false); // False = Gaussian, True = Gauss-Jordan
  const [showSteps, setShowSteps] = useState<boolean>(false);

    return (
        <div className="mt-2 flex-col">

          {/* The container for the mode switcher button */}
          <div className="grid grid-cols-2 w-fit justify-self-center overflow-hidden rounded-2xl bg-red-400 border-2 border-black">
            <button onClick={()=>{setEliminationMode(false)}}>
              <div className={`grow-1 p-1 px-2 ${!eliminationMode ? "bg-gray-700 text-white" : "bg-white text-black hover:cursor-pointer hover:inset-shadow-md"}`}>Gaussian</div>
            </button>
            <button onClick={()=>{setEliminationMode(true)}}>
              <div className={`grow-1 p-1 px-2 ${eliminationMode ? "bg-gray-700 text-white": "bg-white text-black hover:cursor-pointer hover:inset-shadow-md"}`}>Gauss-Jordan</div>
            </button>
          </div>

          <h1 className="font-extrabold text-4xl text-center">{eliminationMode ? "Gauss-Jordan Elimination" : "Gaussian Elimination"}</h1>
          <h3 className="text-center mb-3">Perform Gaussian Elimination on a matrix to bring it into Row Echelon Form (REF)</h3>

          {/*The input matrix*/}
          <InputBox matrix={A} matrixName="A" setMatrixFunction={setA} />

          {/*The container for the output*/}
          <div className="flex flex-col items-center">
            <button onClick={()=> {
              let data = GaussJordanElimination(A);
              setFailed(data.failed);
              
              if (data.ref_form) {setRefForm(data.ref_form);}
              if (data.normalized_form) {setNormalizedForm(data.normalized_form);}
              if (data.result) {setOutput(data.result);}
            }}>
              <div className="bg-orange-500 p-3 rounded-xl hover:cursor-pointer hover:inset-shadow-md hover:bg-orange-600 active:bg-orange-700">
                Eliminate
              </div>
            </button>
            {failed &&
            <div className="text-center justify-self-center">
              <p>Elimination Failed! (Zero pivot encountered)</p>
              <p>Below is the last step before failure</p>
            </div>
            }
            {output && <OutputBox rows={GetMatrixRows(output)} columns={GetMatrixColumns(output)} output={output} matrixName="output" showName={false}/>}

            {/* Displays the steps */}
            {output &&
              <button onClick={()=> {
                setShowSteps(!showSteps);
              }}>
                <div>
                  <p>{showSteps ? "Hide Elimination Steps" : "Show Elimination Steps"}</p>
                </div>
              </button>
            }
            {showSteps &&
              <div className="my-5">
                {refForm && <OutputBox rows ={GetMatrixRows(refForm)} columns={GetMatrixColumns(refForm)} output={refForm} matrixName={"REF Form"} showName={true}/>}
                {normalizedForm && <OutputBox rows ={GetMatrixRows(normalizedForm)} columns={GetMatrixColumns(normalizedForm)} output={normalizedForm} matrixName={"Normalized Form"} showName={true}/>}
                {output && <OutputBox rows ={GetMatrixRows(output)} columns={GetMatrixColumns(output)} output={output} matrixName={"Result"} showName={true}/>}
              </div>
            }
          </div>
        </div>
    )
}