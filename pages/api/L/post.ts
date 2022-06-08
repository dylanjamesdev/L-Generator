"use strict";

import { words } from '../../../constants/banned_words.json';  
import fs from "fs";

export default function postL(req, res) {
  if (req.method === "POST") {
    // Get the data from the body
    let newL = req.body.suggestion;

    if (!newL || newL === "") {
      return res.status(500).json({
        error: true,
        code: 400,
        message: "No suggestion was provided.",
      });
    }

    // Mimic the data from the JSON file
    let data = fs.readFileSync("Submitted_Ls.json");
    let daArray = JSON.parse(data);

    //Check if that L has already been submitted
    if(daArray.includes(newL)) {
        return res.status(400).json({
          error: true,
          code: 400,
          message: "ya no that has already been submitted 4head"
        })
    }
    
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
    fs.writeFile("Submitted_Ls.json", newData, (err) => {
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
