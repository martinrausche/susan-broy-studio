import React, { useState } from 'react';
import Header from './components/Header';
import EditorialInput from './components/EditorialInput';
import ReviewStudio from './components/ReviewStudio';
import CalendarView from './components/CalendarView';
import { DEMO_POSTS } from './services/geminiCopilot';
import BroyLogo from './components/BroyLogo';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import './styles/theme.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('input');
  const [posts, setPosts] = useState(DEMO_POSTS);
  const [notification, setNotification] = useState(null);

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
    <div className="min-h-screen bg-studio flex flex-col justify-between text-gray-100">
      
      <div>
        {/* Header */}
        <Header 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          pendingCount={pendingCount} 
        />

        {/* Global Toast Notification */}
        {notification && (
          <div className="fixed bottom-6 right-6 z-50 glass-panel border border-yellow-400/40 p-4 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce">
            <Sparkles className="w-5 h-5 text-yellow-400 flex-shrink-0" />
            <p className="text-xs font-semibold text-white">{notification}</p>
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
      <footer className="border-t border-zinc-800 py-6 px-6 mt-12 bg-black/40">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-3">
            <BroyLogo size={24} color="#666678" />
            <span>© {new Date().getFullYear()} Susan Broy · contemporary studio</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Beton · Metall · S/W Malerei</span>
            <span>•</span>
            <span>Powered by Gemini 1.5 Pro / Flash Vision</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
