
import { useCreateContent } from "@/hooks/useUserContent"
import type { ContentType } from "@/types/dtos"
import { useState } from "react"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { Input } from "./ui/input"
import { LinkIcon, Loader2Icon } from "lucide-react"
import { Button } from "./ui/button"

interface ContentModalProps {
  open: boolean
  onOpenChange: (open:boolean) => void
}


const contentTypes: {value: ContentType, label: string}[] = [ 
  {value:"facebook", label: "Facebook"},
  {value:"tweet", label:"Twitter"},
  {value:"youtube", label: "Youtube"},
  {value:"linkedin", label:"LinkedIn"},
  {value:"pinterest", label:"Pinterest"},
  {value:"instagram", label:"Instagram"},
  {value:"other", label: "Other"}
]

export function ContentModal({open, onOpenChange}: ContentModalProps){
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [link, setLink] = useState("")
  const [tags, setTags] = useState("")
  const [type, setType] = useState<ContentType>("other")
  
  
  const createContentMutation = useCreateContent()
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if(!title.trim() || !link.trim()) return
    try{
      await createContentMutation.mutateAsync({
        title: title.trim(),
        link: link.trim(),
        description: description.trim(),
        type,
        tagIds: [] // Tags would need to be created/fetched first
      })
      
      //reset form and close modal
      setTitle("")
      setLink("")
      setDescription("")
      setTags("")
      onOpenChange(false)
    }catch(error){
      console.error("Failed to create content: ", error)
    }
  }
  
  const detectContentType = (url: string): ContentType => {
     if (url.includes("youtube.com") || url.includes("youtu.be")) return "youtube"
     if (url.includes("pinterest.com")) return "pinterest"
     if (url.includes("twitter.com") || url.includes("x.com")) return "tweet"
     if (url.includes("linkedin.com")) return "linkedin"
     if (url.includes("instagram.com")) return "instagram"
     if (url.includes("facebook.com")) return "facebook"
     return "other"
   }

  const handleLinkChange= (value: string) => {
    setLink(value)
    const detected = detectContentType(value)
    setType(detected)
  }
  
  return (
     <Dialog open={open} onOpenChange={onOpenChange}>
       <DialogContent className="sm:max-w-[500px]">
         <DialogHeader>
           <DialogTitle className="text-xl font-bold">Add Content</DialogTitle>
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
           
           <div className="space-y-2">
             <label htmlFor="description" className="text-sm font-medium">
               Description
             </label>
             <div className="relative">
               <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
               <Input
                 id="description"
                 placeholder="Eg. Tanstack tutorial - resume from 10:23"
                 value={description}
                 onChange={(e) => setDescription(e.target.value)}
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
 
           {/* Tags Input */}
           <div className="space-y-2">
             <label htmlFor="tags" className="text-sm font-medium">
               Tags
             </label>
             <Input
               id="tags"
               placeholder="e.g. productivity, tutorial (comma separated)"
               value={tags}
               onChange={(e) => setTags(e.target.value)}
             />
             <p className="text-xs text-muted-foreground">
               Press Tab to complete, Enter to create
             </p>
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
               disabled={createContentMutation.isPending}
             >
               {createContentMutation.isPending ? (
                 <>
                   <Loader2Icon className="w-4 h-4 mr-2 animate-spin" />
                   Saving...
                 </>
               ) : (
                 "Save"
               )}
             </Button>
           </DialogFooter>
         </form>
       </DialogContent>
     </Dialog>
   )
 }