import { faker } from "@faker-js/faker";

export interface Location {
  id: number;
  name: string;
  robot: {
    id: string;
    is_online: boolean;
  } | null;
}

export const locations: Location[] = Array.from(
  { length: 100 },
  (_, index) => ({
    id: index,
    name: faker.company.name(),
    robot:
      Math.random() > 0.5
        ? {
            id: faker.string.alphanumeric(8),
            is_online: faker.datatype.boolean(),
          }
        : null,
  }),
);
