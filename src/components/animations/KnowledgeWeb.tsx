"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface Node {
  id: string;
  x: number;
  y: number;
  label: string;
  icon: string;
  color: string;
}

interface Connection {
  from: string;
  to: string;
}

const nodes: Node[] = [
  { id: "github", x: 15, y: 25, label: "GitHub", icon: "code", color: "#7d9980" },
  { id: "jira", x: 85, y: 20, label: "Jira", icon: "ticket", color: "#e89830" },
  { id: "confluence", x: 25, y: 75, label: "Docs", icon: "doc", color: "#b87333" },
  { id: "slack", x: 75, y: 80, label: "Slack", icon: "chat", color: "#1e3a5f" },
  { id: "notion", x: 50, y: 15, label: "Notion", icon: "page", color: "#c94d4d" },
  { id: "linear", x: 10, y: 50, label: "Linear", icon: "linear", color: "#7d9980" },
  { id: "brain", x: 50, y: 50, label: "Kool AI", icon: "brain", color: "#e89830" },
];

const connections: Connection[] = [
  { from: "github", to: "brain" },
  { from: "jira", to: "brain" },
  { from: "confluence", to: "brain" },
  { from: "slack", to: "brain" },
  { from: "notion", to: "brain" },
  { from: "linear", to: "brain" },
];

const icons: Record<string, React.ReactElement> = {
  code: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
    />
  ),
  ticket: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
    />
  ),
  doc: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
    />
  ),
  chat: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
    />
  ),
  page: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
    />
  ),
  linear: (
    <g transform="scale(0.24)">
      <path
        fill="currentColor"
        stroke="none"
        d="M1.22541 61.5228c-.2225-.9485.90748-1.5459 1.59638-.857L39.3342 97.1782c.6889.6889.0915 1.8189-.857 1.5964C20.0515 94.4522 5.54779 79.9485 1.22541 61.5228ZM.00189135 46.8891c-.01764375.2833.08887215.5599.28957165.7606L52.3503 99.7085c.2007.2007.4773.3075.7606.2896 2.3692-.1476 4.6938-.46 6.9624-.9259.7645-.157 1.0301-1.0963.4782-1.6481L2.57595 39.4485c-.55186-.5519-1.49117-.2863-1.648174.4782-.465915 2.2686-.77832 4.5932-.92588465 6.9624ZM4.21093 29.7054c-.16649.3738-.08169.8106.20765 1.1l64.77602 64.776c.2894.2894.7262.3742 1.1.2077 1.7861-.7956 3.5171-1.6927 5.1855-2.684.5521-.328.6373-1.0867.1832-1.5407L8.43566 24.3367c-.45409-.4541-1.21271-.3689-1.54074.1832-.99132 1.6684-1.88843 3.3994-2.68399 5.1855ZM12.6587 18.074c-.3701-.3701-.393-.9637-.0443-1.3541C21.7795 6.45931 35.1114 0 49.9519 0 77.5927 0 100 22.4073 100 50.0481c0 14.8405-6.4593 28.1724-16.7199 37.3375-.3903.3487-.984.3258-1.3542-.0443L12.6587 18.074Z"
      />
    </g>
  ),
  brain: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
    />
  ),
};

export function KnowledgeWeb() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeConnection, setActiveConnection] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveConnection((prev) => (prev + 1) % connections.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const getNodePosition = (id: string) => {
    const node = nodes.find((n) => n.id === id);
    return node ? { x: node.x, y: node.y } : { x: 50, y: 50 };
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[400px] md:min-h-[500px]"
    >
      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--amber)" stopOpacity="0.3" />
            <stop offset="50%" stopColor="var(--amber)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="var(--amber)" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        {connections.map((conn, index) => {
          const from = getNodePosition(conn.from);
          const to = getNodePosition(conn.to);
          const isActive = index === activeConnection;

          return (
            <g key={`${conn.from}-${conn.to}`}>
              {/* Base line */}
              <line
                x1={`${from.x}%`}
                y1={`${from.y}%`}
                x2={`${to.x}%`}
                y2={`${to.y}%`}
                stroke="var(--border-strong)"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              {/* Animated line overlay */}
              {isActive && (
                <motion.line
                  x1={`${from.x}%`}
                  y1={`${from.y}%`}
                  x2={`${to.x}%`}
                  y2={`${to.y}%`}
                  stroke="url(#lineGradient)"
                  strokeWidth="2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                />
              )}
            </g>
          );
        })}
      </svg>

      {/* Nodes */}
      {nodes.map((node, index) => {
        const isBrain = node.id === "brain";
        const isConnecting =
          connections[activeConnection]?.from === node.id ||
          connections[activeConnection]?.to === node.id;

        return (
          <motion.div
            key={node.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1, duration: 0.4, ease: "backOut" }}
          >
            <motion.div
              className={`
                flex flex-col items-center gap-2
                ${isBrain ? "scale-125" : ""}
              `}
              animate={isConnecting ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              {/* Node circle */}
              <div
                className={`
                  relative flex items-center justify-center
                  ${isBrain ? "w-16 h-16 md:w-20 md:h-20" : "w-12 h-12 md:w-14 md:h-14"}
                  rounded-full bg-paper border-2 shadow-lg
                  transition-colors duration-300
                `}
                style={{
                  borderColor: isConnecting ? node.color : "var(--border-strong)",
                  boxShadow: isConnecting
                    ? `0 0 20px ${node.color}40`
                    : "0 4px 12px rgba(0,0,0,0.1)",
                }}
              >
                <svg
                  className={`${isBrain ? "w-8 h-8 md:w-10 md:h-10" : "w-6 h-6 md:w-7 md:h-7"}`}
                  fill="none"
                  stroke={node.color}
                  viewBox="0 0 24 24"
                >
                  {icons[node.icon]}
                </svg>

                {/* Pulse effect for brain */}
                {isBrain && (
                  <motion.div
                    className="absolute inset-0 rounded-full border-2"
                    style={{ borderColor: node.color }}
                    animate={{
                      scale: [1, 1.4, 1.4],
                      opacity: [0.5, 0, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                  />
                )}
              </div>

              {/* Label */}
              <span
                className={`
                  text-xs md:text-sm font-medium font-sans
                  px-2 py-0.5 rounded-full bg-paper/80
                  ${isBrain ? "text-amber font-semibold" : "text-muted"}
                `}
              >
                {node.label}
              </span>
            </motion.div>
          </motion.div>
        );
      })}

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-amber/40"
          style={{
            left: `${20 + Math.random() * 60}%`,
            top: `${20 + Math.random() * 60}%`,
          }}
          animate={{
            y: [-10, 10, -10],
            x: [-5, 5, -5],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        />
      ))}
    </div>
  );
}

