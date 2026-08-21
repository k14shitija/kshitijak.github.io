#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/resume.pdf"
HTML="file://$ROOT/resume.html"
timeout 45 google-chrome \
  --headless=new \
  --disable-gpu \
  --no-sandbox \
  --user-data-dir="/tmp/chrome-resume-pdf" \
  --no-pdf-header-footer \
  --print-to-pdf="$OUT" \
  "$HTML"
echo "wrote $OUT"
