//XXXXXThis is the third version which is API generated and shareable
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { generateTimetable } from '@/lib/api';
import html2canvas from 'html2canvas';
import { Download } from 'lucide-react';

export default function TimetablePage() {
  const [hustlerLevel, setHustlerLevel] = useState('');
  const [tasks, setTasks] = useState<string[]>([]);
  const [newTask, setNewTask] = useState('');
  const [timetable, setTimetable] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const hustlerLevels = [
    'Fresher',
    '40-hour week',
    '70-hour week',
    'Sleep is for the weak',
  ];

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, newTask.trim()]);
      setNewTask('');
    }
  };

  const handleGenerateTimetable = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await generateTimetable({
        hustler_level: hustlerLevel,
        user_input: { tasks },
      });
      setTimetable(response.timetable || []);
    } catch (err) {
      setError('Failed to generate timetable. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    const timetableElement = document.getElementById('timetable-card');
    if (!timetableElement) return;

    const canvas = await html2canvas(timetableElement);
    const image = canvas.toDataURL('image/png');

    // Trigger download
    const link = document.createElement('a');
    link.href = image;
    link.download = 'timetable.png';
    link.click();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-600 dark:text-blue-400">
          Timetable Creator
        </h1>
        {timetable.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
          >
            {/* Hustler Level Selection */}
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Hustler Level</label>
              <select
                value={hustlerLevel}
                onChange={(e) => setHustlerLevel(e.target.value)}
                className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
              >
                <option value="">Select your hustler level</option>
                {hustlerLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>

            {/* Task Input */}
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Add Tasks</label>
              <div className="flex">
                <input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="Enter your ambitious yet unattainable goals here"
                  className="flex-grow p-2 border rounded-l-md dark:bg-gray-700 dark:border-gray-600"
                />
                <button
                  onClick={addTask}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-md"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Task List */}
            {tasks.length > 0 && (
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Your Tasks:</h3>
                <ul className="list-disc pl-5">
                  {tasks.map((task, index) => (
                    <li key={index}>{task}</li>
                  ))}
                </ul>
              </div>
            )}

            <button
              onClick={handleGenerateTimetable}
              disabled={!hustlerLevel || tasks.length === 0 || loading}
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Generating...' : 'Generate Timetable'}
            </button>
            {error && (
              <p className="mt-4 text-red-600 dark:text-red-400">{error}</p>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">
              Your {hustlerLevel} Timetable
            </h2>
            <div
              id="timetable-card"
              className="space-y-2 bg-white dark:bg-gray-800 p-4 rounded-lg"
            >
              {timetable.map((item, index) => (
                <div key={index} className="text-gray-700 dark:text-gray-300">
                  {item}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-6">
              <button
                onClick={handleDownload}
                className="flex items-center bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md"
              >
                <Download className="mr-2" />
                Download Timetable
              </button>
              <button
                onClick={() => {
                  setTimetable([]);
                  setHustlerLevel('');
                  setTasks([]);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
              >
                Create Another Timetable
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}


//XXXXXThis is the hardcoded version

// 'use client'

// import { useState } from 'react'
// import { motion } from 'framer-motion'
// import { AlarmClock, Coffee, Briefcase, Zap, Moon } from 'lucide-react'

// const hustlerLevels = ['Casual', '40-hour week', '70-hour week', 'Sleep is for the weak']

// export default function TimetablePage() {
//   const [hustlerLevel, setHustlerLevel] = useState('')
//   const [tasks, setTasks] = useState<string[]>([])
//   const [newTask, setNewTask] = useState('')
//   const [timetable, setTimetable] = useState<string[]>([])

//   const addTask = () => {
//     if (newTask.trim()) {
//       setTasks([...tasks, newTask.trim()])
//       setNewTask('')
//     }
//   }

//   const generateTimetable = () => {
//     const schedule: string[] = []
//     let wakeUpTime = 8
//     let sleepTime = 22

//     switch (hustlerLevel) {
//       case '40-hour week':
//         wakeUpTime = 7
//         break
//       case '70-hour week':
//         wakeUpTime = 6
//         sleepTime = 23
//         break
//       case 'Sleep is for the weak':
//         wakeUpTime = 5
//         sleepTime = 1 // 1 AM
//         break
//     }

//     for (let hour = wakeUpTime; hour !== sleepTime; hour = (hour % 24) + 1) {
//       const time = `${hour.toString().padStart(2, '0')}:00`
//       let activity = ''

//       if (hour === wakeUpTime) {
//         activity = 'Wake up and question life choices'
//       } else if (hour === 12) {
//         activity = 'Lunch break (aka scrolling through LinkedIn)'
//       } else if (hour === 18) {
//         activity = 'Pretend to leave work'
//       } else if (hour >= 20) {
//         activity = 'Continue working, but from home'
//       } else {
//         activity = tasks[Math.floor(Math.random() * tasks.length)] || 'Busy looking busy'
//       }

//       schedule.push(`${time} - ${activity}`)
//     }

//     setTimetable(schedule)
//   }

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center p-4">
//       <div className="w-full max-w-2xl">
//         <h1 className="text-3xl font-bold text-center mb-8 text-blue-600 dark:text-blue-400">Timetable Creator</h1>
//         {timetable.length === 0 ? (
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
//           >
//             <div className="mb-4">
//               <label className="block mb-2 font-semibold">Hustler Level</label>
//               <select
//                 value={hustlerLevel}
//                 onChange={(e) => setHustlerLevel(e.target.value)}
//                 className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
//               >
//                 <option value="">Select your hustler level</option>
//                 {hustlerLevels.map((level) => (
//                   <option key={level} value={level}>
//                     {level}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="mb-4">
//               <label className="block mb-2 font-semibold">Add Tasks</label>
//               <div className="flex">
//                 <input
//                   type="text"
//                   value={newTask}
//                   onChange={(e) => setNewTask(e.target.value)}
//                   placeholder="Enter your ambitious yet unattainable goals here"
//                   className="flex-grow p-2 border rounded-l-md dark:bg-gray-700 dark:border-gray-600"
//                 />
//                 <button
//                   onClick={addTask}
//                   className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-md"
//                 >
//                   Add
//                 </button>
//               </div>
//             </div>
//             {tasks.length > 0 && (
//               <div className="mb-4">
//                 <h3 className="font-semibold mb-2">Your Tasks:</h3>
//                 <ul className="list-disc pl-5">
//                   {tasks.map((task, index) => (
//                     <li key={index}>{task}</li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//             <button
//               onClick={generateTimetable}
//               disabled={!hustlerLevel || tasks.length === 0}
//               className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               Generate Timetable
//             </button>
//           </motion.div>
//         ) : (
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
//           >
//             <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Your {hustlerLevel} Timetable</h2>
//             <div className="space-y-2">
//               {timetable.map((item, index) => (
//                 <div key={index} className="flex items-center">
//                   {item.includes('Wake up') && <AlarmClock className="w-5 h-5 mr-2 text-red-500" />}
//                   {item.includes('Lunch') && <Coffee className="w-5 h-5 mr-2 text-brown-500" />}
//                   {item.includes('work') && <Briefcase className="w-5 h-5 mr-2 text-blue-500" />}
//                   {item.includes('Busy') && <Zap className="w-5 h-5 mr-2 text-yellow-500" />}
//                   {item.includes('Continue working') && <Moon className="w-5 h-5 mr-2 text-purple-500" />}
//                   <span className="text-gray-700 dark:text-gray-300">{item}</span>
//                 </div>
//               ))}
//             </div>
//             <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
//               <p>* This timetable is guaranteed to impress your LinkedIn connections and make your ex jealous.</p>
//               <p>** Side effects may include burnout, caffeine addiction, and the ability to recite corporate jargon in your sleep.</p>
//             </div>
//             <button
//               onClick={() => {
//                 setTimetable([])
//                 setHustlerLevel('')
//                 setTasks([])
//               }}
//               className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
//             >
//               Create Another Timetable
//             </button>
//           </motion.div>
//         )}
//       </div>
//     </div>
//   )
// }


//XXXXXThis is the second version which is API generated
// 'use client';

// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import { generateTimetable } from '@/lib/api'; // Import API function

// export default function TimetablePage() {
//   const [hustlerLevel, setHustlerLevel] = useState('');
//   const [tasks, setTasks] = useState<string[]>([]);
//   const [newTask, setNewTask] = useState('');
//   const [timetable, setTimetable] = useState<string[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const hustlerLevels = [
//     'Fresher',
//     '40-hour week',
//     '70-hour week',
//     'Sleep is for the weak',
//   ];

//   const addTask = () => {
//     if (newTask.trim()) {
//       setTasks([...tasks, newTask.trim()]);
//       setNewTask('');
//     }
//   };

//   const handleGenerateTimetable = async () => {
//     setLoading(true);
//     setError('');
//     try {
//       const response = await generateTimetable({
//         hustler_level: hustlerLevel,
//         user_input: { tasks },
//       });
//       setTimetable(response.timetable || []);
//     } catch (err) {
//       setError('Failed to generate timetable. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center p-4">
//       <div className="w-full max-w-2xl">
//         <h1 className="text-3xl font-bold text-center mb-8 text-blue-600 dark:text-blue-400">
//           Timetable Creator
//         </h1>
//         {timetable.length === 0 ? (
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
//           >
//             {/* Hustler Level Selection */}
//             <div className="mb-4">
//               <label className="block mb-2 font-semibold">Hustler Level</label>
//               <select
//                 value={hustlerLevel}
//                 onChange={(e) => setHustlerLevel(e.target.value)}
//                 className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
//               >
//                 <option value="">Select your hustler level</option>
//                 {hustlerLevels.map((level) => (
//                   <option key={level} value={level}>
//                     {level}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Task Input */}
//             <div className="mb-4">
//               <label className="block mb-2 font-semibold">Add Tasks</label>
//               <div className="flex">
//                 <input
//                   type="text"
//                   value={newTask}
//                   onChange={(e) => setNewTask(e.target.value)}
//                   placeholder="Enter your ambitious yet unattainable goals here"
//                   className="flex-grow p-2 border rounded-l-md dark:bg-gray-700 dark:border-gray-600"
//                 />
//                 <button
//                   onClick={addTask}
//                   className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-md"
//                 >
//                   Add
//                 </button>
//               </div>
//             </div>

//             {/* Task List */}
//             {tasks.length > 0 && (
//               <div className="mb-4">
//                 <h3 className="font-semibold mb-2">Your Tasks:</h3>
//                 <ul className="list-disc pl-5">
//                   {tasks.map((task, index) => (
//                     <li key={index}>{task}</li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//             <button
//               onClick={handleGenerateTimetable}
//               disabled={!hustlerLevel || tasks.length === 0 || loading}
//               className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {loading ? 'Generating...' : 'Generate Timetable'}
//             </button>
//             {error && (
//               <p className="mt-4 text-red-600 dark:text-red-400">{error}</p>
//             )}
//           </motion.div>
//         ) : (
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
//           >
//             <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">
//               Your {hustlerLevel} Timetable
//             </h2>
//             <div className="space-y-2">
//               {timetable.map((item, index) => (
//                 <div key={index} className="text-gray-700 dark:text-gray-300">
//                   {item}
//                 </div>
//               ))}
//             </div>
//             <button
//               onClick={() => {
//                 setTimetable([]);
//                 setHustlerLevel('');
//                 setTasks([]);
//               }}
//               className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
//             >
//               Create Another Timetable
//             </button>
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// }


