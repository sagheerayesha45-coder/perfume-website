"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { Mail, Phone, Send, Globe } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Variants definition for animation
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

export default function ContactPage() {
  const [form, setForm] = useState<FormData>({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      alert("Your message has been received.");
      setForm({ name: "", email: "", subject: "", message: "" });
      setIsSubmitting(false);
    }, 1500);
  };

  const contactInfo = [
    { icon: Globe, title: "Flagship Boutique", details: ["123 Luxury Avenue", "Manhattan, NY 10001"] },
    { icon: Phone, title: "Private Concierge", details: ["+1 (800) AURA-LUXE", "Available 24/7"] },
    { icon: Mail, title: "Digital Inquiries", details: ["concierge@aura.com", "press@aura.com"] },
  ];

  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-hidden">
      {/* Ab error nahi aayega */}
      <Navbar /> 
      
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[120px] -z-10" />

      <div className="pt-40 pb-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-20"
          >
            <span className="text-[#D4AF37] text-[10px] tracking-[0.8em] uppercase font-bold block mb-4">Liaison</span>
            <h1 className="text-6xl md:text-8xl font-serif italic">Get in <span className="text-white/20 not-italic">Touch</span></h1>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            <div className="lg:col-span-5 space-y-16">
              {contactInfo.map((item, i) => (
                <div key={i} className="group">
                  <div className="flex items-center gap-6 mb-4">
                    <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center">
                      <item.icon className="text-[#D4AF37] w-5 h-5" />
                    </div>
                    <h3 className="text-sm uppercase tracking-[0.3em] font-bold">{item.title}</h3>
                  </div>
                  <div className="pl-18 space-y-1">
                    {item.details.map((text, idx) => (
                      <p key={idx} className="text-gray-500 font-light text-lg">{text}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="lg:col-span-7 bg-white/[0.03] border border-white/10 rounded-[2rem] p-8 md:p-12"
            >
              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="relative">
                  <input type="text" required value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} className="w-full bg-transparent border-b border-white/10 py-4 text-sm focus:outline-none focus:border-[#D4AF37]" placeholder="Full Name" />
                </div>
                <div className="relative">
                  <input type="email" required value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} className="w-full bg-transparent border-b border-white/10 py-4 text-sm focus:outline-none focus:border-[#D4AF37]" placeholder="Email Address" />
                </div>
                <button disabled={isSubmitting} className="flex items-center gap-4 text-[10px] uppercase font-bold hover:text-[#D4AF37]">
                  {isSubmitting ? "Sending..." : "Send Message"}
                  <Send size={14} />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}