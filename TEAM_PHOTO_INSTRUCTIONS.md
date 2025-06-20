# Team Photo Instructions

## Adding Your Team Photo

To add your team photo as the hero background:

1. Save your team photo as `team-photo.jpg` in the `public` directory
2. The Hero component is already configured to use it as background
3. Make sure the image is high resolution (at least 1920x1080) for best results

## Current Setup

The Hero component now uses:
- Team photo as background with dark overlay for text readability
- Bootstrap Icons instead of custom SVG icons
- White text with drop shadows for visibility over the photo

## Alternative Team Photo Names

If you prefer a different filename, update the Hero component background-image URL in:
`src/components/Hero.astro` line 5

## Image Optimization Tips

- Use JPEG format for photos (smaller file size)
- Optimize the image to be under 500KB if possible
- Ensure good contrast between team members and background for the overlay effect
