#!/usr/bin/env node

import { installWithConsumer, updateWithConsumer } from "@neuradex/sao";

const args = process.argv.slice(2);
const isUpdate = args.includes("--update");

if (isUpdate) {
  updateWithConsumer("claude", process.cwd());
} else {
  installWithConsumer("claude", process.cwd());
}
