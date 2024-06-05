import axios, { AxiosResponse } from 'axios';
import { CharacterResponse } from '../types/types';

const apiClient = axios.create({
   baseURL: 'https://rickandmortyapi.com/api',
   headers: {
      'Content-Type': 'application/json'
   }
});

export const getCharacters = (page: number, name: string, status: string): Promise<AxiosResponse<CharacterResponse>> => {
   try {
      const response = apiClient.get<CharacterResponse>('/character', { params: { page, name, status } });
      return response;
   } catch (error) {
      console.error('Error fetching characters:', error);
      throw error;
   }
};
