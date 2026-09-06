'use client';

import React, { useState } from 'react';
import { 
  Send, 
  Copy, 
  Check, 
  Mail, 
  Linkedin, 
  Phone, 
  ExternalLink, 
  Activity 
} from 'lucide-react';
import { profile } from '@/data/site';

export default function LiveDispatchTerminal() {
  const [formData, setFormData] = useState({
    firstName: 'Alex',
    lastName: 'Vance',
    email: 'alex@enterprise-ai.com',
    message: 'Seeking production agentic architecture review and sub-250ms voice integration.',
  });

  const [copied, setCopied] = useState(false);

  // Real-time mutating JSON specification
  const jsonPayload = {
    protocol: 'DHRUBO_DISPATCH_v2.6',
    timestamp: new Date().toISOString().slice(0, 19) + 'Z',
    origin: 'LIVE_DISPATCH_NODE',
    destination: profile.email,
    sender: {
      firstName: formData.firstName || '',
      lastName: formData.lastName || '',
      email: formData.email || '',
    },
    directive: {
      message: formData.message || '',
    },
    system_telemetry: {
      target_location: 'Kolkata, India [IST]',
      encryption: 'TLS_1.3_VERIFIED',
      execution_status: 'READY_FOR_TRANSMIT',
    },
  };

  const jsonString = JSON.stringify(jsonPayload, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTransmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullName = `${formData.firstName} ${formData.lastName}`.trim();
    const subject = encodeURIComponent(`[DISPATCH] Project Inquiry from ${fullName}`);
    const body = encodeURIComponent(
      `SENDER: ${fullName}\n` +
      `EMAIL: ${formData.email}\n\n` +
      `DIRECTIVE / MESSAGE:\n${formData.message}\n\n` +
      `[Compiled via dhrubo.shop Live Dispatch Node]`
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
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
            <h2 className="text-2xl sm:text-4xl font-bold text-[var(--text)] tracking-tight">
              Real-Time Terminal JSON Compiler
            </h2>
          </div>
          <div className="flex items-center gap-2 font-mono-tech text-xs text-[var(--green)]">
            <span className="w-2 h-2 rounded-full bg-[var(--green)] animate-pulse" />
            SYNCHRONIZED WITH DISPATCH SERVER
          </div>
        </div>

        {/* 2-Column Layout: Left Terminal, Right Inputs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Active Monospace Terminal (Character-by-Character mutating JSON) */}
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
                    {"// LIVE DISPATCH NODE: payload.json"}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 font-mono-tech text-[10px] text-[var(--muted)]">
                  <Activity size={12} className="text-[var(--aqua)] animate-pulse" />
                  REAL-TIME COMPILER
                </div>
              </div>

              {/* Code Box with Line Numbers and Blinking Cursor */}
              <div className="p-4 rounded-lg bg-[var(--panel)] border border-[rgba(165,227,217,0.1)] overflow-x-auto max-h-[380px]">
                <pre className="font-mono-tech text-xs text-[var(--soft)] leading-relaxed">
                  <code>{jsonString}</code>
                  <span className="inline-block w-2 h-3.5 ml-1 bg-[var(--aqua)] animate-pulse align-middle" />
                </pre>
              </div>
            </div>

            {/* Quick Actions below Terminal */}
            <div className="mt-6 pt-4 border-t border-[rgba(165,227,217,0.1)] flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={handleCopy}
                className="px-4 py-2 rounded-lg bg-[var(--panel-2)] border border-[var(--line)] hover:border-[var(--aqua)] text-xs font-mono-tech text-[var(--soft)] flex items-center gap-2 transition-colors cursor-pointer"
              >
                {copied ? <Check size={14} className="text-[var(--green)]" /> : <Copy size={14} />}
                {copied ? 'PAYLOAD COPIED' : 'COPY COMPILED JSON'}
              </button>

              <span className="font-mono-tech text-[11px] text-[var(--muted)]">
                SCHEMA: DHRUBO_PROTOCOL_V2.6
              </span>
            </div>

            {/* Direct Channel Fallbacks */}
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
                  <span className="truncate">GitHub @ganguydhrubo</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Inputs (First Name, Last Name, Email, Message) */}
          <form 
            onSubmit={handleTransmit}
            className="lg:col-span-6 p-6 sm:p-8 rounded-xl glass-panel border border-[var(--line)] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-[rgba(165,227,217,0.1)]">
                <span className="font-mono-tech text-xs text-[var(--aqua)] font-bold">
                  DIRECT TRANSMISSION FORM
                </span>
                <span className="font-mono-tech text-xs text-[var(--muted)]">
                  AUTO-COMPILER READY
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

                {/* Email */}
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

                {/* Message */}
                <div>
                  <label className="block font-mono-tech text-xs text-[var(--soft)] mb-1">
                    MESSAGE / PROJECT DIRECTIVE
                  </label>
                  <textarea
                    rows={6}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[var(--panel-2)] border border-[var(--line)] text-sm font-mono-tech text-[var(--text)] focus:border-[var(--aqua)] focus:outline-none transition-colors resize-none"
                    placeholder="Describe your system requirements, timeline, and architectural targets..."
                  />
                </div>
              </div>
            </div>

            {/* Transmit Button */}
            <div className="mt-8 pt-6 border-t border-[rgba(165,227,217,0.1)]">
              <button
                type="submit"
                className="w-full py-3 px-6 rounded-lg bg-[var(--aqua)] text-[var(--bg)] font-mono-tech text-xs font-bold hover:brightness-110 transition-all flex items-center justify-center gap-2 glow-aqua-sm cursor-pointer tracking-wider"
              >
                <Send size={14} /> TRANSMIT DIRECTIVE TO DHRUBO
              </button>
            </div>
          </form>

        </div>
      </div>
    </section>
  );
}
