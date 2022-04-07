import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { Box, Card, Typography, Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

function About() {
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="lg">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Card
            sx={{
              width: 600,
              padding: 10,
              paddingLeft: 20,
              paddingRight: 20,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              boxShadow: 5,
            }}
          >
            <Typography component="h1" variant="h5">
              About
            </Typography>
            <Card
              sx={{
                margin: 2,
                padding: 2,
                boxShadow: 5,
                width: 800
              }}
            >
              <Typography sx={{ fontWeight: "bold" }} variant="h6">
                Who am I?
              </Typography>
              <br />
              <Typography
                variant="body1"
              >
                I was a Software Engineering undergraduate student at Concordia
                from 2018 to 2022. I wanted to make a project that was fun but
                also useful for my family's student residence business.
              </Typography>
            </Card>

            <Card
              sx={{
                margin: 2,
                padding: 2,
                boxShadow: 5,
                width: 800
              }}
            >
              <Typography variant="h6">Who are we?</Typography>

              <Typography variant="body1">
                The residences in this website are properties of the Esguerra
                family. My parents have hosted students for almost 20 years,
                ever since i was a child. We have received students from schools
                such as Concordia, ILSC, Lasalle, Vanier, McGill and many more
                language schools in Montreal. We have hosted students from than
                50 countries around the world. Some of these students have
                stayed with us as little as one week, others have stayed for
                more than 2 years, but the average student has usually stayed
                with us for about 6 months or 1 semester.
              </Typography>
            </Card>

            <Card
              sx={{
                margin: 2,
                padding: 2,
                boxShadow: 5,
                width: 800
              }}
            >
              <Typography variant="h6">
                Who has left a rating on a residence?
              </Typography>
              <Typography variant="body1">
                I made this WebApp in the Winter of 2022, I have contacted
                students who have stayed with us from 2019 and asked them if
                they were willing to give a review. Therefore, the reviews on
                this website written by real students who were asked to give their
                honest opinion of their experience with us after they have left
                our residence. If you decide to stay with
                us, I will ask you to leave a review after you leave as well!
              </Typography>
            </Card>

            <Typography variant="body1">
              If you have any questions about our residences or would like to
              rent a room, feel free to contact me (Daniel) at &nbsp;
              <a href="mailto:thedanielesguerra@gmail.com?subject=Esguerra Residences">
                thedanielesguerra@gmail.com
              </a>{" "}
              .
            </Typography>
          </Card>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default About;
