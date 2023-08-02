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

export default function Login() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [error, setError] = useState();
  const navigate = useNavigate();

  const Login = () => {
    let status;
    fetch("http://localhost:3001/signin", {
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
        } else if (status === 200) {
          setOpen(true);
          console.log(responseJson);
          localStorage.setItem("token", responseJson.token);
          localStorage.setItem("token_type", responseJson.token_type);
          setTimeout(() => {
            navigate("/profile");
          }, 1000);
        } else if (status === 403) {
          setError("کاربری با این مشخصات یافت نشد");
          setOpenError(true);
        } else {
          setError("مشکلی در ارتباط با سرور اتفاق افتاده، دوباره تلاش کنید");
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
        <Button onClick={Login} style={{ marginTop: 30 }}>
          ورود
        </Button>
      </Grid>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={open}
        onClose={() => setOpen(false)}
        autoHideDuration={3000}
      >
        <SnackbarContent
          message="ورود شما با موفقیت انجام شد"
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
          message={error}
          style={{ backgroundColor: "red" }}
        ></SnackbarContent>
      </Snackbar>
    </Container>
  );
}
