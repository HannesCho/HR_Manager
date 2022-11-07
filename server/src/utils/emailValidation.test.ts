import validateEmail from "./emailValidation";

test("test validateEmail function", () => {
  expect(validateEmail("123")).toBe(false);
});
test("test validateEmail function", () => {
  expect(validateEmail("myemail@gmail.com")).toBe(true);
});
