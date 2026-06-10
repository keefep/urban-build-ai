// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  nitro: {
    // Override the default Cloudflare preset to target Vercel serverless functions.
    preset: "vercel",
  },
});
