import envConfig from "@/configs/env.config";
import axios from "axios";

axios.defaults.baseURL = envConfig.serverUrl;
axios.defaults.withCredentials = true;
