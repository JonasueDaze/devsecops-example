import express, { Request, Response } from "express";
import knex from "knex";

const app = express();
const port = 3000;

const pg = knex({
  client: "pg",
  connection: process.env.PG_CONNECTION_STRING,
  searchPath: ["knex", "public"],
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.get("/cliente", async (req: Request, res: Response) => {
  try {
    const result = await pg.raw(
      `SELECT * FROM clientes WHERE id = ${req.query.id}`,
    );
    //const result = pg("clientes").where("id", req.query.id);
    return res.json(result.rows);
  } catch (err) {
    res.json(err);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
