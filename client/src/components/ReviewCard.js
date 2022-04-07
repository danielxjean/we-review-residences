import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/typography";
import {
  Avatar,
  Rating,
  Card,
  CardHeader,
  CardContent,
  Stack,
  Box,
  Grid,
} from "@mui/material";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { findReviewsByResidenceId } from "../utils/api-review";

function ReviewCard(props) {
  const [loading, setLoading] = useState(true);
  const [residences, setResidences] = useState([]);
  const { residenceId } = useParams();

  const fetchData = async () => {
    await findReviewsByResidenceId(residenceId).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setResidences(data);
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    fetchData();
  }, [loading]);

  function monthsStayed(toDate, fromDate) {
    var number =
      parseInt(new Date(toDate).getMonth()) -
      parseInt(new Date(fromDate).getMonth());
    if (number === 0) return 1;
    return number;
  }

  return (
    <>
      {loading ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      ) : residences.length === 0 ? (
        <Grid
          container
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: "100vh", padding: 10, margin: 10 }}
        >
          <Grid item xs={3}>
            <Card>
              <h4>
                There are currently no reviews for this residence, please come
                back again later!
              </h4>
            </Card>
          </Grid>
        </Grid>
      ) : (
        <>
        <Grid
          container
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: "100vh", padding: 10, margin: 10 }}
        >
          <Grid item xs={3}>
          {residences.map(function(review, index) {
            return(
              <>
            { review.review_author.map((val) => (
            <Card
              sx={{ maxWidth: 600, padding: 5, margin: 3, boxShadow: 5 }}
              key={index}
            >
              <CardHeader
                avatar={
                  <Avatar
                    style={{ backgroundColor: "#1976d2" }}
                    {...stringAvatar(val.firstName + ' ' + val.lastName)}
                  />
                }
                title={review.title}
                subheader={"Review " + (index + 1) + " written by " + val.firstName }
              />
              <Stack spacing={3}>
                <CardContent>
                  <Typography variant="body1" color="text.secondary" style={{whiteSpace: 'pre-line'}}>
                    {review.review}
                  </Typography>
                  <br />
                  <Typography component="h2">Rating</Typography>
                  <br />
                  <Rating name="read-only" value={review.rating} readOnly />
                  <br />
                  <br />
                  <Typography component="legend">
                    The respondent has stayed{" "}
                    {monthsStayed(review.toDate, review.fromDate)} months at
                    this address from{" "}
                    {new Date(review.fromDate).toLocaleString("default", {
                      month: "long",
                    }) +
                      " " +
                      new Date(review.fromDate).getFullYear()}{" "}
                    to
                    {" " +
                      new Date(review.toDate).toLocaleString("default", {
                        month: "long",
                      }) +
                      " " +
                      new Date(review.toDate).getFullYear()}
                  </Typography>
                </CardContent>
              </Stack>
            </Card>
          ))}
          </>
          )})}
          </Grid>
        </Grid>
          {/* {reviews.map((review, index) => (
            <Card
              sx={{ maxWidth: 600, padding: 5, margin: 3, boxShadow: 5 }}
              key={index}
            >
              <CardHeader
                avatar={<Avatar {...stringAvatar("Kent Dodds")} />}
                title={review.title}
                subheader={review.froDate}
              />
              <Stack spacing={3}>
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {review.description}
                  </Typography>
                  <Typography component="h2">Rating</Typography>
                  <Rating name="read-only" value={5} readOnly />
                  <Typography component="legend">
                    The respondent has stayed{" "}
                    {new Date(review.endDate).getMonth() -
                      parseInt(new Date(review.startDate).getMonth())}{" "}
                    months at this address from{" "}
                    {review.startDate.toLocaleString("default", {
                      month: "long",
                    })}{" "}
                    to {review.endDate}
                  </Typography>
                </CardContent>
              </Stack>
            </Card>
          ))} */}
        </>
      )}
    </>
  );
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: "red",
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

export default ReviewCard;
