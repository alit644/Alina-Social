import { Card } from "@/components/ui/card";
import PostHeader from "./PostHeader";

const CommentCard = () => {
  return (
    <Card className="w-full bg-[#F1F4F9] rounded-md shadow-none border-0 p-5 mt-6">
      <PostHeader name="Sammer" username="sammi" />
      {/* comment */}
      <div>
        <p className="p2 ">
          Fantastic post! Your content always brings a smile to my face. Keep up
          the great work! 👏
        </p>
      </div>
    </Card>
  );
};

export default CommentCard;
