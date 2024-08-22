import { useLayoutEffect } from "react";

export function useWindowUnload() {
  useLayoutEffect(() => {
    function confirmUnload(e: BeforeUnloadEvent) {
      e.preventDefault();
      e.returnValue = true;
    }

    window.addEventListener("beforeunload", confirmUnload);

    return () => {
      window.removeEventListener("beforeunload", confirmUnload);
    };
  });
}
