import { http, HttpResponse } from "msw";

import { locations, starredLocations } from "./db";
import { Location } from "../types/location";

interface LocationsResult {
  total_count: number;
  locations: Location[];
}

export const handlers = [
  http.get("/locations", ({ request }) => {
    const url = new URL(request.url, "http://localhost:3000");
    const searchParams = url.searchParams;

    const pageParameter = searchParams.get("page");

    const searchParameter = searchParams.get("search");
    const starredParameter = searchParams.get("is_starred");

    if (!pageParameter) {
      return HttpResponse.json(
        { error_msg: "page parameter is required" },
        { status: 400 },
      );
    }

    const page = parseInt(pageParameter);

    if (isNaN(page)) {
      return HttpResponse.json(
        { error_msg: "page parameter must be an integer" },
        { status: 400 },
      );
    }

    if (!starredParameter) {
      return HttpResponse.json(
        { error_msg: "is_starred parameter is required" },
        { status: 400 },
      );
    }

    if (starredParameter !== "true" && starredParameter !== "false") {
      return HttpResponse.json(
        { error_msg: "is_starred parameter must be true or false" },
        { status: 400 },
      );
    }

    const isStarred = starredParameter === "true";

    const filteredLocations = locations.filter((el) => {
      if (isStarred && !starredLocations.includes(el.id)) {
        return false;
      }

      if (
        searchParameter &&
        !(
          el.robot?.id.includes(searchParameter) ||
          el.name.includes(searchParameter)
        )
      ) {
        return false;
      }

      return true;
    });

    const pageSize = 6;

    const totalCount = filteredLocations.length;

    const paginatedLocations = filteredLocations.slice(
      (page - 1) * pageSize,
      page * pageSize,
    );

    const result: LocationsResult = {
      total_count: totalCount,
      locations: paginatedLocations,
    };

    return HttpResponse.json(result);
  }),

  http.get("/starred_location_ids", () => {
    const location_ids = JSON.parse(
      sessionStorage.getItem("starred_location_ids") || "[]",
    );

    return HttpResponse.json({
      location_ids,
    });
  }),

  http.put("/starred_location_ids", async ({ request }) => {
    const body = await request.json();

    if (!body) {
      return HttpResponse.json(
        { error_msg: "Encountered unexpected error" },
        { status: 500 },
      );
    }

    sessionStorage.setItem("starred_location_ids", JSON.stringify(body));

    return HttpResponse.text("ok");
  }),
];
