"use client";

import AdminLayout from "../adminlayout";
import { useForm } from "react-hook-form";

export default function CreateUserPage() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log("Creating user:", data);
  };

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-4">Create New User</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
        <input {...register("fullname")} placeholder="Full Name" className="w-full p-2 border rounded" />
        <input {...register("email")} placeholder="Email" className="w-full p-2 border rounded" />
        <input {...register("phone")} placeholder="Phone" className="w-full p-2 border rounded" />
        <input type="password" {...register("password")} placeholder="Password" className="w-full p-2 border rounded" />
        <select {...register("role")} className="w-full p-2 border rounded">
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <input type="file" {...register("profileImage")} className="w-full p-2 border rounded" />
        <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded">Create User</button>
      </form>
    </AdminLayout>
  );
}
