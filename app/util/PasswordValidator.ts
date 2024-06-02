export const ValidatePassword = (password: string): string => {
  let errors: string = "";
  if (password.length < 8) {
    errors = "Password must be at least 8 characters long.";
  }
  if (!/[A-Z]/.test(password)) {
    errors = "Password must contain at least one uppercase letter.";
  }
  if (!/[a-z]/.test(password)) {
    errors = "Password must contain at least one lowercase letter.";
  }
  if (!/[0-9]/.test(password)) {
    errors = "Password must contain at least one number.";
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors = "Password must contain at least one special character.";
  }
  return errors;
};
