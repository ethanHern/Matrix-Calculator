
export function MultiplyMatrices(A: number[][], B: number[][]): number[][] {
    'use server'
    let c: number[][] = Array(GetMatrixRows(A)).fill(null).map(() => Array(GetMatrixColumns(B)).fill(0));
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
 matrix: number[][];

 Returns:
 number[][];
 **/
export function AddRow(matrix: number[][]) : number[][] {
    return [...matrix, new Array(GetMatrixColumns(matrix)).fill(0)];
}

/**
 Removes the last array inside the 2D array provided,
 effectively removing the last row from a matrix.
 Returns the resulting matrix
 
 Params:
 matrix: number[][];

 Returns:
 number[][];
 **/
export function RemoveRow(matrix: number[][]): number[][] {
    if (GetMatrixRows(matrix) == 1) {return matrix;}
    return matrix.slice(0, -1);
}

/**
 Appends a zero to every array inside the 2D array provided,
 effectively adding a column to a matrix.
 Returns the resulting matrix
 
 Params:
 matrix: number[][];

 Returns:
 number[][];
 **/
export function AddColumn(matrix: number[][]): number[][] {
    let temp: number[][] = [];
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
 matrix: number[][];

 Returns:
 number[][];
 **/
export function RemoveColumn(matrix: number[][]): number[][] {
    if (GetMatrixColumns(matrix) == 1) {return matrix;}
    let temp: number[][] = []
    for (let i = 0; i < GetMatrixRows(matrix); i++) {
        temp[i] = matrix[i].slice(0, -1);
    }
    return temp;
}

export function GetMatrixRows(matrix: number[][]): number {
    return (matrix.length);
}

export function GetMatrixColumns(matrix: number[][]): number {
    return (matrix[0].length);
}