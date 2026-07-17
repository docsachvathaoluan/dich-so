// ───────────────────────────────────────────────────────────────────────────
// Lạc Thư — ma phương bậc 3. Quy ước lưới: hàng 0 = TRÊN (Nam), hàng 2 = DƯỚI (Bắc);
// cột 0 = TRÁI (Đông), cột 2 = PHẢI (Tây).
//   4 9 2
//   3 5 7
//   8 1 6
// Mọi hàng / cột / 2 đường chéo đều cộng = 15. Tổng tất cả số = 45.
// ───────────────────────────────────────────────────────────────────────────

export const LUOSHU_GRID: number[][] = [
  [4, 9, 2],
  [3, 5, 7],
  [8, 1, 6],
];

export const MAGIC_CONSTANT = 15;

export interface MagicLine {
  kind: 'row' | 'col' | 'diag';
  /** Toạ độ [hàng, cột] của 3 ô. */
  cells: [number, number][];
  sum: number;
}

/** Liệt kê 8 đường (3 hàng + 3 cột + 2 chéo) của lưới 3×3. */
export function magicLines(grid: number[][] = LUOSHU_GRID): MagicLine[] {
  const lines: MagicLine[] = [];

  for (let r = 0; r < 3; r++) {
    const cells: [number, number][] = [
      [r, 0],
      [r, 1],
      [r, 2],
    ];
    lines.push({ kind: 'row', cells, sum: sumCells(grid, cells) });
  }
  for (let c = 0; c < 3; c++) {
    const cells: [number, number][] = [
      [0, c],
      [1, c],
      [2, c],
    ];
    lines.push({ kind: 'col', cells, sum: sumCells(grid, cells) });
  }
  const diagA: [number, number][] = [
    [0, 0],
    [1, 1],
    [2, 2],
  ];
  const diagB: [number, number][] = [
    [0, 2],
    [1, 1],
    [2, 0],
  ];
  lines.push({ kind: 'diag', cells: diagA, sum: sumCells(grid, diagA) });
  lines.push({ kind: 'diag', cells: diagB, sum: sumCells(grid, diagB) });

  return lines;
}

function sumCells(grid: number[][], cells: [number, number][]): number {
  return cells.reduce((acc, [r, c]) => acc + grid[r][c], 0);
}

/** Lưới có phải ma phương (mọi đường = 15)? */
export function isMagic(grid: number[][] = LUOSHU_GRID): boolean {
  return magicLines(grid).every((l) => l.sum === MAGIC_CONSTANT);
}

/** Tổng tất cả số trong lưới. */
export function gridTotal(grid: number[][] = LUOSHU_GRID): number {
  return grid.flat().reduce((a, b) => a + b, 0);
}
