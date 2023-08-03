import React, { useState } from "react";

export default function Upload() {
  const [file, setFile] = useState("");
  const [txt, setTxt] = useState();
  const upload = () => {
    let status;
    let FD = new FormData();
    FD.append("image", file);
    fetch("http://localhost:3001/upload", {
      method: "POST",
      body: FD,
    })
      .then((response) => {
        status = response.status;
        return response.json();
      })
      .then((responseJson) => {
        if (status === 201) {
          setTxt("آپلود با موفقیت انجام شد");
        } else if (status === 400) {
          setTxt(responseJson.errorText);
        } else {
            setTxt("در ارتباط با سرور مشکلی به وجود آمده است")
        }
      });
  };
  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <input onClick={upload} type="button" value="آپلود" />
      <span>{txt}</span>
    </div>
  );
}
