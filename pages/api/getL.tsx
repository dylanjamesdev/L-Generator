"use strict";

const array = require("../../Submitted_Ls.json");

export default function getL(req, res) {
  // Return array
  res.status(200).json(array);
}
