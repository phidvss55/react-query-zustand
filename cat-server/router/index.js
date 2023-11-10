import jsonServer from "json-server";
const router = jsonServer.router("db.json");

router.render = (req, res) => {
  let data = res.locals.data;
  const { originalUrl } = req;
  if (
    req.method === "GET" &&
    (originalUrl === "/students" || /^\/students\?.*$/.test(originalUrl))
  ) {
    data = data.map((student) => ({
      id: student.id,
      avatar: student.avatar,
      last_name: student.last_name,
      email: student.email,
    }));
  }
  res.jsonp(data);
};

export default router;
