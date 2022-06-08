"use strict";

import array from "../../../data/submitted_ls.json";

export default function getL(req, res) {
  // Return da array
  return res.status(200).json(array);
}
