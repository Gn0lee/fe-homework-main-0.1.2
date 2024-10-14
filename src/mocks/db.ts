import { faker } from "@faker-js/faker";
import { Location } from "../types/location";

export const locations: Location[] = Array.from(
  { length: 100 },
  (_, index) => ({
    id: index,
    name: faker.company.name(),
    type: faker.company.buzzVerb(),
    robot:
      Math.random() > 0.5
        ? {
            id: faker.string.alphanumeric(8),
            is_online: faker.datatype.boolean(),
          }
        : null,
  }),
);

export const starredLocations: Location["id"][] = [];
