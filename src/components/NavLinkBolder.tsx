"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Bold text in navbar based on current route */
const NavLinkBolder = () => {
  const pathname = usePathname();

  useEffect(() => {
    const discoverLink = document.getElementById("discover-link");
    const profileLink = document.getElementById("profile-link");
    const createCafeLink = document.getElementById("create-cafe-link");

    if (pathname === "/discover") {
      discoverLink?.classList.add("text-primary");
      profileLink?.classList.remove("text-primary");
      createCafeLink?.classList.remove("text-primary");
    } else if (pathname === "/profile") {
      discoverLink?.classList.remove("text-primary");
      profileLink?.classList.add("text-primary");
      createCafeLink?.classList.remove("text-primary");
    } else if (pathname === "/create-cafe") {
      discoverLink?.classList.remove("text-primary");
      profileLink?.classList.remove("text-primary");
      createCafeLink?.classList.add("text-primary");
    }
  }, [pathname]);

  return null;
};

export default NavLinkBolder;
