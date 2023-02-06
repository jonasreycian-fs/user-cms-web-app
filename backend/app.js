// Entry point for the backend server of the application
// which uses data.json as the database and cors to
// allow cross-origin requests

const express = require("express");
const bodyParser = require("body-parser");
const { faker } = require("@faker-js/faker");
const cors = require("cors");
const fs = require("fs");
const { Address, Users } = require("./models/models.js");

const app = express();
const port = 3000;
const filePath = "./db/data.json";

app.use(bodyParser.json());
app.use(cors());

// Get all users data from the database
app.get("/api/users", (req, res) => {
  const name = req.query.name;
  console.log(`Getting all users or a specific ${name}...`);

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      res.status(500).send({
        message: "Error retrieving users data",
      });
    }

    if (!name) return res.send(JSON.parse(data));

    const users = JSON.parse(data);
    const user = users.find(
      (user) =>
        user.first_name.toLowerCase().includes(name) ||
        user.last_name.toLowerCase().includes(name) ||
        user.email.toLowerCase().includes(name)
    );

    // If user is not found, return empty array
    if (!user) return res.send(users);

    res.send(typeof user === "object" ? [user] : user);
  });
});

// Get a user data by id from the database
app.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      res.status(500).send({
        message: "Error retrieving users data",
      });
    }

    const users = JSON.parse(data);
    const filteredUsers = users.find((user) => user.id === id);

    if (!filteredUsers)
      return res.status(404).send({ message: "User not found" });

    res.send(filteredUsers);
  });
});

// Create a new user in the database
app.post("/api/users", (req, res) => {
  const user = req.body;

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      res.status(500).send({
        message: "Error retrieving users data",
      });
    }

    const users = JSON.parse(data);

    const physicalAddress = new Address(
      user.physical_address.landmark,
      user.physical_address.street,
      user.physical_address.city,
      user.physical_address.country
    );

    const billingAddress = new Address(
      user.billing_address.landmark,
      user.billing_address.street,
      user.billing_address.city,
      user.billing_address.country
    );

    const newUser = new Users(
      faker.random.alphaNumeric(6).toUpperCase(),
      user.first_name,
      user.last_name,
      user.email,
      physicalAddress,
      billingAddress,
      +new Date(),
      +new Date()
    );

    users.push(newUser);

    fs.writeFile(filePath, JSON.stringify(users), (err) => {
      if (err) {
        res.status(500).send({
          message: "Error creating user",
        });
      }

      res.send({
        message: "User created successfully",
      });
    });
  });
});

// Update a user in the database
app.put("/api/users/:id", (req, res) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      res.status(500).send({
        message: "Error retrieving users data",
      });
    }

    const users = JSON.parse(data);
    const user = users.find((user) => user.id === req.params.id);

    if (!user) return res.status(404).send("User not found");

    const physicalAddress = { ...req.body.physical_address };
    const billingAddress = { ...req.body.billing_address };

    try {
      const pAddress = {
        ...user.physical_address,
        ...physicalAddress,
      };

      const bAddress = {
        ...user.billing_address,
        ...billingAddress,
      };

      const updatedUser = {
        ...user,
        ...req.body,
        physical_address: pAddress,
        billing_address: bAddress,
        updated_at: +new Date(),
      };

      const index = users.indexOf(user);
      users[index] = updatedUser;

      fs.writeFile(filePath, JSON.stringify(users), (err) => {
        if (err) {
          res.status(500).send({
            message: "Error updating user",
          });
        }

        res.send({
          message: "User updated successfully",
          data: updatedUser,
        });
      });
    } catch (error) {
      res.status(500).send({
        message: "Error updating user",
      });
    }
  });
});

// Delete a user from the database
app.delete("/api/users/:id", (req, res) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      res.status(500).send({
        message: "Error retrieving users data",
      });
    }

    const users = JSON.parse(data);
    const user = users.find((user) => user.id === req.params.id);

    if (!user) return res.status(404).send("User not found");

    const index = users.indexOf(user);
    users.splice(index, 1);

    fs.writeFile(filePath, JSON.stringify(users), (err) => {
      if (err) {
        res.status(500).send({
          message: "Error deleting user",
        });
      }

      res.send({
        message: "User deleted successfully",
      });
    });
  });
});

app.get("/", (req, res) => {
  res.send({
    message: "Hello World!",
    id: faker.random.alphaNumeric(6).toLocaleUpperCase(),
  });
});

module.exports = {
  app: app,
  port: port,
};
