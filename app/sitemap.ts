import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const routes = ["", "/about-me", "/services", "/blogs", "/contact", "/disclaimer", "/privacy", "/terms"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${site.url}${route}`,
    changeFrequency: route === "/blogs" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
