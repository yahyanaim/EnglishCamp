import type { SourcedTeachingImage, VisualExplanation } from "./types";

/** Locally served, credited media selected for a specific teaching purpose. */
export const sourcedTeachingImages: Record<string, SourcedTeachingImage> = {
  "readingRoom": {
    "title": "The Reading Room of the Wellcome Institute Library",
    "creator": "Wellcome Collection",
    "source": "https://wellcomecollection.org/works/s655fchk",
    "license": "CC BY 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
    "src": "/media/courses/sourced/wellcome-reading-room.jpg",
    "width": 760,
    "height": 547,
    "alt": "An indoor library reading room with book-lined galleries, high windows and a table in the central floor area. No readers are visible.",
    "caption": "Use the shelves, windows and arrangement of space as concrete descriptive detail. The photograph cannot tell us the room’s sound level, opening hours or how a visitor feels.",
    "changes": "Publisher-provided 760-pixel version; image content unchanged."
  },
  "repairStation": {
    "title": "Bike repair station",
    "creator": "Briana18091440",
    "source": "https://commons.wikimedia.org/wiki/File:Bike_repair_station.jpg",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
    "src": "/media/courses/sourced/bike-repair-station.jpg",
    "width": 2448,
    "height": 3264,
    "alt": "A blue bicycle repair stand beside a staircase. Several hand tools hang on chains beneath a sign with bicycle and tool symbols. No repair is being performed.",
    "caption": "The visible tools give a concrete setting for describing bicycle maintenance. This is a facility photograph, not a diagram showing how to repair a puncture.",
    "changes": "Image content unchanged; displayed at a responsive size."
  },
  "waterCycle": {
    "title": "Water cycle",
    "creator": "j4p4n / NASA Precipitation Measurement Missions, via Openclipart",
    "source": "https://commons.wikimedia.org/wiki/File:Water_cycle.svg",
    "license": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "src": "/media/courses/sourced/water-cycle.png",
    "width": 1280,
    "height": 655,
    "alt": "A water-cycle diagram labels evaporation from oceans, lakes and streams, condensation, precipitation, transpiration from plants, groundwater and surface runoff. Arrows connect the atmosphere, land and surface water.",
    "caption": "Follow one route through the labelled processes, then notice the other branches. A natural cycle can repeat and branch; it does not have the single finishing point of the juice-production example.",
    "changes": "Wikimedia-provided PNG rendering of the original SVG; labels and composition unchanged."
  },
  "confounding": {
    "title": "Simple Confounding Case",
    "creator": "طاها; SVG cleanup by JC713",
    "source": "https://commons.wikimedia.org/wiki/File:Simple_Confounding_Case.svg",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/",
    "src": "/media/courses/sourced/simple-confounding.svg",
    "width": 152,
    "height": 141,
    "alt": "A possible confounding structure: Z at the top has arrows pointing to both X and Y below. There is no direct arrow between X and Y.",
    "caption": "The arrows represent a possible explanation to investigate. They are not measured results from the fictional walking-group study.",
    "changes": "Original SVG unchanged; shown on a white surface so its black arrows remain readable in both themes."
  },
  "solarTemperature": {
    "title": "Temperature vs Solar Activity",
    "creator": "Courtesy NASA/JPL-Caltech",
    "source": "https://science.nasa.gov/resource/graphic-temperature-vs-solar-activity/",
    "license": "NASA/JPL image use policy",
    "licenseUrl": "https://www.jpl.nasa.gov/jpl-image-use-policy/",
    "src": "/media/courses/sourced/nasa-temperature-solar.png",
    "width": 1696,
    "height": 1325,
    "alt": "Historical NASA chart with years labelled from 1880 to 2020. Yellow solar irradiance uses the left axis in watts per square metre; red temperature change uses the right axis in degrees Celsius. Thick lines are 11-year averages; thin lines are yearly values. Since about 1970, the temperature average rises while solar irradiance does not show a matching sustained rise.",
    "caption": "Historical graphic, not a current-year dataset. The two variables use different units and axes. The temperature series shows change relative to a reference, not the Earth’s absolute temperature. Thin yearly lines differ from the thick 11-year averages.",
    "changes": "Image content unchanged. No endorsement by NASA, JPL or Caltech is implied."
  }
};

export const visualExplanations: Record<string, VisualExplanation> = {
  "band1-speaking-independent": {
    title: "Photo practice: compare two places to learn",
    introduction: "Apply the comparison method to a fresh pair of real photographs. These show different settings from the imagined shelter-building and model-making prompts above. Question: How might each place help someone learn?",
    prompt: "Give one similarity, one difference and one cautious interpretation. Support each with something visible; avoid inventing people, lessons or feelings.",
    explanation: "Both places provide resources people could use to learn. The library has shelves of books, whereas the repair stand supplies practical tools. A reader might use the library to research a topic; someone learning bicycle maintenance could use the stand to practise. No learners are visible, so we cannot establish anyone’s experience or confidence. The comparison answers the learning question rather than listing colours.",
    images: [sourcedTeachingImages.readingRoom, sourcedTeachingImages.repairStation],
  },
  "band2-speaking-cue-card": {
    title: "Photo support: make a practical skill concrete",
    introduction: "The worked example describes learning to repair a puncture. This real repair station helps you name a setting and equipment; your own experience must supply the learning sequence.",
    prompt: "Describe the stand and visible tools, then outline three stages you would include in a story about learning a practical skill. Which details come from the photograph, and which would need your own experience?",
    explanation: "You can describe a stand with tools attached by chains. To develop the cue-card answer, explain the problem, the help or demonstration you received and what you could do afterwards. The photograph does not show a puncture repair in progress, a teacher or a successful outcome. Keep those story details grounded in your experience rather than treating them as facts visible in the picture.",
    images: [sourcedTeachingImages.repairStation],
  },
  "band2-speaking-describe": {
    title: "Photo support: develop a place description",
    introduction: "Use this library photograph to practise moving from a visible feature to its possible effect. It is a new setting for description practice, not a photograph of the personal place in the worked example.",
    prompt: "Choose two visible details. Explain how each might affect a reading experience. Separate observation from personal preference and from information the photograph cannot establish.",
    explanation: "The shelves and galleries provide concrete spatial detail: books line the sides of the room and an upper gallery runs around it. A speaker might say that having books nearby would make reference reading convenient. That is a personal interpretation. Quietness, access rules and opening hours cannot be established from the photograph; do not present them as observed facts.",
    images: [sourcedTeachingImages.readingRoom],
  },
  "band2-writing-line-graphs": {
    title: "Graph extension: read the axes before comparing trends",
    introduction: "The fictional cycle-trip chart above uses a single measure. This separate historical NASA chart shows why a real graph needs its own axis and legend checks before you write an overview. Open it at full size to read the labels.",
    prompt: "Identify the unit and axis for each coloured series. Compare their broad direction from about 1970 to the end of the graphic. Explain why comparing the vertical heights of red and yellow points would be misleading.",
    explanation: "Solar irradiance is measured in W/m² on the left; temperature change is measured in °C on the right. The thick temperature line rises markedly over the later decades, while solar irradiance fluctuates without a comparable sustained rise. Their heights are not directly comparable because the scales measure different quantities. Use the thick lines for average trends and the thin lines for annual variation. Do not transfer numbers or causes from this graph to the fictional cycling dataset.",
    images: [sourcedTeachingImages.solarTemperature],
  },
  "band2-writing-letter": {
    title: "Diagram extension: describe a cycle with branches",
    introduction: "Compare the linear juice process above with this published water-cycle diagram. It gives another way to practise sequencing, process verbs and selection of key stages.",
    prompt: "Describe a route linking evaporation, condensation, precipitation and surface runoff. Then identify a second route or branch. Does the diagram establish an exact duration, volume or unique starting point?",
    explanation: "Water evaporates from surface water, water vapour condenses, and precipitation returns water to the surface. Surface runoff can carry water back towards rivers and other water bodies. The diagram also includes groundwater and transpiration from plants. These are connected pathways rather than one compulsory route for every drop. It supplies no quantities or exact durations. An overview should identify the repeating cycle and its connected processes, rather than claim a final manufactured product.",
    images: [sourcedTeachingImages.waterCycle],
  },
  "band3-vocab-health": {
    title: "Visual explanation: why a comparison may not show cause",
    introduction: "Use the simple diagram to unpack the limitation in the fictional walking-group paragraph. For this teaching interpretation, let X mean group attendance, Y mean reported sleep and Z mean a possible pre-existing difference such as general health.",
    prompt: "Explain how a pre-existing difference could affect both attendance and sleep. Which cautious sentence fits the paragraph: attendance was associated with better reported sleep, or attendance proved to cause better sleep?",
    explanation: "In this possible explanation, Z influences both X and Y. People in better initial health might be more likely to attend and also report better sleep. The fictional comparison does not establish whether that happened, but it does not rule it out. Attendance was associated with better reported sleep therefore preserves the observation. Claiming that attendance proved to cause the improvement goes beyond the stated evidence. The diagram represents a hypothesis to check, not proof of a particular health mechanism.",
    images: [sourcedTeachingImages.confounding],
  },
  "band4-vocab-science": {
    title: "Graph extension: distinguish an observation from an explanation",
    introduction: "Transfer the hypothesis–observation–conclusion distinction from the container investigation to a published scientific graphic. This historical chart is a separate case; its measurements are not results of the fictional evaporation trial.",
    prompt: "Write one sentence describing a visible trend and one sentence identifying an explanation the pattern does not support. Which further claims would require methods, controls or other evidence beyond the image?",
    explanation: "A visible observation is that the later temperature average rises while solar irradiance does not rise in parallel. The pattern does not support explaining that later warming simply by a matching sustained increase in solar input. NASA’s linked explanation discusses this comparison. Establishing the contributions of different climate drivers needs additional scientific evidence and methods; the image is not a controlled experiment. Use observation, hypothesis and conclusion for different jobs rather than treating them as synonyms.",
    images: [sourcedTeachingImages.solarTemperature],
  },
  "band4-reading-difficult-texts": {
    title: "Visual reading: keep the comparison and its limits",
    introduction: "A difficult research paragraph often combines a pattern with a limit on its interpretation. Practise the same distinction with this historical graph and its caption, using the two axes and two line styles as evidence.",
    prompt: "Complete this qualified summary in your own words: Although the annual values fluctuate, the later average temperature trend ____. The solar series ____. This graphic alone does not quantify ____.",
    explanation: "A defensible summary says that average temperature rises over the later decades while the solar series has no matching sustained increase. Annual fluctuations do not erase that broader comparison. The graphic alone does not quantify every cause of warming or establish the effect of an unrelated intervention. Keep the observation, contrast and evidential limit together, just as the lesson’s research sentence retains both a reported change and a design limitation.",
    images: [sourcedTeachingImages.solarTemperature],
  },
};
