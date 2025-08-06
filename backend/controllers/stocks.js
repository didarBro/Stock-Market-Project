import express from 'express';
import Stock from '../models/stock.js';
import PurchasedStock from './purchased_stocks.js'; // Adjust if needed

const router = express.Router();

export const getStocks = async (req, res) => {
  try {
    const allStocks = await Stock.find().sort({ id: 1 });
    res.status(200).json(allStocks);
  } catch (error) {
    res.status(404).json({ message: "An error has occurred fetching stocks." });
  }
}

export const getStock = async (req, res) => {
  try {
    const { id } = req.params;
    const oneStock = await Stock.findById(id);
    res.status(200).json(oneStock);
  } catch (error) {
    res.status(404).json({ message: "An error has occurred fetching the stock." });
  }
}

export const createStock = async (req, res) => {
  try {
    const {
      id, ticker, exchange, name, initialPrice, currentPrice,
      description, ipoDate, siteUrl, industries, icon, favorited, timesBought
    } = req.body;

    // Check if stock with same ticker or id already exists
    const existingStock = await Stock.findOne({ $or: [{ ticker }, { id }] });
    if (existingStock) {
      return res.status(409).json({ message: "Stock with this ticker or ID already exists." });
    }

    const newStock = new Stock({
      id, ticker, exchange, name, initialPrice, currentPrice,
      description, ipoDate, siteUrl, industries, icon, favorited, timesBought
    });

    await newStock.save();
    res.status(201).json(newStock);
  } catch (error) {
    res.status(400).json({ message: "An error occurred creating the stock." });
  }
};

export const updateStock = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send(`No stock with id: ${id}`);
    }

    const updatedStock = await Stock.findByIdAndUpdate(id, updates, { new: true });
    res.status(200).json(updatedStock);
  } catch (error) {
    res.status(404).json({ message: "An error occurred updating the stock." });
  }
};

export const deleteStock = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send(`No stock with id: ${id}`);
    }

    // Check if any users have purchased this stock
    const purchasedCount = await PurchasedStock.find({ stock: id }).countDocuments();
    if (purchasedCount > 0) {
      return res.status(400).json({ message: "Cannot delete stock that users have purchased." });
    }

    await Stock.findByIdAndDelete(id);
    res.status(200).json({ message: "Stock successfully deleted!" });
  } catch (error) {
    res.status(404).json({ message: "An error occurred deleting the stock." });
  }
};

export const bulkUpdateStockPrices = async (req, res) => {
  try {
    const { updates } = req.body; // Array of {id/ticker, currentPrice}

    const updatePromises = updates.map(update => {
      const query = update.id ? { _id: update.id } : { ticker: update.ticker };
      return Stock.findOneAndUpdate(query, { currentPrice: update.currentPrice });
    });

    await Promise.all(updatePromises);
    res.status(200).json({ message: `${updates.length} stocks updated successfully!` });
  } catch (error) {
    res.status(400).json({ message: "An error occurred updating stock prices." });
  }
};


export default router;
