import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import PostHeader from "@/components/post/PostHeader";

const SuggestedFriendCard = () => {
  return (
    <Card className="shadow-none rounded-md">
      <CardHeader className="border-b border-input">
       <CardTitle>Suggested Friends</CardTitle>
      </CardHeader>
      <CardContent>
        <PostHeader name="Ali Talib" username="ali_talib" options={false} add={true} className="not-last:mb-5"/>
      </CardContent>
    </Card>
  );
};

export default SuggestedFriendCard;
