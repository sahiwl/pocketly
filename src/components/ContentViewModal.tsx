import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import type { ContentResponseDTO, ContentType } from "@/types/dtos";
import {
  FacebookEmbed,
  InstagramEmbed,
  LinkedInEmbed,
  PinterestEmbed,
  XEmbed,
  YouTubeEmbed,
} from "react-social-media-embed";
import { YoutubeIcon, Link2Icon, ExternalLinkIcon } from "lucide-react";
import {
  FaXTwitter,
  FaPinterest,
  FaLinkedin,
  FaInstagram,
  FaFacebook,
} from "react-icons/fa6";

interface ContentViewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  content: ContentResponseDTO | null;
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

export function ContentViewModal({
  open,
  onOpenChange,
  content,
}: ContentViewModalProps) {
  if (!content) return null;

  const IconComponent = typeIcons[content.type as ContentType] || Link2Icon;

  const renderEmbed = () => {
    switch (content.type as ContentType) {
      case "youtube":
        return (
          <div className="w-full overflow-hidden rounded-lg">
            <YouTubeEmbed url={content.link} width="100%" />
          </div>
        );
      case "tweet":
        return (
          <div className="w-full overflow-hidden rounded-lg">
            <XEmbed url={content.link} width="100%" />
          </div>
        );
      case "pinterest":
        return (
          <div className="w-full overflow-hidden rounded-xl">
            <PinterestEmbed url={content.link} width="100%" />
          </div>
        );
      case "linkedin":
        return (
          <div className="w-full overflow-hidden rounded-lg">
            <LinkedInEmbed url={content.link} width="100%" />
          </div>
        );
      case "instagram":
        return (
          <div className="w-full overflow-hidden rounded-lg">
            <InstagramEmbed url={content.link} width="100%" />
          </div>
        );
      case "facebook":
        return (
          <div className="w-full overflow-hidden rounded-lg">
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-2">
          <div className="flex items-start gap-3">
            <IconComponent className="h-5 w-5 mt-1 shrink-0 text-muted-foreground" />
            <DialogTitle className="text-xl font-bold leading-tight">
              {content.title}
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-4">

          <div className="w-full">{renderEmbed()}</div>


          {content.description && (
            <div className="space-y-1">
              <p className="text-sm text-foreground leading-relaxed">
                {content.description}
              </p>
            </div>
          )}


          {content.tags && content.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {content.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 text-xs rounded-full border border-primary/30 text-primary bg-primary/5"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}


          <div className="flex items-center justify-between pt-2 border-t">
            <a
              href={content.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
            >
              <ExternalLinkIcon className="w-4 h-4" />
              Open Original
            </a>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
