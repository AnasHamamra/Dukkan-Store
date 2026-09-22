const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET /api/products — جلب كل المنتجات (مع فلترة اختيارية حسب الفئة)
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.category) filter.category = req.query.category;
    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/products/:id — جلب منتج واحد
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'المنتج غير موجود' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/products — إضافة منتج جديد
router.post('/', async (req, res) => {
  try {
    const product = new Product(req.body);
    const saved = await product.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /api/products/:id — تعديل منتج موجود
router.put('/:id', async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ error: 'المنتج غير موجود' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/products/:id — حذف منتج
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'المنتج غير موجود' });
    res.json({ message: 'تم حذف المنتج بنجاح' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
