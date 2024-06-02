export const PasswordHasher = (password: string) => {
  let hash = 0;
  let prime = 31;

  if (password.length === 0) {
    return hash.toString();
  }

  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0; // Convert to 32-bit integer
    hash = (hash * prime) | 0; // Multiply by prime number and convert to 32-bit integer
    hash ^= 0xdeadbeef; // XOR with a constant
  }

  return hash.toString();
};
  
  