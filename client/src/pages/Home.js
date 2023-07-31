import { Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Item from "../components/Item";

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
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
    </Container>
  );
}
