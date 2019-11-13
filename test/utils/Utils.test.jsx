import Utils from "../../src/utils/Utils";
import FakeData from "../helper/FakeData";

describe("add token test", () => {
  beforeEach(() => {
    sessionStorage.setItem("token", FakeData.token);
  });

  test("token add success", () => {
    let options = { method: "get" };

    expect(Utils.addToken(options)).toStrictEqual({
      method: "get",
      headers: {
        Authorization: `Bearer ${FakeData.token}`
      }
    });
  });

  afterEach(() => {
    sessionStorage.removeItem("token");
  });
});

describe("user login status", () => {
  beforeEach(() => {
    sessionStorage.setItem("token", FakeData.token);
  });

  test("user is login", () => {
    expect(Utils.isUserLogin()).toBe(true);
  });

  afterEach(() => {
    sessionStorage.removeItem("token");
  });
});

describe("user login status", () => {
  beforeEach(() => {
    sessionStorage.setItem("token", "undefined");
  });

  test("user is logout [scenario 1]", () => {
    expect(Utils.isUserLogin()).toBe(false);
  });

  afterEach(() => {
    sessionStorage.removeItem("token");
  });
});

describe("user login status", () => {
  beforeEach(() => {
    sessionStorage.removeItem("token");
  });

  test("user is logout [scenario 2]", () => {
    expect(Utils.isUserLogin()).toBe(false);
  });
});

describe("user logout", () => {
  beforeEach(() => {
    sessionStorage.setItem("token", FakeData.token);
    sessionStorage.setItem("user", FakeData.user);
  });

  test("user is logout [scenario 1]", () => {
    Utils.logout();
    expect(sessionStorage.getItem("token")).toBe(null);
    expect(sessionStorage.getItem("user")).toBe(null);
  });

  afterEach(() => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
  });
});
