import { useEffect } from "react";

export function useDocumentTitle(title) {
  useEffect(() => {
    const previous = document.title;
    document.title = title ? `${title} · CoreUI-Kit` : "CoreUI-Kit";
    return () => {
      document.title = previous;
    };
  }, [title]);
}
