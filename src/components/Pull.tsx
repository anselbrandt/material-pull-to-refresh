import { useEffect, useRef, useState } from "react";
import "scrollyfills";
import { Box, Stack, Typography } from "@mui/material";

export const Pull = () => {
  const [message, setMessage] = useState("Pull to refresh");
  const pullToRefreshRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;
    contentRef.current.scrollIntoView();
  }, []);

  useEffect(() => {
    const handlePullToRefresh = () => {
      if (!pullToRefreshRef.current) return;
      if (pullToRefreshRef.current.scrollTop <= 0) {
        setMessage("refreshing...");

        setTimeout(() => {
          setMessage("done!");

          setTimeout(() => {
            if (!contentRef.current) return;
            contentRef.current.scrollIntoView({ behavior: "smooth" });

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
        ref={pullToRefreshRef}
        sx={{
          overscrollBehavior: "contain",
          scrollBehavior: "smooth",
        }}
      >
        <Stack
          alignContent="center"
          height={150}
          alignItems="center"
          justifyContent="center"
          sx={{
            background: "gainsboro",
            position: "relative",
          }}
        >
          <Typography>{message}</Typography>
        </Stack>
        <Box
          ref={contentRef}
          sx={{
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
};
