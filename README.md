
Ephemera - Novel Writing Tool 


Thank you for using Ephemera! This document will guide you through understanding what Ephemera is and how to get it working on your Windows computer.


-------------------------
1. What is Ephemera?
-------------------------

Ephemera is a comprehensive tool designed for writers and novelists. It helps you keep all your story-related information in one place. It's more than just a text editor; it's a project management suite for your novel.

Key Features:
- **Manuscript Editor:** A dedicated space to write and organize your story, chapter by chapter, with a separate section for notes.
- **Worldbuilding Modules:** Create and manage detailed records for your:
    - **Characters:** Keep track of character profiles, backstories, and traits.
    - **Places:** Build your settings and locations.
    - **Objects:** Catalog important items and artifacts in your story.
- **Narrative Line Plotting:** Visually plot out your main story arcs and subplots point by point.
- **AI-Powered Analysis:** Visualize your narrative timelines and analyze how different plot lines intersect. (Requires additional setup, see section 3).


------------------------------------
2. Getting Started on Windows
------------------------------------

Ephemera is a web application that runs locally in your browser and uses Google's Firebase service to save your data. Here’s how to set it up from scratch.

**Prerequisites:**
- A modern web browser (like Google Chrome, Mozilla Firefox, or Microsoft Edge).
- A Google Account (to use Firebase).

**Step 1: Get the Software**

Download the project files to your computer. If you have `git` installed, you can clone the repository. Otherwise, you can download the project as a ZIP file and extract it to a folder on your computer.

**Step 2: Set Up Your Own Firebase Backend**

Ephemera needs its own private Firebase project to store your work.

1.  **Create a Firebase Project:**
    - Go to the Firebase website: `https://console.firebase.google.com/`
    - Click "Add project" and give it a name (e.g., "My-Ephemera-Project").
    - Follow the on-screen steps to create the project.

2.  **Create a Web App in Your Project:**
    - Inside your new project's dashboard, click the Web icon (`</>`) to add a new web app.
    - Give it a nickname (e.g., "Ephemera App") and click "Register app".
    - Firebase will show you a `firebaseConfig` object. **Copy this entire block of code.** You will need it in the next step.

3.  **Configure `index.html`:**
    - Navigate to the folder where you extracted the software.
    - Go into `ephemera-editor/public/` and open the `index.html` file with a text editor (like Notepad).
    - Find the existing `firebaseConfig` variable (around line 181).
    - **Delete** the existing `firebaseConfig` block and **paste your own** that you copied from the Firebase website.
    - Save and close the file.

4.  **Set up Firebase Services:**
    - In the Firebase console menu on the left, go to **Build > Authentication**.
    - Click "Get started".
    - Select **Anonymous** from the list of sign-in providers and enable it.
    - Next, go to **Build > Firestore Database**.
    - Click "Create database".
    - Start in **Test mode**. This will allow the app to read and write data for the first 30 days. Click "Next" and then "Enable".

**Step 3: Run the Application**

That's it for the basic setup! To run the application, simply find the `index.html` file you edited (`ephemera-editor/public/index.html`) and double-click it. It will open in your default web browser, and you can start writing. Your work will be saved to your private Firebase database.

------------------------------------------------
3. (Optional) Advanced Setup: Hosting & AI
------------------------------------------------

**A. Deploying to the Web (Firebase Hosting)**

If you want to access your Ephemera app from any device, you can deploy it to the web using Firebase Hosting.

1.  **Install Node.js:** Download and install Node.js from `https://nodejs.org/`.
2.  **Install Firebase Tools:** Open the Windows Command Prompt (cmd) or PowerShell and run: `npm install -g firebase-tools`
3.  **Log In to Firebase:** In the same terminal, run: `firebase login` and follow the instructions to log in with your Google account.
4.  **Deploy:**
    - In the terminal, navigate to the `ephemera-editor` folder inside the project files.
    - Run the command: `firebase deploy`
    - After it finishes, the terminal will give you a Hosting URL. You can use this URL to access your application from anywhere.

**B. Enabling the AI Analysis Feature**

The "Analizza Incroci con Gemini" feature requires a backend component to work securely. The code is included, but you need to deploy it.

1.  Follow the steps above to install Node.js and Firebase Tools.
2.  In your Firebase project, upgrade to the **Blaze (Pay as you go)** plan. This is required to make API calls to external services like Gemini.
3.  In the Google Cloud Console for your project, enable the **Vertex AI API**.
4.  Follow the instructions in the `ephemera-editor/functions/index.js` file to set up and deploy the Cloud Function. You will need to run `npm install` and `npm install @google-cloud/vertexai` from within the `functions` directory, and then run `firebase deploy --only functions`.


-----------------------------------
4. Disclaimer & Attribution
-----------------------------------

This software is provided "as is", without warranty of any kind, express or implied. It is provided for free and you may use, modify, and distribute it as you see fit.

If you use, modify, or build upon this application, you are required to give credit to the original author: **Raffaele Pioshin Tomeo**.
