import axios from 'axios';
import AuthService from './authService';
import { isStringSnakeCase } from '../utils';

const API_URL = 'http://localhost:3000';

const apiClient = axios.create({
    baseURL: API_URL
});

const authService = new AuthService();

apiClient.interceptors.request.use(async (config) => {
    const token = await authService.getToken();
    config.url = '/configurations' + config.url;
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export default {
    async fetchConfigurations() {
        try {
            const response = await apiClient.get('/');
            return { success: true, data: response.data.data }
        } catch (error) {
            console.error("An error occurred:", error);
            return {
                success: false, message: 'An error occurred while fetching configurations!'
            };
        }
    },
    async editConfig(config) {
        try {
            const response = await apiClient.put('/' + config.parameterKey, config);
            return { success: true, data: response.data.data }
        } catch (error) {
            console.error("An error occurred:", error);
            return {
                success: false, message: 'An error occurred while editing configuration!'
            };
        }
    },
    async deleteConfig(config) {
        try {
            const response = await apiClient.delete('/' + config.parameterKey);
            return { success: true, data: response.data.data }
        } catch (error) {
            console.error("An error occurred:", error);
            return {
                success: false, message: 'An error occurred while deleting configuration!'
            };
        }
    },
    async fetchJson() {
        try {
            const response = await apiClient.get('/json');
            return { success: true, data: response.data.data }
        } catch (error) {
            console.error("An error occurred:", error);
            return {
                success: false, message: 'An error occurred while fetching JSON preview!'
            };
        }
    },
    async addConfig(newConfig) {
        if (!newConfig.parameterKey || !newConfig.value || !newConfig.type || !newConfig.description) {
            return {
                success: false, message: 'Please fill all fields!'
            };
        }

        if (!isStringSnakeCase(newConfig.parameterKey)) {
            return {
                success: false, message: 'Parameter key must be in snake_case!'
            };
        }

        try {
            const response = await apiClient.post('/', newConfig);
            return { success: true, data: response.data.data }
        } catch (error) {
            console.error("An error occurred:", error);
            return {
                success: false, message: 'An error occurred while adding configuration!'
            };
        }
    },
};
