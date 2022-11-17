import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

import Preview from "./Preview";
import Process from "./Process";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

function App() {
  const [inputFilePath, setInputFilePath] = useState("");
  const [preview, setPreview] = useState({});
  const [processedView, setProcessedView] = useState({});
  const [buttonStatus, setButtonStatus] = useState("");

  const sendGetPreviewRequest = async () => {
    try {
      const resp = await axios.get("http://localhost:5000/preview");
      console.log(resp.data);
      setPreview(resp.data);
    } catch (err) {
      // Handle Error Here
      console.error(err);
    }
  };

  const sendProcessRequest = async () => {
    try {
      const resp = await axios.get("http://localhost:5000/process");
      console.log(resp.data);
      setProcessedView(resp.data);
    } catch (err) {
      // Handle Error Here
      console.error(err);
    }
  };

  const handlePreviewClick = (event) => {
    event.preventDefault();
    console.log("preview clicked");
    sendGetPreviewRequest();
    setButtonStatus("preview");
  };

  const handleProcessClick = (event) => {
    event.preventDefault();
    console.log("process clicked");
    sendProcessRequest();
    setButtonStatus("process");
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
          <Button variant="contained" color="success">
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
        </div>
      </header>
    </div>
  );
}

export default App;
