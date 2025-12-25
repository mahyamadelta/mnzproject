# 📜 mnzproject

**mnzproject** is a web-based platform that allows users to scroll through scientific research journals in a TikTok-like experience.
A recommendation algorithm personalizes the journals shown based on user preferences, such as liked and saved articles.

## ✨ Key Features
* 🔍 **Journal Recommendations**
  Journals are recommended based on user interests and interactions.
* 🎯 **User Interaction**
  Users can like, save, and share journals.
* 📜 **Infinite Scrolling**
  Smooth and continuous navigation for unlimited exploration.
* 🏷 **Categories & Tags**
  Users can explore journals by category or specific tags.
* 📊 **User Analytics**
  Insights into trending journals and more personalized recommendations.

## 🛠 Technologies Used
* **Frontend:** React
* **Backend:** Node.js

## 🚀 How to Run the Project
1. Clone this repository:
   ```sh
   git clone https://github.com/username/mnzproject.git
   ```
2. Navigate to the project directory:
   ```sh
   cd mnzproject
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Run the development server:
   ```sh
   npm run dev
   ```
---

## 🤝 Contribution
This project is open-source, and contributions are highly welcome.
### How to Contribute:
1. Fork this repository.
2. Create a new branch for your feature or fix.
3. Commit your changes with a clear message.
4. Submit a pull request and wait for review.

## 📌 Roadmap

# 🚀 Future Roadmap for mnzproject

## ✅ 1. Recommendation System Based on Likes & Saves
⏩ *Similar to TikTok-style content personalization.*
* [ ] Add **Save** feature (in addition to Like)
  * Store data in `localStorage` initially (can be migrated to database later)
* [ ] Create a **Saved Articles** page
* [ ] Show recommendations based on the most liked/saved topics

## 🎨 2. UI/UX Enhancements & Interactivity
🔁 *To make the experience more engaging and TikTok-like*
* [ ] Scroll and content-loading animations
* [ ] Smoother infinite scrolling with loading skeletons (shimmer effect)
* [ ] Add badges such as **"Trending"**, **"New"**, or **"Saved"**
* [ ] Use header images for each article (default placeholder initially)
      
## 🧠 3. User Interest Analysis (Simple AI Layer)
🤖 *The first step toward intelligence in mnzproject*
* [ ] Track interactions per topic keyword (likes, saves)
* [ ] Build a simple frequency-based model to:
  * Identify most-liked topics
  * Display a **"You might like..."** section

## 🔐 4. User Authentication *(Optional for multi-user support)*
✉️ *Allows likes and saves to be stored per user for better recommendations*
* [ ] Google Login (using Firebase Auth)
* [ ] Store like/save data in Firestore or Supabase
* [ ] Fetch interaction data based on user ID

## 🛠️ 5. Admin Panel / Mini CMS
🧪 *For content moderation if needed*
* [ ] Simple panel to filter and review articles
* [ ] Mark articles as **featured** or **trending**

## 🔄 Suggested Development Order
1. **Save feature + Saved Articles page**
2. Recommendations based on **Likes & Saves**
3. UI animations and polish
4. *(Optional)* Authentication & user-based persistence

## 📄 License
This project is licensed under the **MIT License**.
See the `LICENSE` file for more details.

🚀 Let’s build a more interactive and engaging educational platform together.
If you’re interested in contributing or have ideas to share, feel free to join in.
