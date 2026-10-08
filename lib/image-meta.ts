import fs from "fs";
import path from "path";

const cache = new Map<string, { width: number; height: number }>();
const fallback = { width: 1200, height: 800 };

function webpSize(buffer: Buffer): { width: number; height: number } | null {
  if (buffer.toString("ascii", 0, 4) !== "RIFF" || buffer.toString("ascii", 8, 12) !== "WEBP") {
    return null;
  }
  const chunk = buffer.toString("ascii", 12, 16);
  if (chunk === "VP8X" && buffer.length >= 30) {
    return {
      width: 1 + buffer.readUIntLE(24, 3),
      height: 1 + buffer.readUIntLE(27, 3),
    };
  }
  if (chunk === "VP8 " && buffer.length >= 30) {
    return {
      width: buffer.readUInt16LE(26) & 0x3fff,
      height: buffer.readUInt16LE(28) & 0x3fff,
    };
  }
  if (chunk === "VP8L" && buffer.length >= 25) {
    const bits = buffer.readUInt32LE(21);
    return {
      width: (bits & 0x3fff) + 1,
      height: ((bits >> 14) & 0x3fff) + 1,
    };
  }
  return null;
}

export function imageMeta(src: string): { width: number; height: number } {
  const cached = cache.get(src);
  if (cached) return cached;
  if (!src.startsWith("/")) return fallback;
  try {
    const file = path.join(process.cwd(), "public", src);
    const size = webpSize(fs.readFileSync(file)) ?? fallback;
    cache.set(src, size);
    return size;
  } catch {
    return fallback;
  }
}
