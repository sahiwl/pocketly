export interface SignupRequestDTO {
  username: string;
  email: string;
  password: string;
}

export interface LoginRequestDTO {
  usernameOrEmail: string;
  password: string;
}

export interface AuthResponseDTO {
  token: string;
  username: string;
  password: string;
  message: string; //success/fail msg
}

//getallusers
export interface UserResponseDTO {
  id: number;
  username: string;
}

export interface TagResponseDTO {
  id: number;
  title: string;
}

export interface TagRequestDTO {
  title: string;
}

export interface LinkResponseDTO {
  id: number;
  hash: string;
  userId: number;
}

export interface LinkRequestDTO {
  userId?: number;
  originalURL: string;
}

export interface ContentResponseDTO {
  id: number;
  title: string;
  type: ContentType;
  link: string;
  userId: number;
  description: string;
  username: string;
  tags: string[];
}

export interface ContentRequestDTO {
  title: string;
  type: ContentType;
  description: string;
  link: string;
  userId?: number;
  tagIds?: number[];
}

export interface PocketDTO {
  username: string;
  content: ContentResponseDTO[];
}

export type ContentType =
  | "youtube"
  | "linkedin"
  | "tweet"
  | "pinterest"
  | "facebook"
  | "instagram"
  | "other";

export interface ApiErrorResponse {
  message: string;
  details?: string;
  [key: string]: string | undefined;
}

export interface SharePocketResponse {
  hash?: string;
  message?: string; // "Sharing disabled" if share=false
}

export interface ShareStatusResponse {
  isSharing: boolean;
  hash?: string;
}
