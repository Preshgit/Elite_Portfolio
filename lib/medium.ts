// Reads the public Medium RSS feed for a user. Refreshed at most once an hour.

export interface MediumPost {
  title: string;
  link: string;
  date: string;
  description: string;
  tags: string[];
}

const decode = (text: string) =>
  text
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&#x27;/g, "'")
    .replace(/&nbsp;/g, " ");

const stripHtml = (html: string) =>
  decode(html).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

const tag = (xml: string, name: string) =>
  xml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`))?.[1] ?? "";

export async function getMediumPosts(username: string): Promise<MediumPost[]> {
  if (!username) return [];

  try {
    const res = await fetch(`https://medium.com/feed/@${username}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const xml = await res.text();

    return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(([, item]) => {
      const content = tag(item, "content:encoded") || tag(item, "description");
      const pubDate = tag(item, "pubDate");
      return {
        title: stripHtml(tag(item, "title")),
        link: decode(tag(item, "link")).split("?")[0],
        date: pubDate
          ? new Date(pubDate).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })
          : "",
        description: stripHtml(content).slice(0, 220),
        tags: [...item.matchAll(/<category>([\s\S]*?)<\/category>/g)]
          .map(([, t]) => decode(t))
          .slice(0, 2),
      };
    });
  } catch {
    return [];
  }
}
