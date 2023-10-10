import { useEffect, useRef, useState } from "react";
import "scrollyfills";
import { scrollIntoView } from "seamless-scroll-polyfill";
import { Box, Stack, Typography } from "@mui/material";
import { Messages } from "./Messages";

export const Pull = () => {
  const [status, setStatus] = useState("Pull to refresh");
  const pullToRefreshRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;
    scrollIntoView(contentRef.current, { block: "nearest" });
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const handlePullToRefresh = () => {
      if (!pullToRefreshRef.current) return;
      if (pullToRefreshRef.current.scrollTop <= 0) {
        setStatus("refreshing...");

        setTimeout(() => {
          setStatus("done!");

          setTimeout(() => {
            if (!contentRef.current) return;
            scrollIntoView(contentRef.current, {
              behavior: "smooth",
              block: "nearest",
            });
            setStatus("Pull to refresh");
          }, 500);
        }, 1000);
      }
    };

    container?.addEventListener("scrollend", handlePullToRefresh);
    return () =>
      container?.removeEventListener("scrollend", handlePullToRefresh);
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
            <Typography>{status}</Typography>
          </Stack>
          <Box ref={contentRef}>
            <Box ref={contentRef}>
              <Messages />
            </Box>
          </Box>
        </Box>
      </Stack>
    </Stack>
  );
};
