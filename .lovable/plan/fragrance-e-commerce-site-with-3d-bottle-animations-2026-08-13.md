# Fragrance E-commerce Site with 3D Bottle Animations

## What the reference site (hydroflowdrink.com) actually does

I inspected its bundles. It is a Next.js site using **Three.js (react-three-fiber + drei)** for the product model and **GSAP + ScrollTrigger** (with SplitText and Flip) for all motion. There is no Spline or video trick — the can is a real 3D model rendered on a canvas that sits above the text layer.

The animation recipe, in order:

1. **Hero scroll-scrub product**: the model is pinned in the viewport; scroll position drives rotation, Y position and scale (`scrub: true`), so the product appears to float forward through the headline.
2. **Text-behind-product depth**: a giant display headline sits behind the canvas, so the bottle physically occludes the type — the strongest single effect on the page.
3. **Blur-in reveals** (`opacity-blur` class): every block fades in from `opacity 0, blur 10px, translateY`, animated on `opacity, transform, filter`.
4. **Split-text headline reveal**: headlines split into chars/words and staggered in.
5. **Pinned section hand-off**: as you scroll, the model moves to a new anchor (left/right) per section while the surrounding copy swaps — Flip-style layout transitions.
6. **Horizontal carousel on vertical scroll** for products/testimonials.
7. **Environment/HDRI lighting** with a soft studio reflection so the metal reads premium; subtle grid background + marquee logo bar.

## New animations I'd add for a luxury fragrance brand

- **Liquid glass material**: transmission/refraction shader on the bottle so the juice colour bends light — far more impressive than metal.
- **Cap-lift reveal**: on hero entry the cap floats off and settles back, hinting at the scent.
- **Scent trail particles**: soft golden particles drifting up from the neck, rotation-linked.
- **Colour-morphing juice**: hovering/selecting a fragrance variant tweens the liquid colour, the HDRI tint and the page accent tokens together.
- **Magnetic cursor + drag-to-rotate**: inertia-damped manual rotation on the product.
- **Bloom + depth-of-field** post-processing for a campaign-photography feel.
- **Notes pyramid orbit**: top/heart/base notes as labels orbiting the bottle, revealed on scroll.
- **Smooth momentum scrolling** (Lenis) so every scrubbed animation feels weighted.
- **Marquee + shimmer gold text** on section dividers, and a page-load curtain reveal that hands off into the hero.

## Build plan

**Stack**: TanStack Start + `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`, `gsap` (ScrollTrigger), `lenis`, Tailwind v4 tokens.

**Model**: `perfume_bottle.glb` uploaded to CDN assets and loaded with `useGLTF` inside a `ClientOnly` boundary (Three.js must not run during SSR).

**Design system** (`src/styles.css`): deep noir background, warm champagne-gold accent, ivory type, editorial serif display + clean sans body. All colours as oklch tokens.

**Page sections** (single-page storefront at `/`):
1. Sticky nav + cart button, load curtain reveal
2. Hero: pinned 3D bottle occluding an oversized brand headline, scroll-scrubbed rotation
3. Fragrance notes pyramid with orbiting labels
4. Variant selector: 3 fragrances, colour-morphing juice + accent tokens
5. Horizontal-scroll collection carousel with prices and add-to-cart
6. Craft/heritage split section with drag-to-rotate bottle
7. Testimonials marquee, FAQ accordion, footer CTA

**Notes**: mobile falls back to a lighter render (lower DPR, no post-processing) and reduced-motion users get static states. Cart is UI-only for now — no backend until you want real checkout.
