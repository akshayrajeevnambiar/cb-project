// Function to hash password
export const PasswordHasher = (password: string) => {
  let hash = 0; // Initialize hash value
  let prime = 31; // Prime number used for hashing

  // If password is empty, return 0
  if (password.length === 0) {
    return hash.toString();
  }

  // Iterate through each character in the password
  for (let i = 0; i < password.length; i++) {

    const char = password.charCodeAt(i); // Get Unicode value of the character

    // Hashing algorithm: hash = ((hash << 5) - hash) + char
    hash = ((hash << 5) - hash) + char; 

    hash |= 0; // Convert to 32-bit integer
    hash = (hash * prime) | 0; 
    // Multiply by prime number and convert to 32-bit integer
    
    hash ^= 0xdeadbeef; // XOR with a constant
  }

  return hash.toString(); // Return the hashed value as a string
};