import { Button } from "@/components/ui/button";
import { Share2Icon, PlusIcon } from "lucide-react";
import { useDeleteContent, useUserContent } from "@/hooks/useUserContent";
import { Skeleton } from "@/components/ui/skeleton";
import ContentCard from "@/components/ContentCard";
import { ContentModal } from "@/components/ContentModal";
import { useState } from "react";

export default function Dash() {
  const {
    data: contents,
    isLoading,
    isError,
    error,
    refetch,
  } = useUserContent();

  const [addContentOpen, setAddContentOpen] = useState(false);
  
  const deleteContentMutation = useDeleteContent();

  const handleDelete = (contentId: number) => {
    deleteContentMutation.mutate(contentId);
  };

  const HeaderSection = () => (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-bold">All Notes</h1>
      <div className="flex items-center gap-3">
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white"
          onClick={()=>{setAddContentOpen(true)}}
        >
          <PlusIcon className="w-4 h-4 mr-2" />
          Add Content
        </Button>
        <Button
          variant="secondary"
          className="bg-indigo-100 text-indigo-600 hover:bg-indigo-200"        >
          <Share2Icon className="w-4 h-4 mr-2" />
          Share Brain
        </Button>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div>
        <HeaderSection />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="w-[300px] space-y-4 p-4">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-[150px] w-full rounded-lg" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
        <ContentModal open={addContentOpen} onOpenChange={setAddContentOpen}/>
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
        <ContentModal open={addContentOpen} onOpenChange={setAddContentOpen}/>
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
        <ContentModal open={addContentOpen} onOpenChange={setAddContentOpen}/>
      </div>
    );
  }

  // Success state - render content cards
  return (
    <div>
      <HeaderSection />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4">
        {contents.map((content) => (
          <ContentCard
            key={content.id}
            content={content}
            onDelete={handleDelete}
            isDeleting={deleteContentMutation.isPending}
          />
        ))}
      </div>
      <ContentModal open={addContentOpen} onOpenChange={setAddContentOpen}/>
    </div>
  );
}
