# Niche of Truth Website Draft

Open `index.html` in a browser to preview the landing page.

NFC chip target URL:

```text
https://nicheoftruth.info/feedback.html
```

Current behavior:

- `index.html` is the public landing page.
- `feedback.html` captures name, phone, district, and feedback.
- Voice input uses browser speech recognition where available.
- `responses.html` loads recent entries from Supabase when read access is allowed.
- `supabase-schema.sql` contains the real database table structure for production.

Production note:

The feedback form is configured with the supplied Supabase project URL and publishable key. Keep the service-role key private and never place it in browser code.
