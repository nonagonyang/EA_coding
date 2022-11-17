import "./App.css";
import React, { useEffect, useState } from "react";

import CSVReaderApi from "./api";
import Preview from "./Preview";
import Process from "./Process";
import PieChart from "./PieChart";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

function App() {
  const [inputFilePath, setInputFilePath] = useState("");
  const [preview, setPreview] = useState({});
  const [processedView, setProcessedView] = useState({});
  const [buttonStatus, setButtonStatus] = useState("");

  const handlePreviewClick = async (event) => {
    event.preventDefault();
    setButtonStatus("preview");
    let data = await CSVReaderApi.sendGetPreviewRequest(inputFilePath);
    setPreview(data);
  };

  const handleProcessClick = async (event) => {
    event.preventDefault();
    setButtonStatus("process");
    let data = await CSVReaderApi.sendProcessRequest(inputFilePath);
    setProcessedView(data);
  };

  const handleInsightClick = async (event) => {
    event.preventDefault();
    setButtonStatus("insight");
  };

  const handleInputChange = (event) => {
    setInputFilePath(event.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>CSV Reader</h2>
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
          }}
        >
          <TextField
            id="outlined-basic"
            label="Type CSV File Path"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={handleInputChange}
          />
        </Box>
        <Stack spacing={4} direction="row">
          <Button
            variant="contained"
            color="success"
            onClick={handlePreviewClick}
          >
            Preview
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={handleProcessClick}
          >
            Process
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={handleInsightClick}
          >
            Insights
          </Button>
        </Stack>
        <div>
          {buttonStatus === "preview" ? <Preview preview={preview} /> : ""}
          {buttonStatus === "process" ? (
            <Process processedView={processedView} />
          ) : (
            ""
          )}
          {buttonStatus === "insight" ? (
            <Box
              sx={{
                width: 500,
                maxWidth: "100%",
              }}
            >
              <PieChart />
            </Box>
          ) : (
            ""
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
