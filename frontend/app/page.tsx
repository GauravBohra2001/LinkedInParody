//XXXXX This is the version where emojis are not being used
// 'use client'

// import Link from 'next/link'
// import { Coffee, Briefcase, Star } from 'lucide-react'

// export default function Home() {
//   return (
//     <div className="min-h-screen flex flex-col justify-center items-center p-4 relative overflow-hidden">
//       {/* Emojis removed */}
//       <h1 className="text-4xl md:text-6xl font-bold text-center mb-8 text-blue-600 dark:text-blue-400 font-display">
//         Where corporate dreams meet meme-worthy sarcasm
//       </h1>
//       <p className="text-xl md:text-2xl text-center mb-12 text-gray-600 dark:text-gray-300">
//         Mocking LinkedIn one cringe post at a time
//       </p>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
//         <Link href="/horoscope" className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200">
//           <Star className="w-12 h-12 text-yellow-500 mb-4" />
//           <h2 className="text-xl font-semibold mb-2">Horoscope Generator</h2>
//           <p className="text-center text-gray-600 dark:text-gray-300">Find your daily horoscope, LinkedIn-style</p>
//         </Link>
//         <Link href="/job-posts" className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200">
//           <Briefcase className="w-12 h-12 text-blue-500 mb-4" />
//           <h2 className="text-xl font-semibold mb-2">Job Post Generator</h2>
//           <p className="text-center text-gray-600 dark:text-gray-300">Create snarky job posts!</p>
//         </Link>
//         <Link href="/timetable" className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200">
//           <Coffee className="w-12 h-12 text-brown-500 mb-4" />
//           <h2 className="text-xl font-semibold mb-2">Timetable Creator</h2>
//           <p className="text-center text-gray-600 dark:text-gray-300">Plan your hustle, minute by excruciating minute</p>
//         </Link>
//       </div>
//       <Link
//         href="/horoscope"
//         className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full text-lg transition-colors duration-200"
//       >
//         Get Started
//       </Link>
//     </div>
//   )
// }


//XXXXX This was the version where emojis were being used

// 'use client'

// import { useState, useEffect } from 'react'
// import Link from 'next/link'
// import { motion } from 'framer-motion'
// import { Coffee, Briefcase, Star } from 'lucide-react'

// const floatingEmojis = ['💼', '📊', '💻', '☕️', '🚀', '💡', '📈', '🤝']

// export default function Home() {
//   const [emojis, setEmojis] = useState<{ id: number; emoji: string; x: number; y: number }[]>([])

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setEmojis((prevEmojis) => [
//         ...prevEmojis.slice(-20),
//         {
//           id: Date.now(),
//           emoji: floatingEmojis[Math.floor(Math.random() * floatingEmojis.length)],
//           x: Math.random() * window.innerWidth,
//           y: -50,
//         },
//       ])
//     }, 1000)

//     return () => clearInterval(interval)
//   }, [])

//   return (
//     <div className="min-h-screen flex flex-col justify-center items-center p-4 relative overflow-hidden">
//       {emojis.map((emoji) => (
//         <motion.div
//           key={emoji.id}
//           className="absolute text-4xl"
//           initial={{ x: emoji.x, y: emoji.y }}
//           animate={{ y: window.innerHeight + 50 }}
//           transition={{ duration: 10, ease: 'linear' }}
//         >
//           {emoji.emoji}
//         </motion.div>
//       ))}
//       <h1 className="text-4xl md:text-6xl font-bold text-center mb-8 text-blue-600 dark:text-blue-400 font-display">
//         Where corporate dreams meet meme-worthy sarcasm
//       </h1>
//       <p className="text-xl md:text-2xl text-center mb-12 text-gray-600 dark:text-gray-300">
//         Mocking LinkedIn one cringe post at a time
//       </p>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
//         <Link href="/horoscope" className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200">
//           <Star className="w-12 h-12 text-yellow-500 mb-4" />
//           <h2 className="text-xl font-semibold mb-2">Horoscope Generator</h2>
//           <p className="text-center text-gray-600 dark:text-gray-300">Find your daily horoscope, LinkedIn-style</p>
//         </Link>
//         <Link href="/job-posts" className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200">
//           <Briefcase className="w-12 h-12 text-blue-500 mb-4" />
//           <h2 className="text-xl font-semibold mb-2">Job Post Generator</h2>
//           <p className="text-center text-gray-600 dark:text-gray-300">Create snarky job posts!</p>
//         </Link>
//         <Link href="/timetable" className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200">
//           <Coffee className="w-12 h-12 text-brown-500 mb-4" />
//           <h2 className="text-xl font-semibold mb-2">Timetable Creator</h2>
//           <p className="text-center text-gray-600 dark:text-gray-300">Plan your hustle, minute by excruciating minute</p>
//         </Link>
//       </div>
//       <Link
//         href="/horoscope"
//         className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full text-lg transition-colors duration-200"
//       >
//         Get Started
//       </Link>
//     </div>
//   )
// }


//XXXXXXXXXX This is the third version that have text under the get started button and an audio track
'use client'

import Link from 'next/link'
import { Coffee, Briefcase, Star } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Home() {
  const [funnyText, setFunnyText] = useState('');

  // Rotating funny messages
  const messages = [
    "Don't overthink, just click!",
    "This is where the sarcasm begins.",
    "Are you ready to cringe?",
    "Mocking LinkedIn, one click at a time.",
    "Click and brace yourself!"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * messages.length);
      setFunnyText(messages[randomIndex]);
    }, 2000); // Change every 2 seconds

    return () => clearInterval(interval);
  }, []);

  // Function to play sound
  const playSound = () => {
    const audio = new Audio('/funny-evil-cartoon-voice-with-laugh-14623.mp3'); // Ensure the path matches where the audio is located
    audio.play();
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 relative overflow-hidden">
      <h1 className="text-4xl md:text-6xl font-bold text-center mb-8 text-blue-600 dark:text-blue-400 font-display">
        Where corporate dreams meet meme-worthy sarcasm
      </h1>
      <p className="text-xl md:text-2xl text-center mb-12 text-gray-600 dark:text-gray-300">
        Mocking LinkedIn one cringe post at a time
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <Link href="/horoscope" className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200">
          <Star className="w-12 h-12 text-yellow-500 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Horoscope Generator</h2>
          <p className="text-center text-gray-600 dark:text-gray-300">Find your daily horoscope, LinkedIn-style</p>
        </Link>
        <Link href="/job-posts" className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200">
          <Briefcase className="w-12 h-12 text-blue-500 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Job Post Generator</h2>
          <p className="text-center text-gray-600 dark:text-gray-300">Create snarky job posts!</p>
        </Link>
        <Link href="/timetable" className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200">
          <Coffee className="w-12 h-12 text-brown-500 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Timetable Creator</h2>
          <p className="text-center text-gray-600 dark:text-gray-300">Plan your hustle, minute by excruciating minute</p>
        </Link>
      </div>
      <div className="relative flex flex-col items-center">
        <Link
          href="/horoscope"
          onClick={playSound} // Trigger the sound when the button is clicked
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full text-lg transition-transform transform hover:scale-105 duration-200 relative z-10"
        >
          Get Started
        </Link>
        <p className="text-sm mt-8 text-gray-500 dark:text-gray-400 text-center relative">
          {funnyText}
        </p>
      </div>
    </div>
  );
}
