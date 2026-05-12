import { useState, useEffect, useRef } from 'react';
import {
  Mail, Phone, MapPin, Globe, Linkedin, ChevronDown, ExternalLink,
  Briefcase, GraduationCap, Send, Sparkles, Zap, Layers,
  ArrowUpRight, Search, Package, Wrench, Award, Star, ShieldCheck,
  Rocket, Heart, Brain, Target, Coffee, Users, Trophy,
  ChevronRight, ChevronLeft, Check, Download, MessageSquare,
  Clock, FileText, BookOpen, Lightbulb, Workflow, HelpCircle, TrendingUp,
  Calendar, Music, PlayCircle, Headphones, Activity, Compass, Smile,
  CalendarCheck, Pen, Gauge, BarChart3, LineChart, Smartphone,
  PieChart, MousePointerClick, Link2, Map, Tag, AlignLeft, ChartBar,
  Eye, Filter
} from 'lucide-react';

export default function CV() {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [imageError, setImageError] = useState(false);
  const [rankingsFilter, setRankingsFilter] = useState('featured');
  const [intentFilter, setIntentFilter] = useState('all');
  const [rankingsSearch, setRankingsSearch] = useState('');
  const [expandedRanking, setExpandedRanking] = useState(null);

  // SERP Console (was: Interactive Terminal) — themed as a Google Search Console-style query inspector
  const [consoleHistory, setConsoleHistory] = useState([
    { type: 'output', content: 'SERP Console — type "help" to see available queries.' },
  ]);
  const [consoleInput, setConsoleInput] = useState('');
  const consoleRef = useRef(null);
  const consoleInputRef = useRef(null);

  // Testimonials Carousel State
  const [currentReview, setCurrentReview] = useState(0);
  const [autoplayPaused, setAutoplayPaused] = useState(false);

  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState(0);

  // Now playing rotation
  const [nowPlayingIndex, setNowPlayingIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMouse = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  const sectionIds = ['hero', 'flagship', 'why-me', 'about', 'process', 'skills', 'experience', 'rankings', 'projects', 'achievements', 'testimonials', 'faq', 'now', 'contact'];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.4 }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      const idx = sectionIds.indexOf(activeSection);
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        const next = Math.min(idx + 1, sectionIds.length - 1);
        document.getElementById(sectionIds[next])?.scrollIntoView({ behavior: 'smooth' });
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const prev = Math.max(idx - 1, 0);
        document.getElementById(sectionIds[prev])?.scrollIntoView({ behavior: 'smooth' });
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [activeSection]);

  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [consoleHistory]);

  useEffect(() => {
    if (autoplayPaused) return;
    const interval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % 6);
    }, 6000);
    return () => clearInterval(interval);
  }, [autoplayPaused]);

  useEffect(() => {
    const interval = setInterval(() => {
      setNowPlayingIndex((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleConsoleCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    const newHistory = [...consoleHistory, { type: 'input', content: cmd }];

    if (trimmed === 'help') {
      newHistory.push({
        type: 'output',
        content: [
          'Available queries:',
          '  help        — Show this help message',
          '  about       — About me',
          '  skills      — My SEO skill set',
          '  experience  — Career summary',
          '  wins        — Notable rankings and results',
          '  contact     — How to reach me',
          '  clear       — Clear the console',
        ].join('\n'),
      });
    } else if (trimmed === 'about') {
      newHistory.push({
        type: 'output',
        content: [
          'Muhammad Raza',
          'Senior SEO Expert based in Jalalpur Pirwala, Multan, Pakistan',
          '3+ years driving organic growth across US, UK, and South Asian markets',
          'Specializes in Technical SEO, Local SEO, on-page optimization, and Core Web Vitals',
          'Currently at Creative Chaos (USA) since September 2023',
        ].join('\n'),
      });
    } else if (trimmed === 'skills') {
      newHistory.push({
        type: 'output',
        content: [
          'Technical SEO    — Core Web Vitals, Schema Markup, robots.txt, XML Sitemaps',
          'Local SEO        — GMB Optimization, Location Pages, Geo-targeting, Citations',
          'On-Page          — Rank Math, Yoast SEO, Meta Optimization, URL Structure',
          'Analytics        — Google Search Console, Google Analytics, PageSpeed Insights',
          'Tools            — Ahrefs, SEMrush, Screaming Frog, GTmetrix',
          'CMS              — WordPress, WooCommerce',
          'Audits           — Site speed, Mobile usability, Indexability, Crawl health',
        ].join('\n'),
      });
    } else if (trimmed === 'experience') {
      newHistory.push({
        type: 'output',
        content: [
          '2023 — Present  Senior SEO Expert     Creative Chaos (USA)',
          '2020 — 2023     SEO Manager           Reborn (Lahore, PK)',
          '2019 — 2020     SEO Expert            Intero Digital (Islamabad, PK)',
          '',
          'Total: 3+ years across agency and senior SEO roles.',
        ].join('\n'),
      });
    } else if (trimmed === 'wins') {
      newHistory.push({
        type: 'output',
        content: [
          '460%  Mobile PageSpeed lift (13 → 73)     FAB Clinic, UK',
          '29%   Desktop PageSpeed lift (65 → 84)    FAB Clinic, UK',
          '#1    "what is a lot size of a house"     ilaan.com (featured snippet)',
          '#5    "5 / 10 marla house for sale in lahore"',
          '7+    Location pages at Rank Math 79/100  Liberty Power Wash, USA',
          '4     Schema types validated, zero errors Breadcrumbs, Products, etc.',
          '33.9K IJSREAT impressions and 605 clicks over 3 months',
          '+168% IJRTMR clicks and +158% impressions over 3 months',
          '+568% W3Torch impressions over 6 months',
          '41K  Notary Services Dubai impressions with 13.5 average position',
          '27.8K Notario Lawyers Dubai impressions with 10.9 average position',
        ].join('\n'),
      });
    } else if (trimmed === 'contact') {
      newHistory.push({
        type: 'output',
        content: [
          'Email     raza@rawdigit.com',
          'Phone     +92 303 7240087',
          'Site      raza.rawdigit.com',
          'Location  Jalalpur Pirwala, Multan, Pakistan',
        ].join('\n'),
      });
    } else if (trimmed === 'clear') {
      setConsoleHistory([]);
      setConsoleInput('');
      return;
    } else if (trimmed === '') {
      setConsoleInput('');
      return;
    } else {
      newHistory.push({
        type: 'error',
        content: `Query not recognized: "${cmd}". Type "help" for available queries.`,
      });
    }

    setConsoleHistory(newHistory);
    setConsoleInput('');
  };

  const handleConsoleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleConsoleCommand(consoleInput);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const scrollProgress = typeof document !== 'undefined'
    ? Math.min((scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100, 100)
    : 0;

  const navItems = [
    { id: 'hero', label: 'home' },
    { id: 'flagship', label: 'flagship', star: true },
    { id: 'why-me', label: 'why me' },
    { id: 'about', label: 'about' },
    { id: 'process', label: 'process' },
    { id: 'skills', label: 'skills' },
    { id: 'experience', label: 'experience' },
    { id: 'rankings', label: 'rankings' },
    { id: 'projects', label: 'case studies' },
    { id: 'achievements', label: 'achievements' },
    { id: 'testimonials', label: 'reviews' },
    { id: 'faq', label: 'faq' },
    { id: 'now', label: 'now' },
    { id: 'contact', label: 'contact' },
  ];

  // RANKED KEYWORDS data
  const rankings = [
    {
      url: 'ilaan.com', name: 'what is a lot size of a house', intent: 'informational', featured: true, verified: true, pos: 1,
      desc: 'High-volume informational query — captured position 1 with featured snippet on a competitive real estate site',
      type: 'Featured Snippet', industry: 'Real Estate (Pakistan)',
      tactics: ['Long-form pillar content brief', 'Article and FAQ schema markup', 'Internal link cluster', 'Featured snippet formatting'],
      metrics: ['Position 1', 'Featured snippet', 'High CTR']
    },
    {
      url: 'ilaan.com', name: '5 marla house for sale in lahore', intent: 'transactional', featured: true, verified: true, pos: 5,
      desc: 'Highly competitive transactional query in the Lahore real estate market — top 5 SERP placement',
      type: 'Local Transactional', industry: 'Real Estate (Pakistan)',
      tactics: ['Geo-targeted landing page', 'Local Business schema', 'Citation consistency', 'On-page keyword optimisation'],
      metrics: ['Position 5', 'Page 1', 'High commercial intent']
    },
    {
      url: 'ilaan.com', name: '10 marla house for sale in lahore', intent: 'transactional', featured: true, verified: true, pos: 5,
      desc: 'Sister query to the 5 marla page — same geo-optimisation playbook, top 5 SERP',
      type: 'Local Transactional', industry: 'Real Estate (Pakistan)',
      tactics: ['Variant landing page with unique content', 'Schema duplication and refinement', 'CTR-optimised title tags'],
      metrics: ['Position 5', 'Page 1', 'Geo-targeted']
    },
    {
      url: 'ilaan.com', name: 'house for sale in lahore', intent: 'transactional', featured: true, verified: true, pos: 6,
      desc: 'Broad commercial query in one of the most competitive Pakistani real estate markets',
      type: 'Local Transactional', industry: 'Real Estate (Pakistan)',
      tactics: ['Pillar page strategy', 'Internal linking hub', 'E-E-A-T signals', 'Topical authority building'],
      metrics: ['Position 6', 'Page 1', 'High volume']
    },
    {
      url: 'ilaan.com', name: 'digital marketing agency in Lahore', intent: 'commercial', featured: true, verified: true, pos: 7,
      desc: 'Service-page ranking for a high-intent commercial query',
      type: 'Service Page', industry: 'Marketing (Pakistan)',
      tactics: ['Service schema implementation', 'Localised testimonials', 'Trust signals', 'CTA optimisation'],
      metrics: ['Position 7', 'Page 1', 'Commercial intent']
    },
    {
      url: 'ilaan.com', name: 'digital marketing services in lahore', intent: 'commercial', featured: true, verified: true, pos: 9,
      desc: 'Variant of the agency query — sustained top 10 SERP position',
      type: 'Service Page', industry: 'Marketing (Pakistan)',
      tactics: ['Long-tail variant page', 'Keyword cluster strategy'],
      metrics: ['Position 9', 'Page 1']
    },
    {
      url: 'ilaan.com', name: 'web hosting in lahore', intent: 'commercial', featured: false, verified: true, pos: 12,
      desc: 'Adjacent service vertical — top of page 2 and climbing',
      type: 'Service Page', industry: 'Tech (Pakistan)',
      tactics: ['Content gap analysis', 'Competitor backlink research'],
      metrics: ['Position 12', 'Page 2']
    },
    {
      url: 'fab-clinic.co.uk', name: 'aesthetic clinic UK (post-optimisation)', intent: 'commercial', featured: true, verified: true, pos: null,
      desc: 'Technical SEO and Core Web Vitals overhaul — mobile PageSpeed jumped 13 to 73',
      type: 'Technical Audit', industry: 'Aesthetics (UK)',
      tactics: ['Page speed optimisation', 'Schema markup (Breadcrumbs, Products, Merchant Listings)', 'robots.txt and XML sitemap setup', 'Mobile usability fixes'],
      metrics: ['Mobile PageSpeed +460%', '4 schema types valid', 'Mobile-friendly']
    },
    {
      url: 'libertypowerwash.net', name: 'power washing Ohio and Kentucky (multi-location)', intent: 'local', featured: true, verified: true, pos: null,
      desc: '7+ location pages each optimised to Rank Math 79/100 with 948+ word geo-targeted content',
      type: 'Local SEO Network', industry: 'Exterior Cleaning (USA)',
      tactics: ['Multi-location page architecture', 'Geo-keyword placement', 'Local Business schema', 'Rank Math optimisation'],
      metrics: ['7+ pages live', 'Rank Math 79/100', '"All Good" on 6 of 7']
    },
    {
      url: 'libertypowerwash.net', name: 'Cincinnati pressure washing', intent: 'local', featured: false, verified: true, pos: null,
      desc: 'Cincinnati, Ohio location page — Rank Math 79/100, 948 words',
      type: 'Local Landing Page', industry: 'Exterior Cleaning (USA)',
      tactics: ['City-specific content', 'NAP consistency', 'Local Business schema'],
      metrics: ['Score 79/100', 'All Good status']
    },
    {
      url: 'libertypowerwash.net', name: 'Covington KY power washing', intent: 'local', featured: false, verified: true, pos: null,
      desc: 'Kentucky location page in the optimised network',
      type: 'Local Landing Page', industry: 'Exterior Cleaning (USA)',
      tactics: ['Geo-targeted copy', 'Service schema', 'Internal link clustering'],
      metrics: ['Score 79/100', 'All Good status']
    },
    {
      url: 'libertypowerwash.net', name: 'Delhi Hills OH pressure washing', intent: 'local', featured: false, verified: true, pos: null,
      desc: 'Highest word-count location page in the network — 959 words of geo-targeted content',
      type: 'Local Landing Page', industry: 'Exterior Cleaning (USA)',
      tactics: ['Long-form geo content', 'FAQ schema', 'Service area markup'],
      metrics: ['Score 79/100', '959 words']
    },
    {
      url: 'libertypowerwash.net', name: 'Blue Ash OH exterior cleaning', intent: 'local', featured: false, verified: true, pos: null,
      desc: 'Blue Ash service area page',
      type: 'Local Landing Page', industry: 'Exterior Cleaning (USA)',
      tactics: ['Location-specific keyword placement', 'Reviews schema'],
      metrics: ['Score 79/100', 'All Good']
    },
    {
      url: 'libertypowerwash.net', name: 'Burlington KY soft washing', intent: 'local', featured: false, verified: true, pos: null,
      desc: 'Burlington, Kentucky location page',
      type: 'Local Landing Page', industry: 'Exterior Cleaning (USA)',
      tactics: ['Geo-targeted intent matching', 'Service-area schema'],
      metrics: ['Score 79/100', 'All Good']
    },
    {
      url: 'libertypowerwash.net', name: 'Walton KY power washing', intent: 'local', featured: false, verified: true, pos: null,
      desc: 'Walton, Kentucky service page',
      type: 'Local Landing Page', industry: 'Exterior Cleaning (USA)',
      tactics: ['NAP consistency', 'Local citations', 'Internal links'],
      metrics: ['Score 79/100', 'All Good']
    },
    {
      url: 'libertypowerwash.net', name: 'Christmas lighting installation', intent: 'commercial', featured: false, inProgress: true, pos: null,
      desc: 'Seasonal service page — initial Rank Math errors identified and resolved',
      type: 'Service Page', industry: 'Seasonal (USA)',
      tactics: ['Error diagnosis and resolution', 'Content rebuild', 'Schema implementation'],
      metrics: ['Score 63 and improving', 'Errors resolved']
    },
    {
      url: 'IJSREAT', name: 'academic research journal SEO growth', intent: 'informational', featured: true, verified: true, pos: null,
      desc: 'Managed end-to-end SEO for IJSREAT over 3 months, reaching 33,900 impressions and 605 clicks with a 1.8% CTR and 28.3 average position.',
      type: 'Academic SEO', industry: 'Research Journal',
      tactics: ['Title and meta optimisation', 'Archive crawlability improvements', 'Academic article schema', 'Internal linking between volume, issue, and article pages'],
      metrics: ['33,900 impressions', '605 clicks', '1.8% CTR']
    },
    {
      url: 'IJRTMR', name: 'academic journal period-over-period growth', intent: 'informational', featured: true, verified: true, pos: null,
      desc: 'Delivered strong organic growth for IJRTMR over 3 months: clicks increased 168%, impressions increased 158%, and average position improved from 30.8 to 20.1.',
      type: 'Academic SEO', industry: 'Research Journal',
      tactics: ['Content gap analysis', 'Research-query landing pages', 'On-page optimisation', 'Technical fixes for crawl budget and indexation'],
      metrics: ['Clicks +168%', 'Impressions +158%', 'Avg position 30.8 to 20.1']
    },
    {
      url: 'W3Torch', name: 'web development resource SEO growth', intent: 'informational', featured: true, verified: true, pos: null,
      desc: 'Managed SEO for W3Torch over 6 months, growing clicks from 226 to 557 and impressions from 47,900 to 320,000 while improving average position from 74.4 to 56.5.',
      type: 'Content SEO', industry: 'Web Development',
      tactics: ['Technical site audit', 'Programming tutorial optimisation', 'Topical clusters', 'Internal linking between tutorials and reference pages'],
      metrics: ['Clicks +147%', 'Impressions +568%', 'Avg position 74.4 to 56.5']
    },
    {
      url: 'Notary Services Dubai', name: 'notary services Dubai local SEO', intent: 'local', featured: true, verified: true, pos: null,
      desc: 'Managed local legal-services SEO for Notary Services Dubai during Nov-Dec 2025, achieving 389 clicks, 41,000 impressions, and 13.5 average position.',
      type: 'Local SEO', industry: 'Legal Services (Dubai)',
      tactics: ['High-intent local service pages', 'NAP consistency', 'Google Business Profile optimisation', 'Local business and legal services schema'],
      metrics: ['389 clicks', '41,000 impressions', 'Avg position 13.5']
    },
    {
      url: 'Notario Lawyers Dubai', name: 'law firm SEO Dubai', intent: 'local', featured: true, verified: true, pos: null,
      desc: 'Managed SEO for Notario Lawyers Dubai during Nov-Dec 2025, achieving 203 clicks, 27,800 impressions, and a 10.9 average position near page 1.',
      type: 'Legal SEO', industry: 'Law Firm (Dubai)',
      tactics: ['Practice-area page optimisation', 'UAE legal keyword research', 'Internal linking improvements', 'Topical authority around legal services'],
      metrics: ['203 clicks', '27,800 impressions', 'Avg position 10.9']
    },
  ];

  const intentCategories = ['all', 'commercial', 'local', 'transactional', 'informational'];
  const catColors = {
    commercial: 'cyan', local: 'green', transactional: 'pink', informational: 'yellow',
  };

  const filteredRankings = rankings.filter((p) => {
    let matchesStatus = true;
    if (rankingsFilter === 'featured') matchesStatus = p.featured === true;
    else if (rankingsFilter === 'verified') matchesStatus = p.verified === true;
    else if (rankingsFilter === 'inProgress') matchesStatus = p.inProgress === true;

    let matchesCat = intentFilter === 'all' || p.intent === intentFilter;

    const matchesSearch = rankingsSearch === '' ||
      p.name.toLowerCase().includes(rankingsSearch.toLowerCase()) ||
      p.url.toLowerCase().includes(rankingsSearch.toLowerCase()) ||
      p.desc.toLowerCase().includes(rankingsSearch.toLowerCase());

    return matchesStatus && matchesCat && matchesSearch;
  });

  const featuredCount = rankings.filter(p => p.featured).length;
  const verifiedCount = rankings.filter(p => p.verified).length;
  const inProgressCount = rankings.filter(p => p.inProgress).length;

  const testimonials = [
    {
      ref: 'FAB-01',
      title: 'Mobile PageSpeed lifted from 13 to 73 in one sprint',
      author: 'Clinic Operations',
      role: 'UK Client Stakeholder',
      company: 'FAB Clinic engagement',
      label: 'verified',
      labelColor: 'green',
      review: 'Our mobile PageSpeed score was painful — patients on phones were bouncing before pages even loaded. Raza identified the actual bottlenecks rather than handing us a generic checklist, implemented the fixes, and the score went from 13 to 73. Bookings noticeably improved within weeks.',
      meta: ['Mobile speed', 'CWV', 'Conversions']
    },
    {
      ref: 'LIB-04',
      title: '7 location pages live at Rank Math 79/100',
      author: 'Marketing Lead',
      role: 'US Client',
      company: 'Liberty Power Wash',
      label: 'live',
      labelColor: 'cyan',
      review: 'We needed a multi-city presence across Ohio and Kentucky. Raza built each location page from scratch — geo-targeted content, proper local schema, the whole structure. Six of seven hit "All Good" status on Rank Math, and local search visibility climbed steadily across all our markets.',
      meta: ['Local SEO', 'Multi-location', 'Rank Math']
    },
    {
      ref: 'ILN-12',
      title: 'Position 1 with featured snippet on competitive query',
      author: 'Content Manager',
      role: 'Pakistan Real Estate Client',
      company: 'ilaan.com',
      label: 'ranking',
      labelColor: 'purple',
      review: 'Taking a high-volume "what is a lot size of a house" query to position 1 with a featured snippet — on a site that competes with major real estate portals — was the kind of result we hoped for but did not fully expect. Raza knew exactly which content gaps to fill.',
      meta: ['Featured snippet', 'Informational', 'Position 1']
    },
    {
      ref: 'FAB-09',
      title: 'Four schema types validated with zero errors',
      author: 'Technical Lead',
      role: 'UK Engagement',
      company: 'FAB Clinic',
      label: 'verified',
      labelColor: 'green',
      review: 'Schema markup is one of those things everyone claims to do, but few do it correctly. Raza implemented Breadcrumbs, Merchant Listings, Product Snippets, and Sitelinks Searchbox — all validated in Search Console, all enhancements passing. That kind of rigour is rare.',
      meta: ['Schema', 'Structured data', 'GSC']
    },
    {
      ref: 'REB-23',
      title: 'Built SEO foundation from scratch for new vertical',
      author: 'Director of Growth',
      role: 'Agency Manager (Previous)',
      company: 'Reborn engagement',
      label: 'live',
      labelColor: 'cyan',
      review: 'When we expanded into a new service vertical, Raza was the SEO lead. Keyword research, content briefs, technical setup, internal linking — he ran the full playbook. Within six months we were ranking for queries we could not crack before.',
      meta: ['Keyword research', 'Content strategy', 'Vertical launch']
    },
    {
      ref: 'ILN-19',
      title: 'Featured snippet capture on real estate query',
      author: 'SEO Strategist',
      role: 'Pakistan Client',
      company: 'ilaan.com',
      label: 'ranking',
      labelColor: 'purple',
      review: 'Position 1 with a featured snippet on "what is a lot size of a house" — a query that gets thousands of searches and is dominated by major sites. Raza\'s content brief, schema setup, and on-page optimisation won that real estate.',
      meta: ['Featured snippet', 'Content brief', 'On-page']
    },
  ];

  return (
    <div className="bg-slate-950 text-slate-200 min-h-screen overflow-x-hidden font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');
        body { font-family: 'Inter', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        .font-display { font-family: 'Space Grotesk', sans-serif; }
        .grid-bg {
          background-image:
            linear-gradient(rgba(34, 211, 238, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 211, 238, 0.04) 1px, transparent 1px);
          background-size: 50px 50px;
        }
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(40px, -60px) scale(1.15); }
          66% { transform: translate(-30px, 30px) scale(0.85); }
        }
        .blob { animation: blob 18s ease-in-out infinite; }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
        .float-slow { animation: float-slow 6s ease-in-out infinite; }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 30px rgba(34, 211, 238, 0.4); }
          50% { box-shadow: 0 0 60px rgba(168, 85, 247, 0.6); }
        }
        .pulse-glow { animation: pulse-glow 4s ease-in-out infinite; }
        .gradient-text {
          background: linear-gradient(135deg, #22d3ee 0%, #a855f7 50%, #ec4899 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .glass {
          background: rgba(30, 41, 59, 0.4);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(148, 163, 184, 0.1);
          transition: all 0.3s ease;
        }
        .glass:hover { border-color: rgba(34, 211, 238, 0.3); }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .spin-slow { animation: spin-slow 20s linear infinite; }
        @keyframes orbit {
          from { transform: rotate(0deg) translateX(120px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(120px) rotate(-360deg); }
        }
        @keyframes orbit-reverse {
          from { transform: rotate(0deg) translateX(160px) rotate(0deg); }
          to { transform: rotate(-360deg) translateX(160px) rotate(360deg); }
        }
        .orbit { animation: orbit 14s linear infinite; }
        .orbit-reverse { animation: orbit-reverse 20s linear infinite; }

        @keyframes blink-slow { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        .blink-slow { animation: blink-slow 2s ease-in-out infinite; }

        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #0f172a; }
        ::-webkit-scrollbar-thumb { background: linear-gradient(to bottom, #22d3ee, #a855f7); border-radius: 4px; }

        @media screen {
          .print-only { display: none !important; }
        }
        @media print {
          @page { size: A4; margin: 0.5in; }
          body { background: white !important; color: black !important; font-family: 'Helvetica', 'Arial', sans-serif !important; }
          .screen-only { display: none !important; }
          .print-only { display: block !important; }
        }
      `}</style>

      {/* ============= PRINT-ONLY ATS-FRIENDLY RESUME ============= */}
      <div className="print-only" style={{ display: 'none', color: 'black', background: 'white', padding: '0', fontFamily: 'Helvetica, Arial, sans-serif', fontSize: '10.5pt', lineHeight: '1.5' }}>
        <div style={{ borderBottom: '2px solid black', paddingBottom: '12px', marginBottom: '14px' }}>
          <h1 style={{ fontSize: '24pt', fontWeight: 'bold', margin: '0 0 4px 0', letterSpacing: '-0.5px' }}>Muhammad Raza</h1>
          <div style={{ fontSize: '12pt', color: '#333', marginBottom: '8px' }}>Senior SEO Expert</div>
          <div style={{ fontSize: '9.5pt', color: '#444' }}>
            raza@rawdigit.com &nbsp;|&nbsp; +92 303 7240087 &nbsp;|&nbsp; Jalalpur Pirwala, Multan, Pakistan<br/>
            raza.rawdigit.com
          </div>
        </div>

        <section style={{ marginBottom: '14px' }}>
          <h2 style={{ fontSize: '10pt', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1.5px', borderBottom: '1px solid #ccc', paddingBottom: '3px', marginBottom: '8px' }}>Profile</h2>
          <p style={{ margin: '0', textAlign: 'justify' }}>
            Senior SEO Expert with 3+ years of proven success driving organic traffic and improving online visibility across US, UK, and South Asian markets. Skilled in Technical SEO, Core Web Vitals optimisation, Local SEO, on-page optimisation, schema markup implementation, and content strategy. Track record of measurable lifts including 460% mobile PageSpeed improvement, multi-location ranking architectures, and first-position SERP captures on competitive queries.
          </p>
        </section>

        <section style={{ marginBottom: '14px' }}>
          <h2 style={{ fontSize: '10pt', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1.5px', borderBottom: '1px solid #ccc', paddingBottom: '3px', marginBottom: '8px' }}>Core SEO Skills</h2>
          <div style={{ fontSize: '10pt' }}>
            <div style={{ marginBottom: '3px' }}><strong>Technical SEO:</strong> Core Web Vitals, Schema Markup, robots.txt, XML Sitemaps, Crawl Optimisation, Mobile Usability</div>
            <div style={{ marginBottom: '3px' }}><strong>Local SEO:</strong> Google My Business, Location Pages, Geo-targeted Content, Local Citations, Multi-region Strategy</div>
            <div style={{ marginBottom: '3px' }}><strong>On-Page:</strong> Rank Math, Yoast SEO, Meta Optimisation, URL Structure, Keyword Placement, Content Strategy</div>
            <div style={{ marginBottom: '3px' }}><strong>Analytics &amp; Tools:</strong> Google Search Console, Google Analytics, PageSpeed Insights, Ahrefs, SEMrush, Screaming Frog</div>
            <div style={{ marginBottom: '3px' }}><strong>Content &amp; Strategy:</strong> Keyword Research, Content Briefs, Topical Authority, Internal Linking, Featured Snippets</div>
            <div style={{ marginBottom: '3px' }}><strong>CMS:</strong> WordPress, WooCommerce</div>
            <div><strong>Off-Page:</strong> Link Building, Outreach, Authority Building, Backlink Profile Management</div>
          </div>
        </section>

        <section style={{ marginBottom: '14px' }}>
          <h2 style={{ fontSize: '10pt', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1.5px', borderBottom: '1px solid #ccc', paddingBottom: '3px', marginBottom: '8px' }}>Flagship Case Study</h2>
          <div style={{ marginBottom: '6px' }}>
            <strong>FAB Clinic (United Kingdom)</strong> — Technical SEO and Performance Optimisation
          </div>
          <p style={{ margin: '0 0 4px 0' }}>Full technical audit identifying critical mobile and desktop performance bottlenecks. Mobile PageSpeed Insights score rebuilt from 13/100 to 73/100 (+460%). Desktop score from 65 to 84. Validated four structured data types (Breadcrumbs, Merchant Listings, Product Snippets, Sitelinks Searchbox) with all enhancements passing in Search Console. Mobile usability compliance verified via GSC URL Inspection. Configured robots.txt, XML sitemaps, and crawl directives.</p>
        </section>

        <section style={{ marginBottom: '14px' }}>
          <h2 style={{ fontSize: '10pt', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1.5px', borderBottom: '1px solid #ccc', paddingBottom: '3px', marginBottom: '8px' }}>Professional Experience</h2>

          <div style={{ marginBottom: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
              <strong>Senior SEO Expert</strong>
              <span>Sep 2023 — Present</span>
            </div>
            <div style={{ fontStyle: 'italic', color: '#444', marginBottom: '4px' }}>Creative Chaos — Remote, USA Client</div>
            <ul style={{ margin: '0', paddingLeft: '20px' }}>
              <li>End-to-end SEO strategy and execution across multiple client engagements</li>
              <li>Keyword research, on-page optimisation, and Technical SEO audits</li>
              <li>Local SEO, content optimisation, link building, and competitive analysis</li>
              <li>Analytics, reporting, and ongoing SERP monitoring via Google Search Console</li>
              <li>Local SEO and Google My Business optimisation for multi-location clients</li>
            </ul>
          </div>

          <div style={{ marginBottom: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
              <strong>SEO Manager</strong>
              <span>2020 — 2023</span>
            </div>
            <div style={{ fontStyle: 'italic', color: '#444', marginBottom: '4px' }}>Reborn — Lahore, Pakistan</div>
            <ul style={{ margin: '0', paddingLeft: '20px' }}>
              <li>Built and executed SEO strategies aligned with business objectives</li>
              <li>In-depth keyword research and competitor analysis</li>
              <li>On-page, off-page, and Technical SEO oversight across the client portfolio</li>
              <li>Site speed, mobile optimisation, and site structure optimisation</li>
              <li>Link-building strategy and backlink acquisition campaigns</li>
            </ul>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
              <strong>SEO Expert</strong>
              <span>Aug 2019 — Aug 2020</span>
            </div>
            <div style={{ fontStyle: 'italic', color: '#444', marginBottom: '4px' }}>Intero Digital — Islamabad, Pakistan</div>
            <ul style={{ margin: '0', paddingLeft: '20px' }}>
              <li>High-potential keyword research for content optimisation</li>
              <li>On-page optimisation, meta tags, and site structure improvements</li>
              <li>Technical SEO: site speed, mobile optimisation, schema markup</li>
              <li>Link-building strategy and authority development</li>
            </ul>
          </div>
        </section>

        <section style={{ marginBottom: '14px' }}>
          <h2 style={{ fontSize: '10pt', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1.5px', borderBottom: '1px solid #ccc', paddingBottom: '3px', marginBottom: '8px' }}>Selected Results</h2>
          <ul style={{ margin: '0', paddingLeft: '20px' }}>
            <li><strong>FAB Clinic (UK)</strong> — Mobile PageSpeed +460% (13 to 73), Desktop +29% (65 to 84), four schema types validated</li>
            <li><strong>Liberty Power Wash (USA)</strong> — 7+ location pages optimised to Rank Math 79/100, "All Good" Basic SEO on 6 of 7</li>
            <li><strong>ilaan.com (Pakistan)</strong> — Position #1 with featured snippet for "what is a lot size of a house"</li>
            <li><strong>ilaan.com</strong> — Position #5 on "5 / 10 marla house for sale in lahore" (high-competition geo terms)</li>
            <li><strong>ilaan.com</strong> — Position #7 on "digital marketing agency in Lahore" (commercial service-page ranking)</li>
            <li><strong>IJSREAT</strong> — 33,900 impressions and 605 clicks over a 3-month academic SEO engagement</li>
            <li><strong>IJRTMR</strong> — Clicks +168%, impressions +158%, average position improved from 30.8 to 20.1</li>
            <li><strong>W3Torch</strong> — Clicks +147% and impressions +568% during a 6-month web development resource engagement</li>
            <li><strong>Notary Services Dubai</strong> — 389 clicks, 41,000 impressions, and 13.5 average position during Nov-Dec 2025</li>
            <li><strong>Notario Lawyers Dubai</strong> — 203 clicks, 27,800 impressions, and 10.9 average position during Nov-Dec 2025</li>
          </ul>
        </section>

        <section style={{ marginBottom: '12px' }}>
          <h2 style={{ fontSize: '10pt', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1.5px', borderBottom: '1px solid #ccc', paddingBottom: '3px', marginBottom: '8px' }}>Education</h2>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <strong>Master of Computer Science</strong>
              <div style={{ fontStyle: 'italic', color: '#444' }}>MNS University Multan</div>
            </div>
            <span>2020 — 2024</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
            <div>
              <strong>FSC</strong>
              <div style={{ fontStyle: 'italic', color: '#444' }}>Punjab Group of Colleges</div>
            </div>
            <span>2019 — 2020</span>
          </div>
        </section>

        <section>
          <h2 style={{ fontSize: '10pt', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1.5px', borderBottom: '1px solid #ccc', paddingBottom: '3px', marginBottom: '8px' }}>Languages</h2>
          <p style={{ margin: '0' }}>English (fluent) &nbsp;|&nbsp; Urdu (native) &nbsp;|&nbsp; Saraiki (native)</p>
        </section>
      </div>

      {/* ============= SCREEN-ONLY UI ============= */}
      <div className="screen-only">

        <div
          className="fixed top-0 left-0 h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 z-50 transition-all duration-100"
          style={{ width: `${scrollProgress}%`, boxShadow: '0 0 12px rgba(34, 211, 238, 0.6)' }}
        />

        <nav className="fixed right-3 md:right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative w-3 h-3 rounded-full transition-all duration-300"
              style={{
                background: activeSection === item.id ? '#22d3ee' : item.star ? 'rgba(168, 85, 247, 0.4)' : 'rgba(148, 163, 184, 0.3)',
                border: `1.5px solid ${activeSection === item.id ? '#22d3ee' : item.star ? 'rgba(168, 85, 247, 0.6)' : 'rgba(148, 163, 184, 0.5)'}`,
                transform: activeSection === item.id ? 'scale(1.4)' : 'scale(1)',
                boxShadow: activeSection === item.id ? '0 0 12px rgba(34, 211, 238, 0.7)' : item.star ? '0 0 8px rgba(168, 85, 247, 0.4)' : 'none',
              }}
              aria-label={item.label}
            >
              <span className="absolute right-6 top-1/2 -translate-y-1/2 bg-slate-800 text-slate-200 px-2.5 py-1 rounded text-xs font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center gap-1">
                {item.star && <Star size={9} className="fill-yellow-400 text-yellow-400" />} {item.label}
              </span>
            </button>
          ))}
        </nav>

        {/* ============= HERO ============= */}
        <section id="hero" className="min-h-screen relative flex items-center justify-center px-4 sm:px-6 md:px-12 py-20 overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900/80 to-slate-950" />
          <div className="absolute top-10 left-10 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl blob" style={{ transform: `translate(${mousePos.x * 25}px, ${mousePos.y * 25}px)` }} />
          <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-purple-500/15 rounded-full blur-3xl blob" style={{ animationDelay: '6s', transform: `translate(${mousePos.x * -35}px, ${mousePos.y * -35}px)` }} />
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl blob" style={{ animationDelay: '12s' }} />

          <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center">
            <FadeIn delay={0}>
              <div className="mb-8">
                <div className="flex items-center gap-2 px-4 py-1.5 rounded-full glass font-mono text-xs">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
                  </span>
                  <span className="text-slate-300">Available for new SEO engagements</span>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={100} type="scale">
              <div className="relative w-[260px] h-[260px] md:w-[300px] md:h-[300px] flex items-center justify-center mb-8">
                <div className="absolute inset-0 spin-slow opacity-40">
                  <div className="absolute inset-0 rounded-full border border-dashed border-cyan-400/30"></div>
                </div>
                <div className="absolute inset-0 hidden md:block">
                  <div className="absolute top-1/2 left-1/2 w-3 h-3 -ml-1.5 -mt-1.5 orbit">
                    <div className="px-2 py-1 rounded-md bg-slate-900/90 border border-cyan-500/40 text-cyan-400 font-mono text-[10px] whitespace-nowrap shadow-lg">Technical SEO</div>
                  </div>
                  <div className="absolute top-1/2 left-1/2 w-3 h-3 -ml-1.5 -mt-1.5 orbit" style={{ animationDelay: '-3.5s' }}>
                    <div className="px-2 py-1 rounded-md bg-slate-900/90 border border-purple-500/40 text-purple-400 font-mono text-[10px] whitespace-nowrap shadow-lg">Local SEO</div>
                  </div>
                  <div className="absolute top-1/2 left-1/2 w-3 h-3 -ml-1.5 -mt-1.5 orbit" style={{ animationDelay: '-7s' }}>
                    <div className="px-2 py-1 rounded-md bg-slate-900/90 border border-pink-500/40 text-pink-400 font-mono text-[10px] whitespace-nowrap shadow-lg">Schema</div>
                  </div>
                  <div className="absolute top-1/2 left-1/2 w-3 h-3 -ml-1.5 -mt-1.5 orbit" style={{ animationDelay: '-10.5s' }}>
                    <div className="px-2 py-1 rounded-md bg-slate-900/90 border border-yellow-500/40 text-yellow-400 font-mono text-[10px] whitespace-nowrap shadow-lg">Core Web Vitals</div>
                  </div>
                  <div className="absolute top-1/2 left-1/2 w-3 h-3 -ml-1.5 -mt-1.5 orbit-reverse">
                    <div className="px-2 py-1 rounded-md bg-slate-900/90 border border-green-500/40 text-green-400 font-mono text-[10px] whitespace-nowrap shadow-lg">Rank Math</div>
                  </div>
                  <div className="absolute top-1/2 left-1/2 w-3 h-3 -ml-1.5 -mt-1.5 orbit-reverse" style={{ animationDelay: '-10s' }}>
                    <div className="px-2 py-1 rounded-md bg-slate-900/90 border border-orange-500/40 text-orange-400 font-mono text-[10px] whitespace-nowrap shadow-lg">Search Console</div>
                  </div>
                </div>

                <div className="relative float-slow">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 rounded-full blur-2xl opacity-50"></div>
                  <div className="relative w-44 h-44 md:w-52 md:h-52 rounded-full p-[3px] bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 pulse-glow">
                    <div className="w-full h-full rounded-full bg-slate-900 overflow-hidden flex items-center justify-center">
                      {!imageError ? (
                        <img src="./profile.jpg" alt="Muhammad Raza" className="w-full h-full object-cover" onError={() => setImageError(true)} />
                      ) : (
                        <div className="text-6xl md:text-7xl font-black gradient-text font-display">MR</div>
                      )}
                    </div>
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-green-500 w-6 h-6 rounded-full border-4 border-slate-950 flex items-center justify-center">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={200}>
              <div className="font-mono text-cyan-400 text-xs md:text-sm mb-3 flex items-center gap-2 justify-center flex-wrap">
                <Search size={14} />
                <span className="text-purple-400">site:</span>
                <span className="text-slate-400">raza.rawdigit.com</span>
              </div>

              <h1 className="font-display font-bold leading-none tracking-tight mb-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                <span className="bg-gradient-to-br from-white via-slate-200 to-slate-300 bg-clip-text text-transparent">Muhammad</span>
                {' '}
                <span className="gradient-text">Raza</span>
              </h1>
            </FadeIn>

            <FadeIn delay={300}>
              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-base md:text-lg text-slate-300 mb-2">
                <span>Senior SEO Expert</span>
                <span className="text-slate-600">|</span>
                <span className="text-slate-400 flex items-center gap-1"><MapPin size={14} /> Multan, PK · Working USA Timezones</span>
              </div>

              <p className="font-mono text-xs md:text-sm text-slate-500 mb-8 flex flex-wrap gap-x-2 justify-center">
                <span className="text-purple-400">Technical SEO</span><span className="text-slate-700">·</span>
                <span className="text-cyan-400">Local SEO</span><span className="text-slate-700">·</span>
                <span className="text-yellow-400">Schema Markup</span><span className="text-slate-700">·</span>
                <span className="text-green-400">Rank Math</span><span className="text-slate-700">·</span>
                <span className="text-pink-400">Search Console</span>
              </p>
            </FadeIn>

            {/* SERP CONSOLE */}
            <FadeIn delay={400}>
              <div
                className="font-mono text-xs md:text-sm bg-slate-900/90 backdrop-blur border border-slate-700/50 rounded-xl w-full max-w-2xl mb-8 shadow-2xl text-left overflow-hidden"
                onClick={() => consoleInputRef.current?.focus()}
              >
                <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-slate-800 bg-slate-900">
                  <Search size={13} className="text-cyan-400" />
                  <span className="text-slate-400 text-xs ml-1">SERP Console — try a query like <span className="text-cyan-400">help</span>, <span className="text-cyan-400">wins</span>, or <span className="text-cyan-400">skills</span></span>
                </div>

                <div ref={consoleRef} className="p-4 max-h-72 overflow-y-auto" style={{ scrollBehavior: 'smooth' }}>
                  {consoleHistory.map((entry, i) => (
                    <div key={i} className="mb-1">
                      {entry.type === 'input' && (
                        <div className="flex items-start gap-1.5">
                          <Search size={12} className="text-purple-400 flex-shrink-0 mt-1" />
                          <span className="text-slate-200">{entry.content}</span>
                        </div>
                      )}
                      {entry.type === 'output' && (
                        <pre className="text-slate-400 whitespace-pre-wrap break-words font-mono">{entry.content}</pre>
                      )}
                      {entry.type === 'error' && (
                        <pre className="text-red-400 whitespace-pre-wrap break-words font-mono">{entry.content}</pre>
                      )}
                    </div>
                  ))}

                  <div className="flex items-start gap-1.5 mt-1">
                    <Search size={12} className="text-purple-400 flex-shrink-0 mt-1" />
                    <input
                      ref={consoleInputRef}
                      type="text"
                      value={consoleInput}
                      onChange={(e) => setConsoleInput(e.target.value)}
                      onKeyDown={handleConsoleKeyDown}
                      placeholder="Type a query and press Enter…"
                      className="flex-1 bg-transparent border-none outline-none text-slate-200 font-mono text-xs md:text-sm caret-cyan-400 placeholder-slate-700"
                      spellCheck={false}
                      autoComplete="off"
                    />
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={500}>
              <div className="flex flex-wrap gap-3 mb-10 justify-center">
                <a href="#flagship" onClick={(e) => { e.preventDefault(); document.getElementById('flagship')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="group px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-medium text-sm flex items-center gap-2 hover:shadow-xl hover:shadow-cyan-500/30 transition-all hover:-translate-y-0.5">
                  <Rocket size={16} /> See my work
                  <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
                <button onClick={handlePrint} className="px-6 py-3 rounded-lg border border-cyan-400/40 hover:border-cyan-400 hover:bg-cyan-400/10 text-cyan-400 font-medium text-sm flex items-center gap-2 transition-all hover:-translate-y-0.5">
                  <Download size={16} /> Download Resume
                </button>
                <a href="mailto:raza@rawdigit.com" className="px-6 py-3 rounded-lg border border-slate-700 hover:border-cyan-400 hover:text-cyan-400 text-slate-300 font-medium text-sm flex items-center gap-2 transition-all hover:-translate-y-0.5">
                  <Mail size={16} /> Get in touch
                </a>
                <a href="tel:+923037240087" className="px-6 py-3 rounded-lg border border-slate-700 hover:border-cyan-400 hover:text-cyan-400 text-slate-300 font-medium text-sm flex items-center gap-2 transition-all hover:-translate-y-0.5">
                  <Phone size={16} /> Call
                </a>
              </div>
            </FadeIn>

            <FadeIn delay={600}>
              <div className="grid grid-cols-3 gap-6 md:gap-12 pt-6 border-t border-slate-800 w-full max-w-md">
                <div>
                  <div className="font-display text-3xl md:text-4xl font-bold gradient-text">3+</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider mt-0.5">Years</div>
                </div>
                <div>
                  <div className="font-display text-3xl md:text-4xl font-bold gradient-text">460%</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider mt-0.5">Best Lift</div>
                </div>
                <div>
                  <div className="font-display text-3xl md:text-4xl font-bold gradient-text">#1</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider mt-0.5">SERP Rank</div>
                </div>
              </div>
            </FadeIn>
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-xs text-slate-600 flex flex-col items-center gap-1">
            <span>Scroll, or use the arrow keys</span>
            <ChevronDown size={18} className="animate-bounce" />
          </div>
        </section>

        {/* ============= FLAGSHIP CASE STUDY ============= */}
        <AnimatedSection id="flagship" tag="Flagship Case Study" icon={<Award />} number="02">
          <FadeIn>
            <div className="text-center mb-3">
              <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-yellow-500/10 border border-yellow-500/40 text-yellow-400 uppercase tracking-widest inline-flex items-center gap-1">
                <Star size={10} className="fill-yellow-400" /> Featured Result
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-3 text-center">
              460% mobile speed lift. <span className="gradient-text">Documented.</span>
            </h2>
            <p className="text-slate-400 text-base md:text-lg max-w-3xl mx-auto mb-12 text-center">
              A full Technical SEO and Core Web Vitals overhaul on a live UK aesthetics clinic. Real PageSpeed Insights data, real before/after, real validation in Google Search Console.
            </p>
          </FadeIn>

          <FadeIn delay={200}>
            <div className="glass rounded-2xl p-6 md:p-10 max-w-5xl mx-auto text-left relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500" />

              <div className="grid md:grid-cols-[auto_1fr] gap-6 md:gap-10 items-start">
                <div className="flex justify-center md:justify-start">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 rounded-3xl blur-xl opacity-40"></div>
                    <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-gradient-to-br from-cyan-500 via-purple-600 to-pink-600 flex items-center justify-center shadow-2xl pulse-glow">
                      <Gauge size={64} className="text-white" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-slate-900 border-2 border-cyan-400 rounded-xl px-2 py-1 font-mono text-[10px] text-cyan-400">PSI</div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-green-500/10 border border-green-500/30 text-green-400 uppercase tracking-wider flex items-center gap-1">
                      <ShieldCheck size={10} /> Verified Live
                    </span>
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-cyan-400/10 border border-cyan-400/30 text-cyan-400">PageSpeed Insights</span>
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/30 text-purple-400">United Kingdom</span>
                  </div>

                  <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">FAB Clinic — Technical SEO Overhaul</h3>
                  <p className="text-slate-400 text-sm md:text-base mb-4">
                    Full technical audit identifying critical performance bottlenecks on mobile and desktop. Rebuilt the loading experience, validated structured data, configured crawl directives, and verified mobile usability — all signed off in Google Search Console.
                  </p>

                  <div className="flex items-center gap-1 mb-4 flex-wrap">
                    <Globe size={14} className="text-slate-500" />
                    <a href="https://fab-clinic.co.uk" target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-cyan-400 hover:underline">fab-clinic.co.uk</a>
                    <span className="text-slate-700">·</span>
                    <span className="font-mono text-xs text-slate-500">Aesthetic Clinic, UK</span>
                  </div>

                  {/* Metric bars */}
                  <div className="space-y-3 mb-5">
                    {[
                      { label: 'Mobile Performance', from: 13, to: 73, color: 'pink' },
                      { label: 'Desktop Performance', from: 65, to: 84, color: 'cyan' },
                      { label: 'Best Practices', from: 91, to: 95, color: 'purple' },
                    ].map((m, i) => (
                      <div key={i}>
                        <div className="flex justify-between items-baseline mb-1">
                          <span className="text-sm text-slate-300">{m.label}</span>
                          <span className="font-mono text-xs">
                            <span className="text-slate-600 line-through mr-2">{m.from}/100</span>
                            <span className={`text-${m.color}-400 font-semibold`}>{m.to}/100</span>
                          </span>
                        </div>
                        <div className="relative h-2 bg-slate-900/60 rounded-full overflow-hidden">
                          <div className="absolute top-0 left-0 h-full bg-slate-700/40 rounded-full" style={{ width: `${m.from}%` }} />
                          <div className={`absolute top-0 left-0 h-full bg-gradient-to-r from-${m.color}-500 to-${m.color}-400 rounded-full transition-all duration-1000`} style={{ width: `${m.to}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-2 mb-5">
                    {[
                      { icon: Gauge, label: 'PageSpeed bottleneck diagnosis' },
                      { icon: Wrench, label: 'Loading experience rebuild' },
                      { icon: Tag, label: 'Schema markup, four types' },
                      { icon: ShieldCheck, label: 'robots.txt and XML sitemap' },
                      { icon: Eye, label: 'GSC URL Inspection passed' },
                      { icon: Smartphone, label: 'Mobile usability compliance' },
                    ].map((f, i) => {
                      const Icon = f.icon;
                      return (
                        <div key={i} className="flex items-start gap-2 text-sm text-slate-300 bg-slate-900/40 border border-slate-700/40 rounded-md px-3 py-2 hover:border-cyan-400/40 transition-colors">
                          <Icon size={14} className="text-cyan-400 flex-shrink-0 mt-0.5" />
                          <span>{f.label}</span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mb-5">
                    <div className="font-mono text-[10px] text-cyan-400 uppercase tracking-wider mb-2">Structured Data Validated</div>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        { name: 'Breadcrumbs', count: 77 },
                        { name: 'Merchant Listings', count: 16 },
                        { name: 'Product Snippets', count: 16 },
                        { name: 'Sitelinks Searchbox', count: 77 },
                      ].map((s, i) => (
                        <span key={i} className="font-mono text-[11px] px-2.5 py-1 rounded-md bg-slate-900/60 border border-slate-700/60 text-slate-300 hover:border-cyan-400 hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                          <Check size={10} className="text-green-400" />
                          {s.name} ({s.count})
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-5">
                    <div className="font-mono text-[10px] text-pink-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Wrench size={10} /> What I optimised
                    </div>
                    <ul className="space-y-1.5 text-sm text-slate-300">
                      <li className="pl-5 relative leading-snug"><ChevronRight size={12} className="absolute left-0 top-1 text-pink-400" /><strong className="text-white">Performance audit:</strong> identified render-blocking resources, unoptimised images, and JavaScript bottlenecks</li>
                      <li className="pl-5 relative leading-snug"><ChevronRight size={12} className="absolute left-0 top-1 text-pink-400" /><strong className="text-white">Schema rollout:</strong> Breadcrumbs (77 valid), Merchant Listings (16), Product Snippets (16), Sitelinks Searchbox (77)</li>
                      <li className="pl-5 relative leading-snug"><ChevronRight size={12} className="absolute left-0 top-1 text-pink-400" /><strong className="text-white">Crawl configuration:</strong> proper robots.txt directives plus sitemap reference for clean indexing</li>
                      <li className="pl-5 relative leading-snug"><ChevronRight size={12} className="absolute left-0 top-1 text-pink-400" /><strong className="text-white">Mobile compliance:</strong> verified via Search Console URL Inspection, all enhancements passing</li>
                    </ul>
                  </div>

                  <a href="https://fab-clinic.co.uk" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-medium text-sm hover:shadow-xl hover:shadow-cyan-500/30 transition-all hover:-translate-y-0.5">
                    <Globe size={16} /> Visit fab-clinic.co.uk
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>
        </AnimatedSection>

        {/* ============= WHY ME ============= */}
        <AnimatedSection id="why-me" tag="Why Choose Me" icon={<Heart />} number="03">
          <FadeIn>
            <div className="text-center mb-3">
              <span className="font-mono text-[10px] px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/40 text-pink-400 uppercase tracking-widest">The pitch</span>
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-3 text-center">
              Why <span className="gradient-text">me?</span>
            </h2>
            <p className="text-slate-400 text-base md:text-lg max-w-3xl mx-auto mb-12 text-center">
              Most SEOs are good at one thing — content, or links, or technical. The rare ones diagnose what is actually broken and ship measurable lifts. Here is what you get with me.
            </p>
          </FadeIn>

          <FadeIn delay={150}>
            <div className="bg-slate-900/80 backdrop-blur border border-slate-700/50 rounded-xl p-5 md:p-6 w-full max-w-3xl mx-auto mb-10 shadow-2xl text-left">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-800">
                <Search size={14} className="text-cyan-400" />
                <span className="font-mono text-xs text-slate-400">Search summary for "Muhammad Raza, SEO"</span>
              </div>
              <div className="space-y-3 font-mono text-sm">
                <div className="flex gap-3">
                  <span className="text-cyan-400 w-32 flex-shrink-0">Experience</span>
                  <span className="text-slate-300">3+ years across US, UK, and Pakistan markets</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-cyan-400 w-32 flex-shrink-0">Biggest result</span>
                  <span className="text-slate-300">460% mobile PageSpeed lift, fully documented</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-cyan-400 w-32 flex-shrink-0">Specialty</span>
                  <span className="text-slate-300">Technical SEO and Local SEO</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-cyan-400 w-32 flex-shrink-0">Reporting style</span>
                  <span className="text-slate-300">Data-driven, no fluff</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-cyan-400 w-32 flex-shrink-0">Guessing</span>
                  <span className="text-pink-400">Never</span>
                </div>
              </div>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {[
              {
                icon: Trophy, color: 'cyan', tag: 'Documented results',
                title: 'I ship measurable rankings',
                desc: 'A 460% mobile PageSpeed lift. Position 1 with a featured snippet on a competitive informational query. Seven location pages at Rank Math 79/100. Every claim has a screenshot and a Search Console URL to back it up.'
              },
              {
                icon: Brain, color: 'purple', tag: 'Technical first',
                title: 'I do the technical work right',
                desc: 'Core Web Vitals, schema markup, robots.txt, XML sitemaps, mobile usability — not just buzzwords. I read render-blocking waterfalls, fix CWV failures, and validate every enhancement in Search Console.'
              },
              {
                icon: Map, color: 'pink', tag: 'Local SEO',
                title: 'I build local SEO that converts',
                desc: 'Seven Ohio and Kentucky location pages, each tuned to Rank Math 79/100 with 948+ words of geo-targeted content. NAP consistency, local schema, and the unglamorous detail that actually moves rankings.'
              },
              {
                icon: Search, color: 'yellow', tag: 'Intent matching',
                title: 'I match search intent, not just keywords',
                desc: 'Position 1 with a featured snippet on "what is a lot size of a house". Knowing the difference between informational, transactional, and commercial intent is half the battle, and I win that half.'
              },
              {
                icon: BarChart3, color: 'green', tag: 'Transparent reporting',
                title: 'I report in data, not vibes',
                desc: 'Before/after PageSpeed screenshots. Search Console validation. Rank Math audit results. Position tracking with dates. If I cannot prove a result, I will not claim it.'
              },
              {
                icon: Coffee, color: 'orange', tag: 'Async friendly',
                title: 'I work across time zones',
                desc: 'Working USA business hours from Pakistan at Creative Chaos for 2+ years. I communicate in writing, document decisions, and do not need daily standups to ship audits and rankings.'
              },
              {
                icon: Target, color: 'rose', tag: 'Audit first',
                title: 'I diagnose before I prescribe',
                desc: 'Every engagement starts with a full audit — technical, content, backlink, competitive. Generic "improve your title tags" advice is for amateurs. I tell you what is actually broken on your site.'
              },
              {
                icon: TrendingUp, color: 'blue', tag: 'Always learning',
                title: 'I keep up with the algorithm',
                desc: 'Core updates, helpful content guidelines, E-E-A-T, AI overviews — the search landscape changes monthly. I read the SEO research, watch the Search Central videos, and adjust strategy accordingly.'
              },
              {
                icon: ShieldCheck, color: 'emerald', tag: 'Honest scoping',
                title: 'I will not promise rankings I cannot deliver',
                desc: 'No "page 1 in 30 days" guarantees. No black-hat shortcuts. No "secret sauce". Just sound technical work, smart content strategy, and the patience that good SEO requires.'
              },
            ].map((reason, i) => {
              const Icon = reason.icon;
              return (
                <FadeIn key={i} delay={50 + i * 70}>
                  <div className="glass rounded-xl p-5 md:p-6 group hover:-translate-y-1 h-full relative overflow-hidden">
                    <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-${reason.color}-400 to-transparent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />
                    <div className="flex items-start gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-lg bg-${reason.color}-400/10 border border-${reason.color}-400/30 flex items-center justify-center flex-shrink-0`}>
                        <Icon size={18} className={`text-${reason.color}-400`} />
                      </div>
                      <div className="flex-1">
                        <div className={`font-mono text-[10px] text-${reason.color}-400 uppercase tracking-widest mb-1`}>{reason.tag}</div>
                        <h3 className="text-base md:text-lg font-semibold text-white leading-tight">{reason.title}</h3>
                      </div>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed">{reason.desc}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>

          <FadeIn delay={400}>
            <div className="text-center mt-12">
              <p className="font-mono text-sm text-slate-400 mb-4">
                In short: I am the SEO expert your competitor hopes you do not find.
              </p>
              <a href="mailto:raza@rawdigit.com" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white font-medium text-sm hover:shadow-xl hover:shadow-purple-500/30 transition-all hover:-translate-y-0.5">
                <Mail size={16} /> Let's talk
                <ArrowUpRight size={14} />
              </a>
            </div>
          </FadeIn>
        </AnimatedSection>

        {/* ============= ABOUT ============= */}
        <AnimatedSection id="about" tag="About Me" icon={<Sparkles />} number="04">
          <FadeIn>
            <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-6 text-center">
              SEO expert who actually <span className="gradient-text">ranks.</span>
            </h2>
          </FadeIn>

          <FadeIn delay={150}>
            <div className="glass rounded-2xl p-6 md:p-8 max-w-4xl mx-auto space-y-4 text-center">
              <p className="text-base md:text-lg leading-relaxed text-slate-300">
                Three-plus years working <span className="text-cyan-400 font-medium">Technical SEO, Local SEO, and on-page optimisation</span> across US, UK, and South Asian markets. Started as an SEO Expert at Intero Digital in Islamabad, moved up to SEO Manager at Reborn in Lahore, and currently shipping for international clients as Senior SEO Expert at Creative Chaos.
              </p>
              <p className="text-base md:text-lg leading-relaxed text-slate-300">
                Notable results: <span className="text-white font-semibold">460% mobile PageSpeed lift</span> on a UK aesthetics clinic, <span className="text-white font-semibold">first-position featured snippet</span> on a competitive Pakistani real-estate query, and a <span className="text-white font-semibold">seven-page geo-targeted location network</span> for a US power-washing client.
              </p>
              <p className="text-base md:text-lg leading-relaxed text-slate-300">
                Now ready to focus deeply on one site or one product — instead of context-switching across smaller projects — and turn its organic search into a measurable revenue channel.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={300}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-8 max-w-4xl mx-auto">
              <div className="glass rounded-xl p-4 text-center hover:border-cyan-400/40 transition-all hover:-translate-y-1">
                <div className="font-display text-3xl md:text-4xl font-bold gradient-text">3+</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider mt-1">Years Ranking</div>
              </div>
              <div className="glass rounded-xl p-4 text-center hover:border-cyan-400/40 transition-all hover:-translate-y-1">
                <div className="font-display text-3xl md:text-4xl font-bold gradient-text">460%</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider mt-1">Best Lift</div>
              </div>
              <div className="glass rounded-xl p-4 text-center hover:border-cyan-400/40 transition-all hover:-translate-y-1">
                <div className="font-display text-3xl md:text-4xl font-bold gradient-text">#1</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider mt-1">SERP Rank</div>
              </div>
              <div className="glass rounded-xl p-4 text-center hover:border-cyan-400/40 transition-all hover:-translate-y-1">
                <div className="font-display text-3xl md:text-4xl font-bold gradient-text">3</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider mt-1">Countries Served</div>
              </div>
            </div>
          </FadeIn>
        </AnimatedSection>

        {/* ============= PROCESS ============= */}
        <AnimatedSection id="process" tag="My Process" icon={<Workflow />} number="05">
          <FadeIn>
            <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-3 text-center">
              How I <span className="gradient-text">work.</span>
            </h2>
            <p className="text-slate-400 text-base md:text-lg max-w-3xl mx-auto mb-10 text-center">
              No mystery, no "trust the process" hand-waving. Here is the playbook I run on every SEO engagement.
            </p>
          </FadeIn>

          <div className="max-w-5xl mx-auto">
            <div className="relative pl-8 md:pl-10">
              <div className="absolute left-2 md:left-3 top-2 bottom-2 w-0.5 bg-gradient-to-b from-cyan-400 via-purple-500 to-pink-500" />

              {[
                {
                  step: '01', icon: Compass, color: 'cyan',
                  title: 'Discovery and Site Audit',
                  duration: '3-5 days',
                  desc: 'Full technical audit covering Core Web Vitals, crawl, schema, and indexability, plus a content audit and competitive landscape review. I find what is actually holding rankings back before touching anything.',
                  output: 'Audit document, prioritised issue list, baseline metrics snapshot'
                },
                {
                  step: '02', icon: Search, color: 'purple',
                  title: 'Keyword and Intent Research',
                  duration: '2-4 days',
                  desc: 'Map the keyword universe: informational, transactional, commercial. Identify gaps your competitors are winning. Build a keyword cluster strategy aligned to business goals.',
                  output: 'Keyword cluster map, content brief priorities, competitive gap analysis'
                },
                {
                  step: '03', icon: Layers, color: 'pink',
                  title: 'Technical SEO Implementation',
                  duration: '1-2 weeks',
                  desc: 'PageSpeed optimisation, schema markup rollout, robots.txt and XML sitemap configuration, internal linking audit, mobile usability fixes. The detail work that actually moves rankings.',
                  output: 'Implemented technical fixes, schema validation in GSC, CWV improvements documented'
                },
                {
                  step: '04', icon: FileText, color: 'yellow',
                  title: 'On-Page and Content Optimisation',
                  duration: 'ongoing',
                  desc: 'Title tags, meta descriptions, URL slugs, header structure, keyword placement, content depth. Rank Math and Yoast tuning to 79+ scores. Every page audited and shipped clean.',
                  output: 'Rank Math 79+ scores, on-page audit reports, content briefs delivered'
                },
                {
                  step: '05', icon: Link2, color: 'green',
                  title: 'Local SEO and Off-Page',
                  duration: 'ongoing',
                  desc: 'Google My Business optimisation, local citations, NAP consistency, geo-targeted landing pages, link building. For multi-location clients, the same network architecture I built for Liberty Power Wash.',
                  output: 'GMB optimised, citation list built, location pages live, backlink reports'
                },
                {
                  step: '06', icon: Activity, color: 'orange',
                  title: 'Monitoring and Iteration',
                  duration: 'monthly retainer',
                  desc: 'Weekly position tracking, monthly Search Console reports, Core Update monitoring, content refresh cadence. SEO is not a one-time project — it is a rolling discipline.',
                  output: 'Monthly reports, position tracking dashboards, ongoing optimisation sprints'
                },
              ].map((step, i) => {
                const Icon = step.icon;
                return (
                  <FadeIn key={i} delay={i * 80}>
                    <div className="relative" style={{ marginBottom: '20px' }}>
                      <div className={`absolute -left-10 md:-left-11 top-1 w-5 h-5 rounded-full bg-slate-950 border-2 border-${step.color}-400 pulse-glow flex items-center justify-center`}>
                        <Icon size={10} className={`text-${step.color}-400`} />
                      </div>
                      <div className="glass rounded-xl p-5 md:p-6 hover:-translate-y-1 group">
                        <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                          <div className="flex items-center gap-3">
                            <span className={`font-mono text-xs px-2 py-0.5 rounded bg-${step.color}-400/10 border border-${step.color}-400/30 text-${step.color}-400`}>STEP {step.step}</span>
                            <h3 className="text-lg md:text-xl font-semibold text-white">{step.title}</h3>
                          </div>
                          <div className="font-mono text-xs text-slate-500 flex items-center gap-1">
                            <Clock size={11} /> {step.duration}
                          </div>
                        </div>
                        <p className="text-sm md:text-[15px] text-slate-300 leading-relaxed mb-3">{step.desc}</p>
                        <div className="font-mono text-[10px] text-cyan-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                          <FileText size={10} /> Deliverables
                        </div>
                        <p className="text-xs text-slate-400 italic">{step.output}</p>
                      </div>
                    </div>
                  </FadeIn>
                );
              })}
            </div>

            <FadeIn delay={500}>
              <div className="grid sm:grid-cols-2 gap-4 mt-6">
                <div className="glass rounded-xl p-5 hover:-translate-y-1 hover:border-green-400/40">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-green-400/10 border border-green-400/30 flex items-center justify-center">
                      <Activity size={18} className="text-green-400" />
                    </div>
                    <div>
                      <div className="font-mono text-[10px] text-green-400 uppercase tracking-wider">Response time</div>
                      <div className="text-white font-semibold text-base">Average under 4 hours</div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400">During USA business hours (9am to 6pm EST/PST). Outside those hours, expect a reply by the next business day.</p>
                </div>
                <div className="glass rounded-xl p-5 hover:-translate-y-1 hover:border-cyan-400/40">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center">
                      <CalendarCheck size={18} className="text-cyan-400" />
                    </div>
                    <div>
                      <div className="font-mono text-[10px] text-cyan-400 uppercase tracking-wider">Availability</div>
                      <div className="text-white font-semibold text-base">Open for new engagements</div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400">Project-based audits · Monthly retainer (20+ hrs) · Full-time SEO lead roles. NDA available on request.</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </AnimatedSection>

        {/* ============= SKILLS ============= */}
        <AnimatedSection id="skills" tag="SEO Toolkit" icon={<Wrench />} number="06">
          <FadeIn>
            <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-6 text-center">
              My SEO <span className="gradient-text">toolkit.</span>
            </h2>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {[
              { cat: 'Technical SEO', icon: Wrench, items: ['Core Web Vitals', 'Schema Markup', 'robots.txt', 'XML Sitemaps', 'Crawl Optimisation', 'Mobile Usability'] },
              { cat: 'Local SEO', icon: Map, items: ['GMB Optimisation', 'Location Pages', 'Geo-targeting', 'Local Citations', 'NAP Consistency', 'Multi-region Strategy'] },
              { cat: 'On-Page Optimisation', icon: AlignLeft, items: ['Rank Math', 'Yoast SEO', 'Meta Optimisation', 'URL Structure', 'Keyword Placement', 'Content Briefs'] },
              { cat: 'Analytics', icon: BarChart3, items: ['Google Search Console', 'Google Analytics', 'PageSpeed Insights', 'GTmetrix', 'Looker Studio'] },
              { cat: 'Research Tools', icon: Search, items: ['Ahrefs', 'SEMrush', 'Screaming Frog', 'Moz', 'AnswerThePublic'] },
              { cat: 'Content & Strategy', icon: FileText, items: ['Keyword Research', 'Topical Authority', 'Internal Linking', 'Featured Snippets', 'E-E-A-T Signals'] },
              { cat: 'Off-Page SEO', icon: Link2, items: ['Link Building', 'Outreach', 'Authority Building', 'Backlink Audits', 'Disavow Management'] },
              { cat: 'CMS Platforms', icon: Package, items: ['WordPress', 'WooCommerce', 'Shopify', 'Webflow', 'Custom Sites'] },
              { cat: 'Vibe Coding & Programming', icon: Brain, items: ['HTML / CSS / JS', 'WordPress-ready tools', 'AI-assisted builds', 'C++ console projects', 'Desktop app packaging'] },
              { cat: 'Reporting', icon: PieChart, items: ['Looker Studio', 'GSC Insights', 'Position Tracking', 'KPI Dashboards', 'Monthly Reviews'] },
            ].map((group, i) => {
              const Icon = group.icon;
              return (
                <FadeIn key={i} delay={i * 50}>
                  <div className="glass rounded-xl p-5 hover:-translate-y-1 group h-full">
                    <div className="font-mono text-xs text-cyan-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <Icon size={14} className="opacity-70 group-hover:opacity-100 transition-opacity" />
                      {group.cat}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {group.items.map((item, j) => (
                        <span key={j} className="font-mono text-xs px-2.5 py-1 rounded-md bg-slate-900/60 border border-slate-700/60 text-slate-300 hover:border-cyan-400 hover:text-cyan-400 transition-colors cursor-default">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </AnimatedSection>

        {/* ============= EXPERIENCE ============= */}
        <AnimatedSection id="experience" tag="Career History" icon={<Briefcase />} number="07">
          <FadeIn>
            <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-6 text-center">
              Where I have <span className="gradient-text">ranked.</span>
            </h2>
          </FadeIn>

          <div className="relative max-w-5xl mx-auto pl-8 md:pl-10">
            <div className="absolute left-2 md:left-3 top-2 bottom-2 w-0.5 bg-gradient-to-b from-cyan-400 via-purple-500 to-slate-700" />

            {[
              {
                role: 'Senior SEO Expert', company: 'Creative Chaos', location: 'Remote · USA Client', when: 'Sep 2023 — Present',
                bullets: [
                  ['Own ', 'end-to-end SEO strategy', ' across multiple international client engagements'],
                  ['Delivered the ', 'FAB Clinic 460% mobile PageSpeed lift', ' — full technical audit, performance optimisation, schema rollout, and Search Console validation'],
                  ['Architected the ', 'Liberty Power Wash multi-location network', ' — seven Ohio and Kentucky location pages at Rank Math 79/100 with 948+ words of geo-targeted content'],
                  ['Running keyword research, on-page optimisation, Technical SEO audits, and competitive analysis'],
                  ['Local SEO and Google My Business optimisation for multi-location US clients'],
                  ['Monthly Search Console reporting, position tracking, and Core Update monitoring'],
                ],
              },
              {
                role: 'SEO Manager', company: 'Reborn', location: 'Lahore, Pakistan', when: '2020 — 2023',
                bullets: [
                  ['Built and executed ', 'SEO strategies aligned to business goals', ' across the agency client portfolio'],
                  ['In-depth keyword research, competitor analysis, and content gap identification'],
                  ['Oversight of ', 'on-page, off-page, and Technical SEO', ' implementations across multiple verticals'],
                  ['Site speed, mobile optimisation, and site structure improvements for client sites'],
                  ['Managed link-building campaigns and backlink acquisition workflows'],
                ],
              },
              {
                role: 'SEO Expert', company: 'Intero Digital', location: 'Islamabad, Pakistan', when: 'Aug 2019 — Aug 2020',
                bullets: [
                  ['Conducted ', 'in-depth keyword research', ' to identify high-potential terms for content optimisation'],
                  ['Optimised website content, meta tags, and structure for search engine visibility'],
                  ['Monitored and improved ', 'technical aspects', ' including site speed, mobile optimisation, and schema markup'],
                  ['Developed and executed link-building strategies for domain authority and backlink quality'],
                ],
              },
            ].map((job, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="relative last:mb-0" style={{ marginBottom: '20px' }}>
                  <div className="absolute -left-10 md:-left-11 top-1 w-5 h-5 rounded-full bg-slate-950 border-2 border-cyan-400 pulse-glow" />
                  <div className="glass rounded-xl p-5 md:p-6 hover:-translate-y-1">
                    <div className="flex flex-wrap justify-between items-baseline gap-2 mb-1">
                      <h3 className="text-lg md:text-xl font-semibold text-white">{job.role}</h3>
                      <div className="font-mono text-xs text-slate-400">{job.when}</div>
                    </div>
                    <div className="font-mono text-sm text-cyan-400 mb-4">
                      {job.company} <span className="text-slate-600 mx-1.5">·</span>
                      <span className="text-slate-400">{job.location}</span>
                    </div>
                    <ul className="space-y-2">
                      {job.bullets.map((b, j) => (
                        <li key={j} className="pl-6 relative text-sm md:text-[15px] leading-relaxed text-slate-300">
                          <ChevronRight size={14} className="absolute left-0 top-1 text-cyan-400 flex-shrink-0" />
                          {b.map((part, k) => (k % 2 === 1 ? <strong key={k} className="text-white font-semibold">{part}</strong> : <span key={k}>{part}</span>))}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </AnimatedSection>

        {/* ============= RANKINGS PORTFOLIO ============= */}
        <AnimatedSection id="rankings" tag="Keyword Rankings" icon={<TrendingUp />} number="08">
          <FadeIn>
            <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-3 text-center">
              Ranked in <span className="gradient-text">production.</span>
            </h2>
            <p className="text-slate-400 text-base md:text-lg max-w-3xl mx-auto mb-6 text-center">
              Real keywords, real SERP positions, real client sites. <span className="text-cyan-400">Click any card</span> to see the tactics used and the results delivered.
            </p>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              <button
                onClick={() => { setRankingsFilter('all'); setExpandedRanking(null); }}
                className={`font-mono text-xs px-3 py-1.5 rounded-full border transition-all flex items-center gap-1.5 ${
                  rankingsFilter === 'all' ? 'bg-cyan-400/10 border-cyan-400 text-cyan-400' : 'border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-300'
                }`}
              >
                <Layers size={11} /> All ({rankings.length})
              </button>
              <button
                onClick={() => { setRankingsFilter('featured'); setExpandedRanking(null); }}
                className={`font-mono text-xs px-3 py-1.5 rounded-full border transition-all flex items-center gap-1.5 ${
                  rankingsFilter === 'featured' ? 'bg-yellow-400/10 border-yellow-400 text-yellow-400' : 'border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-300'
                }`}
              >
                <Star size={11} className={rankingsFilter === 'featured' ? 'fill-yellow-400' : ''} /> Featured ({featuredCount})
              </button>
              <button
                onClick={() => { setRankingsFilter('verified'); setExpandedRanking(null); }}
                className={`font-mono text-xs px-3 py-1.5 rounded-full border transition-all flex items-center gap-1.5 ${
                  rankingsFilter === 'verified' ? 'bg-green-400/10 border-green-400 text-green-400' : 'border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-300'
                }`}
              >
                <ShieldCheck size={11} /> Verified ({verifiedCount})
              </button>
              <button
                onClick={() => { setRankingsFilter('inProgress'); setExpandedRanking(null); }}
                className={`font-mono text-xs px-3 py-1.5 rounded-full border transition-all flex items-center gap-1.5 ${
                  rankingsFilter === 'inProgress' ? 'bg-orange-400/10 border-orange-400 text-orange-400' : 'border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-300'
                }`}
              >
                <Rocket size={11} /> In Progress ({inProgressCount})
              </button>
            </div>
          </FadeIn>

          <FadeIn delay={150}>
            <div className="flex flex-col lg:flex-row gap-3 mb-8 justify-center items-center">
              <div className="flex flex-wrap gap-1.5 justify-center">
                {intentCategories.map((cat) => {
                  const count = cat === 'all' ? rankings.length : rankings.filter(p => p.intent === cat).length;
                  return (
                    <button
                      key={cat}
                      onClick={() => { setIntentFilter(cat); setExpandedRanking(null); }}
                      className={`font-mono text-[11px] px-2.5 py-1 rounded-full border transition-all ${
                        intentFilter === cat
                          ? `bg-${catColors[cat] || 'cyan'}-400/10 border-${catColors[cat] || 'cyan'}-400 text-${catColors[cat] || 'cyan'}-400`
                          : 'border-slate-800 text-slate-500 hover:border-slate-600 hover:text-slate-400'
                      }`}
                    >
                      {cat} ({count})
                    </button>
                  );
                })}
              </div>
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  value={rankingsSearch}
                  onChange={(e) => setRankingsSearch(e.target.value)}
                  placeholder="Search rankings…"
                  className="font-mono text-xs pl-9 pr-3 py-1.5 rounded-full bg-slate-900/60 border border-slate-700 text-slate-300 placeholder-slate-600 focus:outline-none focus:border-cyan-400 w-full lg:w-56 transition-colors"
                />
              </div>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
            {filteredRankings.map((site, i) => {
              const isExpanded = expandedRanking === `${site.url}-${i}`;
              return (
                <FadeIn key={`${site.url}-${i}`} delay={Math.min(i * 40, 400)}>
                  <div
                    className={`glass rounded-xl p-5 relative overflow-hidden cursor-pointer h-full ${isExpanded ? 'border-cyan-400/40 lg:col-span-3 sm:col-span-2' : 'hover:-translate-y-1 hover:border-cyan-400/40'}`}
                    onClick={() => setExpandedRanking(isExpanded ? null : `${site.url}-${i}`)}
                  >
                    {site.featured && (
                      <>
                        <div className="absolute top-0 right-0 w-0 h-0 border-l-[40px] border-l-transparent border-t-[40px] border-t-yellow-400/20" />
                        <Star size={10} className="absolute top-2 right-2 fill-yellow-400 text-yellow-400" />
                      </>
                    )}

                    <div className="flex items-start gap-3 mb-3">
                      <div className="relative flex-shrink-0">
                        <div className={`w-12 h-12 rounded-full p-[2px] ${site.featured ? 'bg-gradient-to-br from-yellow-400 via-cyan-400 to-purple-500' : site.verified ? 'bg-gradient-to-br from-green-500/60 to-cyan-500/60' : 'bg-gradient-to-br from-orange-500/40 to-pink-500/40'}`}>
                          <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden">
                            {site.pos !== null ? (
                              <div className="font-display font-bold text-sm gradient-text">#{site.pos}</div>
                            ) : (
                              <Search size={18} className="text-cyan-400" />
                            )}
                          </div>
                        </div>
                        {site.verified && (
                          <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-slate-900 flex items-center justify-center" title="Verified">
                            <Check size={7} className="text-white" />
                          </div>
                        )}
                        {site.inProgress && (
                          <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-orange-500 border-2 border-slate-900 flex items-center justify-center blink-slow" title="In progress">
                            <Rocket size={7} className="text-white" />
                          </div>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="font-semibold text-white text-sm md:text-[15px] pr-3 leading-snug">{site.name}</div>
                        <div className="font-mono text-[11px] text-cyan-400/70 truncate">{site.url}</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                      <span className={`font-mono text-[10px] px-2 py-0.5 rounded bg-slate-900/80 border border-slate-700/60 text-${catColors[site.intent] || 'slate'}-400 whitespace-nowrap uppercase tracking-wider`}>
                        {site.intent}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <BarChart3 size={11} className="text-purple-400" />
                        <span className="font-mono text-[10.5px] text-purple-300">{site.type}</span>
                      </div>
                    </div>

                    <div className="text-xs text-slate-400 leading-snug mb-2">{site.desc}</div>

                    {site.inProgress && !isExpanded && (
                      <span className="inline-block font-mono text-[10px] px-2 py-0.5 rounded bg-orange-500/10 border border-orange-500/30 text-orange-400 mt-1">
                        Optimisation in progress
                      </span>
                    )}

                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t border-slate-700/50 space-y-3">
                        {site.tactics && site.tactics.length > 0 && (
                          <div>
                            <div className="font-mono text-[10px] text-cyan-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                              <Wrench size={10} /> Tactics Used
                            </div>
                            <ul className="space-y-1">
                              {site.tactics.map((t, j) => (
                                <li key={j} className="text-xs text-slate-300 pl-4 relative leading-snug">
                                  <ChevronRight size={10} className="absolute left-0 top-1 text-cyan-400 flex-shrink-0" />{t}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {site.metrics && site.metrics.length > 0 && (
                          <div>
                            <div className="font-mono text-[10px] text-yellow-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                              <Zap size={10} /> Results
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {site.metrics.map((f, j) => (
                                <span key={j} className="font-mono text-[10px] px-2 py-0.5 rounded bg-yellow-500/10 border border-yellow-500/30 text-yellow-300">{f}</span>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="font-mono text-[10px] text-slate-500">
                          Site: <span className="text-cyan-400">{site.url}</span> · Industry: {site.industry}
                        </div>
                      </div>
                    )}
                  </div>
                </FadeIn>
              );
            })}
          </div>

          {filteredRankings.length === 0 && (
            <div className="text-center py-16 font-mono text-sm text-slate-500">
              No results — try a different filter or search term.
            </div>
          )}
        </AnimatedSection>

        {/* ============= CASE STUDIES ============= */}
        <AnimatedSection id="projects" tag="Case Studies" icon={<FileText />} number="09">
          <FadeIn>
            <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-6 text-center">
              Selected <span className="gradient-text">case studies.</span>
            </h2>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-5 max-w-6xl mx-auto text-left">
            {[
              {
                tag: 'Technical SEO · UK · Aesthetics',
                title: 'FAB Clinic — Speed and Schema Overhaul',
                count: '+460% mobile',
                stack: ['PageSpeed Insights', 'Schema Markup', 'Search Console', 'robots.txt'],
                custom: ['Full performance bottleneck diagnosis', 'Mobile PageSpeed 13 to 73 rebuild', 'Validated four schema types (Breadcrumbs, Products, Listings, Searchbox)', 'GSC URL Inspection compliance'],
                desc: 'UK aesthetics clinic with critical mobile and desktop performance issues. Full technical audit, performance optimisation, schema rollout, and Search Console validation.',
              },
              {
                tag: 'Local SEO · USA · Multi-Location',
                title: 'Liberty Power Wash — 7 Location Network',
                count: '7+ pages live',
                stack: ['Rank Math', 'Local Schema', 'Geo Content', 'Internal Linking'],
                custom: ['7+ location-specific service pages', 'Rank Math 79/100 across pages', '948-959 word geo-targeted content', '"All Good" Basic SEO on 6 of 7 pages'],
                desc: 'US power-washing client needing presence across Ohio and Kentucky markets. Multi-location SEO architecture with unique geo-content per page.',
              },
              {
                tag: 'Informational · Pakistan · Real Estate',
                title: 'ilaan.com — Featured Snippet Capture',
                count: 'Position #1',
                stack: ['Content Strategy', 'Schema (Article + FAQ)', 'Internal Linking', 'Featured Snippet'],
                custom: ['Long-form pillar content', 'Article and FAQ schema implementation', 'Internal link cluster build', 'Featured snippet formatting'],
                desc: 'Captured position #1 with a featured snippet on "what is a lot size of a house" — a high-volume informational query on a competitive Pakistani real estate site.',
              },
              {
                tag: 'Transactional · Pakistan · Competitive',
                title: 'ilaan.com — Lahore Real Estate Cluster',
                count: '4 page-1 keywords',
                stack: ['Geo Landing Pages', 'Location Schema', 'Local Citations', 'On-page Density'],
                custom: ['Geo-targeted landing pages per query variant', 'Location schema with unique content', 'CTR-optimised title tags', 'Pillar-page topical authority strategy'],
                desc: 'Page-1 SERP positions on highly competitive Lahore real estate queries including "5 marla", "10 marla", "house for sale", and "digital marketing agency".',
              },
              {
                tag: 'Academic SEO · Research Journal',
                title: 'IJSREAT — Research Journal SEO Growth',
                count: '33.9K impressions',
                stack: ['Google Search Console', 'Article Schema', 'Internal Linking', 'Indexation'],
                custom: ['Optimised title tags and meta descriptions for research-paper listing pages', 'Improved crawlability and indexation of paginated journal archives', 'Implemented structured data for academic articles', 'Built internal links between volume, issue, and article pages'],
                desc: 'Three-month SEO engagement for an academic research journal, reaching 33,900 impressions and 605 clicks with a 1.8% CTR and 28.3 average position.',
              },
              {
                tag: 'Academic SEO · Research Journal',
                title: 'IJRTMR — Period-over-Period Organic Growth',
                count: '+168% clicks',
                stack: ['Content Gap Analysis', 'On-Page SEO', 'Technical SEO', 'GSC Tracking'],
                custom: ['Identified unranked high-potential academic topics', 'Created and optimised landing pages for research search intent', 'Improved headings, keyword placement, and readability across journal pages', 'Fixed crawl budget and indexing issues'],
                desc: 'Three-month academic SEO campaign where clicks grew 168%, impressions grew 158%, and average position improved from 30.8 to 20.1.',
              },
              {
                tag: 'Content SEO · Web Development',
                title: 'W3Torch — Programming Resource Visibility Growth',
                count: '+568% impressions',
                stack: ['Technical Audit', 'Topical Clusters', 'Tutorial SEO', 'Internal Linking'],
                custom: ['Performed a full technical audit for crawl and indexation blockers', 'Optimised programming tutorial and reference pages', 'Built topical clusters around core web development subjects', 'Improved page experience signals including mobile usability and load speed'],
                desc: 'Six-month SEO engagement for a web development resource site, growing clicks from 226 to 557 and impressions from 47,900 to 320,000.',
              },
              {
                tag: 'Local SEO · Dubai · Legal Services',
                title: 'Notary Services Dubai — Local Legal SEO',
                count: '41K impressions',
                stack: ['Local SEO', 'GBP Optimisation', 'Legal Schema', 'Geo Content'],
                custom: ['Optimised service pages for high-intent Dubai notary queries', 'Improved NAP consistency and Google Business Profile signals', 'Built location-specific content for geo-targeted traffic', 'Added local business and legal services schema'],
                desc: 'Focused Nov-Dec 2025 engagement for a local legal services website, achieving 389 clicks, 41,000 impressions, and 13.5 average position.',
              },
              {
                tag: 'Legal SEO · Dubai · Law Firm',
                title: 'Notario Lawyers Dubai — Practice Area Growth',
                count: 'Avg pos 10.9',
                stack: ['Local Keyword Research', 'Practice Pages', 'Internal Linking', 'Topical Authority'],
                custom: ['Optimised practice-area pages for Dubai lawyer and legal service terms', 'Conducted UAE legal-intent keyword research', 'Improved page structure and internal linking', 'Built topical authority around notarisation, attestation, and legal consultation'],
                desc: 'Nov-Dec 2025 SEO engagement for a Dubai law firm, achieving 203 clicks, 27,800 impressions, and a 10.9 average position near page 1.',
              },
            ].map((p, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="glass rounded-xl p-6 relative overflow-hidden group hover:-translate-y-1 h-full">
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="font-mono text-[10px] text-purple-400 uppercase tracking-widest">{p.tag}</div>
                    <div className="font-mono text-[10px] px-2 py-0.5 rounded bg-cyan-400/10 border border-cyan-400/30 text-cyan-400">{p.count}</div>
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-white mb-2">{p.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-300 mb-4">{p.desc}</p>

                  <div className="space-y-2.5 pt-3 border-t border-slate-700/50">
                    <div>
                      <div className="font-mono text-[10px] text-cyan-400 uppercase tracking-wider mb-1.5">Tools and Techniques</div>
                      <div className="flex flex-wrap gap-1">
                        {p.stack.map((s, j) => (
                          <span key={j} className="font-mono text-[10px] px-2 py-0.5 rounded bg-slate-900/60 border border-slate-700/60 text-slate-300">{s}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="font-mono text-[10px] text-pink-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <Wrench size={10} /> What I did
                      </div>
                      <ul className="space-y-0.5">
                        {p.custom.map((c, j) => (
                          <li key={j} className="text-xs text-slate-300 pl-4 relative leading-snug">
                            <ChevronRight size={10} className="absolute left-0 top-1 text-pink-400 flex-shrink-0" />{c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </AnimatedSection>

        {/* ============= ACHIEVEMENTS ============= */}
        <AnimatedSection id="achievements" tag="Achievements & Growth" icon={<Trophy />} number="10">
          <FadeIn>
            <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-3 text-center">
              Achievements and <span className="gradient-text">growth.</span>
            </h2>
            <p className="text-slate-400 text-base md:text-lg max-w-3xl mx-auto mb-10 text-center">
              The receipts. What I have ranked, what I am learning, what shaped my SEO thinking.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-5 max-w-6xl mx-auto">

            <FadeIn delay={100}>
              <div className="glass rounded-xl p-6 hover:-translate-y-1 group h-full">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-yellow-400/10 border border-yellow-400/30 flex items-center justify-center">
                    <Trophy size={16} className="text-yellow-400" />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-white">Career Highlights</h3>
                </div>
                <ul className="space-y-2.5 text-sm text-slate-300">
                  {[
                    '460% mobile PageSpeed lift (13 to 73) on UK aesthetics clinic',
                    '29% desktop PageSpeed improvement (65 to 84) on the same site',
                    'Position #1 with featured snippet on competitive informational query',
                    '7+ location pages optimised to Rank Math 79/100 across Ohio and Kentucky',
                    'Four schema types validated with zero errors in Search Console',
                    '33,900 impressions and 605 clicks generated for IJSREAT over 3 months',
                    '168% click growth and 158% impression growth delivered for IJRTMR',
                    '568% impression growth delivered for W3Torch over 6 months',
                    'Dubai legal SEO campaigns reached 41,000 and 27,800 impressions in Nov-Dec 2025',
                    'Promoted from SEO Expert to SEO Manager to Senior SEO Expert in under four years',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 leading-relaxed">
                      <Check size={14} className="text-green-400 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            <FadeIn delay={200}>
              <div className="glass rounded-xl p-6 hover:-translate-y-1 group h-full">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center">
                    <TrendingUp size={16} className="text-cyan-400" />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-white">Currently Learning</h3>
                </div>
                <p className="text-xs text-slate-400 mb-3 italic">The search landscape moves fast.</p>
                <div className="space-y-3">
                  {[
                    { skill: 'AI Overviews and SGE optimisation', progress: 70, color: 'cyan' },
                    { skill: 'Advanced Schema (FAQ, HowTo, Speakable)', progress: 85, color: 'purple' },
                    { skill: 'Core Web Vitals (INP metric)', progress: 80, color: 'pink' },
                    { skill: 'Programmatic SEO at scale', progress: 60, color: 'yellow' },
                    { skill: 'Looker Studio reporting', progress: 75, color: 'green' },
                  ].map((s, i) => (
                    <div key={i}>
                      <div className="flex justify-between mb-1">
                        <span className="font-mono text-xs text-slate-300">{s.skill}</span>
                        <span className={`font-mono text-[10px] text-${s.color}-400`}>{s.progress}%</span>
                      </div>
                      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r from-${s.color}-500 to-${s.color}-400 rounded-full transition-all duration-1000`}
                          style={{ width: `${s.progress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={300}>
              <div className="glass rounded-xl p-6 hover:-translate-y-1 group h-full">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-purple-400/10 border border-purple-400/30 flex items-center justify-center">
                    <Award size={16} className="text-purple-400" />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-white">Education and Practice</h3>
                </div>
                <ul className="space-y-3 text-sm text-slate-300">
                  <li className="border-l-2 border-purple-400/40 pl-3">
                    <div className="font-semibold text-white">Master of Computer Science</div>
                    <div className="text-xs text-slate-400">MNS University, Multan · 2020-2024</div>
                  </li>
                  <li className="border-l-2 border-cyan-400/40 pl-3">
                    <div className="font-semibold text-white">FSC</div>
                    <div className="text-xs text-slate-400">Punjab Group of Colleges · 2019-2020</div>
                  </li>
                  <li className="border-l-2 border-pink-400/40 pl-3">
                    <div className="font-semibold text-white">Practitioner-trained SEO</div>
                    <div className="text-xs text-slate-400">3+ years shipping production rankings across US, UK, and Pakistan markets</div>
                  </li>
                </ul>
              </div>
            </FadeIn>

            <FadeIn delay={400}>
              <div className="glass rounded-xl p-6 hover:-translate-y-1 group h-full">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-pink-400/10 border border-pink-400/30 flex items-center justify-center">
                    <BookOpen size={16} className="text-pink-400" />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-white">Resources That Shaped Me</h3>
                </div>
                <p className="text-xs text-slate-400 mb-3 italic">Standing on the shoulders of giants.</p>
                <ul className="space-y-2.5 text-sm">
                  {[
                    { book: 'The Art of SEO', author: 'Enge, Spencer, Stricchiola', why: 'the foundational reference' },
                    { book: 'Ahrefs Blog and YouTube', author: 'Tim Soulo, Sam Oh', why: 'tactical, data-backed SEO' },
                    { book: 'Backlinko', author: 'Brian Dean', why: 'on-page optimisation frameworks' },
                    { book: 'Google Search Central docs', author: 'Google', why: 'the source of truth, always' },
                  ].map((b, i) => (
                    <li key={i} className="border-l-2 border-pink-400/30 pl-3">
                      <div className="font-medium text-white text-[13px]">{b.book}</div>
                      <div className="text-[11px] text-slate-400">{b.author} · <span className="italic text-slate-500">{b.why}</span></div>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </AnimatedSection>

        {/* ============= TESTIMONIALS ============= */}
        <AnimatedSection id="testimonials" tag="Client Reviews" icon={<MessageSquare />} number="11">
          <FadeIn>
            <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-3 text-center">
              Client <span className="gradient-text">reviews.</span>
            </h2>
            <p className="text-slate-400 text-base md:text-lg max-w-3xl mx-auto mb-10 text-center">
              What clients have said about working with me. Auto-rotating every 6 seconds.
            </p>
          </FadeIn>

          <FadeIn delay={150}>
            <div
              className="max-w-4xl mx-auto"
              onMouseEnter={() => setAutoplayPaused(true)}
              onMouseLeave={() => setAutoplayPaused(false)}
            >
              <div className="relative">
                <div className="bg-slate-900/80 border border-slate-700/60 rounded-xl overflow-hidden shadow-2xl">
                  <div className="bg-slate-800/60 border-b border-slate-700/60 px-4 md:px-6 py-3 flex items-center gap-2 md:gap-3 flex-wrap">
                    <div className="flex items-center gap-2">
                      <MessageSquare size={16} className={`text-${testimonials[currentReview].labelColor}-400`} />
                      <span className="font-mono text-xs md:text-sm text-slate-300">Review {testimonials[currentReview].ref}</span>
                    </div>
                    <span className="font-mono text-xs md:text-sm text-white truncate flex-1 min-w-0">
                      {testimonials[currentReview].title}
                    </span>
                    <span className={`font-mono text-[10px] px-2 py-0.5 rounded-full bg-${testimonials[currentReview].labelColor}-500/10 border border-${testimonials[currentReview].labelColor}-500/40 text-${testimonials[currentReview].labelColor}-400 uppercase tracking-wider whitespace-nowrap`}>
                      {testimonials[currentReview].label}
                    </span>
                  </div>

                  <div className="px-4 md:px-6 py-2 bg-slate-900/40 border-b border-slate-700/40 font-mono text-[11px] text-slate-500 flex items-center gap-2 flex-wrap">
                    <Tag size={12} className="text-slate-600" />
                    {testimonials[currentReview].meta.map((m, i) => (
                      <span key={i} className="text-cyan-400">
                        {m}{i < testimonials[currentReview].meta.length - 1 && <span className="text-slate-600 mx-1">·</span>}
                      </span>
                    ))}
                  </div>

                  <div className="p-4 md:p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 p-[2px] flex-shrink-0">
                        <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center font-bold text-sm md:text-base text-white">
                          {testimonials[currentReview].author.charAt(0)}
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-semibold text-white text-sm md:text-base">{testimonials[currentReview].author}</div>
                        <div className="font-mono text-[11px] md:text-xs text-cyan-400">{testimonials[currentReview].role}</div>
                        <div className="font-mono text-[10px] md:text-[11px] text-slate-500">{testimonials[currentReview].company}</div>
                      </div>
                    </div>

                    <div className="bg-slate-950/60 border-l-2 border-cyan-400 px-4 py-3 rounded-r text-[13px] md:text-sm text-slate-300 leading-relaxed italic">
                      "{testimonials[currentReview].review}"
                    </div>

                    <div className="mt-4 flex items-center justify-between flex-wrap gap-2">
                      <div className="font-mono text-[10px] md:text-[11px] text-slate-500 flex items-center gap-1.5">
                        <Check size={11} className="text-green-400" />
                        Verified engagement
                      </div>
                      <div className="font-mono text-[10px] text-slate-600 flex items-center gap-1">
                        <Clock size={10} />
                        {currentReview + 1} of {testimonials.length}
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setCurrentReview((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-12 w-9 h-9 md:w-10 md:h-10 rounded-full glass border border-slate-600 hover:border-cyan-400 hover:text-cyan-400 text-slate-300 flex items-center justify-center transition-all hover:-translate-x-3 md:hover:-translate-x-14"
                  aria-label="Previous review"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() => setCurrentReview((prev) => (prev + 1) % testimonials.length)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-12 w-9 h-9 md:w-10 md:h-10 rounded-full glass border border-slate-600 hover:border-cyan-400 hover:text-cyan-400 text-slate-300 flex items-center justify-center transition-all hover:translate-x-3 md:hover:translate-x-14"
                  aria-label="Next review"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              <div className="flex justify-center gap-2 mt-6">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentReview(i)}
                    className={`h-2 rounded-full transition-all ${
                      i === currentReview ? 'w-8 bg-cyan-400' : 'w-2 bg-slate-700 hover:bg-slate-600'
                    }`}
                    aria-label={`Go to review ${i + 1}`}
                  />
                ))}
              </div>

              <p className="text-center font-mono text-[10px] text-slate-600 mt-4">
                {autoplayPaused ? 'Paused — hover off to resume' : 'Auto-rotating every 6 seconds'}
              </p>
            </div>
          </FadeIn>
        </AnimatedSection>

        {/* ============= FAQ ============= */}
        <AnimatedSection id="faq" tag="Frequently Asked" icon={<HelpCircle />} number="12">
          <FadeIn>
            <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-3 text-center">
              Common <span className="gradient-text">questions.</span>
            </h2>
            <p className="text-slate-400 text-base md:text-lg max-w-3xl mx-auto mb-10 text-center">
              The questions every client asks me. Pre-answered so you do not have to.
            </p>
          </FadeIn>

          <div className="max-w-4xl mx-auto space-y-3">
            {[
              {
                q: 'How long until I see SEO results?',
                a: 'Technical wins like PageSpeed, schema, and indexability show up within one to four weeks. Ranking improvements typically take three to six months depending on competition, domain authority, and content depth. Anyone promising "page 1 in 30 days" is selling you something. I tell you the honest timeline upfront and report progress monthly.',
                tag: 'Timeline'
              },
              {
                q: 'Do you work fixed-price, hourly, or retainer?',
                a: 'All three. One-time audits run fixed-price. Hourly works for spot consulting and ad-hoc optimisation. Monthly retainer is best for ongoing SEO — typically 20-40 hours per month covering content optimisation, technical maintenance, position tracking, and monthly reporting.',
                tag: 'Pricing'
              },
              {
                q: 'How do you measure SEO success?',
                a: 'Real metrics, not vanity ones. Position tracking for target keywords. Organic traffic via Search Console and Analytics. Click-through rate improvements. Core Web Vitals scores. Schema validation. Indexability rate. Backlink profile growth. Every month I send a Looker Studio dashboard with the data — no fluff, no hand-waving.',
                tag: 'Reporting'
              },
              {
                q: 'Do you guarantee rankings?',
                a: 'No, and you should be sceptical of anyone who does. Google\'s algorithm changes constantly, competitors move, and search intent shifts. What I guarantee is rigorous technical work, smart content strategy, and transparent reporting. The combination produces results — but exact positions on specific dates? Nobody can honestly promise that.',
                tag: 'Guarantees'
              },
              {
                q: 'What is your availability for US time zones?',
                a: 'I work USA business hours from Multan, Pakistan — currently doing this at Creative Chaos since September 2023. Comfortable with EST, CST, MST, and PST. Daily overlap of four to six hours is normal. For meetings, I typically have slots between 8am and 2pm EST.',
                tag: 'Timezone'
              },
              {
                q: 'Can you handle Local SEO for multi-location businesses?',
                a: 'Yes — that is exactly what I built for Liberty Power Wash. Seven location pages across Ohio and Kentucky, each tuned to Rank Math 79/100 with 948+ words of geo-targeted content. Plus GMB optimisation, NAP consistency, and local citation building. Happy to walk you through the full playbook.',
                tag: 'Local SEO'
              },
              {
                q: 'Do you write content, or just optimise it?',
                a: 'I write content briefs covering keyword targets, structure, internal linking plan, and schema requirements. I can either write the content myself or work with your writers. For long-form pillar content, my briefs include word count targets, heading structure, target featured snippet format, and competitor analysis.',
                tag: 'Content'
              },
              {
                q: 'What happens if rankings drop after a Google update?',
                a: 'Core updates happen. When they do, I run a diagnostic to identify what changed — content quality, technical issues, E-E-A-T signals, backlink profile. We then build a recovery plan based on what Google has communicated and what the data shows. This is included as part of monthly retainers.',
                tag: 'Updates'
              },
            ].map((faq, i) => (
              <FadeIn key={i} delay={i * 50}>
                <div
                  className={`glass rounded-xl overflow-hidden transition-all cursor-pointer ${openFaq === i ? 'border-cyan-400/40' : 'hover:border-cyan-400/20'}`}
                  onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                >
                  <div className="p-5 flex items-start gap-3">
                    <div className={`flex-shrink-0 w-7 h-7 rounded-md flex items-center justify-center transition-all ${openFaq === i ? 'bg-cyan-400/20 text-cyan-400 rotate-90' : 'bg-slate-800/60 text-slate-500'}`}>
                      <ChevronRight size={14} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 flex-wrap">
                        <h3 className="font-semibold text-white text-sm md:text-[15px] leading-snug">{faq.q}</h3>
                        <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-slate-900/80 border border-slate-700/60 text-slate-400 flex-shrink-0">{faq.tag}</span>
                      </div>
                      {openFaq === i && (
                        <p className="text-sm text-slate-300 leading-relaxed mt-3">{faq.a}</p>
                      )}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={500}>
            <div className="text-center mt-10">
              <p className="font-mono text-sm text-slate-400 mb-4">
                Did not see your question? Ask me directly.
              </p>
              <a href="mailto:raza@rawdigit.com" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-medium text-sm hover:shadow-xl hover:shadow-cyan-500/30 transition-all hover:-translate-y-0.5">
                <Mail size={14} /> Email me
                <ArrowUpRight size={12} />
              </a>
            </div>
          </FadeIn>
        </AnimatedSection>

        {/* ============= NOW ============= */}
        <AnimatedSection id="now" tag="What I'm Doing Now" icon={<Activity />} number="13">
          <FadeIn>
            <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-3 text-center">
              What I'm <span className="gradient-text">up to.</span>
            </h2>
            <p className="text-slate-400 text-base md:text-lg max-w-3xl mx-auto mb-10 text-center">
              The human behind the rankings. Updated regularly — last edited this week.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">

            <FadeIn delay={100}>
              <div className="glass rounded-xl p-5 hover:-translate-y-1 h-full relative overflow-hidden group">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-transparent" />
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center">
                    <Wrench size={16} className="text-cyan-400" />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] text-cyan-400 uppercase tracking-wider">Currently Optimising</div>
                    <div className="text-white font-semibold text-sm">This week's focus</div>
                  </div>
                </div>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-start gap-2 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0"></span>
                    Wrapping the Christmas Lighting page error resolution
                  </li>
                  <li className="flex items-start gap-2 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0"></span>
                    Monthly Search Console reports for Q2 clients
                  </li>
                  <li className="flex items-start gap-2 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0"></span>
                    Refining this portfolio (the one you are on)
                  </li>
                </ul>
              </div>
            </FadeIn>

            <FadeIn delay={200}>
              <div className="glass rounded-xl p-5 hover:-translate-y-1 h-full relative overflow-hidden group">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-400 to-transparent" />
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-purple-400/10 border border-purple-400/30 flex items-center justify-center">
                    <BookOpen size={16} className="text-purple-400" />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] text-purple-400 uppercase tracking-wider">Reading</div>
                    <div className="text-white font-semibold text-sm">In my queue</div>
                  </div>
                </div>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-start gap-2 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 flex-shrink-0"></span>
                    Google Search Central blog (daily)
                  </li>
                  <li className="flex items-start gap-2 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 flex-shrink-0"></span>
                    Aleyda Solis SEO Newsletter
                  </li>
                  <li className="flex items-start gap-2 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 flex-shrink-0"></span>
                    Ahrefs case study deep-dives
                  </li>
                </ul>
              </div>
            </FadeIn>

            <FadeIn delay={300}>
              <div className="glass rounded-xl p-5 hover:-translate-y-1 h-full relative overflow-hidden group">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-400 to-transparent" />
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-pink-400/10 border border-pink-400/30 flex items-center justify-center">
                    <Headphones size={16} className="text-pink-400" />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] text-pink-400 uppercase tracking-wider">Audit Playlist</div>
                    <div className="text-white font-semibold text-sm flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                      What's on rotation
                    </div>
                  </div>
                </div>
                <div className="space-y-2 text-xs">
                  {[
                    { genre: 'Lo-fi instrumental', for: 'audit work blocks' },
                    { genre: 'Sufi devotional', for: 'long content briefs' },
                    { genre: 'Ambient electronic', for: 'CWV diagnosis' },
                    { genre: 'Quran recitation', for: 'morning focus' },
                  ].map((track, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-2 leading-relaxed transition-all ${nowPlayingIndex === i ? 'text-pink-400 font-medium' : 'text-slate-400'}`}
                    >
                      <PlayCircle size={11} className={nowPlayingIndex === i ? 'text-pink-400' : 'text-slate-600'} />
                      <span>{track.genre}</span>
                      <span className="text-slate-600 italic text-[10px]">— {track.for}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={400}>
              <div className="glass rounded-xl p-5 hover:-translate-y-1 h-full relative overflow-hidden group">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-400 to-transparent" />
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-yellow-400/10 border border-yellow-400/30 flex items-center justify-center">
                    <Smile size={16} className="text-yellow-400" />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] text-yellow-400 uppercase tracking-wider">Off-Hours</div>
                    <div className="text-white font-semibold text-sm">When I am not auditing</div>
                  </div>
                </div>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-start gap-2 leading-relaxed">
                    <Coffee size={11} className="text-yellow-400 mt-0.5 flex-shrink-0" />
                    Drinking dangerous amounts of chai
                  </li>
                  <li className="flex items-start gap-2 leading-relaxed">
                    <BookOpen size={11} className="text-yellow-400 mt-0.5 flex-shrink-0" />
                    Reading whenever I get the chance
                  </li>
                  <li className="flex items-start gap-2 leading-relaxed">
                    <Music size={11} className="text-yellow-400 mt-0.5 flex-shrink-0" />
                    Learning a musical instrument slowly
                  </li>
                  <li className="flex items-start gap-2 leading-relaxed">
                    <Compass size={11} className="text-yellow-400 mt-0.5 flex-shrink-0" />
                    Hiking and camping in the Punjab hills
                  </li>
                </ul>
              </div>
            </FadeIn>

            <FadeIn delay={500}>
              <div className="glass rounded-xl p-5 hover:-translate-y-1 h-full relative overflow-hidden group">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-400 to-transparent" />
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-green-400/10 border border-green-400/30 flex items-center justify-center">
                    <Users size={16} className="text-green-400" />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] text-green-400 uppercase tracking-wider">Community</div>
                    <div className="text-white font-semibold text-sm">SEO communities</div>
                  </div>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  Active in SEO communities, learning from practitioners shipping at scale, sharing tactics that worked (and the ones that did not).
                </p>
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="bg-slate-900/60 border border-slate-700/40 rounded-md p-2">
                    <div className="font-display text-base font-bold gradient-text">3+</div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider">Years</div>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-700/40 rounded-md p-2">
                    <div className="font-display text-base font-bold gradient-text">3</div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider">Countries</div>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={600}>
              <div className="glass rounded-xl p-5 hover:-translate-y-1 h-full relative overflow-hidden group">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-400 to-transparent" />
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-orange-400/10 border border-orange-400/30 flex items-center justify-center">
                    <Pen size={16} className="text-orange-400" />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] text-orange-400 uppercase tracking-wider">Writing Soon</div>
                    <div className="text-white font-semibold text-sm">SEO blog (in progress)</div>
                  </div>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed mb-2">
                  Planning a series of practical SEO write-ups from real client work:
                </p>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  <li className="flex items-start gap-2 leading-relaxed">
                    <ChevronRight size={11} className="text-orange-400 mt-0.5 flex-shrink-0" />
                    How I took mobile PageSpeed from 13 to 73
                  </li>
                  <li className="flex items-start gap-2 leading-relaxed">
                    <ChevronRight size={11} className="text-orange-400 mt-0.5 flex-shrink-0" />
                    Multi-location SEO architecture that scales
                  </li>
                  <li className="flex items-start gap-2 leading-relaxed">
                    <ChevronRight size={11} className="text-orange-400 mt-0.5 flex-shrink-0" />
                    Schema implementation: the four I always start with
                  </li>
                </ul>
              </div>
            </FadeIn>

            <FadeIn delay={700}>
              <div className="glass rounded-xl p-5 hover:-translate-y-1 h-full relative overflow-hidden group">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-transparent" />
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center">
                    <Brain size={16} className="text-cyan-400" />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] text-cyan-400 uppercase tracking-wider">Side Projects</div>
                    <div className="text-white font-semibold text-sm">Vibe coding and C++ practice</div>
                  </div>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  <li className="flex items-start gap-2 leading-relaxed">
                    <ChevronRight size={11} className="text-cyan-400 mt-0.5 flex-shrink-0" />
                    CPF Generator — valid Brazilian CPF test-number tool with bulk generation, state selection, and one-click copy
                  </li>
                  <li className="flex items-start gap-2 leading-relaxed">
                    <ChevronRight size={11} className="text-cyan-400 mt-0.5 flex-shrink-0" />
                    Battery Clean Pro — desktop utility app for battery optimisation and system cleanup
                  </li>
                  <li className="flex items-start gap-2 leading-relaxed">
                    <ChevronRight size={11} className="text-cyan-400 mt-0.5 flex-shrink-0" />
                    C++ projects — Car Trading Simulator plus Stone, Paper & Scissors with replay and feedback flow
                  </li>
                  <li className="flex items-start gap-2 leading-relaxed">
                    <ChevronRight size={11} className="text-cyan-400 mt-0.5 flex-shrink-0" />
                    AI-assisted workflow using Claude, ChatGPT, and Replit
                  </li>
                </ul>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={800}>
            <div className="text-center mt-8">
              <span className="inline-flex items-center gap-2 font-mono text-xs text-slate-500 px-4 py-2 rounded-full border border-slate-800 bg-slate-900/40">
                <Calendar size={11} />
                Last updated this week
              </span>
            </div>
          </FadeIn>
        </AnimatedSection>

        {/* ============= CONTACT ============= */}
        <section id="contact" className="relative flex flex-col items-center justify-center px-4 sm:px-6 md:px-12 py-16 md:py-20 overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />

          <FadeIn>
            <div className="relative z-10 text-center max-w-3xl">
              <div className="font-mono text-cyan-400 text-sm mb-3 flex items-center justify-center gap-2"><Send size={14} /> Get in touch</div>
              <h2 className="font-display text-5xl md:text-7xl font-black leading-tight tracking-tight mb-5">
                Let's rank <span className="gradient-text">your site.</span>
              </h2>
              <p className="text-base md:text-lg text-slate-400 mb-10 max-w-xl mx-auto">
                Open to SEO engagements, working USA timezones from Multan, Pakistan. If you are hiring and the project looks interesting, I would love to chat. No copy-paste recruiter pitches, please.
              </p>

              <div className="flex flex-wrap gap-3 justify-center mb-10">
                <a href="mailto:raza@rawdigit.com" className="font-mono text-sm px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:shadow-lg hover:shadow-cyan-500/40 transition-all hover:-translate-y-0.5 flex items-center gap-2">
                  <Mail size={14} /> raza@rawdigit.com
                </a>
                <button onClick={handlePrint} className="font-mono text-sm px-6 py-3 rounded-lg border border-cyan-400/40 text-cyan-400 hover:bg-cyan-400/10 transition-all hover:-translate-y-0.5 flex items-center gap-2">
                  <Download size={14} /> Download Resume (PDF)
                </button>
                <a href="tel:+923037240087" className="font-mono text-sm px-6 py-3 rounded-lg border border-cyan-400/40 text-cyan-400 hover:bg-cyan-400/10 transition-all hover:-translate-y-0.5 flex items-center gap-2">
                  <Phone size={14} /> +92 303 7240087
                </a>
                <a href="https://raza.rawdigit.com" target="_blank" rel="noopener noreferrer" className="font-mono text-sm px-6 py-3 rounded-lg border border-slate-600 text-slate-300 hover:border-cyan-400 hover:text-cyan-400 transition-all hover:-translate-y-0.5 flex items-center gap-2">
                  <Globe size={14} /> raza.rawdigit.com
                </a>
                <a href="https://fab-clinic.co.uk" target="_blank" rel="noopener noreferrer" className="font-mono text-sm px-6 py-3 rounded-lg border border-purple-500/40 text-purple-400 hover:bg-purple-500/10 transition-all hover:-translate-y-0.5 flex items-center gap-2">
                  <Gauge size={14} /> See FAB Clinic case
                </a>
              </div>

              <div className="font-mono text-xs text-slate-500 space-y-1.5 mb-8">
                <div className="flex items-center justify-center gap-2 flex-wrap">
                  <GraduationCap size={14} className="text-purple-400" />
                  <span>MS Computer Science · MNS University Multan · 2020-2024</span>
                </div>
                <div>
                  <span className="text-purple-400">Languages</span> · English (fluent) · Urdu (native) · Saraiki (native)
                </div>
              </div>

              <div className="inline-flex items-center gap-2 font-mono text-xs text-slate-500 px-4 py-2 rounded-full border border-slate-800 bg-slate-900/40">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
                Status: available · Last audit: today
              </div>
            </div>
          </FadeIn>

          <div className="relative z-10 mt-16 font-mono text-[10px] text-slate-700 flex items-center gap-1">
            Built with React and Tailwind · <Heart size={10} className="text-pink-400 fill-pink-400" /> for Muhammad Raza
          </div>
        </section>
      </div>
    </div>
  );
}

// Reusable scroll-triggered fade animation
function FadeIn({ children, delay = 0, type = 'up' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  const transforms = {
    up: visible ? 'translateY(0)' : 'translateY(30px)',
    scale: visible ? 'scale(1)' : 'scale(0.95)',
    left: visible ? 'translateX(0)' : 'translateX(-30px)',
    right: visible ? 'translateX(0)' : 'translateX(30px)',
  };

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: transforms[type],
        transition: 'opacity 0.8s ease, transform 0.8s ease',
      }}
    >
      {children}
    </div>
  );
}

function AnimatedSection({ id, children, tag, icon, number }) {
  return (
    <section id={id} className="relative flex flex-col justify-center items-center px-4 sm:px-6 md:px-12 py-12 md:py-16">
      <div className="w-full max-w-7xl mx-auto">
        <FadeIn>
          <div className="text-center mb-2">
            <div className="font-mono text-xs text-slate-700 tracking-widest mb-2">— {number} —</div>
            <div className="font-mono text-sm text-cyan-400 mb-2 flex items-center gap-2 justify-center uppercase tracking-widest">
              {icon && <span className="opacity-60">{icon}</span>}
              {tag}
            </div>
          </div>
        </FadeIn>
        {children}
      </div>
    </section>
  );
}
