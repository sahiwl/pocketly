import { useCreateContent, useUpdateContent } from "@/hooks/useUserContent";
import { useTags, useCreateTag } from "@/hooks/useTags";
import type {
  ContentResponseDTO,
  ContentType,
  TagResponseDTO,
} from "@/types/dtos";
import { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import {
  LinkIcon,
  Loader2Icon,
  FileTextIcon,
  PlusIcon,
  XIcon,
  ChevronDownIcon,
} from "lucide-react";
import { Button } from "./ui/button";

interface ContentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  content?: ContentResponseDTO | null;
}

const contentTypes: { value: ContentType; label: string }[] = [
  { value: "facebook", label: "Facebook" },
  { value: "tweet", label: "Twitter" },
  { value: "youtube", label: "Youtube" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "pinterest", label: "Pinterest" },
  { value: "instagram", label: "Instagram" },
  { value: "other", label: "Other" },
];

export function ContentModal({
  open,
  onOpenChange,
  content,
}: ContentModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [selectedTags, setSelectedTags] = useState<TagResponseDTO[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [isTagDropdownOpen, setIsTagDropdownOpen] = useState(false);
  const [type, setType] = useState<ContentType>("other");

  const tagInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isEditMode = !!content;

  const { data: allTags = [], isLoading: isLoadingTags } = useTags();
  const createTagMutation = useCreateTag();
  const createContentMutation = useCreateContent();
  const updateContentMutation = useUpdateContent();

  const isLoading =
    createContentMutation.isPending || updateContentMutation.isPending;

  // Filter tags based on input
  const filteredTags = allTags.filter(
    (tag) =>
      tag.title.toLowerCase().includes(tagInput.toLowerCase()) &&
      !selectedTags.some((selected) => selected.id === tag.id),
  );

  // Check if the typed tag exists
  const tagExists = allTags.some(
    (tag) => tag.title.toLowerCase() === tagInput.toLowerCase(),
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsTagDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Populate form when editing
  useEffect(() => {
    if (content) {
      setTitle(content.title || "");
      setDescription(content.description || "");
      setLink(content.link || "");
      setType(content.type || "other");
      // Match tags by title
      const matchedTags = allTags.filter((tag) =>
        content.tags?.includes(tag.title),
      );
      setSelectedTags(matchedTags);
    } else {
      setTitle("");
      setDescription("");
      setLink("");
      setType("other");
      setSelectedTags([]);
    }
    setTagInput("");
  }, [content, open, allTags]);

  const handleSelectTag = (tag: TagResponseDTO) => {
    setSelectedTags([...selectedTags, tag]);
    setTagInput("");
    setIsTagDropdownOpen(false);
  };

  const handleRemoveTag = (tagId: number) => {
    setSelectedTags(selectedTags.filter((t) => t.id !== tagId));
  };

  const handleCreateAndAddTag = async () => {
    if (!tagInput.trim()) return;

    try {
      const newTag = await createTagMutation.mutateAsync({
        title: tagInput.trim(),
      });
      setSelectedTags([...selectedTags, newTag]);
      setTagInput("");
      setIsTagDropdownOpen(false);
    } catch (error) {
      console.error("Failed to create tag:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !link.trim()) return;

    try {
      const payload = {
        title: title.trim(),
        link: link.trim(),
        description: description.trim(),
        type,
        tagIds: selectedTags.map((tag) => tag.id),
      };

      if (isEditMode && content) {
        await updateContentMutation.mutateAsync({
          contentId: content.id,
          payload,
        });
      } else {
        await createContentMutation.mutateAsync(payload);
      }

      setTitle("");
      setLink("");
      setDescription("");
      setSelectedTags([]);
      setTagInput("");
      setType("other");
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to save content: ", error);
    }
  };

  const detectContentType = (url: string): ContentType => {
    if (url.includes("youtube.com") || url.includes("youtu.be"))
      return "youtube";
    if (url.includes("pinterest.com")) return "pinterest";
    if (url.includes("twitter.com") || url.includes("x.com")) return "tweet";
    if (url.includes("linkedin.com")) return "linkedin";
    if (url.includes("instagram.com")) return "instagram";
    if (url.includes("facebook.com")) return "facebook";
    return "other";
  };

  const handleLinkChange = (value: string) => {
    setLink(value);
    if (!isEditMode) {
      const detected = detectContentType(value);
      setType(detected);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {isEditMode ? "Edit Content" : "Add Content"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Link Input */}
          <div className="space-y-2">
            <label htmlFor="link" className="text-sm font-medium">
              Link
            </label>
            <div className="relative">
              <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="link"
                placeholder="https://..."
                value={link}
                onChange={(e) => handleLinkChange(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          {/* Title Input */}
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Title
            </label>
            <Input
              id="title"
              placeholder="Enter a title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Description Input */}
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <div className="relative">
              <FileTextIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="description"
                placeholder="Eg. Tanstack tutorial - resume from 10:23"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Content Type */}
          <div className="space-y-2">
            <label htmlFor="type" className="text-sm font-medium">
              Content Type
            </label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value as ContentType)}
              className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {contentTypes.map((ct) => (
                <option key={ct.value} value={ct.value}>
                  {ct.label}
                </option>
              ))}
            </select>
          </div>

          {/* Tags Input with Dropdown */}
          <div className="space-y-2">
            <label htmlFor="tags" className="text-sm font-medium">
              Tags
            </label>

            {/* Selected Tags */}
            {selectedTags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2">
                {selectedTags.map((tag) => (
                  <span
                    key={tag.id}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-md text-sm"
                  >
                    {tag.title}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag.id)}
                      className="hover:bg-primary/20 rounded-full p-0.5"
                    >
                      <XIcon className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Tag Input with Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <div className="relative">
                <Input
                  ref={tagInputRef}
                  id="tags"
                  placeholder="Search or add tags..."
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onFocus={() => setIsTagDropdownOpen(true)}
                  className="pr-8"
                />
                <ChevronDownIcon
                  className={`absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-transform ${
                    isTagDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </div>

              {/* Dropdown */}
              {isTagDropdownOpen && (
                <div className="absolute z-50 w-full mt-1 bg-background border rounded-md shadow-lg max-h-48 overflow-y-auto">
                  {isLoadingTags ? (
                    <div className="p-3 text-center text-muted-foreground">
                      <Loader2Icon className="h-4 w-4 animate-spin inline mr-2" />
                      Loading tags...
                    </div>
                  ) : (
                    <>
                      {filteredTags.map((tag) => (
                        <button
                          key={tag.id}
                          type="button"
                          onClick={() => handleSelectTag(tag)}
                          className="w-full px-3 py-2 text-left hover:bg-muted text-sm flex items-center gap-2"
                        >
                          <span>#</span>
                          {tag.title}
                        </button>
                      ))}

                      {tagInput.trim() && !tagExists && (
                        <button
                          type="button"
                          onClick={handleCreateAndAddTag}
                          disabled={createTagMutation.isPending}
                          className="w-full px-3 py-2 text-left hover:bg-muted text-sm flex items-center gap-2 text-primary border-t"
                        >
                          {createTagMutation.isPending ? (
                            <Loader2Icon className="h-4 w-4 animate-spin" />
                          ) : (
                            <PlusIcon className="h-4 w-4" />
                          )}
                          Create "{tagInput.trim()}"
                        </button>
                      )}

                      {filteredTags.length === 0 && !tagInput.trim() && (
                        <div className="p-3 text-center text-muted-foreground text-sm">
                          No tags yet. Type to create one!
                        </div>
                      )}

                      {filteredTags.length === 0 &&
                        tagInput.trim() &&
                        tagExists && (
                          <div className="p-3 text-center text-muted-foreground text-sm">
                            Tag already selected
                          </div>
                        )}
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/80 text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2Icon className="w-4 h-4 mr-2 animate-spin" />
                  {isEditMode ? "Updating..." : "Saving..."}
                </>
              ) : isEditMode ? (
                "Update"
              ) : (
                "Save"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
