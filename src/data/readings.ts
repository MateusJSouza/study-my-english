export interface Question {
  question: string;
  correctAnswer: boolean;
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
      content: `Hello! My name is Maria. I want to tell you about my daily routine.

Every morning, I wake up at 7 o'clock. I brush my teeth and wash my face. Then I eat breakfast. I like to eat bread with butter and drink orange juice.

After breakfast, I go to work. I work in an office. I start work at 9 o'clock and finish at 5 o'clock. I have lunch at 1 o'clock. I usually eat a sandwich and drink water.

In the evening, I go home. I cook dinner and watch TV. I like to watch movies. At 10 o'clock, I go to bed.

I like my routine because it is simple and comfortable. Every day is the same, and I feel happy.`,
      questions: [
        {
          question: "Maria wakes up at 7 o'clock every day.",
          correctAnswer: true
        },
        {
          question: "Maria drinks coffee for breakfast.",
          correctAnswer: false
        },
        {
          question: "Maria works in a hospital.",
          correctAnswer: false
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
          question: "The person bought oranges and grapes.",
          correctAnswer: false
        },
        {
          question: "The person bought two bottles of milk.",
          correctAnswer: true
        },
        {
          question: "The person goes to the supermarket every Sunday.",
          correctAnswer: false
        }
      ]
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
          question: "The trip to the mountains lasted three hours.",
          correctAnswer: false
        },
        {
          question: "On Sunday morning, they visited a museum.",
          correctAnswer: false
        },
        {
          question: "They felt tired but happy when they returned to the city.",
          correctAnswer: true
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
          question: "One advantage of social media is that it replaces traditional media.",
          correctAnswer: false
        },
        {
          question: "Excessive use of social media can be linked to mental health issues.",
          correctAnswer: true
        },
        {
          question: "The solution suggested in the text is to completely ban social media.",
          correctAnswer: false
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
          question: "Daniel Kahneman and Amos Tversky conducted groundbreaking work on cognitive biases.",
          correctAnswer: true
        },
        {
          question: "The availability heuristic refers to making decisions based on available resources.",
          correctAnswer: false
        },
        {
          question: "Important decisions are best made at the end of the day.",
          correctAnswer: false
        }
      ]
    },
    {
      title: "The Importance of Sleep",
      description: "Exploring why sleep is crucial for health and well-being",
      content: `Sleep is a fundamental human need, much like eating, drinking, and breathing. It is vital for our physical and mental health. When we sleep, our bodies rest and repair themselves, and our brains process information and consolidate memories.

A lack of sleep can have serious consequences. It can impair our cognitive functions, leading to poor concentration, reduced problem-solving skills, and decreased creativity. Physically, chronic sleep deprivation can weaken the immune system, increase the risk of chronic diseases like diabetes and heart disease, and contribute to weight gain.

Children and teenagers need more sleep than adults because their bodies and brains are still developing. Adults typically need 7-9 hours of sleep per night, while teenagers need 8-10 hours, and school-aged children need 9-11 hours.

To improve sleep quality, it's recommended to establish a regular sleep schedule, create a relaxing bedtime routine, ensure the bedroom is dark, quiet, and cool, and avoid caffeine and heavy meals before bed. Limiting screen time before sleep also helps, as the blue light emitted from devices can disrupt melatonin production, a hormone that regulates sleep.

Prioritizing sleep is not a luxury; it's a necessity for a healthy and productive life.`,
      questions: [
        {
          question: "Lack of sleep can improve cognitive functions.",
          correctAnswer: false
        },
        {
          question: "Adults need 7 to 9 hours of sleep per night.",
          correctAnswer: true
        },
        {
          question: "Limiting screen time before bed helps produce melatonin.",
          correctAnswer: false
        }
      ]
    }
  ]
};
