import axios from "axios";

const api = axios.create({
	baseURL: "http://localhost:7777",
	withCredentials: true, //  REQUIRED for cookies
});

export default api;
