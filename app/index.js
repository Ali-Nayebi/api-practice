import express from "express";
import bodyParser from "body-parser";
import http from "http";
const app = express();
function App() {
  const server = http.createServer(app);
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.get("/", (req, res) => {
    res.json({ name: "farshid mother fucker" });
  });

  app.post("/signup", (req, res) => {
    var errors = [];
    var pattern = /^[a-z0-9]{1,}@[a-z0-9]{1,}\.[a-z]{1,}$/i;
    if (!pattern.test(req.body.email) || req.body.password.length < 6) {
      if (!pattern.test(req.body.email)) {
        errors.push({
          key: "email",
          errorText: "فرمت ایمیل وارد شده صحیح نمی باشد",
        });
      }
      if (req.body.length < 6) {
        errors.push({
          key: "password",
          errorText: "رمز عبور وارد شده حداقل باید 6 کاراکتر باشد",
        });
      }
      res.status(400).json({ errors: errors });
    }
    res.status(201).json(req.body);
  });

  server.listen(3000, () => {
    console.log("server running on ort 3000");
  });
}
export default App;