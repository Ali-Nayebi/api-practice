import express from "express";
import bodyParser from "body-parser";
import http from "http";
import crypto from "crypto";
let users = [];
const app = express();
let data = [
  {
    id: 1,
    title: "northen light",
    price: 2,
    image:
      "https://www.freecodecamp.org/news/content/images/size/w2000/2022/09/jonatan-pie-3l3RwQdHRHg-unsplash.jpg",
  },
  {
    id: 2,
    title: "earth",
    price: 10,
    image:
      "https://www-cdn.eumetsat.int/files/styles/16_9_large/s3/2023-04/mtg-i1.jpg?h=d1cb525d&itok=O-COkB2i",
  },
  {
    id: 3,
    title: "black hole",
    price: 100,
    image: "https://cdn.eso.org/images/screen/eso1907a.jpg",
  },
];
let id = data.length;
function App() {
  const server = http.createServer(app);
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.get("/", (req, res) => {
    res.status(200).json({ data: data });
  });

  app.post("/add", (req, res) => {
    try {
      var errors = [];
      if (req.body.title.length < 1) {
        errors.push({ key: "title", errorText: "عنوان باید حتما وارد شود." });
        res.status(400).json({ errors: errors });
        return;
      }
      var price =
        req.body.price && req.body.price !== "" ? req.body.price : "0";
      var image = req.body.image && req.body.image !== "" ? req.body.image : "";
      data.push({
        id: id + 1,
        title: req.body.title,
        price: price,
        image: image,
      });
      id++;
      res.status(201).json({ data: data });
    } catch (e) {
      res.status(500).json({});
    }
  });

  app.delete("/delete", (req, res) => {
    let data2 = data;
    data = data2.filter((d) => {
      return !(d.id == req.query.id);
    });
    res.json({ data: data });
  });

  app.patch("/update", (req, res) => {
    var errors = [];
    if (req.body.title.length < 1) {
      errors.push({ key: "title", errorText: "عنوان باید حتما وارد شود." });
      res.status(400).json({ errors: errors });
      return;
    }
    data.forEach((d) => {
      if (d.id == req.query.id) {
        d.title = req.body.title;
      }
    });
    res.status(200).json({ data: data });
  });

  app.post("/signup", (req, res) => {
    try {
      var errors = [];
      var pattern = /^[a-z0-9]{1,}@[a-z0-9]{1,}\.[a-z]{1,}$/i;
      if (!pattern.test(req.body.email) || req.body.password.length < 6) {
        if (!pattern.test(req.body.email)) {
          errors.push({
            key: "email",
            errorText: "فرمت ایمیل وارد شده صحیح نمی باشد",
          });
        }
        if (req.body.password.length < 6) {
          errors.push({
            key: "password",
            errorText: "رمز عبور وارد شده حداقل باید 6 کاراکتر باشد",
          });
        }
        res.status(400).json({ errors: errors });
        return;
      }
      var err = false;
      users.forEach((user) => {
        if (user.email === req.body.email) {
          err = true;
        }
      });
      if (err) {
        errors.push({
          key: "email",
          errorText: "با این ایمیل قبلا ثبت نام انجام شده",
        });
        res.status(400).json({ errors: errors });
        return;
      }
      users.push({
        email: req.body.email,
        password: req.body.password,
        token: "",
      });
      console.log(users);
      res.status(201).json({});
    } catch (e) {
      res.status(500).json({});
    }
  });

  app.post("/signin", (req, res) => {
    try {
      var errors = [];
      var pattern = /^[a-z0-9]{1,}@[a-z0-9]{1,}\.[a-z]{1,}$/i;
      if (!pattern.test(req.body.email) || req.body.password.length < 6) {
        if (!pattern.test(req.body.email)) {
          errors.push({
            key: "email",
            errorText: "فرمت ایمیل وارد شده صحیح نمی باشد",
          });
        }
        if (req.body.password.length < 6) {
          errors.push({
            key: "password",
            errorText: "رمز عبور وارد شده حداقل باید 6 کاراکتر باشد",
          });
        }
        res.status(400).json({ errors: errors });
        return;
      }
      var token = crypto
        .createHmac("sha256", Date.now + req.body.email)
        .digest("base64");
      var success = false;
      users.forEach((user) => {
        if (
          user.email === req.body.email &&
          user.password === req.body.password
        ) {
          user.token = token;
          success = true;
        }
      });
      if (!success) {
        res.status(403).json({ errorText: "کاربری با این مشخصات یافت نشد" });
        return;
      }
      res.status(200).json({ token: token, token_type: "Bearer" });
    } catch (e) {
      res.status(500).json({});
    }
  });

  server.listen(3000, () => {
    console.log("server running on ort 3000");
  });
}
export default App;
