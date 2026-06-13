"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Package,
  Users,
  IndianRupee,
  MessageCircle,
  Clock,
  Search,
  CheckCircle2,
  TrendingUp,
  Loader2,
  Lock,
  LogIn,
  Star,
  Trash2,
} from "lucide-react";
import type { Order, OrderStatus } from "@/lib/types";
import { useLanguage } from "@/lib/LanguageContext";

const STATUSES: OrderStatus[] = [
  "Order Received",
  "Pickup Scheduled",
  "Washing",
  "Ironing",
  "Out for Delivery",
  "Delivered",
];

export default function AdminPage() {
  const { t } = useLanguage();
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [passError, setPassError] = useState(false);
  const [checking, setChecking] = useState(false);

  const handleLogin = async () => {
    setChecking(true);
    setPassError(false);
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        setAuthed(true);
      } else {
        setPassError(true);
      }
    } catch {
      setPassError(true);
    }
    setChecking(false);
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 max-w-sm w-full text-center">
          <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-6 h-6 text-blue-600" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-1">{t("admin.login.title")}</h1>
          <p className="text-sm text-gray-500 mb-6">{t("admin.login.subtitle")}</p>
          <input
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setPassError(false); }}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            placeholder={t("admin.login.placeholder")}
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
          />
          {passError && <p className="text-red-500 text-xs mb-3">{t("admin.login.incorrect")}</p>}
          <button
            onClick={handleLogin}
            disabled={checking}
            className="w-full py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {checking ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <LogIn className="w-4 h-4" />
            )}
            {t("admin.login.login")}
          </button>
        </div>
      </div>
    );
  }

  return <AdminDashboard password={password} />;
}

function AdminDashboard({ password }: { password: string }) {
  const { t } = useLanguage();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"orders" | "customers" | "chat" | "reviews">("orders");

  const headers = {
    "Content-Type": "application/json",
    "x-admin-password": password,
  };

  const fetchOrders = useCallback(async () => {
    try {
      const res = await fetch("/api/orders", { headers });
      if (res.ok) setOrders(await res.json());
    } catch (e) {
      console.error("Failed to fetch orders", e);
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchOrders(); }, [fetchOrders]);

  const updateStatus = async (orderId: string, newStatus: OrderStatus) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        const updated = await res.json();
        setOrders((prev) => prev.map((o) => (o.order_id === orderId ? updated : o)));
      }
    } catch (e) {
      console.error("Failed to update status", e);
    }
  };

  const filteredOrders = orders.filter(
    (o) =>
      o.order_id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer_name.toLowerCase().includes(search.toLowerCase())
  );

  const totalRevenue = orders.reduce((sum, o) => sum + o.total_amount, 0);
  const activeOrders = orders.filter((o) => o.status !== "Delivered").length;
  const uniqueCustomers = new Set(orders.map((o) => o.customer_mobile)).size;

  const stats = [
    { label: "Total Orders", value: orders.length.toString(), icon: <Package className="w-5 h-5" />, color: "bg-blue-500" },
    { label: "Active Orders", value: activeOrders.toString(), icon: <Clock className="w-5 h-5" />, color: "bg-amber-500" },
    { label: "Total Revenue", value: `₹${totalRevenue}`, icon: <IndianRupee className="w-5 h-5" />, color: "bg-green-500" },
    { label: "Customers", value: uniqueCustomers.toString(), icon: <Users className="w-5 h-5" />, color: "bg-purple-500" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            {t("admin.title")}
          </h1>
          <p className="text-blue-100 mt-2">
            {t("admin.subtitle")}
          </p>
        </div>
      </section>

      <section className="py-8 md:py-12 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-xl border border-gray-100 shadow-sm p-5"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-500">{stat.label}</span>
                  <div className={`w-9 h-9 ${stat.color} rounded-lg flex items-center justify-center text-white`}>
                    {stat.icon}
                  </div>
                </div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <div className="flex items-center gap-1 mt-1 text-xs text-green-600">
                  <TrendingUp className="w-3 h-3" />
                  Live from database
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-1 bg-white rounded-xl border border-gray-100 shadow-sm p-1 w-fit">
              {([
                { key: "orders" as const, label: t("admin.tab.orders") },
                { key: "customers" as const, label: t("admin.tab.customers") },
                { key: "reviews" as const, label: "Reviews" },
                { key: "chat" as const, label: t("admin.tab.chat") },
              ]).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.key
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === "orders" && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <div className="relative max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder={t("admin.search")}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {orders.length === 0 ? (
                <div className="p-8 text-center">
                  <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-600 font-medium">{t("admin.noOrders")}</p>
                  <p className="text-sm text-gray-400 mt-1">{t("admin.noOrdersText")}</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                        <th className="text-left px-4 py-3 font-medium">Order ID</th>
                        <th className="text-left px-4 py-3 font-medium">Customer</th>
                        <th className="text-left px-4 py-3 font-medium">Items</th>
                        <th className="text-left px-4 py-3 font-medium">Amount</th>
                        <th className="text-left px-4 py-3 font-medium">Date</th>
                        <th className="text-left px-4 py-3 font-medium">Status</th>
                        <th className="text-left px-4 py-3 font-medium">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {filteredOrders.map((order) => (
                        <tr key={order.order_id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3 font-mono font-medium text-blue-600">
                            {order.order_id}
                          </td>
                          <td className="px-4 py-3">
                            <p className="font-medium text-gray-800">{order.customer_name}</p>
                            <p className="text-xs text-gray-400">{order.customer_mobile}</p>
                          </td>
                          <td className="px-4 py-3 text-gray-600">
                            {order.items.map((i) => `${i.quantity}x ${i.name}`).join(", ")}
                          </td>
                          <td className="px-4 py-3 font-semibold text-gray-800">
                            ₹{order.total_amount}
                          </td>
                          <td className="px-4 py-3 text-gray-500">{order.pickup_date}</td>
                          <td className="px-4 py-3">
                            <span
                              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                                order.status === "Delivered"
                                  ? "bg-green-50 text-green-700"
                                  : order.status === "Washing" || order.status === "Ironing"
                                  ? "bg-blue-50 text-blue-700"
                                  : order.status === "Order Received"
                                  ? "bg-gray-50 text-gray-700"
                                  : "bg-amber-50 text-amber-700"
                              }`}
                            >
                              {order.status === "Delivered" && <CheckCircle2 className="w-3 h-3" />}
                              {order.status}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <select
                              value={order.status}
                              onChange={(e) => updateStatus(order.order_id, e.target.value as OrderStatus)}
                              className="px-2 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              {STATUSES.map((s) => (
                                <option key={s} value={s}>{s}</option>
                              ))}
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <div className="px-4 py-3 border-t border-gray-100 text-xs text-gray-400">
                Showing {filteredOrders.length} of {orders.length} orders
              </div>
            </div>
          )}

          {activeTab === "customers" && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8 text-center">
              <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                Customer Management
              </h3>
              <p className="text-sm text-gray-400 mb-4">
                View and manage your customer base. ({uniqueCustomers} registered customers)
              </p>
              <div className="max-w-md mx-auto space-y-2 text-left">
                {Array.from(new Set(orders.map((o) => o.customer_mobile))).slice(0, 10).map((mobile) => {
                  const customer = orders.find((o) => o.customer_mobile === mobile);
                  return (
                    <div key={mobile} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                        {customer?.customer_name?.charAt(0) || "?"}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">{customer?.customer_name}</p>
                        <p className="text-xs text-gray-400">{mobile}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === "reviews" && <ReviewsSection password={password} />}

          {activeTab === "chat" && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8 text-center">
              <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                Chat Conversations
              </h3>
              <p className="text-sm text-gray-400 mb-4">
                Review AI chatbot conversations and escalate when needed.
              </p>
              <button className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors">
                View Conversations
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function ReviewsSection({ password }: { password: string }) {
  const [reviews, setReviews] = useState<{ id: number; customer_name: string; rating: number; comment: string; created_at: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<number | null>(null);

  const fetchReviews = useCallback(async () => {
    try {
      const res = await fetch("/api/reviews");
      if (res.ok) setReviews(await res.json());
    } catch (e) {
      console.error("Failed to fetch reviews", e);
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchReviews(); }, [fetchReviews]);

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this review?")) return;
    setDeleting(id);
    try {
      await fetch(`/api/reviews/${id}`, {
        method: "DELETE",
        headers: { "x-admin-password": password },
      });
      setReviews((prev) => prev.filter((r) => r.id !== id));
    } catch (e) {
      console.error("Failed to delete review", e);
    }
    setDeleting(null);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-12 text-center">
        <Loader2 className="w-6 h-6 text-blue-600 animate-spin mx-auto" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
        <p className="text-sm text-gray-500">Total Reviews: {reviews.length}</p>
      </div>

      {reviews.length === 0 ? (
        <div className="p-8 text-center">
          <Star className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-600 font-medium">No reviews yet</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                <th className="text-left px-4 py-3 font-medium">Customer</th>
                <th className="text-left px-4 py-3 font-medium">Rating</th>
                <th className="text-left px-4 py-3 font-medium">Comment</th>
                <th className="text-left px-4 py-3 font-medium">Date</th>
                <th className="text-left px-4 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {reviews.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-800">{r.customer_name}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < r.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600 max-w-xs truncate">{r.comment}</td>
                  <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                    {new Date(r.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleDelete(r.id)}
                      disabled={deleting === r.id}
                      className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
