# ATS Resume Builder

Static GitHub Pages app for a one-column resume that a Workday-style parser can read.

## First project

Google **Product Manager I, Geo Roads and Safety Data**.

The default file is built from the public portfolio (Porsche Engineering ADAS fleet tools, Mercedes-Benz R&D EV integration, USC). It does not invent SQL, machine learning production work, or metrics that were never measured.

## Rules baked into the export

- Max **3** experience bullets, each written from Situation / Task / Action / Result
- One column, Calibri/Arial, standard headings: Skills, Experience, Education. No summary.
- No tables, icons, photos, headers, footers, or watermark layers
- Hyphens only (no em dashes, curly quotes, or zero-width characters)
- Stock generator phrases are flagged in the sidebar

## Use it

Open [resume-builder/index.html](index.html) on GitHub Pages, or open the file locally.

1. Edit contact and STAR fields if a fact is wrong.
2. Watch the ATS score and keyword list.
3. Print to PDF with **Letter**, headers and footers off.
4. Also download the `.txt` file and keep it for Workday paste.

## Tests

```bash
python3 tests/test_ats.py
```
