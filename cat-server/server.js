import jsonServer from "json-server";
import router from "./router/index.js";

const server = jsonServer.create();
const middlewares = jsonServer.defaults();

const PORT = 4000;
const DELAY = 3000;

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.use((req, res, next) => {
  if (["POST", "PUT", "PATCH"].includes(req.method)) {
    if (!validateEmail(req.body.email)) {
      return res.status(422).send({
        error: {
          email: "Email không đúng định dạng",
        },
      });
    }
    if (req.body.last_name === "admin") {
      return res.status(500).send({
        error: "Server bị lỗi",
      });
    }
  }
  setTimeout(() => {
    next();
  }, DELAY);
});

server.use(router);
server.listen(PORT, () => {
  console.log(`JSON Server is running at http://localhost:${PORT}`);
});
