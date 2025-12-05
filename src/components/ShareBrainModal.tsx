import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useSharePocket } from "@/hooks/useUserContent";
import {
  CheckIcon,
  CopyIcon,
  Loader2Icon,
  Share2Icon,
  LinkIcon,
  Link2OffIcon,
} from "lucide-react";

interface ShareBrainModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ShareBrainModal({ open, onOpenChange }: ShareBrainModalProps) {
  const [shareLink, setShareLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const sharePocketMutation = useSharePocket();

  const handleEnableSharing = async () => {
    try {
      const response = await sharePocketMutation.mutateAsync(true);
      const baseUrl = window.location.origin;
      setShareLink(`${baseUrl}/pocket/${response.hash}`);
      setIsSharing(true);
    } catch (error) {
      console.error("Failed to enable sharing:", error);
    }
  };

  const handleDisableSharing = async () => {
    try {
      await sharePocketMutation.mutateAsync(false);
      setShareLink(null);
      setIsSharing(false);
    } catch (error) {
      console.error("Failed to disable sharing:", error);
    }
  };

  const handleCopy = async () => {
    if (!shareLink) return;

    try {
      await navigator.clipboard.writeText(shareLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const handleClose = (open: boolean) => {
    if (!open) {
      // Reset copied state when closing
      setCopied(false);
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Share2Icon className="w-5 h-5 text-primary" />
            <DialogTitle className="text-xl font-bold">
              Share Your Brain
            </DialogTitle>
          </div>
          <DialogDescription className="pt-2">
            Share your saved content with others. You can enable or disable
            sharing at any time.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          {/* Not sharing yet - show enable button */}
          {!isSharing && !shareLink && (
            <div className="flex flex-col items-center py-6 gap-4">
              <div className="p-4 rounded-full bg-muted">
                <LinkIcon className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground text-center">
                Enable sharing to generate a link that others can use to view
                your saved content.
              </p>
              <Button
                onClick={handleEnableSharing}
                disabled={sharePocketMutation.isPending}
                className="bg-primary hover:bg-primary/80"
              >
                {sharePocketMutation.isPending ? (
                  <>
                    <Loader2Icon className="w-4 h-4 mr-2 animate-spin" />
                    Enabling...
                  </>
                ) : (
                  <>
                    <Share2Icon className="w-4 h-4 mr-2" />
                    Enable Sharing
                  </>
                )}
              </Button>
            </div>
          )}

          {/* Loading state */}
          {sharePocketMutation.isPending && isSharing && (
            <div className="flex items-center justify-center py-8">
              <Loader2Icon className="w-8 h-8 animate-spin text-primary" />
              <span className="ml-2 text-muted-foreground">Processing...</span>
            </div>
          )}

          {sharePocketMutation.isError && (
            <div className="text-center py-4">
              <p className="text-destructive mb-4">
                Something went wrong. Please try again.
              </p>
              <Button onClick={handleEnableSharing} variant="outline">
                Try Again
              </Button>
            </div>
          )}

          {/* Sharing enabled - show link and disable option */}
          {isSharing && shareLink && !sharePocketMutation.isPending && (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium">Share Link</label>
                <div className="flex gap-2">
                  <Input
                    value={shareLink}
                    readOnly
                    className="flex-1 bg-muted"
                  />
                  <Button
                    type="button"
                    onClick={handleCopy}
                    className={
                      copied
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-primary hover:bg-primary/80"
                    }
                  >
                    {copied ? (
                      <>
                        <CheckIcon className="w-4 h-4 mr-1" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <CopyIcon className="w-4 h-4 mr-1" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
              </div>

              <p className="text-xs text-muted-foreground">
                Anyone with this link can view your shared content.
              </p>

              {/* Disable sharing button */}
              <div className="pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={handleDisableSharing}
                  disabled={sharePocketMutation.isPending}
                  className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  {sharePocketMutation.isPending ? (
                    <>
                      <Loader2Icon className="w-4 h-4 mr-2 animate-spin" />
                      Disabling...
                    </>
                  ) : (
                    <>
                      <Link2OffIcon className="w-4 h-4 mr-2" />
                      Disable Sharing
                    </>
                  )}
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-2">
                  This will deactivate the share link. You can re-enable it
                  anytime.
                </p>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
