"use strict";

const array = require("../../../Submitted_Ls.json");

export default function getL(req, res) {
  // Return da array
  return res.status(200).json(array);
}
