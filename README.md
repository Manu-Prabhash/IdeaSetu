# IdeaSetu

IdeaSetu is a dedicated platform designed to bridge the gap between government bodies and entrepreneurs. It provides a collaborative space where government officials can post pressing, real-world problems and entrepreneurs can pitch innovative solutions. By streamlining the proposal, approval, and communication phases, IdeaSetu helps bring impactful ideas to life.

## 🚀 Key Features

- **Role-Based Authentication:** Secure login system differentiating between Government Officials (higher access tier) and Entrepreneurs using secure token systems.
- **Problem & Solution Pipeline:** Government officials can post active problem statements. Entrepreneurs can submit direct pitches or target specific government listings.
- **Approval Workflow:** A built-in vetting system allowing government users to review, accept, or reject incoming entrepreneur pitches.
- **In-App Messaging System:** An integrated chat workspace that unlocks automatically once a pitch is approved, enabling direct collaboration between officials and founders.
- **Live News Feed:** A dedicated news section fetching the latest updates and industry insights via external API integration.
- **AI Chatbot Assistant:** An integrated helper bot to assist users in navigating the platform and refining their submissions.

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Backend:** Node.js, Express, JSON configuration
- **Database:** MongoDB (using Mongoose for data modeling)
- **Security & Auth:** JSON Web Tokens (JWT) for session management, bcrypt for robust password hashing

## 📦 Installation & Setup

Follow these steps to configure and run IdeaSetu on your local machine.

### Prerequisites
Ensure you have [Node.js](https://nodejs.org/) and [MongoDB](https://www.mongodb.com/) installed and running locally or have access to a MongoDB Atlas cluster.

### 1. Clone the Repository
```bash
git clone [https://github.com/your-username/ideasetu.git](https://github.com/your-username/ideasetu.git)
cd ideasetu
```
### 2. Configure Environment Variables
Because sensitive keys are excluded via .gitignore, you must manually configure your environment settings. Create a file named .env inside the backend directory and populate it with the following keys:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret_key
NEWS_API_KEY=your_news_api_endpoint_key
CHATBOT_API_KEY=your_chatbot_ai_service_key
```
Ensure you update any local configuration files or constants in your frontend/backend code where these environment paths are explicitly required to match your local setup

### 3. Install Dependencies
Navigate to the backend directory and install the necessary npm packages:
```
cd backend
npm install
```

### 4. Running the Application
To start the backend server, execute:
```
node server.js
```

