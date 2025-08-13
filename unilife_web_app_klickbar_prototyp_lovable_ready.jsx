import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";
import {
  LayoutDashboard,
  BookOpenCheck,
  NotebookPen,
  Goal,
  Quote,
  Users,
  Settings,
  Flame,
  CheckCircle2,
  Bell,
  Calendar,
  Play,
  Pause,
  Mic,
  Plus,
  Sparkles,
  ChevronRight,
} from "lucide-react";

// ---------- Helper Components ----------
const TabButton = ({ icon: Icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-2xl transition-colors ${
      isActive ? "bg-white/10 text-white" : "text-white/80 hover:bg-white/5"
    }`}
  >
    <Icon size={18} />
    <span className="font-medium">{label}</span>
  </button>
);

const Card = ({ children, className = "" }) => (
  <div className={`bg-white/80 backdrop-blur shadow-sm rounded-2xl p-5 ${className}`}>{children}</div>
);

const SectionTitle = ({ children, right = null }) => (
  <div className="flex items-center justify-between mb-3">
    <h3 className="text-sm tracking-wider uppercase text-slate-500">{children}</h3>
    {right}
  </div>
);

const ProgressPill = ({ value }) => (
  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
    <div className="h-2 bg-indigo-500 rounded-full" style={{ width: `${value}%` }} />
  </div>
);

// ---------- Demo Data ----------
const MODULES = [
  {
    id: 1,
    title: "Modul 1: Universella lagar & kvantfysik",
    desc:
      "Förstå ditt medvetna/undermedvetna, energi & frekvenser. Daglig tacksamhet.",
  },
  {
    id: 2,
    title: "Modul 2: Soul Vision – Att sätta mål",
    desc: "Skapa livsmanus, vision & Basecamp. Sätt mål från hjärtat.",
  },
  {
    id: 3,
    title: "Modul 3: Omprogrammera dina paradigm",
    desc: "Identifiera inre program, vänd kritikern, skapa affirmationer.",
  },
  {
    id: 4,
    title: "Modul 4: Att börja göra",
    desc: "Inspirerade + aligned actions. Vanor, momentum & frekvens.",
  },
  {
    id: 5,
    title: "Modul 5: Skräckväggen & Självsabotage",
    desc: "Navigera rädsla, igenom motståndet till genombrott.",
  },
];

const RADAR_DEFAULT = [
  { area: "Mental hälsa", score: 6 },
  { area: "Fysisk hälsa", score: 5 },
  { area: "Relationer", score: 7 },
  { area: "Hobby/fritid", score: 4 },
  { area: "Ekonomi", score: 5 },
  { area: "Karriär", score: 6 },
];

// ---------- Screens ----------
function Dashboard({ energy, setEnergy, progress, setTab }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <Card className="col-span-1 lg:col-span-2">
        <SectionTitle right={<button onClick={() => setTab("affirmations")} className="text-indigo-600 text-sm hover:underline">Byt dagens affirmation</button>}>Dagens fokus</SectionTitle>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold">“Jag är i full alignment och tar modiga steg idag.”</h2>
            <p className="text-slate-600 mt-2">Koppla till din vision. 2 min visualisering → 1 inspirerad action.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 rounded-xl bg-indigo-600 text-white shadow">Starta 2‑min visualisering</button>
            <button onClick={() => setTab("journal")} className="px-4 py-2 rounded-xl bg-slate-100">Öppna journal</button>
          </div>
        </div>
      </Card>

      <Card>
        <SectionTitle>Energi / Frekvens idag</SectionTitle>
        <div className="flex items-center gap-4">
          <Flame className="text-orange-500" />
          <input
            type="range"
            min={1}
            max={10}
            value={energy}
            onChange={(e) => setEnergy(Number(e.target.value))}
            className="w-full accent-indigo-600"
          />
          <span className="text-xl font-semibold w-10 text-center">{energy}</span>
        </div>
        <p className="text-slate-500 mt-2 text-sm">Logga dagligen för att se samband mellan energi, vanor och resultat.</p>
      </Card>

      <Card className="col-span-1 lg:col-span-2">
        <SectionTitle right={<button onClick={() => setTab("modules")} className="text-indigo-600 text-sm hover:underline">Visa alla</button>}>Modulprogress</SectionTitle>
        <div className="grid md:grid-cols-2 gap-4">
          {MODULES.map((m) => (
            <div key={m.id} className="p-4 rounded-xl border border-slate-200 bg-white">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h4 className="font-semibold">{m.title}</h4>
                  <p className="text-sm text-slate-600 mt-1">{m.desc}</p>
                </div>
                <button onClick={() => setTab("modules")} className="text-indigo-600 text-sm whitespace-nowrap">Fortsätt <ChevronRight className="inline" size={16} /></button>
              </div>
              <div className="mt-3"><ProgressPill value={progress[m.id] || 0} /></div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <SectionTitle>Livshjul (framtid)</SectionTitle>
        <div className="h-60">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={RADAR_DEFAULT} outerRadius={85}>
              <PolarGrid />
              <PolarAngleAxis dataKey="area" />
              <PolarRadiusAxis angle={30} domain={[0, 10]} />
              <Radar name="Nu" dataKey="score" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.3} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <button onClick={() => setTab("goals")} className="mt-3 text-indigo-600 text-sm hover:underline">Uppdatera livshjul & mål</button>
      </Card>
    </div>
  );
}

function Modules({ progress, setProgress }) {
  return (
    <div className="grid gap-4">
      {MODULES.map((m) => (
        <Card key={m.id}>
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <h4 className="text-lg font-semibold">{m.title}</h4>
              <p className="text-slate-600 mt-1">{m.desc}</p>
              <ul className="mt-3 text-sm text-slate-600 list-disc pl-5 space-y-1">
                {m.id === 1 && (
                  <>
                    <li>Video: Sinnet (medvetet/undermedvetet), energi & frekvens</li>
                    <li>Övning: Identifiera en begränsande tanke</li>
                    <li>Vana: Daglig tacksamhet</li>
                  </>
                )}
                {m.id === 2 && (
                  <>
                    <li>Övning: Skriv ditt Livsmanus + Basecamp (6–12 mån)</li>
                    <li>Livshjul: 0–10 per område</li>
                    <li>Identitetsarbete: Framtida jag</li>
                  </>
                )}
                {m.id === 3 && (
                  <>
                    <li>Reflektion: Avslöja paradigmen (trosuppfattningar/rädslor/vanor)</li>
                    <li>Verktyg: Affirmationer + visualisering</li>
                  </>
                )}
                {m.id === 4 && (
                  <>
                    <li>Plan: 2 aligned vanor i 30 dagar</li>
                    <li>Logg: Inspirerade actions</li>
                  </>
                )}
                {m.id === 5 && (
                  <>
                    <li>Karta: 5 faser – från X till genombrott</li>
                    <li>Identifiera självsabotage & motdrag</li>
                  </>
                )}
              </ul>
              <div className="flex items-center gap-3 mt-4">
                <button className="px-4 py-2 rounded-xl bg-indigo-600 text-white shadow">Öppna modul</button>
                <button
                  onClick={() => setProgress((p) => ({ ...p, [m.id]: Math.min(100, (p[m.id] || 0) + 25) }))}
                  className="px-4 py-2 rounded-xl bg-slate-100"
                >
                  Markera steg klart
                </button>
              </div>
            </div>
            <div className="w-48">
              <span className="text-xs text-slate-500">Progress</span>
              <ProgressPill value={progress[m.id] || 0} />
              <p className="mt-2 text-sm text-slate-500">{progress[m.id] || 0}% klart</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

function Journal({ entries, setEntries }) {
  const [form, setForm] = useState({ gratitude: "", intention: "", insight: "" });
  return (
    <div className="grid lg:grid-cols-3 gap-5">
      <Card className="lg:col-span-2">
        <SectionTitle right={<span className="text-xs text-slate-500">Auto-sparas lokalt</span>}>Daglig journal</SectionTitle>
        <div className="grid gap-3">
          <label className="text-sm">Tacksamhet</label>
          <textarea className="rounded-xl border p-3" rows={2} value={form.gratitude} onChange={(e) => setForm({ ...form, gratitude: e.target.value })} />
          <label className="text-sm">Intention idag</label>
          <textarea className="rounded-xl border p-3" rows={2} value={form.intention} onChange={(e) => setForm({ ...form, intention: e.target.value })} />
          <label className="text-sm">Största insikten</label>
          <textarea className="rounded-xl border p-3" rows={2} value={form.insight} onChange={(e) => setForm({ ...form, insight: e.target.value })} />
          <div className="flex items-center gap-3 mt-2">
            <button
              className="px-4 py-2 rounded-xl bg-indigo-600 text-white"
              onClick={() => {
                if (!form.gratitude && !form.intention && !form.insight) return;
                setEntries([{ ...form, ts: new Date().toISOString() }, ...entries]);
                setForm({ gratitude: "", intention: "", insight: "" });
              }}
            >
              Spara dagens journal
            </button>
            <button className="px-4 py-2 rounded-xl bg-slate-100">Ladda upp röstanteckning</button>
          </div>
        </div>
      </Card>

      <Card>
        <SectionTitle>Historik</SectionTitle>
        <div className="space-y-3 max-h-[420px] overflow-auto pr-2">
          {entries.length === 0 && <p className="text-slate-500 text-sm">Ingen journal sparad ännu.</p>}
          {entries.map((e, i) => (
            <div key={i} className="p-3 rounded-xl border">
              <div className="text-xs text-slate-500">{new Date(e.ts).toLocaleString()}</div>
              <div className="mt-2 text-sm">
                <p><span className="font-medium">Tacksamhet: </span>{e.gratitude || "—"}</p>
                <p><span className="font-medium">Intention: </span>{e.intention || "—"}</p>
                <p><span className="font-medium">Insikt: </span>{e.insight || "—"}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function Goals({ wheel = RADAR_DEFAULT }) {
  const [affirm, setAffirm] = useState([
    "Jag är trygg i att ta plats.",
    "Jag leder mig själv varje dag.",
    "Pengar flödar till mig när jag skapar värde.",
  ]);
  return (
    <div className="grid lg:grid-cols-3 gap-5">
      <Card className="lg:col-span-2">
        <SectionTitle right={<button className="text-indigo-600 text-sm">Visa mall för Livsmanus</button>}>Vision & Basecamp</SectionTitle>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm">Vision (12–36 mån)</label>
            <textarea className="rounded-xl border p-3 w-full h-36" placeholder="Skriv din målbild i nutid…" />
          </div>
          <div>
            <label className="text-sm">Basecamp (6–12 mån)</label>
            <textarea className="rounded-xl border p-3 w-full h-36" placeholder="Ex: Jag omsätter 100k/mån med drömkunder…" />
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-4 mt-4">
          {["Nästa steg", "Månadens fokus", "Veckans 3 actions"].map((t, idx) => (
            <div key={idx} className="rounded-xl border p-3">
              <div className="text-sm font-medium">{t}</div>
              <textarea className="mt-2 w-full h-24 p-2 border rounded-lg" placeholder="Skriv här…" />
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <SectionTitle right={<button className="text-indigo-600 text-sm">Redigera</button>}>Livshjul (drag 0–10)</SectionTitle>
        <div className="h-60">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={wheel} outerRadius={85}>
              <PolarGrid />
              <PolarAngleAxis dataKey="area" />
              <PolarRadiusAxis angle={30} domain={[0, 10]} />
              <Radar name="Framtid" dataKey="score" stroke="#22c55e" fill="#22c55e" fillOpacity={0.3} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-xs text-slate-500 mt-2">Tip: koppla varje område till 1 vana.</p>
      </Card>

      <Card className="lg:col-span-3">
        <SectionTitle right={<button className="px-3 py-1.5 rounded-xl bg-slate-100 text-sm flex items-center gap-2"><Plus size={16}/>Lägg till</button>}>Affirmationer</SectionTitle>
        <div className="grid md:grid-cols-3 gap-3">
          {affirm.map((a, i) => (
            <div key={i} className="rounded-xl border p-3 flex items-center justify-between">
              <span>{a}</span>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-lg bg-indigo-50 text-indigo-600"><Play size={16} /></button>
                <button className="p-2 rounded-lg bg-slate-100"><Mic size={16} /></button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function Affirmations() {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="grid lg:grid-cols-3 gap-5">
      <Card className="lg:col-span-2">
        <SectionTitle>Affirmationsträning</SectionTitle>
        <div className="rounded-2xl border p-6 flex items-center justify-between">
          <div>
            <div className="text-sm text-slate-500">Dagens affirmation</div>
            <div className="text-2xl font-semibold mt-1">Jag agerar från min vision, inte min rädsla.</div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setPlaying(!playing)} className="px-4 py-2 rounded-xl bg-indigo-600 text-white flex items-center gap-2">
              {playing ? <Pause size={16} /> : <Play size={16} />} Spela in/upp
            </button>
            <button className="px-4 py-2 rounded-xl bg-slate-100">Schemalägg påminnelse</button>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-3 mt-4">
          {["Jag är trygg i att ta betalt.", "Jag litar på processen.", "Jag lämnar alla med en känsla av ökning.", "Jag väljer mod framför bekvämlighet."].map((t, i) => (
            <div key={i} className="p-4 rounded-xl border">{t}</div>
          ))}
        </div>
      </Card>
      <Card>
        <SectionTitle>Frekvenshöjande lista</SectionTitle>
        <ul className="space-y-2 text-sm">
          {["10 min promenad i naturen", "Dans till 1 låt", "3 djupa andetag före möte", "Skicka tack‑meddelande"].map((x, i) => (
            <li key={i} className="flex items-center gap-2"><CheckCircle2 className="text-emerald-500" size={18} /> {x}</li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

function Community() {
  return (
    <div className="grid lg:grid-cols-3 gap-5">
      <Card className="lg:col-span-2">
        <SectionTitle>Gemenskap</SectionTitle>
        <div className="space-y-3">
          {[{
            name: "Elin",
            text: "Vecka 2 och jag vågade äntligen posta min story – 3 leads kom in!",
          },{
            name: "Samir",
            text: "Satte två vanor i modul 4. Känner redan mer fokus och lugn.",
          }].map((p, i) => (
            <div key={i} className="rounded-xl border p-4">
              <div className="text-sm text-slate-500">{p.name} • just nu</div>
              <div className="mt-1">{p.text}</div>
            </div>
          ))}
        </div>
      </Card>
      <Card>
        <SectionTitle>Grupputmaning</SectionTitle>
        <div className="rounded-xl border p-4">
          <div className="text-lg font-semibold">30 dagar – aligned actions</div>
          <p className="text-sm text-slate-600 mt-1">Checka in dagligen. 3 små steg / dag.</p>
          <button className="mt-3 px-4 py-2 rounded-xl bg-indigo-600 text-white">Gå med</button>
        </div>
      </Card>
    </div>
  );
}

function SettingsScreen() {
  const [email, setEmail] = useState(true);
  const [push, setPush] = useState(true);
  return (
    <div className="grid md:grid-cols-2 gap-5">
      <Card>
        <SectionTitle>Notiser</SectionTitle>
        <div className="space-y-3">
          <label className="flex items-center gap-3">
            <input type="checkbox" checked={email} onChange={() => setEmail(!email)} />
            E‑post: journal & affirmationer
          </label>
          <label className="flex items-center gap-3">
            <input type="checkbox" checked={push} onChange={() => setPush(!push)} />
            Web push: modulsteg & visualisering
          </label>
        </div>
      </Card>
      <Card>
        <SectionTitle>Konto</SectionTitle>
        <div className="space-y-3">
          <input className="w-full rounded-xl border p-3" placeholder="Ditt namn" />
          <input className="w-full rounded-xl border p-3" placeholder="E‑post" />
          <button className="px-4 py-2 rounded-xl bg-slate-100">Spara</button>
        </div>
      </Card>
    </div>
  );
}

// ---------- Main App ----------
export default function UnilifePrototype() {
  const [tab, setTab] = useState("dashboard");
  const [energy, setEnergy] = useState(6);
  const [progress, setProgress] = useState({ 1: 25, 2: 10, 3: 0, 4: 0, 5: 0 });
  const [entries, setEntries] = useState([]);

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, comp: <Dashboard energy={energy} setEnergy={setEnergy} progress={progress} setTab={setTab} /> },
    { id: "modules", label: "Moduler", icon: BookOpenCheck, comp: <Modules progress={progress} setProgress={setProgress} /> },
    { id: "journal", label: "Journal", icon: NotebookPen, comp: <Journal entries={entries} setEntries={setEntries} /> },
    { id: "goals", label: "Mål & Livshjul", icon: Goal, comp: <Goals /> },
    { id: "affirmations", label: "Affirmationer", icon: Quote, comp: <Affirmations /> },
    { id: "community", label: "Gemenskap", icon: Users, comp: <Community /> },
    { id: "settings", label: "Inställningar", icon: Settings, comp: <SettingsScreen /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-indigo-500 to-violet-500">
      {/* Shell */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid md:grid-cols-[260px_1fr] gap-6">
          {/* Sidebar */}
          <aside className="md:sticky md:top-6 h-fit rounded-3xl p-5 bg-white/10 border border-white/10 text-white shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-white/20 grid place-items-center"><Sparkles /></div>
              <div>
                <div className="font-semibold leading-tight">Unilife</div>
                <div className="text-xs text-white/70">Coach • Journal • Verktyg</div>
              </div>
            </div>
            <nav className="space-y-2">
              {tabs.map((t) => (
                <TabButton key={t.id} icon={t.icon} label={t.label} isActive={tab === t.id} onClick={() => setTab(t.id)} />
              ))}
            </nav>
            <div className="mt-6 p-4 rounded-2xl bg-white/5 text-white/80 text-sm">
              <div className="flex items-center gap-2"><Bell size={16}/> Påminnelse kl 08:00</div>
              <div className="mt-1">Visualisering + affirmationer</div>
            </div>
          </aside>

          {/* Content */}
          <main className="bg-white rounded-3xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-semibold text-slate-800">{tabs.find((t) => t.id === tab)?.label}</h1>
              <div className="flex items-center gap-2 text-slate-500">
                <Calendar size={18} /> {new Date().toLocaleDateString()}
              </div>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                {tabs.find((t) => t.id === tab)?.comp}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}
