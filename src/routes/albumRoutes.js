import express from 'express';
import { albumController } from '../controllers/albumController.js';
import { auth } from '../middleware/auth.js';
import { roleCheck } from '../middleware/roleCheck.js';

const router = express.Router();

router.get('/', auth, albumController.getAllAlbums);
router.get('/:id', auth, albumController.getAlbumById);
router.post('/add-album', auth, roleCheck(['admin', 'editor']), albumController.createAlbum);
router.put('/:id', auth, roleCheck(['admin', 'editor']), albumController.updateAlbum);
router.delete('/:id', auth, roleCheck(['admin', 'editor']), albumController.deleteAlbum);

export default router;

