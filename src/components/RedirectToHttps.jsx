import { useEffect } from "react";

const RedirectToHttps = () => {
  /* useEffect(() => {
    const { protocol, hostname } = window.location;
    if (
      protocol === "http:" &&
      hostname !== "localhost" &&
      hostname !== "127.0.0.1"
    ) {
      window.location.href = `https://${hostname}${window.location.pathname}${window.location.search}`;
    }
  }, []);
*/
  return null;
};

export default RedirectToHttps;
