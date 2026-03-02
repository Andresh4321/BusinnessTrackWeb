"use client";

import { useState, useEffect } from 'react';
import { Search, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useApp } from '../context/AppContext';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export const Header = ({ title, subtitle }: HeaderProps) => {
  const { getLowStockMaterials } = useApp();
  const lowStockCount = getLowStockMaterials().length;
  const [user, setUser] = useState<any>(null);

  const resolveProfileImageUrl = (src?: string) => {
    if (!src) return "";
    if (src.startsWith("http://") || src.startsWith("https://")) return src;
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL ?? "";
    const normalized = src.startsWith("/") ? src : `/${src}`;
    if (!baseUrl) return normalized;
    return `${baseUrl.replace(/\/$/, "")}${normalized}`;
  };

  useEffect(() => {
    // Load user from localStorage
    const userData = localStorage.getItem('businesstrack_user') || localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const profileSrc = resolveProfileImageUrl(user?.profileImage);
  const fallbackAvatar = "/default-avatar.svg";

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/80 backdrop-blur-lg px-6">
      <div className="animate-fade-in">
        <h1 className="font-display text-xl font-bold text-foreground">{title}</h1>
        {subtitle && (
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Search..." 
            className="w-64 pl-9 bg-muted/50 border-0"
          />
        </div>

        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {lowStockCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground animate-pulse">
              {lowStockCount}
            </span>
          )}
        </Button>

        <div className="flex items-center gap-3 rounded-lg bg-muted/50 px-3 py-1.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-primary overflow-hidden">
            <img 
              src={profileSrc || fallbackAvatar} 
              alt="Profile" 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = fallbackAvatar;
              }}
            />
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium">{user?.fullname || user?.fullName || 'User'}</p>
            <p className="text-xs text-muted-foreground">
              {user?.role === 'admin' || user?.isAdmin ? 'Administrator' : 'User'}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};
