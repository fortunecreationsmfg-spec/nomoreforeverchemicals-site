import assert from "node:assert/strict";
import test from "node:test";
import vm from "node:vm";
import {
  ANNOUNCEMENT_DISMISS_KEY,
  ANNOUNCEMENT_ENDS_AT,
  CYBER_MONDAY_STARTS_AT,
  announcementBootScript,
  announcementPhase,
} from "../lib/seasonal.ts";

test("black friday copy is current before November 30 in Denver", () => {
  assert.equal(announcementPhase(new Date("2026-11-30T06:59:59.999Z")), "black-friday");
});

test("cyber monday copy starts at November 30, 12:00 AM Denver", () => {
  assert.equal(announcementPhase(new Date(CYBER_MONDAY_STARTS_AT)), "cyber-monday");
  assert.equal(announcementPhase(new Date("2026-12-01T06:59:59.999Z")), "cyber-monday");
});

test("banner is off at December 1, 12:00 AM Denver, after 11:59 PM", () => {
  assert.equal(announcementPhase(new Date(ANNOUNCEMENT_ENDS_AT)), "off");
  assert.equal(announcementPhase(new Date("2026-12-01T07:00:01.000Z")), "off");
});

function runBoot(nowIso, stored) {
  const attrs = {};
  const context = vm.createContext({
    Date: { now: () => Date.parse(nowIso) },
    localStorage: {
      getItem(key) {
        assert.equal(key, ANNOUNCEMENT_DISMISS_KEY);
        return stored;
      },
    },
    document: {
      documentElement: {
        setAttribute(name, value) {
          attrs[name] = value;
        },
      },
    },
  });
  vm.runInContext(announcementBootScript(), context);
  return attrs["data-deals-banner"];
}

test("boot script matches the build-time phase and the dismiss flag", () => {
  assert.equal(runBoot("2026-11-13T18:00:00.000Z", null), "black-friday");
  assert.equal(runBoot("2026-11-30T18:00:00.000Z", null), "cyber-monday");
  assert.equal(runBoot("2026-11-30T18:00:00.000Z", "1"), "off");
  assert.equal(runBoot("2026-12-01T07:00:00.000Z", null), "off");
});

test("boot script still applies the date when storage throws", () => {
  const attrs = {};
  const context = vm.createContext({
    Date: { now: () => Date.parse("2026-11-13T18:00:00.000Z") },
    localStorage: {
      getItem() {
        throw new Error("blocked");
      },
    },
    document: {
      documentElement: {
        setAttribute(name, value) {
          attrs[name] = value;
        },
      },
    },
  });
  vm.runInContext(announcementBootScript(), context);
  assert.equal(attrs["data-deals-banner"], "black-friday");
});
