import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import FriendsCard from "./shared/FriendsCard";
import { useFriendsStore } from "@/store/useFriends";
import { useQuery } from "@tanstack/react-query";
import type { IFriend } from "@/interfaces";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";
import { Link } from "react-router";

const SuggestedFriendCard = () => {
  const { getRandomFriends } = useFriendsStore();

  const { data, isLoading } = useQuery({
    queryKey: ["friends"],
    queryFn: async () => {
      const data = await getRandomFriends();
      return data;
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 5,
  });

  const renderFriend = data?.map((friend: IFriend) => {
    return <FriendsCard key={friend.id} data={friend} />;
  });

  return (
    <Card className="shadow-none rounded-md">
      <CardHeader className="border-b border-input">
        <CardTitle>Suggested Friends</CardTitle>
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

export default SuggestedFriendCard;
