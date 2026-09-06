'use client';

import React, { useState } from 'react';
import { 
  Copy, 
  Check, 
  Mail, 
  Linkedin, 
  Phone, 
  ExternalLink, 
  Activity,
  Zap
} from 'lucide-react';
import { profile } from '@/data/site';

export default function LiveDispatchTerminal() {
  const [formData, setFormData] = useState({
    firstName: 'Alex',
    lastName: 'Vance',
    email: 'alex@enterprise-ai.com',
    organization: 'Enterprise Operations AI',
    message: 'Seeking production agentic architecture review and sub-250ms voice integration.',
  });

  const [copied, setCopied] = useState(false);
  const [isTransmitting, setIsTransmitting] = useState(false);

  // Exact packet structure requested
  const jsonPayload = {
    target: "DHRUBO_EDGE_NODE",
    engagement_type: "APPLIED_AI_PLATFORM_ENGINEERING",
    sender: `${formData.firstName} ${formData.lastName}`.trim() || "[Typing Name...]",
    email: formData.email || "[Typing Email...]",
    organization: formData.organization || "[Typing Organization...]",
    payload: formData.message || "[Typing Message...]",
    timestamp: new Date().toISOString(),
  };

  const jsonString = JSON.stringify(jsonPayload, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTransmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsTransmitting(true);

    setTimeout(() => {
      setIsTransmitting(false);
      const fullName = `${formData.firstName} ${formData.lastName}`.trim();
      const subject = encodeURIComponent(`[DISPATCH] Engagement Inquiry: ${fullName} (${formData.organization})`);
      const body = encodeURIComponent(
        `TARGET: DHRUBO_EDGE_NODE\n` +
        `ENGAGEMENT: APPLIED_AI_PLATFORM_ENGINEERING\n` +
        `SENDER: ${fullName}\n` +
        `ORGANIZATION: ${formData.organization}\n` +
        `EMAIL: ${formData.email}\n\n` +
        `PAYLOAD / DIRECTIVE:\n${formData.message}\n\n` +
        `[Compiled live via dhrubo.shop Live Dispatch Node]`
      );
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    }, 450);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 border-b border-[var(--line)] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <div className="font-mono-tech text-xs text-[var(--aqua)] tracking-wider uppercase mb-1">
              {"// LIVE DISPATCH NODE"}
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-[var(--text)] tracking-tight font-mono-tech">
              Let&apos;s Build Something Exceptional
            </h2>
          </div>
          <div className="flex items-center gap-2 font-mono-tech text-xs text-[var(--green)]">
            <span className="w-2 h-2 rounded-full bg-[var(--green)] animate-pulse" />
            SYNCHRONIZED WITH DISPATCH SERVER
          </div>
        </div>

        {/* Two-Column Split Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Active Monospace Code Terminal (Mutates Character-by-Character) */}
          <div className="lg:col-span-6 flex flex-col justify-between p-6 sm:p-8 rounded-xl bg-[rgba(5,7,10,0.92)] border border-[var(--line)] shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[rgba(165,227,217,0.15)]">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[var(--rust)]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[var(--gold)]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[var(--green)]" />
                  </div>
                  <span className="ml-2 font-mono-tech text-xs text-[var(--aqua)] font-bold">
                    {"// dispatch_packet.json"}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 font-mono-tech text-[10px] text-[var(--muted)]">
                  <Activity size={12} className="text-[var(--aqua)] animate-pulse" />
                  LIVE COMPILER ACTIVE
                </div>
              </div>

              {/* Code Box with Syntax Highlighting and Blinking Cursor */}
              <div className="p-4 rounded-lg bg-[var(--panel)] border border-[rgba(165,227,217,0.1)] overflow-x-auto max-h-[380px]">
                <pre className="font-mono-tech text-xs text-[var(--soft)] leading-relaxed">
                  <code>{jsonString}</code>
                  <span className="inline-block w-2 h-3.5 ml-1 bg-[var(--aqua)] animate-pulse align-middle" />
                </pre>
              </div>
            </div>

            {/* Terminal Actions */}
            <div className="mt-6 pt-4 border-t border-[rgba(165,227,217,0.1)] flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={handleCopy}
                className="px-4 py-2 rounded-lg bg-[var(--panel-2)] border border-[var(--line)] hover:border-[var(--aqua)] text-xs font-mono-tech text-[var(--soft)] flex items-center gap-2 transition-colors cursor-pointer"
              >
                {copied ? <Check size={14} className="text-[var(--green)]" /> : <Copy size={14} />}
                {copied ? 'PACKET COPIED' : 'COPY JSON PACKET'}
              </button>

              <span className="font-mono-tech text-[11px] text-[var(--muted)]">
                COMPILER: DHRUBO_EDGE_NODE
              </span>
            </div>

            {/* Direct Channels */}
            <div className="mt-6 pt-4 border-t border-[rgba(165,227,217,0.1)]">
              <div className="font-mono-tech text-xs text-[var(--muted)] mb-3">
                {"// VERIFIED DIRECT CHANNELS"}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono-tech">
                <a
                  href={`mailto:${profile.email}`}
                  className="p-2.5 rounded bg-[var(--panel-2)] border border-[rgba(165,227,217,0.08)] hover:border-[var(--aqua)] text-[var(--soft)] flex items-center gap-2 truncate transition-colors"
                >
                  <Mail size={13} className="text-[var(--aqua)] shrink-0" />
                  <span className="truncate">{profile.email}</span>
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded bg-[var(--panel-2)] border border-[rgba(165,227,217,0.08)] hover:border-[var(--aqua)] text-[var(--soft)] flex items-center gap-2 truncate transition-colors"
                >
                  <Linkedin size={13} className="text-[var(--aqua)] shrink-0" />
                  <span className="truncate">LinkedIn / Dhrubojyoti</span>
                </a>
                <a
                  href={profile.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded bg-[var(--panel-2)] border border-[rgba(165,227,217,0.08)] hover:border-[var(--aqua)] text-[var(--soft)] flex items-center gap-2 truncate transition-colors"
                >
                  <Phone size={13} className="text-[var(--green)] shrink-0" />
                  <span className="truncate">{profile.phone}</span>
                </a>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded bg-[var(--panel-2)] border border-[rgba(165,227,217,0.08)] hover:border-[var(--aqua)] text-[var(--soft)] flex items-center gap-2 truncate transition-colors"
                >
                  <ExternalLink size={13} className="text-[var(--aqua)] shrink-0" />
                  <span className="truncate">GitHub @dhruboshop</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Input Fields */}
          <form 
            onSubmit={handleTransmit}
            className="lg:col-span-6 p-6 sm:p-8 rounded-xl glass-panel border border-[var(--line)] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-[rgba(165,227,217,0.1)]">
                <span className="font-mono-tech text-xs text-[var(--aqua)] font-bold">
                  DIRECT DISPATCH PARAMETERS
                </span>
                <span className="font-mono-tech text-xs text-[var(--muted)]">
                  AUTO-SYNC TRANSMITTER
                </span>
              </div>

              <div className="space-y-4">
                {/* First Name & Last Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono-tech text-xs text-[var(--soft)] mb-1">
                      FIRST NAME
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[var(--panel-2)] border border-[var(--line)] text-sm font-mono-tech text-[var(--text)] focus:border-[var(--aqua)] focus:outline-none transition-colors"
                      placeholder="Alex"
                    />
                  </div>
                  <div>
                    <label className="block font-mono-tech text-xs text-[var(--soft)] mb-1">
                      LAST NAME
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[var(--panel-2)] border border-[var(--line)] text-sm font-mono-tech text-[var(--text)] focus:border-[var(--aqua)] focus:outline-none transition-colors"
                      placeholder="Vance"
                    />
                  </div>
                </div>

                {/* Email & Organization */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono-tech text-xs text-[var(--soft)] mb-1">
                      EMAIL ADDRESS
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[var(--panel-2)] border border-[var(--line)] text-sm font-mono-tech text-[var(--text)] focus:border-[var(--aqua)] focus:outline-none transition-colors"
                      placeholder="alex@enterprise-ai.com"
                    />
                  </div>
                  <div>
                    <label className="block font-mono-tech text-xs text-[var(--soft)] mb-1">
                      ORGANIZATION
                    </label>
                    <input
                      type="text"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[var(--panel-2)] border border-[var(--line)] text-sm font-mono-tech text-[var(--text)] focus:border-[var(--aqua)] focus:outline-none transition-colors"
                      placeholder="Company or Lab"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block font-mono-tech text-xs text-[var(--soft)] mb-1">
                    MESSAGE / PROJECT DIRECTIVE
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[var(--panel-2)] border border-[var(--line)] text-sm font-mono-tech text-[var(--text)] focus:border-[var(--aqua)] focus:outline-none transition-colors resize-none"
                    placeholder="Describe your AI architecture targets, telephony requirements, or platform scale..."
                  />
                </div>
              </div>
            </div>

            {/* Submit Button with Compilation Flash Animation */}
            <div className="mt-8 pt-6 border-t border-[rgba(165,227,217,0.1)]">
              <button
                type="submit"
                disabled={isTransmitting}
                className={`w-full py-3.5 px-6 rounded-lg font-mono-tech text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer tracking-wider ${
                  isTransmitting 
                    ? 'bg-white text-[var(--bg)] shadow-[0_0_30px_#ffffff] scale-[0.98]'
                    : 'bg-[var(--aqua)] text-[var(--bg)] hover:brightness-110 glow-aqua-sm'
                }`}
              >
                <Zap size={14} className={isTransmitting ? 'animate-spin' : ''} />
                {isTransmitting ? '[ COMPILING & TRANSMITTING... ]' : '[ EXECUTE TRANSMISSION ]'}
              </button>
            </div>
          </form>

        </div>
      </div>
    </section>
  );
}
