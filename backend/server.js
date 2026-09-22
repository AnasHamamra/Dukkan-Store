require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const productRoutes = require('./routes/products');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Dukkan API is running ✓' });
});

app.use('/api/products', productRoutes);

// معالج أخطاء عام
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'حدث خطأ في السيرفر' });
});

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('خطأ: لازم تحط MONGO_URI بملف .env');
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✓ تم الاتصال بقاعدة البيانات MongoDB');
    app.listen(PORT, () => console.log(`✓ السيرفر شغال على البورت ${PORT}`));
  })
  .catch((err) => {
    console.error('✗ فشل الاتصال بقاعدة البيانات:', err.message);
  });
