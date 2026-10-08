import fs from "fs";
import path from "path";

const root = process.cwd();
const keyFile = fs
  .readdirSync(path.join(root, "public"))
  .find((name) => /^[a-f0-9]{32}\.txt$/.test(name));

if (!keyFile) {
  console.error("Missing public/<32-hex-key>.txt IndexNow key file.");
  process.exit(1);
}

const key = fs.readFileSync(path.join(root, "public", keyFile), "utf8").trim();
const host = "www.nomoreforeverchemicals.com";
const site = `https://${host}`;
const dryRun = process.argv.includes("--dry-run");

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/&/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function urlsFromRepo() {
  const paths = [
    "/",
    "/blog",
    "/non-toxic-products",
    "/what-is-this-site-about",
    "/privacy-policy",
    "/blog-feed.xml",
    "/products.json",
    "/feed/products.xml",
    "/llms.txt",
    "/llms-full.txt",
    "/sitemap.xml",
  ];

  const categories = new Set();
  for (const file of fs.readdirSync(path.join(root, "content/posts"))) {
    if (!file.endsWith(".mdx")) continue;
    paths.push(`/post/${file.replace(/\.mdx$/, "")}`);
    const raw = fs.readFileSync(path.join(root, "content/posts", file), "utf8");
    const match = raw.match(/^category:\s*"(.+)"/m);
    if (match) categories.add(slugify(match[1]));
  }
  for (const category of categories) paths.push(`/blog/categories/${category}`);
  for (const file of fs.readdirSync(path.join(root, "content/products"))) {
    if (!file.endsWith(".json")) continue;
    paths.push(`/products/${file.replace(/\.json$/, "")}`);
  }
  return paths.map((item) => `${site}${item}`);
}

const urlList = urlsFromRepo();
const body = {
  host,
  key,
  keyLocation: `${site}/${keyFile}`,
  urlList,
};

if (dryRun) {
  console.log(JSON.stringify({ ...body, urlCount: urlList.length }, null, 2));
  process.exit(0);
}

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify(body),
});

const text = await response.text();
console.log(`IndexNow ${response.status} ${response.statusText} (${urlList.length} URLs)`);
if (text) console.log(text);
if (!response.ok) process.exit(1);
