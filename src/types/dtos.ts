
export interface UserResponseDTO {
  id: number;
  username: string;
}

export interface UserRequestDTO {
  username: string;
  password: string;
}

export interface AuthResponseDTO {
  token: string;
  username: string;
  email: string;
  message: string;
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
  type: string;     
  link: string;
  userId: number;
  username: string;
  tags: string[];   
}

export interface ContentRequestDTO {
  title: string;
  type: string;
  link: string;
  userId?: number; 
  tagIds?: number[]; 
}

export interface PocketDTO {
  username: string;
  content: ContentResponseDTO[];
}