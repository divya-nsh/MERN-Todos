import { RefObject, useEffect, useRef } from "react";

export default function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T>,
  cb: (event: "click-outside" | "esc-press") => void,
) {
  const cbRef = useRef(cb);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        cbRef.current("click-outside");
      }
    };
    const handleKeyboard = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        cbRef.current("esc-press");
      }
    };

    document.addEventListener("keydown", handleKeyboard);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyboard);
    };
  }, [ref]);
}
