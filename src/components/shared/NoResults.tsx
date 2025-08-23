import { Server } from "lucide-react";

const NoResults = () => {
  return (
    <section className="flex flex-col items-center justify-center">
      <Server className="size-12 text-[var(--primary-600)]" />
      <p className="H4 text-[var(--neutral-600)]  mt-4">No results found</p>
    </section>
  );
};

export default NoResults;
