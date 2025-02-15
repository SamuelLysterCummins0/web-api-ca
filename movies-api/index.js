import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import usersRouter from './api/users';
import './db';
import defaultErrHandler from './errHandler';
import moviesRouter from './api/movies';   //import movies router
import reviewsRouter from './api/reviews';
import authenticate from './authenticate';
import listsRouter from './api/lists';

dotenv.config();

const app = express();
const port = process.env.PORT; 

app.use(cors());
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true
}));
app.use('/api/users', usersRouter);
app.use('/api/movies', authenticate, moviesRouter);
app.use('/api/reviews', authenticate, reviewsRouter);
app.use('/api/lists', listsRouter); 
app.use(defaultErrHandler);

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});