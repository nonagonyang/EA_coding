import axios from "axios";

class CSVReaderApi {
  static async sendGetPreviewRequest() {
    try {
      const resp = await axios.get("http://localhost:5000/preview");
      //   console.log(resp.data);
      return resp.data;
    } catch (err) {
      // Handle Error Here
      console.error(err);
    }
  }
  static async sendProcessRequest() {
    try {
      const resp = await axios.get("http://localhost:5000/process");
      //   console.log(resp.data);
      return resp.data;
    } catch (err) {
      // Handle Error Here
      console.error(err);
    }
  }
}

export default CSVReaderApi;
