# @AxteD — O'zbekcha Falsafiy Iqtiboslar & Sokinlik Maskani

> **Rasmiy Landing Page**: [generalaxted.github.io](https://generalaxted.github.io/)  
> **Telegram Kanal**: [@AxteD](https://t.me/AxteD)

---

## 🌙 Loyiha Haqida

Ushbu landing page **@AxteD** Telegram kanalini Google qidiruv tizimida (SEO) yuqori o'rinlarga chiqarish va qalbga orom beruvchi estetik muhitda o'zbekcha sara iqtiboslarni taqdim etish uchun yaratilgan.

### 🌟 Asosiy Xususiyatlar:
- **Estetik Tungi Dizayn**: Glassmorphism, nurlanuvchi to'lin oy va yulduzli fon.
- **Yomg'ir Animatsiyasi & Tovushi**: Canvas asosidagi silliq yomg'ir hamda Web Audio API yordamida yaratilgan sokin yomg'ir shovqini (audio fayllarsiz, to'liq mustaqil).
- **Boy SEO & Meta Teglar**: Google Search Console, OpenGraph, Twitter Card va Schema.org JSON-LD to'liq sozlangan.
- **Iqtiboslar Kutubxonasi**: Toifalar (Sokinlik, Kitoblar, Falsafa, Hayot, Ishq) va tezkor jonli qidiruv tizimi.
- **Interaktiv Imkoniyatlar**: Nusxalash, Telegramga to'g'ridan-to'g'ri ulashish, Kun Iqtibosi va shaxsiy kartochka generatori.

---

## 🚀 GitHub Pages'ga Joylash (Deployment)

Loyihani GitHub'ga yuklash uchun quyidagi buyruqlarni terminalda bajaring:

```bash
git init
git add .
git commit -m "feat: @AxteD estetik landing page va SEO tayyorlandi"
git branch -M main
git remote add origin https://github.com/GeneralAXTED/generalaxted.github.io.git
git push -u origin main
```

> **Eslatma:** Repozitoriy nomi `generalaxted.github.io` bo'lgani sababli sayt bir necha daqiqada `https://generalaxted.github.io/` manzilida avtomatik ishga tushadi.

---

## 🔍 Google Search Console'ga Qo'shish & Indexlash

1. [Google Search Console](https://search.google.com/search-console) saytiga kiring.
2. **URL prefix** bo'limiga `https://generalaxted.github.io/` manzilini kiriting.
3. Tasdiqlash usullaridan **HTML tag** ni tanlang va u yerdagi kodni nusxalang:
   - `index.html` faylidagi ushbu qatorga kodingizni qo'ying:
   ```html
   <meta name="google-site-verification" content="SIZNING_KODINGIZ_BU_YERGA">
   ```
4. O'zgarishni GitHub'ga `git push` qiling va Search Console'da **"Verify"** tugmasini bosing.
5. **Sitemaps** bo'limiga o'tib, `sitemap.xml` manzilini kiriting va **Submit** tugmasini bosing.
6. Google bir necha kunda saytingizni to'liq indexlaydi va `@AxteD`, `o'zbekcha iqtiboslar`, `sokinlik`, `kitoblardan satrlar` kalit so'zlari bo'yicha qidiruvda ko'rsata boshlaydi!
