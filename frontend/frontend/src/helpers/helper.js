let tableCols = [];
let tableRows = [];

const makeTableCols = (columns) => {
  for (let headerName in columns) {
    tableCols.push({
      field: columns[headerName],
      headerName: columns[headerName],
      width: 200,
    });
  }
  return tableCols;
};
const makeTableRows = (rows) => {
  for (let rowIdx in rows) {
    let tableRow = {};
    for (let i = 0; i < rows[rowIdx].length; i++) {
      tableRow[tableCols[i].field] = rows[rowIdx][i];
    }
    tableRows.push(tableRow);
  }
  return tableRows;
};
