import express from "express";
import bodyParser from "body-parser";
import http from "http";
import crypto from "crypto";
let users = [];
const app = express();
function App() {
  const server = http.createServer(app);
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.get("/", (req, res) => {
    res.json({ name: "farshid mother fucker" });
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
        res.status(403).json({ errorText: "کتربری با این مشخصات یافت نشد" });
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
