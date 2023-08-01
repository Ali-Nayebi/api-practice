import { Button, Grid, Typography } from "@mui/material";
import React from "react";

export default function Item({ image, title, price, ondelete, onupdate }) {
  return (
    <Grid
      item
      lg={3}
      style={{
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ border: "1px solid #a1a1a1" }}>
        <img style={{ width: "100%", height: 200 }} src={image} alt="" />
        <Typography variant="h6" style={{ textAlign: "center" }}>
          {title}
        </Typography>
        <Typography
          variant="body1"
          style={{ textAlign: "center", marginBottom: 10 }}
        >
          {price} هزار تومان
        </Typography>
        <Button onClick={ondelete}>حذف</Button>
        <Button onClick={onupdate}>ویرایش</Button>
      </div>
    </Grid>
  );
}
