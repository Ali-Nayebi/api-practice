/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Item from "../components/Item";

export default function Paginate() {
  const [data, setData] = useState([]);
  const [cp, setcp] = useState(0);
  const [lp, setlp] = useState(0);
  const [count, setCount] = useState(0);
  let { page } = useParams();
  useEffect(() => {
    let status;
    page = page ? page : 1;
    fetch("http://localhost:3001/paginate?page=" + page)
      .then((response) => {
        status = response.status;
        return response.json();
      })
      .then((responsJson) => {
        setData(responsJson.data);
        setcp(responsJson.current_page);
        setlp(responsJson.last_page);
        setCount(responsJson.last_page);
        console.log(responsJson);
      });
  }, []);
  return (
    <Container maxWidth="lg">
      <Grid container style={{ marginTop: 15 }}>
        {data.map((item) => (
          <Item
            key={item.id}
            image={item.image}
            title={item.title}
            price={item.price}
            ondelete={() => {}}
            onupdate={() => {}}
          />
        ))}
      </Grid>
    </Container>
  );
}
