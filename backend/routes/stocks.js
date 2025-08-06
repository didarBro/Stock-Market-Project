import express from 'express';
import auth from '../middleware/auth.js';  // import your auth middleware
import {
  getStocks,
  getStock,
  createStock,
  updateStock,
  deleteStock,
  bulkUpdateStockPrices,
} from '../controllers/stocks.js';

const router = express.Router();

router.get('/', getStocks);
router.get('/:id', getStock);
router.post('/', auth, createStock); // Create stock (admin only?)
router.patch('/bulk-update', auth, bulkUpdateStockPrices); // Bulk price updates - put before /:id
router.patch('/:id', auth, updateStock);
router.delete('/:id', auth, deleteStock);

export default router;
