import { useContext, useState } from "react";
import { createContext } from "react";

type LibraryContext = {
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
};

const initialState = {
  toggle: false,
  setToggle: () => {},
};

const LibraryContext = createContext<LibraryContext>(initialState);

export function LibraryProvider({ children }: { children: JSX.Element }) {
  const [toggle, setToggle] = useState<boolean>(false);
  return (
    <LibraryContext.Provider
      value={{
        toggle,
        setToggle,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
}

export const useLibraryContext = () => useContext(LibraryContext);
