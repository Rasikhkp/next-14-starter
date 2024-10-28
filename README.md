# 🚀 Modern Next.js 14 Starter Kit

A batteries-included, type-safe Next.js 14 starter template with all the modern tooling you need to build scalable full-stack applications.

## ✨ Features

-   **Framework**: [Next.js 14](https://nextjs.org/) with App Router and Server Components
-   **Language**: [TypeScript](https://www.typescriptlang.org/) for type safety
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/) with beautiful pre-built components from [shadcn/ui](https://ui.shadcn.com/)
-   **Database**: [PostgreSQL](https://www.postgresql.org/) with [Drizzle ORM](https://orm.drizzle.team/) for type-safe database operations
-   **Authentication**: Secure authentication with [Auth.js](https://authjs.dev/)
-   **Forms**: Type-safe form handling with [React Hook Form](https://react-hook-form.com/)

## 📦 Getting Started

1. Clone the repository:

```bash
https://github.com/Rasikhkp/next-14-starter.git
cd next-14-starter
```

2. Install dependencies:

```bash
npm install
```

3. Copy the environment variables:

```bash
cp .env.example .env.local
```

4. Set up your PostgreSQL database and update the connection string in `.env.local`

5. Run database migrations:

```bash
npm run db-push
```

6. Start the development server:

```bash
npm run dev
```

Visit `http://localhost:3000` to see your application running.

## 🏗️ Project Structure

```
├── app/
│   ├── _components/
|   ├── api/
│   ├── (auth)/
│   └── (protected)/
├── actions/
│   ├── user.ts
│   └── utils.ts
├── components/
│   └── ui/
├── lib/
│   ├── utils.ts
│   └── zodSchema.ts
├── db/
|   ├── index.ts
│   └── schema.ts
├── public/
|    └── uploads/
└── hooks/
```

## 🔒 Authentication

This starter uses Auth.js for authentication. Supported providers include:

-   Email/Password

Configure your providers in `app/api/auth/[...nextauth]/route.ts`.

## 💾 Database

The project uses Drizzle ORM with PostgreSQL. Database schema is defined in `/db/schema.ts`.

### Running Migrations

```bash
# Generate migration
npm run db-generate

# Push migration to database
npm run db-migrate

# Or push without creating migration
npm run db-push
```

## 📝 Forms

Form handling is powered by React Hook Form with Zod validation. Example usage:

```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

export function LoginForm() {
    const form = useForm({
        resolver: zodResolver(schema),
    });
    // ...
}
```

## 🎨 UI Components

This starter includes a collection of pre-built components from shadcn/ui. Add new components using:

```bash
npx shadcn@latest add [component-name]
```

## 📚 Scripts

-   `npm run dev` - Start development server
-   `npm run build` - Build production bundle
-   `npm run start` - Start production server
-   `npm run lint` - Run ESLint
-   `npm run db-generate` - Generate database migrations
-   `npm run db-migrate` - Run database migrations
-   `npm run db-push` - Push schema to database without making migrations
-   `npm run studio` - Start drizzle studio
