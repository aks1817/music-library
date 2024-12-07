import express from 'express';
import { artistController } from '../controllers/artistController.js';
import { auth } from '../middleware/auth.js';
import { roleCheck } from '../middleware/roleCheck.js';

const router = express.Router();

router.get('/', auth, artistController.getAllArtists);
router.get('/:id', auth, artistController.getArtistById);
router.post('/add-artist', auth, roleCheck(['admin', 'editor']), artistController.createArtist);
router.put('/:id', auth, roleCheck(['admin', 'editor']), artistController.updateArtist);
router.delete('/:id', auth, roleCheck(['admin', 'editor']), artistController.deleteArtist);

export default router;

