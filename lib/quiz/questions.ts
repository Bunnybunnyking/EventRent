import type { QuizQuestion } from "./types";

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "q1",
    prompt: "You're hosting. What's the first sign things are already going wrong?",
    answers: [
      {
        id: "q1-a0",
        label: "I made a list, then made a list for the list.",
        personalityWeights: {
          pinterest_drill_sergeant: 4,
          chaos_coordinator: 3,
        },
        rentalSignals: { stylePremium: 2, needsConsult: 1 },
      },
      {
        id: "q1-a1",
        label: "I checked the weather and immediately lost peace.",
        personalityWeights: { weather_worrier: 5 },
        rentalSignals: { weatherPrep: 4, needsConsult: 1 },
      },
      {
        id: "q1-a2",
        label: "I said 'small party' and now 84 people are coming.",
        personalityWeights: { guest_list_criminal: 5, chaos_coordinator: 3 },
        rentalSignals: { guestScale: 5, needsConsult: 2 },
      },
      {
        id: "q1-a3",
        label: "I planned the playlist before figuring out seating.",
        personalityWeights: { backyard_bro: 3, chair_shortage_menace: 3 },
        rentalSignals: { backyardSocial: 3, guestScale: 1 },
      },
      {
        id: "q1-a4",
        label: "I know exactly where the food goes and nothing else matters.",
        personalityWeights: { food_first_host: 5 },
        rentalSignals: { foodService: 4 },
      },
      {
        id: "q1-a5",
        label: "I started planning when the party was basically tomorrow.",
        personalityWeights: { last_minute_magician: 5, chaos_coordinator: 2 },
        rentalSignals: { urgencySimple: 4, needsConsult: 3 },
      },
    ],
  },
  {
    id: "q2",
    prompt: "What would your friends roast you for during party planning?",
    answers: [
      {
        id: "q2-a0",
        label: "Turning a backyard party into a corporate operation.",
        personalityWeights: {
          pinterest_drill_sergeant: 4,
          chaos_coordinator: 2,
        },
        rentalSignals: { stylePremium: 3, needsConsult: 1 },
      },
      {
        id: "q2-a1",
        label: "Saying 'people can stand' like that's a real seating plan.",
        personalityWeights: { chair_shortage_menace: 5, casual_liar: 2 },
        rentalSignals: { guestScale: 2 },
      },
      {
        id: "q2-a2",
        label: "Acting like clouds are personally attacking you.",
        personalityWeights: { weather_worrier: 5 },
        rentalSignals: { weatherPrep: 3 },
      },
      {
        id: "q2-a3",
        label: "Moving a table six inches because 'the vibe was off.'",
        personalityWeights: { pinterest_drill_sergeant: 4, casual_liar: 2 },
        rentalSignals: { stylePremium: 4 },
      },
      {
        id: "q2-a4",
        label: "Caring more about the buffet table than your own outfit.",
        personalityWeights: { food_first_host: 5 },
        rentalSignals: { foodService: 4 },
      },
      {
        id: "q2-a5",
        label: "Saying 'I got it' while clearly not having it.",
        personalityWeights: { last_minute_magician: 4, chaos_coordinator: 3 },
        rentalSignals: { urgencySimple: 3, needsConsult: 2 },
      },
    ],
  },
  {
    id: "q3",
    prompt: "Pick your toxic hosting trait.",
    answers: [
      {
        id: "q3-a0",
        label: "I invite emotionally, not mathematically.",
        personalityWeights: { guest_list_criminal: 5, chaos_coordinator: 2 },
        rentalSignals: { guestScale: 4 },
      },
      {
        id: "q3-a1",
        label: "I trust the weather app for 11 seconds, then panic.",
        personalityWeights: { weather_worrier: 5 },
        rentalSignals: { weatherPrep: 4 },
      },
      {
        id: "q3-a2",
        label: "I think extra chairs are optional until people arrive.",
        personalityWeights: { chair_shortage_menace: 5 },
        rentalSignals: { guestScale: 2 },
      },
      {
        id: "q3-a3",
        label: "I want it casual, but also perfect, but also effortless.",
        personalityWeights: {
          casual_liar: 4,
          pinterest_drill_sergeant: 3,
        },
        rentalSignals: { stylePremium: 3, needsConsult: 2 },
      },
      {
        id: "q3-a4",
        label: "I believe food solves 90% of social problems.",
        personalityWeights: { food_first_host: 5 },
        rentalSignals: { foodService: 4 },
      },
      {
        id: "q3-a5",
        label: "I procrastinate and call it 'working well under pressure.'",
        personalityWeights: { last_minute_magician: 5 },
        rentalSignals: { urgencySimple: 4, needsConsult: 2 },
      },
    ],
  },
  {
    id: "q4",
    prompt: "Your group chat role is…",
    answers: [
      {
        id: "q4-a0",
        label: "The planner with screenshots, notes, and mild control issues.",
        personalityWeights: {
          pinterest_drill_sergeant: 3,
          family_group_chat_survivor: 3,
          chaos_coordinator: 2,
        },
        rentalSignals: { stylePremium: 2, needsConsult: 1 },
      },
      {
        id: "q4-a1",
        label: "The one who says 'this is gonna be sick' with zero logistics.",
        personalityWeights: { backyard_bro: 4, last_minute_magician: 3 },
        rentalSignals: { backyardSocial: 4, urgencySimple: 2 },
      },
      {
        id: "q4-a2",
        label: "The one asking, 'What if it rains?' three weeks early.",
        personalityWeights: { weather_worrier: 5 },
        rentalSignals: { weatherPrep: 4 },
      },
      {
        id: "q4-a3",
        label: "The one asking what food we're having before anything else.",
        personalityWeights: { food_first_host: 5 },
        rentalSignals: { foodService: 3 },
      },
      {
        id: "q4-a4",
        label: "The one accidentally inviting six more people.",
        personalityWeights: { guest_list_criminal: 5, chaos_coordinator: 2 },
        rentalSignals: { guestScale: 4 },
      },
      {
        id: "q4-a5",
        label: "The one replying late with 'wait what time is it?'",
        personalityWeights: {
          last_minute_magician: 3,
          family_group_chat_survivor: 4,
        },
        rentalSignals: { urgencySimple: 3, needsConsult: 1 },
      },
    ],
  },
  {
    id: "q5",
    prompt: "If your party had a warning label, what would it say?",
    answers: [
      {
        id: "q5-a0",
        label: "Guest count may double without notice.",
        personalityWeights: { guest_list_criminal: 5, chaos_coordinator: 2 },
        rentalSignals: { guestScale: 5 },
      },
      {
        id: "q5-a1",
        label: "Host assumes vibes can replace planning.",
        personalityWeights: { casual_liar: 3, backyard_bro: 3 },
        rentalSignals: { backyardSocial: 3, needsConsult: 2 },
      },
      {
        id: "q5-a2",
        label: "Weather anxiety included.",
        personalityWeights: { weather_worrier: 5 },
        rentalSignals: { weatherPrep: 4 },
      },
      {
        id: "q5-a3",
        label: "Photos must look good or host may spiral.",
        personalityWeights: { pinterest_drill_sergeant: 5 },
        rentalSignals: { stylePremium: 5 },
      },
      {
        id: "q5-a4",
        label: "Food table is carrying the entire event.",
        personalityWeights: { food_first_host: 5 },
        rentalSignals: { foodService: 5 },
      },
      {
        id: "q5-a5",
        label: "Planning began emotionally, not logistically.",
        personalityWeights: {
          chaos_coordinator: 4,
          casual_liar: 2,
          last_minute_magician: 2,
        },
        rentalSignals: { needsConsult: 4 },
      },
    ],
  },
  {
    id: "q6",
    prompt: "What is your most likely day-of-party panic?",
    answers: [
      {
        id: "q6-a0",
        label: "Where are all these people going to sit?",
        personalityWeights: { chair_shortage_menace: 5, guest_list_criminal: 2 },
        rentalSignals: { guestScale: 3 },
      },
      {
        id: "q6-a1",
        label: "Why does the sky look like that?",
        personalityWeights: { weather_worrier: 5 },
        rentalSignals: { weatherPrep: 5 },
      },
      {
        id: "q6-a2",
        label: "The food table looks like a yard sale.",
        personalityWeights: { food_first_host: 3, chaos_coordinator: 3 },
        rentalSignals: { foodService: 4, stylePremium: 2 },
      },
      {
        id: "q6-a3",
        label: "This setup does not look like the picture in my head.",
        personalityWeights: { pinterest_drill_sergeant: 5, casual_liar: 2 },
        rentalSignals: { stylePremium: 5 },
      },
      {
        id: "q6-a4",
        label: "We need more ice, more chairs, and possibly an adult.",
        personalityWeights: {
          chaos_coordinator: 4,
          backyard_bro: 2,
          chair_shortage_menace: 2,
        },
        rentalSignals: { guestScale: 3, urgencySimple: 2 },
      },
      {
        id: "q6-a5",
        label: "I forgot people need shade.",
        personalityWeights: {
          weather_worrier: 3,
          last_minute_magician: 3,
          chair_shortage_menace: 2,
        },
        rentalSignals: { weatherPrep: 3, urgencySimple: 2 },
      },
    ],
  },
  {
    id: "q7",
    prompt: "Pick your emotional support object.",
    answers: [
      {
        id: "q7-a0",
        label: "A notes app checklist with subcategories.",
        personalityWeights: {
          pinterest_drill_sergeant: 4,
          chaos_coordinator: 2,
        },
        rentalSignals: { stylePremium: 2 },
      },
      {
        id: "q7-a1",
        label: "A weather app you refresh like a stock ticker.",
        personalityWeights: { weather_worrier: 5 },
        rentalSignals: { weatherPrep: 4 },
      },
      {
        id: "q7-a2",
        label: "A cooler full of drinks and questionable confidence.",
        personalityWeights: { backyard_bro: 5 },
        rentalSignals: { backyardSocial: 4 },
      },
      {
        id: "q7-a3",
        label: "A Pinterest board with unrealistic expectations.",
        personalityWeights: {
          pinterest_drill_sergeant: 4,
          casual_liar: 3,
        },
        rentalSignals: { stylePremium: 5 },
      },
      {
        id: "q7-a4",
        label: "A tray of food that could fix the whole mood.",
        personalityWeights: { food_first_host: 5 },
        rentalSignals: { foodService: 4 },
      },
      {
        id: "q7-a5",
        label: "A phone at 4% battery and no plan.",
        personalityWeights: { last_minute_magician: 5 },
        rentalSignals: { urgencySimple: 5, needsConsult: 3 },
      },
    ],
  },
  {
    id: "q8",
    prompt: "What sentence sounds most like you?",
    answers: [
      {
        id: "q8-a0",
        label: "It's casual, but I still want it to look nice.",
        personalityWeights: {
          casual_liar: 4,
          pinterest_drill_sergeant: 3,
        },
        rentalSignals: { stylePremium: 3 },
      },
      {
        id: "q8-a1",
        label: "We probably need more chairs.",
        personalityWeights: { chair_shortage_menace: 5 },
        rentalSignals: { guestScale: 2 },
      },
      {
        id: "q8-a2",
        label: "I don't trust the forecast.",
        personalityWeights: { weather_worrier: 5 },
        rentalSignals: { weatherPrep: 4 },
      },
      {
        id: "q8-a3",
        label: "As long as the food is good, we're fine.",
        personalityWeights: { food_first_host: 5 },
        rentalSignals: { foodService: 3 },
      },
      {
        id: "q8-a4",
        label: "Let's make it a real party.",
        personalityWeights: { backyard_bro: 5 },
        rentalSignals: { backyardSocial: 4, guestScale: 2 },
      },
      {
        id: "q8-a5",
        label: "Can we still pull this off by Saturday?",
        personalityWeights: { last_minute_magician: 5, chaos_coordinator: 2 },
        rentalSignals: { urgencySimple: 5, needsConsult: 2 },
      },
    ],
  },
  {
    id: "q9",
    prompt: "What would save your party the fastest?",
    answers: [
      {
        id: "q9-a0",
        label: "Someone telling me what size tent I actually need.",
        personalityWeights: {
          weather_worrier: 2,
          pinterest_drill_sergeant: 2,
          chaos_coordinator: 2,
        },
        rentalSignals: { needsConsult: 4, weatherPrep: 1 },
      },
      {
        id: "q9-a1",
        label: "Enough tables and chairs before people judge me.",
        personalityWeights: { chair_shortage_menace: 4, guest_list_criminal: 2 },
        rentalSignals: { guestScale: 4 },
      },
      {
        id: "q9-a2",
        label: "Sidewalls and a rain plan that is not denial.",
        personalityWeights: { weather_worrier: 5 },
        rentalSignals: { weatherPrep: 5 },
      },
      {
        id: "q9-a3",
        label: "Lighting, linens, and a layout that looks intentional.",
        personalityWeights: { pinterest_drill_sergeant: 5 },
        rentalSignals: { stylePremium: 5 },
      },
      {
        id: "q9-a4",
        label: "Buffet tables and a food setup that makes sense.",
        personalityWeights: { food_first_host: 5 },
        rentalSignals: { foodService: 5 },
      },
      {
        id: "q9-a5",
        label: "A quick planning call with someone who does this every day.",
        personalityWeights: {
          chaos_coordinator: 3,
          last_minute_magician: 2,
          family_group_chat_survivor: 2,
        },
        rentalSignals: { needsConsult: 5, urgencySimple: 2 },
      },
    ],
  },
];

export const TOTAL_QUESTIONS = QUIZ_QUESTIONS.length;
