import axios from "axios";

const key = "7721788-660fd53d094c8528303355157";

const apiUrl = `https://pixabay.com/api/?key=${key}`;

const formatUrl = (params) => {
	let url = `${apiUrl}&per_page=25&safesearch=true&editors_choice=true`;
	if (!params) return url;
	const paramsKeys = Object.keys(params);
	paramsKeys.map((key) => {
		const value = key === "q" ? encodeURIComponent(params[key]) : params[key];
		url += `${key}=${value}`;
	});

	console.log("final url: ", url);
	return url;
};

export const apiCall = async (params) => {
	try {
		const response = await axios.get(formatUrl(params));
		const { data } = response;
		return { success: true, data };
	} catch (err) {
		console.log("got error: ", err.message);
		return { success: false, msg: err.message };
	}
};
