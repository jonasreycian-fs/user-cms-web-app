// API Testing with endpoints from app.js

describe("GET /", () => {
  it("should return a message and id", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message");
    expect(res.body).toHaveProperty("id");
  });
});
