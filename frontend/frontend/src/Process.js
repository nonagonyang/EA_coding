import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

function Process({ processedView }) {
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
  tableCols = makeTableCols(processedView.columns);
  tableRows = makeTableRows(processedView.content);

  return (
    <>
      <h2>{processedView.columns}</h2>
      {tableRows.length != 0 ? (
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={tableRows}
            columns={tableCols}
            getRowId={(row) => row.StoreID + row.Customer_ID + Math.random()}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
        </div>
      ) : (
        <h2>loading...</h2>
      )}
    </>
  );
}
export default Process;
