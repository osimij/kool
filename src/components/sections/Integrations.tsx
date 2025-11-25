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
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
    <path d="M2.513 12.833c.115.164.298.338.47.512l7.672 7.672c.174.173.348.355.512.47a5.138 5.138 0 007.319-7.032L11.545 7.51c-.173-.174-.347-.356-.511-.47a5.138 5.138 0 00-8.521 5.793zm.97-4.478a3.862 3.862 0 016.32 1.306L3.177 16.29a3.862 3.862 0 01.306-7.935zm4.478 12.162a3.862 3.862 0 01-1.306-6.32l6.626-6.626a3.862 3.862 0 015.306 5.306l-6.626 6.626a3.862 3.862 0 01-4 1.014z"/>
  </svg>
);

const NotionLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
    <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.98-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.166V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952l1.448.327s0 .84-1.168.84l-3.22.186c-.094-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.14c-.093-.514.28-.887.747-.933zM2.718 1.321l13.496-.933c1.635-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.933.653.933 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.948c0-.839.374-1.54 1.262-1.626z"/>
  </svg>
);

const ConfluenceLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
    <path d="M1.393 18.828c-.191.312-.404.678-.604 1.019a.984.984 0 00.346 1.345l3.949 2.428a.978.978 0 001.343-.244c.173-.27.392-.6.64-.96 1.57-2.295 3.135-2.018 5.986-.837l3.703 1.528a.984.984 0 001.238-.479l2.02-4.158a.982.982 0 00-.478-1.307l-3.634-1.503c-4.962-2.05-8.748-1.523-12.509 3.168zm21.214-13.655c.191-.312.404-.678.604-1.02a.984.984 0 00-.346-1.344L18.916.38a.978.978 0 00-1.343.244c-.173.271-.392.6-.64.96-1.57 2.296-3.135 2.019-5.986.838L7.244.893a.984.984 0 00-1.238.479L3.986 5.53a.982.982 0 00.478 1.307l3.634 1.502c4.962 2.05 8.748 1.524 12.509-3.166z"/>
  </svg>
);

const SlackLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
    <path d="M5.042 15.165a2.528 2.528 0 01-2.52 2.523A2.528 2.528 0 010 15.165a2.527 2.527 0 012.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 012.521-2.52 2.527 2.527 0 012.521 2.52v6.313A2.528 2.528 0 018.834 24a2.528 2.528 0 01-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 01-2.521-2.52A2.528 2.528 0 018.834 0a2.528 2.528 0 012.521 2.522v2.52H8.834zm0 1.271a2.528 2.528 0 012.521 2.521 2.528 2.528 0 01-2.521 2.521H2.522A2.528 2.528 0 010 8.834a2.528 2.528 0 012.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 012.522-2.521A2.528 2.528 0 0124 8.834a2.528 2.528 0 01-2.522 2.521h-2.522V8.834zm-1.27 0a2.528 2.528 0 01-2.523 2.521 2.527 2.527 0 01-2.52-2.521V2.522A2.527 2.527 0 0115.163 0a2.528 2.528 0 012.523 2.522v6.312zM15.163 18.956a2.528 2.528 0 012.523 2.522A2.528 2.528 0 0115.163 24a2.527 2.527 0 01-2.52-2.522v-2.522h2.52zm0-1.27a2.527 2.527 0 01-2.52-2.523 2.526 2.526 0 012.52-2.52h6.315A2.528 2.528 0 0124 15.163a2.528 2.528 0 01-2.522 2.523h-6.315z"/>
  </svg>
);

const DiscordLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
);

const FigmaLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
    <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 00-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148zm7.704 0h-.098c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.098c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm-.097-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h.098c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-.098z"/>
  </svg>
);

const AsanaLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
    <path d="M18.78 12.653c-2.882 0-5.22 2.336-5.22 5.218s2.338 5.218 5.22 5.218 5.22-2.336 5.22-5.218-2.338-5.218-5.22-5.218zm-13.56 0c-2.882 0-5.22 2.336-5.22 5.218s2.338 5.218 5.22 5.218 5.22-2.336 5.22-5.218-2.338-5.218-5.22-5.218zM12 1.911c-2.882 0-5.22 2.336-5.22 5.218s2.338 5.218 5.22 5.218 5.22-2.336 5.22-5.218S14.882 1.911 12 1.911z"/>
  </svg>
);

// Integration data with colors
const integrations = [
  { name: "GitHub", Logo: GitHubLogo, color: "#ffffff" },
  { name: "GitLab", Logo: GitLabLogo, color: "#FC6D26" },
  { name: "Jira", Logo: JiraLogo, color: "#0052CC" },
  { name: "Linear", Logo: LinearLogo, color: "#5E6AD2" },
  { name: "Notion", Logo: NotionLogo, color: "#ffffff" },
  { name: "Confluence", Logo: ConfluenceLogo, color: "#0052CC" },
  { name: "Slack", Logo: SlackLogo, color: "#E01E5A" },
  { name: "Discord", Logo: DiscordLogo, color: "#5865F2" },
  { name: "Figma", Logo: FigmaLogo, color: "#F24E1E" },
  { name: "Asana", Logo: AsanaLogo, color: "#F06A6A" },
];

// Globe component with orbiting logos
function OrbitingGlobe() {
  // Each logo gets its own orbit configuration
  const logoConfigs = [
    { lat: 0, startAngle: 0, duration: 18, direction: 1 },      // GitHub - equator
    { lat: 0, startAngle: 180, duration: 18, direction: 1 },    // GitLab - equator opposite
    { lat: -30, startAngle: 60, duration: 22, direction: -1 },  // Jira - upper
    { lat: -30, startAngle: 240, duration: 22, direction: -1 }, // Linear - upper opposite
    { lat: 30, startAngle: 120, duration: 20, direction: 1 },   // Notion - lower
    { lat: 30, startAngle: 300, duration: 20, direction: 1 },   // Confluence - lower opposite
    { lat: -55, startAngle: 30, duration: 26, direction: -1 },  // Slack - top
    { lat: -55, startAngle: 210, duration: 26, direction: -1 }, // Discord - top opposite
    { lat: 55, startAngle: 150, duration: 24, direction: 1 },   // Figma - bottom
    { lat: 55, startAngle: 330, duration: 24, direction: 1 },   // Asana - bottom opposite
  ];

  const globeRadius = 190;

  return (
    <div className="relative w-[520px] h-[520px] mx-auto" style={{ perspective: "1000px" }}>
      {/* Dynamic keyframes for each logo - orbit and counter-rotation */}
      <style>{`
        ${logoConfigs.map((config, i) => {
          const latRad = config.lat * Math.PI / 180;
          const orbitRadius = Math.round(globeRadius * Math.cos(latRad) * 100) / 100;
          const yPos = Math.round(globeRadius * Math.sin(latRad) * 0.92 * 100) / 100; // slight compression for perspective
          const dir = config.direction;
          const endAngle = config.startAngle + (360 * dir);
          
          return `
            @keyframes orbit${i} {
              0% { 
                transform: rotateX(18deg) translateY(${yPos}px) rotateY(${config.startAngle}deg) translateZ(${orbitRadius}px) rotateY(${-config.startAngle}deg) rotateX(-18deg);
              }
              100% { 
                transform: rotateX(18deg) translateY(${yPos}px) rotateY(${endAngle}deg) translateZ(${orbitRadius}px) rotateY(${-endAngle}deg) rotateX(-18deg);
              }
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
            key={integration.name}
            className="orbit-container"
            style={{
              animation: `orbit${i} ${config.duration}s linear infinite`,
            }}
          >
            <div className="logo-card-wrapper">
              <div 
                className="w-[52px] h-[52px] rounded-xl flex items-center justify-center"
                style={{ 
                  backgroundColor: "#131313",
                  border: `1.5px solid ${integration.color}`,
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
    <section className="py-24 bg-[#0c0c0c] relative overflow-hidden" id="integrations" ref={ref}>
      <Container>
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          <h2 className="font-display text-3xl sm:text-4xl text-white mb-4">
            Connects in 60 seconds
          </h2>
          <p className="text-white/50 mb-12">OAuth. No tokens. No config files.</p>
          
          {/* Orbiting Globe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16"
          >
            <OrbitingGlobe />
          </motion.div>
          
          {/* Integration logos as text - minimal */}
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4">
            {integrations.map((integration, i) => (
              <motion.span
                key={integration.name}
                className="text-lg font-medium text-white/30 hover:text-white/70 transition-colors cursor-default"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: i * 0.05 }}
              >
                {integration.name}
              </motion.span>
            ))}
            <motion.span
              className="text-lg font-medium text-white/50"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
            >
              + more
            </motion.span>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
