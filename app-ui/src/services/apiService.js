import axios from "axios";

const API_URL = 'http://localhost:3000/configurations';

export const fetchConfigurations = async (token) => {
    const headers = {
        'Authorization': `Bearer ${token}`
    };
    return await axios.get(API_URL, { headers });
}

export const updateConfig = async (config, token) => {
    const headers = {
        'Authorization': `Bearer ${token}`
    };
    return await axios.put(`${API_URL}/${config.parameterKey}`, config, { headers });
}

export const deleteConfig = async (config, token) => {
    const headers = {
        'Authorization': `Bearer ${token}`
    };
    return await axios.delete(`${API_URL}/${config.parameterKey}`, { headers });
}