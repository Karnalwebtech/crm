import cookieParser from "cookie-parser";
import express from "express";
const app = express();
import cors from "cors";
import helmet from "helmet";
import csurf from "csurf";
import rateLimit from "express-rate-limit";
import errorMiddleware from "./middlewares/error";
app.set('trust proxy', 1);
// Middleware to parse JSON bodies
// Middleware to parse URL-encoded bodies (form submissions)
app.disable("x-powered-by");
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
});
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "https://karnalwebtech.vercel.app",
      "https://inventory-7773.vercel.app",
      "https://karnalwebtech-two.vercel.app",
      "https://www.thesalesmens.com",
      "https://thesalesmens.com",
      "https://crm-three-rho.vercel.app"
    ], // Allow only your frontend to access the API
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed methods
    exposedHeaders: "Set-Cookie",
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "cookies",
      "X-CSRF-Token",
    ],
    credentials: true, // Allow sending cookies and other credentials
    optionsSuccessStatus: 200,
    preflightContinue: false,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
// export const csrfProtection = csurf({ cookie: true });
// app.use(csrfProtection);
app.use(limiter);
app.get("/api/csrf-token", (req, res) => {
  // console.log('call')
  res
    .status(200)
    .cookie("XSRF-TOKEN", req.csrfToken())
    .json({ success: true, token: req.csrfToken() }); // Optional, for other use cases
});
//-----loaders
//------------------ crm
import crm_repositoriesLoader from "./loaders/crm/repositoriesLoader";
import crm_servicesLoader from "./loaders/crm/servicesLoader";
import crm_controllersLoader from "./loaders/crm/controllersLoader";
import crm_routesLoader from "./app-routes/crm-Loader";
const crm_repositories = crm_repositoriesLoader();
const crm_services = crm_servicesLoader(crm_repositories);

// Initialize Controllers
const crm_controllers = crm_controllersLoader(crm_services);
crm_routesLoader(app, crm_controllers);

//--------------------- karnalweb tech
import karnal_repositoriesLoader from "./loaders/karnalwebtech/repositoriesLoader";
import karnal_servicesLoader from "./loaders/karnalwebtech/servicesLoader";
import karnal_controllersLoader from "./loaders/karnalwebtech/controllersLoader";
import karnal_routesLoader from "./app-routes/karnal-web-tech-loader";
import ImageRepository from "./utils/comman-repositories/imageRepository";
import ImageController from "./api/karnalwebtech/controllers/image-controller";
import portfolioRoutes from "./api/karnalwebtech/routes/portfolio-route";
import imageRoutes from "./api/karnalwebtech/routes/image-route";
const karnal_repositories = karnal_repositoriesLoader();
const karnal_services = karnal_servicesLoader(karnal_repositories);

// Initialize Controllers
const karnal_controllers = karnal_controllersLoader(karnal_services);
karnal_routesLoader(app, karnal_controllers);

//comman router
// Initialize dependencies
const imageRepository = new ImageRepository();
const imageController = new ImageController(imageRepository);

// Add routes
app.use("/api/v2/image", imageRoutes(imageController));
//--------------- allmiddleware
app.use(errorMiddleware);

export default app;
