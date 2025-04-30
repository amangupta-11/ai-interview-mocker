export default function QuestionsPage() {
    return (
      <div className="max-w-3xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-4">Sample Interview Questions</h1>
        <p className="mb-4 text-gray-700">
          Below are a few examples of AI-generated questions that can appear during your mock interview:
        </p>
        <ul className="list-disc ml-6 space-y-2 text-gray-800">
          <li><strong>Frontend:</strong> How would you optimize a React app for performance?</li>
          <li><strong>Backend:</strong> How would you handle authentication and authorization in an API?</li>
          <li><strong>Data Analyst:</strong> How do you handle missing values in a dataset?</li>
          <li><strong>Fresher:</strong> What was your final year project and what challenges did you face?</li>
        </ul>
        <p className="mt-6 text-gray-600">
          Your actual interview questions will be dynamically generated based on your chosen role.
        </p>
      </div>
    );
  }
  