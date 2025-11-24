import axios from "axios";
import type { AuthResponseDTO, ContentRequestDTO, ContentResponseDTO, LinkRequestDTO, LinkResponseDTO, LoginRequestDTO, SignupRequestDTO, TagRequestDTO, TagResponseDTO, UserResponseDTO } from "../types/dtos";


export const api = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE || "http://localhost:8080",
  withCredentials: true
})

export const loginApi = async (payload: LoginRequestDTO): Promise<AuthResponseDTO> =>{
  const r = await api.post<AuthResponseDTO>('/api/auth/signin', payload);
  return r.data;
}

export const signupApi = async (payload: SignupRequestDTO): Promise<AuthResponseDTO> =>{
  const r = await api.post<AuthResponseDTO>('/api/auth/signup', payload);
  return r.data;
}

export const logoutApi = async (): Promise<void> =>{
  await api.post('/api/auth/logout');
}

export const currUser = async () : Promise<UserResponseDTO> =>{
  const r = await api.get<UserResponseDTO>("/api/auth/me");
  return r.data;
}

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