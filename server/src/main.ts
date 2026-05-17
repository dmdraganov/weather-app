import e from 'express';
import cors from 'cors';
import 'dotenv/config';

const app = e();

app.use(cors());

app.listen(process.env.PORT || '3000', (e) => {
  console.error(e);
});
