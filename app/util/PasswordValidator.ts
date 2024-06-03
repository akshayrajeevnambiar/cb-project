// Function to validate password
export const ValidatePassword = (password: string): string => {
  let errors: string = ""; // Initialize error message variable
  
  // Check if password length is less than 8 characters
  if (password.length < 8) {
    errors = "Password must be at least 8 characters long."; // Update error message
  }

  // Check if password contains at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    errors = "Password must contain at least one uppercase letter."; // Update error message
  }

  // Check if password contains at least one lowercase letter
  if (!/[a-z]/.test(password)) {
    errors = "Password must contain at least one lowercase letter."; // Update error message
  }

  // Check if password contains at least one number
  if (!/[0-9]/.test(password)) {
    errors = "Password must contain at least one number."; // Update error message
  }

  // Check if password contains at least one special character
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors = "Password must contain at least one special character."; // Update error message
  }

  return errors; // Return error message
};
