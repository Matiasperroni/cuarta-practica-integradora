import { Router } from 'express';
import { changeRole, addDocuments } from '../controllers/users.controller.js';
import uploader from '../utils/multer.js';

const router = Router();

router.get("/premium/:uid", changeRole)
router.get("/:uid/documents", uploader('documents').array('documents'), addDocuments)


export default router;