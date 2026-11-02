# UI review — Projects, header, and Process

1. **Photo carousel:** Removed the ellipse masks and vertical offset that made image tiles look curved. Tiles now have a consistent 4:3 frame, 12px radius, 16px gap, responsive `next/image` loading, a soft edge mask, and a transform-only marquee. It pauses on hover, focus, or a hidden tab. Reduced-motion users get a static scrollable row.
2. **Alignment:** Header, section headings, and collage use a 1200px container with 24px horizontal padding. The photo row bleeds across the viewport while its first tile aligns with the container at rest.
3. **Header:** Set a consistent 64px translucent-white header, subtle border, active-section state, 44px minimum navigation targets, labeled mobile menu, and 80px anchor offset. Removed scroll-based tint changes.
4. **Collage:** Rebuilt as a two-column, two-row grid with one static hero and two manually controlled photo tiles. All source photos are from the September project collection. Added visible, labeled arrows and progress, and moved the recent-project caption below the grid. The selected collage and carousel photos contain no visible text watermark; image rights still need client confirmation.
5. **Process:** Removed scroll opacity/scale effects and repeated labels. Cards retain equal width, use full-opacity text, darker body text, a 4:3 image, and a simple segmented progress indicator. Sticky stacking is disabled below 768px and under reduced motion.
6. **Checks:** TypeScript, scoped ESLint, and `next build` pass. The production homepage responds with HTTP 200. Visual inspection covered the production Projects and Process sections at desktop width. Exact CLS measurement, a reliable 390px browser capture, before screenshots, and a full-scroll recording were not produced in this environment.

## Scope and source notes

- Copy meaning, routes, SEO metadata, forms, and backend/API code were not changed by this UI review.
- The project images used here are local files in `public/recent-september-2026/`. No visible `ANTIGRAVITY` watermark was present in the selected files. Confirm reuse rights for these photos before publication.
