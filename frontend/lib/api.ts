const API_BASE_URL = 'http://localhost:5000'; // Adjust this to match your Flask server's address

// export async function fetchRoles() {
//   const response = await fetch(`${API_BASE_URL}/roles`);
//   if (!response.ok) {
//     throw new Error('Failed to fetch roles');
//   }
//   return response.json();
// }


export async function fetchQuizCategories() {
  const response = await fetch(`${API_BASE_URL}/quiz-categories`);
  if (!response.ok) {
    throw new Error('Failed to fetch quiz categories');
  }
  return response.json();
}

export async function submitQuiz(responses: Record<string, string>) {
  const response = await fetch(`${API_BASE_URL}/submit-quiz`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(responses),
  });
  if (!response.ok) {
    throw new Error('Failed to submit quiz');
  }
  return response.json();
}

export async function generateHoroscope(responses: Record<string, string>) {
  const response = await fetch(`${API_BASE_URL}/generate-horoscope`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(responses),
  });
  if (!response.ok) {
    throw new Error('Failed to generate horoscope');
  }
  return response.json();
}

export async function generateJobPost(jobData: Record<string, any>) {
  const response = await fetch(`${API_BASE_URL}/generate-job-post`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(jobData),
  });
  if (!response.ok) {
    throw new Error('Failed to generate job post');
  }
  return response.json();
}

export async function generateTimetable(timetableData: Record<string, any>) {
  const response = await fetch(`${API_BASE_URL}/generate-timetable`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(timetableData),
  });
  if (!response.ok) {
    throw new Error('Failed to generate timetable');
  }
  return response.json();
}

