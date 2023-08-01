import {
  Button,
  Container,
  Grid,
  Snackbar,
  SnackbarContent,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);
  const navigate = useNavigate();

  const signup = () => {
    let status;
    fetch("http://localhost:3001/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => {
        status = response.status;
        return response.json();
      })
      .then((responseJson) => {
        if (status === 400) {
          responseJson.errors.forEach((error) => {
            if (error.key === "email") {
              setEmailError(error.errorText);
            } else if (error.key === "password") {
              setPasswordError(error.errorText);
            }
          });
        } else if (status === 201) {
          setOpen(true);
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        } else {
          setOpenError(true);
        }
      });
  };

  return (
    <Container
      maxWidth="md"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Grid
        item
        lg={6}
        style={{
          marginTop: 20,
          padding: 20,
          border: "1px solid #a1a1a1",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TextField
          inputProps={{
            onFocus: () => {
              setEmailError("");
            },
          }}
          error={emailError.length > 0}
          helperText={emailError}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginTop: 10 }}
          label="ایمیل"
        />
        <TextField
          inputProps={{
            onFocus: () => {
              setPasswordError("");
            },
          }}
          error={passwordError.length > 0}
          helperText={passwordError}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginTop: 30 }}
          label="پسورد"
          type="password"
        />
        <Button onClick={signup} style={{ marginTop: 30 }}>
          ثبت نام
        </Button>
      </Grid>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={open}
        onClose={() => setOpen(false)}
        autoHideDuration={3000}
      >
        <SnackbarContent
          message="ثبت نام با موفقیت انجام شد"
          style={{ backgroundColor: "green" }}
        ></SnackbarContent>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={openError}
        onClose={() => setOpenError(false)}
        autoHideDuration={3000}
      >
        <SnackbarContent
          message="خطایی در ارتباط با سرور اتفاق افتاده، دوباره تلاش کنید"
          style={{ backgroundColor: "red" }}
        ></SnackbarContent>
      </Snackbar>
    </Container>
  );
}
