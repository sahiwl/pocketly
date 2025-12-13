import { createTag, deleteTag, getAllTags } from "@/api";
import type { TagResponseDTO, TagRequestDTO } from "@/types/dtos";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const TAGS_QUERY_KEY = ["tags"] as const;

export function useTags() {
  return useQuery<TagResponseDTO[], Error>({
    queryKey: TAGS_QUERY_KEY,
    queryFn: getAllTags,
  });
}

export function useCreateTag() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: TagRequestDTO) => createTag(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TAGS_QUERY_KEY });
    },
  });
}

export function useDeleteTag() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (tagId: number) => deleteTag(tagId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TAGS_QUERY_KEY });
    },
  });
}
