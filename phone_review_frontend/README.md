# Phone Review Platform Frontend (Remotion)

This is the Remotion-based frontend for the Phone Review Platform, allowing users to:
- Browse featured and all phone review videos
- Search and filter reviews by title/author
- Watch video reviews (inline modal player)
- Submit new phone review videos using an upload modal
- Rate and comment on reviews
- Enjoy a modern, responsive, light-themed user experience

## Structure

- `src/App.tsx` - Main app with layout, state, and feature wiring
- `src/components/Theme.tsx` - Centralized theme tokens
- `src/components/Header.tsx` - Top bar with search and add review
- `src/components/FeaturedReviews.tsx` - Responsive featured review grid
- `src/components/VideoReviewList.tsx` - Grid of other reviews, rate/comment/video modal
- `src/components/ReviewModal.tsx` - Modal for submitting reviews

## Quick Start

```
npm install
npm run dev
```

You can now browse and interact with the Phone Review Platform UI.

## Style Guide

Uses the following theme colors:
- Primary: #1976D2 (Blue, header/cta)
- Secondary: #424242 (Muted gray)
- Accent: #FFC107 (Rating buttons/highlights)
- Responsive, modern layout using CSS-in-JS for demonstration purposes.

## License & Support

This project is demo frontend for a video review platform utilizing Remotion and React UI principles.

