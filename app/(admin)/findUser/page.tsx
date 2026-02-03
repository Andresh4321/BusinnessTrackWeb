"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function FindUserPage() {
  const [id, setId] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      // Navigate to EditUser page to view/edit details
      router.push(`/admin/EditUser/${id}`);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 text-center animate-in zoom-in-95 duration-300">
      <div className="h-16 w-16 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full flex items-center justify-center mx-auto mb-6">
        <Search size={32} />
      </div>
      <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Find User</h2>
      <p className="text-gray-500 dark:text-gray-400 mb-8">Enter a User ID to locate their records.</p>

      <form onSubmit={handleSearch} className="space-y-4">
        <input
          type="text"
          placeholder="Enter User ID..."
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="w-full h-12 px-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all text-center text-lg"
        />
        <button
          type="submit"
          disabled={!id}
          className="w-full h-12 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg shadow-lg hover:shadow-orange-500/20 transition-all"
        >
          Search User
        </button>
      </form>
    </div>
  );
}
