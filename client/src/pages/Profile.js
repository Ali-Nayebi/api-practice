/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [email, setEmail] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    let status;
    fetch("http://localhost:3001/profile", {
      method: "GET",
      headers: {
        Authorization: localStorage.token_type + " " + localStorage.token,
      },
    })
      .then((response) => {
        status = response.status;
        return response.json();
      })
      .then((responseJson) => {
        if (status === 401) {
          navigate("/login");
        } else if (status === 200) {
          setEmail(responseJson.user.email);
        }
      });
  }, []);
  return (
    <div>
      {email}
      <Button
        onClick={() => {
          localStorage.clear();
          window.location.reload();
        }}
      >
        logout
      </Button>
    </div>
  );
}
