const request = require("supertest");
const { app, server } = require("../index"); // Assuming your Express app is exported from app.js
const { db, initDb } = require("../config/db.config");

beforeAll(async () => {
  // Connect to the database before running tests
  try {
    await initDb(db);
    console.log("Connected to the database");
  } catch (error) {
    console.error("Failed to connect to the database:", error);
  }
});

afterAll(async () => {
  server.close();
});

describe("User Registration API", () => {
  it("should register a new user", async () => {
    const userData = {
      email: "test@example.com",
      password: "password123",
    };

    const response = await request(app)
      .post("/api/users")
      .send(userData)
      .expect(200);

    expect(response.body.email).toBe(userData.email);
    expect(response.body).toHaveProperty("id");
  });

  it("should throw error on empty email", async () => {
    const userData = {
      email: "",
      password: "password123",
    };

    await request(app).post("/api/users").send(userData).expect(400);
  });
  it("should throw error on empty password", async () => {
    const userData = {
      email: "avc@gmail.com",
      password: "",
    };

    await request(app).post("/api/users").send(userData).expect(400);
  });
});
