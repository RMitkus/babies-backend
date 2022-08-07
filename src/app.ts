import { config } from 'dotenv';
import express, {
  Application, Request, Response,
} from 'express';
import morgan from 'morgan';

config();

const app: Application = express();

app.use(morgan('dev'));
app.use(express.json({
  limit: '50mb',
}));
app.use(express.urlencoded({
  limit: '50mb',
  extended: true,
}));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is listening on port http://localhost:${PORT}`);
});
