"use client";

import Link from "next/link";
import { Package, AlertTriangle, Factory, Users, FileText, AlertCircle, ShoppingCart } from "lucide-react";

const STATS = [
  { label: "Total Materials", value: "48", change: "+3 from yesterday", trend: "up", emoji: "📦" },
  { label: "Low Stock Items", value: "7", change: "+2 from yesterday", trend: "down", emoji: "⚠️" },
  { label: "Today's Production", value: "24", change: "+8 from yesterday", trend: "up", emoji: "🏭" },
  { label: "Active Suppliers", value: "12", change: "— No change", trend: "neutral", emoji: "👥" },
];

const MODULES = [
  { title: "Raw Materials", desc: "Manage your inventory of raw materials.", emoji: "📦", href: "/materials" },
  { title: "Bill of Materials", desc: "Define product recipes and ingredients.", emoji: "📄", href: "/bom" },
  { title: "Stock Management", desc: "Track and update stock levels.", emoji: "🏬", href: "/stock" },
  { title: "Suppliers", desc: "Manage supplier information.", emoji: "👥", href: "/suppliers" },
  { title: "Low Stock Alerts", desc: "View materials running low.", emoji: "⚠️", href: "/alerts" },
  { title: "Production", desc: "Create and track production batches.", emoji: "🏭", href: "/production" },
  { title: "Reports & Analytics", desc: "View production insights and trends.", emoji: "📊", href: "/reports" },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">Welcome to BusinessTrack</h1>
          <p className="text-lg text-slate-300">Your complete production management solution</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-lg p-6 shadow-md border border-gray-200"
            >
              <div className="flex items-start justify-between mb-4">
                <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                <span className="text-xl">{stat.emoji}</span>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
              <p
                className={`text-xs font-medium ${
                  stat.trend === "up" ? "text-green-600" : stat.trend === "down" ? "text-red-600" : "text-gray-500"
                }`}
              >
                {stat.change}
              </p>
            </div>
          ))}
        </div>

        {/* Quick Access Modules */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Quick Access Modules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {MODULES.map((module) => (
              <Link
                key={module.title}
                href={module.href}
                className="bg-white rounded-lg p-6 shadow-md border border-gray-200 hover:shadow-lg hover:border-blue-300 transition-all group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-gray-100 rounded-lg p-3 text-2xl group-hover:bg-blue-100 transition-colors">
                    {module.emoji}
                  </div>
                  <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {module.title}
                  </h3>
                </div>
                <p className="text-gray-600 text-sm">{module.desc}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Quick Actions</h3>
          <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
            <div className="flex flex-wrap gap-3">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors">
                📦 Add Material
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors">
                🏭 Start Production
              </button>
              <button className="bg-white hover:bg-gray-50 border-2 border-blue-600 text-blue-600 font-medium py-2 px-6 rounded-lg transition-colors">
                🏬 Update Stock
              </button>
              <button className="bg-white hover:bg-gray-50 border-2 border-blue-600 text-blue-600 font-medium py-2 px-6 rounded-lg transition-colors">
                ⚠️ View Alerts
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
