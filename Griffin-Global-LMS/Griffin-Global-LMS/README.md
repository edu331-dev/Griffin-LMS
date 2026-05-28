# Griffin Global LMS

**Griffin Global Technologies — Professional Services**
Rising Stars Onboarding Programme

A corporate LMS delivering structured onboarding across slide presentations, rich content, practical videos, and scenario-based quizzes. Learners earn a verifiable digital badge on completion.

## Quick Start

```bash
# Install
pnpm install

# Run frontend (works fully offline — no backend needed)
PORT=3000 BASE_PATH=/ pnpm --filter @griffin-lms/web run dev
# Open http://localhost:3000
# Login with any @thejitu.com or @griffinglobaltech.com email

# Run with Docker (full stack)
docker compose up
```

## Key Commands

| Command | Purpose |
|---|---|
| `pnpm run typecheck` | Full TypeScript check |
| `pnpm --filter @griffin-lms/web run dev` | Start frontend dev server |
| `pnpm --filter @griffin-lms/api run dev` | Start API server |
| `pnpm --filter @griffin-lms/api-spec run codegen` | Regenerate API hooks from OpenAPI spec |
| `pnpm --filter @griffin-lms/db run push` | Push DB schema changes (dev only) |

## Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite 7, Tailwind CSS v4 |
| PDF viewer | pdf.js v5 (canvas-based) |
| Voiceover | Web Speech API |
| AI assistant | Context-aware course chatbot |
| Backend | Express 5, Node.js 24, TypeScript |
| Database | PostgreSQL + Drizzle ORM |

## Login
Restricted to `@thejitu.com` and `@griffinglobaltech.com` email domains.

---
*Griffin Global Technologies Professional Services · Rising Stars Onboarding Programme*
