import { Button } from "@/components/ui/button";
import { MessageCircle, ThumbsUp } from "lucide-react";

const PostFooter = () => {
  return (
    <div className="flex items-center justify-between mb-2 gap-2 mx-2 w-full">
      <div>
        <Button variant="ghost" className="text-[var(--neutral-500)]">
          <MessageCircle className="h-5 w-5  mr-2" /> Comment
        </Button>
      </div>
      <div>
        <Button variant="ghost" size="icon">
          <ThumbsUp className="h-5 w-5 text-[var(--neutral-500)]" />
        </Button>
      </div>
    </div>
  );
};

export default PostFooter;
