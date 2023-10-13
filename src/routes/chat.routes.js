import { Router } from "express";
import { realTimeProducts } from '../controllers/chat.controller.js';
const router = Router();


router.get("/realtimeproducts", realTimeProducts);

export default router;