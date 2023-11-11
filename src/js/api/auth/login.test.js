import { login } from "./login.js";
import localStorageMock from "../../mock/localStorage.mock.js";

Object.defineProperty(global, "localStorage", { value: localStorageMock });

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ accessToken: "fake-token" }),
  })
);

describe("login", () => {
  beforeEach(() => {
    localStorageMock.setItem.mockClear();
    localStorageMock.getItem.mockClear();
    localStorageMock.removeItem.mockClear();
    localStorageMock.clear.mockClear();
  });

  it("should store the access token in local storage upon successful login", async () => {
    await login("test@noroff.no", "passw321");

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "token",
      JSON.stringify("fake-token")
    );
  });

  it("should handle a failed login without storing an access token", async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        status: 401,
        json: () => Promise.resolve({}),
      })
    );

    await expect(
      login("wrong@testing.com", "incorrectPassword")
    ).rejects.toThrow();

    expect(localStorage.setItem).not.toHaveBeenCalled();
  });
});
