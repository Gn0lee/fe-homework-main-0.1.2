import { atom } from "jotai";

export const isStarredParamsAtom = atom<string>("false");

export const searchParamsAtom = atom<string | undefined>(undefined);

export const pageAtom = atom<number>(1);
