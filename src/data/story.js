const story = {
  start: 'arrival',
  passages: {
    arrival: {
      text: "Oh hey! You made it here. What brought you?",
      choices: [
        { label: "I want to give you a job 💼", target: 'recruiter' },
        { label: "Just exploring ✨",            target: 'explorer'  },
      ],
    },
    recruiter: {
      text: "Oh exciting! Let me show you what I've built. I think you'll like it.",
      choices: [
        { label: "Show me your projects →", navigateTo: 'projects' },
      ],
    },
    explorer: {
      text: "Welcome! Let's start from the beginning — a little about me first.",
      choices: [
        { label: "Tell me about you →", navigateTo: 'about' },
      ],
    },
  },
};

export default story;
