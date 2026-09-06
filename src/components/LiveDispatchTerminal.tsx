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
    sender_name: 'Engineering Leader',
    organization: 'Enterprise AI Lab',
    return_channel: 'partner@enterprise.com',
    scope: 'AI Systems Architecture & LangGraph',
    urgency_timeline: 'Immediate (Q1 2026)',
    parameters: 'Seeking production agentic architecture review and sub-250ms voice integration.',
  });

  const [copied, setCopied] = useState(false);

  // Generate live JSON telemetry payload
  const jsonPayload = {
    protocol: 'DHRUBO_DISPATCH_v2.6',
    timestamp: new Date().toISOString().slice(0, 19) + 'Z',
    origin_node: 'LIVE_TERMINAL_INTERFACE',
    target_node: profile.email,
    sender: {
      name: formData.sender_name || 'ANONYMOUS',
      organization: formData.organization || 'UNSPECIFIED',
      return_channel: formData.return_channel || 'NO_RETURN_CHANNEL',
    },
    directive: {
      scope: formData.scope,
      timeline: formData.urgency_timeline,
      parameters: formData.parameters || 'EMPTY_DIRECTIVE',
    },
    system_telemetry: {
      location: 'Kolkata, India [IST]',
      encryption: 'TLS_1.3_VERIFIED',
      status: 'READY_FOR_TRANSMISSION',
    },
  };

  const jsonString = JSON.stringify(jsonPayload, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTransmit = () => {
    const subject = encodeURIComponent(`[DISPATCH] ${formData.scope} - ${formData.organization}`);
    const body = encodeURIComponent(
      `SENDER: ${formData.sender_name}\n` +
      `ORGANIZATION: ${formData.organization}\n` +
      `RETURN CHANNEL: ${formData.return_channel}\n` +
      `SCOPE: ${formData.scope}\n` +
      `TIMELINE: ${formData.urgency_timeline}\n\n` +
      `DIRECTIVE PARAMETERS:\n${formData.parameters}\n\n` +
      `[Transmitted via dhrubo.shop live dispatch terminal]`
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
              {"// LIVE DISPATCH TERMINAL"}
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-[var(--text)] tracking-tight">
              Real-Time JSON Protocol Synchronization
            </h2>
          </div>
          <div className="flex items-center gap-2 font-mono-tech text-xs text-[var(--green)]">
            <span className="w-2 h-2 rounded-full bg-[var(--green)] animate-pulse" />
            SYNCHRONIZED WITH DISPATCH SERVER
          </div>
        </div>

        {/* 2-Column Live Terminal Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Column 1: Input Form Controls */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-xl glass-panel border border-[var(--line)]">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-[rgba(165,227,217,0.1)]">
              <span className="font-mono-tech text-xs text-[var(--aqua)] font-bold">
                TRANSMISSION PARAMETERS
              </span>
              <span className="font-mono-tech text-xs text-[var(--muted)]">
                INPUT_STREAM: ACTIVE
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block font-mono-tech text-xs text-[var(--soft)] mb-1">
                  SENDER_NAME
                </label>
                <input
                  type="text"
                  value={formData.sender_name}
                  onChange={(e) => setFormData({ ...formData, sender_name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[var(--panel-2)] border border-[var(--line)] text-sm font-mono-tech text-[var(--text)] focus:border-[var(--aqua)] focus:outline-none"
                  placeholder="Your Name"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono-tech text-xs text-[var(--soft)] mb-1">
                    ORGANIZATION
                  </label>
                  <input
                    type="text"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[var(--panel-2)] border border-[var(--line)] text-sm font-mono-tech text-[var(--text)] focus:border-[var(--aqua)] focus:outline-none"
                    placeholder="Company or Lab"
                  />
                </div>
                <div>
                  <label className="block font-mono-tech text-xs text-[var(--soft)] mb-1">
                    RETURN_CHANNEL (EMAIL)
                  </label>
                  <input
                    type="email"
                    value={formData.return_channel}
                    onChange={(e) => setFormData({ ...formData, return_channel: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[var(--panel-2)] border border-[var(--line)] text-sm font-mono-tech text-[var(--text)] focus:border-[var(--aqua)] focus:outline-none"
                    placeholder="name@domain.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono-tech text-xs text-[var(--soft)] mb-1">
                    SCOPE OF ENGAGEMENT
                  </label>
                  <select
                    value={formData.scope}
                    onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[var(--panel-2)] border border-[var(--line)] text-xs font-mono-tech text-[var(--text)] focus:border-[var(--aqua)] focus:outline-none"
                  >
                    <option>AI Systems Architecture &amp; LangGraph</option>
                    <option>Sub-250ms Voice AI Pipeline (Vapi/WebSockets)</option>
                    <option>Enterprise Automation &amp; n8n Workflows</option>
                    <option>Full-Stack AI Surface &amp; Next.js 15</option>
                    <option>Commercial RevOps &amp; Database-Tier Logic</option>
                    <option>Founding Engineer / Advisory</option>
                  </select>
                </div>
                <div>
                  <label className="block font-mono-tech text-xs text-[var(--soft)] mb-1">
                    TIMELINE / URGENCY
                  </label>
                  <select
                    value={formData.urgency_timeline}
                    onChange={(e) => setFormData({ ...formData, urgency_timeline: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[var(--panel-2)] border border-[var(--line)] text-xs font-mono-tech text-[var(--text)] focus:border-[var(--aqua)] focus:outline-none"
                  >
                    <option>Immediate (Q1 2026)</option>
                    <option>Within 30 Days</option>
                    <option>Exploratory / Planning</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-mono-tech text-xs text-[var(--soft)] mb-1">
                  DIRECTIVE_PARAMETERS (MESSAGE)
                </label>
                <textarea
                  rows={4}
                  value={formData.parameters}
                  onChange={(e) => setFormData({ ...formData, parameters: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[var(--panel-2)] border border-[var(--line)] text-sm font-mono-tech text-[var(--text)] focus:border-[var(--aqua)] focus:outline-none"
                  placeholder="Outline project parameters, scale, and requirements..."
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap gap-3">
                <button
                  onClick={handleTransmit}
                  className="px-5 py-2.5 rounded-lg bg-[var(--aqua)] text-[var(--bg)] font-mono-tech text-xs font-bold hover:brightness-110 transition-all flex items-center gap-2 glow-aqua-sm cursor-pointer"
                >
                  <Send size={14} /> TRANSMIT DISPATCH
                </button>
                <button
                  onClick={handleCopy}
                  className="px-4 py-2.5 rounded-lg bg-[var(--panel-2)] border border-[var(--line)] hover:border-[var(--aqua)] text-xs font-mono-tech text-[var(--soft)] flex items-center gap-2 transition-colors cursor-pointer"
                >
                  {copied ? <Check size={14} className="text-[var(--green)]" /> : <Copy size={14} />}
                  {copied ? 'PAYLOAD COPIED' : 'COPY JSON SPEC'}
                </button>
              </div>
            </div>
          </div>

          {/* Column 2: Live Real-Time JSON Synchronization Terminal */}
          <div className="lg:col-span-6 flex flex-col justify-between p-6 sm:p-8 rounded-xl bg-[rgba(5,7,10,0.9)] border border-[var(--line)] shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[rgba(165,227,217,0.15)]">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[var(--rust)]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[var(--gold)]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[var(--green)]" />
                  </div>
                  <span className="ml-2 font-mono-tech text-xs text-[var(--aqua)]">
                    payload_preview.json
                  </span>
                </div>
                <div className="flex items-center gap-1.5 font-mono-tech text-[10px] text-[var(--muted)]">
                  <Activity size={12} className="text-[var(--aqua)] animate-pulse" />
                  REAL-TIME SYNCHRONIZATION
                </div>
              </div>

              {/* JSON Code Window */}
              <div className="p-4 rounded-lg bg-[var(--panel)] border border-[rgba(165,227,217,0.1)] overflow-x-auto max-h-[360px]">
                <pre className="font-mono-tech text-xs text-[var(--soft)] leading-relaxed">
                  <code>{jsonString}</code>
                </pre>
              </div>
            </div>

            {/* Direct Fallback Channels */}
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

        </div>
      </div>
    </section>
  );
}
