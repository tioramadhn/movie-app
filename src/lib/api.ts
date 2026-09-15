import axios, { type AxiosInstance } from "axios";
import { API_BASE_URL } from "@/config/movie";

export const apiManager: AxiosInstance = axios.create({
	baseURL: API_BASE_URL,
	timeout: 15000,
	headers: {
		Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY_TMDB}`,
	},
});
