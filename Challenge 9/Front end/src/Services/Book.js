import axios from 'axios';
import { getToken } from '../util/auth';

const ServerUrl = 'http://localhost:3001';

export const fetchBooks = () => axios.get(`${ServerUrl}/books`, { headers: { Authorization: `Bearer ${getToken()}` } });

export const addCredits = token => axios.post('/api/stripe', token);
