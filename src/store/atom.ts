import { atom } from "jotai";

export const isStarredParamsAtom = atom<string>("false");

export const searchParamsAtom = atom<string>("");

export const INITIAL_PAGE = 1;

export const pageParamsAtom = atom<number>(INITIAL_PAGE);


