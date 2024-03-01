import axios from 'axios';
import { User } from '../model';

export async function getData(url: string): Promise<User[]> {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error retrieving data:', error);
        throw error;
    }
}
