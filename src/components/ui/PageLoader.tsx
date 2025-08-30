import { LoaderCircle } from "lucide-react";
import { memo } from "react";

const PageLoader = () => {
  return (
    <div className="flex items-center gap-2 flex-col justify-center h-screen w-full">
      <LoaderCircle
        className="animate-spin text-[var(--primary-900)]"
        size={30}
      />
      <p className="text-center text-2xl text-muted-foreground animate-pulse">
        Loading...
      </p>
    </div>
  );
};

export default memo(PageLoader);
