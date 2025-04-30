export default function HowItWorksPage() {
    return (
      <div className="max-w-3xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-4">How It Works</h1>
        <ol className="list-decimal ml-6 space-y-3 text-gray-700">
          <li><strong>Sign In:</strong> Create an account or log in securely using Clerk.</li>
          <li><strong>Create Interview:</strong> Select your job role and experience level.</li>
          <li><strong>AI Questions:</strong> Our system uses Gemini AI to generate role-specific questions.</li>
          <li><strong>Answer & Submit:</strong> Respond to questions via text (or voice input, if supported).</li>
          <li><strong>Get Feedback:</strong> Receive AI-powered evaluation with personalized suggestions.</li>
          <li><strong>Track Progress:</strong> View and retake interviews through your dashboard.</li>
        </ol>
        <p className="mt-6 text-gray-600">
          Practice smart. Improve fast. Get interview-ready with AI.
        </p>
      </div>
    );
  }
  