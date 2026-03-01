export const TIMELINE_EVENTS = [
  { year: "2008", label: "FINANZKRISE", icon: "bank" },
  { year: "2013", label: "ZYPERN BAIL-IN", icon: "piggybank" },
  { year: "2015", label: "GRIECHENLAND", icon: "counter" },
  { year: "2024", label: "NL BUCHGEWINNSTEUER", icon: "flag" },
  { year: "202X", label: "DEIN LAND?", icon: "question" },
] as const;

export const DREI_SAEULEN = [
  {
    title: "PHYSISCHE EDELMETALLE",
    subtitle: "Ausserhalb Bankensystem",
  },
  {
    title: "INTERNATIONALE STRUKTUREN",
    subtitle: "Stabile Rechtsraeume",
  },
  {
    title: "REGIONALE DIVERSIFIKATION",
    subtitle: "Nicht alles in einer Rechtsordnung",
  },
] as const;

export const CHECKLIST_ITEMS = [
  "Keine Panik — aber keine Naivitaet",
  "Vermoegen JETZT strukturieren",
  "Vor dem Druck handeln",
] as const;

export const DIVERSIFICATION_TARGETS = [
  { name: "Liechtenstein", x: 960, y: 380, icon: "gold" },
  { name: "Schweiz", x: 940, y: 400, icon: "vault" },
  { name: "Singapur", x: 1420, y: 580, icon: "document" },
] as const;

export const PLAYBOOK_STEPS = [
  { icon: "balloon", text: "TESTBALLON STARTEN" },
  { icon: "eye", text: "REAKTION BEOBACHTEN" },
  { icon: "gear", text: "NACHJUSTIEREN & WIEDERKOMMEN" },
] as const;
