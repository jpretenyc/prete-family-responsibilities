# Prete Family Responsibilities — v5.0

A small, self-contained website that replaces the old 4-page Word document.
Three files, no build step, no internet required to run.

- **index.html** — the whole app (page, styles, and behavior). You don't edit this.
- **data.js** — all the content: chores, names, dates, dollar rules. **This is the file you edit.**
- **README.md** — this file.

## How to open it

Just **double-click `index.html`**. It opens in your browser and works completely
offline (it only reaches the internet to load nicer fonts; without internet it
uses your device's built-in fonts and looks fine).

On a phone, it's designed to be used with your thumb. Each kid taps their card to
see their list. Bookmark a kid's page — the address bar will show something like
`…/index.html#/hyrum`, and that link opens straight to that kid.

---

## How to edit chores (no coding needed)

Open **data.js** in any plain-text editor (Notepad works, or the editor of your
choice). Everything is written in plain words with lots of comments explaining
what each part is.

- Every chore is a line wrapped in `"quotes"`, ending with a comma. **Change the
  words inside the quotes.** Leave the quotes and the comma.
- To **add** a chore: copy an existing line, paste it below, change the words.
- To **remove** a chore: delete its whole line.
- The A / B / C duty lists live under `duties:`. The "every week" lists live
  under `baseline:` (there are two: `older` for Hyrum & Rosemary, `younger` for
  Felicity).

Save the file, then refresh the website. That's it.

**One rule:** keep the punctuation. If you delete a stray quote or comma the page
can go blank. If that happens, undo your last change (Ctrl+Z) and save again.

---

## How to change the rotation anchor

The A/B/C rotation is a repeating 3-week cycle. To re-sync it (say the schedule
ever drifts, or you want to reset which week is "Week 1"), edit this near the top
of **data.js**:

```js
cycleAnchor: { weekStart: "2026-08-03", cycleWeek: 2 },
```

- `weekStart` — pick **any Monday** (format `YYYY-MM-DD`).
- `cycleWeek` — say which week of the rotation (`1`, `2`, or `3`) that Monday is.

The app counts forward and backward from that point automatically, forever. You
never have to touch it again unless you want to change the pattern.

The rotation itself (who holds A, B, C in each week) is the `rotation:` block,
also in data.js, if you ever need to reshuffle who does what.

---

## How to add or remove a person

Everyone lives in the `kids:` list in **data.js**. Each person looks like this:

```js
{
  id: "hyrum",              // lowercase, no spaces — used internally
  name: "Hyrum",
  birthdate: "2010-05-21",  // ages & allowance are computed from this
  accent: "#33556E",        // their color
  accentName: "slate blue",
  dinnerNight: "Wednesday",
  baselineSet: "older",     // "older" or "younger" chore list
  withParent: false,        // true = does A/B duties with a parent
},
```

**To add someone:** copy one whole `{ … },` block, paste it into the list, and
change the details. Then add them to the `rotation:` weeks so they get a duty
track, and (optionally) give them a `dinnerNights:` slot and a bathroom in
`bathrooms:`. Ages and allowance calculate themselves from the birthdate.

**To remove someone:** delete their whole `{ … },` block, and remove their name
from the `rotation:` weeks and anywhere else they're listed.

Nothing is hardcoded to a specific number of kids — the home screen, money table,
and printouts all build themselves from whoever is in the list.

---

## Printing for the fridge

Scroll to the bottom of the home screen:

- **Print wall chart** — one landscape page: the 3×3 rotation grid (this week
  marked), a short key for A/B/C, and each kid's dinner night, bathroom, and
  allowance.
- **Print kid cards** — three portrait pages, one per kid, with empty checkboxes
  to fill in with a pen.

For best results use **Chrome or Edge** and, in the print dialog, turn on
"Background graphics" only if you want the accent rules to show (not required).
The page orientation is set automatically.

---

## Checking off with Mom / Dad

**Marking chores.** Each item has two buttons: **Done** and **N/A**. Tapping
either one counts as full credit — "N/A" is for a chore that genuinely didn't
need doing that week. Tap the same button again to clear it. (The deep-clean
"choose one" list works the same way: pick the one job you did, or "N/A — none
needed this week.")

**The Check-Off button.** At the bottom of each kid's list is a large
**"Check Off with Mom / Dad"** button. It opens a pre-filled text message with
that week's progress (their duty and baseline counts) so a parent can check them
off. If the parent phone numbers are present in `data.js`, the message is
pre-addressed; if they've been removed, it opens a blank message the kid can send
to Mom or Dad from their own contacts.

The check-off boxes are stored per-device (in the browser), which is why every
page says: *"This is your own tracker. Official check-off is still in person or
by text — with Mom or Dad."* Everything resets on its own when a new chore week
begins.

> **Privacy note:** the parent phone numbers live in **data.js**
> (`config.parents`). If this site is published to a **public** URL, those
> numbers become visible in the page's source to anyone with the link. If you
> plan to share the link widely, either remove the numbers from `data.js` (the
> Check-Off button still works — it just opens a blank message to address by
> hand) or keep the site local / unlisted.

---

## Publishing it to a web address (optional)

It already works as a plain file, so you don't have to publish anything. If you
want a link the kids can open from anywhere:

- **Netlify Drop** — go to app.netlify.com/drop and drag this whole folder onto
  the page. You get a URL in seconds. (Consider keeping the link unlisted — see
  the privacy note above about phone numbers.)
- **GitHub Pages** — create a repository, upload these three files, and enable
  Pages in the repo settings. Your site appears at a github.io address.

No changes to the files are needed either way.

---

## Testing the deadline states (for a parent who's curious)

You can preview any moment in time by adding `?now=` to the address before the
`#`, for example:

- `index.html?now=2026-08-09T14:59` → Sunday 2:59 PM = **Open**
- `index.html?now=2026-08-09T15:01` → Sunday 3:01 PM = **Downtime**
- `index.html?now=2026-08-10T00:01` → Monday 12:01 AM = **new week / Closed**

Remove the `?now=…` part to go back to real time.

---

## Assumptions I made

Where the brief left room for judgment, here's what I chose:

1. **Payment day.** The brief noted the old Saturday Greenlight payment now falls
   before the deadline, and suggested Sunday evening instead. I set
   `paymentDay: 0` (Sunday), after the credit window closes. It's a one-line
   config change in data.js if you'd rather move it back.

2. **The "Closed" state.** The rotation advances exactly at Monday midnight, so
   "past the deadline" and "a new week has started" happen at the same instant.
   To make the Closed state visible without scolding, the home screen shows a
   quiet *"A new week has begun — last week is closed"* acknowledgement for the
   first part of Monday (set by `newWeekGraceHours: 12` in data.js — the first 12
   hours of the new week). After that it settles into the calm normal "Open"
   view. Set it to `0` to skip the acknowledgement entirely.

3. **The illustrative yearly total** appears both on each kid's page (as the big
   motivating number at the top) and on the Money page. The brief said to make it
   the largest number "on the page for each child"; showing it on the kid's own
   page felt like the most motivating place, so it lives in both.

4. **Extra-jobs eligibility.** The additional-chore list is family-wide. I mapped
   each opportunity to the kids it realistically applies to: babysitting and
   "pick up Felicity" to Hyrum and Rosemary; "sheets and towels" to Hyrum; and
   "help Felicity with her chores" to Hyrum and Rosemary. Felicity's page shows a
   gentle "ask a parent about extra jobs" note instead. Adjust the `who:` lists
   in the `additional:` block of data.js to change this.

5. **Bathroom wording.** Even-numbered months are the older child's turn (Hyrum),
   odd months the younger's (Felicity), computed from the current month. The
   shared-bathroom line names whose turn it is so no one has to look it up.

6. **Choosing a deep-clean job.** The A-duty "choose one" deep-clean list is
   rendered as a single-select group — picking one job (or its "N/A" option)
   marks that requirement done and counts as one item in the progress total.

7. **Done / N/A check-off.** Every item can be marked **Done** or **N/A**, and
   both give full credit, per your request. "N/A" is there for weeks when a chore
   genuinely isn't needed.

8. **The week is labeled by its Sunday end** ("Week ending Sunday, Aug 9")
   rather than its Monday start. The tracker still resets on Monday internally;
   only the wording changed.

9. **No photo submission.** Photo attachments were removed at your request. Each
   kid's list ends with a single large **"Check Off with Mom / Dad"** button that
   texts a parent the week's progress.

10. **The home hero.** You asked for something splashier up top, so the home
    screen opens with a colorful NYC-skyline-at-dawn banner (One World Trade, the
    Empire State Building, the Chrysler spire) and the "In all labour there is
    profit" epigraph — a nod to early rising and honest work. It's the one
    deliberately bold, colorful moment; the rest of the site stays quiet and
    disciplined. The art is drawn in code (inline SVG), so it works offline with
    no image files to manage.

7. **Fonts.** Fraunces / Inter Tight / IBM Plex Mono load from Google Fonts for
   the intended look, with system-font fallbacks so the site still looks right
   with no internet.

8. **Best print experience** is in Chrome or Edge, which honor the automatic
   landscape/portrait page setup. Other browsers print fine but may not switch
   orientation on their own.
