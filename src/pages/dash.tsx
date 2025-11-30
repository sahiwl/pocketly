import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardAction,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Share2Icon, Trash2Icon, LinkIcon } from "lucide-react";
import { PinterestEmbed, YouTubeEmbed } from "react-social-media-embed";
import { useDeleteContent, useUserContent } from "@/hooks/useUserContent";
import { Skeleton } from "@/components/ui/skeleton";
import ContentCard from "@/components/ContentCard";

export default function Dash() {
  const {
    data: contents,
    isLoading,
    isError,
    error,
    refetch,
  } = useUserContent();

  const deleteContentMutation = useDeleteContent();

  const handleDelete = (contentId: number) => {
    deleteContentMutation.mutate(contentId);
  };

  if (isLoading) {
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="w-[300px] space-y-4 p-4">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-[150px] w-full rounded-lg" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>;
  }

  if (isError) {
    return (
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
    );
  }

  // Empty state
  if (!contents || contents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-12">
        <p className="text-muted-foreground">No content saved yet.</p>
        <p className="text-sm text-muted-foreground">
          Start saving links to see them here!
        </p>
      </div>
    );
  }

  // Success state - render content cards
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {contents.map((content) => (
        <ContentCard
          key={content.id}
          content={content}
          onDelete={handleDelete}
          isDeleting={deleteContentMutation.isPending}
        />
      ))}
    </div>
  );
}
