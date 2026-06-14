"use client";

import { useState, useEffect, useCallback, useMemo, useRef, startTransition } from "react";
import {
  Package,
  Users,
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
  Mail,
  Phone,
  AlertCircle,
  Database,
  Bell,
  BellRing,
  Sparkles,
} from "lucide-react";
import type { Order, OrderStatus } from "@/lib/types";
import { useLanguage } from "@/lib/LanguageContext";
import { motion } from "framer-motion";

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
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 max-w-sm w-full text-center"
        >
          <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
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
            className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3 transition-all duration-200"
          />
          {passError && (
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-xs mb-3"
            >
              {t("admin.login.incorrect")}
            </motion.p>
          )}
          <button
            onClick={handleLogin}
            disabled={checking}
            className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-indigo-500 text-white rounded-xl text-sm font-medium hover:from-blue-700 hover:to-indigo-600 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-blue-200/50"
          >
            {checking ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <LogIn className="w-4 h-4" />
            )}
            {t("admin.login.login")}
          </button>
        </motion.div>
      </div>
    );
  }

  return <AdminDashboard password={password} />;
}

function AdminDashboard({ password }: { password: string }) {
  const { t } = useLanguage();
  const [orders, setOrders] = useState<Order[]>([]);
  const [customers, setCustomers] = useState<{ name: string; mobile: string; address: string; created_at: string }[]>([]);
  const [contacts, setContacts] = useState<{ id: number; name: string; email: string; mobile: string; message: string; created_at: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"orders" | "customers" | "reviews" | "contacts" | "chat">("orders");
  const [setupStatus, setSetupStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [setupMessage, setSetupMessage] = useState("");
  const [newOrderCount, setNewOrderCount] = useState(0);
  const [notifEnabled, setNotifEnabled] = useState(false);
  const prevOrderCountRef = useRef(0);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playNotificationSound = useCallback(() => {
    try {
      if (!audioCtxRef.current) audioCtxRef.current = new AudioContext();
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.setValueAtTime(1000, ctx.currentTime + 0.1);
      osc.frequency.setValueAtTime(1200, ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.4);
    } catch {
    }
  }, []);

  const showBrowserNotification = useCallback((order: Order) => {
    if (!("Notification" in window)) return;
    if (Notification.permission === "granted") {
      new Notification(" New Order Received!", {
        body: `${order.customer_name} - \u20B9${order.total_amount}`,
        icon: "/favicon.ico",
      });
    }
  }, []);

  const requestNotifPermission = useCallback(async () => {
    if (!("Notification" in window)) return;
    if (Notification.permission === "default") {
      const result = await Notification.requestPermission();
      setNotifEnabled(result === "granted");
    } else {
      setNotifEnabled(Notification.permission === "granted");
    }
  }, []);

  const handleSetup = async () => {
    setSetupStatus("loading");
    try {
      const res = await fetch("/api/setup", { headers });
      const data = await res.json();
      if (res.ok) {
        setSetupStatus("success");
        setSetupMessage(data.message);
        fetchData();
      } else {
        setSetupStatus("error");
        setSetupMessage(data.error || data.hint || "Setup failed");
      }
    } catch {
      setSetupStatus("error");
      setSetupMessage("Network error");
    }
  };

  const headers = useMemo(() => ({
    "Content-Type": "application/json",
    "x-admin-password": password,
  }), [password]);

  const fetchData = useCallback(async () => {
    startTransition(() => setLoading(true));
    startTransition(() => setError(null));
    try {
      const [ordersRes, customersRes, contactsRes] = await Promise.all([
        fetch("/api/orders", { headers }),
        fetch("/api/customers", { headers }),
        fetch("/api/contacts", { headers }),
      ]);
      if (ordersRes.ok) {
        const data: Order[] = await ordersRes.json();
        const prevCount = prevOrderCountRef.current;
        if (prevCount > 0 && data.length > prevCount) {
          const newOrders = data.slice(0, data.length - prevCount);
          setNewOrderCount((c) => c + newOrders.length);
          playNotificationSound();
          newOrders.forEach((o) => showBrowserNotification(o));
        }
        prevOrderCountRef.current = data.length;
        startTransition(() => setOrders(data));
      }
      if (customersRes.ok) {
        const data = await customersRes.json();
        startTransition(() => setCustomers(data));
      }
      if (contactsRes.ok) {
        const data = await contactsRes.json();
        startTransition(() => setContacts(data));
      }
    } catch (e) {
      console.error("Failed to fetch data", e);
      startTransition(() => setError("Failed to load dashboard data. Please try again."));
    }
    startTransition(() => setLoading(false));
  }, [headers, playNotificationSound, showBrowserNotification]);

  useEffect(() => { fetchData(); }, [fetchData]);

  useEffect(() => { requestNotifPermission(); }, [requestNotifPermission]);

  useEffect(() => {
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, [fetchData]);

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

  const pendingOrders = orders.filter((o) => o.status !== "Delivered").length;
  const completedOrders = orders.filter((o) => o.status === "Delivered").length;

  const stats = [
    { label: t("admin.stat.totalOrders"), value: orders.length.toString(), icon: <Package className="w-5 h-5" />, color: "from-blue-500 to-blue-600" },
    { label: t("admin.stat.pendingOrders"), value: pendingOrders.toString(), icon: <Clock className="w-5 h-5" />, color: "from-amber-500 to-orange-500" },
    { label: t("admin.stat.completedOrders"), value: completedOrders.toString(), icon: <CheckCircle2 className="w-5 h-5" />, color: "from-green-500 to-emerald-500" },
    { label: t("admin.stat.customers"), value: customers.length.toString(), icon: <Users className="w-5 h-5" />, color: "from-purple-500 to-violet-500" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          <span className="text-sm text-gray-400">Loading dashboard...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 max-w-md w-full text-center">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <p className="text-gray-900 font-semibold mb-2">Something went wrong</p>
          <p className="text-sm text-gray-500 mb-4">{error}</p>
          <button
            onClick={fetchData}
            className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-500 text-white rounded-xl text-sm font-medium hover:from-blue-700 hover:to-indigo-600 transition-all shadow-md"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-600 via-blue-700 to-indigo-900 py-12 md:py-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.1),transparent_60%)]" />
        <div className="absolute inset-0 hero-grid opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-blue-100 text-xs font-medium mb-3 tracking-wide">
                <Sparkles className="w-3 h-3" />
                Dashboard
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                {t("admin.title")}
              </h1>
              <p className="text-blue-100/70 mt-1">
                {t("admin.subtitle")}
              </p>
            </div>
            <button
              onClick={requestNotifPermission}
              className={`p-2.5 rounded-xl transition-all duration-200 ${
                notifEnabled ? "bg-green-500/20 text-green-300 shadow-lg" : "bg-white/10 text-blue-200 hover:bg-white/20"
              }`}
              title={notifEnabled ? "Notifications enabled" : "Enable notifications"}
            >
              {notifEnabled ? <BellRing className="w-5 h-5" /> : <Bell className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </section>

      {newOrderCount > 0 && activeTab !== "orders" && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border-b border-red-200"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-3">
            <BellRing className="w-5 h-5 text-red-500 animate-pulse" />
            <p className="text-sm text-red-700 font-medium">
              {newOrderCount} new order{newOrderCount > 1 ? "s" : ""} received
            </p>
            <button
              onClick={() => { setActiveTab("orders"); setNewOrderCount(0); }}
              className="ml-auto text-xs bg-red-600 text-white px-3 py-1.5 rounded-lg hover:bg-red-700 transition-colors"
            >
              View Orders
            </button>
          </div>
        </motion.div>
      )}

      <section className="py-8 md:py-12 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 card-hover"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-500">{stat.label}</span>
                  <div className={`w-9 h-9 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center text-white shadow-sm`}>
                    {stat.icon}
                  </div>
                </div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <div className="flex items-center gap-1 mt-1 text-xs text-green-600">
                  <TrendingUp className="w-3 h-3" />
                  Live from database
                </div>
              </motion.div>
            ))}
          </div>

          {(orders.length === 0 || customers.length === 0) && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <Database className="w-5 h-5 text-amber-600" />
                  <div>
                    <p className="text-sm font-medium text-amber-900">Database not set up</p>
                    <p className="text-xs text-amber-700">
                      {setupStatus === "error"
                        ? setupMessage
                        : "Tables are missing. Click to run schema setup."}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleSetup}
                  disabled={setupStatus === "loading"}
                  className="px-4 py-2 bg-amber-600 text-white rounded-lg text-sm font-medium hover:bg-amber-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {setupStatus === "loading" ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Database className="w-4 h-4" />
                  )}
                  {setupStatus === "loading" ? "Setting up..." : setupStatus === "success" ? "Done!" : "Setup Database"}
                </button>
              </div>
              {setupStatus === "success" && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-green-700 text-xs mt-2"
                >
                  {setupMessage}
                </motion.p>
              )}
            </div>
          )}

          <div className="flex gap-1 bg-white rounded-xl border border-gray-100 shadow-sm p-1 w-fit flex-wrap">
            {([
              { key: "orders" as const, label: t("admin.tab.orders"), badge: newOrderCount },
              { key: "customers" as const, label: t("admin.tab.customers") },
              { key: "reviews" as const, label: "Reviews" },
              { key: "contacts" as const, label: t("admin.tab.contacts") },
              { key: "chat" as const, label: t("admin.tab.chat") },
            ]).map((tab: { key: string; label: string; badge?: number }) => (
              <button
                key={tab.key}
                onClick={() => {
                  setActiveTab(tab.key as typeof activeTab);
                  if (tab.key === "orders") setNewOrderCount(0);
                }}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  activeTab === tab.key
                    ? "bg-gradient-to-r from-blue-600 to-indigo-500 text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                {tab.label}
                {tab.badge && tab.badge > 0 ? (
                  <span className="flex items-center gap-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[20px] justify-center">
                    <BellRing className="w-3 h-3" />
                    {tab.badge > 9 ? "9+" : tab.badge}
                  </span>
                ) : null}
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
                    className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
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
                              className="px-2 py-1.5 bg-white border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
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
            <div className="bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                <p className="text-sm text-gray-500">Total Customers: {customers.length}</p>
              </div>
              {customers.length === 0 ? (
                <div className="p-8 text-center">
                  <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-600 font-medium">No customers yet</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                        <th className="text-left px-4 py-3 font-medium">Name</th>
                        <th className="text-left px-4 py-3 font-medium">Mobile</th>
                        <th className="text-left px-4 py-3 font-medium">Address</th>
                        <th className="text-left px-4 py-3 font-medium">Registered</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {customers.map((c, i) => (
                        <tr key={i} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                                {c.name?.charAt(0) || "?"}
                              </div>
                              <span className="font-medium text-gray-800">{c.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-gray-600">{c.mobile}</td>
                          <td className="px-4 py-3 text-gray-500 max-w-xs truncate">{c.address}</td>
                          <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                            {new Date(c.created_at).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === "reviews" && <ReviewsSection password={password} />}

          {activeTab === "contacts" && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                <p className="text-sm text-gray-500">Total Submissions: {contacts.length}</p>
              </div>
              {contacts.length === 0 ? (
                <div className="p-8 text-center">
                  <Mail className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-600 font-medium">No contact submissions yet</p>
                  <p className="text-sm text-gray-400 mt-1">Form submissions from the contact page will appear here.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                        <th className="text-left px-4 py-3 font-medium">Name</th>
                        <th className="text-left px-4 py-3 font-medium">Contact</th>
                        <th className="text-left px-4 py-3 font-medium">Message</th>
                        <th className="text-left px-4 py-3 font-medium">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {contacts.map((c) => (
                        <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3 font-medium text-gray-800">{c.name}</td>
                          <td className="px-4 py-3">
                            <div className="flex flex-col gap-0.5">
                              {c.mobile && (
                                <span className="text-xs text-gray-600 flex items-center gap-1">
                                  <Phone className="w-3 h-3" /> {c.mobile}
                                </span>
                              )}
                              {c.email && (
                                <span className="text-xs text-gray-600 flex items-center gap-1">
                                  <Mail className="w-3 h-3" /> {c.email}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3 text-gray-600 max-w-xs truncate">{c.message}</td>
                          <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                            {new Date(c.created_at).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === "chat" && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8 text-center">
              <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                Chat Conversations
              </h3>
              <p className="text-sm text-gray-400 mb-4">
                Review AI chatbot conversations and escalate when needed.
              </p>
              <button className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-500 text-white rounded-xl text-sm font-medium hover:from-blue-700 hover:to-indigo-600 transition-all shadow-md">
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
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<number | null>(null);

  const fetchReviews = useCallback(async () => {
    startTransition(() => setLoading(true));
    startTransition(() => setError(null));
    try {
      const res = await fetch("/api/reviews");
      if (res.ok) {
        const data = await res.json();
        startTransition(() => setReviews(data));
      } else {
        startTransition(() => setError("Failed to load reviews"));
      }
    } catch (e) {
      console.error("Failed to fetch reviews", e);
      startTransition(() => setError("Failed to load reviews"));
    }
    startTransition(() => setLoading(false));
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

  if (error) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8 text-center">
        <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-3" />
        <p className="text-gray-600">{error}</p>
        <button onClick={fetchReviews} className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">
          Retry
        </button>
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
