import React, { useState } from 'react';
import Head from 'next/head';
import { Car, Shield, MapPin, Bell, CheckCircle, ArrowRight, Phone, ExternalLink, Star } from 'lucide-react';

const LandingPage = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hp, setHp] = useState(''); // honeypot

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || loading) return;

    setLoading(true);
    setError('');

    try {
      const resp = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, hp }),
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data?.error || 'Subscription failed');

      setIsSubmitted(true);
      setEmail('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const EmailForm = ({ className = "" }) => (
    <form
      onSubmit={handleSubmit}
      className={`max-w-lg mx-auto ${className}`}
      noValidate
      aria-label="Join the MyParkingPal waitlist"
    >
      {/* Honeypot (hidden to humans, catches bots) */}
      <input
        type="text"
        name="company"
        value={hp}
        onChange={(e) => setHp(e.target.value)}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      {!isSubmitted ? (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <label htmlFor="email" className="sr-only">Email address</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-6 py-4 bg-white/90 backdrop-blur border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 placeholder-gray-500 shadow-lg transition-all"
              aria-describedby="privacy-note"
            />
            <button
              type="submit"
              disabled={!email || loading}
              className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-emerald-700 hover:to-teal-700 disabled:opacity-50 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {loading ? 'Submitting…' : 'Get Early Access'}
              {!loading && <ArrowRight className="w-5 h-5" />}
            </button>
          </div>
          <p id="privacy-note" className="text-sm text-gray-600 text-center">
            We'll only email you about the launch. No spam, ever.
          </p>
          {error && <p className="text-sm text-red-600 text-center">{error}</p>}
        </div>
      ) : (
        <div className="bg-white/90 backdrop-blur border border-emerald-200 rounded-2xl p-8 shadow-xl" role="status" aria-live="polite">
          <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
          <h3 className="text-emerald-900 font-semibold text-lg mb-2 text-center">You're on the list!</h3>
          <p className="text-emerald-700 text-center">We'll email you when the app launches.</p>
        </div>
      )}
    </form>
  );

  const EmailFormDark = ({ className = "" }) => (
    <form
      onSubmit={handleSubmit}
      className={`max-w-lg mx-auto ${className}`}
      noValidate
      aria-label="Join the MyParkingPal waitlist"
    >
      {/* Honeypot */}
      <input
        type="text"
        name="company"
        value={hp}
        onChange={(e) => setHp(e.target.value)}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      {!isSubmitted ? (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <label htmlFor="email-dark" className="sr-only">Email address</label>
            <input
              id="email-dark"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-6 py-4 bg-white/10 backdrop-blur border border-white/20 rounded-xl focus:ring-2 focus:ring-white focus:border-white text-white placeholder-gray-300 transition-all"
              aria-describedby="privacy-note-dark"
            />
            <button
              type="submit"
              disabled={!email || loading}
              className="bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 disabled:opacity-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {loading ? 'Submitting…' : 'Join Waitlist'}
            </button>
          </div>
          <p id="privacy-note-dark" className="text-sm text-gray-300 text-center">
            We'll only email you about the launch. No spam, ever.
          </p>
          {error && <p className="text-sm text-red-300 text-center">{error}</p>}
        </div>
      ) : (
        <div className="text-white text-center" role="status" aria-live="polite">
          <CheckCircle className="w-12 h-12 mx-auto mb-4" />
          <p className="text-xl">Thanks! We'll be in touch soon.</p>
        </div>
      )}
    </form>
  );

  return (
    <>
      <Head>
        <title>MyParkingPal - Stop Street Sweeping Tickets in Long Beach</title>
        <meta name="description" content="Smart street sweeping reminders for Long Beach. Stop getting $70 tickets. Built by a Long Beach driver." />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50"></div>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2310b981' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>

          <div className="relative py-24 px-6" id="waitlist">
            <div className="max-w-5xl mx-auto text-center">
              <div className="mb-12">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-3 rounded-2xl shadow-lg">
                    <Car className="w-8 h-8 text-white" />
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 tracking-tight">MyParkingPal</h1>
                </div>
                <div className="inline-flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-8 shadow-lg">
                  <Star className="w-4 h-4" />
                  Long Beach Exclusive
                </div>
              </div>

              <h2 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight tracking-tight">
                Stop $70 Street
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                  Sweeping Tickets
                </span>
              </h2>

              <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
                Smart street sweeping reminders that actually work. Built by a Long Beach driver who got tired of expensive tickets.
              </p>

              <EmailForm />
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="py-24 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16 tracking-tight">
              3 Taps, Zero Tickets
            </h2>

            <div className="grid md:grid-cols-3 gap-12 max-w-4xl mx-auto">
              <div className="text-center group">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Park</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Enter your address and which side of the street you're on
                </p>
              </div>

              <div className="text-center group">
                <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300">
                  <Bell className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Relax</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Get smart reminders the night before and morning of sweeping
                </p>
              </div>

              <div className="text-center group">
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Save</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Avoid $70+ tickets automatically, every single time
                </p>
              </div>
            </div>

            <div className="text-center mt-16">
              <button
                type="button"
                onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-10 py-4 rounded-xl font-semibold text-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Join the Waitlist
              </button>
            </div>
          </div>
        </div>

        {/* Why MyParkingPal */}
        <div className="py-24 px-6 bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16 tracking-tight">
              Finally, An App That Gets Long Beach
            </h2>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-white/70 backdrop-blur p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200/50 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Actually Local</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Built specifically for LB streets and regulations, not 200 random cities with generic data
                </p>
              </div>

              <div className="bg-white/70 backdrop-blur p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200/50 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Privacy First</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Everything stays on your phone. No tracking, no data collection, no surprises
                </p>
              </div>

              <div className="bg-white/70 backdrop-blur p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200/50 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Just Works</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  No GPS guessing games or unreliable crowd-sourced data. Simple, accurate, reliable
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Social Proof */}
        <div className="py-24 px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-8 tracking-tight">
              You're Not Alone
            </h2>
            <p className="text-xl text-gray-600 text-center mb-16 font-light">
              Survey: 53% of Long Beach drivers reported getting ≥1 ticket per year
            </p>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-2xl border border-emerald-100 shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="bg-emerald-500 text-white p-2 rounded-full flex-shrink-0">
                    <Star className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-gray-800 text-lg italic mb-3 leading-relaxed">
                      "This would have saved me two tickets already."
                    </p>
                    <p className="text-sm text-gray-600 font-medium">— r/longbeach user</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-2xl border border-emerald-100 shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="bg-emerald-500 text-white p-2 rounded-full flex-shrink-0">
                    <Star className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-gray-800 text-lg italic mb-3 leading-relaxed">
                      "I love this idea, would it work for families with multiple cars?"
                    </p>
                    <p className="text-sm text-gray-600 font-medium">— Reddit feedback</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Resources */}
        <div className="py-20 px-6 bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 tracking-tight">
              Helpful Resources for LB Drivers
            </h2>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a
                href="tel:+15625702876"
                className="flex items-center gap-3 bg-white/70 backdrop-blur px-6 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200/50 group"
              >
                <Phone className="w-5 h-5 text-emerald-600 group-hover:scale-110 transition-transform" />
                <span className="text-gray-700 font-medium">LB Public Works: (562) 570-2876</span>
              </a>

              <a
                href="https://x.com/LBPublicWorks"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-white/70 backdrop-blur px-6 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200/50 group"
              >
                <ExternalLink className="w-5 h-5 text-emerald-600 group-hover:scale-110 transition-transform" />
                <span className="text-gray-700 font-medium">@LBPublicWorks on X</span>
              </a>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="relative py-24 px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
          {/* Background Pattern */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>

          <div className="relative max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              Stop Playing{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                Parking Roulette
              </span>
            </h2>

            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
              Join Long Beach drivers on the waitlist. Be first to try the app that could save you hundreds per year.
            </p>

            <EmailFormDark />
          </div>
        </div>

        {/* Footer */}
        <div className="py-12 px-6 bg-gray-950 text-center border-t border-gray-800">
          <div className="max-w-4xl mx-auto space-y-4">
            <p className="text-gray-400">© MyParkingPal 2025</p>
            <p className="text-gray-500 text-sm max-w-md mx-auto">
              Privacy Promise: All data stays on your phone. No tracking, no data collection, ever.
            </p>
            <p className="text-gray-500 text-sm">
              Contact: <span className="text-emerald-400">support@myparkingpal.app</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
