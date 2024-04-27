"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Bold text in navbar based on current route */
const NavLinkBolder = () => {
  const pathname = usePathname();

  useEffect(() => {
    const discoverLinks = document.querySelectorAll(".discover-link");
    const profileLinks = document.querySelectorAll(".profile-link");
    const createCafeLinks = document.querySelectorAll(".create-cafe-link");

    if (pathname === "/discover") {
      discoverLinks.forEach((link) => {
        link.classList.add("text-primary");
        link.classList.remove("text-muted-foreground");
      });

      [...profileLinks, ...createCafeLinks].forEach((link) => {
        link.classList.remove("text-primary");
        link.classList.add("text-muted-foreground");
      });
    } else if (pathname === "/profile") {
      profileLinks.forEach((link) => {
        link.classList.add("text-primary");
        link.classList.remove("text-muted-foreground");
      });

      [...discoverLinks, ...createCafeLinks].forEach((link) => {
        link.classList.remove("text-primary");
        link.classList.add("text-muted-foreground");
      });
    } else if (pathname === "/create-cafe") {
      createCafeLinks.forEach((link) => {
        link.classList.add("text-primary");
        link.classList.remove("text-muted-foreground");
      });

      [...discoverLinks, ...profileLinks].forEach((link) => {
        link.classList.remove("text-primary");
        link.classList.add("text-muted-foreground");
      });
    }
  }, [pathname]);

  return null;
};

export default NavLinkBolder;
