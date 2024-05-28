import { useState } from "react";
import { createContext } from "react";

const LibraryContext = createContext<boolean>(false);

function LibraryProvider({ children }: JSX.Element) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return <LibraryContext.Provider value={}>{children}</LibraryContext.Provider>;
}
