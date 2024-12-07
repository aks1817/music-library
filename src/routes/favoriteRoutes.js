import express from 'express';
import { favoriteController } from '../controllers/favoriteController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/:category', auth, favoriteController.getFavorites);
router.post('/add-favorite', auth, favoriteController.addFavorite);
router.delete('/remove-favorite/:id', auth, favoriteController.removeFavorite);

export default router;

