import { Button } from "@/components/ui/button";
import { Share2Icon, PlusIcon } from "lucide-react";
import { useDeleteContent, useUserContent } from "@/hooks/useUserContent";
import { Skeleton } from "@/components/ui/skeleton";
import ContentCard from "@/components/ContentCard";
import { ContentModal } from "@/components/ContentModal";
import { ContentViewModal } from "@/components/ContentViewModal";
import { ShareBrainModal } from "@/components/ShareBrainModal";
import { useState } from "react";
import type { ContentResponseDTO } from "@/types/dtos";

export default function Dash() {
  const {
    data: contents,
    isLoading,
    isError,
    error,
    refetch,
  } = useUserContent();

  // Modal states
  const [contentModalOpen, setContentModalOpen] = useState(false);
  const [editingContent, setEditingContent] =
    useState<ContentResponseDTO | null>(null);
  const [viewingContent, setViewingContent] =
    useState<ContentResponseDTO | null>(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [shareBrainOpen, setShareBrainOpen] = useState(false);

  const deleteContentMutation = useDeleteContent();

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

  const handleAddContent = () => {
    setEditingContent(null);
    setContentModalOpen(true);
  };

  const handleContentModalClose = (open: boolean) => {
    if (!open) {
      setEditingContent(null);
    }
    setContentModalOpen(open);
  };

  const handleViewModalClose = (open: boolean) => {
    if (!open) {
      setViewingContent(null);
    }
    setViewModalOpen(open);
  };

  const HeaderSection = () => (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-bold">All Notes</h1>
      <div className="flex items-center gap-3">
        <Button className="text-white bg-primary" onClick={handleAddContent}>
          <PlusIcon className="w-4 h-4 mr-2" />
          Add Content
        </Button>
        <Button
          variant="secondary"
          className="bg-primary text-white"
          onClick={() => setShareBrainOpen(true)}
        >
          <Share2Icon className="w-4 h-4 mr-2" />
          Share Brain
        </Button>
      </div>
    </div>
  );

  // Render modals (always render them so they can be opened)
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
      <ShareBrainModal open={shareBrainOpen} onOpenChange={setShareBrainOpen} />
    </>
  );

  if (isLoading) {
    return (
      <div>
        <HeaderSection />
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
        <HeaderSection />
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

  // Empty state
  if (!contents || contents.length === 0) {
    return (
      <div>
        <HeaderSection />
        <div className="flex flex-col items-center justify-center gap-4 py-12">
          <p className="text-muted-foreground">No content saved yet.</p>
          <p className="text-sm text-muted-foreground">
            Start saving links to see them here!
          </p>
        </div>
        {renderModals()}
      </div>
    );
  }

  // Success state - render content cards
  return (
    <div>
      <HeaderSection />
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
      {renderModals()}
    </div>
  );
}
