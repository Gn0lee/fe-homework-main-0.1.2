import { Container, Grid2, Typography } from "@mui/material";

function App() {
  return (
    <Container style={{ padding: "2rem", width: "100%", height: "100%" }}>
      <Grid2 container>
        <Typography variant="h1" style={{ fontSize: "24px", fontWeight: 600 }}>
          Your Fleet
        </Typography>
      </Grid2>
    </Container>
  );
}

export default App;
