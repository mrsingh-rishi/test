import express, { Request, Response } from "express";
import cors from "cors";
import { router } from "./router";
import connectDB from "./utils/db";


const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

connectDB();

app.get('/', (req: Request, res: Response) => {
  res.send('backend activated');
});

app.use('/api/v1', router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
