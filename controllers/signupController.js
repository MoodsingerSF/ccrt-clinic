export const validateName = (name) => {
  const nameRegex = /^[a-zA-Z\- ]+$/;
  return nameRegex.test(name);
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 4;
};

export const validateConfirmPassword = (confirmPassword, password) => {
  return password !== "" && confirmPassword === password;
};

export const formErrors = {
  name: "Name should contain only english alphabet, -, _ and whitespace",
  email: "Email is not valid",
  password: "Password is required",
  confirmPassword: "Passwords haven't matched",
  policy: "You should accept our policy",
};
