/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  Phone, 
  MapPin, 
  GraduationCap, 
  Star, 
  Menu,
  X,
  ExternalLink,
  ArrowUpRight,
  Award,
  TrendingUp,
  Maximize2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';

// --- Constants & Config ---

const COLLEGE_INFO = {
  name: "National Composite Pre University College",
  shortName: "NCPUC",
  location: "Hosapete, Karnataka 583203",
  address: "7939+WP5, Hosapete, Karnataka 583203",
  phone: "083942 30445",
  whatsapp: "918394230445",
  rating: 4.01,
  reviewCount: 111,
  coordinates: { lat: 15.2750, lng: 76.3889 },
  established: "1998"
};

const REVIEWS = [
  {
    author: "Prakash Sonnad",
    text: "Good Environment., I like the place, it's good 👍👍",
    rating: 5
  },
  {
    author: "Spandana Gangur",
    text: "There is canteen and bus facility and it is good.",
    rating: 5
  }
];

const API_KEY = process.env.GOOGLE_MAPS_PLATFORM_KEY || '';
const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY';

// --- SVG Icons ---

function WhatsAppIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 448 512" 
      fill="currentColor" 
      className={className}
    >
      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-117zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3 18.6-68-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
    </svg>
  );
}

// --- Components ---

function FloatingWhatsApp() {
  return (
    <motion.a
      href={`https://wa.me/${COLLEGE_INFO.whatsapp}?text=Hello, I would like to inquire about admissions.`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-8 right-8 z-[100] group w-16 h-16 bg-brand-whatsapp text-white rounded-full flex items-center justify-center shadow-2xl shadow-brand-whatsapp/40 cursor-pointer border-4 border-white"
      aria-label="Contact on WhatsApp"
    >
      <WhatsAppIcon className="w-8 h-8" />
      <span className="absolute -top-2 -right-2 flex h-4 w-4">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-whatsapp opacity-75"></span>
        <span className="absolute right-full mr-4 bg-white text-slate-800 px-4 py-2 rounded-xl border border-slate-100 shadow-xl text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden lg:block">
          Chat with us
        </span>
      </span>
    </motion.a>
  );
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="border-b border-white/10 bg-brand-navy sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between h-20 items-center">
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <img 
              src="logo.png" 
              alt="NCPUC Logo" 
              className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <span className="font-bold tracking-tight text-lg text-white">
              National Composite <span className="text-white/60 font-semibold tracking-normal">PUC</span>
            </span>
          </a>
          
            <div className="hidden md:flex space-x-8 text-sm font-bold uppercase tracking-wider text-white">
            <a href="#about" className="hover:text-brand-whatsapp transition-colors">About Us</a>
            <a href="#academics" className="hover:text-brand-whatsapp transition-colors">Academics</a>
            <a href="#performance" className="hover:text-brand-whatsapp transition-colors">Performance</a>
            <a href="#gallery" className="hover:text-brand-whatsapp transition-colors">Gallery</a>
            <a href="#contact" className="hover:text-brand-whatsapp transition-colors underline underline-offset-8 decoration-2">Contact</a>
          </div>

          <button 
            className="md:hidden p-2 text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-brand-navy border-b border-white/10"
          >
            <div className="px-6 py-8 space-y-6 text-sm font-bold uppercase tracking-wider text-center text-white">
              <a href="#about" onClick={() => setIsOpen(false)} className="block hover:text-brand-whatsapp">About Us</a>
              <a href="#academics" onClick={() => setIsOpen(false)} className="block hover:text-brand-whatsapp">Academics</a>
              <a href="#performance" onClick={() => setIsOpen(false)} className="block hover:text-brand-whatsapp">Performance</a>
              <a href="#gallery" onClick={() => setIsOpen(false)} className="block hover:text-brand-whatsapp">Gallery</a>
              <a href="#contact" onClick={() => setIsOpen(false)} className="block text-brand-whatsapp underline underline-offset-4">Contact</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function MapComponent() {
  const [mapError, setMapError] = useState<string | null>(null);

  if (!hasValidKey) {
    return (
      <div className="w-full h-full min-h-[400px] bg-brand-beige flex items-center justify-center p-8 border-2 border-dashed border-black/10 rounded-sm">
        <div className="max-w-md text-center space-y-6">
          <div className="w-16 h-16 bg-brand-navy/10 rounded-full flex items-center justify-center mx-auto">
            <MapPin className="w-8 h-8 text-brand-navy" />
          </div>
          <h2 className="text-2xl font-black tracking-tighter">Google Maps Key Required</h2>
          <div className="space-y-4 text-sm text-gray-600 text-left bg-white p-6 rounded-sm shadow-sm border border-black/5">
            <p><strong>To enable the map:</strong></p>
            <ol className="list-decimal list-inside space-y-2 leading-relaxed">
              <li>Open <strong>Settings</strong> (⚙️ gear icon, top-right)</li>
              <li>Select <strong>Secrets</strong></li>
              <li>Type <code>GOOGLE_MAPS_PLATFORM_KEY</code> as the name</li>
              <li>Paste your API key and press <strong>Enter</strong></li>
            </ol>
          </div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">The app will rebuild automatically after you add the secret.</p>
        </div>
      </div>
    );
  }

  if (mapError) {
    return (
      <div className="w-full h-full min-h-[400px] bg-red-50 flex items-center justify-center p-8 border-2 border-dashed border-red-200 rounded-sm">
        <div className="max-w-md text-center space-y-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <X className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-black tracking-tighter text-red-900">Map Configuration Error</h2>
          <div className="space-y-4 text-sm text-red-800 text-left bg-white p-6 rounded-sm shadow-sm border border-red-100">
            <p><strong>Common Fixes:</strong></p>
            <ul className="list-disc list-inside space-y-2 leading-relaxed">
              <li>Enable <strong>"Maps JavaScript API"</strong> in your <a href="https://console.cloud.google.com/google/maps-apis/api-list" target="_blank" className="underline font-bold">Google Cloud Console</a>.</li>
              <li>Check if your API key has restrictions (referrers or IP addresses) that block this domain.</li>
              <li>Wait 2-5 minutes if you just enabled the API.</li>
            </ul>
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="text-[10px] font-bold uppercase tracking-widest text-red-600 hover:text-red-800 underline"
          >
            Retry after enabling
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-[400px]">
      <APIProvider 
        apiKey={API_KEY} 
        version="weekly"
        onError={(err) => {
          console.error("Maps Load Error:", err);
          setMapError(String(err));
        }}
      >
        <Map
          defaultCenter={COLLEGE_INFO.coordinates}
          defaultZoom={15}
          mapId="DEMO_MAP_ID"
          internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
          style={{ width: '100%', height: '100%' }}
          disableDefaultUI={false}
        >
          <AdvancedMarker position={COLLEGE_INFO.coordinates}>
            <Pin background="#003366" glyphColor="#ffffff" borderColor="#003366" />
          </AdvancedMarker>
        </Map>
      </APIProvider>
    </div>
  );
}

const GALLERY_IMAGES = [
  { url: "WhatsApp Image 2026-06-05 at 3.41.31 PM.jpeg", title: "Campus Entrance" },
  { url: "WhatsApp Image 2026-06-05 at 3.44.33 PM.jpeg", title: "Distinguished Faculty & Staff" },
  { url: "WhatsApp Image 2026-06-05 at 3.50.40 PM.jpeg", title: "Academic Honors & Achievers Board" },
  { url: "WhatsApp Image 2026-06-05 at 3.51.19 PM.jpeg", title: "Toppers & Highlights" },
  { url: "Previous year-1.jpeg", title: "Board Honors & Records" },
  { url: "Untitled.png", title: "Campus Building Panoramic View" },
];

function Gallery() {
  return (
    <section id="gallery" className="py-24 bg-brand-beige px-6 lg:px-12 border-t border-black/5">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-[11px] uppercase tracking-[0.4em] font-black text-brand-navy mb-4">Gallery</h2>
          <h3 className="text-4xl font-black tracking-tighter leading-tight">Life at our Campus</h3>
        </div>
        
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {GALLERY_IMAGES.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="relative break-inside-avoid group cursor-pointer"
            >
              <div className="overflow-hidden rounded-sm border border-black/5 shadow-sm">
                <img 
                  src={img.url} 
                  alt={img.title}
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute inset-0 bg-brand-navy/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <p className="text-white font-bold text-xs uppercase tracking-widest">{img.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AcademicPerformance() {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <section id="performance" className="py-24 bg-white px-6 lg:px-12 border-t border-black/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          {/* Text Content */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h2 className="text-[11px] uppercase tracking-[0.4em] font-black text-brand-navy mb-4">Academic Honors</h2>
              <h3 className="text-4xl lg:text-5xl font-black tracking-tighter leading-none text-brand-dark">
                Previous Year <br />
                <span className="text-brand-navy italic">Academic Performance</span>
              </h3>
            </div>
            
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              We celebrate the brilliant minds and high achievers who have set new milestones in the Karnataka PU Board examinations. Our students consistently secure outstanding scores and distinctions across Science, Commerce, and Arts streams.
            </p>

            <div className="space-y-4">
              <div className="flex gap-4 items-start pb-4 border-b border-black/5">
                <div className="w-10 h-10 bg-brand-navy/10 rounded-sm flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5 text-brand-navy" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm uppercase tracking-wider text-brand-dark">Centenary Achievements</h4>
                  <p className="text-xs text-gray-500">Perfect 100/100 scores in Physics, Chemistry, Mathematics, and Accountancy subjects.</p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-brand-navy/10 rounded-sm flex items-center justify-center shrink-0">
                  <TrendingUp className="w-5 h-5 text-brand-navy" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm uppercase tracking-wider text-brand-dark">Stream Ranks & Highlights</h4>
                  <p className="text-xs text-gray-500">Outstanding pass percentage and consecutive years of stellar distinction results.</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button 
                onClick={() => setIsZoomed(true)}
                className="inline-flex items-center space-x-2 bg-brand-navy text-white px-6 py-3.5 rounded-full font-bold uppercase text-[10px] tracking-widest hover:bg-brand-navy-light transition-all shadow-lg shadow-brand-navy/20 cursor-pointer"
              >
                <span>View Full Screen Topper Board</span>
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Interactive Image Frame */}
          <div className="lg:col-span-7">
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="relative rounded-sm overflow-hidden border border-black/15 shadow-2xl bg-brand-beige group cursor-pointer"
              onClick={() => setIsZoomed(true)}
            >
              <div className="aspect-[4/3] relative overflow-hidden flex items-center justify-center bg-gray-50 p-2">
                <img 
                  src="Previous year.jpeg" 
                  alt="Previous Year Academic Performance" 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
                
                {/* Overlay Hint */}
                <div className="absolute inset-0 bg-brand-navy/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white space-y-2">
                  <Maximize2 className="w-8 h-8 text-white animate-pulse" />
                  <span className="font-black tracking-widest text-xs uppercase">Click to Zoom Board</span>
                </div>
              </div>
              
              <div className="p-4 bg-brand-beige border-t border-black/5 flex justify-between items-center text-xs">
                <span className="font-bold text-gray-500 uppercase tracking-widest">NCPUC Official Board Honors</span>
                <span className="text-brand-navy font-bold flex items-center gap-1 uppercase tracking-wider">
                  Enlarge Results <Maximize2 className="w-3 h-3" />
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Modern Lightbox Modal */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-[999] flex flex-col items-center justify-center p-4 lg:p-8"
            onClick={() => setIsZoomed(false)}
          >
            <motion.button 
              className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors p-3 rounded-full bg-white/10 hover:bg-white/20"
              onClick={() => setIsZoomed(false)}
            >
              <X className="w-8 h-8" />
            </motion.button>
            
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()} // Prevent close on clicking image container
              className="relative max-w-5xl max-h-[85vh] w-full h-full flex items-center justify-center"
            >
              <img 
                src="Previous year.jpeg" 
                alt="Previous Year Academic Performance Full Board" 
                className="max-w-full max-h-full object-contain rounded-sm shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            
            <p className="mt-4 text-xs text-white/65 uppercase tracking-widest font-bold">
              Press anywhere or click the X to close the board view
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function QuickEnquirySection() {
  return (
    <section id="quick-enquiry" className="py-20 bg-brand-beige px-6 lg:px-12 border-t border-b border-black/5">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-[11px] uppercase tracking-[0.4em] font-black text-brand-navy">Apply Now</h2>
          <h3 className="text-4xl font-black tracking-tighter text-brand-dark mb-2">Admission Enquiry Form</h3>
          <p className="text-gray-500 text-sm max-w-md mx-auto leading-relaxed">
            Fill in the details below to initiate your admission process. Our admissions desk will connect with you on WhatsApp or phone call within 24 hours.
          </p>
        </div>

        <div className="bg-[#F0F4F8] p-8 md:p-12 rounded-sm border border-brand-navy/10 shadow-2xl">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const name = formData.get('name');
              const mobile = formData.get('mobile');
              const course = formData.get('course');
              const message = formData.get('message');
              const text = `*New Admission Enquiry*%0A*Name:* ${name}%0A*Mobile:* ${mobile}%0A*Course:* ${course}%0A*Message:* ${message}`;
              window.open(`https://wa.me/${COLLEGE_INFO.whatsapp}?text=${text}`, '_blank');
            }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-[#003366]/70 mb-2">Student's Full Name</label>
                <input 
                  type="text" 
                  name="name" 
                  placeholder="e.g. Rahul Kumar" 
                  required 
                  className="w-full bg-white border border-brand-navy/15 rounded-sm px-6 py-4 text-sm font-medium focus:outline-none focus:border-brand-navy focus:ring-1 focus:ring-brand-navy transition-all placeholder:text-gray-400 text-brand-dark"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-[#003366]/70 mb-2">WhatsApp or Mobile Number</label>
                <input 
                  type="tel" 
                  name="mobile" 
                  placeholder="e.g. +91 9876543210" 
                  required 
                  className="w-full bg-white border border-brand-navy/15 rounded-sm px-6 py-4 text-sm font-medium focus:outline-none focus:border-brand-navy focus:ring-1 focus:ring-brand-navy transition-all placeholder:text-gray-400 text-brand-dark"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-[#003366]/70 mb-2">Preferred Stream / Program</label>
              <div className="relative">
                <select 
                  name="course" 
                  required 
                  className="w-full bg-white border border-brand-navy/15 rounded-sm px-6 py-4 text-sm font-medium focus:outline-none focus:border-brand-navy focus:ring-1 focus:ring-brand-navy transition-all text-brand-dark appearance-none"
                >
                  <option value="">Choose a Stream...</option>
                  <option value="Science (PCMB/PCMC)">Science (PCMB / PCMC)</option>
                  <option value="Commerce (CEBA/HEBA)">Commerce (CEBA / HEBA)</option>
                  <option value="Arts">Arts (HEPS)</option>
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400 text-xs">
                  ▼
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-[#003366]/70 mb-2">Specific Questions or Previous Marks (Optional)</label>
              <textarea 
                name="message" 
                placeholder="Mention SSLC / Class 10 marks percent, or any boarding/transport queries..." 
                rows={4} 
                className="w-full bg-white border border-brand-navy/15 rounded-sm px-6 py-4 text-sm font-medium focus:outline-none focus:border-brand-navy focus:ring-1 focus:ring-brand-navy transition-all placeholder:text-gray-400 text-brand-dark"
              ></textarea>
            </div>

            <div className="pt-4 flex justify-center">
              <button 
                type="submit"
                className="group flex items-center justify-between space-x-6 bg-brand-whatsapp hover:bg-brand-whatsapp-dark text-white px-10 py-5 rounded-full transition-all shadow-xl shadow-brand-whatsapp/20 cursor-pointer font-black tracking-widest uppercase text-xs"
              >
                <span>Submit Form via WhatsApp</span>
                <WhatsAppIcon className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      <FloatingWhatsApp />

      <main className="flex-1">
        {/* Restructured Hero Section - Image Removed */}
        <section id="hero" className="border-b border-black/5 bg-brand-beige py-24 md:py-32 lg:py-40 px-6 lg:px-12 flex items-center justify-center min-h-[60vh]">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <motion.p 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-[11px] uppercase tracking-[0.4em] font-extrabold text-brand-navy/60"
            >
              Excellence in Education since {COLLEGE_INFO.established}
            </motion.p>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] text-brand-dark"
            >
              Nurturing <br/>
              <span className="text-brand-navy italic">Ambitions</span> <br/>
              in Hosapete.
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto leading-relaxed"
            >
              Providing a superior learning environment with dedicated faculty and modern infrastructure for pre-university students in Karnataka.
            </motion.p>

            <div className="pt-8 flex justify-center gap-4 flex-wrap">
              <a 
                href="#quick-enquiry" 
                className="inline-flex items-center space-x-4 bg-brand-navy text-white px-8 py-4 rounded-full font-black uppercase text-xs tracking-widest hover:bg-brand-navy-light transition-all shadow-xl shadow-brand-navy/20"
              >
                <span>Inquire Now</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <a 
                href="#about" 
                className="inline-flex items-center space-x-4 border-2 border-brand-navy/20 text-brand-navy hover:bg-brand-navy/5 px-8 py-4 rounded-full font-black uppercase text-xs tracking-widest transition-all"
              >
                <span>Learn About Us</span>
              </a>
            </div>
          </div>
        </section>

        <AcademicPerformance />

        <QuickEnquirySection />

        {/* About Us Section */}
        <section id="about" className="py-24 bg-white px-6 lg:px-12 border-b border-black/5">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-[11px] uppercase tracking-[0.4em] font-black text-brand-navy mb-4">Our Institution</h2>
                  <h3 className="text-5xl font-black tracking-tighter leading-tight">About Us</h3>
                </div>
                <p className="text-xl text-gray-700 leading-relaxed font-medium">
                  Established in {COLLEGE_INFO.established}, National Composite Pre University College has been a beacon of academic excellence in Hosapete for over two decades.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  We believe that education is the most powerful tool for individual transformation and societal progress. Our institution is dedicated to creating a holistic learning environment that goes beyond textbooks, fostering creativity, leadership, and ethical values in every student.
                </p>
                <div className="grid md:grid-cols-2 gap-12 pt-10 text-left">
                  <div className="bg-brand-beige p-8 rounded-sm shadow-sm border border-black/5">
                    <div className="text-3xl font-black text-brand-navy mb-3 tracking-tighter">Vision</div>
                    <p className="text-xs text-gray-500 leading-relaxed uppercase tracking-wider font-bold">To empower students to become global leaders through quality education and innovative thinking.</p>
                  </div>
                  <div className="bg-brand-beige p-8 rounded-sm shadow-sm border border-black/5">
                    <div className="text-3xl font-black text-brand-navy mb-3 tracking-tighter">Mission</div>
                    <p className="text-xs text-gray-500 leading-relaxed uppercase tracking-wider font-bold">Providing world-class infrastructure and dedicated mentorship to nurture future-ready scholars.</p>
                  </div>
                </div>
                
                <div className="pt-12 flex justify-center">
                   <div className="bg-brand-navy p-8 text-white shadow-xl rounded-sm inline-block">
                    <p className="text-5xl font-black tracking-tighter inline-block mr-3">25+</p>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 inline-block align-middle">Years of <br/>Academic Legacy</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <Gallery />

        {/* Academics Section */}
        <section id="academics" className="py-24 bg-brand-beige px-6 lg:px-12 border-t border-black/5">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row gap-16">
              <div className="md:w-1/3">
                <h2 className="text-[11px] uppercase tracking-[0.4em] font-black text-brand-navy mb-4">Academics</h2>
                <h3 className="text-4xl font-black tracking-tighter leading-tight">Focusing on Excellence.</h3>
              </div>
              <div className="md:w-2/3 space-y-8">
                <p className="text-xl text-gray-700 leading-relaxed">
                  Our curriculum is designed to push boundaries and foster critical thinking. We don't just teach subjects; we nurture the leaders of tomorrow.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                  <div>
                    <h4 className="font-black text-lg mb-4 border-b border-black/10 pb-2">Integrated Learning</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">Combining theoretical knowledge with practical applications to ensure deep understanding of core concepts.</p>
                  </div>
                  <div>
                    <h4 className="font-black text-lg mb-4 border-b border-black/10 pb-2">Competitive Edge</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">Special coaching for entrance exams and competitive rounds integrated into the daily schedule.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 bg-brand-navy text-white px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-20">
              <div>
                <h2 className="text-[11px] uppercase tracking-[0.4em] font-black text-white/40 mb-6">Contact Us</h2>
                <h3 className="text-5xl font-black tracking-tighter mb-8 italic">Get in touch.</h3>
                <p className="text-lg text-white/70 leading-relaxed max-w-md mb-12">
                  Have questions about admissions or our programs? Our team is here to help you navigate your educational journey.
                </p>

                <div className="space-y-10">
                   <div className="flex items-center space-x-6 group">
                      <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-brand-whatsapp transition-all">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-1">Admissions HotLine</p>
                        <p className="text-2xl font-black tracking-tighter">{COLLEGE_INFO.phone}</p>
                      </div>
                   </div>
                   <div className="flex items-center space-x-6">
                      <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-1">Visit Campus</p>
                        <p className="text-xl font-bold">{COLLEGE_INFO.address}</p>
                      </div>
                   </div>
                </div>
              </div>

              <div>
                <div className="bg-white/5 p-10 rounded-sm border border-white/10 shadow-2xl backdrop-blur-sm">
                  <h4 className="text-2xl font-black mb-8 tracking-tighter">Send an Enquiry</h4>
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      const formData = new FormData(e.currentTarget);
                      const name = formData.get('name');
                      const mobile = formData.get('mobile');
                      const course = formData.get('course');
                      const message = formData.get('message');
                      const text = `*New Enquiry*%0A*Name:* ${name}%0A*Mobile:* ${mobile}%0A*Course:* ${course}%0A*Message:* ${message}`;
                      window.open(`https://wa.me/${COLLEGE_INFO.whatsapp}?text=${text}`, '_blank');
                    }}
                    className="space-y-6"
                  >
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Full Name</label>
                      <input 
                        type="text" 
                        name="name" 
                        placeholder="John Doe" 
                        required 
                        className="w-full bg-white/5 border border-white/10 rounded-sm px-6 py-4 text-sm focus:outline-none focus:border-brand-whatsapp transition-colors placeholder:text-white/20"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Mobile Number</label>
                        <input 
                          type="tel" 
                          name="mobile" 
                          placeholder="+91 00000 00000" 
                          required 
                          className="w-full bg-white/5 border border-white/10 rounded-sm px-6 py-4 text-sm focus:outline-none focus:border-brand-whatsapp transition-colors placeholder:text-white/20"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Preferred Course</label>
                        <select 
                          name="course" 
                          required 
                          className="w-full bg-white/5 border border-white/10 rounded-sm px-6 py-4 text-sm focus:outline-none focus:border-brand-whatsapp transition-colors text-white/60 appearance-none"
                        >
                          <option value="" className="bg-brand-navy">Select Course</option>
                          <option value="Science" className="bg-brand-navy">Science</option>
                          <option value="Commerce" className="bg-brand-navy">Commerce</option>
                          <option value="Arts" className="bg-brand-navy">Arts</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Additional Message</label>
                      <textarea 
                        name="message" 
                        placeholder="Tell us about your interests..." 
                        rows={4} 
                        className="w-full bg-white/5 border border-white/10 rounded-sm px-6 py-4 text-sm focus:outline-none focus:border-brand-whatsapp transition-colors placeholder:text-white/20"
                      ></textarea>
                    </div>
                    <button 
                      type="submit"
                      className="w-full group flex items-center justify-between bg-brand-whatsapp hover:bg-brand-whatsapp-dark text-white px-10 py-5 rounded-full transition-all shadow-xl shadow-black/40"
                    >
                      <span className="font-black tracking-widest uppercase text-xs">Send via WhatsApp</span>
                      <WhatsAppIcon className="w-6 h-6" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Maps Section - Moved below contact */}
        <section id="maps" className="h-[600px] w-full border-t border-black/5 bg-gray-100">
           <MapComponent />
        </section>
      </main>

      {/* Footer Details */}
      <footer className="px-6 lg:px-12 py-12 bg-brand-navy text-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex space-x-8 text-[10px] uppercase tracking-[0.2em] font-black text-white/50">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Admissions 2026-27</a>
            <a href="#" className="hover:text-white transition-colors">Faculty Portal</a>
          </div>
          <p className="text-[10px] font-black uppercase tracking-widest text-white/30">
            © {new Date().getFullYear()} {COLLEGE_INFO.name}
          </p>
        </div>
      </footer>
    </div>
  );
}

