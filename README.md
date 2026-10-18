# سوديك — Landing Pages (سوديك إيست + ذا استيتس ريزيدنسز)

Next.js 16.4.2 · React 19.3 · Tailwind CSS 4.3 · TypeScript · Web3Forms · Static build

## التشغيل

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # كل الصفحات Static (○)
```

## الصفحات

| Route | المشروع | الداتا |
|---|---|---|
| `/` | سوديك إيست — هليوبوليس الجديدة | `lib/projects/sodic-east.ts` |
| `/the-estates` | ذا استيتس ريزيدنسز — نيو زايد | `lib/projects/the-estates.ts` |

كل صفحة ليها thank-you خاص بيها (`/thank-you` و `/the-estates/thank-you`) — اعمل conversion منفصل لكل واحدة لو حابب.
مشروع جديد = ملف داتا جديد في `lib/projects/` + فولدر في `app/` فيه `page.tsx` بنفس شكل `app/the-estates/page.tsx`، وضيف لينكه في `PROJECT_LINKS` في `components/Footer.tsx` وفي `app/sitemap.ts`.

## الإعدادات المشتركة — `lib/site.ts`

| الحقل | المطلوب |
|---|---|
| `url` | الدومين الفعلي |
| `phoneDisplay` / `phoneTel` / `whatsapp` | رقم واحد للمكالمات والواتساب في كل الصفحات (حاليًا 01277707799) |
| `web3formsKey` | Access key من web3forms.com — من غيره الفورم بيعمل محاكاة نجاح بس |
| `gtagId` + `conversions` | AW-ID والـ labels (form / whatsapp / call) — الـ gtag مش بيتحمّل طول ما فيه XXXX |


## الصور — `public/images/`

صور رسمية: `hero` (بار حمام السباحة) · `overview` (البحيرة وقت الغروب) · `lagoon` · `water-garden` · `building-k` · `building-z-beach` · `living-room` · `location-map` · `brochure` (مقصوصة من building-z) · `og.jpg`.

صور ذا استيتس في `public/images/estates/` (مقصوصة من بروشور سوديك الرسمي، ومعاها 5 مخططات حقيقية للشقق).

الأسعار والوحدات والصور لكل مشروع في ملف الداتا بتاعه (`units[].image`, `gallery`). الوحدات اللي من غير صورة (ميدوز، وفيلات ذا استيتس) بتظهر بكارت بألوان البراند — لما تجيلك صورها ضيف `image`. `priceMode: "avg"` بيخلي الكروت تقول "متوسط السعر" بدل "يبدأ من".

## اللي في الصفحة

هيرو بالأرقام + فورم ← شريط معلومات ← نظرة عامة ← كروت الوحدات (فلتر بالمرحلة) ← طلب أسعار ← خطة السداد ← **حاسبة أقساط** ← المخططات ← معرض صور + Lightbox ← البروشور ← الخدمات ← الموقع (خريطة بتتحمل عند الضغط) ← ليه تستثمر ← المطوّر ← FAQ ← CTA نهائي.

- مودال ليد واحد لكل الأزرار (بيبعت اسم الوحدة والمصدر مع الليد)
- Popup عند 55% scroll أو 16 ثانية — مرة واحدة في الجلسة
- رسائل واتساب جاهزة باسم كل وحدة · بار سفلي للموبايل · زر واتساب عائم للديسكتوب
- تتبع conversions لـ form / WhatsApp / call + `dataLayer` events
- Honeypot + تحقق رقم مصري/دولي · `/thank-you` noindex
- Cookie consent · Privacy و Disclaimer كمودال · إفصاح الوكيل المعتمد · "أسعار استرشادية"
- JSON-LD (RealEstateAgent + Product/AggregateOffer + FAQPage) · sitemap · robots
