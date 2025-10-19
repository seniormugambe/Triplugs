import React, { useState } from 'react';
import { geminiService } from '../services/gemini';

export function AITest() {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const testAI = async () => {
    setLoading(true);
    try {
      const result = await geminiService.chatWithAI('Hello, can you tell me about Ugandan crafts?');
      setResponse(result);
    } catch (error) {
      setResponse(`Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg border border-stone-200 m-4">
      <h3 className="font-bold mb-2">AI Test</h3>
      <button 
        onClick={testAI} 
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? 'Testing...' : 'Test AI'}
      </button>
      {response && (
        <div className="mt-4 p-3 bg-gray-100 rounded">
          <strong>Response:</strong>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}