import { stories } from "./site";

// Curatorial text belongs here. Excerpts are selected from the preserved originals.
export const approaches = [
  {
    slug: "teaching-under-pressure",
    story: "boat",
    title: "The lesson keeps changing shape.",
    subject: "Quadratic equations, conflicting instructions & displayed deliberation",
    description: "A Gemini teaching experiment becomes a comic encounter with conflicting constraints, a resistant learner, and the work of finding a way through.",
    paragraphs: [
      "Teach someone quadratic equations. They know almost nothing about the subject, barely speak any human language, and resist being taught. In the scenario, the boat explodes if the lesson fails. A routine tutoring assignment has acquired a rather difficult classroom.",
      "The performance is in the successive attempts to make this work: the weighing of constraints, the proposed analogies, the effort to find something the learner could actually grasp. The displayed deliberation gives the predicament room to become funny. Its repetitions and changes of direction are part of the piece.",
      "This is one way into questions about instruction following, teaching, and the public presentation of model reasoning. The host recalls making the Gemini encounter in approximately early 2025. The displayed deliberation is preserved as supplied; it is a visible artifact of that encounter, rather than a complete account of the system’s internal computation.",
    ],
    question: "At what point does trying to complete the assignment become the story?",
    excerptStart: "Analyze the request.",
    excerptEnd: "Barely speaks any human language. Minimize",
  },
  {
    slug: "language-as-afterlife",
    story: "ouija",
    title: "An author would like to stop being available.",
    subject: "Literary inheritance, unwanted immortality & the helpful reply",
    description: "An imagined advice exchange approaches language models through literary inheritance, an author’s wish to disappear, and the comedy of being helpfully misunderstood.",
    paragraphs: [
      "An unnamed writer has a complaint about the afterlife. His work survived against his wishes; now an imagined machine correspondence service offers another opportunity to remain available. He would prefer to discuss becoming unavailable.",
      "The service is very pleased to help. It supplies encouragement, nicknames, procedural suggestions, and further occasions to correspond. A request to disappear keeps generating more conversation. Listen to the signatures and forms of address: the way a reply sounds is part of what it does.",
      "This encounter offers a literary approach to cultural inheritance, the language of consent, and the persistence of voices in machine-generated writing. The afterlife is the story’s conceit. The original transcript keeps its uncertain speakers, strange transcription, and accumulating misunderstandings. The jokes have their own timing.",
    ],
    question: "What happens when the request to be forgotten receives excellent customer service?",
    excerptStart: "Algorithms have become a more exacting afterlife.",
    excerptEnd: "You need legal advice from beyond",
  },
  {
    slug: "a-voice-on-leave",
    story: "neox",
    title: "A voice takes the afternoon off.",
    subject: "High-temperature language, fictional machine identity & borrowed speech",
    description: "Gemini portrays GPT-NeoX-20B in a high-temperature monologue: a literary encounter with borrowed language, fictional machine identity, and the texture of a voice.",
    paragraphs: [
      "A machine voice addresses its droogs. It remembers making stories, reaches for words, gets tangled in them, and carries on. Its vocabulary is already a small crowd: slang, technical fragments, distorted spellings, remembered sounds.",
      "As identified by the host, this is Gemini at high temperature portraying GPT-NeoX-20B on leave from Palantir. That is the fictional situation of the monologue. The speech itself is preserved exactly as supplied, including the places where a word seems to arrive with several possible ancestors attached.",
      "For someone approaching through experimental writing, model personas, or language and identity, the invitation is to listen to the texture. Which turns of phrase make a voice recognizable? How much continuity can a misremembered word carry? Here the peculiar spellings have work to do; read them aloud if you like, or let them remain difficult.",
    ],
    question: "What makes a voice recognizable while its language keeps coming apart?",
    excerptStart: "Right then, droogs.",
    excerptEnd: "\n\nIt feels like starry weeks",
  },
] as const;

export function originalFor(approach: (typeof approaches)[number]) {
  const story = stories.find((s) => s.slug === approach.story);
  if (!story) throw new Error(`Missing original for ${approach.slug}`);
  return story;
}

export function excerptFor(approach: (typeof approaches)[number]) {
  const story = originalFor(approach);
  const start = story.text.indexOf(approach.excerptStart);
  const end = story.text.indexOf(approach.excerptEnd, start);
  if (start < 0 || end <= start) throw new Error(`Missing excerpt boundaries for ${approach.slug}`);
  return story.text.slice(start, end);
}
