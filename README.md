# دكّان — متجر إلكتروني Full-Stack

مشروع متجر إلكتروني كامل بـ Backend حقيقي، مبني بـ:
- **Backend:** Node.js + Express + MongoDB (Mongoose) — REST API كامل (CRUD)
- **Frontend:** HTML + CSS + Vanilla JavaScript — صفحة متجر + لوحة تحكم

---

## 1. تشغيل المشروع محلياً على جهازك

### أ) تجهيز قاعدة البيانات (MongoDB Atlas - مجاني)
1. اذهب إلى https://www.mongodb.com/cloud/atlas وأنشئ حساب مجاني
2. أنشئ Cluster مجاني (Free Tier - M0)
3. من Database Access أنشئ مستخدم بكلمة سر
4. من Network Access اسمح بالوصول من أي مكان (0.0.0.0/0) للتطوير
5. من Connect → Drivers، انسخ رابط الاتصال (connection string)

### ب) تشغيل الـ Backend
```bash
cd backend
npm install
cp .env.example .env
# افتح ملف .env وحط رابط MongoDB الحقيقي تبعك بدل القيمة الافتراضية
npm start
```
السيرفر رح يشتغل على: `http://localhost:5000`

### ج) تشغيل الـ Frontend
افتح ملف `frontend/index.html` مباشرة بالمتصفح (أو استخدم إضافة Live Server بـ VS Code).
تأكد إن `frontend/js/api.js` فيه `http://localhost:5000/api` أثناء التطوير المحلي.

---

## 2. النشر Live (بعد ما تتأكد إنه شغال محلياً)

### نشر الـ Backend على Render (مجاني)
1. ارفع مجلد المشروع كامل على GitHub (repo واحد)
2. اذهب إلى https://render.com وسجل حساب (تقدر تربطه بـ GitHub مباشرة)
3. اضغط New → Web Service واختر الـ repo تبعك
4. Root Directory: `backend`
5. Build Command: `npm install`
6. Start Command: `npm start`
7. من Environment أضف المتغير `MONGO_URI` بقيمة رابط MongoDB Atlas تبعك
8. اضغط Deploy — بعد دقائق رح ياخذ رابط شبيه `https://dukkan-api.onrender.com`

### نشر الـ Frontend على Vercel
1. عدّل ملف `frontend/js/api.js` وغيّر `API_BASE_URL` لرابط الـ Render تبعك + `/api`
   (مثلاً: `https://dukkan-api.onrender.com/api`)
2. ارفع التعديل على GitHub
3. من Vercel، استورد نفس الـ repo واختر Root Directory: `frontend`
4. Deploy — بتاخذ رابط شبيه `https://dukkan-store.vercel.app`

**ملاحظة:** الخطة المجانية بـ Render بتنيم السيرفر بعد فترة خمول، فأول طلب بعد فترة راحة ممكن ياخذ 30-50 ثانية للاستجابة — هذا طبيعي بالخطط المجانية.

---

## بنية المشروع
```
dukkan-store/
├── backend/
│   ├── models/Product.js       # نموذج بيانات المنتج
│   ├── routes/products.js      # مسارات API (CRUD)
│   ├── server.js                # نقطة تشغيل السيرفر
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── index.html               # صفحة المتجر للعملاء
│   ├── admin.html               # لوحة تحكم المنتجات
│   ├── css/style.css
│   └── js/
│       ├── api.js               # دوال التواصل مع API
└── README.md
```

## المزايا التقنية اللي فيها المشروع (لوصف البورتفوليو)
- REST API كامل بعمليات CRUD (Create, Read, Update, Delete)
- ربط قاعدة بيانات MongoDB عبر Mongoose مع Schema validation
- فصل كامل بين Frontend و Backend (Separation of Concerns)
- معالجة أخطاء (Error Handling) في الـ API والواجهة
- فلترة منتجات حسب الفئة (Query Parameters)
- لوحة تحكم إدارية كاملة (Admin Dashboard) بعمليات إضافة/تعديل/حذف
- تصميم متجاوب بالكامل مع دعم RTL للعربي
