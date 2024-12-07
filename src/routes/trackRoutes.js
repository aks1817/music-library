import express from 'express';
import { trackController } from '../controllers/trackController.js';
import { auth } from '../middleware/auth.js';
import { roleCheck } from '../middleware/roleCheck.js';

const router = express.Router();

router.get('/', auth, trackController.getAllTracks);
router.get('/:id', auth, trackController.getTrackById);
router.post('/add-track', auth, roleCheck(['admin', 'editor']), trackController.createTrack);
router.put('/:id', auth, roleCheck(['admin', 'editor']), trackController.updateTrack);
router.delete('/:id', auth, roleCheck(['admin', 'editor']), trackController.deleteTrack);

export default router;

