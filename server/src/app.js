import   express, { urlencoded }  from  'express'
import cors from "cors"
import  dotenv  from 'dotenv'



dotenv.config()
const app=  express();
app.use(cors({
    origin: process.env.URI,
    credentials: true // Allow credentials (cookies, authorization headers, etc.)
  }));

  app.use(express.json());

  // Middleware for parsing URL-encoded data
  app.use(express.urlencoded({ extended: true }));



  // importing  routes
  import bookRoutes from './routes/book.routes.js'
  import authorRoutes from './routes/author.routes.js'
  




  //  routes
  app.use("/api/v1/book",bookRoutes);
  app.use("/api/v1/author",authorRoutes);
  



export default app;