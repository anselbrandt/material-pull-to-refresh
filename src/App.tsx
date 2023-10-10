import "scrollyfills";
import { Box, Stack } from "@mui/material";
import { Pull } from "./components/Pull";
export default function App() {
  return (
    <Stack alignItems="center">
      <Box height={400} width={400} sx={{ outline: "1px solid gainsboro" }}>
        <Pull />
      </Box>
    </Stack>
  );
}
