import Head from 'next/head';
import { Share2, Copy, CheckCircle, ArrowRight, Car } from 'lucide-react';
import { useState } from 'react';

const SHARE_URL = 'https://www.myparkingpal.app/?utm_source=friend&utm_medium=share&utm_campaign=waitlist_referral';
const SHARE_TEXT = 'Hey, I joined this waitlist for a new app that reminds you before street sweeping in LB. Could save us $70 tickets 😅';

export default function SharePage() {
  const [copied, setCopied] = useState(false);

  const encodedText = encodeURIComponent(SHARE_TEXT);
  const encodedUrl = encodeURIComponent(SHARE_URL);

  const links = {
    x: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
    sms: `sms:&body=${encodedText}%20${encodedUrl}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`${SHARE_TEXT} ${SHARE_URL}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (_) {}
  };

  return (
    <>
      <Head>
        <title>Thanks for Joining — Be a Pal | MyParkingPal</title>
        <meta name="description" content="Be a Pal. Help Long Beach drivers avoid $70 tickets—share MyParkingPal with friends." />
        <meta property="og:title" content="Be a Pal — Share MyParkingPal" />
        <meta property="og:description" content="Help your friends avoid $70 street sweeping tickets." />
        <meta property="og:url" content="https://www.myparkingpal.app/share" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <div className="max-w-3xl mx-auto px-6 py-24 text-center">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-3 rounded-2xl shadow-lg">
              <Car className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">MyParkingPal</h1>
          </div>

          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-900 px-4 py-2 rounded-full text-sm font-medium mb-8">
            <CheckCircle className="w-4 h-4" />
            You’re confirmed — welcome to the waitlist!
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Be a Pal. Save a Friend $70.
          </h2>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            A quick share helps other Long Beach drivers avoid street sweeping tickets.
            Spread the word and we’ll bring MyParkingPal to more neighborhoods faster.
          </p>

          <div className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-6">
            <a
              href={links.x}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black text-white px-5 py-4 rounded-xl font-semibold hover:opacity-90 transition flex items-center justify-center gap-2"
            >
              <Share2 className="w-5 h-5" />
              Share on X
            </a>
            <a
              href={links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-5 py-4 rounded-xl font-semibold hover:bg-green-600 transition flex items-center justify-center gap-2"
            >
              <Share2 className="w-5 h-5" />
              WhatsApp
            </a>
            <a
              href={links.sms}
              className="bg-blue-600 text-white px-5 py-4 rounded-xl font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
            >
              <Share2 className="w-5 h-5" />
              Text (SMS)
            </a>
          </div>

          <button
            onClick={copyToClipboard}
            className="mx-auto bg-white border border-gray-200 px-5 py-4 rounded-xl font-semibold hover:bg-gray-50 transition flex items-center justify-center gap-2 shadow-sm"
          >
            <Copy className="w-5 h-5" />
            {copied ? 'Copied!' : 'Copy Link'}
          </button>

          <div className="mt-12 text-gray-500 text-sm">
            or
            <a href="/" className="text-emerald-600 hover:underline ml-1 inline-flex items-center gap-1">
              head back to the homepage <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
