const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/verifyToken");

describe("verifyToken middleware", () => {
  it("should return 401 if no bearer token provided", () => {
    const req = {
      headers: {
        authorization: "",
      },
    };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };
    const next = jest.fn();

    verifyToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: "No bearer token provided.",
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("should return 401 if bearer token is invalid", () => {
    const req = {
      headers: {
        authorization: "Bearer invalidtoken",
      },
    };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };
    const next = jest.fn();

    verifyToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: "Failed to authenticate token.",
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("should call next if bearer token is valid", () => {
    const token = jwt.sign({ userId: 123 }, "abcd");
    const req = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    const res = {};
    const next = jest.fn();

    verifyToken(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});
