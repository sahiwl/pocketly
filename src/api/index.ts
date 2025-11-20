import axios from "axios";
import type { ContentRequestDTO, ContentResponseDTO, LinkRequestDTO, LinkResponseDTO, TagRequestDTO, TagResponseDTO } from "../types/dtos";


const api = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE || "http://localhost:8080",
  withCredentials: true
})

export const getAllLinks = async () : Promise<LinkResponseDTO[]> =>{
  const resp = await api.get('/api/');
  return resp.data;
}

export const bestatus = async() : Promise<unknown> =>{
  const resp = await api.get("/health");
  return resp.data;
}

export const getUserLink = async(id :number) : Promise<LinkRequestDTO[]> =>{
  const resp = await api.get(`/api/links/${id}`);
  return resp.data;
}

export const createLink = async (payload: Partial<LinkRequestDTO>): Promise<LinkResponseDTO> =>{
  const resp = await api.post('/api/links', payload);
  return resp.data;
}

export const deleteLink = async(id: number): Promise<void> =>{
  const resp = await api.delete(`/api/links/${id}`);
  return resp.data;
}

export const getContents = async (): Promise<ContentResponseDTO[]> => {
  const resp = await api.get<ContentResponseDTO[]>('/api/content')
  return resp.data
}

export const createContent = async (payload: ContentRequestDTO): Promise<ContentResponseDTO> => {
  const resp = await api.post<ContentResponseDTO>('/api/content', payload)
  return resp.data
}

export const createTag = async (payload: TagRequestDTO): Promise<TagResponseDTO> => {
  const resp = await api.post<TagResponseDTO>('/api/tags', payload)
  return resp.data
}

export default api;