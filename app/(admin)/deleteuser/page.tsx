"use client";

import AdminLayout from "../adminlayout";
import { useEffect, useState } from "react";
import { getAllAdminUsers, deleteAdminUser } from "@/lib/api/auth";

export default function DeleteUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const res = await getAllAdminUsers();
      setUsers(res.data || res);
    } catch (err: any) {
      alert(err.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete user?")) return;
    try {
      await deleteAdminUser(id);
      setUsers((s) => s.filter((u) => u.id !== id));
    } catch (err: any) {
      alert(err.message || "Delete failed");
    }
  };

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-4">Delete Users</h2>
      {loading ? <p>Loading...</p> : (
        <ul className="space-y-2">
          {users.map((u, idx) => (
            <li key={u._id ?? u.id ?? `${u.email ?? "user"}-${idx}`} className="p-3 border flex justify-between items-center">
              <div>
                <div className="font-medium">{u.fullname}</div>
                <div className="text-sm text-gray-600">{u.email}</div>
              </div>
              <button onClick={() => handleDelete(u.id)} className="text-red-600">Delete</button>
            </li>
          ))}
        </ul>
      )}
    </AdminLayout>
  );
}
