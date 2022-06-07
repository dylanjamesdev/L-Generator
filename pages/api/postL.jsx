"use strict";

import fs from "fs";

export default function postL(req, res) {
  if (req.method === "POST") {
    // Get the data from the body
    let newL = req.body.suggestion;

    // Mimic the data from the JSON file
    let data = fs.readFileSync("Submitted_Ls.json");
    let myObject = JSON.parse(data);

    // Add the new data to the array
    myObject.push(newL);

    // Stringify the array
    let newData = JSON.stringify(myObject);

    // Write the new data to the file
    fs.writeFile("Submitted_Ls.json", newData, (err) => {
      if (err) throw err;
      console.log(`New submission: ${newL}`);
    });

    // Redirect
    return res.redirect("/?submitted=true");
  } else {
    // Handle GET reqs
    res
      .status(405)
      .json({ error: true, code: 405, message: "Method not allowed" });
  }
}
