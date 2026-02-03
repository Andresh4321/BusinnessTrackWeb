"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { getAdminUser, updateAdminUser } from "@/lib/api/auth";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

export default function EditUserPage() {
    const { id } = useParams();
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    // Use form with default values
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

    useEffect(() => {
        if (!id) return;
        const fetchUser = async () => {
            try {
                const res = await getAdminUser(id as string);
                const userData = res.user || res.data || res;
                reset({
                    fullname: userData.fullname,
                    email: userData.email,
                    phone_number: userData.phone_number || userData.phone,
                });
            } catch (err: any) {
                toast.error("Failed to load user");
                // router.push("/admin/users"); // Optional: redirect on fail
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [id, reset]);

    const onSubmit = async (data: any) => {
        try {
            await updateAdminUser(id as string, data);
            toast.success("User updated successfully");
            router.push("/admin/users");
        } catch (err: any) {
            toast.error(err.message || "Failed to update user");
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center p-12">
                <Loader2 className="animate-spin text-orange-500 mb-4" size={32} />
                <p className="text-gray-500">Loading user details...</p>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-4">
                <Link href="/admin/users" className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full transition-colors text-gray-500">
                    <ArrowLeft size={24} />
                </Link>
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Edit User</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Update user information</p>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                        <input
                            {...register("fullname", { required: "Name is required" })}
                            className="w-full h-11 px-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all"
                        />
                        {errors.fullname && <p className="text-xs text-red-500">{String(errors.fullname.message)}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                        <input
                            {...register("email", { required: "Email is required" })}
                            type="email"
                            className="w-full h-11 px-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all"
                        />
                        {errors.email && <p className="text-xs text-red-500">{String(errors.email.message)}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
                        <input
                            {...register("phone_number", { required: "Phone is required" })}
                            className="w-full h-11 px-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all"
                        />
                        {errors.phone_number && <p className="text-xs text-red-500">{String(errors.phone_number.message)}</p>}
                    </div>

                    <div className="flex justify-end gap-3 pt-6 border-t border-gray-100 dark:border-gray-700 mt-6">
                        <Link href="/admin/users" className="px-5 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium transition-colors">
                            Cancel
                        </Link>
                        <button type="submit" disabled={isSubmitting} className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg font-medium shadow-lg hover:shadow-orange-500/25 flex items-center gap-2 transition-all">
                            {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                            {isSubmitting ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
