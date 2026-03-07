import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// Add a request interceptor to include the JWT token in headers
API.interceptors.request.use((req) => {
    const profile = localStorage.getItem('profile');
    if (profile) {
        const { token } = JSON.parse(profile);
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

// Auth API
export const login = (formData) => API.post('/auth/login', formData);
export const register = (formData) => API.post('/auth/register', formData);

// Transaction API
export const fetchTransactions = (params) => API.get('/transactions', { params });
export const fetchSingleTransaction = (id) => API.get(`/transactions/${id}`);
export const createTransaction = (newTransaction) => API.post('/transactions', newTransaction);
export const updateTransaction = (id, updatedTransaction) => API.put(`/transactions/${id}`, updatedTransaction);
export const deleteTransaction = (id) => API.delete(`/transactions/${id}`);

// Budget API
export const setBudget = (budgetData) => API.post('/budget', budgetData);
export const fetchBudgetSummary = (params) => API.get('/budget/summary', { params });

export default API;
