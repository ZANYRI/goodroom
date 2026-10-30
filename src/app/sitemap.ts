import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/data/site";
import { LOFT_PRODUCT } from "@/data/home";
import { BLOG_POSTS } from "@/data/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_CONFIG.url;

  const staticRoutes: {
    path: string;
    priority: number;
    changeFrequency: "weekly" | "monthly";
  }[] = [
    { path: "", priority: 1.0, changeFrequency: "weekly" },
    { path: "/happybirthday", priority: 0.9, changeFrequency: "weekly" },
    { path: "/graduation", priority: 0.9, changeFrequency: "weekly" },
    { path: "/children", priority: 0.9, changeFrequency: "weekly" },
    { path: "/wedding", priority: 0.9, changeFrequency: "weekly" },
    { path: "/corporative", priority: 0.9, changeFrequency: "weekly" },
    { path: "/karaoke", priority: 0.9, changeFrequency: "weekly" },
    { path: LOFT_PRODUCT.url, priority: 0.9, changeFrequency: "weekly" },
    { path: "/blog", priority: 0.8, changeFrequency: "weekly" },
    { path: "/contacts", priority: 0.8, changeFrequency: "monthly" },
    { path: "/offer", priority: 0.4, changeFrequency: "monthly" },
  ];

  const postRoutes: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${base}${post.url}`,
    lastModified: post.datePublished,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    ...staticRoutes.map((route) => ({
      url: `${base}${route.path}`,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...postRoutes,
  ];
}
