import { useParams } from "react-router";
import { useUserContent, useDeleteContent } from "@/hooks/useUserContent";
import { Skeleton } from "@/components/ui/skeleton";
import ContentCard from "@/components/ContentCard";
import { ContentModal } from "@/components/ContentModal";
import { ContentViewModal } from "@/components/ContentViewModal";
import { useState } from "react";
import type { ContentResponseDTO, ContentType } from "@/types/dtos";
import { Youtube } from "lucide-react";
import { FaInstagram, FaXTwitter, FaLinkedin, FaFacebook, FaPinterest, FaLink } from "react-icons/fa6";

const typeIcons: Record<ContentType, React.ComponentType<{ className?: string }>> = {
  youtube: Youtube,
  tweet: FaXTwitter,
  instagram: FaInstagram,
  linkedin: FaLinkedin,
  facebook: FaFacebook,
  pinterest: FaPinterest,
  other: FaLink,
};

const typeLabels: Record<ContentType, string> = {
  youtube: "YouTube",
  tweet: "Twitter",
  instagram: "Instagram",
  linkedin: "LinkedIn",
  facebook: "Facebook",
  pinterest: "Pinterest",
  other: "Other",
};

export default function TypePage() {
  const { typeName } = useParams<{ typeName: string }>();
  const { data: allContents, isLoading, isError, error, refetch } = useUserContent();

  const [contentModalOpen, setContentModalOpen] = useState(false);
  const [editingContent, setEditingContent] = useState<ContentResponseDTO | null>(null);
  const [viewingContent, setViewingContent] = useState<ContentResponseDTO | null>(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);

  const deleteContentMutation = useDeleteContent();

  // Filter content by type
  const contents = allContents?.filter(
    (content) => content.type.toLowerCase() === (typeName || "").toLowerCase()
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

  const typeKey = (typeName || "other") as ContentType;
  const Icon = typeIcons[typeKey] || FaLink;
  const label = typeLabels[typeKey] || typeName;

  const renderModals = () => (
    <>
      <ContentModal open={contentModalOpen} onOpenChange={handleContentModalClose} content={editingContent} />
      <ContentViewModal open={viewModalOpen} onOpenChange={handleViewModalClose} content={viewingContent} />
    </>
  );

  if (isLoading) {
    return (
      <div>
        <div className="flex items-center gap-2 mb-6">
          <Icon className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">{label}</h1>
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
          <Icon className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">{label}</h1>
        </div>
        <div className="flex flex-col items-center justify-center gap-4 py-12">
          <p className="text-destructive">Error loading content: {error.message}</p>
          <button onClick={() => refetch()} className="text-primary hover:underline">Try again</button>
        </div>
        {renderModals()}
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <Icon className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold">{label}</h1>
        <span className="text-muted-foreground">({contents?.length || 0} items)</span>
      </div>

      {!contents || contents.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 py-12">
          <p className="text-muted-foreground">No {label} content saved yet.</p>
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
