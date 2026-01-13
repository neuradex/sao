import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TEMPLATES_DIR = path.join(__dirname, "..", "templates");

interface Consumer {
  name: string;
  description: string;
  path: string;
}

function getAvailableConsumers(): Consumer[] {
  const consumers: Consumer[] = [];

  if (!fs.existsSync(TEMPLATES_DIR)) {
    return consumers;
  }

  const entries = fs.readdirSync(TEMPLATES_DIR, { withFileTypes: true });
  for (const entry of entries) {
    // Skip hidden directories (like .claude which is SAO core)
    if (entry.isDirectory() && !entry.name.startsWith(".")) {
      consumers.push({
        name: entry.name,
        description: getConsumerDescription(entry.name),
        path: path.join(TEMPLATES_DIR, entry.name),
      });
    }
  }

  return consumers;
}

function getConsumerDescription(name: string): string {
  const descriptions: Record<string, string> = {
    claude: "Claude Code slash commands (/sao-starter, /sao-step)",
  };
  return descriptions[name] || "No description available";
}

function copyDirectory(src: string, dest: string, mode: "install" | "update" = "install"): void {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath, mode);
    } else {
      const exists = fs.existsSync(destPath);
      fs.copyFileSync(srcPath, destPath);
      const action = mode === "update" ? (exists ? "Updated" : "Created") : "Created";
      console.log(`  ${action}: ${path.relative(process.cwd(), destPath)}`);
    }
  }
}

export function installWithConsumer(consumerName: string, targetDir: string): void {
  const consumers = getAvailableConsumers();
  const consumer = consumers.find((c) => c.name === consumerName);

  if (!consumer) {
    console.error(`Error: Consumer "${consumerName}" not found.`);
    console.error(`Available consumers: ${consumers.map((c) => c.name).join(", ")}`);
    process.exit(1);
  }

  console.log(`\nInstalling SAO with ${consumerName} consumer`);
  console.log(`Target directory: ${targetDir}\n`);

  // 1. Copy SAO core (templates/.claude/...)
  const saoCorePath = path.join(TEMPLATES_DIR, ".claude");
  if (fs.existsSync(saoCorePath)) {
    console.log("SAO Core:");
    copyDirectory(saoCorePath, path.join(targetDir, ".claude"));
  }

  // 2. Copy consumer-specific files
  console.log(`\n${consumerName} commands:`);
  copyDirectory(consumer.path, targetDir);

  console.log(`\nDone! SAO has been installed with ${consumerName} consumer.`);
  console.log(`\nNext steps:`);
  console.log(`  1. Read .claude/sao/concepts/README.md to understand SAO methodology`);
  console.log(`  2. Use /sao-starter to create a new SAO project`);
  console.log(`  3. Use /sao-step to execute steps in your project`);
}

export function updateWithConsumer(consumerName: string, targetDir: string): void {
  const consumers = getAvailableConsumers();
  const consumer = consumers.find((c) => c.name === consumerName);

  if (!consumer) {
    console.error(`Error: Consumer "${consumerName}" not found.`);
    console.error(`Available consumers: ${consumers.map((c) => c.name).join(", ")}`);
    process.exit(1);
  }

  // Check if SAO is installed
  const saoDir = path.join(targetDir, ".claude", "sao");
  if (!fs.existsSync(saoDir)) {
    console.error(`Error: SAO is not installed in this directory.`);
    console.error(`Run "npx init-sao-claude" first to install.`);
    process.exit(1);
  }

  console.log(`\nUpdating SAO with ${consumerName} consumer`);
  console.log(`Target directory: ${targetDir}\n`);

  // 1. Update SAO concepts (skip projects/ to preserve user data)
  const saoCorePath = path.join(TEMPLATES_DIR, ".claude", "sao", "concepts");
  if (fs.existsSync(saoCorePath)) {
    console.log("SAO Concepts:");
    copyDirectory(saoCorePath, path.join(targetDir, ".claude", "sao", "concepts"), "update");
  }

  // 2. Update consumer-specific commands
  const consumerCommandsPath = path.join(consumer.path, ".claude", "commands");
  if (fs.existsSync(consumerCommandsPath)) {
    console.log(`\n${consumerName} commands:`);
    copyDirectory(consumerCommandsPath, path.join(targetDir, ".claude", "commands"), "update");
  }

  console.log(`\nDone! SAO has been updated.`);
  console.log(`\nNote: Your projects in .claude/sao/projects/ were preserved.`);
}
