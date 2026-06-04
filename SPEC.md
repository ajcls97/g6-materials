# G6 Teaching Materials Website - Build Spec

Create a clean, professional, teacher-facing static HTML website for organizing and browsing Grade 6 ESL teaching materials.

## Site Structure

```
index.html          - Home page with unit grid
about.html          - About page with teacher info
unit.html           - Template page for each unit (generated for U0-U8)
css/style.css       - All styles
js/main.js          - Navigation and interactivity
```

## Unit Topics (from Kid's Box 6 Teacher's Book)

| Unit | Topic | Key Language |
|------|-------|-------------|
| U0 | Introduction | Getting started, classroom language |
| U1 | Going to... | Future plans, "going to" structure |
| U2 | The Future | Predictions with will/won't |
| U3 | Stories | Past events, adventure vocabulary |
| U4 | Food & Recipes | How much/how many, cooking instructions |
| U5 | Under the Sea | Sea creatures, present perfect with for/since/still |
| U6 | Free Time | Quantifiers (some/any/no/every), hobbies |
| U7 | Dress Sense | Clothes vocabulary, may/might, describing people |
| U8 | Around the World | Countries/nationalities, present perfect with just/yet/already |

## Page Designs

### Home Page (index.html)
- Header: "G6 ESL Teaching Materials" with nav (Home | About)
- Subtitle: "Grade 6 Language Arts — Kid's Box 6"
- 9 unit cards in a responsive grid (3 columns on desktop, 2 on tablet, 1 on mobile)
- Each card shows: Unit number, Topic title, Key language summary
- Cards have hover effect (slight lift + shadow)
- Color-coded cards: each unit gets a distinct color from a cohesive palette
- Footer: "© 2026 Alex Stewart — Changshu Lunhua Foreign Language School"

### Unit Page (unit.html — template, generate one per unit)
- Same header/nav as home
- Breadcrumb: Home > Unit X
- Unit title and topic
- Key language summary box
- Materials section with file listings:
  - Lesson Plans (PPTX files from Lesson Plans folders)
  - Worksheets (PDF/DOCX files from Worksheets folders)
  - Quizzes (PDF files from Unit Quizzes)
  - Review Materials (from Week 16)
- Each file listed as a card with: filename, file type icon, download link
- Files should be COPIED into the website folder structure for self-contained hosting
- Back to top button

### About Page (about.html)
- Same header/nav
- Teacher profile card:
  - Name: Alex Stewart
  - Role: ESL Teacher
  - School: Changshu Lunhua Foreign Language School
  - Grade: 6 (Grade 6 Language Arts)
  - Textbook: Kid's Box 6 (Cambridge)
- Brief description of the course
- Contact placeholder (email field — leave as example@lunhua.edu.cn)

## Technical Requirements

- Pure HTML + CSS + vanilla JS (no frameworks)
- Fully responsive (mobile-first)
- All files self-contained in /Users/alexstewart/Documents/G6/website/
- Copy all PPTX, PDF, DOCX files from the G6 teaching materials into organized subfolders:
  - materials/lessons/ — all lesson PPTX files
  - materials/worksheets/ — all worksheet files
  - materials/quizzes/ — all quiz files
  - materials/reviews/ — review materials
- File links on unit pages should point to the copied files
- Clean, modern design: white background, subtle shadows, rounded corners
- Font: system fonts (no external font loading)
- Color palette: professional blues and teals with warm accents

## File Scanning

Scan these source folders for materials:
- /Users/alexstewart/Documents/G6/Term 1/ (all subfolders)
- /Users/alexstewart/Documents/G6/Term 1/Unit Quizzes/
- /Users/alexstewart/Documents/G6/Week 1/ through Week 16/
- /Users/alexstewart/Documents/G6/Science fair stuff/
- /Users/alexstewart/Documents/G6/G6 folder/

Organize files by unit number (U0-U8) based on folder names and filenames.
