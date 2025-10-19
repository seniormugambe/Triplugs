import React, { useState } from 'react';
import { Wand2, Copy, Check } from 'lucide-react';
import { geminiService } from '../services/gemini';

interface AIProductDescriptionProps {
  productName: string;
  category: string;
  onDescriptionGenerated?: (description: string) => void;
}

export function AIProductDescription({ 
  productName, 
  category, 
  onDescriptionGenerated 
}: AIProductDescriptionProps) {
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateDescription = async () => {
    setIsLoading(true);
    try {
      const generatedDescription = await geminiService.generateProductDescription(productName, category);
      setDescription(generatedDescription);
      onDescriptionGenerated?.(generatedDescription);
    } catch (error) {
      console.error('Error generating description:', error);
      setDescription('Unable to generate description at this time.');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(description);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-stone-200 p-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-stone-900 flex items-center gap-2">
          <Wand2 className="h-4 w-4 text-sunshine-600" />
          AI Product Description
        </h4>
        <button
          onClick={generateDescription}
          disabled={isLoading}
          className="flex items-center gap-2 px-3 py-1 bg-sunshine-500 text-white rounded text-sm hover:bg-sunshine-600 transition-colors disabled:opacity-50"
        >
          <Wand2 className={`h-3 w-3 ${isLoading ? 'animate-spin' : ''}`} />
          {isLoading ? 'Generating...' : 'Generate'}
        </button>
      </div>

      <div className="text-sm text-stone-600 mb-3">
        <span className="font-medium">Product:</span> {productName} • 
        <span className="font-medium ml-1">Category:</span> {category}
      </div>

      {description && (
        <div className="relative">
          <div className="bg-stone-50 rounded-lg p-3 text-sm text-stone-700 leading-relaxed">
            {description}
          </div>
          <button
            onClick={copyToClipboard}
            className="absolute top-2 right-2 p-1 hover:bg-stone-200 rounded transition-colors"
            title="Copy to clipboard"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-600" />
            ) : (
              <Copy className="h-4 w-4 text-stone-600" />
            )}
          </button>
        </div>
      )}

      {!description && !isLoading && (
        <div className="text-center py-6 text-stone-500">
          <Wand2 className="h-8 w-8 mx-auto mb-2 text-stone-300" />
          <p className="text-sm">Click "Generate" to create an AI-powered product description</p>
        </div>
      )}
    </div>
  );
}