import { Card, CardContent, CardFooter } from "@/components/ui/card";
import PostCount from "@/components/profile/PostCount";
import MAvatar from "@/components/shared/MAvatar";
import { memo, useCallback, useMemo } from "react";
import type { IProfile } from "@/interfaces";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useFriendsStore } from "@/store/useFriends";
import { useParams } from "react-router";
import { Button } from "@/components/ui/button";
import { Skeleton } from "../ui/skeleton";
interface UserProfileCardProps {
  data?: Partial<IProfile>;
  isLoadingProfile: boolean;
}
const UserProfileCard = ({
  data = {},
  isLoadingProfile,
}: UserProfileCardProps) => {
  const { userID } = useParams();
  const { getProfileStats, getMyFriends, unFollow, addFriend, isLoading } =
    useFriendsStore();
  const { avatar_url = "", username = "", full_name = "", bio = "" } = data;
  const queryClient = useQueryClient();
  const { data: profileStats } = useQuery({
    queryKey: ["profileStats", userID],
    queryFn: async () => {
      const data = await getProfileStats(userID || "");
      return data;
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 5,
  });
  const { data: myFriends } = useQuery({
    queryKey: ["myFriends", userID],
    queryFn: async () => {
      const data = await getMyFriends();
      return data;
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 5,
  });
  const isFriend = useMemo(() => {
    return myFriends?.some((friend) => friend.id === userID);
  }, [myFriends, userID]);

  const friendRequestID = useMemo(() => {
    return myFriends?.find((friend) => friend.id === userID)?.friend_request_id;
  }, [myFriends, userID]);

  const handleUnFollow = useCallback(async () => {
    await unFollow(friendRequestID || "");
    queryClient.invalidateQueries({
      queryKey: ["myFriends"],
    });
  }, [friendRequestID, unFollow, queryClient]);

  const handleAddFriend = useCallback(async () => {
    await addFriend(userID || "");
    queryClient.invalidateQueries({
      queryKey: ["myFriends"],
    });
  }, [userID, addFriend, queryClient]);
  return (
    <Card className=" shadow-none rounded-md m-0">
      {isLoadingProfile ? (
        <Skeleton className="h-[200px] w-full" />
      ) : (
        <>
          <CardContent className=" ">
            <section className="flex justify-between flex-wrap gap-1 ">
              <div
                className={`flex items-center flex-col sm:flex-row gap-4 sm:gap-2   `}
              >
                <MAvatar
                  src={avatar_url || ""}
                  name={username || ""}
                  className="size-[60px] sm:size-[50px]"
                />
                <div className="flex flex-col">
                  <h3 className="text-lg font-semibold">{full_name}</h3>
                  <p className="text-xs text-gray-500">@{username}</p>
                </div>
              </div>
              {/* bio */}
              <PostCount
                data={profileStats || { posts: 0, friends: 0 }}
                isNav={false}
              />
            </section>

            {/* bio */}
            {bio && (
              <div className="p2 mt-4">
                <p className="text-xs text-gray-500">{bio}</p>
              </div>
            )}
          </CardContent>

          <CardFooter>
            {isFriend ? (
              <div className="flex gap-2 w-full">
                <Button
                  variant="outline"
                  size={"lg"}
                  className="w-full md:w-[200px] border-[var(--danger-500)] text-[var(--danger-300)] hover:text-[var(--danger-300)]"
                  onClick={handleUnFollow}
                  disabled={isLoading}
                >
                  Unfollow
                </Button>
                <Button
                  variant="outline"
                  size={"lg"}
                  className="w-full md:w-[200px]"
                >
                  Message
                </Button>
              </div>
            ) : (
              <div className="flex gap-2 w-full">
                <Button
                  variant="default"
                  size={"lg"}
                  className="w-full md:w-[200px] dark:bg-[var(--primary-900)] dark:text-[var(--primary-50)]"
                  onClick={handleAddFriend}
                  disabled={isLoading}
                >
                  Follow
                </Button>
                <Button
                  variant="outline"
                  size={"lg"}
                  className="w-full md:w-[200px]"
                >
                  Message
                </Button>
              </div>
            )}
          </CardFooter>
        </>
      )}
    </Card>
  );
};

export default memo(UserProfileCard);
