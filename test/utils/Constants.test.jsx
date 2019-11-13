import Constants from "../../src/utils/Contants";

test("Constants config", () => {
  expect(Constants.styles.sidebar.width).toBe(300);
});
