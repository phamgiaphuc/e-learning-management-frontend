const envConfig = {
  serverUrl:
    import.meta.env.VITE_SERVER_URL ||
    "https://elearning-hcmiu.azurewebsites.net/api/v1",
} as const;

export default envConfig;
