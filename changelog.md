# Changelog
> *documenting changes and updates in this project here hehe* :D

14 Dec 2:01am
- add type pages and tag pages support, for indiviual links segregated into types, tags. Eg- user can go to "youtube" types page to find all the youtube links
- toggleSidebar button aligned with page headings
- added a very crucial feature: backend coldboots (if no req hits server in 15mins), so i added a loading page on root endpoint, so that **it doesn't take 50SECS ON LOGIN which is bad for UX**


6 Dec 2025 4:07am
- turns out, the package i was using for embedded link preview (`react-social-media-embed`), has an issue: the developer only published a CommonJS version, not an ESM version. 
+ fixed it by using Vite to properly transform it.