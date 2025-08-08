/**
 * To deploy this function, you would first need to install the dependencies:
 * 1. Navigate to the `functions` directory in your terminal.
 * 2. Run `npm install` to install the packages from package.json.
 * 3. Run `npm install @google-cloud/vertexai` to add the Google AI client library.
 *
 * You must also enable the Vertex AI API in your Google Cloud project
 * and ensure your project is on the Blaze plan to use third-party APIs.
 */

const functions = require("firebase-functions");
const { VertexAI } = require("@google-cloud/vertexai");

// Initialize Vertex AI with your project details.
// IMPORTANT: For this to work, you must have authenticated with Google Cloud
// in your deployment environment (e.g., by running `gcloud auth application-default login`).
// The function will automatically use the project's service account credentials when deployed.
const vertex_ai = new VertexAI({ project: process.env.GCLOUD_PROJECT, location: "us-central1" });
const model = "gemini-1.0-pro"; // Or another suitable model like gemini-1.5-flash

const generativeModel = vertex_ai.getGenerativeModel({
  model: model,
});

// Create an HTTPS Callable function for security and ease of use from the client.
exports.analyzeNarrativeLines = functions.https.onCall(async (data, context) => {
  // It's good practice to ensure the user is authenticated.
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "The function must be called while authenticated."
    );
  }

  const prompt = data.prompt;
  if (!prompt || typeof prompt !== 'string') {
    throw new functions.https.HttpsError(
      "invalid-argument",
      'The function must be called with a non-empty "prompt" string.'
    );
  }

  try {
    const resp = await generativeModel.generateContent(prompt);
    const responseData = await resp.response;
    const analysisText = responseData.candidates[0].content.parts[0].text;

    // The Gemini API returns a string that should be JSON. We must parse it.
    // A try/catch block is essential here, as the model might not always return valid JSON.
    try {
      const analysisJSON = JSON.parse(analysisText);
      return analysisJSON;
    } catch (e) {
      console.error("Gemini response was not valid JSON:", analysisText, e);
      throw new functions.https.HttpsError(
        "internal",
        "The Gemini API returned a non-JSON response.",
        { originalResponse: analysisText }
      );
    }
  } catch (error) {
    console.error("Error calling the Gemini API:", error);
    // Forward a generic error to the client to avoid leaking implementation details.
    throw new functions.https.HttpsError("internal", "Failed to call the Gemini API.");
  }
});
