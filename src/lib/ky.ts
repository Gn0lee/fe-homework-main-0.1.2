import ky from "ky";

export const api = ky.create({
  retry: 0,
  headers: {
    "Content-Type": "application/json",
  },
});
