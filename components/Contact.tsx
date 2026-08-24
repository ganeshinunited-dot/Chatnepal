"use client";

import React, { useState } from "react";

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-[var(--bg-surface)] border-y border-[var(--border-card)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[var(--bg-base)] border border-[var(--border-card)] text-[var(--text-secondary)]">
              Get in Touch
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
              Let&apos;s build Nepal&apos;s AI future together.
            </h2>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              Whether you are an investor, developer, or potential partner, we&apos;d love to hear from you.
            </p>

            <div className="space-y-4 pt-4 border-t border-[var(--border-card)] text-sm">
              <div>
                <span className="text-xs font-mono uppercase text-[var(--text-tertiary)] block">Email Founder</span>
                <a href="mailto:ganesh@karktech.tech" className="font-semibold text-[var(--text-primary)] hover:text-[var(--accent-gold)] transition-colors">
                  ganesh@karktech.tech
                </a>
              </div>
              <div>
                <span className="text-xs font-mono uppercase text-[var(--text-tertiary)] block">WhatsApp</span>
                <a href="https://wa.me/9779842902535" target="_blank" rel="noopener noreferrer" className="font-semibold text-[var(--text-primary)] hover:text-[var(--accent-gold)] transition-colors">
                  +977 9842902535
                </a>
              </div>
              <div>
                <span className="text-xs font-mono uppercase text-[var(--text-tertiary)] block">LinkedIn</span>
                <a href="https://linkedin.com/in/ganeshkarki" target="_blank" rel="noopener noreferrer" className="font-semibold text-[var(--text-primary)] hover:text-[var(--accent-gold)] transition-colors">
                  linkedin.com/in/ganeshkarki
                </a>
              </div>
              <div>
                <span className="text-xs font-mono uppercase text-[var(--text-tertiary)] block">Headquarters (Planned)</span>
                <span className="font-semibold text-[var(--text-primary)]">
                  Birtabazar, Jhapa, Nepal
                </span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-[var(--bg-base)] border border-[var(--border-card)]">
              {submitted ? (
                <div className="py-12 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto text-xl font-bold">
                    ✓
                  </div>
                  <h3 className="text-xl font-bold text-[var(--text-primary)]">सन्देश प्राप्त भयो!</h3>
                  <p className="text-sm text-[var(--text-secondary)] max-w-sm mx-auto">
                    Thank you. Your message has been dispatched to the founder.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-[var(--text-secondary)] mb-1.5">First Name</label>
                      <input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-[var(--border-card)] bg-[var(--bg-surface)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-gold)]"
                        placeholder="First Name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase text-[var(--text-secondary)] mb-1.5">Last Name</label>
                      <input
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-[var(--border-card)] bg-[var(--bg-surface)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-gold)]"
                        placeholder="Last Name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-[var(--text-secondary)] mb-1.5">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[var(--border-card)] bg-[var(--bg-surface)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-gold)]"
                      placeholder="name@organization.com"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-[var(--text-secondary)] mb-1.5">Message</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[var(--border-card)] bg-[var(--bg-surface)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-gold)] resize-none"
                      placeholder="Your message..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl bg-[var(--text-primary)] text-[var(--bg-base)] text-sm font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-xs"
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
