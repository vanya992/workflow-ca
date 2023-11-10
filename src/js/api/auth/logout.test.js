import { logoutListener } from "../../listeners/auth/logout";
import localStorageMock from "../../mock/localStorage.mock.js";

jest.mock("../../api/auth", () => ({
  logout: jest.fn(),
}));

Object.defineProperty(global, "localStorage", { value: localStorageMock });

beforeEach(() => {
  jest.clearAllMocks();

  delete global.location;
  global.location = { href: jest.fn() };
});

const { logout } = require("../../api/auth");
logout.mockImplementation(() => {
  localStorage.clear();
});

jest.spyOn(localStorageMock, "clear");

describe("Logout", () => {
  it("should clear the token from local storage", () => {
    const mockEvent = {
      preventDefault: jest.fn(),
    };

    logoutListener(mockEvent);

    expect(localStorageMock.clear).toHaveBeenCalled();
    expect(global.location.href).toBe("./");
  });
});
