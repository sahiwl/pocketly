# Pocketly Frontend

A modern React-based web application for saving, organizing, and sharing links and resources - your personal second brain.

## 🎯 Overview

Pocketly is a powerful resource management tool that serves as your personal knowledge base. The frontend provides an intuitive interface to save links, organize them with tags, view rich previews, and share curated collections through simple URLs.

### Key Features

 - JWT-based login and signup
 - Save and organize links with rich previews
- Store and manage any type of resource
 - Multi-tag support for content organization
 - Share collections via hash-based URLs
 - Beautiful interface built with Shadcn UI
- Fast data fetching with TanStack Query
- Works seamlessly across all devices

## 🛠️ Tech Stack

- React with TypeScript
- Shadcn UI + Tailwind CSS
- Zustand
- TanStack Query
- React Hook Form + Zod validation

<!--## 📁 Project Structure-->

<!--```
pocketly-fe/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # Shadcn UI components
│   │   ├── layout/         # Layout components
│   │   └── features/       # Feature-specific components
│   ├── pages/              # Route pages
│   │   ├── auth/           # Login/Signup pages
│   │   ├── dashboard/      # Main dashboard
│   │   ├── links/          # Link management
│   │   ├── content/        # Content management
│   │   ├── tags/           # Tag management
│   │   └── share/          # Public sharing view
│   ├── lib/                # Utilities and helpers
│   │   ├── axios.ts        # Axios instance configuration
│   │   └── utils.ts        # Helper functions
│   ├── types/              # TypeScript type definitions
│   │   └── dto.ts          # DTOs matching backend
│   ├── hooks/              # Custom React hooks
│   │   ├── useAuth.ts      # Authentication hook
│   │   ├── useLinks.ts     # Link management hook
│   │   ├── useContent.ts   # Content management hook
│   │   └── useTags.ts      # Tag management hook
│   ├── stores/             # Zustand stores
│   ├── App.tsx             # Main app component
│   └── main.tsx            # Entry point
├── public/                 # Static assets
├── .env                    # Environment variables
├── vite.config.ts          # Vite configuration
├── tailwind.config.js      # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies
```-->

##  Getting Started

### Prerequisites

- **Node.js** 18+ (recommended: 20+)
- **pnpm** (or npm/yarn)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd pocketly/pocketly-fe
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_API_BASE=http://localhost:8080/api
   ```

4. **Start the development server**
   ```bash
   pnpm dev
   ```

   The application will be available at `http://localhost:5173`

### Available Scripts

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Run linter
pnpm lint
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE` | Backend API base URL | `http://localhost:8080/api` |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


---

~sahiwl