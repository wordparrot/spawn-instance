import { writeFile } from "fs/promises";

import setup from "./templates/setup.sh";

const getBase64SetupScript = () => {
  const buf = Buffer.from(setup as any, "utf-8");
  return buf.toString("base64");
};

(async () => {
  await writeFile(
    `${__dirname}/setup.base64.sh`,
    getBase64SetupScript(),
    "utf-8"
  );
})();

export default getBase64SetupScript;
