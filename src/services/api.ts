import axios from "axios";
 
const api = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [(data, headers) => {
        console.log('Transformando dados:', { data, headers });
        if (headers['Content-Type'] === 'application/x-www-form-urlencoded' && data) {
            if (data.username && data.password) {
                const params = new URLSearchParams();
                params.append('username', data.username);
                params.append('password', data.password);
                const transformedData = params.toString();
                console.log('Dados de login transformados:', {
                    original: { username: data.username, password: '***' },
                    transformed: transformedData,
                    contentType: headers['Content-Type']
                });
                return transformedData;
            }
            const params = new URLSearchParams();
            for (const key in data) {
                params.append(key, data[key]);
            }
            const transformedData = params.toString();
            console.log('Dados transformados:', {
                original: data,
                transformed: transformedData,
                contentType: headers['Content-Type']
            });
            return transformedData;
        }
        console.log('Dados não transformados:', data);
        return data;
    }]
});
 
// Interceptor para adicionar o token de autenticação
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
 
// Interceptor para tratamento de respostas
api.interceptors.response.use(
    (response) => {
        console.log('Resposta da API:', {
            url: response.config.url,
            method: response.config.method,
            status: response.status,
            statusText: response.statusText,
            headers: response.headers,
            data: response.data
        });
        return response;
    },
    (error) => {
        console.error('Erro na requisição:', {
            url: error.config?.url,
            method: error.config?.method,
            status: error.response?.status,
            statusText: error.response?.statusText,
            data: error.response?.data,
            headers: error.response?.headers,
            config: error.config
        });

        if (error.response?.status === 401) {
            console.log('Erro 401 detectado, limpando token e redirecionando para login');
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);
 
export default api;
 