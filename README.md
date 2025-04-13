# YourEnergy website

This website is produced as an educational team assignment. It showcases the skills of implementing a website design taken from Figma into a structured Vite project. The scope of the project does not cover any backend implementation, but does include a number of interacting behaviors, like interaction with a given API and inegration of localStorage.


### Important links of the project:
- GitHub Live Page: https://ryabyy.github.io/goit_advancedjs_finproj_g4/
- GitHub repository: https://github.com/ryabyy/goit_advancedjs_finproj_g4
- Figma design: https://www.figma.com/file/1ifqGcQBIzMoc21yIqyV5q/Your-energy?type=design&node-id=205-6586&mode=design&t=M9PaDXqQsAqMNdQS-0
- Vite template: https://github.com/goitacademy/vanilla-app-template

### Features:
- Various API calls implementation
- Usage of localStorage
- Dynamic behavior of the main section
- Semantics according to HTML5 standards
- Connected external fonts
- Image optimization for faster load times
- Image optimization for high PPI screens
- All vector graphics packaged in a sprite
- Page favicon added

### Sections realized within the project:
- Header section
- Hero section
- Quote of the day section (w/ API & localStorage)
- Exercises section with filtering (w/ API)
- Favorites section (w/ API & localStorage)
- Exercise card with adding to favorites (w/ localStorage)
- Footer section with a subscription form (w/ API)
- Mobile overlay menu

### Installation and usage:
- Checking out the website is most convenient while simply viewing the Live Page provided above
- However, it's also possible to install the project locally to be able to make edits and adapt the project to other needs, steps are outlined below:
  1. The project uses Vite, which requires Node.js version 18+, and is (only) tested on LTS versions of Node.js. It can be downloaded here: https://nodejs.org/en/
  2. Clone the repository via `git clone https://github.com/ryabyy/goit_advancedjs_finproj_g4`
  3. In the project directory, run `npm install` in a terminal of choice
  4. Now the project is ready to run, there are two modes: dev and build, which use, correspondingly, `npm run dev` and `npm run build`:
    * It is recommended to use `npm run dev` for checking out the website or the changes made - so, during development. This mode would show an address in console, where the website is hosted locally (so it would start with 'localhost'); entering this address in a browser would get the webpage shown. To stop the hosting, make an interrupt `Ctrl+C` in the terminal.
    * If the project is ready, it can be built via `npm run build` (this is exactly what is performed on the live page linked above) - but beware of a need to update the line with "build" in **package.json** in the project's root directory, otherwise some paths would not be resolved properly. This mode produces the final bundled files and folders to be used, with an entry point in **index.html** and relevant resources linked in the **assets** folder.

### Used technologies:
Since the project is produced by a team, some of the used technologies might differ between members. Still, the following are the common tech used by the team:
- HTML - for markup
- CSS - for styles
- JavaScript - for various interactions, including UI, API and localStorage
- Vite bundler - for packaging the project for deployment
- Node.js - Vite uses it for bundling, also some additional packages used
- Modern-normalize - for common ground between browsers (in terms of CSS styles)
- Google Fonts - for a custom font used in the design
- Image optimization and packaging services: https://squoosh.app/, https://icomoon.io/, https://svgomg.net/
- Font conversion/optimization: https://webfont.yabe.land/en/misc/convert-ttf-woff2/
- Code validators: https://validator.w3.org/ & https://jigsaw.w3.org/css-validator/
- Page speed testing: https://pagespeed.web.dev/

### Authors:
The project is produced by Team #4, which consists of 10 people. For privacy reasons, their full names are not listed directly, but some of their accounts can be found on the **Contributors** page.
