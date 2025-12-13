import { useParams } from "react-router";
import { useUserContent, useDeleteContent } from "@/hooks/useUserContent";
import { Skeleton } from "@/components/ui/skeleton";
import { SidebarTrigger } from "@/components/ui/sidebar";
import ContentCard from "@/components/ContentCard";
import { ContentModal } from "@/components/ContentModal";
import { ContentViewModal } from "@/components/ContentViewModal";
import { useState } from "react";
import type { ContentResponseDTO } from "@/types/dtos";
import { Hash } from "lucide-react";

export default function TagPage() {
  const { tagName } = useParams<{ tagName: string }>();
  const {
    data: allContents,
    isLoading,
    isError,
    error,
    refetch,
  } = useUserContent();

  const [contentModalOpen, setContentModalOpen] = useState(false);
  const [editingContent, setEditingContent] =
    useState<ContentResponseDTO | null>(null);
  const [viewingContent, setViewingContent] =
    useState<ContentResponseDTO | null>(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);

  const deleteContentMutation = useDeleteContent();

  // Filter content by tag
  const contents = allContents?.filter((content) =>
    content.tags?.some(
      (tag) =>
        tag.toLowerCase() === decodeURIComponent(tagName || "").toLowerCase(),
    ),
  );

  const handleDelete = (contentId: number) => {
    deleteContentMutation.mutate(contentId);
  };

  const handleEdit = (content: ContentResponseDTO) => {
    setEditingContent(content);
    setContentModalOpen(true);
  };

  const handleView = (content: ContentResponseDTO) => {
    setViewingContent(content);
    setViewModalOpen(true);
  };

  const handleContentModalClose = (open: boolean) => {
    if (!open) setEditingContent(null);
    setContentModalOpen(open);
  };

  const handleViewModalClose = (open: boolean) => {
    if (!open) setViewingContent(null);
    setViewModalOpen(open);
  };

  const decodedTagName = decodeURIComponent(tagName || "");

  const renderModals = () => (
    <>
      <ContentModal
        open={contentModalOpen}
        onOpenChange={handleContentModalClose}
        content={editingContent}
      />
      <ContentViewModal
        open={viewModalOpen}
        onOpenChange={handleViewModalClose}
        content={viewingContent}
      />
    </>
  );

  if (isLoading) {
    return (
      <div>
        <div className="flex items-center gap-2 mb-6">
          <SidebarTrigger />
          <Hash className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold capitalize">{decodedTagName}</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="w-[280px] space-y-3 p-3">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-[140px] w-full rounded-lg" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
        {renderModals()}
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <div className="flex items-center gap-2 mb-6">
          <SidebarTrigger />
          <Hash className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold capitalize">{decodedTagName}</h1>
        </div>
        <div className="flex flex-col items-center justify-center gap-4 py-12">
          <p className="text-destructive">
            Error loading content: {error.message}
          </p>
          <button
            onClick={() => refetch()}
            className="text-primary hover:underline"
          >
            Try again
          </button>
        </div>
        {renderModals()}
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <SidebarTrigger />
        <Hash className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold capitalize">{decodedTagName}</h1>
        <span className="text-muted-foreground">
          ({contents?.length || 0} items)
        </span>
      </div>

      {!contents || contents.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 py-12">
          <p className="text-muted-foreground">
            No content with tag "{decodedTagName}" found.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {contents.map((content) => (
            <ContentCard
              key={content.id}
              content={content}
              onDelete={handleDelete}
              onEdit={handleEdit}
              onView={handleView}
              isDeleting={deleteContentMutation.isPending}
            />
          ))}
        </div>
      )}
      {renderModals()}
    </div>
  );
}
