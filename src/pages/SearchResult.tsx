import FriendsCard from "@/components/shared/FriendsCard";
import { useSearchStore, type ISearchResult } from "@/store/useSearch";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import NoResults from "@/components/shared/NoResults";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import notify from "@/helper/notify";
import SearchQuery from "@/components/SearchQuery";
const SearchResult = () => {
  const [searchParams] = useSearchParams();
  const { getSearchQuery } = useSearchStore();
  const query = searchParams.get("query");
  const { data, isLoading, error } = useQuery({
    queryKey: ["search", query],
    queryFn: async () => {
      const result = await getSearchQuery(query || "");
      return result || [];
    },
    enabled: !!query,
    refetchOnWindowFocus: false,
    // 2 min
    staleTime: 120 * 1000,
    refetchInterval: 120 * 1000,
  });
  const renderData = data?.map((item: ISearchResult) => (
    <FriendsCard data={item} key={item.id} />
  ));
  if (error) {
    notify("error", error?.message || "Error Search User");
  }
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Search Result</CardTitle>
          {/* Mobile Search */}
          <div className="block sm:hidden">
            <SearchQuery />
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex flex-col gap-4">
              <Skeleton className="h-[60px]" />
              <Skeleton className="h-[60px]" />
            </div>
          ) : renderData?.length !== undefined && renderData?.length > 0 ? (
            renderData
          ) : (
            <NoResults />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SearchResult;
