import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const useActiveLink = (): string => {
  const [activeLink, setActiveLink] = useState<string>("Home");
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === "/") {
      setActiveLink("home");
    } else if (router.pathname === "/information") {
      setActiveLink("information");
    } else if (router.pathname.includes("/field-notes")) {
      setActiveLink("field-notes");
    } else {
      setActiveLink("");
    }
  }, [router]);

  return activeLink;
};

export default useActiveLink;
