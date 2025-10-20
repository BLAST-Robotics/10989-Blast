# 🎨 Animation System Documentation

Welcome to your new Astro-native animation system! This is 100% mobile-responsive and uses lightweight, modern libraries.

## 📦 What's Installed

- **Motion One** (5KB) - Lightweight animation library
- **AutoAnimate** - Automatic DOM animations
- **Astro View Transitions** - Built-in page transitions

## 🚀 Components Created

### 1. **AnimatedSection** - Fade in on scroll
```astro
import AnimatedSection from '../components/AnimatedSection.astro';

<AnimatedSection delay={0.2}>
  <h1>This fades in when you scroll to it!</h1>
</AnimatedSection>
```

**Props:**
- `class` - Additional CSS classes
- `delay` - Delay in seconds (default: 0)

---

### 2. **AnimatedCard** - Cards with hover & scroll animations
```astro
import AnimatedCard from '../components/AnimatedCard.astro';

<AnimatedCard class="card bg-base-100 shadow-xl" delay={0.1}>
  <div class="card-body">
    <h2>Animated Card!</h2>
  </div>
</AnimatedCard>
```

**Props:**
- `class` - Additional CSS classes
- `delay` - Delay in seconds

**Features:**
- Lifts up on hover
- Fades in on scroll
- Staggered animations

---

### 3. **AnimatedStats** - Counting numbers
```astro
import AnimatedStats from '../components/AnimatedStats.astro';

<AnimatedStats 
  value={100} 
  label="Team Members" 
  suffix="+" 
  duration={2}
/>
```

**Props:**
- `value` - Target number
- `label` - Description text
- `suffix` - Text after number (e.g., "+", "%")
- `duration` - Animation duration in seconds

---

### 4. **AnimatedButton** - Enhanced buttons with ripple effect
```astro
import AnimatedButton from '../components/AnimatedButton.astro';

<AnimatedButton 
  href="/about" 
  variant="primary" 
  size="lg"
>
  Click Me!
</AnimatedButton>
```

**Props:**
- `href` - Link (optional, makes it an `<a>` tag)
- `variant` - `primary` | `secondary` | `accent` | `ghost`
- `size` - `sm` | `md` | `lg`
- `class` - Additional CSS classes

**Features:**
- Ripple effect on click
- Lifts on hover
- Wave animation

---

### 5. **MagneticButton** - Cursor-following button
```astro
import MagneticButton from '../components/MagneticButton.astro';

<MagneticButton 
  href="/contact" 
  class="btn btn-primary"
>
  Follow Your Cursor
</MagneticButton>
```

**Features:**
- Button follows cursor when hovering
- Smooth magnetic effect
- Great for CTAs

---

### 6. **ParallaxSection** - Parallax scrolling
```astro
import ParallaxSection from '../components/ParallaxSection.astro';

<ParallaxSection speed={0.5}>
  <img src="/hero.jpg" alt="Background" />
</ParallaxSection>
```

**Props:**
- `speed` - Parallax speed (0.5 = half speed)
- `class` - Additional CSS classes

---

## 🎭 CSS Animation Classes

Add these classes to any element for instant effects:

### Hover Effects
```html
<!-- Scale up on hover -->
<div class="scale-hover">Grows on hover</div>

<!-- Lift with shadow -->
<div class="shadow-lift">Lifts up on hover</div>

<!-- Bounce -->
<div class="bounce-hover">Bounces on hover</div>

<!-- Rotate slightly -->
<div class="rotate-hover">Rotates on hover</div>

<!-- Shine effect -->
<div class="shine">Shines on hover</div>

<!-- Glow border -->
<div class="glow-border">Glowing border on hover</div>
```

### Continuous Animations
```html
<!-- Float up and down -->
<div class="float">Floating element</div>

<!-- Pulsing glow -->
<div class="pulse-glow">Pulsing glow</div>

<!-- Gradient text -->
<h1 class="gradient-text">Animated gradient text!</h1>

<!-- Morphing background -->
<section class="morph-bg">Animated background</section>
```

### Entry Animations
```html
<!-- Fade in with blur -->
<div class="blur-in">Blurs in</div>

<!-- Slide from left -->
<div class="slide-in-left">Slides from left</div>

<!-- Slide from right -->
<div class="slide-in-right">Slides from right</div>

<!-- Staggered items (automatically delays each child) -->
<div>
  <div class="stagger-item">Item 1</div>
  <div class="stagger-item">Item 2</div>
  <div class="stagger-item">Item 3</div>
</div>
```

---

## 📱 Mobile Responsive?

**YES! 100% mobile responsive!** ✅

All animations:
- Use hardware acceleration (GPU)
- Respect `prefers-reduced-motion`
- Work on all screen sizes
- Optimized for performance

---

## 🎯 Quick Start Examples

### Example 1: Animated Hero Section
```astro
---
import AnimatedSection from '../components/AnimatedSection.astro';
import AnimatedButton from '../components/AnimatedButton.astro';
---

<section class="hero min-h-screen morph-bg">
  <AnimatedSection class="hero-content text-center">
    <div>
      <h1 class="text-6xl font-bold gradient-text mb-6">
        Welcome to Blast Robotics
      </h1>
      <p class="text-xl mb-8">
        Innovation through robotics
      </p>
      <AnimatedButton 
        href="/about" 
        variant="primary" 
        size="lg"
        class="pulse-glow"
      >
        Learn More
      </AnimatedButton>
    </div>
  </AnimatedSection>
</section>
```

### Example 2: Animated Team Cards
```astro
---
import AnimatedCard from '../components/AnimatedCard.astro';
---

<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
  {team.map((member, i) => (
    <AnimatedCard 
      class="card bg-base-100 shadow-xl" 
      delay={i * 0.1}
    >
      <figure class="shine">
        <img src={member.image} alt={member.name} />
      </figure>
      <div class="card-body">
        <h2 class="card-title">{member.name}</h2>
        <p>{member.role}</p>
      </div>
    </AnimatedCard>
  ))}
</div>
```

### Example 3: Animated Statistics
```astro
---
import AnimatedStats from '../components/AnimatedStats.astro';
---

<div class="stats shadow">
  <AnimatedStats value={15} label="Team Members" suffix="+" />
  <AnimatedStats value={3} label="Competitions" />
  <AnimatedStats value={100} label="Success Rate" suffix="%" />
</div>
```

### Example 4: Magnetic CTA
```astro
---
import MagneticButton from '../components/MagneticButton.astro';
---

<MagneticButton 
  href="https://donate.com" 
  class="btn btn-warning btn-lg pulse-glow"
>
  <i class="bi bi-heart-fill"></i>
  Donate Now
</MagneticButton>
```

---

## 🔥 Best Practices

1. **Don't overdo it** - Use animations sparingly for impact
2. **Stagger delays** - Use different delays for multiple elements
3. **Test on mobile** - Always check mobile performance
4. **Combine effects** - Mix CSS classes with components
5. **Use semantic classes** - Add animations to enhance, not replace content

---

## 🎨 DaisyUI Enhancement

All DaisyUI components are automatically enhanced:
- Cards lift on hover
- Buttons have ripple effects
- Smooth transitions everywhere

---

## 📊 Performance

- **Motion One**: 5KB (vs Framer Motion's 30KB+)
- **AutoAnimate**: 2KB
- **Total overhead**: ~7KB
- **Hardware accelerated**: Uses GPU for smooth 60fps
- **No React needed**: Pure Astro/vanilla JS

---

## 🎬 View Transitions

Smooth page transitions are enabled! Just navigate between pages and enjoy the fade effects.

To customize per-page:
```astro
---
import { ViewTransitions } from 'astro:transitions';
---

<ViewTransitions />
```

---

## 🚀 Next Steps

1. **Add animations to your Hero** - Use `AnimatedSection` and `gradient-text`
2. **Enhance your Team page** - Use `AnimatedCard` for team members
3. **Add stats** - Use `AnimatedStats` for impressive numbers
4. **Upgrade CTAs** - Use `MagneticButton` or `AnimatedButton`
5. **Background effects** - Add `morph-bg` to sections

---

## 💡 Tips for Making Your Site "Remarkable"

1. **Hero Section**: Combine `gradient-text`, `morph-bg`, and `AnimatedSection`
2. **Cards**: Use `AnimatedCard` with `shine` class
3. **Buttons**: Replace regular buttons with `AnimatedButton` or `MagneticButton`
4. **Stats**: Show achievements with `AnimatedStats`
5. **Backgrounds**: Use `morph-bg` for dynamic sections
6. **Images**: Wrap in `ParallaxSection` for depth
7. **Text**: Use `gradient-text` for emphasis
8. **Icons**: Add `float` or `pulse-glow` to icons

---

## 🎭 Animation Philosophy

✅ **Subtle and Professional**
✅ **Enhances User Experience**
✅ **Mobile-First**
✅ **Performance-Optimized**
✅ **Accessible**

---

## 📚 Resources

- [Motion One Docs](https://motion.dev/)
- [AutoAnimate Docs](https://auto-animate.formkit.com/)
- [Astro View Transitions](https://docs.astro.build/en/guides/view-transitions/)

---

**Your site is now ready to be remarkable! 🚀**

For questions or custom animations, just ask!
