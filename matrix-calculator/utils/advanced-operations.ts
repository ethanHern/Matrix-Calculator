import { Matrix } from "./elementary-operations";

/**
 * Takes in a matrix and performs Gaussian elimination, resulting in the matrix in Reduced Echelon Form (REF)
 * 
 * @param matrix The matrix which Gaussian elimination will be performed on
 * 
 * @returns The provided matrix in REF
 */
export function GaussianElimination(matrix: Matrix): Matrix {
    let temp = matrix.map(r => [...r]);
    let pivot: number = 0;

    return temp;
}