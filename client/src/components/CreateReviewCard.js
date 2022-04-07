import React, { useEffect, useState } from "react";
import {
  Typography,
  Rating,
  Box,
  Snackbar,
  Button,
  Card,
  TextareaAutosize,
  Modal,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import frLocale from "date-fns/locale/fr";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { findResidences } from "../utils/api-residence";
import { registerReview } from "../utils/api-review";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

export default function CreateReviewCard() {
  let navigate = useNavigate();

  const [description, setDescription] = useState(null);
  const [title, setTitle] = useState("Title");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [rating, setRating] = useState(5);
  const [residences, setResidences] = useState([]);
  const [residence, setResidence] = useState(0);
  const [message, setMessage] = useState("Incorrect fields");

  const [loading, setLoading] = useState(true);
  const [badRating, setBadRating] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleCloseBadRating = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setBadRating(false);
    navigate(`/`);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const fetchData = async () => {
    findResidences().then((data) => {
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

  var today = new Date();

  const sendEmail = () => {
    window.location = "mailto:thedanielesguerra@gmail.com?subject=Esguerra Residences";
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      endDate <= startDate ||
      startDate > today ||
      endDate > today ||
      endDate == null ||
      startDate == null ||
      residence == null ||
      description == null ||
      rating == null
    ) {
      setOpen(true);
    } else {
      var obj = JSON.parse(sessionStorage.getItem("jwt"));
      const review = {
        title: title || undefined,
        review: description || undefined,
        fromDate: startDate || undefined,
        toDate: endDate || undefined,
        author: obj.user._id,
        residence: residences[residence]._id,
        rating: rating || undefined,
      };

      registerReview(review).then((data) => {
        if (!data) {
          console.log(data.error);
        }
        console.log(data)
        setMessage(data.message);
        setOpen(true);
        if (rating < 5) {
          setBadRating(true);
        } else {
          navigate(`/`);
        }
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      {loading ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Card sx={{ maxWidth: 600, padding: 5, margin: 3, boxShadow: 5 }}>
            <Typography component="h1" variant="h5">
              Write a Review
            </Typography>
            <Box
              component="form"
              noValidate
              sx={{
                mt: 1,
                width: 400,
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Address under Review
                </InputLabel>
                <Select
                  id="demo-simple-select"
                  value={residence}
                  onChange={(e) => setResidence(e.target.value)}
                >
                  {residences != null &&
                    Array.isArray(residences) &&
                    residences.map(function (menuItem, index) {
                      return (
                        <MenuItem value={index} key={menuItem.address}>
                          {menuItem.address}
                        </MenuItem>
                      );
                    })}
                </Select>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="title"
                  label="Review Title"
                  name="title"
                  autoFocus
                  onChange={(e) => setTitle(e.target.value)}
                />
                <TextareaAutosize
                  maxRows={4}
                  placeholder="Write a review. What did you like or not like about this residence?"
                  style={{ height: 100 }}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
                <br />
                <LocalizationProvider
                  dateAdapter={AdapterDateFns}
                  locale={frLocale}
                >
                  <DatePicker
                    label="Start Date"
                    value={startDate}
                    minDate={new Date("01-01-2019")}
                    onChange={(startDate) => {
                      setStartDate(startDate);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                  <br />
                  <DatePicker
                    label="End Date"
                    value={endDate}
                    minDate={new Date("01-01-2019")}
                    maxDate={
                      new Date(
                        today.getDate() +
                          "-" +
                          today.getMonth() +
                          1 +
                          "-" +
                          today.getFullYear()
                      )
                    }
                    onChange={(endDate) => {
                      setEndDate(endDate);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
                <br />
                <Rating
                  name="rating"
                  value={rating}
                  onClick={(e) => {
                    setRating(parseInt(e.target.value));
                  }}
                />
                <br />
                <Button
                  type="submit"
                  variant="contained"
                  color="inherit"
                  onClick={handleSubmit}
                >
                  Create Review
                </Button>
                <Snackbar
                  open={open}
                  anchorOrigin={{ horizontal: "center", vertical: "top" }}
                  autoHideDuration={3000}
                  onClose={handleClose}
                  message={message}
                  action={action}
                />
                <Modal
                  open={badRating}
                >
                  <Card
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      padding: 5,
                      margin: 15,
                      boxShadow: 5,
                    }}
                  >
                    <Typography variant="h6" id="modal-title">  
                      We noticed you did not give us a 5-star review. Would you
                      like to give us some feedback?
                    </Typography>
                    <Button onClick={sendEmail}>Give Feedback!</Button>
                    <Button onClick={handleCloseBadRating}>No Thanks! :D</Button>
                  </Card>
                </Modal>
              </FormControl>
            </Box>
          </Card>
        </Box>
      )}
    </ThemeProvider>
  );
}