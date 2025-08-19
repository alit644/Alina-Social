import {
  Card,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import MAvatar from "@/components/shared/MAvatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Images } from "lucide-react";
import { useAuthStore } from "@/store/Auth/useAuthStore";
const AddPostCard = () => {
 const {userProfile} = useAuthStore()
  return (
      <Card className="shadow-none rounded-md">
        <CardHeader className="flex justify-between flex-row items-center gap-2">
          <MAvatar
            src={userProfile?.avatar_url}
            name={userProfile?.username?.slice(0, 2).toUpperCase()}
            className="size-10"
          />
          <Input
            placeholder="What's on your mind?"
            className="h-10 w-full border-0 border-b border-input focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none rounded-none"
          />
        </CardHeader>
     
        <CardFooter className="flex justify-between items-center gap-2">
         <Button variant="ghost" ><Images className="h-4 w-4 mr-2" /> Add Photo</Button>
          <Button size={'rounded'}>Post</Button>
        </CardFooter>
      </Card>
  );
};

export default AddPostCard;
