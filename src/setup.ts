import fs from "fs";
import { log } from "./scraper-kernel/src/logging";

export async function setup(cliArgs) {
  if (!cliArgs.table) {
    // no table has been specified

    // check if the table name has already been specified and saved to state.json
    // if not, then exit the process with an error

    if (fs.existsSync("./state.json")) {
      const state = JSON.parse(fs.readFileSync("./state.json", "utf8"));
      if (state.table) {
        cliArgs.table = state.table;
        log.info(`Using table "${state.table}" from state.json`);
      }
    } else {
      log.error(`No database table specified. Example usage: \`--table "sandbox"\``);
      process.exit(1);
    }
  } else {
    // a table has been specified
    // save the table name to state.json
    const state = { table: cliArgs.table };
    fs.writeFileSync("./state.json", JSON.stringify(state));
  }
  return cliArgs;
}