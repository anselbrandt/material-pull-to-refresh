import "scrollyfills";
import { Box, Stack } from "@mui/material";
import { Pull } from "./components/Pull";
export default function App() {
  return (
    <Stack alignItems="center">
      <Box height={400}>
        <Pull />
      </Box>
    </Stack>
  );
}
