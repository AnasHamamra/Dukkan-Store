// عدّل هذا الرابط بعد نشر الـ backend على Render (أو استخدم localhost أثناء التطوير)
const API_BASE_URL = 'http://localhost:5000/api';

async function apiGet(path) {
  const res = await fetch(`${API_BASE_URL}${path}`);
  if (!res.ok) throw new Error('فشل جلب البيانات');
  return res.json();
}

async function apiPost(path, data) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('فشل إضافة البيانات');
  return res.json();
}

async function apiPut(path, data) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('فشل تعديل البيانات');
  return res.json();
}

async function apiDelete(path) {
  const res = await fetch(`${API_BASE_URL}${path}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('فشل حذف البيانات');
  return res.json();
}
