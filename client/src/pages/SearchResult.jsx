import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";
import { Sparkles, Tag, Search, Compass, BookOpen } from 'lucide-react';
import BlogCard from '@/components/BlogCard';
import BackButton from '@/components/BackButton';
import Loading from '@/components/Loading';
import { getEnv } from '@/helpers/getEnv';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { RouteProfileView } from '@/helpers/RouteName';
import { getDisplayName } from '@/utils/functions';

const SearchResult = () => {
  const [searchParams] = useSearchParams();
  const rawQuery = searchParams.get('q') || '';
  const q = rawQuery.trim();
  const hasQuery = q.length > 0;

  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // AI Smart Overview State
  const [aiOverview, setAiOverview] = useState('');
  const [relatedTopics, setRelatedTopics] = useState([]);
  const [aiLoading, setAiLoading] = useState(false);

  const blogEndpoint = useMemo(() => {
    if (!hasQuery) return '';
    const encoded = encodeURIComponent(q);
    return `${getEnv('VITE_API_BASE_URL')}/blog/search?q=${encoded}`;
  }, [hasQuery, q]);

  const userEndpoint = useMemo(() => {
    if (!hasQuery) return '';
    const encoded = encodeURIComponent(q);
    return `${getEnv('VITE_API_BASE_URL')}/user/search?query=${encoded}`;
  }, [hasQuery, q]);

  const smartAiEndpoint = useMemo(() => {
    if (!hasQuery) return '';
    const encoded = encodeURIComponent(q);
    return `${getEnv('VITE_API_BASE_URL')}/blog/smart-search?q=${encoded}`;
  }, [hasQuery, q]);

  useEffect(() => {
    if (!hasQuery) {
      setBlogs([]);
      setAuthors([]);
      setAiOverview('');
      setRelatedTopics([]);
      setLoading(false);
      setError('');
      return undefined;
    }

    const controller = new AbortController();

    const fetchResults = async () => {
      try {
        setLoading(true);
        setAiLoading(true);
        setError('');

        const [blogResponse, userResponse] = await Promise.all([
          fetch(blogEndpoint, {
            method: 'GET',
            credentials: 'include',
            signal: controller.signal,
          }),
          fetch(userEndpoint, {
            method: 'GET',
            credentials: 'include',
            signal: controller.signal,
          })
        ]);

        if (!blogResponse.ok) {
          const body = await blogResponse.json().catch(() => ({}));
          throw new Error(body?.message || 'Failed to load blog results.');
        }

        const blogData = await blogResponse.json();
        const userData = userResponse.ok ? await userResponse.json() : { users: [] };

        setBlogs(Array.isArray(blogData?.blog) ? blogData.blog : []);
        const blogAuthors = Array.isArray(blogData?.authors) ? blogData.authors : [];
        const usernameMatches = Array.isArray(userData?.users) ? userData.users : [];
        
        // Combine and deduplicate authors
        const authorMap = new Map();
        [...blogAuthors, ...usernameMatches].forEach(author => {
          if (author?._id) {
            authorMap.set(author._id, author);
          }
        });
        setAuthors(Array.from(authorMap.values()));
      } catch (err) {
        if (err.name === 'AbortError') return;
        setError(err.message || 'Failed to load search results.');
        setBlogs([]);
        setAuthors([]);
      } finally {
        setLoading(false);
      }
    };

    const fetchSmartAiOverview = async () => {
      try {
        setAiLoading(true);
        const response = await fetch(smartAiEndpoint, {
          method: 'GET',
          credentials: 'include',
          signal: controller.signal,
        });

        if (response.ok) {
          const aiData = await response.json();
          setAiOverview(aiData.overview || '');
          setRelatedTopics(Array.isArray(aiData.relatedTopics) ? aiData.relatedTopics : []);
        }
      } catch (err) {
        if (err.name === 'AbortError') return;
        console.error('Smart AI fetch error:', err);
      } finally {
        setAiLoading(false);
      }
    };

    fetchResults();
    fetchSmartAiOverview();

    return () => controller.abort();
  }, [blogEndpoint, userEndpoint, smartAiEndpoint, hasQuery]);

  const handleTopicClick = (topic) => {
    if (topic) {
      navigate(`/search?q=${encodeURIComponent(topic)}`);
    }
  };

  if (!hasQuery) {
    return (
      <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
        Enter a search term above to find blogs and authors.
      </div>
    );
  }

  if (loading && !blogs.length && !authors.length) {
    return <Loading />;
  }

  if (error) {
    return <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">{error}</div>;
  }

  return (
    <div className="mx-auto flex max-w-6xl flex-col space-y-10 px-4 py-10 text-slate-900 sm:px-8 lg:px-12">
      <BackButton className="mb-4" />
      
      {/* Header Banner */}
      <section className="relative overflow-hidden rounded-4xl bg-gradient-to-r bg-gradient-primary px-6 py-10 text-white shadow-[0_35px_80px_-45px_rgba(255,106,0,0.45)] sm:px-10">
        <div className="absolute inset-y-0 right-0 h-full w-64 translate-x-1/3 rounded-full bg-white/15 blur-3xl pointer-events-none" />
        <div className="relative space-y-4 z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold uppercase tracking-wide">
            <Compass className="w-3.5 h-3.5" /> Intelligent Search
          </div>
          <h2 className="text-3xl font-black leading-tight sm:text-4xl">
            Search Results{hasQuery ? ` for “${q}”` : ''}
          </h2>
          <p className="max-w-2xl text-sm text-white/90 sm:text-base font-medium">
            Explore matching topics, creators, and articles. Tapping related keywords generates targeted insights.
          </p>
          {(authors.length > 0 || blogs.length > 0) ? (
            <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.35em] text-white/90 font-medium">
              {authors.length > 0 && (
                <span className="rounded-full border border-white/30 bg-white/15 px-4 py-1.5 backdrop-blur-sm">
                  {authors.length} author{authors.length !== 1 ? 's' : ''}
                </span>
              )}
              {blogs.length > 0 && (
                <span className="rounded-full border border-white/30 bg-white/15 px-4 py-1.5 backdrop-blur-sm">
                  {blogs.length} blog{blogs.length !== 1 ? 's' : ''}
                </span>
              )}
            </div>
          ) : null}
        </div>
      </section>

      {/* SECTION 1: AI SMART OVERVIEW & RELATED TOPICS */}
      <section className="relative overflow-hidden space-y-5 rounded-4xl border border-orange-100/90 bg-white p-6 sm:p-8 shadow-[0_20px_50px_-30px_rgba(255,106,0,0.15)] transition-all">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-orange-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-50 text-[#FF6A00] flex items-center justify-center font-bold shadow-inner">
              <Sparkles className="h-5 w-5 animate-pulse text-[#FF6A00]" />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.35em] text-orange-500 font-bold">AI Intelligence</p>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-800">Smart Search Overview</h3>
            </div>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-orange-50 text-orange-600 border border-orange-200">
            Powered by Gemini AI
          </span>
        </div>

        {/* AI Synthesis Content */}
        {aiLoading ? (
          <div className="space-y-3 py-2 animate-pulse">
            <div className="h-4 bg-orange-100/60 rounded-full w-5/6" />
            <div className="h-4 bg-orange-100/40 rounded-full w-4/6" />
            <div className="h-4 bg-orange-100/30 rounded-full w-3/6" />
          </div>
        ) : aiOverview ? (
          <div className="p-4 sm:p-5 rounded-3xl bg-slate-50/80 border border-slate-100 text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
            {aiOverview}
          </div>
        ) : null}

        {/* Related Search Topics Chips */}
        {relatedTopics.length > 0 && (
          <div className="pt-2 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              <Tag className="w-3.5 h-3.5 text-orange-500" /> Related Search Topics:
            </div>
            <div className="flex flex-wrap gap-2.5">
              {relatedTopics.map((topic, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleTopicClick(topic)}
                  className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-orange-200 text-slate-700 hover:border-orange-500 hover:bg-gradient-primary hover:text-white transition-all transform hover:scale-[1.03] active:scale-95 text-xs sm:text-sm font-semibold shadow-xs cursor-pointer group"
                >
                  <Search className="w-3 h-3 text-orange-500 group-hover:text-white" />
                  {topic}
                </button>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* SECTION 2: AUTHORS */}
      <section className="space-y-6 rounded-4xl border border-slate-100 bg-white/95 p-6 shadow-[0_25px_70px_-55px_rgba(15,23,42,0.7)]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.35em] text-slate-500">Creators</p>
            <h3 className="text-2xl font-semibold">Authors</h3>
          </div>
          <span className="text-sm text-slate-500">{authors.length} match{authors.length !== 1 ? 'es' : ''}</span>
        </div>
        {authors.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {authors.map((author) => {
              const displayName = getDisplayName(author);
              const bio = author?.bio || '';
              const bioPreview = bio.length > 140 ? `${bio.slice(0, 137)}...` : bio;
              const avatarSrc = author?.avatar;
              const usernameHandle = author?.username ? `@${author.username}` : '';
              const initialsSource = (author?.name?.trim() || author?.username || 'U').toString();
              const initials = initialsSource.charAt(0).toUpperCase();
              const handleAuthorClick = () => {
                if (author?._id) {
                  navigate(RouteProfileView(author._id));
                }
              };

              return (
                <div
                  key={author._id}
                  onClick={handleAuthorClick}
                  className="group flex flex-col gap-3 rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_20px_45px_-40px_rgba(15,23,42,0.6)] transition hover:-translate-y-1 hover:border-[#FF6A00]/40 hover:shadow-lg cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 ring-2 ring-[#FF6A00]/15 transition group-hover:ring-[#FF6A00]/40">
                      <AvatarImage src={avatarSrc} />
                      <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="font-semibold text-slate-900 truncate">{displayName}</p>
                      {usernameHandle && (
                        <p className="text-xs text-slate-500">{usernameHandle}</p>
                      )}
                      {author.role && (
                        <span className="inline-flex items-center rounded-full border border-[#FF6A00]/30 bg-[#FF6A00]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#FF6A00]">
                          {author.role}
                        </span>
                      )}
                    </div>
                  </div>
                  {bioPreview && (
                    <p className="text-sm text-slate-500 line-clamp-2">{bioPreview}</p>
                  )}
                  <span className="text-xs font-medium uppercase tracking-[0.3em] text-slate-400 group-hover:text-[#FF6A00]">
                    View profile
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50/70 px-8 py-10 text-center text-sm text-slate-500">
            No authors matched your search.
          </div>
        )}
      </section>

      {/* SECTION 3: BLOGS */}
      <section className="space-y-6 rounded-4xl border border-slate-100 bg-white/95 p-6 shadow-[0_25px_70px_-55px_rgba(15,23,42,0.7)]">
        <div className="border-b border-slate-200 pb-3">
          <p className="text-[11px] uppercase tracking-[0.35em] text-slate-500">Posts</p>
          <h3 className="text-2xl font-semibold">Blogs</h3>
        </div>
        <div className="grid grid-cols-1 gap-8 pt-2 md:grid-cols-2 xl:grid-cols-3">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))
          ) : (
            <div className="col-span-full rounded-3xl border border-dashed border-slate-200 bg-slate-50/70 p-10 text-center text-slate-500">
              No blogs matched your search. Try a different keyword or check your spelling.
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default SearchResult;