import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import FriendsCard from "./shared/FriendsCard";
import type { IFriend } from "@/interfaces";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";
import { Link } from "react-router";
import useGetFriends from "@/hooks/friends/use-get-friends";
import { memo } from "react";

const SuggestedFriendCard = () => {

  const { data, isLoading } = useGetFriends(6);

  const renderFriend = data?.pages?.map((page) => {
    return page.data.map((friend: IFriend) => {
      return <FriendsCard key={friend.id} data={friend} />;
    });
  });

  return (
    <Card className="shadow-none rounded-md">
      <CardHeader className="border-b border-input">
        <CardTitle className="logo">Suggested Friends</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex flex-col gap-2">
            <Skeleton className="h-[50px]" />
            <Skeleton className="h-[50px]" />
          </div>
        ) : (
          renderFriend
        )}
      </CardContent>
      <CardFooter>
        <Button variant="ghost" className="w-full" title="See All">
          <Link to="/all-friends">See All</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default memo(SuggestedFriendCard);
