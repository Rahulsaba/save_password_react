https://dribbble.com/shots/24635204-AI-Travel-Web-Dashboard

// Request interceptor
axiosClient.interceptors.request.use(
  (config) => {
    // Get token from localStorage or elsewhere
    const token = localStorage.getItem("token")

    // If token exists, add it to the headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor
axiosClient.interceptors.response.use(
  (response) => {
    // Any status code within the range of 2xx
    return response
  },
  (error) => {
    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      // Redirect to login or refresh token
      localStorage.removeItem("token")
      window.location.href = "/login"
    }

    // Handle other errors
    return Promise.reject(error)
  },
)


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sticky Notes</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"> </head>
<body>
    <div class="notes-container">
        <div class="note" style="transform: rotate(-5deg);">
            <div class="paperclip"><i class="fas fa-paperclip"></i></div>
            <div class="content">
                <p class="title">Go grocery shopping</p>
                <p class="due-date">Tomorrow</p>
            </div>
        </div>

        <div class="note" style="transform: rotate(3deg);">
             <div class="paperclip"><i class="fas fa-paperclip"></i></div>
            <div class="content">
                <p class="title">Find a movie to watch</p>
                <p class="due-date">Today</p>
            </div>
        </div>

        <div class="note" style="transform: rotate(-4deg);">
             <div class="paperclip"><i class="fas fa-paperclip"></i></div>
            <div class="content">
                <p class="title">Clean the house & car</p>
                <p class="due-date">Tomorrow</p>
            </div>
        </div>
         </div>
</body>
</html>

@import "tailwindcss";

body {
  margin: 0;
  padding: 40px;
  font-family: "Arial", sans-serif; /* Or a font that resembles the image */
  /* Approximate gradient from the image */
  background: linear-gradient(to bottom, #f9e4b7, #f7d08a);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start; /* Align notes towards the top */
}

.notes-container {
  display: flex; /* Arrange notes side-by-side */
  flex-wrap: wrap; /* Allow notes to wrap on smaller screens */
  gap: 30px; /* Space between notes */
  justify-content: center; /* Center notes horizontally */
  padding: 20px;
  /* Optional: Add a subtle curve like the container in the image */
  /* background-color: rgba(255, 255, 255, 0.2); */
  /* border-radius: 20px; */
  /* width: 80%; */
  /* max-width: 900px; */
}

.note {
  background-color: #fff;
  padding: 40px 20px 20px 20px; /* More padding top for paperclip */
  min-width: 180px; /* Minimum width for a note */
  min-height: 150px; /* Minimum height */
  position: relative; /* Needed for absolute positioning of paperclip */
  border-radius: 3px; /* Slight rounding of corners */

  /* --- The Background Shadow --- */
  /* x-offset | y-offset | blur-radius | spread-radius | color */
  /* Adjust these values to get the exact shadow feel */
  box-shadow: 5px 8px 15px rgba(0, 0, 0, 0.25);

  /* --- Default Rotation (can be overridden inline) --- */
  transform: rotate(1deg);
  transition:
    transform 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out; /* Smooth hover effect */
}

.note:hover {
  transform: scale(1.05) rotate(0deg); /* Enlarge slightly and straighten on hover */
  box-shadow: 8px 12px 20px rgba(0, 0, 0, 0.3); /* Enhance shadow on hover */
  z-index: 10; /* Bring hovered note to the front */
}

.paperclip {
  position: absolute;
  top: -5px; /* Position above the note */
  left: 50%;
  transform: translateX(-50%) rotate(-5deg); /* Center horizontally and slight tilt */
  font-size: 28px; /* Size of the paperclip icon */
  color: #adb5bd; /* Color of the paperclip */
}

.note .content {
  text-align: left;
}

.note .title {
  font-size: 1.1em;
  font-weight: bold;
  margin-bottom: 25px; /* Space between title and due date */
  color: #333;
}

.note .due-date {
  font-size: 0.9em;
  color: #777;
  position: absolute; /* Position at the bottom */
  bottom: 15px;
  left: 20px;
}

/* Font Awesome specific style for the paperclip icon */
.fa-paperclip {
  transform: rotate(90deg); /* Rotate icon to match image */
  display: inline-block;
}
