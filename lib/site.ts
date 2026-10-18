// ===================================================================
//  إعدادات مشتركة لكل الصفحات — بيانات كل مشروع في lib/projects/
// ===================================================================

export const SITE = {
  url: "https://www.sodic-east.com", // ← غيّرها للدومين الفعلي
  agent: "Grandeur Spaces",
  agentSite: "https://grandeur-spaces.com",

  // رقم واحد للمكالمات والواتساب في كل الصفحات
  phoneDisplay: "0127 770 7799",
  phoneTel: "+201277707799",
  whatsapp: "201277707799",
  email: "leads@grandeur-spaces.com",

  // Web3Forms — https://web3forms.com
  web3formsKey: "YOUR_WEB3FORMS_ACCESS_KEY",

  // Google Ads — ضع الـ ID والـ labels
  gtagId: "AW-XXXXXXXXXX",
  conversions: {
    form: "FORM_CONVERSION_LABEL",
    whatsapp: "WHATSAPP_CONVERSION_LABEL",
    call: "CALL_CONVERSION_LABEL",
  },
};

export const waLink = (msg: string) => `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}`;

export const fmt = (n: number) => new Intl.NumberFormat("en-US").format(Math.round(n));
