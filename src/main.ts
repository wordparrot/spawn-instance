import { mkdir, writeFile, rm, stat } from "fs/promises";
import { Command } from "commander";

import getBase64SetupScript from "./createBase64";
import fileList from "./templates/fileList";

const program = new Command();

const buildDir = "./environment";
const base64SetupScript = getBase64SetupScript;

/*
Generate a list of files for wordparrot use. Includes:
- .env
- .env.sandbox
- docker-compose.yml
- setup.sh
- start.sh

Important variables will also be injected into the files.
*/
const main = () => {
  console.log("");
  console.log("");
  console.log(
    " \\\\                        =o) \r\n (o>                       /\\\\ \r\n_(()_Welcome to Wordparrot_\\_V_\r\n //                         \\\\ \r\n                             \\\\"
  );

  (async () => {
    console.log("");
    console.log("Creating environment...");

    program
      .version("1.0.0", "-v, --version")
      .usage("[OPTIONS]...")
      .option("-o, --override", "Delete build folder if present.")
      .parse(process.argv);

    if (!process.env.WORDPARROT_AUTHORIZED_DOMAIN) {
      console.log("");
      console.log("");
      console.log(
        'Error: WORDPARROT_AUTHORIZED_DOMAIN environment variable must be set to a valid Internet domain name (e.g. "app.wordparrot.com").'
      );
      console.log("");
      console.log("Exiting.");
      console.log("");
      process.exit(1);
    }

    try {
      // Checks to see if build folder is already there.
      await stat(buildDir);

      // Folder is here - unless override flag is provided, exit now.
      const hasOverride = program.opts().override;

      if (hasOverride) {
        // Delete any build folder present
        console.log("");
        console.log("");
        console.log("You have chosen to override the existing build folder.");

        await rm(buildDir, {
          recursive: true,
        });
      } else {
        console.log("");
        console.log("");
        console.log(
          "Build folder already present. Use override flag to destroy existing folder. Exiting."
        );
        process.exit(1);
      }
    } catch (e) {
      // Folder is not present - operation can continue.
    }

    console.log("");
    console.log("");
    console.log("Preparing build...");

    try {
      await mkdir(buildDir);

      console.log("");
      console.log("");
      console.log("Environment folder created.");
      console.log("");
      console.log("");

      await Promise.all(
        fileList.map((file) => {
          return writeFile(`${buildDir}/${file.name}`, file.rawString, "utf-8");
        })
      );

      console.log("File scaffolding complete.");
      process.exit(0);
    } catch (e) {
      console.log("Operation failed.");
      console.log(e);
      process.exit(1);
    }
  })();
};

export default main;
