import React from "react";
import { DataGrid } from "@mui/x-data-grid";

function Preview({ preview }) {
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
    console.log(tableCols);
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
  tableCols = makeTableCols(preview.columns);
  tableRows = makeTableRows(preview.content);

  return (
    <>
      <h2>{preview.columns}</h2>

      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={tableRows}
          columns={tableCols}
          getRowId={(row) => row.StoreID + row.Customer_ID + Math.random()}
          pageSize={6}
          rowsPerPageOptions={[6]}
        />
      </div>
    </>
  );
}
export default Preview;
