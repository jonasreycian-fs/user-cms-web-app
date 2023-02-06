// API Testing with endpoints from app.js

const request = require("supertest");
const { app } = require("../app");
const { faker } = require("@faker-js/faker");

describe("GET /", () => {
  it("should return a message and id", async () => {
    const res = await request(app).get("/");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message");
    expect(res.body).toHaveProperty("id");
  });
});

describe("GET /api/users?name=", () => {
  it("should return all users", async () => {
    const res = await request(app).get("/api/users?name=");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it("should return a specific user", async () => {
    const res = await request(app).get("/api/users?name=Jonas");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body[0].first_name).toEqual("Jonas Reycian");
  });
});

describe("GET /api/users/:id", () => {
  it("should return a specific user", async () => {
    const res = await request(app).get("/api/users/123456");

    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toEqual("User not found");
  });
});
