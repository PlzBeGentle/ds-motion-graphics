#!/bin/bash
# render.sh — Alle Clips als ProRes 4444 mit Alpha

CLIPS=(
  "01-HookTitle"
  "02-BuchgewinnErklaerung"
  "03-Zwangsverkauf"
  "04-JunckerZitat"
  "05-KrisenTimeline"
  "06-Weltkarte"
  "07-DreiSaeulen"
  "08-OutroChecklist"
  "09-Buzzword-BUCHGEWINNSTEUER"
  "09-Buzzword-ZWANGSVERKAUF"
  "09-Buzzword-ENTEIGNUNG"
  "09-Buzzword-TESTBALLON"
  "09-Buzzword-DAUERKRISENMODUS"
  "09-Buzzword-WELTEINKOMMEN"
  "09-Buzzword-KAPITALVERKEHRSKONTROLLEN"
  "09-Buzzword-BAIL-IN"
  "09-Buzzword-DIVERSIFIKATION"
  "09-Buzzword-SACHWERTE"
  "09-Buzzword-ROTE-LINIE"
)

mkdir -p output

for clip in "${CLIPS[@]}"; do
  echo "Rendering $clip..."
  npx remotion render src/index.ts "$clip" "output/${clip}.mov" \
    --codec=prores \
    --prores-profile=4444 \
    --pixel-format=yuva444p10le
  echo "Done: $clip"
done

echo ""
echo "All clips rendered to ./output/"
ls -lh output/
