Problems I met during the development:

1. neovim tresitter support for mdx is not ok
2. prettier will consider mdx as markdown file so that the comment block won't work after formatting
3. ~~the latest `@unocss/postcss` plugin can cause stucking at dev compiling~~

### Roadmap

#### Alpha

-   CI/CD - Vercel
-   Basic blogging framework based on Nextra
-   Layouts: post and page
-   Navbar and footer

#### 0.1.0 Beta

-   Dark mode
-   Layout: Post list page
-   Code highlighting
-   Pagination
-   Post management: draft or published, tags, categories, etc.

#### 0.1.0

-   Analytics
-   Friend-link page
-   MDX Image Component (patching Nextra static image)
    -   Caption
    -   Lightbox

#### 0.2.0

-   Table of contents
-   SEO and social media meta data

#### X

-   Layout: Photo gallery
-   Layout: The timeline
-   Search
-   404 Page
-   Comment system
-   Online Editing
-   MDX-biased images carousal lightbox

### To-do

-   [ ] `high` logo hovering opacity mask
-   [ ] `high` table of contents
-   [ ] `medium` link with icons, friends, migrating contents
-   [ ] `medium` meta data for SEO, Security, og, etc
-   [ ] `medium` CI: words spelling check, ethical check, etc.
-   [ ] `low` highlighting inline code in dark mode is buggy, word highlighting is not clear
-   [ ] `low` first load the website is day mode, then switch to dark mode after 1s, set a gentle background for eyes
-   [ ] `low` redirect component inside mdx
-   [ ] `low` search
-   [ ] `low` table is not fit the container 100%
-   [ ] `low` design the website icon/favicon
-   [ ] `low` external link icon (mask?) after pseudo element, align center, prevent line break
-   [ ] `low` profiling and speed optimization
-   [ ] `maybe` image popup overlay on click
-   [ ] `maybe` 404 page

### Completed

-   [x] figure caption
-   [x] incorrect color of code block background in dark mode
-   [x] heading anchor in mobile view (margin/padding)
-   [x] draft
-   [x] posts view pagination
-   [x] table heading font color is not inverted in dark mode
-   [x] code block highlighting
-   [x] code block dark scheme color not changed
-   [x] mdx styles are broken
-   [x] navs sorting priority: `order` in frontmatter for pages
-   [x] nav icon in mobile view

### New Feat

-   [ ] new layout for \_timeline page
