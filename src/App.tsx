import { useEffect, useRef, useState } from "react";
import "scrollyfills";
import { Box, Stack, Typography } from "@mui/material";
import "./App.css";

export default function App() {
  const [message, setMessage] = useState("Pull to refresh");
  // const ptr_scrollport = document.querySelector("html");
  // const ptr = document.querySelector("#refresh");
  // const main = document.querySelector("#refresh-main");
  const ptr_scrollport = useRef<HTMLDivElement>(null);
  const ptr = useRef<HTMLDivElement>(null);
  const main = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!main.current) return;
    main.current.scrollIntoView();
  }, []);

  useEffect(() => {
    const handlePullToRefresh = () => {
      if (!ptr.current || !ptr_scrollport.current) return;
      if (ptr_scrollport.current.scrollTop <= 0) {
        setMessage("refreshing...");
        ptr.current.setAttribute("loading-state", "loading");

        setTimeout(() => {
          if (!ptr.current) return;
          setMessage("done!");

          setTimeout(() => {
            if (!ptr.current || !main.current) return;
            ptr.current.removeAttribute("loading-state");
            main.current.scrollIntoView({ behavior: "smooth" });

            window.addEventListener(
              "scrollend",
              () => {
                setMessage("Pull to refresh");
              },
              { once: true }
            );
          }, 500);
        }, 1000);
      }
    };

    window.addEventListener("scrollend", handlePullToRefresh);
  });

  return (
    <Stack alignItems="center" sx={{ overscrollBehavior: "none" }}>
      <Box
        className="container"
        ref={ptr_scrollport}
        sx={{
          scrollSnapType: "y mandatory",
          overscrollBehavior: "contain",
          scrollBehavior: "smooth",
        }}
      >
        <Box id="refresh" ref={ptr}>
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
          <Typography>{message}</Typography>
        </Box>
        <Box
          id="refresh-main"
          ref={main}
          sx={{
            scrollSnapAlign: "start",
            scrollSnapStop: "always",
            minBlockSize: "200vh",
          }}
        >
          <Typography width={400}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
            laborum illo autem asperiores. Numquam voluptate facilis odit
            impedit non autem magni architecto, placeat voluptatum dolorem nemo
            doloremque velit, iure id.
          </Typography>
        </Box>
      </Box>
    </Stack>
  );
}
