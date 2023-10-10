import { useEffect, useRef, useState } from "react";
import "scrollyfills";
import { Box, Stack, Typography } from "@mui/material";
import { Messages } from "./Messages";

export const Pull = () => {
  const [message, setMessage] = useState("Pull to refresh");
  const pullToRefreshRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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
            setMessage("Pull to refresh");
          }, 500);
        }, 1000);
      }
    };

    containerRef.current?.addEventListener("scrollend", handlePullToRefresh);
    return () =>
      containerRef.current?.removeEventListener(
        "scrollend",
        handlePullToRefresh
      );
  });
  return (
    <Stack
      height={1}
      sx={{ overflowY: "scroll", overscrollBehavior: "contain" }}
      ref={containerRef}
    >
      <Stack sx={{ overscrollBehavior: "none" }}>
        <Box
          className="container"
          ref={pullToRefreshRef}
          sx={{
            overscrollBehavior: "contain",
            scrollBehavior: "smooth",
          }}
        >
          <Stack height={150} alignItems="center" justifyContent="center">
            <Typography>{message}</Typography>
          </Stack>
          <Box ref={contentRef}>
            <Stack spacing={2}>
              <Messages />
            </Stack>
          </Box>
        </Box>
      </Stack>
    </Stack>
  );
};
