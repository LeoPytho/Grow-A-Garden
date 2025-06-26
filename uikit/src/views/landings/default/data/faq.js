// @project
import branding from '@/branding.json'; // Assuming branding.json might contain 'Grow A Garden' for brandName

export const faq = {
  heading: 'Frequently Asked Questions',
  caption: `Answers to common queries about the ${branding.brandName} Info Channel.`,
  defaultExpanded: 'Accessing Information', // New default expanded category
  faqList: [
    {
      question: `What is the ${branding.brandName} Info Channel?`,
      answer: `The ${branding.brandName} Info Channel is your go-to source for real-time data from the Grow A Garden Roblox game. We provide up-to-date information on in-game stock, current weather conditions within the game, and precise restock times to help you optimize your gardening strategy.`,
      category: 'General Information'
    },
    {
      question: `How frequently is the information updated?`,
      answer: `Our data is designed to be as real-time as possible. Stock and restock times are updated every few minutes, while in-game weather information is refreshed every 15 minutes to ensure you have the latest data for your farming decisions.`,
      category: 'Data & Updates'
    },
    {
      question: `Where does the stock and restock information come from?`,
      answer: `The stock and restock data is directly sourced from the Grow A Garden game servers through official APIs (or carefully monitored in-game data streams). We strive for accuracy and reliability to ensure you have the best information available.`,
      category: 'Data & Updates'
    },
    {
      question: `Is the in-game weather information accurate?`,
      answer: `Yes, our in-game weather data reflects the actual weather conditions within the Grow A Garden game. This can be crucial for planning your planting and harvesting activities, as certain plants may thrive in specific weather conditions.`,
      category: 'Data & Updates'
    },
    {
      question: `Do I need to be logged into Roblox to use this channel?`,
      answer: `No, you do not need to be logged into Roblox to view the information on our channel. It's publicly accessible to help all players plan their game sessions effectively.`,
      category: 'Accessing Information'
    },
    {
      question: `Can I access historical stock or weather data?`,
      answer: `Currently, the ${branding.brandName} Info Channel focuses on providing real-time and near real-time data. Historical data logging and access features are something we are considering for future updates based on community feedback.`,
      category: 'Data & Updates'
    },
    {
      question: 'Are there any fees to use the Info Channel?',
      answer: 'No, the Grow A Garden Info Channel is completely free to use for all players. Our goal is to enhance your gaming experience by providing valuable information.',
      category: 'General Information'
    },
    {
      question: 'How can I report inaccurate information?',
      answer: `If you notice any discrepancies or believe information is inaccurate, please use the "Get in Touch" link below to contact our support team. Provide as much detail as possible, including screenshots or specific times, to help us investigate.`,
      category: 'Support & Feedback'
    },
    {
      question: 'Will new features be added to the Info Channel?',
      answer: {
        content: `Absolutely! We are continuously working to improve the ${branding.brandName} Info Channel. Future updates may include advanced filtering options, personalized alerts, and more detailed insights into game mechanics.`,
        type: 'list',
        data: [
          { primary: `New Data Points (e.g., specific item prices)` },
          { primary: `Personalized Notifications` },
          { primary: `Community-driven Feature Requests` }
        ]
      },
      category: 'Future Developments'
    },
    {
      question: 'Is this an official Grow A Garden tool?',
      answer: `The ${branding.brandName} Info Channel is a community-driven resource created to support players of Grow A Garden. While it's built to be as accurate as possible using available data, it is not officially developed or maintained by the Roblox Corporation or the Grow A Garden game developers.`,
      category: 'General Information'
    },
  ],
  getInTouch: {
    link: { children: 'Get in Touch', href: branding.company.socialLink.support, target: '_blank', rel: 'noopener noreferrer' }
  },
  categories: ['General Information', 'Data & Updates', 'Accessing Information', 'Support & Feedback', 'Future Developments'],
  activeCategory: 'General Information'
};
