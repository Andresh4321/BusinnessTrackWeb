"use client";
import AdminLayout from "../adminlayout";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getAllAdminUsers, deleteAdminUser, createAdminUser } from "@/lib/api/auth";
import { useForm } from "react-hook-form";

type User = {
  id: string;
  fullname: string;
  email: string;
  phone_number?: string;
  role?: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [showCreate, setShowCreate] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  const loadUsers = async () => {
    setLoading(true);
    try {
      const res = await getAllAdminUsers();
      setUsers(res.data || res); // backend might return { data: [...] } or [...]
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

  const onCreate = async (data: any) => {
    try {
      await createAdminUser(data);
      reset();
      setShowCreate(false);
      await loadUsers();
    } catch (err: any) {
      alert(err.message || "Create failed");
    }
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">All Users</h2>
        <div className="space-x-2">
          <Link href="/admin/findUser" className="text-sm text-gray-600 hover:underline">Find User</Link>
          <button onClick={() => setShowCreate(true)} className="bg-orange-500 text-white px-3 py-1 rounded">Create User</button>
          <Link href="/admin/deleteuser" className="text-sm text-red-600 hover:underline">Delete User</Link>
        </div>
      </div>

      {loading ? <p>Loading...</p> : (
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Full Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">Role</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={user._id ?? user.id ?? `${user.email ?? "user"}-${idx}`} className="text-center">
                <td className="p-2 border">{user.fullname}</td>
                <td className="p-2 border">{user.email}</td>
                <td className="p-2 border">{user.phone_number}</td>
                <td className="p-2 border">{user.role}</td>
                <td className="p-2 border space-x-2">
                  <Link href={`/admin/findUser?id=${user.id}`} className="text-blue-500 hover:underline">View</Link>
                  <Link href={`/admin/EditUser?id=${user.id}`} className="text-green-500 hover:underline">Edit</Link>
                  <button onClick={() => handleDelete(user.id)} className="text-red-500 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Floating Create Modal */}
      {showCreate && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md w-full max-w-md">
            <h3 className="text-lg font-bold mb-3">Create User</h3>
            <form onSubmit={handleSubmit(onCreate)} className="space-y-3">
              <input {...register("fullname")} placeholder="Full Name" className="w-full p-2 border rounded" required />
              <input {...register("email")} placeholder="Email" className="w-full p-2 border rounded" required />
              <input {...register("phone_number")} placeholder="Phone" className="w-full p-2 border rounded" />
              <input {...register("password")} type="password" placeholder="Password" className="w-full p-2 border rounded" required />
              <select {...register("role")} className="w-full p-2 border rounded">
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              <div className="flex justify-end space-x-2">
                <button type="button" onClick={() => setShowCreate(false)} className="px-3 py-1 border rounded">Cancel</button>
                <button type="submit" className="px-3 py-1 bg-orange-500 text-white rounded">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
