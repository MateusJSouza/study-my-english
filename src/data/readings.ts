export interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Reading {
  title: string;
  description: string;
  content: string;
  questions: Question[];
}

export const readings: Record<string, Reading[]> = {
  A1: [
    {
      title: "My Daily Routine",
      description: "A simple text about a typical day",
      content: `Hello! My name is Maria. I want to tell you about my daily routine.\n\nEvery morning, I wake up at 7 o'clock. I brush my teeth and wash my face. Then I eat breakfast. I like to eat bread with butter and drink orange juice.\n\nAfter breakfast, I go to work. I work in an office. I start work at 9 o'clock and finish at 5 o'clock. I have lunch at 1 o'clock. I usually eat a sandwich and drink water.\n\nIn the evening, I go home. I cook dinner and watch TV. I like to watch movies. At 10 o'clock, I go to bed.\n\nI like my routine because it is simple and comfortable. Every day is the same, and I feel happy.`,
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
          options: ["In a school", "In an office", "In a hospital", "In a restaurant"],
          correctAnswer: 1
        }
      ]
    },
    {
      title: "At the Supermarket",
      description: "Shopping for groceries",
      content: `Today I went to the supermarket. I needed to buy food for the week.\n\nFirst, I bought some fruits. I like apples and bananas. They are healthy and delicious. I also bought some vegetables. I got tomatoes, carrots, and lettuce.\n\nThen, I went to the dairy section. I bought milk, cheese, and yogurt. My family drinks a lot of milk, so I bought two bottles.\n\nNext, I went to the meat section. I bought some chicken and fish. We eat meat three times a week.\n\nFinally, I bought some bread and rice. These are important foods in my country. I also bought some chocolate because I like sweets.\n\nI paid at the cashier and went home. Shopping at the supermarket is easy and convenient. I go there every Saturday.`,
      questions: [
        {
          question: "What fruits did the person buy?",
          options: ["Oranges and grapes", "Apples and bananas", "Strawberries and melons", "Pears and peaches"],
          correctAnswer: 1
        },
        {
          question: "How many bottles of milk did the person buy?",
          options: ["One", "Two", "Three", "Four"],
          correctAnswer: 1
        },
        {
          question: "When does the person go to the supermarket?",
          options: ["Every Monday", "Every Friday", "Every Saturday", "Every Sunday"],
          correctAnswer: 2
        }
      ]
    }
  ],
  A2: [
    {
      title: "A Weekend Trip",
      description: "Planning and enjoying a short vacation",
      content: `Last weekend, my friends and I decided to take a short trip to the mountains. We wanted to escape from the city and enjoy nature.\n\nWe left early on Saturday morning. The weather was perfect - sunny but not too hot. The journey took about two hours by car. During the drive, we listened to music and talked about our plans for the day.\n\nWhen we arrived, we checked into a small hotel. The hotel was cozy and had a beautiful view of the mountains. After settling in, we went for a hike. The trail was not very difficult, but it was long. We saw many trees, flowers, and even some wild animals.\n\nIn the evening, we had dinner at a local restaurant. The food was delicious and not expensive. We tried some traditional dishes that we had never eaten before.\n\nOn Sunday, we woke up early to watch the sunrise. It was breathtaking! After breakfast, we visited a nearby lake. The water was crystal clear, and we took many photos.\n\nWe returned to the city on Sunday afternoon. Although we were tired, we felt refreshed and happy. It was a perfect weekend getaway.`,
      questions: [
        {
          question: "How long did the journey to the mountains take?",
          options: ["One hour", "Two hours", "Three hours", "Four hours"],
          correctAnswer: 1
        },
        {
          question: "What did they do on Sunday morning?",
          options: ["Went shopping", "Watched the sunrise", "Visited a museum", "Played sports"],
          correctAnswer: 1
        },
        {
          question: "How did they feel when they returned to the city?",
          options: ["Bored and sad", "Angry and frustrated", "Tired but happy", "Excited and energetic"],
          correctAnswer: 2
        }
      ]
    }
  ],
  B1: [
    {
      title: "The Impact of Social Media",
      description: "Analyzing the effects of social media on society",
      content: `Social media has revolutionized the way we communicate, share information, and connect with others. While these platforms offer numerous benefits, they also present significant challenges.\n\nOne advantage is connecting people across vast distances. Families can video call across oceans. Professional networking has been transformed globally.\n\nHowever, studies show excessive use is linked to mental health issues. Constant comparison can lead to feelings of inadequacy and depression. Privacy is another concern, with companies collecting vast amounts of personal data.\n\nDespite challenges, social media is not inherently good or bad. The key lies in mindful use, verifying information, and maintaining balance between online and offline life.`,
      questions: [
        {
          question: "According to the text, what is one advantage of social media?",
          options: ["It replaces traditional media", "It connects people across distances", "It prevents cyberbullying", "It protects user privacy"],
          correctAnswer: 1
        },
        {
          question: "What mental health issue is associated with excessive social media use?",
          options: ["Improved self-esteem", "Better sleep quality", "Depression and inadequacy", "Increased happiness"],
          correctAnswer: 2
        },
        {
          question: "What does the text suggest as a solution?",
          options: ["Banning social media completely", "Using it mindfully and maintaining balance", "Only using one platform", "Sharing all information freely"],
          correctAnswer: 1
        }
      ]
    }
  ],
  B2: [
    {
      title: "The Psychology of Decision Making",
      description: "Understanding how we make choices",
      content: `Every day, we make thousands of decisions. Understanding the psychology behind decision-making can help us make better choices.\n\nResearch shows humans rely on mental shortcuts called heuristics. Daniel Kahneman and Amos Tversky identified cognitive biases that influence our choices.\n\nThe availability heuristic causes us to overestimate easily recalled events. Loss aversion means we feel losses more intensely than equivalent gains. Decision fatigue shows our capacity diminishes throughout the day.\n\nUnderstanding these factors helps us recognize when judgment might be compromised. Important decisions are often better made earlier in the day when mental resources are fresh.`,
      questions: [
        {
          question: "Who conducted groundbreaking work on cognitive biases?",
          options: ["Sigmund Freud", "Daniel Kahneman and Amos Tversky", "B.F. Skinner", "Carl Jung"],
          correctAnswer: 1
        },
        {
          question: "What is the availability heuristic?",
          options: ["Making decisions based on available resources", "Overestimating likelihood of easily recalled events", "Choosing the first available option", "Avoiding difficult decisions"],
          correctAnswer: 1
        },
        {
          question: "According to the text, when are important decisions better made?",
          options: ["Late at night", "After many other decisions", "Earlier in the day", "During stressful times"],
          correctAnswer: 2
        }
      ]
    }
  ]
};
