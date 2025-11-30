import {
  Card,
  CardHeader,
  CardTitle,
  CardAction,
  CardContent,
} from "@/components/ui/card";
import { Share2Icon, Trash2Icon, YoutubeIcon, Link2Icon, PencilIcon, Divide } from "lucide-react";
import {
  FacebookEmbed,
  InstagramEmbed,
  LinkedInEmbed,
  PinterestEmbed,
  XEmbed,
  YouTubeEmbed,
} from "react-social-media-embed";
import type { ContentResponseDTO, ContentType } from "@/types/dtos";
import {
  FaXTwitter,
  FaPinterest,
  FaLinkedin,
  FaInstagram,
  FaFacebook,
} from "react-icons/fa6";

export interface ContentCardProps {
  content: ContentResponseDTO;
  onDelete?: (id: number) => void;
  onEdit?: (content: ContentResponseDTO) => void;
  isDeleting?: boolean;
}

const typeIcons: Record<ContentType, React.ElementType> = {
  youtube: YoutubeIcon,
  tweet: FaXTwitter,
  pinterest: FaPinterest,
  linkedin: FaLinkedin,
  instagram: FaInstagram,
  facebook: FaFacebook,
  other: Link2Icon,
};

export default function ContentCard({
  content,
  onDelete,
  isDeleting,
}: ContentCardProps) {
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
    <Card className="w-full max-w-[300px] flex flex-col">
      <CardHeader className="pb-0">
        <div className="flex items-start gap-2 flex-1 min-w-0">
          <IconComponent className="h-5 w-5 mt-0.5 shrink-0 text-muted-foreground" />
          <CardTitle className="text-base font-bold line-clamp-2 wrap-break-word">
            {content.title}
          </CardTitle>
        </div>
        <CardAction>
          <div className="flex items-center gap-2">
            <button onClick={() => onEdit?.(content)}>
              <PencilIcon className="h-4 w-4 cursor-pointer text-muted-foreground hover:text-foreground transition-colors" />
            </button>
            <button
              onClick={() => onDelete?.(content.id)}
              disabled={isDeleting}
              className="disabled:opacity-50"
            >
              <Trash2Icon className="h-4 w-4 cursor-pointer text-muted-foreground hover:text-destructive transition-colors" />
            </button>
          </div>
        </CardAction>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col justify-between">
        <div>
          {renderEmbed()}
        </div>

        {/* Description */}
        {content.description && (
          <p className="text-sm text-muted-foreground mt-3 line-clamp-2">
            {content.description}
          </p>
        )}

        {/* Tags - always at the bottom */}
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
