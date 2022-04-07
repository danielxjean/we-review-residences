import React, { useState } from "react";
import {
  Box,
  Snackbar,
  IconButton,
  TextareaAutosize,
  Button,
  TextField,
  Typography,
  Card,
  FormControl,
} from "@mui/material";
import frLocale from "date-fns/locale/fr";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import CloseIcon from "@mui/icons-material/Close";
import { registerResidence } from "../utils/api-residence";

const theme = createTheme();

export default function CreateResidenceCard() {
  const [residence, setResidence] = useState("");
  const [description, setDescription] = useState("Title");
  const [hostingSince, setHostingSince] = useState(new Date().getFullYear());
  const [message, setMessage] = useState("Incorrect fields");

  const rating = 5;

  const [open, setOpen] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      hostingSince == null ||
      rating == null ||
      residence == null ||
      description == null
    ) {
      setOpen(true);
    } else {
      var obj = JSON.parse(sessionStorage.getItem("jwt"));
      const res = {
        address: residence || undefined,
        description: description || undefined,
        hostingSince: hostingSince.getFullYear() || undefined,
        averageRating: rating || undefined,
        author: obj.user._id,
      };

      registerResidence(res).then((data) => {
        if (!data) {
          console.log(data.error);
        }
        setMessage(data.message);
        setOpen(true);
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Card sx={{ maxWidth: 600, padding: 5, margin: 3, boxShadow: 5 }}>
          <Typography component="h1" variant="h5">
            Add a Residence
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{
              mt: 1,
              width: 400,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <FormControl fullWidth>
              <TextField
                margin="normal"
                required
                fullWidth
                id="address"
                label="Residence Address"
                name="address"
                autoFocus
                onChange={(e) => {
                  setResidence(e.target.value);
                }}
              />
              <TextareaAutosize
                required
                maxRows={4}
                placeholder="Describe this address"
                style={{ height: 100, maxWidth: 400 }}
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
                  required
                  views={["year"]}
                  inputFormat="yyyy"
                  label="Start Date"
                  value={hostingSince}
                  onChange={(date) => {
                    setHostingSince(new Date(date));
                  }}
                  animateYearScrolling
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              <br />

              <Button
                type="submit"
                variant="contained"
                color="inherit"
                onClick={handleSubmit}
              >
                Create new Residence
              </Button>
              <Snackbar
                open={open}
                anchorOrigin={{ horizontal: "center", vertical: "top" }}
                autoHideDuration={3000}
                onClose={handleClose}
                message={message}
                action={action}
              />
            </FormControl>
          </Box>
        </Card>
      </Box>
    </ThemeProvider>
  );
}
