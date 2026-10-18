# سوديك إيست — Landing Page

Next.js 16.4.2 · React 19.3 · Tailwind CSS 4.3 · TypeScript · Web3Forms · Static build

## التشغيل

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # كل الصفحات Static (○)
```

## قبل الرفع — عدّل `lib/site.ts` فقط

| الحقل | المطلوب |
|---|---|
| `url` | الدومين الفعلي |
| `phoneDisplay` / `phoneTel` / `whatsapp` | أرقام المشروع (حاليًا 01001050018) |
| `web3formsKey` | Access key من web3forms.com — من غيره الفورم بيعمل محاكاة نجاح بس |
| `gtagId` + `conversions` | AW-ID والـ labels (form / whatsapp / call) — الـ gtag مش بيتحمّل طول ما فيه XXXX |
| `UNITS` | الأسعار والمساحات — الحاسبة بتقرا `price` من هنا |

## الصور — `public/images/`

صور رسمية: `hero` (بار حمام السباحة) · `overview` (البحيرة وقت الغروب) · `lagoon` · `water-garden` · `building-k` · `building-z-beach` · `living-room` · `location-map` · `brochure` (مقصوصة من building-z) · `og.jpg`.

ربط الصور بالوحدات والمعرض في `lib/site.ts` (`UNITS[].image` و `GALLERY`). تاون هاوس وفيلا ميدوز من غير صورة، وبيظهروا بكارت بألوان البراند. لما تجيلك صورهم ضيف `image: "/images/xxx.webp"` في الوحدة.

## اللي في الصفحة

هيرو بالأرقام + فورم ← شريط معلومات ← نظرة عامة ← كروت الوحدات (فلتر بالمرحلة) ← طلب أسعار ← خطة السداد ← **حاسبة أقساط** ← المخططات ← معرض صور + Lightbox ← البروشور ← الخدمات ← الموقع (خريطة بتتحمل عند الضغط) ← ليه تستثمر ← المطوّر ← FAQ ← CTA نهائي.

- مودال ليد واحد لكل الأزرار (بيبعت اسم الوحدة والمصدر مع الليد)
- Popup عند 55% scroll أو 16 ثانية — مرة واحدة في الجلسة
- رسائل واتساب جاهزة باسم كل وحدة · بار سفلي للموبايل · زر واتساب عائم للديسكتوب
- تتبع conversions لـ form / WhatsApp / call + `dataLayer` events
- Honeypot + تحقق رقم مصري/دولي · `/thank-you` noindex
- Cookie consent · Privacy و Disclaimer كمودال · إفصاح الوكيل المعتمد · "أسعار استرشادية"
- JSON-LD (RealEstateAgent + Product/AggregateOffer + FAQPage) · sitemap · robots
