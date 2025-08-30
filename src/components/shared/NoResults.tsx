import { Users } from "lucide-react";
import { memo } from "react";
const NoResults = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center gap-6 px-4">
      <section className="bg-white dark:bg-gray-900 shadow-sm rounded-2xl p-8 flex flex-col items-center gap-4">
        <div className="flex flex-col items-center gap-4">
          {/* أيقونة مع حركة بسيطة */}
          <Users className="w-16 h-16 text-blue-500 animate-bounce" />

          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Oops! No results found.
          </h2>

          <p className="text-gray-500 dark:text-gray-400 max-w-xs">
            No results found. Try again.
          </p>

          <div className="flex gap-1 mt-4">
            <span className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></span>
            <span className="w-3 h-3 bg-pink-400 rounded-full animate-pulse delay-200"></span>
            <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse delay-400"></span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default memo(NoResults);
