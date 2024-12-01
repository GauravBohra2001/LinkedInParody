//XXXXXXXXXX This is version four with api and more roles and share button
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Coffee, DollarSign, Share2 } from 'lucide-react';
import { generateJobPost } from '@/lib/api';
import html2canvas from 'html2canvas'; // Ensure this is installed

export default function JobPostsPage() {
  const [jobLevel, setJobLevel] = useState('');
  const [jobRole, setJobRole] = useState('Software Developer');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedPerks, setSelectedPerks] = useState<string[]>([]);
  const [generatedJobPost, setGeneratedJobPost] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const jobLevels = ['Entry Level', 'Mid Level', 'Senior Level', 'Executive'];
  const jobRoles = [
    'Software Developer',
    'Data Scientist',
    'HR',
    'Cybersecurity Analyst',
    'Admin',
    'Product Manager',
    'UI/UX Designer',
    'DevOps Engineer',
  ];
  const skills = [
    'Python',
    'JavaScript',
    'React',
    'Node.js',
    'SQL',
    'Machine Learning',
    'Blockchain',
    'Cloud Computing',
  ];
  const perks = [
    'Unlimited Coffee',
    'Ping Pong Table',
    'Casual Fridays',
    'Pizza Parties',
    'Nap Pods',
    'Motivational Posters',
  ];

  const handleGenerateJobPost = async () => {
    setLoading(true);
    setError('');
    try {
      const jobData = {
        level: jobLevel,
        skills: selectedSkills,
        perks: selectedPerks,
        title: `${jobLevel} ${jobRole}`,
      };

      const response = await generateJobPost(jobData);
      setGeneratedJobPost(response.job_post.description);
    } catch (err) {
      setError('Failed to generate job post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    const postElement = document.getElementById('job-post');
    if (postElement) {
      const canvas = await html2canvas(postElement);
      const image = canvas.toDataURL('image/png');

      const link = document.createElement('a');
      link.href = image;
      link.download = 'job-post.png';
      link.click();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-600 dark:text-blue-400">
          Job Post Generator
        </h1>
        {!generatedJobPost ? (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
          >
            {/* Job Level */}
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Job Level</label>
              <select
                value={jobLevel}
                onChange={(e) => setJobLevel(e.target.value)}
                className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
              >
                <option value="">Select job level</option>
                {jobLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>

            {/* Job Role */}
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Job Role</label>
              <select
                value={jobRole}
                onChange={(e) => setJobRole(e.target.value)}
                className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
              >
                {jobRoles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>

            {/* Skills */}
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Required Skills</label>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <button
                    key={skill}
                    onClick={() =>
                      setSelectedSkills((prev) =>
                        prev.includes(skill)
                          ? prev.filter((s) => s !== skill)
                          : [...prev, skill]
                      )
                    }
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedSkills.includes(skill)
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>

            {/* Perks */}
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Perks Offered</label>
              <div className="flex flex-wrap gap-2">
                {perks.map((perk) => (
                  <button
                    key={perk}
                    onClick={() =>
                      setSelectedPerks((prev) =>
                        prev.includes(perk)
                          ? prev.filter((p) => p !== perk)
                          : [...prev, perk]
                      )
                    }
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedPerks.includes(perk)
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {perk}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleGenerateJobPost}
              disabled={!jobLevel || !jobRole || selectedSkills.length === 0}
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Generating...' : 'Generate Job Post'}
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
              Generated Job Post
            </h2>
            <div
              id="job-post"
              className="mb-4 whitespace-pre-wrap text-gray-700 dark:text-gray-300"
            >
              {generatedJobPost}
            </div>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleShare}
                className="flex items-center bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md"
              >
                <Share2 className="mr-2" />
                Share Job Post
              </button>
              <button
                onClick={() => {
                  setGeneratedJobPost('');
                  setJobLevel('');
                  setJobRole('Software Developer');
                  setSelectedSkills([]);
                  setSelectedPerks([]);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
              >
                Create Another Job Post
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}


//XXXXXXXX This is version one with hardcoded everything

// 'use client'

// import { useState } from 'react'
// import { motion } from 'framer-motion'
// import { Briefcase, Coffee, DollarSign } from 'lucide-react'

// const jobLevels = ['Entry Level', 'Mid Level', 'Senior Level', 'Executive']
// const skills = ['Python', 'JavaScript', 'React', 'Node.js', 'SQL', 'Machine Learning', 'Blockchain', 'Cloud Computing']
// const perks = ['Unlimited Coffee', 'Ping Pong Table', 'Casual Fridays', 'Pizza Parties', 'Nap Pods', 'Motivational Posters']

// export default function JobPostsPage() {
//   const [jobLevel, setJobLevel] = useState('')
//   const [selectedSkills, setSelectedSkills] = useState<string[]>([])
//   const [selectedPerks, setSelectedPerks] = useState<string[]>([])
//   const [jobPost, setJobPost] = useState('')

//   const generateJobPost = () => {
//     const jobTitles = {
//       'Entry Level': 'Junior Synergy Catalyst',
//       'Mid Level': 'Associate Dream Weaver',
//       'Senior Level': 'Senior Disruption Architect',
//       'Executive': 'Chief Visionary Guru'
//     }

//     const jobDescriptions = [
//       `Are you ready to revolutionize the industry with your ${selectedSkills.join(', ')} skills? We're looking for a ${jobLevel} ${jobTitles[jobLevel as keyof typeof jobTitles]} to join our dynamic, fast-paced, slow-moving, and paradoxical team.`,
//       `Calling all ${jobLevel} ninjas, rockstars, and unicorns! We need your ${selectedSkills.join(', ')} superpowers to take our company to the next level (or at least to the next floor of our office building).`,
//       `Want to make a difference in the world, one line of code at a time? Join us as a ${jobLevel} ${jobTitles[jobLevel as keyof typeof jobTitles]} and help us disrupt the disruptors who are disrupting the industry disruptors.`
//     ]

//     const responsibilities = [
//       'Attend countless meetings that could have been emails',
//       'Master the art of looking busy while waiting for your code to compile',
//       'Translate vague client requests into functional features',
//       'Maintain a positive attitude in the face of impossible deadlines',
//       'Optimize your coffee-to-code ratio for maximum productivity'
//     ]

//     const qualifications = [
//       '5+ years of experience in a technology that\'s only existed for 3 years',
//       'Ability to read minds and decipher unclear project requirements',
//       'Expert-level skills in Googling and Stack Overflow navigation',
//       'Proficiency in turning caffeine into code',
//       'Mastery of corporate buzzword bingo'
//     ]

//     const generatedPost = `
//       🚀 Exciting Opportunity Alert! 🚀

//       ${jobDescriptions[Math.floor(Math.random() * jobDescriptions.length)]}

//       🔧 Key Responsibilities:
//       ${responsibilities.sort(() => 0.5 - Math.random()).slice(0, 3).map(r => `• ${r}`).join('\n')}

//       🏆 Qualifications:
//       ${qualifications.sort(() => 0.5 - Math.random()).slice(0, 3).map(q => `• ${q}`).join('\n')}

//       💼 Required Skills:
//       ${selectedSkills.map(skill => `• ${skill} (or the ability to confidently bluff about it)`).join('\n')}

//       🎉 Perks:
//       ${selectedPerks.map(perk => `• ${perk}`).join('\n')}

//       💰 Compensation:
//       Competitive salary* and benefits package
//       *Competitive with what, you ask? That's for us to know and for you to negotiate!

//       If you think you have what it takes to join our elite team of ${jobLevel} professionals, submit your application along with a 500-word essay on why you're passionate about TPS reports.

//       #hiring #techjobs #corporatedreams #synergy #disrupt
//     `

//     setJobPost(generatedPost)
//   }

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center p-4">
//       <div className="w-full max-w-2xl">
//         <h1 className="text-3xl font-bold text-center mb-8 text-blue-600 dark:text-blue-400">Job Post Generator</h1>
//         {!jobPost ? (
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
//           >
//             <div className="mb-4">
//               <label className="block mb-2 font-semibold">Job Level</label>
//               <select
//                 value={jobLevel}
//                 onChange={(e) => setJobLevel(e.target.value)}
//                 className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
//               >
//                 <option value="">Select job level</option>
//                 {jobLevels.map((level) => (
//                   <option key={level} value={level}>
//                     {level}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="mb-4">
//               <label className="block mb-2 font-semibold">Required Skills</label>
//               <div className="flex flex-wrap gap-2">
//                 {skills.map((skill) => (
//                   <button
//                     key={skill}
//                     onClick={() => setSelectedSkills(prev => 
//                       prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
//                     )}
//                     className={`px-3 py-1 rounded-full text-sm ${
//                       selectedSkills.includes(skill)
//                         ? 'bg-blue-600 text-white'
//                         : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
//                     }`}
//                   >
//                     {skill}
//                   </button>
//                 ))}
//               </div>
//             </div>
//             <div className="mb-4">
//               <label className="block mb-2 font-semibold">Perks Offered</label>
//               <div className="flex flex-wrap gap-2">
//                 {perks.map((perk) => (
//                   <button
//                     key={perk}
//                     onClick={() => setSelectedPerks(prev => 
//                       prev.includes(perk) ? prev.filter(p => p !== perk) : [...prev, perk]
//                     )}
//                     className={`px-3 py-1 rounded-full text-sm ${
//                       selectedPerks.includes(perk)
//                         ? 'bg-green-600 text-white'
//                         : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
//                     }`}
//                   >
//                     {perk}
//                   </button>
//                 ))}
//               </div>
//             </div>
//             <button
//               onClick={generateJobPost}
//               disabled={!jobLevel || selectedSkills.length === 0}
//               className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               Generate Job Post
//             </button>
//           </motion.div>
//         ) : (
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
//           >
//             <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Generated Job Post</h2>
//             <div className="mb-4 whitespace-pre-wrap text-gray-700 dark:text-gray-300">{jobPost}</div>
//             <div className="flex gap-2">
//               <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
//                 <Briefcase className="w-4 h-4 mr-1" />
//                 Skill Inflation
//               </span>
//               <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
//                 <Coffee className="w-4 h-4 mr-1" />
//                 Perk Overload
//               </span>
//               <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
//                 <DollarSign className="w-4 h-4 mr-1" />
//                 Salary Ambiguity
//               </span>
//             </div>
//             <button
//               onClick={() => {
//                 setJobPost('')
//                 setJobLevel('')
//                 setSelectedSkills([])
//                 setSelectedPerks([])
//               }}
//               className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
//             >
//               Create Another Job Post
//             </button>
//           </motion.div>
//         )}
//       </div>
//     </div>
//   )
// }

//XXXXXXXXXX This is version two with api

// 'use client';

// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Briefcase, Coffee, DollarSign } from 'lucide-react';
// import { generateJobPost } from '@/lib/api'; // Import the backend API function

// export default function JobPostsPage() {
//   const [jobLevel, setJobLevel] = useState('');
//   const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
//   const [selectedPerks, setSelectedPerks] = useState<string[]>([]);
//   const [jobPost, setJobPost] = useState('');
//   const [loading, setLoading] = useState(false); // To handle loading state
//   const [error, setError] = useState('');

//   const handleGenerateJobPost = async () => {
//     setLoading(true);
//     setError('');
//     try {
//       const jobData = {
//         level: jobLevel,
//         skills: selectedSkills,
//         perks: selectedPerks,
//         title: `${jobLevel} Developer`, // You can adjust this to allow a custom title
//       };

//       const response = await generateJobPost(jobData); // Call the backend API
//       setJobPost(response.job_post.description);
//     } catch (err: any) {
//       setError('Failed to generate job post. Please try again.');
//       console.error('Error:', err.message || err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center p-4">
//       <div className="w-full max-w-2xl">
//         <h1 className="text-3xl font-bold text-center mb-8 text-blue-600 dark:text-blue-400">Job Post Generator</h1>
//         {!jobPost ? (
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
//           >
//             <div className="mb-4">
//               <label className="block mb-2 font-semibold">Job Level</label>
//               <select
//                 value={jobLevel}
//                 onChange={(e) => setJobLevel(e.target.value)}
//                 className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
//               >
//                 <option value="">Select job level</option>
//                 {['Fresher', 'Junior', 'Mid-Level', 'Senior', 'Managerial', 'Executive'].map((level) => (
//                   <option key={level} value={level}>
//                     {level}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="mb-4">
//               <label className="block mb-2 font-semibold">Required Skills</label>
//               <div className="flex flex-wrap gap-2">
//                 {[
//                   'Python',
//                   'JavaScript',
//                   'React',
//                   'Node.js',
//                   'SQL',
//                   'Machine Learning',
//                   'Blockchain',
//                   'Cloud Computing',
//                 ].map((skill) => (
//                   <button
//                     key={skill}
//                     onClick={() =>
//                       setSelectedSkills((prev) =>
//                         prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
//                       )
//                     }
//                     className={`px-3 py-1 rounded-full text-sm ${
//                       selectedSkills.includes(skill)
//                         ? 'bg-blue-600 text-white'
//                         : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
//                     }`}
//                   >
//                     {skill}
//                   </button>
//                 ))}
//               </div>
//             </div>
//             <div className="mb-4">
//               <label className="block mb-2 font-semibold">Perks Offered</label>
//               <div className="flex flex-wrap gap-2">
//                 {[
//                   'Unlimited Coffee',
//                   'Ping Pong Table',
//                   'Casual Fridays',
//                   'Pizza Parties',
//                   'Nap Pods',
//                   'Motivational Posters',
//                 ].map((perk) => (
//                   <button
//                     key={perk}
//                     onClick={() =>
//                       setSelectedPerks((prev) =>
//                         prev.includes(perk) ? prev.filter((p) => p !== perk) : [...prev, perk]
//                       )
//                     }
//                     className={`px-3 py-1 rounded-full text-sm ${
//                       selectedPerks.includes(perk)
//                         ? 'bg-green-600 text-white'
//                         : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
//                     }`}
//                   >
//                     {perk}
//                   </button>
//                 ))}
//               </div>
//             </div>
//             {error && <div className="text-red-600 mb-4">{error}</div>}
//             <button
//               onClick={handleGenerateJobPost}
//               disabled={!jobLevel || selectedSkills.length === 0 || loading}
//               className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {loading ? 'Generating...' : 'Generate Job Post'}
//             </button>
//           </motion.div>
//         ) : (
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
//           >
//             <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Generated Job Post</h2>
//             <div className="mb-4 whitespace-pre-wrap text-gray-700 dark:text-gray-300">{jobPost}</div>
//             <div className="flex gap-2">
//               <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
//                 <Briefcase className="w-4 h-4 mr-1" />
//                 Skill Inflation
//               </span>
//               <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
//                 <Coffee className="w-4 h-4 mr-1" />
//                 Perk Overload
//               </span>
//               <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
//                 <DollarSign className="w-4 h-4 mr-1" />
//                 Salary Ambiguity
//               </span>
//             </div>
//             <button
//               onClick={() => {
//                 setJobPost('');
//                 setJobLevel('');
//                 setSelectedSkills([]);
//                 setSelectedPerks([]);
//               }}
//               className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
//             >
//               Create Another Job Post
//             </button>
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// }


//XXXXXXXXXX This is version three with api and more roles
// 'use client';

// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Briefcase, Coffee, DollarSign } from 'lucide-react';
// import { generateJobPost } from '@/lib/api'; // API function

// export default function JobPostsPage() {
//   const [jobLevel, setJobLevel] = useState('');
//   const [jobRole, setJobRole] = useState('Software Developer'); // Default role
//   const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
//   const [selectedPerks, setSelectedPerks] = useState<string[]>([]);
//   const [generatedJobPost, setGeneratedJobPost] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const jobLevels = ['Entry Level', 'Mid Level', 'Senior Level', 'Executive'];
//   const jobRoles = [
//     'Software Developer',
//     'Data Scientist',
//     'HR',
//     'Cybersecurity Analyst',
//     'Admin',
//     'Product Manager',
//     'UI/UX Designer',
//     'DevOps Engineer',
//   ];
//   const skills = [
//     'Python',
//     'JavaScript',
//     'React',
//     'Node.js',
//     'SQL',
//     'Machine Learning',
//     'Blockchain',
//     'Cloud Computing',
//   ];
//   const perks = [
//     'Unlimited Coffee',
//     'Ping Pong Table',
//     'Casual Fridays',
//     'Pizza Parties',
//     'Nap Pods',
//     'Motivational Posters',
//   ];

//   const handleGenerateJobPost = async () => {
//     setLoading(true);
//     setError('');
//     try {
//       const jobData = {
//         level: jobLevel,
//         skills: selectedSkills,
//         perks: selectedPerks,
//         title: `${jobLevel} ${jobRole}`, // Dynamic role and level
//       };

//       const response = await generateJobPost(jobData);
//       setGeneratedJobPost(response.job_post.description); // Assume description is part of the response
//     } catch (err) {
//       setError('Failed to generate job post. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center p-4">
//       <div className="w-full max-w-2xl">
//         <h1 className="text-3xl font-bold text-center mb-8 text-blue-600 dark:text-blue-400">
//           Job Post Generator
//         </h1>
//         {!generatedJobPost ? (
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
//           >
//             {/* Job Level */}
//             <div className="mb-4">
//               <label className="block mb-2 font-semibold">Job Level</label>
//               <select
//                 value={jobLevel}
//                 onChange={(e) => setJobLevel(e.target.value)}
//                 className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
//               >
//                 <option value="">Select job level</option>
//                 {jobLevels.map((level) => (
//                   <option key={level} value={level}>
//                     {level}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Job Role */}
//             <div className="mb-4">
//               <label className="block mb-2 font-semibold">Job Role</label>
//               <select
//                 value={jobRole}
//                 onChange={(e) => setJobRole(e.target.value)}
//                 className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
//               >
//                 {jobRoles.map((role) => (
//                   <option key={role} value={role}>
//                     {role}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Skills */}
//             <div className="mb-4">
//               <label className="block mb-2 font-semibold">Required Skills</label>
//               <div className="flex flex-wrap gap-2">
//                 {skills.map((skill) => (
//                   <button
//                     key={skill}
//                     onClick={() =>
//                       setSelectedSkills((prev) =>
//                         prev.includes(skill)
//                           ? prev.filter((s) => s !== skill)
//                           : [...prev, skill]
//                       )
//                     }
//                     className={`px-3 py-1 rounded-full text-sm ${
//                       selectedSkills.includes(skill)
//                         ? 'bg-blue-600 text-white'
//                         : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
//                     }`}
//                   >
//                     {skill}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Perks */}
//             <div className="mb-4">
//               <label className="block mb-2 font-semibold">Perks Offered</label>
//               <div className="flex flex-wrap gap-2">
//                 {perks.map((perk) => (
//                   <button
//                     key={perk}
//                     onClick={() =>
//                       setSelectedPerks((prev) =>
//                         prev.includes(perk)
//                           ? prev.filter((p) => p !== perk)
//                           : [...prev, perk]
//                       )
//                     }
//                     className={`px-3 py-1 rounded-full text-sm ${
//                       selectedPerks.includes(perk)
//                         ? 'bg-green-600 text-white'
//                         : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
//                     }`}
//                   >
//                     {perk}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <button
//               onClick={handleGenerateJobPost}
//               disabled={!jobLevel || !jobRole || selectedSkills.length === 0}
//               className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {loading ? 'Generating...' : 'Generate Job Post'}
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
//               Generated Job Post
//             </h2>
//             <div className="mb-4 whitespace-pre-wrap text-gray-700 dark:text-gray-300">
//               {generatedJobPost}
//             </div>
//             <div className="flex gap-2">
//               <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
//                 <Briefcase className="w-4 h-4 mr-1" />
//                 Skill Inflation
//               </span>
//               <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
//                 <Coffee className="w-4 h-4 mr-1" />
//                 Perk Overload
//               </span>
//               <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
//                 <DollarSign className="w-4 h-4 mr-1" />
//                 Salary Ambiguity
//               </span>
//             </div>
//             <button
//               onClick={() => {
//                 setGeneratedJobPost('');
//                 setJobLevel('');
//                 setJobRole('Software Developer');
//                 setSelectedSkills([]);
//                 setSelectedPerks([]);
//               }}
//               className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
//             >
//               Create Another Job Post
//             </button>
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// }


