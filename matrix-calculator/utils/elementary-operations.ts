export type Matrix = number[][];

export function GetMatrixRows(matrix: Matrix): number {
    return (matrix.length);
}

export function GetMatrixColumns(matrix: Matrix): number {
    return (matrix[0].length);
}

/*
Returns a matrix where row with index rowA is swapped with the row with index rowB
*/
export function SwapRows(matrix: Matrix, rowA: number, rowB: number): Matrix {
    let temp = matrix.slice(0); // This is done so that a React triggers a re-render, since technically it is a new value and not a modification of the original value
    temp[rowA] = matrix[rowB];
    temp[rowB] = matrix[rowA];
    return temp;
}

/*
Creates and returns an identity matrix with specified dimensions (a square matrix)
*/
export function CreateIdentity(length: number): Matrix {
    let I = Array(length).fill(null).map(()=> Array(length).fill(0)); // Creates a matrix of zeroes
    for (let index = 0; index < length; index++) {
        I[index][index] = 1;
    }

    return I;
}

export function CreateBlockMatrix(A: Matrix, B: Matrix): Matrix {
    let temp: Matrix = [];
    for (let i = 0; i < GetMatrixRows(A); i++) {
        temp[i] = [...A[i], ...B[i]];
    }
    return temp;
}

export function MultiplyMatrices(A: Matrix, B: Matrix): Matrix {
    'use server'
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



/**
 Adds an array to the 2D array provided,
 effectively adding a row to a matrix.
 Returns the resulting matrix
 
 Params:
 matrix: Matrix;

 Returns:
 Matrix;
 **/
export function AddRow(matrix: Matrix) : Matrix {
    return [...matrix, new Array(GetMatrixColumns(matrix)).fill(0)];
}

/**
 Removes the last array inside the 2D array provided,
 effectively removing the last row from a matrix.
 Returns the resulting matrix
 
 Params:
 matrix: Matrix;

 Returns:
 Matrix;
 **/
export function RemoveRow(matrix: Matrix): Matrix {
    if (GetMatrixRows(matrix) == 1) {return matrix;}
    return matrix.slice(0, -1);
}

/**
 Appends a zero to every array inside the 2D array provided,
 effectively adding a column to a matrix.
 Returns the resulting matrix
 
 Params:
 matrix: Matrix;

 Returns:
 Matrix;
 **/
export function AddColumn(matrix: Matrix): Matrix {
    let temp: Matrix = [];
    for (let i = 0; i < GetMatrixRows(matrix); i++) {
        temp[i] = [...matrix[i], 0];
    }
    return temp;
}

/**
 Removes the last element from every array inside the 2D array provided,
 effectively removing the last column from a matrix.
 Returns the resulting matrix
 
 Params:
 matrix: Matrix;

 Returns:
 Matrix;
 **/
export function RemoveColumn(matrix: Matrix): Matrix {
    if (GetMatrixColumns(matrix) == 1) {return matrix;}
    let temp: Matrix = []
    for (let i = 0; i < GetMatrixRows(matrix); i++) {
        temp[i] = matrix[i].slice(0, -1);
    }
    return temp;
}