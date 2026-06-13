const twilio = require("twilio");
const fs = require("fs");
const path = require("path");

function loadEnv(filePath) {
  const env = {};
  const content = fs.readFileSync(filePath, "utf-8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    env[trimmed.slice(0, eqIdx).trim()] = trimmed.slice(eqIdx + 1).trim();
  }
  return env;
}

const env = loadEnv(path.join(__dirname, ".env.local"));
const accountSid = env.TWILIO_ACCOUNT_SID;
const authToken = env.TWILIO_AUTH_TOKEN;
const USER_NUMBER = "+15722349756";
const WEBHOOK_URL = "https://yummy-paths-bathe.loca.lt/api/whatsapp";

const client = twilio(accountSid, authToken);

async function main() {
  console.log("\n=== Updating Twilio Webhook ===\n");

  // Update phone number webhook
  const numbers = await client.incomingPhoneNumbers.list({ limit: 20 });
  const search = USER_NUMBER.replace(/[^0-9]/g, "");
  for (const num of numbers) {
    const clean = num.phoneNumber.replace(/[^0-9]/g, "");
    if (clean.includes(search)) {
      await num.update({ smsUrl: WEBHOOK_URL, smsMethod: "POST" });
      console.log(`✅ ${num.phoneNumber} → ${WEBHOOK_URL}`);
    }
  }

  console.log("\n✅ Webhook configured!");
  console.log(`📱 Send a WhatsApp message to ${USER_NUMBER} to test.\n`);
}

main().catch(console.error);
