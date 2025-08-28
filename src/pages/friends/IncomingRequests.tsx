import type { IFriendRequest } from "@/interfaces";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import MAvatar from "@/components/shared/MAvatar";
import { Button } from "@/components/ui/button";
import { useCallback } from "react";
import NoResults from "@/components/shared/NoResults";
import useIncomingRequests from "@/hooks/friends/use-incoming-requests";
import useOutgoingRequests from "@/hooks/friends/use-outgoing-requests";
import useConfirmRequest from "@/hooks/friends/use-confirm";
import useRejectRequest from "@/hooks/friends/use-reject";
import useCancelRequest from "@/hooks/friends/use-cancel";
const IncomingRequests = () => {
  const { data, isLoading: isLoadingIncomingRequests } = useIncomingRequests();
  const { data: outgoingData, isLoading: isLoadingOutgoingRequests } =
    useOutgoingRequests();
  const { mutateAsync, isPending: isLoadingConfirmRequest } =
    useConfirmRequest();
  const { mutateAsync: rejectMutate, isPending: isLoadinRejectRequests } =
    useRejectRequest();
  const { mutateAsync: cancelMutate, isPending: isLoadingCancelRequest } =
    useCancelRequest();

  const isLoading = isLoadingIncomingRequests || isLoadingOutgoingRequests;

  const handleAccept = useCallback(
    async (requestId: string) => {
      await mutateAsync(requestId);
    },
    [mutateAsync]
  );

  const handleReject = useCallback(
    async (requestId: string) => {
      await rejectMutate(requestId);
    },
    [rejectMutate]
  );

  const handleCancel = useCallback(
    async (requestId: string) => {
      await cancelMutate(requestId);
    },
    [cancelMutate]
  );

  const renderData = data?.map((item: IFriendRequest) => (
    <div
      className="flex justify-between items-center gap-3 not-last:mb-4 "
      key={item.id}
    >
      <div className={`flex items-center gap-2 `}>
        <MAvatar
          src={item.sender?.avatar_url || ""}
          name={item.sender?.full_name || ""}
          className="size-[50px]"
        />
        <div className="flex flex-col">
          <h3 className="text-md sm:text-lg font-semibold">
            {item.sender?.full_name}{" "}
          </h3>
          <p className="text-sm text-gray-500">@{item.sender?.username}</p>
        </div>
      </div>
      {/* accept and reject */}
      <div className="flex items-center gap-2">
        <Button
          variant="default"
          onClick={() => handleAccept(item.id)}
          disabled={isLoadingConfirmRequest}
        >
          Confirm
        </Button>
        <Button
          variant="ghost"
          className="bg-[var(--neutral-100)] hover:bg-[var(--neutral-200)] text-[var(--neutral-800)]"
          onClick={() => handleReject(item.id)}
          disabled={isLoadinRejectRequests}
        >
          Delete
        </Button>
      </div>
    </div>
  ));
  const renderOutgoingData = outgoingData?.map((item: IFriendRequest) => (
    <div
      className="flex justify-between items-center gap-3 not-last:mb-4 "
      key={item.id}
    >
      <div className={`flex items-center gap-2 `}>
        <MAvatar
          src={item.receiver?.avatar_url || ""}
          name={item.receiver?.full_name || ""}
          className="size-[50px]"
        />
        <div className="flex flex-col">
          <h3 className="text-md sm:text-lg font-semibold">
            {item.receiver?.full_name}{" "}
          </h3>
          <p className="text-sm text-gray-500">@{item.receiver?.username}</p>
        </div>
      </div>
      {/* accept and reject */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          className="border-[var(--danger-200)] text-[var(--danger-500)]"
          onClick={() => handleCancel(item.id)}
          disabled={isLoadingCancelRequest}
        >
          Cancel Request
        </Button>
      </div>
    </div>
  ));

  if (isLoading) return <div>Loading..</div>;

  return (
    <div>
      <section className="w-full">
        <Card className="shadow-none rounded-md ">
          <CardHeader>
            {/* الطلبات المرسلة إليّ */}
            <CardTitle className="H4">Incoming Requests</CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="px-2 sm:px-4">
            {data?.length !== undefined && data?.length > 0 ? (
              renderData
            ) : (
              <NoResults />
            )}
          </CardContent>
        </Card>
        <Card className="shadow-none rounded-md mt-6">
          <CardHeader>
            {/* الطلبات المرسلة إليّ */}
            <CardTitle className="H4">Outgoing Requests</CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="px-2 sm:px-4">
            {outgoingData?.length !== undefined && outgoingData?.length > 0 ? (
              renderOutgoingData
            ) : (
              <NoResults />
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default IncomingRequests;
