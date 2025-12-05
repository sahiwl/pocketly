import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getUserContent,
  deleteContent,
  createContent,
  updateContent,
  sharePocket,
} from "@/api";
import type { ContentRequestDTO, ContentResponseDTO } from "@/types/dtos";

export const CONTENT_QUERY_KEY = ["user-content"] as const;

export function useUserContent() {
  return useQuery<ContentResponseDTO[], Error>({
    queryKey: CONTENT_QUERY_KEY,
    queryFn: getUserContent,
  });
}

export function useDeleteContent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (contentId: number) => deleteContent(contentId),
    // When mutation succeeds, invalidate the content query to refetch
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CONTENT_QUERY_KEY });
    },
  });
}

export function useCreateContent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: ContentRequestDTO) => createContent(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CONTENT_QUERY_KEY });
    },
  });
}

export function useUpdateContent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      contentId,
      payload,
    }: {
      contentId: number;
      payload: ContentRequestDTO;
    }) => updateContent(contentId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CONTENT_QUERY_KEY });
    },
  });
}


export function useSharePocket() {
  return useMutation({
    mutationFn: (share: boolean) => sharePocket(share),
  });
}
