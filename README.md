# NIS2 Abimees

AI-toega veebipõhine platvorm, mis aitab väikestel ja keskmistel organisatsioonidel täita NIS2 direktiivi nõudeid.

## 📁 Projekti struktuur

```
NIS2/
├── docs/                      # Dokumentatsioon
│   ├── PRODUCT_VISION.md      # Toote visioon (täielik scope)
│   ├── MVP_SPEC.md            # MVP spetsifikatsioon
│   └── research/              # Turuuuringu materjalid
│       ├── kysimusik-perearst.md
│       └── kysimusik-apteek.md
├── app/                       # Next.js rakendus
│   ├── src/                   # Lähtekood
│   │   ├── app/               # Next.js App Router
│   │   ├── components/        # React komponendid
│   │   ├── lib/               # Utility funktsioonid
│   │   ├── types/             # TypeScript tüübid
│   │   ├── hooks/             # React hooks
│   │   └── config/            # Konfiguratsioon
│   ├── prisma/                # Prisma andmebaasi schema
│   ├── public/                # Staatilised failid
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.ts
│   └── next.config.ts
└── README.md                  # See fail
```

## 🚀 Kiirstart

### Eeldused

- Node.js 22+ ja npm
- PostgreSQL 16+ (või Supabase account)
- Anthropic API key (Claude AI)

### Installimine

1. **Klooni repo ja mine app kausta:**
   ```bash
   cd app
   ```

2. **Installi sõltuvused:**
   ```bash
   npm install
   ```

3. **Seadista keskkonna muutujad:**
   ```bash
   cp .env.example .env.local
   ```

   Täida `.env.local` failid vajalike väärtustega:
   - `DATABASE_URL` - PostgreSQL connection string
   - `ANTHROPIC_API_KEY` - Claude AI API key
   - `NEXTAUTH_SECRET` - Genereeri: `openssl rand -base64 32`

4. **Seadista andmebaas:**
   ```bash
   npm run db:push
   ```

5. **Käivita arendusserver:**
   ```bash
   npm run dev
   ```

6. **Ava brauser:**
   ```
   http://localhost:3000
   ```

## 📚 Dokumentatsioon

- **[Toote visioon](docs/PRODUCT_VISION.md)** - Täielik toote visioon ja roadmap (3-5 aastat)
- **[MVP spetsifikatsioon](docs/MVP_SPEC.md)** - MVP arenduse plaan ja tehnilised detailid
- **[Turuuring](docs/research/)** - Küsimustikud ja turuuuringu materjalid

## 🛠️ Tech Stack

### Frontend:
- **Next.js 15** - React framework (App Router)
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI komponendid (tuleb lisada)
- **React Query** - Server state management
- **Zustand** - Client state management

### Backend:
- **Next.js API Routes** - Serverless functions
- **Prisma** - ORM
- **PostgreSQL** - Database (Supabase)
- **NextAuth.js** - Authentication

### AI:
- **Claude 3.5 Sonnet** - Anthropic API
- **RAG** - Retrieval Augmented Generation (tulevikus)

### Maksed:
- **Stripe** - Payment processing

### Hosting:
- **Vercel** - Frontend + API
- **Supabase** - Database + Storage

## 📋 NPM Scripts

```bash
npm run dev          # Arendusserver (localhost:3000)
npm run build        # Production build
npm run start        # Production server
npm run lint         # ESLint
npm run db:push      # Prisma db push (ilma migratsioonita)
npm run db:studio    # Prisma Studio (andmebaasi UI)
npm run db:generate  # Genereeri Prisma Client
```

## 🎯 MVP Scope (Sprint 1-8, ~16 nädalat)

### Sprint 1: Foundation (2 nädalat) ✅ VALMIS
- [x] Repository setup
- [x] Database schema
- [x] Turuuuringu küsimustikud
- [x] Landing page (basic)
- [x] Signup/Login flow
- [x] Dashboard (empty)

### Sprint 2: Onboarding (2 nädalat) ✅ VALMIS
- [x] Organisatsiooni profiil
- [x] NIS2 kohaldatavuse loogika
- [x] 8-sammuline küsimustik

### Sprint 3: AI Vestlus (2 nädalat) ⏭️ VAHELE JÄETUD
- [ ] Chat UI
- [ ] Claude API integration
- [ ] Streaming responses
- [ ] Vestluste ajalugu

### Sprint 4: UI/UX Refactoring (2 päeva) ✅ VALMIS (7-8. aprill 2026)
- [x] shadcn/ui component system (11 komponenti)
- [x] Dashboard page refaktoreering
- [x] Onboarding lihtsustamine (8 → 3 sammu)
- [x] Assessment UI (40 küsimust, 6 sektsiooni)
- [x] Documents page (6 malli)
- [x] Risks page (maandamismeetmed)
- [x] Mock andmed testimiseks
- [x] ~3000+ rida koodi

### Sprint 5: Dokumendid (2 nädalat)
- [ ] Template'id
- [ ] AI genereerimine
- [ ] PDF/DOCX eksport
- [ ] Dokumentide haldus

### Sprint 6: Tegevusplaan (2 nädalat)
- [ ] Ülesannete genereerimine
- [ ] Prioritiseerimine
- [ ] Progressi jälgimine

### Sprint 7: Maksed (1 nädal)
- [ ] Stripe integratsioon
- [ ] Subscription management
- [ ] Billing page

### Sprint 8: Polish & Launch (2 nädalat)
- [ ] Bug fixes
- [ ] Mobile responsive
- [ ] SEO optimization
- [ ] Production deploy

## 💰 Ärimudel

- **FREE** - €0/igavesti (demo, ei salvesta)
- **STARTER** - €49/kuu (väike org, 1 kasutaja)
- **PROFESSIONAL** - €149/kuu (mitme asukoha, meeskond)
- **ENTERPRISE** - Custom (€500+/kuu)

## 🎯 Sihtgrupid (MVP)

1. **Perearstid** - 3-50 töötajat, ei oma IT-kompetentsi
2. **Apteegid** - üksik või keti osa, võimalik mitu asukohta
3. **Eraarstid** - hambaarstid, füsioterapeudid, väikeklinikud

## 📊 Edu mõõdikud (MVP)

### Product:
- Signup → Profiiil: >70%
- Profiil → Assessment: >60%
- Assessment completion: >80%
- Trial → Paid: >10%

### Business:
- Month 1: 10 klienti (€490 MRR)
- Month 3: 30 klienti (€1,470 MRR)
- Month 6: 50 klienti (€2,450 MRR)

## 🤝 Kaasautorile

### Arenduse töövoog:

1. **Loo uus branch:**
   ```bash
   git checkout -b feature/your-feature
   ```

2. **Tee muudatused ja testi:**
   ```bash
   npm run dev
   npm run lint
   ```

3. **Commit ja push:**
   ```bash
   git add .
   git commit -m "feat: add something"
   git push origin feature/your-feature
   ```

4. **Loo Pull Request**

### Code Style:
- TypeScript strict mode
- ESLint + Prettier
- Komponendid: `PascalCase`
- Funktsioonid: `camelCase`
- Failid: `kebab-case`

## 📞 Kontakt

**Arendaja:** [Sinu Nimi]
**Email:** [email]
**LinkedIn:** [link]

## 📄 Litsents

Privaatne projekt - kõik õigused kaitstud.

---

**Versioon:** 0.4.0 (Sprint 4 valmis)
**Viimati uuendatud:** 8. aprill 2026
**Staatus:** 🟡 UI/UX valmis, Backend pooleli

---

## 📢 UUENDUSED (8. aprill 2026)

### ✅ Sprint 4 Valmis
- **shadcn/ui Design System** - 11 komponenti, ühtne stiil
- **Dashboard Refaktoreerimine** - Kõik 5 lehte professionaalse väljanägemisega
- **Onboarding Lihtsustamine** - 8 sammu → 3 sammu
- **Assessment UI** - 40 küsimust, 6 sektsiooni
- **Documents Page** - 6 dokumendimalli
- **Risks Page** - Täielik refaktoreerimine + maandamismeetmed

**Vaata detailset logi:** [CHANGELOG.md](docs/CHANGELOG.md) ja [DEVELOPMENT_LOG.md](docs/DEVELOPMENT_LOG.md)
