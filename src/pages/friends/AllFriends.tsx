import FriendsCard from "@/components/shared/FriendsCard";
import { useFriendsStore } from "@/store/useFriends";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import NoResults from "@/components/shared/NoResults";
import { Skeleton } from "@/components/ui/skeleton";
import type { IFriend } from "@/interfaces";
const AllFriends = () => {
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
      <CardHeader>
        <CardTitle className="H4">My Friends</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="px-2 sm:px-4">
        {isLoading ? (
          <div className="flex flex-col gap-4">
            <Skeleton className="h-[60px]" />
            <Skeleton className="h-[60px]" />
          </div>
        ) : data?.length !== undefined && data?.length > 0 ? (
          renderFriend
        ) : (
          <NoResults />
        )}
      </CardContent>
    </Card>
  );
};

export default AllFriends;
