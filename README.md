# rachel diaz 🏎️

My personal portfolio. Plain HTML, CSS, and JavaScript, no build step.

**Live:** https://rvch.dev

## Files

```
index.html      all the page content (Home, About, Experience, Projects, Shelf)
css/style.css   colors, fonts, layout
js/main.js      pixel art, page switching, photo loading, lights-out game
images/         your photos and screenshots
resume.pdf      your resume (add this yourself)
```

## Adding photos

Drop files into `images/` with these exact names and they show up automatically.
Until a file exists, its spot keeps the striped placeholder.

| File | Where it shows |
|---|---|
| `me.jpg` | Home page polaroid |
| `about.jpg` | About page polaroid |
| `shellhacks.jpg`, `cyberlaunch.jpg`, `demo-day.jpg`, `ucf.jpg`, `race-day.jpg` | Camera roll on Home |
| `sidequest.png` | SideQuest project |
| `menu-api.png` | Restaurant Menu API project |
| `animal-site.png` | Animal Welfare site project |

Want different camera roll photos or captions? Edit the `SNAPS` list at the top of `js/main.js`.
Keep images under ~500 KB each so the site loads fast.

## Placeholders

Anything with `class="ph"` gets a pink dashed underline. Search `index.html` for `ph"`,
replace the text, and remove the class.

## Changing colors

All colors live at the top of `css/style.css` under `:root` (light mode) and the dark mode blocks below it.

## Custom domain

The `CNAME` file points GitHub Pages at **rvch.dev**. DNS records at the registrar:

| Type | Name | Value |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | diazrachel.github.io |
