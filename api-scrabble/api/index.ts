import type { Request, Response } from "express";
import express from "express";
import cors from "cors";
import data from "../data/words.json";

const words: Record<string, number> = data as Record<string, number>;

const app = express();
const port = 8000;

const allowedOrigins: string[] | string = process.env.CORS || [
  "https://scrabble.b-bsw.com",
];

const corsOrigins = (origin: string | undefined, callback: any) => {
  if (!origin || allowedOrigins.indexOf(origin) !== -1) {
    callback(null, true);
  } else {
    callback(new Error("Not allowed by CORS"));
  }
};

app.use(
  cors({
    origin: allowedOrigins === "*" ? "*" : corsOrigins,
  }),
);

app.get("/", (_req: Request, res: Response) => {
  res.json({
    total: Object.keys(words).length,
  });
});

app.get("/all", (_: Request, res: Response) => {
  try {
    res.json(data);
  } catch (err) {
    res.status(404).json({
      status: 404,
      msg: err,
    });
  }
});

app.get("/:word", (req: Request, res: Response) => {
  try {
    const word = req.params.word || "";

    const valid = words[word?.toString().toUpperCase()] === 1;

    res.json({
      word,
      valid,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      msg: err,
    });
  }
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

export default app;
