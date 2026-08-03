/* ============================================================================
   PRETE FAMILY RESPONSIBILITIES — CONTENT FILE (data.js)
   ============================================================================

   THIS is the file you edit to change the site. You do NOT need to know how
   to code. Everything the site says — every chore, every name, every dollar
   rule — lives here. index.html is the machinery; this file is the content.

   A few ground rules so nothing breaks:
     • Keep the quotation marks. Every piece of text is wrapped in "quotes".
       Change the words INSIDE the quotes, leave the quotes themselves.
     • Keep the commas at the end of each line.
     • If your text contains an apostrophe (like "Mom's desk"), that's fine —
       it's already handled below because these use "double quotes".
     • Don't rename the labels on the left (config, kids, rotation, etc.).
       The app looks for those exact names.

   The whole thing is one big object called FAMILY. It ends with a matching
   closing brace and semicolon at the very bottom: };
   ============================================================================ */

const FAMILY = {

  /* ==========================================================================
     1) CONFIG — the knobs you're most likely to turn.
     ========================================================================== */
  config: {
    version: "5.0",

    // ---- The 3-week rotation anchor --------------------------------------
    // The rotation is a 3-week cycle. To re-sync it, pick ANY Monday and say
    // which week of the cycle (1, 2, or 3) that Monday is. The app counts
    // forward and backward from here automatically, forever.
    cycleAnchor: { weekStart: "2026-08-03", cycleWeek: 2 },

    // ---- The chore week & deadline ---------------------------------------
    weekStartsOn: 1,     // 1 = Monday. The chore week runs Mon 12:00am -> Sun.
    deadlineDay: 0,      // 0 = Sunday. (0=Sun,1=Mon,...6=Sat)
    deadlineHour: 15,    // 3:00 PM -- downtime starts here (no screens/friends)
    creditCutoffHour: 24,// 24 = midnight. Credit still given if done by then.
    paymentDay: 0,       // 0 = Sunday evening, after the credit window closes.

    // After the week rolls over at Monday midnight, the home screen shows a
    // quiet "a new week has begun / last week is closed" acknowledgement for
    // this many hours before it settles into the normal calm "Open" view.
    // This is the "Closed" state described in the brief. Set to 0 to skip it.
    newWeekGraceHours: 12,

    // ---- Money -----------------------------------------------------------
    allowanceMultiplier: 3,     // weekly allowance = age x 3
    savingsInterestRate: 0.15,  // 15% per annum (temporary; will likely drop)

    // Family-earned money (allowance + monthly chores) splits three ways:
    split: { tithing: 0.10, savings: 0.40, spending: 0.50 },
    // Money earned OUTSIDE the family (babysitting, gifts) uses a modified
    // waterfall — and this can be adjusted with a parent's approval:
    outsideSplit: { tithing: 0.10, savings: 0.30, spending: 0.60 },

    // Illustrative "additional / outside earnings" figure used ONLY in the
    // yearly earning-potential estimate on the Money screen (per child).
    additionalEarningsByKid: { hyrum: 300, rosemary: 200, felicity: 100 },

    // ---- Where photo proof gets sent -------------------------------------
    // These phone numbers are used to pre-address the Messages app. NOTE:
    // if you publish this site to a PUBLIC web address, these numbers become
    // publicly visible. Keep it local, or use an unlisted host. (See README.)
    parents: [
      { name: "Dad", phone: "+19174390653" },
      { name: "Mom", phone: "+19176050111" },
    ],
  },

  /* ==========================================================================
     2) THE KIDS
     Ages are computed from birthdate at runtime — never typed in. Allowance
     is age x 3, so it steps up on its own at each birthday.
     "accent" is the single color used on that child's own screens.
     ========================================================================== */
  kids: [
    {
      id: "hyrum",
      name: "Hyrum",
      birthdate: "2010-05-21",
      accent: "#33556E",
      accentName: "slate blue",
      dinnerNight: "Wednesday",
      baselineSet: "older",   // uses the Hyrum/Rosemary baseline list
      withParent: false,      // does duties independently
    },
    {
      id: "rosemary",
      name: "Rosemary",
      birthdate: "2012-10-25",
      accent: "#74374F",
      accentName: "plum",
      dinnerNight: "Tuesday",
      baselineSet: "older",
      withParent: false,
    },
    {
      id: "felicity",
      name: "Felicity",
      birthdate: "2017-05-16",
      accent: "#A4712A",
      accentName: "ochre",
      dinnerNight: "Monday",
      baselineSet: "younger", // uses Felicity's own baseline list
      withParent: true,       // does ALL duties with Mom or Dad
    },
  ],

  /* ==========================================================================
     3) THE ROTATION — which kid holds each duty track in each cycle week.
     Three tracks (A, B, C) rotate through the three kids on a 3-week cycle.
     Use the kid "id" values ("hyrum","rosemary","felicity").

              Week 1     Week 2     Week 3
       A      Felicity   Rosemary   Hyrum
       B      Hyrum      Felicity   Rosemary
       C      Rosemary   Hyrum      Felicity
     ========================================================================== */
  rotation: {
    1: { A: "felicity", B: "hyrum",    C: "rosemary" },
    2: { A: "rosemary", B: "felicity", C: "hyrum"    },
    3: { A: "hyrum",    B: "rosemary", C: "felicity" },
  },

  /* ==========================================================================
     4) THE DUTY TRACKS (A / B / C) — the rotating chores, in full.
     Each track has a short "summary" (4-6 words, shown on the home cards)
     and a list of "groups". Each group has a title and a list of items.
     A group may set type:"choose-one" to mean "pick one of these".
     ========================================================================== */
  duties: {

    A: {
      label: "A Duties",
      summary: "2J clean, shopping, kitchen trash",
      groups: [
        {
          title: "2J Maintain (as needed)",
          items: [
            "Ensure outdoor furniture is covered before rain",
            "Make 2J ready for guests (towels, sheets, furniture placement, tidy, patio readiness)",
            "Return 2J to normal after guests leave (towels and sheets in hamper, furniture returned, trash, patio)",
          ],
        },
        {
          title: "Shopping (as needed)",
          items: [
            "Go to Whole Foods or Trader Joe's to buy staples that we run out of (i.e. bread, milk, rice, sugar, salt, pepper, etc.). Anytime we run out of a staple, you must ask Mom or Dad first but then, upon approval, go to the store.",
          ],
        },
        {
          title: "2J Clean (weekly)",
          items: [
            "Bathroom (full clean)",
            "Dishes 2× per week: on the day of check-off in 2J, and on dinner night for whoever has dishes",
            "Wipe counters, tables, desks, shelves",
            "Vacuum everywhere; spot mop or wipe down floors",
            "Overall tidy and clean; trash and recycling; furniture and chairs put away",
            "Dust shelves, moldings, HVAC covers, art as needed",
            "Spray and wipe windows, patio glass doors, glass closet doors",
            "Clean inside microwave and stovetop as needed",
            "On the 2J patio: spray and sweep, take out trash, tidy, furniture",
            "Charge all four UE speakers (especially if battery is under 50% or blinking)",
          ],
        },
        {
          title: "Plus one deep-cleaning job, chosen by highest need",
          type: "choose-one",
          items: [
            "Wash couch covers",
            "Clean the Traeger (counts as an additional chore if 2+ hours)",
            "Mop floor",
            "Pressure wash or spray down the patio (additional chore if 2+ hours)",
            "Reorganize outdoor storage, kitchen cabinets, or closets",
            "Deep clean the oven, refrigerator, or ice maker",
            "Hang artwork or complete another household project",
            "Move and clean behind the couch, refrigerator, or Mom's desk",
          ],
        },
        {
          title: "17FG Kitchen Trash and Recycling (daily)",
          items: [
            "Take out trash and recycling; replace liners",
            "Break down and dispose of all cardboard boxes",
          ],
        },
      ],
    },

    B: {
      label: "B Duties",
      summary: "Dishes + wipe down, daily",
      groups: [
        {
          title: "Dishes and wipe down (daily, except your own dinner night)",
          items: [
            "Unload the dishwasher daily",
            "After dinner, gently encourage family members to bus their own dishes to the sink. If they haven't within 5 minutes, it's your job to (i) mention it to Mom and Dad and (ii) clear all plates and the table",
            "Do all dishes — run the dishwasher and hand-wash anything that can't go in it",
            "Wipe down all kitchen counters and the dining room table",
            "Your obligation follows wherever dinner happened, but check both apartments and handle what's needed",
            "To check off: dishes done 2+ times, and always when asked",
          ],
        },
      ],
    },

    C: {
      label: "C Duties",
      summary: "Tidy 17FG + terraces",
      groups: [
        {
          title: "Throughout the week",
          items: [
            "Tidy 17FG",
            "Tidy the living room, family room sides, lockers",
            "Spot vacuum",
            "Put away groceries and other deliveries",
            "Handle ad-hoc tidying requests from parents",
            "Charging — make sure “datteries” and iPads are put away and charging, and the charging station looks presentable",
          ],
        },
        {
          title: "1× per week",
          items: [
            "Full vacuum, including bedrooms, bathrooms, office",
            "Take out all small trashes and replace liners",
            "On the terraces: water and harvest plants, spray and sweep, trash, furniture",
            "Checking the mail and bringing it upstairs (unless Mom or Dad says to hold off)",
            "To check off: tidy done 2+ times, and always when asked",
          ],
        },
      ],
    },

  },

  /* ==========================================================================
     5) BASELINE CHORES — every week, on top of the rotation.
     Two sets: "older" (Hyrum & Rosemary) and "younger" (Felicity).
     ========================================================================== */
  baseline: {

    older: {
      label: "Baseline (every week)",
      items: [
        "Do your own laundry",
        "Make dinner on your assigned day",
        "Spend 15+ minutes tidying or improving your room (1× per week)",
        "Bus your own dishes after meals; scrape them and put them in the sink or dishwasher",
        "Ad-hoc chore (ask Mom or Dad; 15 minutes)",
        "Check off with Mom or Dad — in person or by text. If you don't check off, you're not done.",
      ],
    },

    younger: {
      label: "Baseline (every week)",
      items: [
        "Tidy your room (1× per week)",
        "Make dinner on Monday (with a parent)",
        "Put away all toys",
        "Put away all clean laundry",
        "Bus your own dishes after meals; scrape them and put them in the sink or dishwasher",
        "Help tidy the apartment by picking up and putting away 25 things",
        "Tidy and wipe down the art station",
        "Ad-hoc chore (ask Mom, Dad, or Rosemary; 15 minutes)",
      ],
    },

  },

  /* ==========================================================================
     6) BATHROOMS
     Rosemary keeps her own. Hyrum & Felicity share one, alternating monthly:
     even-numbered months -> the older child (Hyrum), odd months -> the
     younger (Felicity). The app computes whose turn it is from the month.
     ========================================================================== */
  bathrooms: {
    // Kids who simply have their own, with a fixed note:
    own: {
      rosemary: "Your own bathroom — tidy and wipe down weekly (not a deep clean).",
    },
    // The shared bathroom that alternates by month:
    shared: {
      evenMonthKid: "hyrum",     // even months -> older child
      oddMonthKid: "felicity",   // odd months  -> younger child
      note: "Shared bathroom (Hyrum & Felicity) — alternates monthly.",
    },
  },

  /* ==========================================================================
     7) DINNER NIGHTS. Sunday is intentionally left unassigned but kept here
     as an empty slot so it's easy to fill later — just add an id.
     ========================================================================== */
  dinnerNights: {
    Monday: "felicity",
    Tuesday: "rosemary",
    Wednesday: "hyrum",
    Thursday: "",
    Friday: "",
    Saturday: "",
    Sunday: "",   // unassigned
  },

  /* ==========================================================================
     8) MONTHLY CHORES
     ========================================================================== */
  monthly: {
    label: "Monthly chores",
    description: "Once a month, every member of the family works 90+ minutes on larger household projects. Assigned by 10am on Monthly Chore Day, due by 1pm.",
    examplesLabel: "Examples",
    examples: [
      "Cleaning windows",
      "Washing walls",
      "Cleaning the Traeger",
      "Pressure washing the patio and terraces",
      "Cleaning the oven",
      "Cleaning out the fridge",
      "Organizing closets",
      "Assembling furniture",
      "Hanging pictures",
    ],
  },

  /* ==========================================================================
     9) ADDITIONAL CHORES (for additional payment)
     "who" lists the kid ids the opportunity is offered to.
     ========================================================================== */
  additional: [
    { text: "Pick up Felicity from after-school activities and babysit as needed", who: ["hyrum", "rosemary"] },
    { text: "Sheets and towels laundry", who: ["hyrum"] },
    { text: "Occasional babysitting when requested", who: ["hyrum", "rosemary"] },
    { text: "Help Felicity with her chores other than tidying her room — encouragingly, and making sure the chores actually get done", who: ["hyrum", "rosemary"] },
  ],

  /* ==========================================================================
     10) MONEY — the words shown on the Money screen. The numbers themselves
     (allowance, earning potential) are computed from ages; this is the prose.
     ========================================================================== */
  money: {
    intro: "Weekly allowance is age × 3. Monthly chore payment is also age × 3, paid monthly at full completion — partial completion pays 0×, 1×, or 2× age. All payments land on Greenlight after the Sunday credit window closes.",
    splitLabels: {
      tithing: "Tithing — pay the Lord first",
      savings: "Savings — college, mission, large purchases. Parent approval to spend. Earns 15% per annum, compounded monthly (about 1.17%/month).",
      spending: "Spending — your discretion; spend it or move it to savings",
    },
    covers: "Kids cover their own non-essentials and recreation: toys, earrings, makeup, movies with friends, eating out, skateboarding gear, transportation around the city, games and apps. Kids can make their own purchases.",
    outside: "Money earned outside the family (babysitting gigs) or received as gifts runs through a modified waterfall — 10% tithing, 30% long-term savings, 60% spend anywhere — and can be adjusted with Mom or Dad's approval. Savings still earns the same 15% interest.",
    rateNote: "The 15% rate is temporary and will likely decline in the future.",
    potentialNote: "These totals are illustrative — a picture of a full year of steady work, not a guarantee.",
  },

  /* ==========================================================================
     11) PRINCIPLES (§7) — verbatim. Do not rewrite.
     ========================================================================== */
  principles: {
    epigraphs: [
      { text: "In all labour there is profit: but the talk of the lips tendeth only to penury", cite: "Proverbs 14:23" },
      { text: "Verily I say, men should be anxiously engaged in a good cause, and do many things of their own free will", cite: "Doctrine & Covenants 58:27" },
      { text: "…they were all equal, and they did all labor, every man according to his strength", cite: "Alma 1:26" },
      { text: "Talent is cheaper than table salt. What separates the talented individual from the successful one is a lot of hard work", cite: "Stephen King" },
    ],
    believeHeading: "In the Prete family, we believe:",
    believe: [
      "Hard work is critical to success and to building self-confidence",
      "We maintain a clean, tidy, organized home — a house of order, a house of God",
      "A place for everything, and everything in its place",
      "We pick up after ourselves as a way of life — coats, shoes, games, dishes in the sink",
      "We don't do the bare minimum; we identify and address needs as a way of life",
      "We work before we play; chores come before screens or recreation",
      "Delays impose hardship on everyone — nagging, mess, someone else doing your job",
      "We are all responsible for maintaining our home",
      "Each person's duty is 2–3 hours a week, often longer",
    ],
    circumstancesHeading: "Our circumstances require us to share responsibility:",
    circumstances: [
      "Our home is large — 17FG plus 2J, four bathrooms, three living rooms, two kitchens, two terraces and a large patio",
      "Our home is busy — two parents, four kids, friends, a large extended family, significant entertaining",
      "John and Emma have demanding full-time jobs and significant other responsibilities",
      "We have chosen not to hire a nanny or other household help",
      "City chores differ from rural or suburban ones — no lawn or yard work, but more errands, cooking, babysitting, and ad-hoc jobs",
      "Kids do chores both to build work habits and life skills that lead to success, and to keep our home functional and clean",
      "Assignments are not equal; they are calibrated to capability and available time",
    ],
    doNotHeading: "When asked to do a chore, we do not:",
    doNot: [
      "Delay or procrastinate",
      "Require payment or a reward",
      "Complain",
      "Say someone else should do it",
      "Assign it to someone else — if you are asked, you are responsible",
    ],
  },

  /* ==========================================================================
     12) THE FINE PRINT (§8, Appendix) — verbatim.
     ========================================================================== */
  fineprint: {
    sections: [
      {
        heading: "When someone else's mess costs you time",
        items: [
          "Under 3 minutes — that's part of baseline work",
          "3–10 minutes — tell Mom and Dad, who will address it through chores or allowance. You still do your chore.",
          "Over 10 minutes — tell Mom and Dad, who will address it with the other child and work out an arrangement with you",
        ],
      },
      {
        heading: "Timeliness and consequences",
        items: [
          "Weekly chores are due by 3:00 PM Sunday. If they aren't checked off by then, downtime starts — no screens, no friends, no recreation until you're done.",
          "You still get full credit and full allowance if you finish by 11:59 PM Sunday. After that, the week's allowance is forfeited.",
          "If you need to do a better job on a chore, you get one warning and a chance to fix it",
          "Chores are not optional. No weekly allowance in a week you fail to complete monthly chores.",
          "Repeated failure forfeits other privileges — phone, iPads, screens, 2J access, baking, time with friends",
          "Temporary exemptions (finals week, major project, real stress at school or seminary) are discussed and approved with Mom or Dad in advance",
        ],
      },
      {
        heading: "On allowance philosophy",
        items: [
          "Payments may or may not correspond to the effort or market value of a chore. Chores are primarily about fulfilling a baseline family duty and showing respect to others. Chores are not about earning money if you feel like it.",
        ],
      },
    ],
  },

};
