6 Dec 2025 4:07am
- turns out, the package i was using for embedded link preview (`react-social-media-embed`), has an issue: the developer only published a CommonJS version, not an ESM version. 
trying to fix it using haiku on our side by telling Vite to properly transform it