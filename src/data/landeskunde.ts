export type CultureQuestion = {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: "uk" | "usa" | "canada" | "australia" | "newzealand" | "ireland" | "mixed";
  difficulty: "easy" | "medium" | "hard";
};

export const CULTURE_QUESTIONS: CultureQuestion[] = [
  {
    id: "cq-1", question: "What is the capital of the United Kingdom?",
    options: ["Manchester", "London", "Edinburgh", "Dublin"], correctIndex: 1,
    explanation: "London is the capital of the United Kingdom, located on the River Thames.",
    category: "uk", difficulty: "easy",
  },
  {
    id: "cq-2", question: "What is the capital of Scotland?",
    options: ["Glasgow", "Edinburgh", "Aberdeen", "Dundee"], correctIndex: 1,
    explanation: "Edinburgh is the capital of Scotland, famous for its historic Old Town and Edinburgh Castle.",
    category: "uk", difficulty: "easy",
  },
  {
    id: "cq-3", question: "What is the capital of Wales?",
    options: ["Swansea", "Cardiff", "Bangor", "Newport"], correctIndex: 1,
    explanation: "Cardiff (Caerdydd in Welsh) is the capital of Wales.",
    category: "uk", difficulty: "medium",
  },
  {
    id: "cq-4", question: "What is the capital of Northern Ireland?",
    options: ["Belfast", "Derry", "Armagh", "Lisburn"], correctIndex: 0,
    explanation: "Belfast is the capital of Northern Ireland, known for Titanic's birthplace.",
    category: "uk", difficulty: "medium",
  },
  {
    id: "cq-5", question: "Which famous landmark is located in London?",
    options: ["The Eiffel Tower", "Big Ben", "The Colosseum", "The Brandenburg Gate"], correctIndex: 1,
    explanation: "Big Ben (the nickname for the Great Bell of the Elizabeth Tower) is one of London's most iconic landmarks.",
    category: "uk", difficulty: "easy",
  },
  {
    id: "cq-6", question: "What is the national dish of England?",
    options: ["Fish and chips", "Haggis", "Shepherd's pie", "Full English breakfast"], correctIndex: 0,
    explanation: "Fish and chips is widely considered England's national dish, consisting of battered fish and deep-fried chips.",
    category: "uk", difficulty: "medium",
  },
  {
    id: "cq-7", question: "What is the traditional Scottish instrument?",
    options: ["Harp", "Bagpipes", "Fiddle", "Accordion"], correctIndex: 1,
    explanation: "The bagpipes (great Highland bagpipes) are a traditional Scottish instrument, often played at ceremonies and celebrations.",
    category: "uk", difficulty: "medium",
  },
  {
    id: "cq-8", question: "Which British festival involves rolling cheese down a hill?",
    options: ["Glastonbury", "Notting Hill Carnival", "Cooper's Hill Cheese-Rolling", "Edinburgh Fringe"], correctIndex: 2,
    explanation: "The Cooper's Hill Cheese-Rolling event near Gloucester sees competitors chase a wheel of cheese down a steep hill.",
    category: "uk", difficulty: "hard",
  },
  {
    id: "cq-9", question: "Who wrote 'Romeo and Juliet'?",
    options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "George Orwell"], correctIndex: 1,
    explanation: "William Shakespeare (1564–1616) wrote Romeo and Juliet, one of the most famous love stories in English literature.",
    category: "uk", difficulty: "easy",
  },
  {
    id: "cq-10", question: "What is the highest mountain in the UK?",
    options: ["Snowdon", "Ben Nevis", "Scafell Pike", "Mount Keen"], correctIndex: 1,
    explanation: "Ben Nevis in Scotland is the highest mountain in the UK at 1,345 metres.",
    category: "uk", difficulty: "medium",
  },
  {
    id: "cq-11", question: "Which British celebration involves 'bonfire night'?",
    options: ["Halloween", "Guy Fawkes Night", "New Year's Eve", "St. Patrick's Day"], correctIndex: 1,
    explanation: "Guy Fawkes Night (Bonfire Night) on November 5th commemorates the failed Gunpowder Plot of 1605.",
    category: "uk", difficulty: "medium",
  },
  {
    id: "cq-12", question: "What is the longest river in the UK?",
    options: ["Thames", "Severn", "Trent", "Clyde"], correctIndex: 1,
    explanation: "The River Severn is the longest river in the UK at 354 km, flowing through Wales and England.",
    category: "uk", difficulty: "hard",
  },
  {
    id: "cq-13", question: "What is the capital of the United States?",
    options: ["New York City", "Los Angeles", "Washington, D.C.", "Chicago"], correctIndex: 2,
    explanation: "Washington, D.C. (District of Columbia) has been the capital of the United States since 1800.",
    category: "usa", difficulty: "easy",
  },
  {
    id: "cq-14", question: "Which American landmark is a symbol of freedom?",
    options: ["The White House", "Statue of Liberty", "Mount Rushmore", "Golden Gate Bridge"], correctIndex: 1,
    explanation: "The Statue of Liberty in New York Harbour was a gift from France and is a universal symbol of freedom and democracy.",
    category: "usa", difficulty: "easy",
  },
  {
    id: "cq-15", question: "Which US holiday is celebrated on the fourth Thursday of November?",
    options: ["Independence Day", "Thanksgiving", "Memorial Day", "Veterans Day"], correctIndex: 1,
    explanation: "Thanksgiving is celebrated on the fourth Thursday of November, commemorating the 1621 harvest feast shared by Pilgrims and Wampanoag people.",
    category: "usa", difficulty: "medium",
  },
  {
    id: "cq-16", question: "How many states does the USA have?",
    options: ["48", "50", "52", "51"], correctIndex: 1,
    explanation: "The United States is made up of 50 states, plus the federal district of Washington, D.C.",
    category: "usa", difficulty: "easy",
  },
  {
    id: "cq-17", question: "Which president is known for ending slavery in the US?",
    options: ["George Washington", "Thomas Jefferson", "Abraham Lincoln", "Franklin D. Roosevelt"], correctIndex: 2,
    explanation: "Abraham Lincoln, the 16th president, issued the Emancipation Proclamation in 1863 and led the US through the Civil War.",
    category: "usa", difficulty: "medium",
  },
  {
    id: "cq-18", question: "What is the most famous annual American football event?",
    options: ["The World Series", "The Super Bowl", "The NBA Finals", "The Stanley Cup"], correctIndex: 1,
    explanation: "The Super Bowl is the championship game of the National Football League (NFL) and is the most-watched TV event in America.",
    category: "usa", difficulty: "medium",
  },
  {
    id: "cq-19", question: "What is the longest river in the United States?",
    options: ["Colorado River", "Mississippi River", "Missouri River", "Rio Grande"], correctIndex: 2,
    explanation: "The Missouri River is the longest river in the US at 3,767 km, flowing through seven states.",
    category: "usa", difficulty: "hard",
  },
  {
    id: "cq-20", question: "Which city is famous for its jazz music and Mardi Gras festival?",
    options: ["Miami", "New Orleans", "Chicago", "Nashville"], correctIndex: 1,
    explanation: "New Orleans, Louisiana, is the birthplace of jazz and famous for its Mardi Gras carnival celebration.",
    category: "usa", difficulty: "medium",
  },
  {
    id: "cq-21", question: "What is the most widely spoken language in the USA after English?",
    options: ["French", "Spanish", "Chinese", "German"], correctIndex: 1,
    explanation: "Spanish is the second most widely spoken language in the United States, with over 40 million native speakers.",
    category: "usa", difficulty: "hard",
  },
  {
    id: "cq-22", question: "What is the capital of Canada?",
    options: ["Toronto", "Vancouver", "Ottawa", "Montreal"], correctIndex: 2,
    explanation: "Ottawa is the capital of Canada, located in the province of Ontario on the Ottawa River.",
    category: "canada", difficulty: "easy",
  },
  {
    id: "cq-23", question: "Which Canadian landmark is a massive rock formation in Alberta?",
    options: ["Banff National Park", "Niagara Falls", "Rocky Mountains", "CN Tower"], correctIndex: 2,
    explanation: "The Rocky Mountains stretch across British Columbia and Alberta, with famous parks like Banff and Jasper.",
    category: "canada", difficulty: "medium",
  },
  {
    id: "cq-24", question: "Which two languages are official in Canada?",
    options: ["English and French", "English and Spanish", "French and German", "English and Inuktitut"], correctIndex: 0,
    explanation: "Canada has two official languages: English and French. About 22% of Canadians speak French as their first language.",
    category: "canada", difficulty: "easy",
  },
  {
    id: "cq-25", question: "What is the national sport of Canada?",
    options: ["Ice hockey", "Lacrosse", "Curling", "Basketball"], correctIndex: 0,
    explanation: "Ice hockey is the official winter sport of Canada. Lacrosse is the official summer sport. Hockey is by far the most popular.",
    category: "canada", difficulty: "medium",
  },
  {
    id: "cq-26", question: "Which famous Canadian landmark is a set of waterfalls on the US-Canada border?",
    options: ["Niagara Falls", "Churchill Falls", "Montmorency Falls", "Takakkaw Falls"], correctIndex: 0,
    explanation: "Niagara Falls, located on the border between Ontario, Canada and New York, USA, is one of the most famous waterfalls in the world.",
    category: "canada", difficulty: "easy",
  },
  {
    id: "cq-27", question: "What is the largest city in Canada?",
    options: ["Vancouver", "Montreal", "Toronto", "Calgary"], correctIndex: 2,
    explanation: "Toronto is Canada's largest city with about 6.2 million people in the metropolitan area.",
    category: "canada", difficulty: "medium",
  },
  {
    id: "cq-28", question: "Which animal is a national symbol of Canada?",
    options: ["Bald eagle", "Beaver", "Grizzly bear", "Moose"], correctIndex: 1,
    explanation: "The beaver (Castor canadensis) has been a national symbol of Canada since the 17th century and appears on the five-cent coin.",
    category: "canada", difficulty: "hard",
  },
  {
    id: "cq-29", question: "What is the capital of Australia?",
    options: ["Sydney", "Melbourne", "Canberra", "Brisbane"], correctIndex: 2,
    explanation: "Canberra is the capital of Australia, selected as a compromise between Sydney and Melbourne.",
    category: "australia", difficulty: "easy",
  },
  {
    id: "cq-30", question: "Which famous Australian landmark is a large sandstone rock in the outback?",
    options: ["Great Barrier Reef", "Uluru (Ayers Rock)", "Blue Mountains", "Kakadu National Park"], correctIndex: 1,
    explanation: "Uluru (also known as Ayers Rock) is a massive sandstone monolith in the Northern Territory, sacred to the Anangu people.",
    category: "australia", difficulty: "medium",
  },
  {
    id: "cq-31", question: "What is the national animal of Australia?",
    options: ["Kangaroo", "Koala", "Platypus", "Wombat"], correctIndex: 0,
    explanation: "The red kangaroo is Australia's national animal and appears on the Australian coat of arms alongside the emu.",
    category: "australia", difficulty: "easy",
  },
  {
    id: "cq-32", question: "Which city hosted the 2000 Summer Olympics in Australia?",
    options: ["Melbourne", "Brisbane", "Perth", "Sydney"], correctIndex: 3,
    explanation: "Sydney hosted the 2000 Summer Olympics, known as the 'Games of the New Millennium'.",
    category: "australia", difficulty: "medium",
  },
  {
    id: "cq-33", question: "What is the Great Barrier Reef?",
    options: ["A mountain range", "A coral reef system", "A desert", "A rainforest"], correctIndex: 1,
    explanation: "The Great Barrier Reef off the coast of Queensland is the world's largest coral reef system, stretching over 2,300 km.",
    category: "australia", difficulty: "easy",
  },
  {
    id: "cq-34", question: "What is the capital of New Zealand?",
    options: ["Auckland", "Christchurch", "Wellington", "Hamilton"], correctIndex: 2,
    explanation: "Wellington is the capital of New Zealand, located at the southern tip of the North Island.",
    category: "newzealand", difficulty: "easy",
  },
  {
    id: "cq-35", question: "What are the indigenous people of New Zealand called?",
    options: ["Aboriginals", "Maori", "Polynesians", "Pakeha"], correctIndex: 1,
    explanation: "The Maori are the indigenous Polynesian people of New Zealand, arriving around 1300 AD.",
    category: "newzealand", difficulty: "medium",
  },
  {
    id: "cq-36", question: "What is the national sport of New Zealand?",
    options: ["Cricket", "Rugby union", "Netball", "Sailing"], correctIndex: 1,
    explanation: "Rugby union is the national sport of New Zealand. The All Blacks are one of the most successful teams in the world.",
    category: "newzealand", difficulty: "medium",
  },
  {
    id: "cq-37", question: "Which New Zealand bird cannot fly?",
    options: ["Kea", "Kiwi", "Tui", "Fantail"], correctIndex: 1,
    explanation: "The kiwi is a flightless bird native to New Zealand and the country's national symbol.",
    category: "newzealand", difficulty: "easy",
  },
  {
    id: "cq-38", question: "What is the capital of the Republic of Ireland?",
    options: ["Cork", "Galway", "Dublin", "Limerick"], correctIndex: 2,
    explanation: "Dublin (Baile Átha Cliath in Irish) is the capital and largest city of Ireland.",
    category: "ireland", difficulty: "easy",
  },
  {
    id: "cq-39", question: "Which Irish celebration is celebrated worldwide on March 17?",
    options: ["Halloween", "St. Patrick's Day", "Beltane", "Samhain"], correctIndex: 1,
    explanation: "St. Patrick's Day on March 17 celebrates Ireland's patron saint and is observed by Irish communities worldwide.",
    category: "ireland", difficulty: "easy",
  },
  {
    id: "cq-40", question: "What is the national symbol of Ireland?",
    options: ["Rose", "Shamrock", "Thistle", "Daffodil"], correctIndex: 1,
    explanation: "The shamrock (three-leaf clover) is the national symbol of Ireland, associated with St. Patrick who used it to explain the Holy Trinity.",
    category: "ireland", difficulty: "medium",
  },
  {
    id: "cq-41", question: "Which famous Irish writer wrote 'Ulysses'?",
    options: ["W.B. Yeats", "Samuel Beckett", "James Joyce", "Oscar Wilde"], correctIndex: 2,
    explanation: "James Joyce (1882–1941) wrote 'Ulysses', one of the most important works of modernist literature.",
    category: "ireland", difficulty: "hard",
  },
  {
    id: "cq-42", question: "Which of these is a traditional Irish dish?",
    options: ["Haggis", "Bangers and mash", "Irish stew", "Shepherd's pie"], correctIndex: 2,
    explanation: "Irish stew is a traditional dish made with lamb, potatoes, carrots, and onions.",
    category: "ireland", difficulty: "medium",
  },
  {
    id: "cq-43", question: "Which country has the largest land area?",
    options: ["United States", "Canada", "Australia", "United Kingdom"], correctIndex: 1,
    explanation: "Canada is the second-largest country in the world by land area at 9.98 million km², after Russia.",
    category: "mixed", difficulty: "medium",
  },
  {
    id: "cq-44", question: "Which English-speaking country has the most official languages?",
    options: ["USA", "Canada", "Australia", "United Kingdom"], correctIndex: 1,
    explanation: "Canada has two official languages at federal level (English and French), but officially recognises many more at the territorial level.",
    category: "mixed", difficulty: "hard",
  },
  {
    id: "cq-45", question: "Which English-speaking country has a king as head of state?",
    options: ["USA", "Canada", "Australia", "All of the above"], correctIndex: 3,
    explanation: "King Charles III is head of state of the United Kingdom, Canada, Australia, and New Zealand.",
    category: "mixed", difficulty: "medium",
  },
  {
    id: "cq-46", question: "Which country invented the internet?",
    options: ["United Kingdom", "United States", "Canada", "Australia"], correctIndex: 1,
    explanation: "The internet (ARPANET) was developed in the United States by the Advanced Research Projects Agency (ARPA) in the late 1960s.",
    category: "mixed", difficulty: "medium",
  },
  {
    id: "cq-47", question: "In which country would you find the Hollywood sign?",
    options: ["Canada", "Australia", "USA", "New Zealand"], correctIndex: 2,
    explanation: "The Hollywood sign is located in Los Angeles, California, United States.",
    category: "usa", difficulty: "easy",
  },
  {
    id: "cq-48", question: "What is the traditional Christmas food in the UK?",
    options: ["Turkey with stuffing", "Roast beef", "Christmas pudding", "All of the above"], correctIndex: 3,
    explanation: "A traditional British Christmas includes roast turkey, roast potatoes, and Christmas pudding for dessert.",
    category: "uk", difficulty: "medium",
  },
  {
    id: "cq-49", question: "Which English-speaking country has the longest coastline?",
    options: ["USA", "Australia", "Canada", "United Kingdom"], correctIndex: 2,
    explanation: "Canada has the longest coastline of any country in the world, stretching over 202,080 km.",
    category: "mixed", difficulty: "hard",
  },
  {
    id: "cq-50", question: "Which country is known as the 'Land Down Under'?",
    options: ["New Zealand", "South Africa", "Australia", "Argentina"], correctIndex: 2,
    explanation: "Australia is commonly called the 'Land Down Under' because it is located entirely in the Southern Hemisphere.",
    category: "australia", difficulty: "easy",
  },
];

export type CultureTip = {
  id: string;
  topic: string;
  tip: string;
  suggest: string;
  icon: string;
};

export const CULTURE_TIPS: CultureTip[] = [
  {
    id: "ct-uk",
    topic: "UK — Four Nations in One",
    tip: "The UK consists of England, Scotland, Wales, and Northern Ireland. Each has its own capital, flag, patron saint, and traditions. London is the capital of the UK and England. Key landmarks: Big Ben, Buckingham Palace, Stonehenge, Edinburgh Castle.",
    suggest: "Watch a BBC documentary about the four nations of the UK and note one unique fact about each.",
    icon: "🇬🇧",
  },
  {
    id: "ct-usa",
    topic: "USA — Land of Diversity",
    tip: "The USA has 50 states, each with its own government. Major cities: New York, Los Angeles, Chicago, Washington D.C. Famous symbols: Statue of Liberty, bald eagle, the Stars and Stripes (flag). Key holidays: Independence Day (July 4), Thanksgiving (November).",
    suggest: "Read a short article about an American holiday tradition and compare it to one in your own culture.",
    icon: "🇺🇸",
  },
  {
    id: "ct-canada",
    topic: "Canada — Bilingual Wilderness",
    tip: "Canada is the second-largest country by area. It has two official languages: English and French (mostly spoken in Quebec). Famous for: maple syrup, ice hockey, the Rocky Mountains, Niagara Falls, and the Northern Lights (Aurora Borealis).",
    suggest: "Learn to say 'hello' and 'thank you' in French (bonjour, merci) — a useful skill for visiting Canada.",
    icon: "🇨🇦",
  },
  {
    id: "ct-australia",
    topic: "Australia — Sun, Surf & Outback",
    tip: "Australia is a continent and a country. Famous for: the Great Barrier Reef, Uluru, Sydney Opera House, kangaroos, koalas. Indigenous Aboriginal culture is over 65,000 years old. Major cities: Sydney, Melbourne, Brisbane, Perth, Adelaide. Capital: Canberra.",
    suggest: "Watch a documentary about Aboriginal art and learn about the Dreamtime stories.",
    icon: "🇦🇺",
  },
  {
    id: "ct-nz",
    topic: "New Zealand — Aotearoa",
    tip: "New Zealand (Māori: Aotearoa) consists of two main islands: North Island and South Island. Capital: Wellington. Largest city: Auckland. Famous for: Māori culture, the haka, Lord of the Rings filming locations, stunning landscapes, kiwi bird.",
    suggest: "Learn three words in Māori: kia ora (hello), whānau (family), aroha (love).",
    icon: "🇳🇿",
  },
  {
    id: "ct-ireland",
    topic: "Ireland — Emerald Isle",
    tip: "The island of Ireland is divided into the Republic of Ireland (capital: Dublin) and Northern Ireland (part of the UK, capital: Belfast). Famous for: green landscapes, St. Patrick's Day, traditional music, Irish literature (Joyce, Yeats, Wilde, Heaney), and Guinness.",
    suggest: "Listen to traditional Irish music (the fiddle, tin whistle, bodhrán) and identify the instruments.",
    icon: "🇮🇪",
  },
];
