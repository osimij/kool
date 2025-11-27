"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Container } from "@/components/ui";

// App logo SVG components
const GitHubLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);

const GitLabLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
    <path d="M23.955 13.587l-1.342-4.135-2.664-8.189a.455.455 0 00-.867 0L16.418 9.45H7.582L4.918 1.263a.455.455 0 00-.867 0L1.386 9.45.044 13.587a.924.924 0 00.331 1.023L12 23.054l11.625-8.443a.92.92 0 00.33-1.024"/>
  </svg>
);

const JiraLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
    <path d="M11.571 11.513H0a5.218 5.218 0 005.232 5.215h2.13v2.057A5.215 5.215 0 0012.575 24V12.518a1.005 1.005 0 00-1.005-1.005zm5.723-5.756H5.736a5.215 5.215 0 005.215 5.214h2.129v2.058a5.218 5.218 0 005.215 5.214V6.758a1.001 1.001 0 00-1.001-1.001zM23.013 0H11.455a5.215 5.215 0 005.215 5.215h2.129v2.057A5.215 5.215 0 0024 12.483V1.005A1.005 1.005 0 0023.013 0z"/>
  </svg>
);

const LinearLogo = () => (
  <img src="/linear-light-logo.svg" alt="Linear" className="w-6 h-6 object-contain" />
);

const NotionLogo = () => (
  <img src="/Notion.png" alt="Notion" className="w-6 h-6 object-contain" />
);

const ConfluenceLogo = () => (
  <img src="/Confluence.png" alt="Confluence" className="w-6 h-6 object-contain" />
);

const SlackLogo = () => (
  <img src="/Slack.png" alt="Slack" className="w-6 h-6 object-contain" />
);

const DiscordLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
);

const FigmaLogo = () => (
  <img src="/Figma-logo.svg" alt="Figma" className="w-6 h-6 object-contain" />
);

const AsanaLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
    <path d="M18.78 12.653c-2.882 0-5.22 2.336-5.22 5.218s2.338 5.218 5.22 5.218 5.22-2.336 5.22-5.218-2.338-5.218-5.22-5.218zm-13.56 0c-2.882 0-5.22 2.336-5.22 5.218s2.338 5.218 5.22 5.218 5.22-2.336 5.22-5.218-2.338-5.218-5.22-5.218zM12 1.911c-2.882 0-5.22 2.336-5.22 5.218s2.338 5.218 5.22 5.218 5.22-2.336 5.22-5.218S14.882 1.911 12 1.911z"/>
  </svg>
);

const TrelloLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
    <path d="M21 0H3C1.343 0 0 1.343 0 3v18c0 1.656 1.343 3 3 3h18c1.656 0 3-1.344 3-3V3c0-1.657-1.344-3-3-3zM10.44 18.18c0 .795-.645 1.44-1.44 1.44H4.56c-.795 0-1.44-.645-1.44-1.44V4.56c0-.795.645-1.44 1.44-1.44H9c.795 0 1.44.645 1.44 1.44v13.62zm10.44-6c0 .794-.645 1.44-1.44 1.44H15c-.795 0-1.44-.646-1.44-1.44V4.56c0-.795.645-1.44 1.44-1.44h4.44c.795 0 1.44.645 1.44 1.44v7.62z"/>
  </svg>
);

const DropboxLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
    <path d="M6 1.807L0 5.629l6 3.822 6-3.822zM18 1.807l-6 3.822 6 3.822 6-3.822zM0 13.274l6 3.822 6-3.822-6-3.822zM18 9.452l-6 3.822 6 3.822 6-3.822zM6 18.371l6 3.822 6-3.822-6-3.822z"/>
  </svg>
);

const ZoomLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
    <path d="M24 12c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zm-8.031-3.017c-.315-.003-.626.08-.897.24l-1.074.637v4.28l1.074.637c.271.16.582.243.897.24 1.188 0 1.969-.963 1.969-2.517v-.999c0-1.555-.78-2.518-1.969-2.518zM5.654 9.136c-.103 0-.187.084-.187.187v3.942c0 .931.756 1.687 1.688 1.687h4.156c.103 0 .187-.084.187-.188v-.749c0-.103-.084-.187-.187-.187H7.343c-.207 0-.375-.168-.375-.375v-4.13c0-.103-.084-.187-.188-.187z"/>
  </svg>
);

const MiroLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
    <path d="M17.392 0H13.9L17 4.808 10.444 0H6.949l3.102 6.3L3.494 0H0l3.05 8.131L0 24h3.494L10.05 6.985 6.949 24h3.495L17 5.494 13.899 24h3.493L24 3.672 17.392 0z"/>
  </svg>
);

const VSCodeLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
    <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z"/>
  </svg>
);

const GoogleDriveLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
    <path d="M7.71 3.5L1.15 15l3.43 5.93L11.14 9.5 7.71 3.5m2.86 0l6.57 11.43H24L17.43 3.5H10.57M16 14.93l-3.43 5.93H20.57L24 14.93H16"/>
  </svg>
);

const LoomLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 14.319l-3.465-2.001 3.465-2.001a1.335 1.335 0 0 0 0-2.313l-6.236-3.601a1.335 1.335 0 0 0-2.003 1.156v4.003l-3.465-2.001a1.335 1.335 0 0 0-2.003 1.157v4.562a1.335 1.335 0 0 0 2.003 1.156l3.465-2.001v4.003a1.335 1.335 0 0 0 2.003 1.156l6.236-3.601a1.335 1.335 0 0 0 0-2.313z"/>
  </svg>
);

// Integration data with colors - reduced set for cleaner globe (2 per orbit)
const integrations = [
  { name: "GitHub", Logo: GitHubLogo, color: "#ffffff" },
  { name: "Slack", Logo: SlackLogo, color: "#E01E5A" },
  { name: "Notion", Logo: NotionLogo, color: "#ffffff" },
  { name: "Linear", Logo: LinearLogo, color: "#5E6AD2" },
  { name: "Jira", Logo: JiraLogo, color: "#0052CC" },
  { name: "Figma", Logo: FigmaLogo, color: "#F24E1E" },
  { name: "GitLab", Logo: GitLabLogo, color: "#FC6D26" },
  { name: "Confluence", Logo: ConfluenceLogo, color: "#0052CC" },
  { name: "Discord", Logo: DiscordLogo, color: "#5865F2" },
  { name: "VS Code", Logo: VSCodeLogo, color: "#007ACC" },
];

// All integrations for the text list
const allIntegrations = [
  "GitHub", "GitLab", "Jira", "Linear", "Notion", "Confluence", 
  "Slack", "Discord", "Figma", "Asana", "Trello", "Dropbox", 
  "Zoom", "Miro", "VS Code", "Google Drive", "Loom"
];

// Globe component with orbiting logos
function OrbitingGlobe() {
  // Each logo gets its own orbit configuration - 2 icons per ring, 180° apart for clean spacing
  const logoConfigs = [
    // Equator ring (lat: 0) - 2 icons
    { lat: 0, startAngle: 0, duration: 40, direction: 1 },
    { lat: 0, startAngle: 180, duration: 40, direction: 1 },
    // Upper ring (lat: -30) - 2 icons
    { lat: -30, startAngle: 90, duration: 45, direction: -1 },
    { lat: -30, startAngle: 270, duration: 45, direction: -1 },
    // Lower ring (lat: 30) - 2 icons
    { lat: 30, startAngle: 45, duration: 42, direction: 1 },
    { lat: 30, startAngle: 225, duration: 42, direction: 1 },
    // Top ring (lat: -55) - 2 icons
    { lat: -55, startAngle: 135, duration: 50, direction: -1 },
    { lat: -55, startAngle: 315, duration: 50, direction: -1 },
    // Bottom ring (lat: 55) - 2 icons
    { lat: 55, startAngle: 20, duration: 48, direction: 1 },
    { lat: 55, startAngle: 200, duration: 48, direction: 1 },
  ];

  const globeRadius = 190;

  return (
    <div className="relative w-[520px] h-[520px] mx-auto" style={{ perspective: "1000px" }}>
      {/* Dynamic keyframes for each logo - orbit and counter-rotation with visibility */}
      <style>{`
        ${logoConfigs.map((config, i) => {
          const latRad = config.lat * Math.PI / 180;
          const orbitRadius = Math.round(globeRadius * Math.cos(latRad) * 100) / 100;
          const yPos = Math.round(globeRadius * Math.sin(latRad) * 0.92 * 100) / 100;
          const dir = config.direction;
          
          // Helper functions for visibility calculation
          const norm = (a: number) => ((a % 360) + 360) % 360;
          const isVisible = (angle: number) => {
            const n = norm(angle);
            return n < 90 || n > 270;
          };
          
          // Calculate percentage to reach a target angle
          const pAtAngle = (target: number) => {
            let diff = target - config.startAngle;
            if (dir > 0) {
              while (diff < 0) diff += 360;
              while (diff >= 360) diff -= 360;
            } else {
              while (diff > 0) diff -= 360;
              while (diff <= -360) diff += 360;
              diff = -diff;
            }
            return Math.round((diff / 360) * 1000) / 10;
          };
          
          const angleAtP = (p: number) => config.startAngle + dir * 360 * p / 100;
          
          const p90 = pAtAngle(90);
          const p270 = pAtAngle(270);
          const startVisible = isVisible(config.startAngle);
          const epsilon = 0.5;
          
          // Build keyframe stops
          type Stop = { p: number; angle: number; opacity: number };
          const stops: Stop[] = [];
          
          // Start
          stops.push({ p: 0, angle: config.startAngle, opacity: startVisible ? 1 : 0 });
          
          // Add transition points
          const transitions = [p90, p270].sort((a, b) => a - b);
          transitions.forEach(tp => {
            if (tp > epsilon && tp < 100 - epsilon) {
              const beforeAngle = angleAtP(tp - epsilon);
              const afterAngle = angleAtP(tp + epsilon);
              const beforeOpacity = isVisible(beforeAngle) ? 1 : 0;
              const afterOpacity = isVisible(afterAngle) ? 1 : 0;
              if (beforeOpacity !== afterOpacity) {
                stops.push({ p: Math.round((tp - epsilon) * 10) / 10, angle: beforeAngle, opacity: beforeOpacity });
                stops.push({ p: Math.round((tp + epsilon) * 10) / 10, angle: afterAngle, opacity: afterOpacity });
              }
            }
          });
          
          // End
          const endAngle = config.startAngle + dir * 360;
          stops.push({ p: 100, angle: endAngle, opacity: startVisible ? 1 : 0 });
          
          // Sort by percentage
          stops.sort((a, b) => a.p - b.p);
          
          // Generate keyframe CSS - with counter-rotation to keep icons facing camera
          return `
            @keyframes orbit${i} {
              ${stops.map(s => {
                return `${s.p}% { 
                transform: rotateX(18deg) translateY(${yPos}px) rotateY(${s.angle}deg) translateZ(${orbitRadius}px) rotateY(${-s.angle}deg) rotateX(-18deg);
                opacity: ${s.opacity};
              }`;
              }).join('\n              ')}
            }
          `;
        }).join('\n')}
        
        .orbit-container {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          transform-style: preserve-3d;
        }
        
        .logo-card-wrapper {
          position: absolute;
          transform: translateX(-26px) translateY(-26px);
          transform-style: preserve-3d;
        }
      `}</style>

      {/* Globe wireframe SVG */}
      <svg 
        viewBox="0 0 520 520" 
        className="absolute inset-0 w-full h-full"
      >
        {/* Main outer circle */}
        <circle 
          cx="260" cy="260" r={globeRadius} 
          fill="none" 
          stroke="#3a3a3a"
          strokeWidth="1"
        />
        
        {/* Horizontal latitude lines */}
        {[-55, -30, 0, 30, 55].map((lat, i) => {
          const y = Math.round((260 + globeRadius * Math.sin(lat * Math.PI / 180) * 0.92) * 100) / 100;
          const rx = Math.round(globeRadius * Math.cos(lat * Math.PI / 180) * 100) / 100;
          const ry = Math.round(rx * 0.17 * 100) / 100;
          return (
            <ellipse
              key={`lat-${i}`}
              cx="260"
              cy={y}
              rx={rx}
              ry={ry}
              fill="none"
              stroke="#333333"
              strokeWidth={lat === 0 ? "0.7" : "0.5"}
              opacity={lat === 0 ? 0.7 : 0.5}
            />
          );
        })}
        
        {/* Vertical longitude lines */}
        {[0, 30, 60, 90, 120, 150].map((lon, i) => {
          const rx = Math.round(globeRadius * Math.abs(Math.cos(lon * Math.PI / 180)) * 100) / 100;
          return (
            <ellipse
              key={`lon-${i}`}
              cx="260"
              cy="260"
              rx={Math.max(rx, 1)}
              ry={globeRadius}
              fill="none"
              stroke="#333333"
              strokeWidth="0.5"
              opacity="0.5"
            />
          );
        })}
      </svg>

      {/* Orbiting logos */}
      {integrations.map((integration, i) => {
        const config = logoConfigs[i];
        return (
          <div
            key={`${integration.name}-${i}`}
            className="orbit-container"
            style={{
              animation: `orbit${i} ${config.duration}s linear infinite`,
            }}
          >
            <div className="logo-card-wrapper">
              <div 
                className="w-[52px] h-[52px] flex items-center justify-center"
                style={{ 
                  backgroundColor: "#131313",
                  border: "1px solid #2a2a2a",
                  borderRadius: "9999px",
                  color: integration.color,
                }}
              >
                <integration.Logo />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function Integrations() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-[#0c0c0c] relative overflow-hidden" id="integrations" ref={ref}>
      <Container>
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-white mb-3 sm:mb-4">
            Connects in 60 seconds
          </h2>
          <p className="text-sm sm:text-base text-white/50 mb-8 sm:mb-12">OAuth. No tokens. No config files.</p>
          
          {/* Orbiting Globe - responsive scale */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-10 sm:mb-12 md:mb-16 scale-[0.55] sm:scale-75 md:scale-90 lg:scale-100 origin-center -my-16 sm:-my-12 md:-my-6 lg:my-0"
          >
            <OrbitingGlobe />
          </motion.div>
          
          {/* Integration logos as text - all integrations */}
          <div className="flex flex-wrap justify-center items-center gap-x-4 sm:gap-x-6 md:gap-x-8 gap-y-3 sm:gap-y-4">
            {allIntegrations.map((name, i) => (
              <motion.span
                key={name}
                className="text-sm sm:text-base md:text-lg font-medium text-white/30 hover:text-white/70 transition-colors cursor-default"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: i * 0.03 }}
              >
                {name}
              </motion.span>
            ))}
            <motion.span
              className="text-sm sm:text-base md:text-lg font-medium text-white/50"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
            >
              + more
            </motion.span>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
