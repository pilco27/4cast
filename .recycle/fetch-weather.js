// scripts/fetch-weather.js

import fetch from "node-fetch";
import { XMLParser } from "fast-xml-parser";
import fs from "fs";

// Your external XML feed:
const URL = "https://reg.bom.gov.au/fwo/IDS11072.xml";

async function run() {
  try {
    const res = await fetch(URL);
    const xmlText = await res.text();

    const parser = new XMLParser();
    const data = parser.parse(xmlText);

    // Clean / transform as needed — example:
    const cleaned = {
      fetched_at: new Date().toISOString(),
      raw: data
    };

    fs.writeFileSync("data/weather.json", JSON.stringify(cleaned, null, 2));
    console.log("Saved data/weather.json successfully.");
  } catch (e) {
    console.error("Fetch failed:", e);
    process.exit(1);
  }
}

run();
