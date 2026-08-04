import React, { useMemo, useState } from "react";
import {
  Sparkles,
  BookOpen,
  ShieldCheck,
  Mail,
  Search,
  ChevronDown,
  Copy,
  Check,
  HelpCircle,
} from "lucide-react";
import BackButton from "@/components/BackButton";
import { getEnv } from "@/helpers/getEnv";

const FAQItem = ({ q, a, isOpen, onClick }) => (
  <div className="mb-3 border border-slate-200/80 rounded-xl overflow-hidden bg-white hover:border-indigo-200 hover:shadow-sm transition-all duration-200">
    <button
      onClick={onClick}
      className="w-full px-6 py-4.5 bg-gradient-to-r from-slate-50/80 to-indigo-50/30 hover:from-indigo-50/50 hover:to-indigo-50/70 flex justify-between items-center transition-all text-left group"
      aria-expanded={isOpen}
    >
      <h3 className="text-base sm:text-lg font-semibold text-slate-800 group-hover:text-indigo-950 pr-4">
        {q}
      </h3>
      <div
        className={`p-1.5 rounded-full bg-white border border-slate-200 text-indigo-600 transition-transform duration-300 shadow-sm flex-shrink-0 ${
          isOpen ? "rotate-180 bg-indigo-50 border-indigo-200" : ""
        }`}
      >
        <ChevronDown className="h-4 w-4" />
      </div>
    </button>
    {isOpen && (
      <div className="px-6 py-4 bg-white border-t border-slate-100 animate-fadeIn">
        <p className="text-slate-600 leading-relaxed text-sm sm:text-base">{a}</p>
      </div>
    )}
  </div>
);

export default function Help() {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [copied, setCopied] = useState(false);

  const supportEmail = useMemo(() => {
    return getEnv("VITE_EMAIL_USER") || "bloglekhak2629@gmail.com";
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(supportEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const faqs = useMemo(
    () => [
      {
        q: "How do I create a new blog post?",
        a: "Click the 'Write Blog' button in the top navigation bar, draft your content using our rich text editor, select an appropriate category, and click 'Publish'. Your drafts automatically save as you type if you're logged in.",
      },
      {
        q: "How can I edit or delete my published blogs?",
        a: "Navigate to 'My Blogs' from the sidebar menu, select the post you wish to manage, and click 'Edit' to update content or 'Delete' to remove it.",
      },
      {
        q: "How do I update my profile details and avatar?",
        a: "Click your profile avatar in the top header, select 'Profile', and click 'Edit Profile' to modify your display name, bio, or avatar image.",
      },
      {
        q: "How can I report inappropriate or abusive content?",
        a: `Click the Report (flag) icon on any blog post or comment, or email our moderation team directly at ${supportEmail}.`,
      },
      {
        q: "Which image formats and file sizes are supported?",
        a: "We support JPG, PNG, GIF, and WebP image formats with a maximum file size limit of 5MB per image upload.",
      },
      {
        q: "How do I search for specific blogs or authors?",
        a: "Use the search bar at the top of any page to find blogs by keywords, topic tags, titles, or author usernames.",
      },
      {
        q: "Can I schedule a blog post for future publication?",
        a: "Yes! When writing or editing a post, click 'Schedule' and choose your preferred publication date and time.",
      },
      {
        q: "How do I follow my favorite bloggers?",
        a: "Visit any blogger's profile page and click the 'Follow' button. Their latest published posts will automatically appear in your 'Following' feed.",
      },
      {
        q: "What should I do if I forget my password?",
        a: "Click 'Forgot Password' on the login screen, enter your registered email address, and enter the password reset code sent to your inbox.",
      },
      {
        q: "Can I export my published blogs?",
        a: "Yes! Open 'My Blogs', click the options menu (three dots) next to any post, and select 'Export' to download it as a PDF or Word document.",
      },
      {
        q: "How do I add tags to my blog posts?",
        a: "While writing or editing a post, enter relevant keywords in the 'Tags' section separated by commas to increase your article's discoverability.",
      },
      {
        q: "Can I make a blog post private?",
        a: "Yes. In your blog settings, toggle 'Private' mode so only you can view it. You can switch it back to public at any time.",
      },
      {
        q: "How do I comment on blog posts?",
        a: "Scroll down to the comments section beneath any post and share your thoughts. You must be signed in to post comments.",
      },
      {
        q: "What is the character limit for blog titles?",
        a: "Blog titles can be up to 200 characters long. We recommend keeping them catchy, concise, and descriptive.",
      },
      {
        q: "How can I view analytics for my blogs?",
        a: "Go to 'My Blogs' or your 'Analytics' dashboard to view real-time performance metrics, including total views, likes, and comments.",
      },
    ],
    [supportEmail]
  );

  const filteredFaqs = useMemo(() => {
    if (!searchQuery.trim()) return faqs;
    const query = searchQuery.toLowerCase();
    return faqs.filter(
      (faq) =>
        faq.q.toLowerCase().includes(query) ||
        faq.a.toLowerCase().includes(query)
    );
  }, [faqs, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50/50 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <BackButton className="mb-2" />

        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#FF6A00] via-[#FF5500] to-[#E55000] text-white px-6 sm:px-10 py-10 sm:py-12 shadow-xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/15 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-12 w-56 h-56 bg-orange-300/30 rounded-full blur-3xl translate-y-1/2 pointer-events-none" />

          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-4 max-w-2xl">
              <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-white/80 font-semibold">
                <Sparkles className="h-4 w-4" />
                Help Center
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight">
                How can we help you today?
              </h1>
              <p className="text-base sm:text-lg text-white/90 leading-relaxed">
                Explore quick guides, browse popular answers, or connect with our support team directly.
              </p>
              <div className="flex flex-wrap gap-3 pt-1 text-sm text-white/90">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-1.5 backdrop-blur-md text-xs font-medium">
                  <BookOpen className="h-3.5 w-3.5" />
                  Detailed FAQs
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-1.5 backdrop-blur-md text-xs font-medium">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  AI & Human Moderation
                </span>
              </div>
            </div>

            {/* Support Card */}
            <div className="rounded-2xl border border-white/30 bg-white/15 p-6 shadow-2xl backdrop-blur-md lg:w-[380px] flex-shrink-0 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.25em] text-white/80 font-bold">
                  Priority Support
                </p>
                <Mail className="h-5 w-5 text-white/80" />
              </div>

              <div className="space-y-1">
                <p className="text-xl sm:text-2xl font-bold text-white break-all tracking-tight">
                  {supportEmail}
                </p>
                <p className="text-xs text-white/75 font-medium">
                  Average response time: under 4 hours.
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <button
                  type="button"
                  onClick={() =>
                    window.open(
                      `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
                        supportEmail
                      )}&su=Lekhak Support Request`,
                      "_blank"
                    )
                  }
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-white text-orange-600 px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all hover:bg-orange-50 active:scale-95 shadow-md"
                >
                  <Mail className="h-4 w-4" />
                  Send Email
                </button>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/40 bg-white/10 px-3 py-2.5 text-xs font-semibold text-white transition-all hover:bg-white/20 active:scale-95"
                  title="Copy email address"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 text-green-300" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.3em] font-bold text-orange-600">
                Knowledge Base
              </p>
              <h2 className="text-2xl font-bold text-slate-900">
                Frequently Asked Questions
              </h2>
              <p className="text-sm text-slate-500">
                Quick answers to common questions about Lekhak.
              </p>
            </div>

            {/* FAQ Search */}
            <div className="relative min-w-[260px] sm:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-slate-800 placeholder-slate-400"
              />
            </div>
          </div>

          {/* FAQ List */}
          <div className="mt-6">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, i) => (
                <FAQItem
                  key={i}
                  q={faq.q}
                  a={faq.a}
                  isOpen={openIndex === i}
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                />
              ))
            ) : (
              <div className="text-center py-12 space-y-3 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
                <HelpCircle className="h-10 w-10 text-slate-400 mx-auto" />
                <p className="text-base font-semibold text-slate-700">
                  No matching questions found
                </p>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try searching with different keywords or contact support directly if you need assistance.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Still Need Help Footer Section */}
        <section className="rounded-3xl border border-dashed border-slate-300 bg-slate-100/60 p-8 text-center space-y-3">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400">
            Still Have Questions?
          </p>
          <p className="text-2xl font-bold text-slate-900">
            We are here to support your creative journey.
          </p>
          <p className="text-sm text-slate-600 max-w-lg mx-auto">
            If you couldn't find what you were looking for, reach out to our team at{" "}
            <a
              href={`mailto:${supportEmail}`}
              className="font-semibold text-orange-600 hover:underline"
            >
              {supportEmail}
            </a>
            .
          </p>
        </section>
      </div>

      <footer className="bg-slate-900 text-slate-400 py-6 px-4 text-center mt-12">
        <p className="text-xs font-medium">© 2025 Lekhak. All rights reserved.</p>
      </footer>
    </div>
  );
}