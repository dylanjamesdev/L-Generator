"use strict";

import fs from "fs";
import { words } from '../../../data/banned_words.json';

export default function postL(req, res) {
// rate limit the number of requests
  if (req.method === "POST") {
    // Get the data from the body
    let newL = req.body.suggestion;

    // Check if suggestion exists in post request
    if (!newL || newL === "") {
      return res.status(500).json({
        error: true,
        code: 400,
        message: "No suggestion was provided.",
      });
    }

    // Mimic the data from the JSON file
    let data = fs.readFileSync("./data/submitted_ls.json");
    let daArray = JSON.parse(data);

    // Check if suggestion exists in the JSON file
     if(daArray.includes(newL)) {
        return res.status(400).json({
          error: true,
          code: 400,
          message: "ya no that has already been submitted 4head"
        })
    }
    
    // Check if suggestion contains banned words
   if(words.some(v => newL.includes(v))) {
      return res.status(400).json({
        error: true,
        code: 400,
        message: "yo, thats fucked up you just used a blacklisted word. thats mean.."
      })
    }
    
    // Add the new data to the array
    daArray.push(newL);
    
    // Stringify the array
    let newData = JSON.stringify(daArray);

    // Write the new data to the file
    fs.writeFile("./data/submitted_ls.json", newData, (err) => {
      if (err) throw err;
      console.log(`New submission: ${newL}`);
    });

    // Redirect
    return res.redirect("/");
  } else {
    // Handle GET reqs
    return res.status(405);
  }
}
