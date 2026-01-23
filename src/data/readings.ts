import schoolImg from "@/assets/vocabulary/school.jpg";
import postOfficeImg from "@/assets/vocabulary/post-office.jpg";
import hospitalImg from "@/assets/vocabulary/hospital.jpg";
import bankImg from "@/assets/vocabulary/bank.png";
import fireStationImg from "@/assets/vocabulary/fire-station.png";
import supermarketImg from "@/assets/vocabulary/supermarket.png";
import departmentStoreImg from "@/assets/vocabulary/department-store.jpg";
import roomsImg from "@/assets/vocabulary/rooms.jpg";

export interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface VocabularyItem {
  id: string;
  word: string;
  image: string;
}

export interface BlankItem {
  id: number;
  sentence: string;
  blank: string;
  answer: string;
}

export interface Reading {
  title: string;
  description: string;
  content: string;
  questions: Question[];
  type?: "reading" | "vocabulary" | "fill-blanks";
  vocabularyItems?: VocabularyItem[];
  blankItems?: BlankItem[];
  wordBank?: string[];
}

export const readings: Record<string, Reading[]> = {
  A1: [
    {
      title: "My Daily Routine",
      description: "A simple text about a typical day",
      content: `Hello! My name is Maria. I want to tell you about my daily routine.

Every morning, I wake up at 7 o'clock. I brush my teeth and wash my face. Then I eat breakfast. I like to eat bread with butter and drink orange juice.

After breakfast, I go to work. I work in an office. I start work at 9 o'clock and finish at 5 o'clock. I have lunch at 1 o'clock. I usually eat a sandwich and drink water.

In the evening, I go home. I cook dinner and watch TV. I like to watch movies. At 10 o'clock, I go to bed.

I like my routine because it is simple and comfortable. Every day is the same, and I feel happy.`,
      questions: [
        {
          question: "What time does Maria wake up?",
          options: ["6 o'clock", "7 o'clock", "8 o'clock", "9 o'clock"],
          correctAnswer: 1
        },
        {
          question: "What does Maria drink for breakfast?",
          options: ["Coffee", "Tea", "Orange juice", "Milk"],
          correctAnswer: 2
        },
        {
          question: "Where does Maria work?",
          options: ["In a hospital", "In an office", "In a school", "In a restaurant"],
          correctAnswer: 1
        }
      ]
    },
    {
      title: "At the Supermarket",
      description: "Shopping for groceries",
      content: `Today I went to the supermarket. I needed to buy food for the week.

First, I bought some fruits. I like apples and bananas. They are healthy and delicious. I also bought some vegetables. I got tomatoes, carrots, and lettuce.

Then, I went to the dairy section. I bought milk, cheese, and yogurt. My family drinks a lot of milk, so I bought two bottles.

Next, I went to the meat section. I bought some chicken and fish. We eat meat three times a week.

Finally, I bought some bread and rice. These are important foods in my country. I also bought some chocolate because I like sweets.

I paid at the cashier and went home. Shopping at the supermarket is easy and convenient. I go there every Saturday.`,
      questions: [
        {
          question: "What fruits did the person buy?",
          options: ["Oranges and grapes", "Apples and bananas", "Pears and mangoes", "Strawberries and kiwis"],
          correctAnswer: 1
        },
        {
          question: "How many bottles of milk did they buy?",
          options: ["One", "Two", "Three", "Four"],
          correctAnswer: 1
        },
        {
          question: "When does the person go to the supermarket?",
          options: ["Every Sunday", "Every Saturday", "Every Friday", "Every Monday"],
          correctAnswer: 1
        }
      ]
    },
    {
      title: "Buildings Vocabulary",
      description: "Learn the names of buildings and places in the city",
      content: "Match the building names with their correct images. Drag each word to the corresponding picture.",
      type: "vocabulary",
      vocabularyItems: [
        { id: "school", word: "School", image: schoolImg },
        { id: "post-office", word: "Post Office", image: postOfficeImg },
        { id: "hospital", word: "Hospital", image: hospitalImg },
        { id: "bank", word: "Bank", image: bankImg },
        { id: "fire-station", word: "Fire Station", image: fireStationImg },
        { id: "supermarket", word: "Supermarket", image: supermarketImg },
        { id: "department-store", word: "Department Store", image: departmentStoreImg }
      ],
      questions: []
    },
    {
      title: "Rooms in the House",
      description: "Learn the names of rooms in a house",
      content: "This vocabulary exercise helps you learn the different rooms in a house.",
      type: "vocabulary",
      vocabularyItems: [
        { id: "bathroom", word: "Bathroom", image: roomsImg },
        { id: "bedroom", word: "Bedroom", image: roomsImg },
        { id: "kitchen", word: "Kitchen", image: roomsImg },
        { id: "living-room", word: "Living Room", image: roomsImg }
      ],
      questions: []
    },
    {
      title: "Phrasal Verbs Practice",
      description: "Complete sentences with the correct verbs",
      content: "Fill in the blanks with the correct verb from the word bank.",
      type: "fill-blanks",
      wordBank: ["have", "go", "watch", "drink", "play", "do", "listen", "study", "sleep", "brush", "clean", "get", "wash", "read", "take", "meet", "write", "put", "eat"],
      blankItems: [
        { id: 1, sentence: "I usually ______ breakfast at 7 o'clock.", blank: "______", answer: "have" },
        { id: 2, sentence: "She ______ to school by bus every morning.", blank: "______", answer: "go" },
        { id: 3, sentence: "We ______ TV after dinner.", blank: "______", answer: "watch" },
        { id: 4, sentence: "My dad ______ coffee every day.", blank: "______", answer: "drink" },
        { id: 5, sentence: "They ______ soccer at the park on weekends.", blank: "______", answer: "play" },
        { id: 6, sentence: "He ______ his homework before dinner.", blank: "______", answer: "do" },
        { id: 7, sentence: "I ______ to music when I'm sad.", blank: "______", answer: "listen" },
        { id: 8, sentence: "We ______ English at school.", blank: "______", answer: "study" },
        { id: 9, sentence: "She ______ to bed at 10 p.m.", blank: "______", answer: "go" },
        { id: 10, sentence: "I ______ my teeth after every meal.", blank: "______", answer: "brush" }
      ],
      questions: []
    },
    {
      title: "The Simpsons Family",
      description: "Learn family vocabulary with The Simpsons",
      content: "Complete the sentences about The Simpsons family relationships.",
      type: "fill-blanks",
      wordBank: ["son", "parents", "daughter", "brother", "sister", "father", "grandfather", "mother", "uncle", "aunt", "wife", "husband", "grandparents", "cousin", "niece", "nephew", "grandmother"],
      blankItems: [
        { id: 1, sentence: "Bart is Homer's and Marge's ______.", blank: "______", answer: "son" },
        { id: 2, sentence: "Homer and Marge are Bart's ______.", blank: "______", answer: "parents" },
        { id: 3, sentence: "Lisa is Homer's and Marge's ______.", blank: "______", answer: "daughter" },
        { id: 4, sentence: "Herb is Homer's ______.", blank: "______", answer: "brother" },
        { id: 5, sentence: "Patty is Selma's ______.", blank: "______", answer: "sister" },
        { id: 6, sentence: "Abraham is Homer's ______.", blank: "______", answer: "father" },
        { id: 7, sentence: "Abraham is Bart's ______.", blank: "______", answer: "grandfather" },
        { id: 8, sentence: "Jackie is Marge's ______.", blank: "______", answer: "mother" },
        { id: 9, sentence: "Herb is Maggie's ______.", blank: "______", answer: "uncle" },
        { id: 10, sentence: "Selma is Lisa's ______.", blank: "______", answer: "aunt" }
      ],
      questions: []
    }
  ],
  A2: [
    {
      title: "A Weekend Trip",
      description: "Planning and enjoying a short vacation",
      content: `Last weekend, my friends and I decided to take a short trip to the mountains. We wanted to escape from the city and enjoy nature.

We left early on Saturday morning. The weather was perfect - sunny but not too hot. The journey took about two hours by car. During the drive, we listened to music and talked about our plans for the day.

When we arrived, we checked into a small hotel. The hotel was cozy and had a beautiful view of the mountains. After settling in, we went for a hike. The trail was not very difficult, but it was long. We saw many trees, flowers, and even some wild animals.

In the evening, we had dinner at a local restaurant. The food was delicious and not expensive. We tried some traditional dishes that we had never eaten before.

On Sunday, we woke up early to watch the sunrise. It was breathtaking! After breakfast, we visited a nearby lake. The water was crystal clear, and we took many photos.

We returned to the city on Sunday afternoon. Although we were tired, we felt refreshed and happy. It was a perfect weekend getaway.`,
      questions: [
        {
          question: "How long did the journey to the mountains take?",
          options: ["One hour", "Two hours", "Three hours", "Four hours"],
          correctAnswer: 1
        },
        {
          question: "What did they do on Sunday morning?",
          options: ["Went hiking", "Watched the sunrise", "Visited a museum", "Had a big breakfast"],
          correctAnswer: 1
        },
        {
          question: "How did they feel when they returned?",
          options: ["Sad and bored", "Tired but happy", "Angry and frustrated", "Hungry and cold"],
          correctAnswer: 1
        }
      ]
    },
    {
      title: "A Day at the Clothes Shop",
      description: "Shopping for clothes with a friend",
      content: `It was a sunny Saturday afternoon, and Lara and Mia decided to spend the day shopping downtown. They had been talking all week about the new clothing store that had just opened, and now they finally had the chance to visit it. Lara needed a dress for a party that weekend, while Mia wanted to find a new jacket for the colder days ahead.

They walked into the bright, modern shop filled with music, mirrors, and colorful displays of clothes.

Lara: Hey, Mia! Let's go to that new clothes shop downtown. I need a new dress for the party.

Mia: Sure! I also want to look for a new jacket.

When they entered, a salesperson greeted them warmly and helped Lara find some dresses. Lara was looking for something red or pink, not too fancy, in a medium size. She tried on a beautiful dress and it looked amazing on her!

Meanwhile, Mia found a jacket she liked but needed a smaller size. The salesperson helped her find the right size.

In the end, Lara bought the dress for $45 and Mia bought the jacket for $60. They paid separately and left the shop happy with their purchases.`,
      questions: [
        {
          question: "Why did Lara want to go to the clothes shop?",
          options: ["She needed shoes for work", "She wanted a dress for a party", "She wanted to buy a jacket", "She was looking for a gift"],
          correctAnswer: 1
        },
        {
          question: "What item was Mia looking for?",
          options: ["A dress", "A skirt", "A jacket", "A sweater"],
          correctAnswer: 2
        },
        {
          question: "What size does Lara usually wear?",
          options: ["Small", "Medium", "Large", "Extra large"],
          correctAnswer: 1
        },
        {
          question: "What color dress was Lara looking for?",
          options: ["Blue and fancy", "Black and casual", "Red or pink, not too fancy", "White and long"],
          correctAnswer: 2
        },
        {
          question: "How much did Mia pay for her jacket?",
          options: ["$45", "$50", "$55", "$60"],
          correctAnswer: 3
        }
      ]
    }
  ],
  B1: [
    {
      title: "The Impact of Social Media",
      description: "Analyzing the effects of social media on society",
      content: `Social media has revolutionized the way we communicate, share information, and connect with others. While these platforms offer numerous benefits, they also present significant challenges.

One advantage is connecting people across vast distances. Families can video call across oceans. Professional networking has been transformed globally.

However, studies show excessive use is linked to mental health issues. Constant comparison can lead to feelings of inadequacy and depression. Privacy is another concern, with companies collecting vast amounts of personal data.

Despite challenges, social media is not inherently good or bad. The key lies in mindful use, verifying information, and maintaining balance between online and offline life.`,
      questions: [
        {
          question: "What is one advantage of social media mentioned in the text?",
          options: ["It replaces traditional media", "It connects people across vast distances", "It makes people more productive", "It improves physical health"],
          correctAnswer: 1
        },
        {
          question: "What mental health issue is linked to excessive social media use?",
          options: ["Better sleep patterns", "Improved self-esteem", "Feelings of inadequacy and depression", "Increased energy levels"],
          correctAnswer: 2
        },
        {
          question: "What is the key to using social media well according to the text?",
          options: ["Using it as much as possible", "Avoiding it completely", "Mindful use and maintaining balance", "Only using it for work"],
          correctAnswer: 2
        }
      ]
    },
    {
      title: "8 Reasons Why You Should Visit Ireland",
      description: "Discover the beauty and culture of the Emerald Isle",
      content: `The Isle of Ireland, made up of the Republic of Ireland and Northern Ireland, is a popular destination with travellers. Full of iconic sights, such as the Cliffs of Moher, there are many reasons why it is an ideal holiday destination.

1. Jaw-dropping natural landscapes
When you think of Ireland, it may conjure up images of green rolling hills, rugged seaside cliffs, and windswept rock formations. You'll be able to admire or hike the high mountains of Wicklow and McGillycuddy's Reeks. Take in the views over the Atlantic Ocean from the west coast cliffs.

2. Music and festivals
Ireland is known worldwide for its festive celebrations. The country hosts many events including the TradFest in Dublin every January - the largest festival of traditional music in Ireland. St Patrick's Day is a five-day affair in Dublin!

3. Regal castles
Irish history goes back centuries. There are an estimated 30,000 castles and ruins dotted all over the country, including Blarney Castle, Bunratty Castle, and Dublin Castle.

4. Game of Thrones
Northern Ireland has seen a boom since Game of Thrones was filmed here. Many fans visit to see filming locations like the Mourne Mountains and the Dark Hedges.

5. Scenic road trips
Ireland is ideal for road trips! Drive around the Wild Atlantic Way, explore the Ring of Kerry, or travel the Causeway Coastal Route.

6. Irish locals
The Irish people make Ireland special with their fun sense of humour and warm hospitality.

7. Lively cities
Dublin is a stunning mix of modern and historic architecture, full of attractions like the Guinness Storehouse and St Patrick's Cathedral.

8. Rich heritage
Ireland has a strong historic background with a focus on Irish and Gaelic living heritage, from language to music and dance.`,
      questions: [
        {
          question: "How many castles and ruins are estimated to be in Ireland?",
          options: ["About 10,000", "About 20,000", "About 30,000", "About 40,000"],
          correctAnswer: 2
        },
        {
          question: "What TV show was filmed in Northern Ireland?",
          options: ["The Crown", "Game of Thrones", "Downton Abbey", "Vikings"],
          correctAnswer: 1
        },
        {
          question: "What is TradFest?",
          options: ["A food festival", "The largest festival of traditional music in Ireland", "A castle tour", "A sports event"],
          correctAnswer: 1
        },
        {
          question: "How long does St Patrick's Day last in Dublin?",
          options: ["One day", "Three days", "Five days", "One week"],
          correctAnswer: 2
        }
      ]
    },
    {
      title: "Holiday Season",
      description: "Understanding holiday traditions in North America and UK",
      content: `You may have heard people talk about the "holiday season". The "holiday season" is a North American term that refers to the period from Thanksgiving until the New Year. This covers many of the most important holidays in American culture.

In the UK, people talk about the "festive season" or "Christmas holidays", covering Christmas Eve to New Year's Day.

Thanksgiving
This is a national holiday in the USA and Canada on the fourth Thursday of November. People come together to give thanks for a good harvest and enjoy a big meal with turkey and seasonal vegetables like pumpkin.

Hanukah
Hanukah (the Festival of Lights) is an important Jewish holiday lasting eight days and nights in November or December. Jews celebrate by lighting candles in a Menorah, eating oily foods like doughnuts, and spending time with family.

Christmas
In Christianity, this celebrates the birth of Jesus Christ. Many people celebrate by having a big meal with family and giving presents. Father Christmas / Santa Claus brings presents to children on Christmas Eve.

New Year's Eve
The last night of the year! People have parties, count down to midnight, drink champagne, and make New Year's Resolutions - things they'll try to do or stop doing in the coming year.`,
      questions: [
        {
          question: "What does 'holiday season' refer to in North America?",
          options: ["Only Christmas Day", "The period from Thanksgiving until New Year's", "Any vacation time", "The week after Christmas only"],
          correctAnswer: 1
        },
        {
          question: "How long does Hanukah last?",
          options: ["One day", "Two weeks", "Eight days and nights", "Seven days"],
          correctAnswer: 2
        },
        {
          question: "How do people commonly celebrate Christmas?",
          options: ["Making New Year's resolutions", "Lighting the Menorah", "Having a big meal with family", "Playing football"],
          correctAnswer: 2
        },
        {
          question: "What are New Year's Resolutions?",
          options: ["Party invitations", "Things people try to do or stop doing in the new year", "Traditional songs", "Special foods"],
          correctAnswer: 1
        }
      ]
    }
  ],
  B2: [
    {
      title: "The Psychology of Decision Making",
      description: "Understanding how we make choices",
      content: `Every day, we make thousands of decisions. Understanding the psychology behind decision-making can help us make better choices.

Research shows humans rely on mental shortcuts called heuristics. Daniel Kahneman and Amos Tversky identified cognitive biases that influence our choices.

The availability heuristic causes us to overestimate easily recalled events. Loss aversion means we feel losses more intensely than equivalent gains. Decision fatigue shows our capacity diminishes throughout the day.

Understanding these factors helps us recognize when judgment might be compromised. Important decisions are often better made earlier in the day when mental resources are fresh.`,
      questions: [
        {
          question: "Who conducted groundbreaking work on cognitive biases?",
          options: ["Sigmund Freud", "Daniel Kahneman and Amos Tversky", "Carl Jung", "B.F. Skinner"],
          correctAnswer: 1
        },
        {
          question: "What is the availability heuristic?",
          options: ["Making decisions based on available resources", "Overestimating easily recalled events", "Choosing the first available option", "Avoiding difficult decisions"],
          correctAnswer: 1
        },
        {
          question: "When are important decisions best made according to the text?",
          options: ["At the end of the day", "After lunch", "Earlier in the day", "Late at night"],
          correctAnswer: 2
        }
      ]
    },
    {
      title: "A Brief History of the Internet",
      description: "How the Internet was created and evolved",
      content: `The Internet started in the 1960s as a way for government researchers to share information. Computers in the '60s were large and immobile - to use information from any computer, one had to travel to the site or have tapes sent through postal mail.

The Cold War also influenced the Internet's development. The Soviet Union's launch of Sputnik spurred the U.S. Defense Department to consider ways information could be shared after a nuclear attack. This led to ARPANET (Advanced Research Projects Agency Network), which evolved into the Internet.

January 1, 1983 is considered the official birthday of the Internet. A new protocol called TCP/IP (Transfer Control Protocol/Internetwork Protocol) was established, allowing different computers on different networks to "talk" to each other. All networks could now be connected by a universal language.

The UNIVAC I, delivered to the Census Bureau in 1951, was the first American commercial computer. It weighed 16,000 pounds, used 5,000 vacuum tubes, and could perform about 1,000 calculations per second.`,
      questions: [
        {
          question: "What was the original purpose of the Internet in the 1960s?",
          options: ["To provide entertainment", "To help government researchers share information", "To send emails quickly", "To replace postal services"],
          correctAnswer: 1
        },
        {
          question: "What Cold War event influenced the development of the Internet?",
          options: ["The creation of email", "The invention of personal computers", "The launch of the Sputnik satellite", "The fall of the Berlin Wall"],
          correctAnswer: 2
        },
        {
          question: "Why is January 1, 1983 considered the birthday of the Internet?",
          options: ["The UNIVAC I was delivered", "TCP/IP became the standard protocol", "ARPANET was shut down", "The first computer was invented"],
          correctAnswer: 1
        },
        {
          question: "What was special about the UNIVAC I?",
          options: ["It could connect to the Internet", "It was the first American commercial computer", "It was small and portable", "It was designed for gaming"],
          correctAnswer: 1
        }
      ]
    },
    {
      title: "Black Friday & Boxing Day",
      description: "The history and traditions of shopping holidays",
      content: `Black Friday is an annual shopping extravaganza marking the beginning of the holiday shopping season, with retailers offering significant discounts.

One theory suggests "Black Friday" originated in 1960s Philadelphia. The day after Thanksgiving, large crowds would flood the city for the Army-Navy football game, causing chaos and traffic congestion.

Another theory links it to accounting: retailers operated "in the red" (at a loss) until holiday sales pushed them "into the black" (profitability).

The evolution of Black Friday has seen changes in consumer behavior. While brick-and-mortar stores host doorbuster sales, online shopping gave birth to Cyber Monday.

Boxing Day is observed in the UK, Canada, Australia, and New Zealand on December 26th. One theory links it to giving boxes of food or money to servants as appreciation. Another connects it to churches distributing alms to the poor.

In modern times, Boxing Day has evolved into a major shopping day with substantial discounts, similar to Black Friday.`,
      questions: [
        {
          question: "What are the two main theories about the origin of 'Black Friday'?",
          options: ["Halloween connection and accounting practice", "Army-Navy football game chaos and accounting practice", "New Year's celebration and retail tradition", "Thanksgiving meal and shopping tradition"],
          correctAnswer: 1
        },
        {
          question: "In which countries is Boxing Day observed?",
          options: ["USA and Mexico", "UK, Canada, Australia, and New Zealand", "France and Germany", "Spain and Italy"],
          correctAnswer: 1
        },
        {
          question: "What is one theory about the origin of Boxing Day?",
          options: ["Connected to a boxing match", "Tradition of giving boxes to appreciate service", "Celebration of the sport", "From a popular movie"],
          correctAnswer: 1
        }
      ]
    },
    {
      title: "Malcolm X & Martin Luther King Jr.",
      description: "Two sides of the civil rights movement",
      content: `Malcolm X was one of the most influential African American leaders of the civil rights era. Born as Malcolm Little in Omaha, Nebraska, his father was killed when Malcolm was young - he believed white racists were responsible.

In 1946, Malcolm was arrested for burglary and sent to prison, where he joined the Nation of Islam. After release in 1952, he adopted "X" as his last name, representing the unknown African name of slave ancestors.

Malcolm X became the Nation of Islam's most effective speaker, urging blacks to live separately from whites and win freedom "by any means necessary." In 1964, he broke with the organization and traveled to Mecca, where he met Muslims of various backgrounds. He took a more moderate view and sought cooperation with Martin Luther King Jr.

On February 21, 1965, Malcolm X was fatally shot while giving a speech.

Martin Luther King Jr. was known for advocating nonviolent protest. His leadership led to the Civil Rights Act of 1964 and the Voting Rights Act of 1965.

"Bloody Sunday" occurred on March 7, 1965, when 600 civil rights activists led by John Lewis and Hosea Williams were brutally attacked by state troopers while marching from Selma to Montgomery for voting rights. The violence, captured on television, galvanized public support and led President Johnson to introduce the Voting Rights Act.`,
      questions: [
        {
          question: "What is Martin Luther King Jr. best known for?",
          options: ["Leading violent protests", "Being the first African American president", "Advocating nonviolent protest", "Writing the Civil Rights Act"],
          correctAnswer: 2
        },
        {
          question: "What major laws were influenced by MLK's leadership?",
          options: ["Civil Rights Act of 1964 and Voting Rights Act of 1965", "The Emancipation Proclamation", "The Affordable Care Act", "The Social Security Act"],
          correctAnswer: 0
        },
        {
          question: "What happened on 'Bloody Sunday' in Selma?",
          options: ["Activists were attacked while marching for voting rights", "Marchers peacefully reached Montgomery", "MLK gave his 'I Have a Dream' speech", "The Voting Rights Act was signed"],
          correctAnswer: 0
        },
        {
          question: "Who led the Selma march on March 7, 1965?",
          options: ["John Lewis and Hosea Williams", "Martin Luther King Jr. and Rosa Parks", "Malcolm X and Stokely Carmichael", "Lyndon B. Johnson and JFK"],
          correctAnswer: 0
        },
        {
          question: "What was one effect of the Selma events?",
          options: ["MLK retired from activism", "Segregation was immediately abolished", "Decreased public interest in civil rights", "The Voting Rights Act was passed"],
          correctAnswer: 3
        }
      ]
    },
    {
      title: "The Importance of Sleep",
      description: "Exploring why sleep is crucial for health",
      content: `Sleep is a fundamental human need, much like eating, drinking, and breathing. When we sleep, our bodies rest and repair, and our brains process information and consolidate memories.

Lack of sleep can have serious consequences. It impairs cognitive functions - poor concentration, reduced problem-solving, decreased creativity. Physically, chronic sleep deprivation weakens the immune system, increases risk of diabetes and heart disease, and contributes to weight gain.

Children and teenagers need more sleep because their bodies and brains are developing. Adults need 7-9 hours per night, teenagers need 8-10 hours, and school-aged children need 9-11 hours.

To improve sleep quality: establish a regular schedule, create a relaxing bedtime routine, ensure the bedroom is dark, quiet, and cool, and avoid caffeine and heavy meals before bed. Limiting screen time helps too - blue light from devices disrupts melatonin production.

Prioritizing sleep is not a luxury; it's a necessity for a healthy and productive life.`,
      questions: [
        {
          question: "What happens when we lack sleep?",
          options: ["Improved cognitive functions", "Poor concentration and reduced problem-solving", "Better immune system", "Weight loss"],
          correctAnswer: 1
        },
        {
          question: "How many hours of sleep do adults need per night?",
          options: ["5-6 hours", "6-7 hours", "7-9 hours", "10-12 hours"],
          correctAnswer: 2
        },
        {
          question: "Why should we limit screen time before bed?",
          options: ["Screens are too bright", "Blue light disrupts melatonin production", "It wastes electricity", "It's bad for your eyes"],
          correctAnswer: 1
        }
      ]
    }
  ]
};
