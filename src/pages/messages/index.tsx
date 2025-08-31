import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, NavLink, useLocation } from "react-router";
import { Outlet } from "react-router";
import { Separator } from "@/components/ui/separator";
import MAvatar from "@/components/shared/MAvatar";
import { Badge } from "@/components/ui/badge";
import { useAuthStore } from "@/store/Auth/useAuthStore";
import useGetAllMyConversations from "@/hooks/messages/use-getAllConversations";
import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import NoResults from "@/components/shared/NoResults";
const Index = () => {
  const pathname = useLocation();
  const isMobile = useIsMobile();
  const conversationId = pathname.pathname.startsWith("/messages/")
    ? pathname.pathname.split("/")[2]
    : null;

  const user = useAuthStore((state) => state.user);
  const { data, isLoading } = useGetAllMyConversations();
  const formatted = data?.map((conv) => {
    const otherUser = conv.user1.id === user?.id ? conv.user2 : conv.user1;
    return {
      conversationId: conv.id,
      lastMessageAt: conv.created_at,
      otherUser,
    };
  });

  const renderLinks = formatted?.map((item) => {
    return (
      <NavLink
        to={`/messages/${item.conversationId}`}
        key={item.conversationId}
      >
        <div className={`flex items-center gap-2 relative mb-4`}>
          <MAvatar
            src={item.otherUser.avatar_url || ""}
            name={item.otherUser.username || ""}
            className="size-[50px]"
          />
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold">{item.otherUser.username}</h3>
            <p className="text-sm text-gray-500 line-clamp-1">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit
            </p>
          </div>
          <div className="size-2.5 rounded-full bg-[var(--success-500)] absolute left-10 bottom-1" />
        </div>
      </NavLink>
    );
  });


  return (
    <section>
      <Card className="shadow-none rounded-md gap-0 p-0 mb-20 sm:mb-0">
        <CardHeader className=" flex justify-start items-center py-4">
          <CardTitle>
            {isMobile && conversationId ? (
              <Link to="/messages">
                <Button
                  variant="ghost"
                  className="ml-auto text-[var(--neutral-600)]"
                  title="Back to Messages"
                >
                  <ChevronLeft className="w-5 h-5 mr-1" /> Back
                </Button>
              </Link>
            ) : (
              "Messages"
            )}
          </CardTitle>
          <Badge variant="outline" className="ml-auto">
            Online
          </Badge>
        </CardHeader>
        <Separator />
        <CardContent
          className={`flex flex-col sm:flex-row gap-4 sm:gap-0  p-0`}
        >
          <section
            className={`flex flex-row  sm:flex-col  w-full sm:w-[150px] md:w-[180px] lg:w-[240px]   ${
              !conversationId
                ? "flex-1 border-none"
                : "border-b sm:border-r border-input"
            } ${isMobile && conversationId ? "hidden" : ""}`}
          >
            <div className="py-2 px-4">
              {isLoading ? (
                <Skeleton className="h-[50px] w-full" />
              ) : data?.length !== undefined && data?.length > 0 ? (
                renderLinks
              ) : <NoResults />}{" "}
            </div>
          </section>

          <section className="flex-1 py-2 px-4">
            <Outlet />
          </section>
        </CardContent>
      </Card>
    </section>
  );
};

export default Index;
