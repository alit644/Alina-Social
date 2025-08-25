import NotificationsCard from "@/components/NotificationsCard";
import NoResults from "@/components/shared/NoResults";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import type { INotification } from "@/interfaces";
import { useNotificationStore } from "@/store/useNotifications";
import { useQuery } from "@tanstack/react-query";

const Notifications = () => {
  const { getNotifications, isLoading } = useNotificationStore();
  const { data } = useQuery<INotification[] | null | undefined>({
    queryKey: ["notifications"],
    queryFn: async () => {
      const data = await getNotifications();
      return data;
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 5,
  });

  const renderData = data?.map((item) => (
    <NotificationsCard key={item.id} data={item} />
  ));

  return (
    <Card className="shadow-none rounded-md gap-0 p-0">
      <CardHeader className="py-4">
        <CardTitle>Notifications</CardTitle>
      </CardHeader>
      <Separator />

      <CardContent className="p-0 my-4">
        {isLoading ? (
          <div className="flex flex-col gap-4 px-4">
            <Skeleton className="h-[80px]" />
            <Skeleton className="h-[80px]" />
          </div>
        ) : renderData?.length !== undefined && renderData?.length > 0 ? (
          renderData
        ) : (
          <NoResults />
        )}
      </CardContent>
    </Card>
  );
};

export default Notifications;
