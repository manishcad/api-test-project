import axios from "axios";
import * as cheerio from "cheerio";
import { NextResponse } from "next/server";

export async function GET() {
  const targetUrl = "https://odishatv.in/live-tv";
  const response = await axios.get(targetUrl,{
    headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/91.0.4472.124 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
      },
  });
  const $ = cheerio.load(response.data);

  const newsCards = [];

  $(".bdn-card-two").each((i, elem) => {
    const title = $(elem).find("h3 a").text().trim();
    const link = $(elem).find("h3 a").attr("href");
    const image = $(elem).find(".bdn-image-container img").attr("src");
    const time = $(elem).find("ul.featured-cat time").text().trim();

    newsCards.push({ title, link, image, time });
  });

  return NextResponse.json({ success: "ok", data: newsCards });
}
