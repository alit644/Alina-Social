import { useEffect, useRef } from "react";

export const useIntersectionObserver = (onIntersect: () => void, enabled: boolean) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
   const currentRef = ref.current;

    if (!enabled || !currentRef) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onIntersect();
        }
      },
      { threshold: 0.1 }
    );

    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [enabled, onIntersect]);

  return ref;
};
