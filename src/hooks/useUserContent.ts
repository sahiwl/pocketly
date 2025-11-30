import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getUserContent, deleteContent } from '@/api'
import type { ContentResponseDTO } from '@/types/dtos'

export const CONTENT_QUERY_KEY = ['user-content'] as const

export function useUserContent() {
  return useQuery<ContentResponseDTO[], Error>({
    queryKey: CONTENT_QUERY_KEY,
    queryFn: getUserContent
  })
}

export function useDeleteContent() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (contentId: number) => deleteContent(contentId),
    // When mutation succeeds, invalidate the content query to refetch
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CONTENT_QUERY_KEY })
    },
  })
}
