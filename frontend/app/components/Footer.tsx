
//XXX This is the second version with image
import { Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 shadow-inner">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img
              src="/I am chill Guy.jpeg"
              alt="I am Chill Guy"
              className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-600"
            />
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Built by a frustrated LinkedIn user. If this app annoyed you, my job is done.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/GauravBohra2001/LinkedInParody"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors duration-200"
            >
              <span className="sr-only">GitHub</span>
              <Github className="h-6 w-6" />
            </a>
            <a
              href="https://github.com/GauravBohra2001/LinkedInParody"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors duration-200 text-sm"
            >
              Project Credits
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}


//XXThis is the first version
// import { Github } from 'lucide-react'
// export default function Footer() {
//   return (
//     <footer className="bg-white dark:bg-gray-800 shadow-inner">
//       <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center">
//           <p className="text-gray-500 dark:text-gray-400 text-sm">
//             Built by an frustrated Linkdln user. If this app annoyed you, my job is done.
//           </p>
//           <div className="flex items-center space-x-4">
//             <a
//               href="https://github.com/yourusername/linkedout"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors duration-200"
//             >
//               <span className="sr-only">GitHub</span>
//               <Github className="h-6 w-6" />
//             </a>
//             <a
//               href="#"
//               className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors duration-200 text-sm"
//             >
//               Project Credits
//             </a>
//           </div>
//         </div>
//       </div>
//     </footer>
//   )
// }


