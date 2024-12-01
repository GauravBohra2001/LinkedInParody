from flask import Flask, jsonify, request
import google.generativeai as genai
import random
import config
from flask_cors import CORS  # Import CORS

# Configure Gemini API
genai.configure(api_key=config.API_KEY)  # Replace with your actual API key
model = genai.GenerativeModel("gemini-1.5-flash")

# Initialize Flask app
app = Flask(__name__)

# Configure CORS
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# Main Page
@app.route("/")
def hello():

    return "Hello World"

# # Roles Endpoint
# @app.route('/roles', methods=['GET'])
# def get_roles():
#     serious_roles = [
#         "CEO/Founder", "Fresher", "Software Developer", "Data Scientist", 
#         "Product Manager", "Marketing Specialist", "HR", 
#         "Sales Executive", "Admin", "Designer", 
#         "C-Suite (COO, CFO, etc.)", "LinkedIn Influencer", 
#         "Intern with CEO Dreams", "Data Analyst", "People Champion",
#         "Devops"
#     ]
#     return jsonify({'roles': serious_roles})

# Quiz Categories Endpoint
@app.route('/quiz-categories', methods=['GET'])
def get_quiz_categories():
    quiz_categories = [
        {"category": "Your Role", "options": [
        "CEO/Founder", "Fresher", "Software Developer", "Data Scientist", 
        "Product Manager", "Marketing Specialist", "HR", 
        "Sales Executive", "Admin", "Designer", 
        "C-Suite (COO, CFO, etc.)", "LinkedIn Influencer", 
        "Intern with CEO Dreams", "Data Analyst", "People Champion",
        "Devops"
        ]},
        {"category": "Favorite Pet", "options": ["Dog", "Cat", "Fish", "Desk Plant", "A Pet Rock", "No Pet (Too busy hustling)"]},
        {"category": "Favorite Drink", "options": ["Coffee", "Tea", "Energy Drinks", "Fancy Sparkling Water", "Plain Water", "Kombucha"]},
        {"category": "Most-Used Office Supply", "options": ["Sticky Notes", "Highlighter", "Printer", "Stapler", "Paperclips"]},
        {"category": "LinkedIn Archetype", "options": ["Humblebragger", "Motivational Guru", "Inspirational Failure Poster", "Meme Sharer (but not cringe memes)", "Buzzwords Popular"]},
        {"category": "Favourite Career Buzzwords", "options": ["Synergy", "Disruptive Innovation", "KPIs", "Circle Back", "Hustle"]},
        #{"category": "Post-Apocalyptic Career Role", "options": ["AI’s Personal Therapist", "Virtual Meeting Police", "Cloud Storage Farmer", "Time Zone Juggler", "Emotion Coach for Robots"]},
        {"category": "Weird Co-Worker Behavior", "options": ["Frequesnt Smoke Breaks", "Constant Interruption", "Crypto Obsession Guy", "Nosy", "The Co-Worker Who Eats Loudly", "The wannabe Senior"]},
        {"category": "LinkedIn Rejection Excuses You Hate", "options": ["We’ve gone in another direction", "You’re overqualified", "No response at all", "We loved you, but the budget wasn’t approved", "You don’t meet our cultural fit"]},
        {"category": "Favorite Snack", "options": ["Leftover Biryani", "Chips (Family-Sized Bag, Single Serving)", "Healthy Almonds (Focusing on Health)", "Peanuts", "Free Cookies (From the Pantry)"]},
        #{"category": "Drink Order", "options": ["Chai Tea","Black Coffee", "Pumpkin Spice Latte", "Cold Brew", "Flat White (but make it Instagram-worthy)", "Decaf"]},
        {"category": "Favorite Office Excuse", "options": ["The Wi-Fi is down.", "It’s a system issue.", "I’m waiting for approval.", "Let’s take it offline.", "Sorry, I missed this email."]},
        {"category": "Most Annoying Corporate Jargon", "options": ["Let’s circle back.", "Leverage synergies.", "Think outside the box.", "Let’s align.", "Deep dive into this."]},
        {"category": "Worst Meeting Habit", "options": ["Talking over everyone.", "Eating loudly.", "Turning every meeting into a brainstorming session.", "Unmuted keyboard warrior.", "Scheduling a meeting for an email-worthy topic."]}
    ]
    return jsonify({"categories": quiz_categories})
        
# Temporary Storage for Quiz Responses
submitted_quiz_responses = []

# Submit Quiz Endpoint
@app.route('/submit-quiz', methods=['POST'])
def submit_quiz():
    try:
        user_responses = request.json
        required_categories = [
            "Favorite Pet", "Favorite Drink", "Most-Used Office Supply",
            "LinkedIn Archetype", "Career Buzzwords",
            "Weird Co-Worker Behavior", "LinkedIn Rejection Excuses",
            "Startup Titles", "Favorite Snack", "Coffee Order",
            "Completely Useless Skill", "Ridiculous Career Milestones"
        ]
        missing_categories = [category for category in required_categories if category not in user_responses]
        if missing_categories:
            return jsonify({"status": "error", "message": "Missing responses for categories.", "missing_categories": missing_categories}), 400
        submitted_quiz_responses.append(user_responses)
        return jsonify({"status": "success", "message": "Quiz responses submitted successfully!", "data": user_responses}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": "An error occurred while processing the quiz responses.", "error": str(e)}), 500

# Generate Horoscope Endpoint
def construct_horoscope_prompt(categories, user_responses):
    prompt = (
        "Write a sarcastic, snarky horoscope based on the user’s preferences. "
        "Don't use the words in a direct sense make it very much sarcastic and attacking"
        "The tone should mock their choices in a way that feels personal and annoyingly relatable, with a sharp and witty narrative that flows naturally. "
        "Avoid quotation marks around the user’s selections and weave their preferences into a single, scathing paragraph. "
        "The goal is to irritate and amuse the reader by highlighting their choices in a way that’s brutally honest and peppered with casual slang. "
        "Use a conversational tone, short sentences, and pointed remarks to emphasize the humor. Keep the content to 10 lines or fewer, and ensure it hits hard without being offensive. "
        "Don't be soft—go absolutely hard and make it such that the reader feels angry, like 'how can someone say that?!' "
        "Assume the user loves clichés and buzzwords but has no self-awareness.\n\n"
    )

    # Add user preferences
    prompt += "**User Preferences:**\n"
    for category in categories:
        category_name = category['category']
        user_choice = user_responses.get(category_name, f"unspecified {category_name.lower()}")
        prompt += f"- {category_name}: {user_choice}\n"

    # Example horoscope for clarity
    prompt += (
        "\n**Example Horoscope:**\n"
        "Ah, the Corporate Overlord strikes again, chugging cold brew like it’s a personality trait while spamming the office with circle-back emails. "
        "Your love for sticky notes is as outdated as your obsession with synergy. The nosy coworker is onto you—they know your 'deep dives' are just excuses to avoid real work. "
        "That sad desk plant on your table? Thriving more than your career. Oh, and your leftover biryani? Definitely giving more energy to the microwave than your last LinkedIn post did to your network. "
        "Today’s big win? Pretending system issues are why you didn’t finish the report. Pro tip: maybe stop calling every task a 'disruptive innovation.'\n"
    )

    return prompt

@app.route('/generate-horoscope', methods=['POST'])
def generate_horoscope():
    try:
        user_responses = request.json
        categories = get_quiz_categories().json['categories']  # Fetch categories dynamically
        prompt = construct_horoscope_prompt(categories, user_responses)
        
        # Generate content using the API
        response = model.generate_content(prompt)
        # Limit the response to 10 lines
        generated_text = "\n".join(response.text.strip().split("\n")[:10])
        
        return jsonify({"status": "success", "horoscope": generated_text}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

    
# @app.route('/generate-horoscope', methods=['POST'])
# def generate_horoscope():
#     try:
#         user_responses = request.json
#         default_responses = {
#             "Favorite Pet": "an imaginary office pet",
#             "Favorite Drink": "water cooler conversations",
#             "Most-Used Office Supply": "those pens that always disappear",
#             "LinkedIn Archetype": "a humblebragging visionary",
#             "Career Buzzwords": "synergy and innovation",
#             "Coffee Order": "overpriced cold brew"
#         }
#         full_responses = {key: user_responses.get(key, default_responses[key]) for key in default_responses}
#         prompt = (
#             f"Write a brutally sarcastic daily horoscope for a LinkedIn narcissist who thinks they are the epitome "
#             f"of corporate greatness. Mock their favorite pet, drink, office habits, and overuse of buzzwords. Use "
#             f"passive-aggressive humor, exaggerated predictions, and cutting wit.\n\n"
#             f"Here are their personality traits:\n"
#             f"- Favorite Pet: {full_responses['Favorite Pet']}\n"
#             f"- Favorite Drink: {full_responses['Favorite Drink']}\n"
#             f"- Most-Used Office Supply: {full_responses['Most-Used Office Supply']}\n"
#             f"- Career Buzzwords: {full_responses['Career Buzzwords']}\n"
#             f"- Coffee Order: {full_responses['Coffee Order']}\n"
#             f"- LinkedIn Archetype: {full_responses['LinkedIn Archetype']}\n"
#             f"Make the horoscope absurd, mocking, and as cutting as possible."
#         )
#         response = model.generate_content(prompt)
#         return jsonify({"status": "success", "message": "Sarcastic horoscope generated successfully.", "horoscope": response.text.strip()}), 200
#     except Exception as e:
#         return jsonify({"status": "error", "message": "An error occurred while generating the horoscope.", "error": str(e)}), 500


# JOB POSTING PART
# Predefined Data
job_levels = ["Fresher", "Junior", "Mid-Level", "Senior", "Managerial", "Executive (C-Suite)"]
skills = [
    "Python", "Juggling", "Public Speaking", "Blockchain", "Advanced Excel",
    "Team Leadership", "Problem Solving", "Time Management", "Multitasking",
    "Social Media Management", "Sales Expertise", "Event Planning", "UI/UX Design",
    "Emotional Intelligence", "Cloud Computing"
]
perks = [
    "Work-Life Balance", "Free Snacks", "Unlimited PTO", "Ping-Pong Table", "Flexible Hours",
    "Casual Dress Code", "Team Outings", "Gym Membership", "Open Office Plan",
    "Remote Work Opportunities", "Free Coffee", "Stock Options", "Exposure (Unpaid)",
    "Health Insurance", "Pet-Friendly Office"
]

# Filters and Snarky Comments
filters = [
    # Fresher Level Filters
    {"condition": lambda job: job['level'] == "Fresher" and len(job['skills']) > 6,
     "comment": "Clearly, this isn't for freshers. Sounds more like a role for the 'Jack of all trades' with no pay."},
    {"condition": lambda job: job['level'] == "Fresher" and job.get('experience', 0) > 2,
     "comment": "A 'fresher' with 2+ years of experience? Sure, why not add 10 years while you're at it?"},
    {"condition": lambda job: job['level'] == "Fresher" and "Leadership" in job['skills'],
     "comment": "Ah, the classic 'lead while you learn' approach. Because who needs training?"},

    # Junior Level Filters
    {"condition": lambda job: job['level'] == "Junior" and "Leadership" in job['skills'],
     "comment": "Junior but expected to lead the company. Perfect for those who love paradoxes."},
    {"condition": lambda job: job['level'] == "Junior" and job.get('salary', 0) < 30000,
     "comment": "Junior role with junior pay but senior expectations. Classic."},

    # Mid-Level Filters
    {"condition": lambda job: job['level'] == "Mid-Level" and "Advanced Excel" in job['skills'],
     "comment": "Mid-level title, senior-level workload, intern-level salary. Sounds about right."},
    {"condition": lambda job: job['level'] == "Mid-Level" and "Micromanagement" in job.get('environment', ''),
     "comment": "Mid-level autonomy? Nope, every email will need approval."},
    {"condition": lambda job: job['level'] == "Mid-Level" and "Open Office Plan" in job.get('perks', []),
     "comment": "Perfect for mid-level professionals who love constant distractions."},

    # Senior Level Filters
    {"condition": lambda job: job['level'] == "Senior" and "Micromanagement" in job.get('environment', ''),
     "comment": "Senior role where every decision will still need sign-off from 10 people."},
    {"condition": lambda job: job['level'] == "Senior" and "Mandatory Fun" in job.get('perks', []),
     "comment": "Mandatory fun to mask the soul-crushing workload."},
    {"condition": lambda job: job['level'] == "Senior" and "Unrealistic Expectations" in job.get('requirements', []),
     "comment": "Senior but expected to also clean the break room? Multi-talented!"},

    # Managerial Level Filters
    {"condition": lambda job: job['level'] == "Managerial" and not job.get('authority', True),
     "comment": "Managerial role with no decision-making power. Enjoy the chaos!"},
    {"condition": lambda job: job['level'] == "Managerial" and "Reports" in job.get('tasks', []),
     "comment": "Managerial job: 90% reporting, 10% actual managing."},
    {"condition": lambda job: job['level'] == "Managerial" and "Family Culture" in job.get('perks', []),
     "comment": "Our team is a family. Translation: We’ll guilt-trip you into working weekends."},

    # Executive Level Filters
    {"condition": lambda job: job['level'] == "Executive (C-Suite)" and "Hands-On Work" in job.get('requirements', []),
     "comment": "Executive role where you’re still writing your own reports. Delegation, what’s that?"},
    {"condition": lambda job: job['level'] == "Executive (C-Suite)" and "No Equity" in job.get('perks', []),
     "comment": "C-suite title but no equity? Sounds like you’re here for the optics."},

    # Skills Filters
    {"condition": lambda job: "Multitasking" in job['skills'] and len(job['skills']) > 5,
     "comment": "Must juggle flaming swords while riding a unicycle. Multitasking? More like a survival skill."},
    {"condition": lambda job: "Advanced Excel" in job['skills'] and "Graphic Designer" in job['title'],
     "comment": "Advanced Excel for a graphic designer? Because charts are the new art."},
    {"condition": lambda job: "Blockchain" in job['skills'] and job['level'] == "Non-Tech",
     "comment": "Blockchain for HR? Why not throw in quantum computing while you're at it?"},
    {"condition": lambda job: "Social Media Management" in job['skills'] and "Python" in job['skills'],
     "comment": "Social media but requires Python? You’re clearly building the next LinkedIn clone."},

    # Perks Filters
    {"condition": lambda job: "Work-Life Balance" in job['perks'] and "Long Hours" in job.get('requirements', []),
     "comment": "Work-life balance doesn’t mean anything when your life is work."},
    {"condition": lambda job: "Free Snacks" in job['perks'] and job.get('salary', 0) < 20000,
     "comment": "Free peanuts because we know you're not making enough for lunch."},
    {"condition": lambda job: "Ping-Pong Table" in job['perks'] and "Startup" in job.get('culture', ''),
     "comment": "Ping-pong table: The universal sign of a company with zero real benefits."},
    {"condition": lambda job: "Unlimited PTO" in job['perks'] and "Overtime Expected" in job.get('environment', ''),
     "comment": "Unlimited PTO—but only if you work double the hours to cover for it."},

    # General Job Post Elements
    {"condition": lambda job: "Rockstar" in job['title'] or "Guru" in job['title'],
     "comment": "We want a 'rockstar' because calling it a normal job isn't exciting enough for LinkedIn."},
    {"condition": lambda job: "Exposure" in job.get('perks', []),
     "comment": "Because exposure is totally a legitimate currency, right?"},
    {"condition": lambda job: "Remote" in job.get('environment', '') and "Team Outings" in job.get('perks', []),
     "comment": "Remote-friendly but mandatory team outings? The logistics must be fun!"}
]


# Function to call the Gemini API and generate job description
def generate_job_description(level, skills, perks, title):
    try:
        # Craft the prompt
        skills_str = ', '.join(skills)
        perks_str = ', '.join(perks)
        prompt = (
            f"Generate a sarcastic and humorous job description for a '{title}' position. "
            f"Level: {level}. Required skills: {skills_str}. Offered perks: {perks_str}. "
            "Also dont make it too large"
            "Include witty remarks about unrealistic expectations and trivial perks."
        )

        # Generate content using Gemini API
        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(prompt)

        # Extract the generated text
        generated_text = response.text
        return generated_text

    except Exception as e:
        return f"Error generating job description: {str(e)}"

@app.route('/generate-job-post', methods=['POST'])
def generate_job_post():
    try:
        # Parse user inputs
        data = request.json
        level = data.get('level', 'Junior')
        user_skills = data.get('skills', [])
        user_perks = data.get('perks', [])
        custom_title = data.get('title', 'Unicorn Role')

        # Generate job description using Gemini API
        job_description = generate_job_description(level, user_skills, user_perks, custom_title)

        # Apply filters for snarky comments
        snarky_comments = []
        try:
            # Prepare the job post object
            job_post = {
                "level": level,
                "skills": user_skills,
                "perks": user_perks,
                "title": custom_title,
                "description": job_description,
                "experience": data.get('experience', 0),
                "salary": data.get('salary', 0),
                "environment": data.get('environment', ''),
                "requirements": data.get('requirements', []),
                "tasks": data.get('tasks', []),
                "culture": data.get('culture', ''),
                "authority": data.get('authority', True)
            }

            # Check filters and collect snarky comments
            for rule in filters:
                if rule["condition"](job_post):
                    snarky_comments.append(rule["comment"])

        except KeyError as e:
            # Handle missing keys
            return jsonify({
                "error": str(e),
                "message": "Key missing in job post data."
            }), 500

        # Add tags based on filters
        tags = ["Skill Inflation" if len(user_skills) > 6 else ""]

        # Return the generated job post
        return jsonify({
            "job_post": job_post,
            "snarky_comments": snarky_comments,
            "tags": tags
        }), 200

    except Exception as e:
        return jsonify({
            "error": str(e),
            "message": "Something went wrong while generating the job post."
        }), 500

# Function to create the prompt for timetable generation
def generate_timetable_prompt(hustler_level, user_input):
    if hustler_level == 'Fresher':
        career_goal = user_input.get('career_goal', 'figuring out how to open Excel')
        return (
            f"Dont create a very large timetable keep it concise and keep it hard."
            f"Create an optimistic and playful daily schedule for a fresher aiming to achieve {career_goal}. "
            "Highlight moments of confusion over corporate jargon, awkward networking attempts, "
            "and an evening spent frantically Googling 'how to write a professional email.'"
        )
    elif hustler_level == '40-hour week':
        tasks = ', '.join(user_input.get('tasks', ['unnecessary meetings', 'managing tasks nobody remembers']))
        return (
            f"Dont create a very large timetable keep it concise and keep it hard."
            f"Generate a sarcastic daily schedule for someone in a 40-hour week that somehow feels like 50+. "
            f"Include tasks like enduring endless 'quick syncs,' overthinking email phrasing, and strategically timing coffee breaks. "
            "Sprinkle in moments of LinkedIn scrolling for 'networking' and late-night email replies in the name of 'work-life balance.'"
        )
    elif hustler_level == '70-hour week':
        daily_goal = user_input.get('daily_goal', 'achieving legendary LinkedIn influencer status')
        return (
            f"Dont create a very large timetable keep it concise and keep it hard."
            f"Craft an exaggerated schedule for someone living the '70-hour week dream.' "
            f"Their goal: {daily_goal}. Start at 4 AM with a LinkedIn post about 'loving the grind,' "
            "followed by endless meetings, aggressive micromanaging, and speeches about passion. Also dont make it too big"
            "Wrap up with late-night Slack stalking and a self-congratulatory drink while imagining their empire growing."
        )
    elif hustler_level == 'Sleep is for the weak':
        ambition = user_input.get('ambition', 'winning the imaginary productivity trophy')
        return (
            f"Dont create a very large timetable keep it concise and keep it hard."
            f"Generate a chaotic and over-packed schedule for someone surviving on espresso and ambition"
            f"Start with a 3 AM brainstorming session, scatter in 'power naps' that don't work, and conclude with midnight existential scrolling. "
            "Highlight their relentless pursuit of 'disrupting the industry' while disrupting their own sanity. And also mocking the freshers and new hires"
        )
    else:
        return "Invalid hustler level provided. Please select a chaos level so we can adequately mock it."


# Function to generate timetable using Gemini API
def generate_timetable(hustler_level, user_input):
    prompt = generate_timetable_prompt(hustler_level, user_input)
    try:
        response = model.generate_content(prompt)
        generated_text = response.text.strip()
        # Format the output into points
        timetable_points = [point.strip() for point in generated_text.split('\n') if point.strip()]
        return timetable_points
    except Exception as e:
        return [f"Error generating timetable: {str(e)}"]

# Endpoint to generate the timetable
@app.route('/generate-timetable', methods=['POST'])
def generate_timetable_endpoint():
    try:
        # Parse user inputs
        data = request.json
        hustler_level = data.get('hustler_level')
        user_input = data.get('user_input', {})
        
        # Generate timetable
        timetable = generate_timetable(hustler_level, user_input)
        
        return jsonify({'status': 'success', 'timetable': timetable}), 200
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500


# Run Flask App
if __name__ == "__main__":
    print("Starting Flask app...")
    app.run()
