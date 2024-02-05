import { useState } from "react";

export const useMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openMenu = () => setIsOpen(true);

  const closeMenu = () => setIsOpen(false);

  return { isOpen, openMenu, closeMenu };
};
