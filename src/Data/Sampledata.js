export const sampleCourses = [
  {
    id: 1,
    title: "Introduction to Web Development",
    category: "Tech",
    duration: "15 min",
    level: "Beginner",
    description: "Learn the basics of HTML, CSS, and JavaScript",
    progress: 60,
    rating: 4.8,
    enrolled: 1234,
    lessons: [
      { id: 1, title: "What is Web Development?", duration: "3 min", completed: true },
      { id: 2, title: "HTML Basics", duration: "4 min", completed: true },
      { id: 3, title: "CSS Fundamentals", duration: "4 min", completed: false },
      { id: 4, title: "JavaScript Introduction", duration: "4 min", completed: false }
    ]
  },
  {
    id: 2,
    title: "Starting Your Side Hustle",
    category: "Hustles",
    duration: "12 min",
    level: "Beginner",
    description: "Practical steps to launch your business in Africa",
    progress: 25,
    rating: 4.9,
    enrolled: 2156,
    lessons: [
      { id: 1, title: "Identifying Opportunities", duration: "3 min", completed: true },
      { id: 2, title: "Market Research", duration: "3 min", completed: false },
      { id: 3, title: "Building Your MVP", duration: "3 min", completed: false },
      { id: 4, title: "Finding Customers", duration: "3 min", completed: false }
    ]
  },
  {
    id: 3,
    title: "Personal Finance Basics",
    category: "Personal Finance",
    duration: "18 min",
    level: "Beginner",
    description: "Money management skills for young Africans",
    progress: 0,
    rating: 4.7,
    enrolled: 3421,
    lessons: [
      { id: 1, title: "Budgeting 101", duration: "4 min", completed: false },
      { id: 2, title: "Saving Strategies", duration: "4 min", completed: false },
      { id: 3, title: "Investment Basics", duration: "5 min", completed: false },
      { id: 4, title: "Building Credit", duration: "5 min", completed: false }
    ]
  },
  {
    id: 4,
    title: "Mobile App Development with React Native",
    category: "Tech",
    duration: "20 min",
    level: "Intermediate",
    description: "Build mobile apps for Android and iOS",
    progress: 0,
    rating: 4.6,
    enrolled: 892,
    lessons: [
      { id: 1, title: "React Native Setup", duration: "5 min", completed: false },
      { id: 2, title: "Components and Navigation", duration: "5 min", completed: false },
      { id: 3, title: "State Management", duration: "5 min", completed: false },
      { id: 4, title: "Publishing Your App", duration: "5 min", completed: false }
    ]
  },
  {
    id: 5,
    title: "Digital Marketing for Small Business",
    category: "Hustles",
    duration: "16 min",
    level: "Beginner",
    description: "Grow your business online with digital marketing",
    progress: 0,
    rating: 4.5,
    enrolled: 1567,
    lessons: [
      { id: 1, title: "Social Media Strategy", duration: "4 min", completed: false },
      { id: 2, title: "Content Creation", duration: "4 min", completed: false },
      { id: 3, title: "Email Marketing", duration: "4 min", completed: false },
      { id: 4, title: "Analytics and Growth", duration: "4 min", completed: false }
    ]
  },
  {
    id: 6,
    title: "Cryptocurrency and Blockchain Basics",
    category: "Personal Finance",
    duration: "14 min",
    level: "Beginner",
    description: "Understand digital currencies and blockchain technology",
    progress: 0,
    rating: 4.4,
    enrolled: 2103,
    lessons: [
      { id: 1, title: "What is Cryptocurrency?", duration: "4 min", completed: false },
      { id: 2, title: "How Blockchain Works", duration: "3 min", completed: false },
      { id: 3, title: "Safe Trading Practices", duration: "4 min", completed: false },
      { id: 4, title: "Future of Digital Money", duration: "3 min", completed: false }
    ]
  }
];

export const sampleUser = {
  name: "Amara Okonkwo",
  email: "amara@example.com",
  streak: 7,
  xp: 2450,
  level: 3,
  badges: ["First Course", "Week Warrior", "Tech Explorer", "Finance Guru"],
  completedCourses: 2,
  totalCourses: 15
};