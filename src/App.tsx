import { Container, Grid2, Typography } from "@mui/material";

import SearchContainer from "./components/SearchContainer";
import LocationTable from "./components/LocationTable";

function App() {
  return (
    <Container style={{ padding: "2rem", width: "100%", height: "100%" }}>
      <Grid2 container direction="column" spacing={2}>
        <Grid2>
          <Typography
            variant="h1"
            style={{ fontSize: "24px", fontWeight: 600 }}
          >
            Your Fleet
          </Typography>
        </Grid2>
        <Grid2 size="grow">
          <SearchContainer />
        </Grid2>
        <Grid2>
          <LocationTable />
        </Grid2>
      </Grid2>
    </Container>
  );
}

export default App;
