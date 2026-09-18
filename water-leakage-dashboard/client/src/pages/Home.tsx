import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  Bell,
  Building2,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Droplets,
  Filter,
  Gauge,
  LayoutDashboard,
  LifeBuoy,
  MapPin,
  Menu,
  MoreHorizontal,
  Radio,
  Search,
  Settings,
  ShieldCheck,
  Siren,
  SlidersHorizontal,
  Thermometer,
  TrendingDown,
  TrendingUp,
  UserRound,
  Waves,
  X,
  Zap,
} from "lucide-react";

const navItems = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Live map", icon: MapPin, badge: "12" },
  { label: "Incidents", icon: Siren, badge: "3", urgent: true },
  { label: "Analytics", icon: Activity },
  { label: "Assets", icon: Building2 },
];

const sites = [
  { name: "Harbor Point", meta: "HQ · 42 sensors", value: "98.2%", status: "Healthy", color: "teal" },
  { name: "Cedar Heights", meta: "Residential · 28 sensors", value: "1 alert", status: "Attention", color: "amber" },
  { name: "Northline Depot", meta: "Warehouse · 16 sensors", value: "1 alert", status: "Critical", color: "red" },
  { name: "Lumen Court", meta: "Retail · 34 sensors", value: "100%", status: "Healthy", color: "teal" },
];

const incidents = [
  { id: "INC-2048", title: "Pressure drop detected", location: "Northline Depot · Zone C", time: "8 min ago", severity: "Critical", icon: Waves },
  { id: "INC-2047", title: "Moisture threshold exceeded", location: "Cedar Heights · B2 Plant Room", time: "21 min ago", severity: "High", icon: Droplets },
  { id: "INC-2046", title: "Flow anomaly", location: "Harbor Point · East Wing", time: "1 hr ago", severity: "Medium", icon: Activity },
];

const chartBars = [
  { label: "Mon", value: 46 }, { label: "Tue", value: 65 }, { label: "Wed", value: 52 },
  { label: "Thu", value: 78 }, { label: "Fri", value: 61 }, { label: "Sat", value: 34 }, { label: "Sun", value: 27 },
];

function StatusDot({ tone = "teal" }: { tone?: "teal" | "amber" | "red" }) {
  return <span className={`status-dot ${tone}`} aria-hidden="true" />;
}

function Sparkline({ color = "#54d2c3", down = false }: { color?: string; down?: boolean }) {
  return (
    <svg viewBox="0 0 130 42" className="sparkline" aria-hidden="true">
      <path d={down ? "M2 8 C18 12, 22 4, 34 15 S55 30, 67 21 S83 17, 95 29 S113 36, 128 28" : "M2 33 C16 26, 21 31, 33 20 S54 26, 64 14 S83 17, 92 7 S111 18, 128 4"} fill="none" stroke={color} strokeWidth="2.8" strokeLinecap="round" />
      <path d={down ? "M2 8 C18 12, 22 4, 34 15 S55 30, 67 21 S83 17, 95 29 S113 36, 128 28 L128 42 L2 42 Z" : "M2 33 C16 26, 21 31, 33 20 S54 26, 64 14 S83 17, 92 7 S111 18, 128 4 L128 42 L2 42 Z"} fill={color} opacity=".08" />
    </svg>
  );
}

function Donut() {
  return (
    <div className="donut" aria-label="96.4 percent of sensors online">
      <div className="donut-inner"><strong>96.4%</strong><span>online</span></div>
    </div>
  );
}

function MiniMap() {
  return (
    <div className="mini-map" aria-label="Facility sensor map demo">
      <div className="map-grid" />
      <svg viewBox="0 0 500 260" className="map-lines" aria-hidden="true">
        <path d="M40 74 L124 74 L145 45 L225 45 L252 83 L333 83 L369 56 L462 56" />
        <path d="M95 206 L95 138 L154 138 L188 108 L266 108 L292 142 L400 142 L430 197" />
        <path d="M220 45 L220 108 M333 83 L333 142 M154 138 L154 206 M266 108 L266 226" />
      </svg>
      <div className="map-label northline"><StatusDot tone="red" /><span>Northline Depot</span><small>critical</small></div>
      <div className="map-label cedar"><StatusDot tone="amber" /><span>Cedar Heights</span><small>attention</small></div>
      <div className="map-label harbor"><StatusDot tone="teal" /><span>Harbor Point</span><small>healthy</small></div>
      <div className="map-label lumen"><StatusDot tone="teal" /><span>Lumen Court</span><small>healthy</small></div>
      <div className="map-legend"><span><StatusDot tone="teal" />Healthy</span><span><StatusDot tone="amber" />Attention</span><span><StatusDot tone="red" />Critical</span></div>
    </div>
  );
}

export default function Home() {
  const [activeNav, setActiveNav] = useState("Overview");
  const [range, setRange] = useState("Last 7 days");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [noticeCount, setNoticeCount] = useState(3);

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(""), 2800);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    return hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  }, []);

  const action = (message: string) => setToast(message);

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileOpen ? "open" : ""}`}>
        <div className="brand-row">
          <div className="brand-mark"><Droplets size={17} strokeWidth={2.6} /></div>
          <div><div className="brand-name">flow<span>watch</span></div><div className="brand-kicker">WATER INTELLIGENCE</div></div>
          <button className="mobile-close" onClick={() => setMobileOpen(false)} aria-label="Close menu"><X size={19} /></button>
        </div>

        <div className="workspace-switcher">
          <div className="workspace-icon"><Building2 size={16} /></div>
          <div><span>Workspace</span><strong>Northstar Facilities</strong></div>
          <ChevronDown size={15} className="muted-icon" />
        </div>

        <div className="nav-section-label">COMMAND CENTER</div>
        <nav className="main-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.label;
            return <button key={item.label} className={`nav-item ${isActive ? "active" : ""}`} onClick={() => { setActiveNav(item.label); setMobileOpen(false); }}><Icon size={17} /><span>{item.label}</span>{item.badge && <span className={`nav-badge ${item.urgent ? "urgent" : ""}`}>{item.badge}</span>}</button>;
          })}
        </nav>

        <div className="nav-section-label nav-section-spaced">MANAGE</div>
        <nav className="main-nav">
          <button className="nav-item" onClick={() => action("Team view is ready for the next release.")}><UserRound size={17} /><span>Team</span></button>
          <button className="nav-item" onClick={() => action("Settings are available in the full product.")}><Settings size={17} /><span>Settings</span></button>
        </nav>

        <div className="sidebar-footer">
          <div className="help-card"><div className="help-orb"><CircleHelp size={16} /></div><div><strong>Need a hand?</strong><span>View operator guide</span></div><ChevronRight size={16} /></div>
          <div className="profile-row"><div className="avatar">AP</div><div className="profile-copy"><strong>Alex Parker</strong><span>Operations lead</span></div><MoreHorizontal size={17} className="muted-icon" /></div>
        </div>
      </aside>

      {mobileOpen && <button className="scrim" onClick={() => setMobileOpen(false)} aria-label="Close navigation" />}

      <main className="main-content">
        <header className="topbar">
          <button className="mobile-menu" onClick={() => setMobileOpen(true)} aria-label="Open menu"><Menu size={20} /></button>
          <div className="breadcrumbs"><span>Operations</span><ChevronRight size={14} /><strong>{activeNav}</strong></div>
          <div className="topbar-actions">
            <div className="live-state"><span className="live-pulse" />All systems operational</div>
            <button className="icon-button notification-button" onClick={() => { setNoticeCount(0); action("Notifications marked as read."); }} aria-label="View notifications"><Bell size={18} />{noticeCount > 0 && <span className="notification-count">{noticeCount}</span>}</button>
            <button className="topbar-avatar" onClick={() => action("Profile menu opened.")}>AP</button>
          </div>
        </header>

        <div className="content-wrap">
          <section className="welcome-row">
            <div><p className="eyebrow"><span className="eyebrow-line" /> THURSDAY, SEPTEMBER 18, 2026</p><h1>{greeting}, Alex.</h1><p className="subheading">Here’s the latest on your water network.</p></div>
            <div className="welcome-actions"><button className="secondary-button" onClick={() => action("Filter panel opened.")}><Filter size={16} /> Filter</button><button className="primary-button" onClick={() => action("Report exported — your PDF is being prepared.")}><Zap size={16} /> Export report</button></div>
          </section>

          <section className="metric-grid">
            <article className="metric-card accent-teal"><div className="metric-top"><span className="metric-label">Water saved this month</span><div className="metric-icon teal"><Droplets size={17} /></div></div><div className="metric-value">18,420 <small>gal</small></div><div className="metric-foot"><span className="trend up"><TrendingUp size={14} /> 12.8%</span><span>vs. last month</span></div><Sparkline /></article>
            <article className="metric-card accent-amber"><div className="metric-top"><span className="metric-label">Active incidents</span><div className="metric-icon amber"><Siren size={17} /></div></div><div className="metric-value">03</div><div className="metric-foot"><span className="trend down-amber"><TrendingDown size={14} /> 2 resolved</span><span>in the last 24h</span></div><Sparkline color="#f6b94c" down /></article>
            <article className="metric-card accent-blue"><div className="metric-top"><span className="metric-label">Network health</span><div className="metric-icon blue"><ShieldCheck size={17} /></div></div><div className="metric-value">96.4<small>%</small></div><div className="metric-foot"><span className="trend up"><TrendingUp size={14} /> 1.6%</span><span>sensor uptime</span></div><Sparkline color="#8bb8ff" /></article>
            <article className="metric-card accent-purple"><div className="metric-top"><span className="metric-label">Avg. response time</span><div className="metric-icon purple"><Gauge size={17} /></div></div><div className="metric-value">14 <small>min</small></div><div className="metric-foot"><span className="trend up"><TrendingDown size={14} /> 8.3%</span><span>faster than avg.</span></div><Sparkline color="#bf9cff" down /></article>
          </section>

          <section className="dashboard-grid">
            <article className="panel map-panel"><div className="panel-header"><div><p className="panel-eyebrow">NETWORK OVERVIEW</p><h2>Live sensor map</h2></div><button className="ghost-button" onClick={() => action("Live map view opened.")}>Open full map <ChevronRight size={15} /></button></div><MiniMap /><div className="map-footer"><div><span className="footer-stat-label">Monitored sites</span><strong>4 / 4 <em>online</em></strong></div><div><span className="footer-stat-label">Total sensors</span><strong>120 <em className="green-text">+8 this week</em></strong></div><div><span className="footer-stat-label">Coverage</span><strong>98.7%</strong></div></div></article>

            <article className="panel health-panel"><div className="panel-header"><div><p className="panel-eyebrow">SENSOR STATUS</p><h2>System health</h2></div><button className="icon-button" onClick={() => action("Health data refreshed.")} aria-label="Refresh health"><Activity size={17} /></button></div><div className="health-summary"><Donut /><div className="health-copy"><strong>All systems<br />operating normally</strong><span><i className="green-dot" /> 116 sensors online</span><span><i className="amber-dot" /> 4 need attention</span></div></div><div className="health-rows"><div><span><Radio size={15} /> Flow sensors</span><strong>48 <small>/ 48</small></strong></div><div><span><Droplets size={15} /> Moisture sensors</span><strong>39 <small>/ 41</small></strong></div><div><span><Thermometer size={15} /> Pressure sensors</span><strong>29 <small>/ 31</small></strong></div></div></article>

            <article className="panel activity-panel"><div className="panel-header"><div><p className="panel-eyebrow">CONSUMPTION TRENDS</p><h2>Water usage</h2></div><button className="range-button" onClick={() => setRange(range === "Last 7 days" ? "Last 30 days" : "Last 7 days")}>{range}<ChevronDown size={14} /></button></div><div className="chart-topline"><div><strong>42.8k</strong><span>gallons monitored</span></div><span className="trend up"><TrendingUp size={14} /> 6.4%</span></div><div className="bar-chart">{chartBars.map((bar, index) => <div className="bar-column" key={bar.label}><div className={`bar ${index === 3 ? "highlight" : ""}`} style={{ height: `${bar.value}%` }}><span>{bar.value}k</span></div><label>{bar.label}</label></div>)}</div></article>

            <article className="panel incident-panel"><div className="panel-header"><div><p className="panel-eyebrow">REQUIRES ATTENTION</p><h2>Recent incidents <span className="count-pill">3 open</span></h2></div><button className="ghost-button" onClick={() => { setActiveNav("Incidents"); action("Showing all incidents."); }}>View all <ChevronRight size={15} /></button></div><div className="incident-list">{incidents.map((incident) => { const IncidentIcon = incident.icon; return <button className="incident-row" key={incident.id} onClick={() => action(`${incident.id} selected — incident detail opened.`)}><div className={`incident-icon ${incident.severity.toLowerCase()}`}><IncidentIcon size={17} /></div><div className="incident-copy"><div><strong>{incident.title}</strong><span className={`severity ${incident.severity.toLowerCase()}`}>{incident.severity}</span></div><p>{incident.location}</p><span className="incident-time">{incident.id} · {incident.time}</span></div><ChevronRight size={16} className="row-arrow" /></button>; })}</div></article>

            <article className="panel site-panel"><div className="panel-header"><div><p className="panel-eyebrow">PORTFOLIO</p><h2>Site performance</h2></div><button className="icon-button" onClick={() => action("Site filters opened.")} aria-label="Filter sites"><SlidersHorizontal size={17} /></button></div><div className="site-list">{sites.map((site) => <button className="site-row" key={site.name} onClick={() => action(`${site.name} selected.`)}><div className={`site-logo ${site.color}`}><Building2 size={16} /></div><div className="site-copy"><strong>{site.name}</strong><span>{site.meta}</span></div><div className="site-result"><strong>{site.value}</strong><span><StatusDot tone={site.color === "red" ? "red" : site.color === "amber" ? "amber" : "teal"} />{site.status}</span></div><ChevronRight size={15} className="row-arrow" /></button>)}</div></article>
          </section>

          <footer className="page-footer"><span><span className="footer-live" /> Data streaming live · Last sync 10:42:18 AM</span><span>FlowWatch v2.4.1</span></footer>
        </div>
      </main>

      {toast && <div className="toast"><div className="toast-icon"><ShieldCheck size={16} /></div><span>{toast}</span><button onClick={() => setToast("")} aria-label="Dismiss notification"><X size={14} /></button></div>}
    </div>
  );
}
