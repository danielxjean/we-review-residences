import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/typography";
import {
  Rating,
  Card,
  CardHeader,
  CardContent,
  Stack,
  Box,
  CardActions,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { findResidences } from "../utils/api-residence";
import { findResidencesWithReviews } from "../utils/api-review";

function ResidenceCard() {
  const [loading, setLoading] = useState(true);
  const [residences, setResidences] = useState([]);
  const [residencesWithReviews, setResidencesWithReviews] = useState([]);

  const fetchData = async () => {
    // findResidences().then((data) => {
    //   if (data.error) {
    //     console.log(data.error);
    //   } else {
    //     setResidences(data);
    //     // setLoading(false);
    //   }
    // });

    findResidencesWithReviews().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setResidencesWithReviews(data);
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    fetchData();
  }, [loading]);

  return (
    <>
      {loading ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {/* {residences != null &&
            Array.isArray(residences) &&
            residences.map(function (res, index) {
              return (
                <Card
                  sx={{ maxWidth: 600, padding: 5, margin: 3, boxShadow: 5 }}
                  key={res._id}
                >
                  <CardHeader
                    title={res.address}
                    subheader={"Hosting students since " + res.hostingSince}
                  />
                  <Stack spacing={4}>
                    <CardContent>
                      <Typography variant="body2" color="text.secondary" style={{whiteSpace: 'pre-line'}}>
                        {res.description.replace('/n', <br/>)}
                      </Typography>
                    <br/>
                    <Typography>Average rating from 5 respondents</Typography>
                    <br/>
                    <Rating name="read-only" value={res.averageRating} readOnly />
                    </CardContent>
                    <CardActions>
                      <Button size="small">
                        <Link to={`/reviews/${res._id}`}>View Reviews</Link>
                      </Button>
                    </CardActions>
                  </Stack>
                </Card>
              );
            })} */}

          { (residencesWithReviews != null &&
            Array.isArray(residencesWithReviews) ) ?
            residencesWithReviews.map(function (res, index) {
              return (
                <Card
                  sx={{ maxWidth: 600, padding: 5, margin: 3, boxShadow: 5 }}
                  key={res._id}
                >
                  {res.residence_detail.map((item) => (
                    <>
                      <CardHeader
                        title={item.address}
                        subheader={"Hosting students since " + item.hostingSince}
                      />
                      <Stack spacing={4}>
                        <CardContent>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            style={{ whiteSpace: "pre-line" }}
                          >
                            {item.description.replace("/n", <br />)}
                          </Typography>
                          <br />
                          <Typography>
                            Average rating from {res.count} respondents
                          </Typography>
                          <br />
                          <Rating
                            name="read-only"
                            value={res.rating}
                            precision={0.5}
                            readOnly
                          />
                        </CardContent>
                        <CardActions>
                          <Button size="small">
                            <Link to={`/reviews/${res._id}`}>View Reviews</Link>
                          </Button>
                        </CardActions>
                      </Stack>
                    </>
                  ))}
                </Card>
              );
            })
           : <Typography>There are currently no reviews for the residences, please come back later</Typography> 
          }
          <Typography>
            *** A Google Drive link will soon be posted with videos and images
            of the locations ***
          </Typography>
        </>
      )}
    </>
  );
}
export default ResidenceCard;

// TODO: Possible feature, roles where Advisors only are able to add a residence
// TODO: Create more user functions such as see myreviews and delete account