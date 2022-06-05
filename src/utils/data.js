import { api } from "../services/api";

export const getWeatherResults = async (city) => {
  const response = await api.get("forecast", {
    params: {
      appid: process.env.REACT_APP_API_KEY,
      units: "metric",
      q: city,
    },
  });

  return response;
};
