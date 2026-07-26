import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import EditorialInput from './components/EditorialInput';
import ReviewStudio from './components/ReviewStudio';
import CalendarView from './components/CalendarView';
import { DEMO_POSTS } from './services/geminiCopilot';
import BroyLogo from './components/BroyLogo';
import { Sparkles } from 'lucide-react';
import './styles/theme.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('input');
  const [posts, setPosts] = useState(DEMO_POSTS);
  const [notification, setNotification] = useState(null);
  
  // Theme state: 'light' | 'dark' | 'system'
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('broy-theme') || 'dark';
  });

  const [isDark, setIsDark] = useState(true);

  // Apply dark mode class to <html> based on theme selection or system preference
  useEffect(() => {
    localStorage.setItem('broy-theme', theme);

    const updateThemeClass = () => {
      let activeIsDark = false;

      if (theme === 'dark') {
        activeIsDark = true;
      } else if (theme === 'light') {
        activeIsDark = false;
      } else if (theme === 'system') {
        activeIsDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      }

      setIsDark(activeIsDark);

      if (activeIsDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    updateThemeClass();

    // System theme listener
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const listener = (e) => {
        setIsDark(e.matches);
        if (e.matches) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      };
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, [theme]);

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleNewPostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
    setActiveTab('review');
    showNotification(`3 Varianten für "${newPost.title}" wurden erfolgreich mit Gemini AI generiert!`);
  };

  const handleApprovePost = (postId, selectedVariant) => {
    setPosts(prevPosts =>
      prevPosts.map(p => {
        if (p.id === postId) {
          return {
            ...p,
            status: 'approved',
            selectedVariant
          };
        }
        return p;
      })
    );
    showNotification(`Variante für "${posts.find(p => p.id === postId)?.title}" wurde freigegeben und für Instagram terminiert!`);
  };

  const pendingCount = posts.filter(p => p.status !== 'approved').length;

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col justify-between text-[var(--text-primary)] transition-colors duration-300">
      
      <div>
        {/* Header with Theme Switcher */}
        <Header 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          pendingCount={pendingCount} 
          theme={theme}
          setTheme={setTheme}
          isDark={isDark}
        />

        {/* Global Toast Notification */}
        {notification && (
          <div className="fixed bottom-6 right-6 z-50 glass-panel border border-amber-400/40 p-4 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce">
            <Sparkles className="w-5 h-5 text-amber-500 flex-shrink-0" />
            <p className="text-xs font-semibold text-zinc-900 dark:text-white">{notification}</p>
          </div>
        )}

        {/* View Routing */}
        <main>
          {activeTab === 'input' && (
            <EditorialInput onNewPostCreated={handleNewPostCreated} />
          )}

          {activeTab === 'review' && (
            <ReviewStudio posts={posts} onApprovePost={handleApprovePost} />
          )}

          {activeTab === 'calendar' && (
            <CalendarView posts={posts} />
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-6 px-6 mt-12 bg-zinc-100/60 dark:bg-black/40 transition-colors">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500 dark:text-gray-400">
          <div className="flex items-center gap-3">
            <BroyLogo size={24} color={isDark ? '#888899' : '#444455'} />
            <span className="font-medium">© {new Date().getFullYear()} Susan Broy · contemporary studio</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] font-mono">
            <span>Beton · Metall · S/W Malerei</span>
            <span>•</span>
            <span>Gemini Pro / Flash AI</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
