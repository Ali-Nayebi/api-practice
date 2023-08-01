import { Button, Container, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Item from "../components/Item";

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState([]);
  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3001")
      .then((response) => response.json())
      .then((responseJson) => {
        setData(responseJson.data);
        setLoading(false);
      });
  }, []);
  const onDeleteClick = (id) => {
    axios.delete("http://localhost:3001/delete?id=" + id).then((response) => {
      if (response.status === 200) {
        setData(response.data.data);
      }
    });
  };
  let status;
  const add = () => {
    setDisabled(true);
    fetch("http://localhost:3001/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        image: image,
        price: price,
      }),
    })
      .then((response) => {
        status = response.status;
        return response.json();
      })
      .then((responsJson) => {
        if (status === 201) {
          setData(responsJson.data);
          setTitle("");
          setImage("");
          setPrice("");
        } else if (status === 400) {
          setErrors(responsJson.errors);
        }
        setDisabled(false);
      });
  };
  return (
    <Container maxWidth="lg">
      <Grid container style={{ marginTop: 15 }}>
        {loading ? (
          <span>loading</span>
        ) : (
          data.map((item) => (
            <Item
              key={item.id}
              image={item.image}
              title={item.title}
              price={item.price}
              ondelete={() => onDeleteClick(item.id)}
            />
          ))
        )}
      </Grid>
      <Grid container>
        <TextField
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ margin: 10 }}
          label="عنوان"
        />
        <TextField
          value={image}
          onChange={(e) => setImage(e.target.value)}
          style={{ margin: 10 }}
          label="آدرس عکس"
        />
        <TextField
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={{ margin: 10 }}
          label="قیمت"
        />
        <Button disabled={disabled} onClick={add}>
          اضافه کردن
        </Button>
      </Grid>
      {errors.map((e) => (
        <li key={e.key}>
          {e.key}:{e.errorText}
        </li>
      ))}
    </Container>
  );
}
