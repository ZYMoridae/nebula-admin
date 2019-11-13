import Routes from "../../src/utils/Routes";

test("Constants config", () => {
  expect(Routes.USER.LOGIN).toBe('/login');
});