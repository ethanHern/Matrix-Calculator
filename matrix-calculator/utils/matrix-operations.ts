export function AddRow(matrix: number[][]) : number[][] {
    matrix.push(new Array(matrix[0].length).fill(0));
    return matrix;
}

export function RemoveRow(matrix: number[][]): number[][] {
    matrix.pop();
    return matrix;
}

export function AddColumn(matrix: number[][]): number[][] {
    for (let i = 0; i < matrix.length; i++) {
        matrix[i].push(0);
    }
    return matrix;
}

export function RemoveColumn(matrix: number[][]): number[][] {
    for (let i = 0; i < matrix.length; i++) {
        matrix[i].pop();
    }
    return matrix;
}