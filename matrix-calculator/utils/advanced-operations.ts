import { CreateBlockMatrix, CreateIdentity, GetMatrixColumns, GetMatrixRows, Matrix, MultiplyMatrices, SwapRows } from "./elementary-operations";

type GaussElimData = {
    result_matrix: Matrix,
    failed: boolean,
    elimination_steps?: Matrix[],

}

type GaussJordanData = {
    ref_form: Matrix,
    normalized_form?: Matrix,
    result?: Matrix,
    failed: boolean,
}

/**
 * Takes in a matrix and performs Gaussian elimination, resulting in the matrix in Reduced Echelon Form (REF)
 * 
 * @param matrix The matrix which Gaussian elimination will be performed on
 * 
 * @returns A clone of the provided matrix in REF
 */
export function GaussianElimination(matrix: Matrix): GaussElimData {
    let result = matrix.map(row => [...row]); // This is done so React will trigger a re-render because this is technically a new variable.
    let elimination_steps: Matrix[] = [];
    const columns = GetMatrixColumns(result);
    const rows = GetMatrixRows(result);
    
    let noZeroPivots = true;
    for (let pivot = 0; pivot < columns && pivot < rows; pivot++) { // n = current pivot number
        if (result[pivot][pivot] == 0) { // If a zero pivot is encountered
            noZeroPivots = false;
            for (let i = pivot + 1; i < rows; i++) { // Search the rows below the current pivot to find a suitable swap
                if (result[i][pivot] != 0) {
                    result = SwapRows(result, pivot, i); // Swaps the row containing the nth pivot with the ith row
                    noZeroPivots = true;
                    break;
                }
            }
        }
        // If the zero pivot cannot be resolved, elimination fails
        if (noZeroPivots != true) {
            return {
                result_matrix: result,
                failed: true
            };
        }
        // Multiplier = entry to eliminate in row i / pivot in row n
        // Creates an identity matrix with size = # of rows in our matrix (will be used as an elimination matrix)
        let elimination_matrix = CreateIdentity(rows);
        for (let i = pivot + 1; i < rows; i++) { // Gather all multipliers below the pivot to place in elimination matrix
            //In the pivot-th elimination matrix, place the multiplier in the [i, pivot] spot
            elimination_matrix[i][pivot] = -(result[i][pivot] / result[pivot][pivot]);
        }
        console.log(elimination_matrix);
        result = MultiplyMatrices(elimination_matrix, result); // Multiply our current matrix by the elimination matrix
        elimination_steps.push(result.map(row => [...row]));
        console.log(elimination_steps);
    }

    return {result_matrix: result, failed: false, elimination_steps: elimination_steps};
}

export function GaussJordanElimination(matrix: Matrix): GaussJordanData {
    // Step 1, perform Gaussian Elimination
    let ref_form = GaussianElimination(matrix);
    if (ref_form.failed) { // If Gaussian elimination failed, return the matrix up to the point of failure
        return {
            ref_form: ref_form.result_matrix,
            failed: ref_form.failed
        };
    }
    let normalized_form = ref_form.result_matrix.map(row => [...row]);
    const normalRows = GetMatrixRows(normalized_form);
    const normalCols = GetMatrixColumns(normalized_form);
    const numberOfPivots = Math.min(normalRows, normalCols);
    // TODO: Step 2: Normalize the matrix (divide each row by its pivot)
    for (let i = 0; i < numberOfPivots; i++) { // For each pivot [i][i],
        let pivot = normalized_form[i][i];
        for (let j = i; j < normalCols; j++) { // For each element to the right of the pivot [i][j] (including the pivot),
            normalized_form[i][j] = normalized_form[i][j] / pivot; // Divide each cell by the pivot to normalize (1's on the diagonal)
        }
    }
    // Step 3: Backwards elimination
    let result = normalized_form.map(row => [...row]);
    let multiplier = 0;
    // This will be the number of pivots
    // For every row with a pivot, starting at the last pivot working backwards
    for (let i = numberOfPivots-1; i > 0 ; i--) {
        // For every row above the current pivot, iterating upwards
        for (let j = i-1; j >= 0; j--) {
            // Since the pivot is 1 because normalization, the multiplier is just the element above the current pivot in the current row
            multiplier = result[j][i];
            // Starting at the cell above the current pivot on the current row. Any cells to the left will be added with 0
            // (because upper triangular), so they can be skipped
            for (let k = i; k < normalCols; k++) {
                result[j][k] -= (multiplier * result[i][k]);
            }
        }
    }
    return {
        ref_form: ref_form.result_matrix,
        normalized_form: normalized_form,
        result: result,
        failed: ref_form.failed,
    }
}

export function InvertMatrix(matrix: Matrix): Matrix {
    // Step 1: Create a block matrix with the input matrix and an Identity Matrix [M I]
    let block = CreateBlockMatrix(matrix, CreateIdentity(GetMatrixRows(matrix)));

    // Step 2: Perform Gauss-Jordan Elimination on the block matrix
    let eliminated = GaussJordanElimination(block).result;

    // Now, the eliminated matrix should be a block matrix with the identity on the left and the inverted matrix on the right
    // Step 3: Extract inverted matrix
    if (!eliminated) { // Elimination failed
        return matrix;
    }
    let inverted: Matrix = [];
    let size = GetMatrixRows(eliminated); // Because we're dealing with square matrices, the number of columns in the inverted matrix is equal to the number of rows in the block matrix
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            inverted[i][j] = eliminated[i][j + size];
        }
    }
    return inverted;
}

export function LUFactorization() {
    
}