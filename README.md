# Blast Robotics Website

A modern, responsive website for Blast Robotics FIRST Robotics Competition team, built with Astro, Tailwind CSS v4, and DaisyUI 5.

## 🚀 Technology Stack

- **Astro** - Static site generator
- **Tailwind CSS v4** - Utility-first CSS framework
- **DaisyUI 5** - Component library for Tailwind CSS
- **TypeScript** - Type-safe JavaScript
- **PNPM** - Fast, disk space efficient package manager

## 🛠️ DaisyUI 5 Setup

This project uses DaisyUI 5 with Tailwind CSS v4, following the latest best practices:

### CSS Configuration (`src/index.css`)
```css
@import "tailwindcss";
@plugin "daisyui" {
  themes: light --default, dark --prefersdark;
  logs: false;
}
```

### Key Features
- **No `tailwind.config.js`** - Tailwind CSS v4 deprecates config files
- **Plugin-based configuration** - DaisyUI configuration done via CSS plugins
- **Theme switching** - Light/dark mode with theme controller
- **Semantic colors** - Using DaisyUI color names for consistent theming

## 🎨 DaisyUI 5 Components Used

- **Hero** - Landing section with call-to-action
- **Navbar** - Responsive navigation with dropdown
- **Cards** - Content containers with shadows and hover effects
- **Buttons** - Primary, outline, and ghost variants
- **Badges** - Feature highlights and labels
- **Stats** - Achievement display
- **Swap** - Theme toggle animation
- **Theme Controller** - Automatic dark/light mode switching

## 📦 Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## 🎯 DaisyUI 5 Best Practices

1. **Use semantic colors** - Prefer `primary`, `secondary`, `accent` over hardcoded colors
2. **Responsive design** - Use `sm:`, `md:`, `lg:` prefixes for breakpoints
3. **Component composition** - Combine DaisyUI components with Tailwind utilities
4. **Theme consistency** - Use `base-100`, `base-200`, `base-content` for consistent backgrounds
5. **Accessibility** - Include proper ARIA labels and semantic HTML

## 🌈 Theme Configuration

The site supports light and dark themes:
- **Light theme** - Default theme
- **Dark theme** - Activated via theme controller or system preference
- **Theme persistence** - User selection is remembered

## 📁 Project Structure

```
src/
├── components/
│   ├── Hero.astro          # Landing hero section
│   ├── Features.astro      # Program showcase
│   ├── Stats.astro         # Team achievements
│   ├── Team.astro          # Team member grid
│   └── Contact.astro       # Contact form
├── layouts/
│   └── Layout.astro        # Base layout with navigation
├── pages/
│   ├── index.astro         # Homepage
│   └── about.astro         # About page
└── index.css               # Tailwind and DaisyUI imports
```

## 🎨 Color Palette

Using DaisyUI's semantic color system:
- **Primary** - Robotics blue for main actions
- **Secondary** - Complementary accent color
- **Accent** - Special highlights
- **Base-100/200/300** - Background layers
- **Success/Warning/Error** - Status indicators

## 📱 Responsive Design

The site is fully responsive using DaisyUI and Tailwind utilities:
- Mobile-first approach
- Responsive navigation with hamburger menu
- Adaptive grid layouts
- Touch-friendly interactions

## 🔧 Development Notes

- DaisyUI 5 requires Tailwind CSS v4
- No configuration files needed
- Plugin-based customization
- Built-in theme system
- Optimized for production builds

## 🤝 Contributing

1. Follow DaisyUI 5 component patterns
2. Use semantic color names
3. Maintain responsive design
4. Test both light and dark themes
5. Keep accessibility in mind

## 📄 License

MIT License - Feel free to use this template for your robotics team!

---

Built with ❤️ for FIRST Robotics Competition teams everywhere.
