/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import axios from "axios";
import { Element, load, CheerioAPI } from "cheerio";
import { createHash } from "crypto";
import { schedule } from "node-cron";
import { PasteModel } from "./models/PastesModel";
import { redisClient } from "./server";

export async function getHtml(
  url = "http://paste2vljvhmwq5zy33re2hzu4fisgqsohufgbljqomib2brzx3q4mid.onion/lists"
) {
  const data = await axios.get(url, {
    proxy: {
      host: process.env.TOR_SERVICE || "localhost",
      port: 8118,
    },
  });
  return data.data;
}

async function createHtmlApi(url?: string) {
  const html = await getHtml(url);
  return load(html);
}
export function convertToUTC(time: string) {
  const [number, timeUnit] = time.split(" ");
  enum TimeUnits {
    Second = "Second",
    Minute = "Minute",
    Hour = "Hour",
    Day = "Day",
    Week = "Week",
  }
  const date = new Date();
  if (timeUnit.includes(TimeUnits.Second)) {
    date.setSeconds(date.getSeconds() - Number(number));
  }
  if (timeUnit.includes(TimeUnits.Minute)) {
    date.setMinutes(date.getMinutes() - Number(number));
  }
  if (timeUnit.includes(TimeUnits.Hour)) {
    date.setHours(date.getHours() - Number(number));
  }
  if (timeUnit.includes(TimeUnits.Day)) {
    date.setDate(date.getDate() - Number(number));
  }
  if (timeUnit.includes(TimeUnits.Week)) {
    date.setDate(date.getDate() - Number(number) * 7);
  }
  if (timeUnit.includes(TimeUnits.Week)) {
    date.setMonth(date.getMonth() - Number(number));
  }
  return date.toUTCString();
}

export const getPostData = async (url: string | undefined) => {
  if (!url) return "";
  const htmlApi = await createHtmlApi(url);
  const text = htmlApi("ol").text().replace(/\n/g, " ");

  return text;
};

const createPostObjects = async ($: CheerioAPI, tr: Element, id: number) => {
  const title = $(tr).find("td:nth-child(1) a").text();
  const author = $(tr).find("td:nth-child(2)").text();
  const timeAgo = $(tr).find("td:nth-child(4)").text();
  const date = convertToUTC(timeAgo);
  const url = $(tr).find("td a").attr("href");

  const content = await getPostData(url);
  return { title, author, date, url, content, id };
};

export const createPageData = async (htmlApi: CheerioAPI) => {
  htmlApi("tr")
    .toArray()
    .slice(1)
    .forEach(async (tr, i) => {
      const obj = await createPostObjects(htmlApi, tr, i + 1);

      await PasteModel.updateOne(
        { url: obj.url },
        { $set: obj },
        { upsert: true }
      );
    });
};

async function checkHashExist(htmlApi: CheerioAPI, hrefStr: string) {
  const nextHash = createHash("md5").update(hrefStr).digest("hex");
  try {
    const preHash = await redisClient.get(nextHash);
    console.log(nextHash, preHash);
    if (preHash) {
      console.log(`hash changed: ${nextHash}`);
      createPageData(htmlApi);
      await redisClient.set(nextHash, nextHash);
    } else {
      console.log(`hash not changed: ${preHash}`);
    }
  } catch (error) {
    console.log(error);
  }
}
const createHrefStr = (htmlApi: CheerioAPI) =>
  htmlApi("tr")
    .toArray()
    .map((el) => htmlApi("a").attr("href"))
    .join("");

export async function setDataDB(time: string) {
  let htmlApi = await createHtmlApi();

  await checkHashExist(htmlApi, createHrefStr(htmlApi));

  schedule(time, async (now: Date) => {
    htmlApi = await createHtmlApi();
    await checkHashExist(htmlApi, createHrefStr(htmlApi));
    console.log(now.toLocaleTimeString());
  });
}
