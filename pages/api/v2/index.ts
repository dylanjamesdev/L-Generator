"use strict";

import fs from "fs";
import { submitted_Ls, banned_words } from "../../../data/constants.json";

/**
 * API Handler Info
 * @api {get} - /api/v2 - Returns an error because no method query.
 * @api {get} - /api/v2?method=GET - Get the list of ALL submitted L's
 * @api {post} - /api/v2?method=POST - Submit a new L
 */
export default function API_Handler(req, res) {
  // If no method query in url request, return 400.
  if (!req.query.method) {
    return res.status(405).json({
      error: true,
      code: 405,
      message: "L bozo, no API query or method was provided.",
    });
  }

  // Handle GET requests
  if (req.method === "GET") {
    if (req.query.method === "GET") {
      return res.status(200).json(submitted_Ls);
    } else {
      return res.status(405).json({
        error: true,
        code: 405,
        message: "An incorrect query or method was used, stop being stupid bozo.",
      });
    }
  }

  // Handle POST requests
  if (req.method === "POST") {
    if (req.query.method === "POST") {
      let newL = req.body.suggestion;

      // Prevent empty post request on backend
      if (!newL || newL === "") {
        return res.status(500).json({
          error: true,
          code: 500,
          message: "Don't submit blank L's, you bozo.",
        });
      }

      // Prevent previously submitted L's
      if (submitted_Ls.includes(newL)) {
        return res.status(400).json({
          error: true,
          code: 400,
          message: "ya no that has already been submitted 4head",
        });
      }

      // Prevent banned words
      if (banned_words.some((v) => newL.includes(v))) {
        return res.status(400).json({
          error: true,
          code: 400,
          message:
            "yo, thats fucked up you just used a blacklisted word. thats mean..",
        });
      }

      //  Pull constants file
      let constantsFile = fs.readFileSync("./data/constants.json");

      // Parse into JSON
      let daArray = JSON.parse(constantsFile.toString());

      // Add new L to parsed JSON
      daArray.submitted_Ls.push(newL);

      // Stringify new json file
      let newFile = JSON.stringify(daArray);

      // Write new json file
      fs.writeFile("./data/constants.json", newFile, (err) => {
        if (err) throw err;
        console.log(`New submission: ${newL}`);
      });

      // Return success
      return res.redirect("/");
    } else {
      // Return 405 for GET request to POST endpoint
      return res.status(405).json({
        error: true,
        code: 405,
        message: "An incorrect query or method was used, stop being stupid bozo.",
      });
    }
  }
}
