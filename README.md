# United Stones website

A responsive Next.js App Router website for United Stones, built with JavaScript and plain CSS.

## Run locally

1. Install Node.js 18.18 or later.
2. From this folder, run `npm install`.
3. Run `npm run dev`, then open the local address shown in the terminal.

The phone number and WhatsApp links currently use `+91 00000 00000` / `910000000000`. Replace these placeholders in `app/page.js` when the business details are confirmed. Images load from Unsplash.

## Add featured YouTube videos

Open `components/FeaturedVideos.jsx` and add entries to the `featuredVideos` array:

```js
{ title: "Our latest project", url: "https://www.youtube.com/watch?v=YOUR_VIDEO_ID" },
```

Add as many as you want; the responsive section will appear below Categories once at least one valid YouTube link is present. Standard watch, short `youtu.be`, Shorts, and embed URLs are supported.
