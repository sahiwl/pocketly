import axios from "axios";
import type {
  AuthResponseDTO,
  ContentRequestDTO,
  ContentResponseDTO,
  LinkRequestDTO,
  LinkResponseDTO,
  LoginRequestDTO,
  PocketDTO,
  SharePocketResponse,
  ShareStatusResponse,
  SignupRequestDTO,
  TagRequestDTO,
  TagResponseDTO,
  UserResponseDTO,
} from "../types/dtos";

export const api = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE || "http://localhost:8080",
  withCredentials: true,
});

export const loginApi = async (
  payload: LoginRequestDTO,
): Promise<AuthResponseDTO> => {
  const r = await api.post<AuthResponseDTO>("/api/auth/signin", payload);
  return r.data;
};

export const signupApi = async (
  payload: SignupRequestDTO,
): Promise<AuthResponseDTO> => {
  const r = await api.post<AuthResponseDTO>("/api/auth/signup", payload);
  return r.data;
};

export const logoutApi = async (): Promise<void> => {
  await api.post("/api/auth/logout");
};

export const currUser = async (): Promise<UserResponseDTO> => {
  const r = await api.get<UserResponseDTO>("/api/auth/me");
  return r.data;
};

export const getAllLinks = async (): Promise<LinkResponseDTO[]> => {
  const resp = await api.get("/api/");
  return resp.data;
};

export const bestatus = async (): Promise<unknown> => {
  const resp = await api.get("/health");
  return resp.data;
};

export const getUserPocket = async (id: number): Promise<LinkRequestDTO[]> => {
  const resp = await api.get(`/api/pocket/${id}`);
  return resp.data;
};

export const getSharedPocket = async (hash: string): Promise<PocketDTO> => {
  const resp = await api.get<PocketDTO>(`/api/pocket/${hash}`);
  return resp.data;
};

export const getShareStatus = async (): Promise<ShareStatusResponse> => {
  const resp = await api.get<ShareStatusResponse>("/api/pocket/share/status");
  return resp.data;
};

// share=true enables sharing, share=false disables it
export const sharePocket = async (
  share: boolean,
): Promise<SharePocketResponse> => {
  const resp = await api.post<SharePocketResponse>(
    `/api/pocket/share?share=${share}`,
  );
  return resp.data;
};

export const getUserContent = async (): Promise<ContentResponseDTO[]> => {
  const resp = await api.get<ContentResponseDTO[]>("/api/content");
  return resp.data;
};

export const createContent = async (
  payload: ContentRequestDTO,
): Promise<ContentResponseDTO> => {
  const resp = await api.post<ContentResponseDTO>("/api/content", payload);
  return resp.data;
};

export const updateContent = async (
  contentId: number,
  payload: ContentRequestDTO,
): Promise<ContentResponseDTO> => {
  const resp = await api.put<ContentResponseDTO>(
    `/api/content/${contentId}`,
    payload,
  );
  return resp.data;
};

export const deleteContent = async (
  contentId: number,
): Promise<{ message: string }> => {
  const resp = await api.delete<{ message: string }>(
    `/api/content/${contentId}`,
  );
  return resp.data;
};

interface CreateTagResponse {
  message: string;
  data: TagResponseDTO;
}

export const createTag = async (
  payload: TagRequestDTO,
): Promise<TagResponseDTO> => {
  const resp = await api.post<CreateTagResponse>("/api/tags", payload);
  return resp.data.data;
};

export const deleteTag = async (
  tagId: number,
): Promise<{ message: string }> => {
  const resp = await api.delete<{ message: string }>(`/api/tags/${tagId}`);
  return resp.data;
};

export const getAllTags = async (): Promise<TagResponseDTO[]> => {
  const resp = await api.get<TagResponseDTO[]>(`/api/tags`);
  return resp.data;
};

export default api;
