import { atom } from "jotai";

// Atom to store the username as a string
export const usernameAtom = atom<string>("");

// Atom to store the email as a string
export const emailAtom = atom<string>("");

// Atom to store the password as a string
export const passwordAtom = atom<string>("");

// Atom to store any error messages as a string
export const errorAtom = atom<string>("");

// Atom to store the email verification code as a string
export const emailCode = atom<string>("");

// Atom to store the verification status as a boolean
export const isVerifiedAtom = atom<boolean>(false);

// Atom to store the password strength as a string
export const passwordStrengthAtom = atom<string>("");

// Atom to store the re-entered password as a string
export const rePasswordAtom = atom<string>("");
