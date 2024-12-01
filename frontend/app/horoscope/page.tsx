//XXXXXXXXXXXXXXXXX This is the fifth version which gives api generated horoscope and also roles and trying creating cards

'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Share2, Download } from 'lucide-react';
import { fetchQuizCategories, generateHoroscope } from '@/lib/api';
import html2canvas from 'html2canvas';

export default function HoroscopePage() {
  const [step, setStep] = useState(0);
  const [categories, setCategories] = useState<any[]>([]);
  const [userResponses, setUserResponses] = useState<Record<string, string>>({});
  const [horoscope, setHoroscope] = useState('');
  const [loading, setLoading] = useState(false);
  const [showCard, setShowCard] = useState(false); // State to show post card

  // Fetch categories from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryResult = await fetchQuizCategories();
        setCategories(categoryResult.categories || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (category: string, value: string) => {
    setUserResponses((prev) => ({ ...prev, [category]: value }));
  };

  const fetchHoroscope = async () => {
    setLoading(true);
    try {
      const result = await generateHoroscope(userResponses);
      setHoroscope(result.horoscope);
    } catch (error) {
      console.error('Error generating horoscope:', error);
      setHoroscope('Failed to generate horoscope. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (step < categories.length - 1) {
      setStep(step + 1);
    } else {
      fetchHoroscope();
    }
  };

  const handleShare = () => {
    setShowCard(true);
  };

  const handleDownload = async () => {
    const cardElement = document.getElementById('post-card');
    if (!cardElement) return;

    const canvas = await html2canvas(cardElement);
    const image = canvas.toDataURL('image/png');

    // Trigger download
    const link = document.createElement('a');
    link.href = image;
    link.download = 'horoscope_post.png';
    link.click();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-600 dark:text-blue-400">
          Your LinkedOut Horoscope
        </h1>
        {!horoscope ? (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
          >
            <label className="block mb-2 font-semibold">{categories[step]?.category}</label>
            <select
              value={userResponses[categories[step]?.category] || ''}
              onChange={(e) =>
                handleInputChange(categories[step]?.category, e.target.value)
              }
              className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="">Select an option</option>
              {categories[step]?.options.map((option: string) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <button
              onClick={nextStep}
              disabled={
                !userResponses[categories[step]?.category] || loading
              }
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? 'Generating...'
                : step === categories.length - 1
                ? 'Generate Horoscope'
                : 'Next'}
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold mb-2 text-blue-600 dark:text-blue-400">
              Your LinkedOut Horoscope for the Day
            </h2>
            <h3 className="text-lg font-semibold mb-4 text-gray-600 dark:text-gray-300">
              Read this before you start posting humblebrags
            </h3>
            <p className="mb-6 text-gray-700 dark:text-gray-300">{horoscope}</p>
            <button
              onClick={handleShare}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md flex items-center justify-center"
            >
              <Share2 className="mr-2" />
              Spread the cringe
            </button>
          </motion.div>
        )}

        {/* Post Card Modal */}
        {showCard && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div
              id="post-card"
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm"
            >
              <h2 className="text-xl font-bold text-center mb-4 text-blue-600 dark:text-blue-400">
                LinkedOut Horoscope
              </h2>
              <p className="text-gray-700 dark:text-gray-300">{horoscope}</p>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => setShowCard(false)}
                  className="bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-md"
                >
                  Close
                </button>
                <button
                  onClick={handleDownload}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md flex items-center"
                >
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


//XXXXXX This is the first version which gives hardcoded horoscope

// 'use client'

// import { useState } from 'react'
// import { motion } from 'framer-motion'
// import { Share2 } from 'lucide-react'

// const petOptions = ['Cat', 'Dog', 'Fish', 'Plant']
// const drinkOptions = ['Coffee', 'Tea', 'Energy Drink', 'Kombucha']
// const archetypeOptions = ['The Humble Bragger', 'The Influencer', 'The Thought Leader', 'The Recruiter']

// export default function HoroscopePage() {
//   const [step, setStep] = useState(1)
//   const [pet, setPet] = useState('')
//   const [drink, setDrink] = useState('')
//   const [archetype, setArchetype] = useState('')
//   const [horoscope, setHoroscope] = useState('')

//   const generateHoroscope = () => {
//     const horoscopes = [
//       `As a ${archetype}, your ${pet} energy aligns perfectly with the cosmic LinkedIn algorithm today. Expect a surge in connection requests from people you've never met. Your ${drink} consumption will fuel your productivity to new heights, leading to a groundbreaking post about how you 'hustle while you hydrate.' Remember, the key to success is to sprinkle the word 'synergy' liberally throughout your conversations.`,
//       `The stars have aligned for you, ${archetype}! Your ${pet}'s unconditional love will inspire you to write a viral post about 'What my ${pet} taught me about leadership.' Don't forget to mention how your ${drink} routine is the secret to your success. Today's power move: Use 'disrupt' in every sentence for maximum impact.`,
//       `Attention ${archetype}! The cosmos suggests that your ${pet}'s Instagram account might outperform your LinkedIn profile today. Don't despair! Channel that competitive energy into a lengthy post about how your ${drink} habit has made you a better team player. Pro tip: End every paragraph with #ThoughtLeadership for extra engagement.`
//     ]
//     setHoroscope(horoscopes[Math.floor(Math.random() * horoscopes.length)])
//   }

//   const nextStep = () => {
//     if (step < 3) {
//       setStep(step + 1)
//     } else {
//       generateHoroscope()
//     }
//   }

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center p-4">
//       <div className="w-full max-w-md">
//         <h1 className="text-3xl font-bold text-center mb-8 text-blue-600 dark:text-blue-400">Your LinkedIn Horoscope</h1>
//         {!horoscope ? (
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
//           >
//             <div className="mb-4">
//               <div className="flex justify-between mb-2">
//                 {[1, 2, 3].map((i) => (
//                   <div
//                     key={i}
//                     className={`w-8 h-8 rounded-full flex items-center justify-center ${
//                       i <= step ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
//                     }`}
//                   >
//                     {i}
//                   </div>
//                 ))}
//               </div>
//               <div className="h-2 bg-gray-300 rounded-full">
//                 <div
//                   className="h-full bg-blue-600 rounded-full transition-all duration-300 ease-in-out"
//                   style={{ width: `${((step - 1) / 2) * 100}%` }}
//                 ></div>
//               </div>
//             </div>
//             {step === 1 && (
//               <div>
//                 <label className="block mb-2 font-semibold">Pick your spirit animal (or plant)</label>
//                 <select
//                   value={pet}
//                   onChange={(e) => setPet(e.target.value)}
//                   className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
//                 >
//                   <option value="">Select your favorite pet</option>
//                   {petOptions.map((option) => (
//                     <option key={option} value={option}>
//                       {option}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             )}
//             {step === 2 && (
//               <div>
//                 <label className="block mb-2 font-semibold">Choose your power drink</label>
//                 <select
//                   value={drink}
//                   onChange={(e) => setDrink(e.target.value)}
//                   className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
//                 >
//                   <option value="">Select your favorite drink</option>
//                   {drinkOptions.map((option) => (
//                     <option key={option} value={option}>
//                       {option}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             )}
//             {step === 3 && (
//               <div>
//                 <label className="block mb-2 font-semibold">What's your LinkedIn archetype?</label>
//                 <select
//                   value={archetype}
//                   onChange={(e) => setArchetype(e.target.value)}
//                   className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
//                 >
//                   <option value="">Select your LinkedIn persona</option>
//                   {archetypeOptions.map((option) => (
//                     <option key={option} value={option}>
//                       {option}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             )}
//             <button
//               onClick={nextStep}
//               disabled={
//                 (step === 1 && !pet) ||
//                 (step === 2 && !drink) ||
//                 (step === 3 && !archetype)
//               }
//               className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {step === 3 ? 'Generate Horoscope' : 'Next'}
//             </button>
//           </motion.div>
//         ) : (
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
//           >
//             <h2 className="text-2xl font-bold mb-2 text-blue-600 dark:text-blue-400">Your LinkedIn Horoscope for the Day</h2>
//             <h3 className="text-lg font-semibold mb-4 text-gray-600 dark:text-gray-300">Read this before you start posting humblebrags</h3>
//             <p className="mb-6 text-gray-700 dark:text-gray-300">{horoscope}</p>
//             <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md flex items-center justify-center">
//               <Share2 className="mr-2" />
//               Spread the cringe
//             </button>
//           </motion.div>
//         )}
//       </div>
//     </div>
//   )
// }

//XXXXXX This is the second version which gives api generated horoscope

// 'use client';

// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Share2 } from 'lucide-react';
// import { generateHoroscope } from '@/lib/api'; // Import the API function

// const petOptions = ['Cat', 'Dog', 'Fish', 'Plant'];
// const drinkOptions = ['Coffee', 'Tea', 'Energy Drink', 'Kombucha'];
// const archetypeOptions = ['The Humble Bragger', 'The Influencer', 'The Thought Leader', 'The Recruiter'];

// export default function HoroscopePage() {
//   const [step, setStep] = useState(1);
//   const [pet, setPet] = useState('');
//   const [drink, setDrink] = useState('');
//   const [archetype, setArchetype] = useState('');
//   const [horoscope, setHoroscope] = useState('');
//   const [loading, setLoading] = useState(false); // To show a loading state

//   const fetchHoroscope = async () => {
//     setLoading(true);
//     try {
//       const responses = {
//         "Favorite Pet": pet,
//         "Favorite Drink": drink,
//         "LinkedIn Archetype": archetype,
//       };

//       const result = await generateHoroscope(responses); // Call the API
//       setHoroscope(result.horoscope); // Use the API's response
//     } catch (error) {
//       console.error('Error fetching horoscope:', error);
//       setHoroscope('Failed to generate horoscope. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const nextStep = () => {
//     if (step < 3) {
//       setStep(step + 1);
//     } else {
//       fetchHoroscope(); // Fetch horoscope when all steps are completed
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center p-4">
//       <div className="w-full max-w-md">
//         <h1 className="text-3xl font-bold text-center mb-8 text-blue-600 dark:text-blue-400">
//           Your LinkedIn Horoscope
//         </h1>
//         {!horoscope ? (
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
//           >
//             <div className="mb-4">
//               <div className="flex justify-between mb-2">
//                 {[1, 2, 3].map((i) => (
//                   <div
//                     key={i}
//                     className={`w-8 h-8 rounded-full flex items-center justify-center ${
//                       i <= step ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
//                     }`}
//                   >
//                     {i}
//                   </div>
//                 ))}
//               </div>
//               <div className="h-2 bg-gray-300 rounded-full">
//                 <div
//                   className="h-full bg-blue-600 rounded-full transition-all duration-300 ease-in-out"
//                   style={{ width: `${((step - 1) / 2) * 100}%` }}
//                 ></div>
//               </div>
//             </div>
//             {step === 1 && (
//               <div>
//                 <label className="block mb-2 font-semibold">Pick your spirit animal (or plant)</label>
//                 <select
//                   value={pet}
//                   onChange={(e) => setPet(e.target.value)}
//                   className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
//                 >
//                   <option value="">Select your favorite pet</option>
//                   {petOptions.map((option) => (
//                     <option key={option} value={option}>
//                       {option}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             )}
//             {step === 2 && (
//               <div>
//                 <label className="block mb-2 font-semibold">Choose your power drink</label>
//                 <select
//                   value={drink}
//                   onChange={(e) => setDrink(e.target.value)}
//                   className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
//                 >
//                   <option value="">Select your favorite drink</option>
//                   {drinkOptions.map((option) => (
//                     <option key={option} value={option}>
//                       {option}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             )}
//             {step === 3 && (
//               <div>
//                 <label className="block mb-2 font-semibold">What's your LinkedIn archetype?</label>
//                 <select
//                   value={archetype}
//                   onChange={(e) => setArchetype(e.target.value)}
//                   className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
//                 >
//                   <option value="">Select your LinkedIn persona</option>
//                   {archetypeOptions.map((option) => (
//                     <option key={option} value={option}>
//                       {option}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             )}
//             <button
//               onClick={nextStep}
//               disabled={
//                 (step === 1 && !pet) || (step === 2 && !drink) || (step === 3 && !archetype) || loading
//               }
//               className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {loading ? 'Generating...' : step === 3 ? 'Generate Horoscope' : 'Next'}
//             </button>
//           </motion.div>
//         ) : (
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
//           >
//             <h2 className="text-2xl font-bold mb-2 text-blue-600 dark:text-blue-400">
//               Your LinkedIn Horoscope for the Day
//             </h2>
//             <h3 className="text-lg font-semibold mb-4 text-gray-600 dark:text-gray-300">
//               Read this before you start posting humblebrags
//             </h3>
//             <p className="mb-6 text-gray-700 dark:text-gray-300">{horoscope}</p>
//             <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md flex items-center justify-center">
//               <Share2 className="mr-2" />
//               Spread the cringe
//             </button>
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// }

//XXXXXXXXXXXXXXXXX This is the third version which gives api generated horoscope

// 'use client';

// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { Share2 } from 'lucide-react';
// import { fetchQuizCategories, generateHoroscope } from '@/lib/api'; // Import the API functions

// export default function HoroscopePage() {
//   const [step, setStep] = useState(0);
//   const [categories, setCategories] = useState<any[]>([]); // Store fetched categories
//   const [userResponses, setUserResponses] = useState<Record<string, string>>({});
//   const [horoscope, setHoroscope] = useState('');
//   const [loading, setLoading] = useState(false); // Loading state for API calls

//   // Fetch categories from the backend
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const result = await fetchQuizCategories();
//         setCategories(result.categories || []);
//       } catch (error) {
//         console.error('Error fetching categories:', error);
//       }
//     };
//     fetchCategories();
//   }, []);

//   // Handle input change for each category
//   const handleInputChange = (category: string, value: string) => {
//     setUserResponses((prev) => ({ ...prev, [category]: value }));
//   };

//   // Generate horoscope using user inputs
//   const fetchHoroscope = async () => {
//     setLoading(true);
//     try {
//       const result = await generateHoroscope(userResponses);
//       setHoroscope(result.horoscope);
//     } catch (error) {
//       console.error('Error generating horoscope:', error);
//       setHoroscope('Failed to generate horoscope. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const nextStep = () => {
//     if (step < categories.length - 1) {
//       setStep(step + 1);
//     } else {
//       fetchHoroscope(); // Fetch horoscope when all steps are completed
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center p-4">
//       <div className="w-full max-w-md">
//         <h1 className="text-3xl font-bold text-center mb-8 text-blue-600 dark:text-blue-400">
//           Your LinkedIn Horoscope
//         </h1>
//         {!horoscope ? (
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
//           >
//             {categories.length > 0 && (
//               <>
//                 <label className="block mb-2 font-semibold">{categories[step].category}</label>
//                 <select
//                   value={userResponses[categories[step].category] || ''}
//                   onChange={(e) =>
//                     handleInputChange(categories[step].category, e.target.value)
//                   }
//                   className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
//                 >
//                   <option value="">Select an option</option>
//                   {categories[step].options.map((option: string) => (
//                     <option key={option} value={option}>
//                       {option}
//                     </option>
//                   ))}
//                 </select>
//                 <button
//                   onClick={nextStep}
//                   disabled={!userResponses[categories[step].category] || loading}
//                   className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   {loading ? 'Generating...' : step === categories.length - 1 ? 'Generate Horoscope' : 'Next'}
//                 </button>
//               </>
//             )}
//           </motion.div>
//         ) : (
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
//           >
//             <h2 className="text-2xl font-bold mb-2 text-blue-600 dark:text-blue-400">
//               Your LinkedIn Horoscope for the Day
//             </h2>
//             <h3 className="text-lg font-semibold mb-4 text-gray-600 dark:text-gray-300">
//               Read this before you start posting humblebrags
//             </h3>
//             <p className="mb-6 text-gray-700 dark:text-gray-300">{horoscope}</p>
//             <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md flex items-center justify-center">
//               <Share2 className="mr-2" />
//               Spread the cringe
//             </button>
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// }



//XXXXXXXXXXXXXXXXX This is the fourth version which gives api generated horoscope and also roles

// 'use client';
// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { Share2 } from 'lucide-react';
// import { fetchQuizCategories, generateHoroscope } from '@/lib/api';

// export default function HoroscopePage() {
//   const [step, setStep] = useState(0);
//   const [categories, setCategories] = useState<any[]>([]);
//   const [userResponses, setUserResponses] = useState<Record<string, string>>({});
//   const [horoscope, setHoroscope] = useState('');
//   const [loading, setLoading] = useState(false);

//   // Fetch categories from the backend
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const categoryResult = await fetchQuizCategories();
//         setCategories(categoryResult.categories || []);
//       } catch (error) {
//         console.error('Error fetching categories:', error);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleInputChange = (category: string, value: string) => {
//     setUserResponses((prev) => ({ ...prev, [category]: value }));
//   };

//   const fetchHoroscope = async () => {
//     setLoading(true);
//     try {
//       const result = await generateHoroscope(userResponses);
//       setHoroscope(result.horoscope);
//     } catch (error) {
//       console.error('Error generating horoscope:', error);
//       setHoroscope('Failed to generate horoscope. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const nextStep = () => {
//     if (step < categories.length - 1) {
//       setStep(step + 1);
//     } else {
//       fetchHoroscope();
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center p-4">
//       <div className="w-full max-w-md">
//         <h1 className="text-3xl font-bold text-center mb-8 text-blue-600 dark:text-blue-400">
//           Your LinkedOut Horoscope
//         </h1>
//         {!horoscope ? (
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
//           >
//             <label className="block mb-2 font-semibold">{categories[step]?.category}</label>
//             <select
//               value={userResponses[categories[step]?.category] || ''}
//               onChange={(e) =>
//                 handleInputChange(categories[step]?.category, e.target.value)
//               }
//               className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
//             >
//               <option value="">Select an option</option>
//               {categories[step]?.options.map((option: string) => (
//                 <option key={option} value={option}>
//                   {option}
//                 </option>
//               ))}
//             </select>
//             <button
//               onClick={nextStep}
//               disabled={
//                 !userResponses[categories[step]?.category] || loading
//               }
//               className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {loading
//                 ? 'Generating...'
//                 : step === categories.length - 1
//                 ? 'Generate Horoscope'
//                 : 'Next'}
//             </button>
//           </motion.div>
//         ) : (
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
//           >
//             <h2 className="text-2xl font-bold mb-2 text-blue-600 dark:text-blue-400">
//               Your LinkdOut Horoscope for the Day
//             </h2>
//             <h3 className="text-lg font-semibold mb-4 text-gray-600 dark:text-gray-300">
//               Read this before you start posting humblebrags
//             </h3>
//             <p className="mb-6 text-gray-700 dark:text-gray-300">{horoscope}</p>
//             <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md flex items-center justify-center">
//               <Share2 className="mr-2" />
//               Spread the cringe
//             </button>
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// }
