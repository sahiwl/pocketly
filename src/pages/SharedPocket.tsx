import { useParams, Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getSharedPocket } from "@/api";
import type { ContentResponseDTO, ContentType } from "@/types/dtos";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  YoutubeIcon,
  Link2Icon,
  UserIcon,
  BrainIcon,
  ExternalLinkIcon,
} from "lucide-react";
import {
  FaXTwitter,
  FaPinterest,
  FaLinkedin,
  FaInstagram,
  FaFacebook,
} from "react-icons/fa6";
import {
  FacebookEmbed,
  InstagramEmbed,
  LinkedInEmbed,
  PinterestEmbed,
  XEmbed,
  YouTubeEmbed,
} from "react-social-media-embed";

// Icon mapping for content types
const typeIcons: Record<ContentType, React.ElementType> = {
  youtube: YoutubeIcon,
  tweet: FaXTwitter,
  pinterest: FaPinterest,
  linkedin: FaLinkedin,
  instagram: FaInstagram,
  facebook: FaFacebook,
  other: Link2Icon,
};

// Content card component for the shared view (read-only, no edit/delete)
function SharedContentCard({ content }: { content: ContentResponseDTO }) {
  const IconComponent = typeIcons[content.type as ContentType] || Link2Icon;

  const maxtagsallowed = 5;
  const visibleTags = content.tags?.slice(0, maxtagsallowed) || [];
  const remainingTags = (content.tags?.length || 0) - maxtagsallowed;

  const renderEmbed = () => {
    switch (content.type as ContentType) {
      case "youtube":
        return (
          <div className="w-full overflow-hidden rounded-lg">
            <YouTubeEmbed url={content.link} width="100%" height={180} />
          </div>
        );
      case "tweet":
        return (
          <div className="w-full overflow-hidden rounded-lg max-h-[300px]">
            <XEmbed url={content.link} width="100%" />
          </div>
        );
      case "pinterest":
        return (
          <div className="w-full overflow-hidden rounded-xl h-[220px]">
            <PinterestEmbed url={content.link} width="100%" height={220} />
          </div>
        );
      case "linkedin":
        return (
          <div className="w-full overflow-hidden rounded-lg max-h-[250px]">
            <LinkedInEmbed url={content.link} width="100%" height={250} />
          </div>
        );
      case "instagram":
        return (
          <div className="w-full overflow-hidden rounded-lg max-h-[300px]">
            <InstagramEmbed url={content.link} width="100%" />
          </div>
        );
      case "facebook":
        return (
          <div className="w-full overflow-hidden rounded-lg max-h-[300px]">
            <FacebookEmbed url={content.link} width="100%" />
          </div>
        );
      default:
        return (
          <a
            href={content.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full rounded-lg bg-muted p-4 text-sm text-muted-foreground hover:bg-muted/80 break-all"
          >
            {content.link}
          </a>
        );
    }
  };

  return (
    <Card className="w-full max-w-[300px] flex flex-col hover:shadow-md transition-shadow">
      <CardHeader className="pb-0">
        <div className="flex items-start gap-2 flex-1 min-w-0">
          <IconComponent className="h-5 w-5 mt-0.5 shrink-0 text-muted-foreground" />
          <CardTitle className="text-base font-bold line-clamp-2">
            {content.title}
          </CardTitle>
        </div>
        {/* External link icon */}
        <a
          href={content.link}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 p-1 hover:bg-muted rounded transition-colors"
        >
          <ExternalLinkIcon className="h-4 w-4 text-muted-foreground hover:text-foreground" />
        </a>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col justify-between">
        <div>{renderEmbed()}</div>

        {/* Description */}
        {content.description && (
          <p className="text-sm text-muted-foreground mt-3 line-clamp-3">
            {content.description}
          </p>
        )}

        {/* Tags */}
        {content.tags && content.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-auto pt-3">
            {visibleTags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 text-xs rounded-full border border-primary/30 text-primary bg-primary/5"
              >
                #{tag}
              </span>
            ))}
            {remainingTags > 0 && (
              <span className="px-2.5 py-0.5 text-xs rounded-full border border-muted-foreground/30 text-muted-foreground bg-muted">
                +{remainingTags}
              </span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Main SharedPocket page component
export default function SharedPocket() {
  // Get the hash from the URL params
  const { hash } = useParams<{ hash: string }>();

  // Fetch the shared pocket data
  const {
    data: pocket,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["shared-pocket", hash],
    queryFn: () => getSharedPocket(hash!),
    enabled: !!hash, // Only fetch if hash exists
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header skeleton */}
        <div className="border-b">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center gap-4">
              <Skeleton className="h-16 w-16 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          </div>
        </div>

        {/* Content skeleton */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="w-[300px] space-y-4 p-4">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-[150px] w-full rounded-lg" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="p-4 rounded-full bg-destructive/10 inline-block">
            <BrainIcon className="h-12 w-12 text-destructive" />
          </div>
          <h1 className="text-2xl font-bold">Pocket Not Found</h1>
          <p className="text-muted-foreground max-w-md">
            {error instanceof Error
              ? error.message
              : "This shared pocket doesn't exist or has been disabled."}
          </p>
          <Link
            to="/"
            className="inline-block mt-4 text-primary hover:underline"
          >
            ← Go to Homepage
          </Link>
        </div>
      </div>
    );
  }

  // Empty state
  if (!pocket || !pocket.content || pocket.content.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        {/* Profile Header at Top */}
        <div className="border-b bg-card">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <UserIcon className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">{pocket?.username}'s Brain</h1>
                  <p className="text-muted-foreground">Shared collection</p>
                </div>
              </div>

              {/* Back to home link */}
              <Link
                to="/"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                ← Back to Pocketly
              </Link>
            </div>
          </div>
        </div>

        {/* Empty content */}
        <div className="container mx-auto px-4 py-16 text-center flex-1 flex flex-col items-center justify-center">
          <BrainIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold">No content yet</h2>
          <p className="text-muted-foreground">
            This brain is empty. Check back later!
          </p>
        </div>

        {/* Footer */}
        <div className="border-t bg-card">
          <div className="container mx-auto px-4 py-4 text-center text-sm text-muted-foreground">
            Shared via{" "}
            <Link to="/" className="text-primary hover:underline">
              Pocketly
            </Link>{" "}
            - Your second brain
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Profile Header at Top */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <UserIcon className="h-8 w-8 text-primary" />
              </div>

              {/* User info */}
              <div>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                  <BrainIcon className="h-6 w-6 text-primary" />
                  {pocket.username}'s Brain
                </h1>
                <p className="text-muted-foreground">
                  {pocket.content.length} saved item
                  {pocket.content.length !== 1 ? "s" : ""}
                </p>
              </div>
            </div>

            {/* Back to home link */}
            <Link
              to="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Back to Pocketly
            </Link>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {pocket.content.map((content) => (
            <SharedContentCard key={content.id} content={content} />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t bg-card">
        <div className="container mx-auto px-4 py-4 text-center text-sm text-muted-foreground">
          Shared via{" "}
          <Link to="/" className="text-primary hover:underline">
            Pocketly
          </Link>{" "}
          - made by <a href="www.x.com/sahilwithocd" referrerPolicy="no-referrer" className="hover:underline text-primary">sahiwl</a>
        </div>
      </div>
    </div>
  );
}
