import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// This section will help you get a list of all the records.
router.get("/search", async (req, res) => {
  let collection = await db.collection("Foods");
  const searchQuery = (!req.query.q) ? "~" : req.query.q;
  const pipeline = [
    {
      $search: {text: {query: searchQuery, path: "description"}}
    }, 
    {
      $project: {description: 1}
    }
  ];
  let results = await collection.aggregate(pipeline).toArray();
  res.send(results).status(200);
});

// This section will help you get a single record by id
router.get("/:id", async (req, res) => {
  let collection = await db.collection("Foods");
  let query = {_id: new ObjectId(req.params.id)};
  let result = await collection.findOne(query, {projection: {description: 1, foodNutrients: 1}});

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

export default router;