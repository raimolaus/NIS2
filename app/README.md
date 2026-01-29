# NIS2 Abimees - Web Application

AI-toega veebipõhine platvorm NIS2 vastavuse haldamiseks.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local

# Push database schema
npm run db:push

# Start development server
npm run dev
```

Ava brauser: http://localhost:3000

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/             # Auth routes (login, signup)
│   ├── (dashboard)/        # Dashboard routes
│   ├── api/                # API routes
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Landing page
│   └── globals.css         # Global styles
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── chat/               # Chat components
│   ├── dashboard/          # Dashboard components
│   └── documents/          # Document components
├── lib/
│   ├── ai/                 # AI/Claude integration
│   │   ├── claude.ts       # Claude client
│   │   ├── prompts.ts      # Prompt library
│   │   └── parser.ts       # Response parsing
│   ├── db/
│   │   └── prisma.ts       # Prisma client
│   ├── auth/               # NextAuth config
│   └── utils.ts            # Utility functions
├── hooks/                  # React hooks
├── types/                  # TypeScript types
└── config/                 # Configuration
```

## 🗄️ Database

### Prisma Commands:

```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database (development)
npm run db:push

# Open Prisma Studio
npm run db:studio

# Create migration (production)
npx prisma migrate dev --name init
```

### Models:
- `User` - Kasutajad
- `Organization` - Organisatsioonid
- `Assessment` - Enesehindamised
- `Document` - Dokumendid
- `ActionItem` - Tegevusplaani ülesanded
- `Conversation` - AI vestlused
- `Message` - Vestluse sõnumid

## 🤖 AI Integration

### Claude API:

```typescript
import { chatCompletion } from '@/lib/ai/claude';

const response = await chatCompletion({
  messages: [{ role: 'user', content: 'Tere!' }],
  systemPrompt: SYSTEM_PROMPT,
  temperature: 0.7,
});
```

### Environment Variables:
- `ANTHROPIC_API_KEY` - Claude API key

## 🎨 UI Components (shadcn/ui)

### Installation:

```bash
npx shadcn@latest init

# Add components
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add dialog
```

## 🔐 Authentication (NextAuth.js)

### Setup:

```bash
# Generate secret
openssl rand -base64 32
```

Add to `.env.local`:
```
NEXTAUTH_SECRET=your-generated-secret
NEXTAUTH_URL=http://localhost:3000
```

## 💳 Payments (Stripe)

### Environment Variables:
```
STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### Test Cards:
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`

## 📝 NPM Scripts

```bash
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:push      # Push Prisma schema
npm run db:studio    # Open Prisma Studio
npm run db:generate  # Generate Prisma Client
```

## 🧪 Testing (tulevikus)

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e
```

## 🚀 Deployment

### Vercel:

1. Push to GitHub
2. Import project to Vercel
3. Add environment variables
4. Deploy

### Environment Variables (Production):
```
DATABASE_URL=postgresql://...
ANTHROPIC_API_KEY=sk-ant-api-...
NEXTAUTH_SECRET=...
NEXTAUTH_URL=https://yourdomain.com
STRIPE_PUBLIC_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NODE_ENV=production
```

## 📊 Monitoring

- **Sentry** - Error tracking
- **Vercel Analytics** - Performance
- **Plausible** - Privacy-friendly analytics

## 🐛 Troubleshooting

### Prisma Issues:
```bash
# Reset database
npx prisma migrate reset

# Generate client
npm run db:generate
```

### Build Errors:
```bash
# Clean .next folder
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Port Already in Use:
```bash
# Kill process on port 3000
npx kill-port 3000
```

## 📖 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [Anthropic API Docs](https://docs.anthropic.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

**Version:** 0.1.0
**Last Updated:** 2026-01-08
