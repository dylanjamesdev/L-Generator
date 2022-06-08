"use strict";

import fs from "fs";
import { words } from "../../../data/banned_words.json";
import array from "../../../data/submitted_ls.json";

/**
 * API Handler Info
 * @api {get} - /api/v2 - Returns an error because no method query.
 * @api {get} - /api/v2?method=GET - Get the list of ALL submitted L's
 * @api {post} - /api/v2?method=POST - Submit a new L
 */

export default function API_Handler(req, res) {
  // If no method query in url request, return 400.
  if (!req.query.method) {
    return res.status(400).json({
      error: true,
      code: 400,
      message: "L bozo, no API query method was provided.",
    });
  }

  // Handle GET requests
  if (req.method === "GET") {
    if (req.query.method === "GET") {
      return res.status(200).json(array);
    } else {
      return res.status(405).json({
        error: true,
        code: 405,
        message: "Stoopid, you can't POST to this endpoint.",
      });
    }
  }

  // Handle POST requests
  if (req.method === "POST") {
    if (req.query.method === "POST") {
      let newL = req.body.suggestion;

      if (!newL || newL === "") {
        return res.status(500).json({
          error: true,
          code: 400,
          message: "No suggestion was provided.",
        });
      }

      let data = fs.readFileSync("./data/submitted_ls.json");
      let daArray = JSON.parse(data);

      if (daArray.includes(newL)) {
        return res.status(400).json({
          error: true,
          code: 400,
          message: "ya no that has already been submitted 4head",
        });
      }

      if (words.some((v) => newL.includes(v))) {
        return res.status(400).json({
          error: true,
          code: 400,
          message:
            "yo, thats fucked up you just used a blacklisted word. thats mean..",
        });
      }

      daArray.push(newL);

      let newData = JSON.stringify(daArray);

      fs.writeFile("./data/submitted_ls.json", newData, (err) => {
        if (err) throw err;
        console.log(`New submission: ${newL}`);
      });

      return res.redirect("/");
    } else {
      return res.status(405).json({
        error: true,
        code: 405,
        message: "Dummy, you can't GET this endpoint.",
      });
    }
  }
}
