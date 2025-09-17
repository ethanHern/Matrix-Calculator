/*A custom type that represents a 2D array*/
export type Matrix = number[][];

/**
Takes a Matrix-type variable and returns the number of rows it contains
@param matrix The matrix whose rows will be counted
@returns The number of rows the matrix contains
 **/
export function GetMatrixRows(matrix: Matrix): number {
    return (matrix.length);
}

/**
 * Takes a Matrix-type variable and returns the number of columns it contains
 * @param matrix The matrix whose columns will be counted
 * @returns The number of columns the matrix contains
 **/
export function GetMatrixColumns(matrix: Matrix): number {
    return (matrix[0].length);
}

/**
 * Returns a matrix where row with index rowA is swapped with the row with index rowB
 * @param matrix The matrix whose rows will be swapped
 * @param rowA One of the rows that will be swapped
 * @param rowB The other row that will be swapped
 * 
 * @returns A clone of the provided matrix, now with swapped rows
**/
export function SwapRows(matrix: Matrix, rowA: number, rowB: number): Matrix {
    let temp = matrix.slice(0); // This is done so that a React triggers a re-render, since technically it is a new value and not a modification of the original value
    temp[rowA] = matrix[rowB];
    temp[rowB] = matrix[rowA];
    return temp;
}

/**
 * Creates and returns an identity matrix with specified dimensions (a square matrix)
 * @param length The size of the resulting identity matrix (will be used to determine the number of rows and columns)
 * 
 * @returns A square matrix of the specified size with ones on the diagonal
**/
export function CreateIdentity(length: number): Matrix {
    let I = Array(length).fill(null).map(()=> Array(length).fill(0)); // Creates a matrix of zeroes
    for (let index = 0; index < length; index++) {
        I[index][index] = 1; // Places a 1 at every position [i][i]
    }

    return I;
}

/**
 * Takes in two matrices and returns a block matrix created by placing the two matrices side-by-side
 * @param A The matrix that will be placed on the left of the block matrix
 * @param B The matrix that will be placed on the right of the block matrix
 * @returns A block matrix [A B]
 */
export function CreateBlockMatrix(A: Matrix, B: Matrix): Matrix {
    let temp: Matrix = [];
    for (let i = 0; i < GetMatrixRows(A); i++) {
        temp[i] = [...A[i], ...B[i]];
    }
    return temp;
}

/**
 * Takes in two matrices and performs standard matrix multiplication.
 * The number of columns in A must match the number of rows in B.
 * Returns the resulting matrix
 * @param A The matrix on the left of the multiplication
 * @param B The matrix on the right of the multiplication
 * @returns The resulting matrix with the same number of columns as B has, and the same number of rows as A has.
 */
export function MultiplyMatrices(A: Matrix, B: Matrix): Matrix {
    let c: Matrix = Array(GetMatrixRows(A)).fill(null).map(() => Array(GetMatrixColumns(B)).fill(0));
    for (let i = 0; i < GetMatrixRows(A); i++) {
        for (let j = 0; j < GetMatrixColumns(B); j++) {
            let temp = 0;
            for (let k = 0; k < GetMatrixColumns(A); k++) {
                temp+= A[i][k] * B[k][j];
            }
            c[i][j] = temp;
        }
    }
    return c;
}

export function AddMatrices(A: Matrix, B: Matrix): Matrix {
    const rows = GetMatrixRows(A);
    const cols = GetMatrixColumns(A);
    let c: Matrix = Array(rows).fill(null).map(()=> Array(cols).fill(0));
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            c[i][j] = A[i][j] + B[i][j];
        }
    }
    return c;
}

export function SubtractMatrices(A: Matrix, B: Matrix): Matrix {
    const rows = GetMatrixRows(A);
    const cols = GetMatrixColumns(A);
    let c: Matrix = Array(rows).fill(null).map(()=> Array(cols).fill(0));
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            c[i][j] = A[i][j] - B[i][j];
        }
    }
    return c;
}

/**
 * Adds an array to the 2D array provided,
 * effectively adding a row to a matrix.
 * Returns the resulting matrix
 * @param matrix The matrix to which a row will be added
 * 
 * @returns A clone of the provided matrix with an added row
 **/
export function AddRow(matrix: Matrix) : Matrix {
    return [...matrix, new Array(GetMatrixColumns(matrix)).fill(0)];
}

/**
 * Removes the last array inside the 2D array provided,
 * effectively removing the last row from a matrix.
 * Returns the resulting matrix
 * 
 * @param matrix The matrix from which a row will be removed
 * 
 * @returns A clone of the provided matrix with a row removed
 **/
export function RemoveRow(matrix: Matrix): Matrix {
    if (GetMatrixRows(matrix) == 1) {return matrix;}
    return matrix.slice(0, -1);
}

/**
 * Appends a zero to every array inside the 2D array provided,
 * effectively adding a column to a matrix.
 * Returns the resulting matrix
 * 
 * @param matrix The matrix to which a column will be added
 * 
 * @returns A clone of the provided matrix with an added column 
 **/
export function AddColumn(matrix: Matrix): Matrix {
    let temp: Matrix = [];
    for (let i = 0; i < GetMatrixRows(matrix); i++) {
        temp[i] = [...matrix[i], 0]; // Adds an element to the end of every row
    }
    return temp;
}

/**
 * Removes the last element from every array inside the 2D array provided,
 * effectively removing the last column from a matrix.
 * Returns the resulting matrix
 * 
 * @param matrix The matrix from which a column will be removed
 * 
 * @returns A clone of the provided matrix with a column removed
 **/
export function RemoveColumn(matrix: Matrix): Matrix {
    if (GetMatrixColumns(matrix) == 1) {return matrix;}
    let temp: Matrix = []
    for (let i = 0; i < GetMatrixRows(matrix); i++) {
        temp[i] = matrix[i].slice(0, -1);
    }
    return temp;
}