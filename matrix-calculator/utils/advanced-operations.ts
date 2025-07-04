import { CreateIdentity, GetMatrixColumns, GetMatrixRows, Matrix, MultiplyMatrices, SwapRows } from "./elementary-operations";

/**
 * Takes in a matrix and performs Gaussian elimination, resulting in the matrix in Reduced Echelon Form (REF)
 * 
 * @param matrix The matrix which Gaussian elimination will be performed on
 * 
 * @returns A clone of the provided matrix in REF
 */
export function GaussianElimination(matrix: Matrix): Matrix {
    let temp = matrix.slice(0); // This is done so React will trigger a re-render because this is technically a new variable.
    let elimination_matrices: Matrix[] = [];
    let noZeroPivots = true;
    for (let n = 0; n < GetMatrixColumns(temp) && n < GetMatrixRows(temp); n++) { // n = current pivot number
        if (temp[n][n] == 0) { // If a zero pivot is encountered
            noZeroPivots = false;
            for (let i = n + 1; i < GetMatrixRows(temp); i++) { // Search the rows below the current pivot to find a suitable swap
                if (temp[i][n] != 0) {
                    temp = SwapRows(temp, n, i); // Swaps the row containing the nth pivot with the ith row
                    noZeroPivots = true;
                    break;
                }
            }
        }
        // If the zero pivot cannot be resolved, elimination fails
        if (noZeroPivots != true) {
            return temp;
        }
        // Multiplier = entry to eliminate in row i / pivot in row n
        // Creates an identity matrix with size = # of rows in our matrix (will be used as an elimination matrix)
        elimination_matrices.push(CreateIdentity(GetMatrixRows(temp)));
        for (let i = n + 1; i < GetMatrixRows(temp); i++) { // Gather all multipliers below the pivot to place in elimination matrix
            //In the nth elimination matrix, place the multiplier in the [i, n] spot
            elimination_matrices[n][i][n] = -(temp[i][n] / temp[n][n]);
        }
        temp = MultiplyMatrices(elimination_matrices[n], temp); // Multiply our current matrix by the elimination matrix
    }

    return temp;
}