"use client";

import React, { useState } from "react";
import Link from "next/link";

export const ChatNPPreview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"agri" | "legal" | "edu">("agri");

  const scenarios = {
    agri: {
      title: "कृषि परामर्श (Agriculture Intelligence)",
      query: "मेरो गोलभेंडाको पातमा कालो दाग देखिएको छ, के गर्ने होला?",
      response:
        "यो गोलभेंडामा लाग्ने 'अगेती डढुवा' (Early Blight) को लक्षण हुन सक्छ। तत्काल रोकथामका लागि:\n\n१. संक्रमित पातहरू टिपेर नष्ट गर्नुहोस्।\n२. बिरुवाको फेदमा मात्र पानी हाल्नुहोस् (पातमा पानी नपर्ने गरी)।\n३. जैविक नियन्त्रणका लागि ट्राइकोडर्मा (Trichoderma) वा कपर अक्सिक्लोराइड २ ग्राम प्रति लिटर पानीमा मिसाएर छर्कनुहोस्।",
      model: "NP1 MONI • Agri Pipeline",
    },
    legal: {
      title: "कानुनी तथा प्रशासनिक (Legal & Compliance)",
      query: "प्राइभेट लिमिटेड कम्पनी दर्ता गर्न आवश्यक न्यूनतम कागजात के-के हुन्?",
      response:
        "नेपालमा कम्पनी रजिष्ट्रारको कार्यालय (OCR) मा प्राइभेट लिमिटेड कम्पनी दर्ता गर्दा चाहिने मुख्य कागजातहरू:\n\n१. प्रबन्धपत्र (MOA) र नियमावली (AOA) को मस्यौदा।\n२. संस्थापक सेयरधनीहरूको नागरिकताको प्रतिलिपि।\n३. कार्यालय रहने स्थानको घरबहाल सम्झौता वा लालपुर्जा प्रतिलिपि।",
      model: "NP1 MONI • Legal RAG",
    },
    edu: {
      title: "शिक्षा र शिक्षण (Education & Nepali NLP)",
      query: "नेपाली व्याकरणमा 'कर्मवाच्य' र 'भाववाच्य' को फरक उदाहरणसहित बुझाइदेऊ।",
      response:
        "कर्मवाच्यमा कर्म (Object) को प्रधानता हुन्छ भने भाववाच्यमा क्रियाको भाव मुख्य हुन्छ।\n\n• कर्मवाच्य: 'रामद्वारा भात खाइयो।' (यहाँ 'भात' कर्म हो)\n• भाववाच्य: 'मबाट हिँडियो।' वा 'बसियो।' (यहाँ कर्म हुँदैन, केवल क्रियाको भाव हुन्छ)",
      model: "NP1 MONI • Grammar Engine",
    },
  };

  const current = scenarios[activeTab];

  return (
    <section id="chatnp-preview" className="py-16 md:py-24 bg-[var(--bg-surface)] border-y border-[var(--border-card)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[var(--bg-base)] border border-[var(--border-card)] text-[var(--text-secondary)] mb-4">
            Active MVP Terminal
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)]">
            Ready to Experience ChatNP?
          </h2>
          <p className="mt-3 text-sm text-[var(--text-secondary)]">
            ChatNP is a working prototype available for testing today — powered by a single unified NP1 MONI model, built for native Nepali AI.
          </p>

          <div className="mt-6 inline-flex p-1 rounded-xl bg-[var(--bg-base)] border border-[var(--border-card)]">
            {(["agri", "legal", "edu"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                  activeTab === tab
                    ? "bg-[var(--text-primary)] text-[var(--bg-base)] shadow-xs"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                {tab === "agri" ? "कृषि" : tab === "legal" ? "कानुन" : "शिक्षा"}
              </button>
            ))}
          </div>
        </div>

        {/* Terminal Card */}
        <div className="rounded-2xl border border-[var(--border-card)] bg-[var(--bg-base)] shadow-lg overflow-hidden">
          <div className="px-5 py-3 border-b border-[var(--border-card)] bg-[var(--bg-surface)] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400/80" />
              <div className="w-3 h-3 rounded-full bg-amber-400/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
              <span className="ml-2 text-xs font-mono text-[var(--text-tertiary)]">
                ChatNP Terminal — {current.model}
              </span>
            </div>
            <Link
              href="/chat"
              className="text-xs font-semibold text-[var(--accent-gold)] hover:underline"
            >
              Launch ChatNP Studio →
            </Link>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            <div className="flex justify-end">
              <div className="max-w-[85%] sm:max-w-[70%] px-4 py-3 rounded-2xl rounded-tr-sm bg-[var(--text-primary)] text-[var(--bg-base)] text-sm font-medium leading-relaxed">
                {current.query}
              </div>
            </div>

            <div className="flex justify-start">
              <div className="max-w-[95%] sm:max-w-[85%] px-5 py-4 rounded-2xl rounded-tl-sm bg-[var(--bg-surface)] border border-[var(--border-card)] text-sm text-[var(--text-primary)] leading-relaxed whitespace-pre-line">
                {current.response}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatNPPreview;
