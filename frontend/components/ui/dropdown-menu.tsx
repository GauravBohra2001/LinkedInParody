//XXXXXXX This is fourth version
import React from "react";

export function DropdownMenu({ children }: { children: React.ReactNode }) {
  return <div className="relative">{children}</div>;
}

export function DropdownMenuTrigger({
  children,
  asChild = false,
}: {
  children: React.ReactNode;
  asChild?: boolean;
}) {
  if (asChild) {
    // Render the children directly if `asChild` is true
    return <>{children}</>;
  }
  return <button className="px-4 py-2">{children}</button>;
}

export function DropdownMenuContent({
  children,
  align = "left", // Default alignment
}: {
  children: React.ReactNode;
  align?: "left" | "right" | "center" | "end"; // Include "end" as a valid option
}) {
  // Add logic to apply alignment styles if necessary
  return <div className={`absolute mt-2 w-48 rounded-md bg-white shadow-lg align-${align}`}>{children}</div>;
}

export function DropdownMenuItem({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
    >
      {children}
    </button>
  );
}



//XXXXX The below code is the first version 

// import React from "react";

// export function DropdownMenu({ children }: { children: React.ReactNode }) {
//   return <div className="relative">{children}</div>;
// }

// export function DropdownMenuTrigger({ children }: { children: React.ReactNode }) {
//   return <button className="px-4 py-2">{children}</button>;
// }

// export function DropdownMenuContent({ children }: { children: React.ReactNode }) {
//   return <div className="absolute mt-2 w-48 rounded-md bg-white shadow-lg">{children}</div>;
// }

// export function DropdownMenuItem({
//   children,
//   onClick,
// }: {
//   children: React.ReactNode;
//   onClick: () => void;
// }) {
//   return (
//     <button
//       onClick={onClick}
//       className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
//     >
//       {children}
//     </button>
//   );
// }

//XXXXXXXXXXXXX This is the second version which solved the errors
// import React from "react";

// export function DropdownMenu({ children }: { children: React.ReactNode }) {
//   return <div className="relative">{children}</div>;
// }

// export function DropdownMenuTrigger({
//   children,
//   asChild = false,
// }: {
//   children: React.ReactNode;
//   asChild?: boolean;
// }) {
//   return asChild ? <>{children}</> : <button className="px-4 py-2">{children}</button>;
// }

// export function DropdownMenuContent({
//   children,
//   align = "left",
//   side = "bottom",
// }: {
//   children: React.ReactNode;
//   align?: "left" | "right" | "center";
//   side?: "top" | "bottom";
// }) {
//   const alignmentClasses = {
//     left: "left-0",
//     right: "right-0",
//     center: "left-1/2 -translate-x-1/2",
//   };

//   const sideClasses = {
//     top: "bottom-full mb-2",
//     bottom: "top-full mt-2",
//   };

//   return (
//     <div
//       className={`absolute ${alignmentClasses[align]} ${sideClasses[side]} w-48 rounded-md bg-white shadow-lg`}
//     >
//       {children}
//     </div>
//   );
// }

// export function DropdownMenuItem({
//   children,
//   onClick,
// }: {
//   children: React.ReactNode;
//   onClick: () => void;
// }) {
//   return (
//     <button
//       onClick={onClick}
//       className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
//     >
//       {children}
//     </button>
//   );
// }

//XXXXXXXXXXXX This is the third version
// import React from "react";

// export function DropdownMenu({ children }: { children: React.ReactNode }) {
//   return <div className="relative">{children}</div>;
// }

// export function DropdownMenuTrigger({ children }: { children: React.ReactNode }) {
//   return <button className="px-4 py-2">{children}</button>;
// }

// export function DropdownMenuContent({
//   children,
//   align = "left", // Default alignment
// }: {
//   children: React.ReactNode;
//   align?: "left" | "right" | "center" | "end"; // Include "end" as a valid option
// }) {
//   // Add logic to apply alignment styles if necessary
//   return <div className={`absolute mt-2 w-48 rounded-md bg-white shadow-lg align-${align}`}>{children}</div>;
// }

// export function DropdownMenuItem({
//   children,
//   onClick,
// }: {
//   children: React.ReactNode;
//   onClick: () => void;
// }) {
//   return (
//     <button
//       onClick={onClick}
//       className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
//     >
//       {children}
//     </button>
//   );
// }
