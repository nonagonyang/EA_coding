import axios from "axios";

class CSVReaderApi {
  static async sendGetPreviewRequest(csvPath) {
    try {
      const resp = await axios.get(
        `http://localhost:5000/preview?csvfile=${csvPath}`
      );

      return resp.data;
    } catch (err) {
      // Handle Error Here
      return [];
    }
  }
  static async sendProcessRequest(csvPath) {
    try {
      const resp = await axios.get(
        `http://localhost:5000/process?csvfile=${csvPath}`
      );
      return resp.data;
    } catch (err) {
      // Handle Error Here
      return [];
    }
  }
}

export default CSVReaderApi;
