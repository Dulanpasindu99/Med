"use client";
import { useEffect, useMemo, useState } from "react";

type Patient = {
  id: string;
  nic?: string;
  firstName: string;
  lastName?: string;
  phone?: string;
  createdAt?: string;
};

type UpcomingVisit = {
  id: string;
  name: string;
  reason: string;
  time: string;
};

const navItems = [
  { label: "Overview", href: "/", icon: "􀣺" },
  { label: "Patients", href: "/patients", icon: "􀎠" },
  { label: "Visits", href: "/visits", icon: "􀝗" },
  { label: "Care Teams", href: "/providers", icon: "􀉭" },
];

const quickActions = [
  {
    title: "New Patient",
    description: "Capture demographics, insurance and onboarding tasks in seconds.",
    href: "/patients/new",
    icon: "􀐚",
  },
  {
    title: "Request Labs",
    description: "Send a diagnostic order with templated notes to our lab partners.",
    href: "/visits",
    icon: "􀥛",
  },
  {
    title: "Start Televisit",
    description: "Spin up a secure video room and share the invite with the patient instantly.",
    href: "/assistant",
    icon: "􀙇",
  },
];

const upcomingVisits: UpcomingVisit[] = [
  {
    id: "visit-1",
    name: "Amelia Reynolds",
    reason: "Post-op suture removal",
    time: "09:30",
  },
  {
    id: "visit-2",
    name: "Derrick Caldwell",
    reason: "Hypertension follow-up",
    time: "11:10",
  },
  {
    id: "visit-3",
    name: "Michelle Kim",
    reason: "Virtual wellness consult",
    time: "14:00",
  },
];

export default function DoctorDashboard() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    async function fetchPatients() {
      try {
        setIsLoading(true);
        setError(null);
        const res = await fetch("/api/patients");

        if (!res.ok) {
          throw new Error("Unable to load patients at the moment.");
        }

        const data: Patient[] = await res.json();

        if (!ignore) {
          setPatients(data);
        }
      } catch (err) {
        if (!ignore) {
          setError(err instanceof Error ? err.message : "Something went wrong.");
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    fetchPatients();

    return () => {
      ignore = true;
    };
  }, []);

  const stats = useMemo(() => {
    const totalPatients = patients.length;
    const newThisWeek = patients.filter((patient) => {
      if (!patient.createdAt) return false;
      const created = new Date(patient.createdAt);
      const now = new Date();
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - now.getDay());
      startOfWeek.setHours(0, 0, 0, 0);
      return created >= startOfWeek;
    }).length;

    return [
      {
        label: "Patients",
        value: totalPatients,
        sublabel: `${newThisWeek} new this week`,
        accent: "from-sky-400/80 to-blue-500/70",
      },
      {
        label: "Today's Visits",
        value: 4,
        sublabel: "2 in-person · 2 virtual",
        accent: "from-blue-300/70 to-cyan-400/70",
      },
      {
        label: "Pending Labs",
        value: 2,
        sublabel: "Awaiting review",
        accent: "from-indigo-300/70 to-sky-400/70",
      },
      {
        label: "Active Care Plans",
        value: 7,
        sublabel: "3 need updates",
        accent: "from-blue-200/70 to-indigo-300/70",
      },
    ];
  }, [patients]);

  return (
    <div className="page-fade mx-auto flex w-full max-w-7xl flex-col gap-8 font-[\"SF Pro Display\",-apple-system,BlinkMacSystemFont,\"Segoe UI\",sans-serif] text-slate-900 lg:flex-row">
      <aside className="glass-float bg-shimmer flex w-full flex-col justify-between gap-10 rounded-[2rem] p-6 lg:max-w-[18rem]">
        <div className="space-y-8">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-slate-500/80">MedLink</p>
            <h1 className="mt-2 text-2xl font-semibold text-slate-900 text-glow">Care Studio 26.0.1</h1>
            <p className="mt-2 text-sm text-slate-600">
              A fluid workspace infused with Apple-style depth, responsive micro-interactions and gentle gradients.
            </p>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="sidebar-transition flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium text-slate-600/90 hover:bg-white/50 hover:text-slate-900"
              >
                <span className="flex items-center gap-3">
                  <span className="text-lg text-blue-500">{item.icon}</span>
                  {item.label}
                </span>
                <span className="text-xs text-slate-400">􀯻</span>
              </a>
            ))}
          </nav>
        </div>

        <div className="rounded-2xl border border-white/40 bg-white/50 p-4 text-xs text-slate-600 backdrop-blur-lg">
          <p className="font-semibold text-slate-700">Pulse Sync</p>
          <p className="mt-1 text-[0.7rem] leading-relaxed text-slate-500">
            Your workspace mirrors the latest 26.0.1 release — gradients, liquid glass and depth tuned for clarity.
          </p>
          <div className="mt-3 flex items-center justify-between rounded-xl bg-slate-900/90 px-4 py-2 text-[0.7rem] text-sky-100 shadow-lg">
            <span>􀐚 Quick capture</span>
            <span className="text-sky-300">Now</span>
          </div>
        </div>
      </aside>

      <main className="flex-1 space-y-8">
        <section className="glass-pro bg-shimmer hover-zoom relative overflow-hidden rounded-[2.5rem] p-8 shadow-xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-sky-500/80">Dashboard</p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">Good morning, Doctor</h2>
              <p className="mt-2 max-w-xl text-sm text-slate-600">
                Seamlessly orchestrate patients, visits and labs with the refreshed Care Studio experience. Everything responds
                with the softness, depth and clarity inspired by Apple design language.
              </p>
            </div>
            <div className="flex items-center gap-4 rounded-3xl border border-white/40 bg-white/60 px-6 py-4 shadow-lg backdrop-blur-xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-200 to-blue-300 text-xl text-slate-900 shadow-inner">
                􀐿
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Next sync</p>
                <p className="text-lg font-semibold text-slate-900">12:45 PM</p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <article
              key={stat.label}
              className="hover-zoom glass-float relative overflow-hidden rounded-[2rem] p-6 text-slate-900"
            >
              <div className={`absolute inset-0 -z-10 bg-gradient-to-br opacity-80 blur-3xl transition duration-500 hover:opacity-100 hover:blur-2xl ${stat.accent}`} />
              <div className="text-xs uppercase tracking-[0.3em] text-slate-500/70">{stat.label}</div>
              <div className="mt-4 text-4xl font-semibold text-slate-900">{stat.value}</div>
              <p className="mt-3 text-sm text-slate-600">{stat.sublabel}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div className="glass-pro bg-white/60 rounded-[2rem] p-6 shadow-xl">
            <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Patient Queue</h3>
                <p className="text-sm text-slate-500">Live updates arrive as soon as patients check in at reception.</p>
              </div>
              <a
                href="/patients/new"
                className="glow-hover flex items-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-lg"
              >
                􀐚 Add patient
              </a>
            </header>

            <div className="mt-6 overflow-hidden rounded-2xl border border-white/30 bg-white/70 shadow-inner backdrop-blur-xl">
              <table className="min-w-full divide-y divide-slate-200/60 text-left text-sm">
                <thead className="bg-slate-50/60 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th scope="col" className="px-5 py-3 font-medium">
                      NIC
                    </th>
                    <th scope="col" className="px-5 py-3 font-medium">
                      Name
                    </th>
                    <th scope="col" className="px-5 py-3 font-medium">
                      Phone
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/50">
                  {isLoading ? (
                    <tr>
                      <td colSpan={3} className="px-5 py-6 text-center text-slate-500">
                        Loading patients…
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan={3} className="px-5 py-6 text-center text-red-500">
                        {error}
                      </td>
                    </tr>
                  ) : patients.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="px-5 py-6 text-center text-slate-500">
                        No patients yet.
                      </td>
                    </tr>
                  ) : (
                    patients.map((patient) => (
                      <tr key={patient.id} className="transition hover:bg-slate-50/70">
                        <td className="px-5 py-4 text-slate-600">{patient.nic || "—"}</td>
                        <td className="px-5 py-4">
                          <a
                            href={`/patients/${patient.id}`}
                            className="font-medium text-sky-600 hover:text-sky-700"
                          >
                            {formatPatientName(patient)}
                          </a>
                        </td>
                        <td className="px-5 py-4 text-slate-500">{patient.phone || "—"}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-6">
            <section className="glass-pro bg-white/60 rounded-[2rem] p-6 shadow-xl">
              <header className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Upcoming visits</h3>
                  <p className="text-sm text-slate-500">Preview the next three appointments in your day.</p>
                </div>
                <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-600">􀐿 Syncing</span>
              </header>

              <ul className="mt-6 space-y-4">
                {upcomingVisits.map((visit) => (
                  <li
                    key={visit.id}
                    className="hover-zoom flex items-center justify-between rounded-2xl border border-white/40 bg-white/70 px-4 py-3 text-sm shadow-inner backdrop-blur-xl"
                  >
                    <div>
                      <p className="font-semibold text-slate-900">{visit.name}</p>
                      <p className="text-xs text-slate-500">{visit.reason}</p>
                    </div>
                    <span className="text-sm font-semibold text-sky-600">{visit.time}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="glass-pro bg-gradient-to-br from-sky-100/70 to-blue-200/60 rounded-[2rem] p-6 shadow-xl">
              <h3 className="text-lg font-semibold text-slate-900">Quick actions</h3>
              <p className="mt-2 text-sm text-slate-600">
                Delightfully fluid controls for the tasks you repeat most. Tap into any workflow with a single click.
              </p>

              <div className="mt-5 space-y-3">
                {quickActions.map((action) => (
                  <a
                    key={action.href}
                    href={action.href}
                    className="hover-zoom block rounded-2xl border border-white/50 bg-white/70 px-4 py-3 text-sm text-slate-600 shadow-inner backdrop-blur-xl hover:text-slate-900"
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-3 text-slate-700">
                        <span className="text-lg text-blue-500">{action.icon}</span>
                        <span className="font-semibold">{action.title}</span>
                      </span>
                      <span className="text-xs text-slate-400">􀯻</span>
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-slate-500">{action.description}</p>
                  </a>
                ))}
              </div>
            </section>
          </div>
        </section>
      </main>
    </div>
  );
}

function formatPatientName(patient: Patient) {
  return `${patient.firstName ?? ""} ${patient.lastName ?? ""}`.trim() || "Unnamed patient";
}