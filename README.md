# OSA HR Solutions - Authentication Portal

A modern, premium authentication portal built with React.js featuring glassmorphism design, smooth animations, and dark/light theme support.

![React](https://img.shields.io/badge/React-19.0.0-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-7.3.1-646CFF?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?logo=tailwindcss)
![Supabase](https://img.shields.io/badge/Supabase-Auth-3ECF8E?logo=supabase)

## 🎯 About

This is a fully responsive login/signup authentication portal for OSA HR Solutions. The application features:

- **Premium UI Design**: Glassmorphism cards with animated gradient borders
- **Dark/Light Theme**: Automatic theme switching with localStorage persistence
- **Form Validation**: Real-time email, password, and name validation
- **Password Strength Meter**: Visual feedback for password security
- **Supabase Authentication**: Secure signup/login with email & password
- **Smooth Animations**: Floating background blobs, staggered reveals, and confetti effects

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.0.0 | Frontend UI framework |
| **Vite** | 7.3.1 | Build tool & dev server |
| **React Router DOM** | 7.2.0 | Client-side routing |
| **Tailwind CSS** | 4.0 | Utility-first CSS framework |
| **Supabase JS** | 2.49.1 | Authentication & database |
| **PostCSS** | 8.5.1 | CSS processing |

## 📁 Project Structure

```
web-react/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── AnimatedBackground.jsx
│   │   ├── GlassCard.jsx
│   │   ├── InputField.jsx
│   │   ├── Logo.jsx
│   │   ├── PasswordStrengthMeter.jsx
│   │   ├── SocialButtons.jsx
│   │   ├── ThemeToggle.jsx
│   │   └── TrustBadge.jsx
│   ├── hooks/              # Custom React hooks
│   │   ├── useAuth.js
│   │   ├── usePasswordStrength.js
│   │   └── useTheme.js
│   ├── lib/                # Utility libraries
│   │   ├── supabase.js
│   │   └── validation.js
│   ├── pages/              # Page components
│   │   ├── AuthPage.jsx
│   │   └── SuccessPage.jsx
│   ├── App.jsx             # Main app with routing
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles & Tailwind
├── .env                    # Environment variables
├── index.html              # HTML template
├── package.json            # Dependencies
├── postcss.config.js       # PostCSS configuration
├── tailwind.config.js      # Tailwind configuration
└── vite.config.js          # Vite configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd web-react
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
npm run build
```

The production build will be in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

## 📦 Dependencies

### Production Dependencies
```json
{
  "@supabase/supabase-js": "^2.49.1",
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "react-router-dom": "^7.2.0"
}
```

### Development Dependencies
```json
{
  "@tailwindcss/postcss": "^4.0.9",
  "@vitejs/plugin-react": "^4.3.4",
  "postcss": "^8.5.1",
  "tailwindcss": "^4.0.9",
  "vite": "^7.3.1"
}
```

## 🎨 Features

### Theme System
- Automatic dark mode detection
- Manual toggle with smooth transitions
- Preference saved to localStorage

### Form Validation
- Email format validation
- Password strength requirements (8+ characters)
- Name length validation (2+ characters)
- Real-time error feedback

### Authentication Flow
1. User fills signup/login form
2. Client-side validation runs
3. Supabase authentication triggered
4. Success page with confetti on completion

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 🔧 Configuration

### Supabase Setup

1. Create a project at [supabase.com](https://supabase.com)
2. Enable Email/Password authentication
3. Copy your project URL and anon key to `.env`

### Tailwind CSS

The project uses Tailwind CSS v4 with custom configuration:
- Custom color palette (primary blue `#2b4bee`)
- Custom animations (fadeIn, slideUp, float, etc.)
- Dark mode via CSS class selector

## 📄 License

This project is private and proprietary to OSA HR Solutions.

---

Built with ❤️ using React + Vite + Tailwind CSS
