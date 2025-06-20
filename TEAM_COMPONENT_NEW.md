# Team Component Documentation

## Overview
The Team component displays team member information in a responsive grid layout using data from a JSON file. It supports both profile images and initials-based avatars with consistent styling.

## File Structure
- `src/components/Team.astro` - Main component file
- `src/data/team.json` - Team member data

## JSON Schema
Each team member object should follow this structure:

```json
{
  "id": 1,
  "name": "Full Name",
  "role": "Team Position",
  "initials": "FN", 
  "description": "Brief description of the member",
  "image": "https://example.com/image.jpg", // or null for initials
  "social": {
    "linkedin": "https://linkedin.com/in/username", // or "#" to hide
    "github": "https://github.com/username", // or "#" to hide
    "twitter": "https://twitter.com/username", // optional
    "email": "user@example.com"
  }
}
```

## Required Properties
- `id`: Unique identifier (number)
- `name`: Full name (string)
- `role`: Team position/title (string)
- `initials`: 2-3 character initials for avatar fallback (string)
- `description`: Brief bio/description (string)
- `image`: Profile image URL or null (string|null)
- `social`: Object containing social media links

## Social Media Support
The component supports:
- LinkedIn
- GitHub  
- Twitter
- Email

Set social links to "#" to hide specific social buttons.

## Styling Features
- Responsive grid layout (1 column mobile, 2 tablet, 3 desktop)
- DaisyUI card components with hover effects
- Ring-styled avatars for images
- Primary gradient backgrounds for initials
- Smooth hover animations with lift effect
- Social media buttons with hover states

## Image Handling
- If `image` is provided: displays the image in a circular avatar
- If `image` is null: displays initials in a gradient circle
- Images are automatically cropped to fit circular containers

## Adding New Members
1. Add a new object to `src/data/team.json`
2. Include all required properties
3. The component will automatically render the new member

## Customization
- Modify gradient colors in the Team.astro component
- Adjust grid breakpoints by changing Tailwind classes
- Update social media icons by modifying the `getSocialIcon` function
