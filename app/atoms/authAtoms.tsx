import { atom } from "jotai";

export const usernameAtom = atom<string>("");
export const emailAtom = atom<string>("");
export const passwordAtom = atom<string>("");
export const errorAtom = atom<string>("");
export const emailCode = atom<string>("");
export const isVerifiedAtom = atom<boolean>(false);
