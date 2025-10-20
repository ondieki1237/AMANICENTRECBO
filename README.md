# Amani Centre CBO Website

The Amani Centre website is the digital hub for a community-based organization dedicated to fostering peace, education, and community development in Tana River County. Built by Seth Ondieki, this platform showcases Amani Centre's initiatives, shares impactful stories through the Media Hub, and engages the community via programs like Amani Mashinani, Kijiji Connect, and Vox Radio.

Developed with Next.js 15.2.4, the site features a modern, responsive design powered by Tailwind CSS and Radix UI, ensuring accessibility and a seamless user experience.

--

## Table of Contents

- [Features](#features)  
- [Technologies](#technologies)  
- [Installation](#installation)  
- [Usage](#usage)  
- [Project Structure](#project-structure)  
- [Contributing](#contributing)  
- [Developer](#developer)  
- [License](#license)  

---

## Features

- **Responsive Design:** Optimized for desktop, tablet, and mobile using Tailwind CSS and react-responsive.  
- **Media Hub:** A dynamic blog section at `/blog` with a horizontal carousel for "More Stories" on post pages, powered by react-slick.  
- **Interactive Navigation:** A floating navbar (`FloatingIslandNavbar`) with scroll-aware behavior and mobile-friendly menu.  
- **Rich Text Editing:** Blog content creation with `@tiptap/react` for a robust editing experience.  
- **Authentication:** Secure user login and registration using `next-auth` and `bcryptjs`.  
- **Analytics:** User interaction tracking with `@vercel/analytics`.  
- **Image Hosting:** Optimized image delivery via Cloudinary.  
- **Dynamic Forms:** Contact and registration forms with `react-hook-form` and Zod validation.  
- **Animations:** Smooth transitions using `framer-motion` and `tailwindcss-animate`.  
- **SEO Optimization:** Metadata and Open Graph tags for enhanced search engine visibility.  

---

## Technologies

The Amani Centre website is built with the following technologies:

### Core Dependencies

- Next.js (15.2.4): React framework for server-side rendering and static generation.  
- React (18.3.0) & React DOM (18.3.0): Core UI libraries.  
- Tailwind CSS (3.4.17): Utility-first CSS framework.  
- Radix UI (e.g., `@radix-ui/react-accordion@1.2.2`, `@radix-ui/react-dialog@1.1.4`): Accessible UI components.  
- `react-slick` (0.30.3) & `slick-carousel` (1.8.1): Horizontal carousel for blog posts.  
- `framer-motion` (12.19.1): Animations and transitions.  
- `next-auth` (4.24.11): Authentication framework.  
- `mongoose` (8.16.0): MongoDB object modeling.  
- `cloudinary` (2.7.0): Cloud-based image management.  
- `react-hook-form` (7.54.1) & `zod` (3.24.1): Form handling and validation.  
- `@tiptap/react` (2.14.0): Rich text editor for blogs.  
- `lucide-react` (0.454.0): Icon library.  
- `@vercel/analytics` (1.5.0): Analytics tracking.  

### Dev Dependencies

- TypeScript (^5): Type safety.  
- PostCSS (^8.5) & Autoprefixer (^10.4.20): CSS processing.  
- `@types/node`, `@types/react`, `@types/react-dom`: TypeScript type definitions.  

*See `package.json` for the complete list.*

---

## Installation

To run the Amani Centre website locally:

### Clone the Repository

```bash
git clone https://github.com/ondieki1237/amanicentercbo.git
cd amanicentercbo
