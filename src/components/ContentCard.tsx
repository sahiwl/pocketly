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
import { PinterestEmbed } from "react-social-media-embed";

export default function Dash() {
  const [isExpanded, setIsExpanded] = useState(false);

  const description =
    "This is a sample description that might be quite long and needs to be truncated after two lines. If the text is longer than two lines, we show a read more link to expand it.";

  const tags = ["#productivity", "#learning"];
  const dateAdded = "09/03/2024";

  return (
    <div className="container max-w-7xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">All Notes</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <Card className="w-full">
          <CardHeader>
            <div className="flex items-start gap-2">
              <LinkIcon className="h-5 w-5 mt-1 text-muted-foreground" />
              <CardTitle className="text-lg font-bold">
                How to Build a Second Brain
              </CardTitle>
            </div>
            <CardAction>
              <div className="flex items-center gap-2">
                <Share2Icon className="h-5 w-5 cursor-pointer text-muted-foreground hover:text-foreground" />
                <Trash2Icon className="h-5 w-5 cursor-pointer text-muted-foreground hover:text-foreground" />
              </div>
            </CardAction>
          </CardHeader>

          <CardContent className="px-4">
            <div className="w-full overflow-hidden rounded-lg h-[150px] relative bg-muted">
              <div className="absolute top-0 left-0">
                <PinterestEmbed
                  url="https://in.pinterest.com/pin/271341946295491480/"
                  width={268}
                  height={400}
                />
              </div>
            </div>

            <div className="mt-4">
              <p
                className={`text-sm text-muted-foreground ${
                  !isExpanded ? "line-clamp-2" : ""
                }`}
              >
                {description}
              </p>
              {description.length > 100 && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-sm text-primary hover:underline mt-1"
                >
                  {isExpanded ? "Show less" : "Read more"}
                </button>
              )}
            </div>

            <div className="flex gap-2 mt-4">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm rounded-full border border-primary/30 text-primary bg-primary/5"
                >
                  {tag}
                </span>
              ))}
            </div>
          </CardContent>

          <CardFooter>
            <span className="text-sm text-muted-foreground">
              Added on {dateAdded}
            </span>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
