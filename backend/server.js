const { app, port } = require("./app");

app.listen(port, () => {
  console.log(
    `User Contact Management System Backend app listening at http://localhost:${port}`
  );
});
