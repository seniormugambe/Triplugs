import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'your-gemini-api-key-here';

if (!API_KEY || API_KEY === 'your-gemini-api-key-here') {
  console.warn('Gemini API key not found. Please set VITE_GEMINI_API_KEY in your .env file');
}

const genAI = new GoogleGenerativeAI(API_KEY);

export class GeminiService {
  private model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  async generateProductRecommendations(userPreferences: string, products: any[]) {
    try {
      const prompt = `
        Based on user preferences: "${userPreferences}"
        
        From the following Ugandan marketplace products, recommend the top 3 most suitable items:
        ${JSON.stringify(products, null, 2)}
        
        Provide recommendations in this JSON format:
        {
          "recommendations": [
            {
              "productId": number,
              "reason": "Brief explanation why this product matches user preferences",
              "score": number (1-10)
            }
          ]
        }
        
        Focus on authentic Ugandan crafts, cultural significance, and user preferences.
      `;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      try {
        return JSON.parse(text);
      } catch {
        return { recommendations: [] };
      }
    } catch (error) {
      console.error('Error generating recommendations:', error);
      return { recommendations: [] };
    }
  }

  async generateProductDescription(productName: string, category: string) {
    try {
      const prompt = `
        Generate an authentic, engaging product description for a Ugandan marketplace item:
        
        Product: ${productName}
        Category: ${category}
        
        Include:
        - Cultural significance and traditional use
        - Craftsmanship details
        - Materials and techniques used
        - Why it makes a great souvenir or gift
        
        Keep it under 150 words and make it sound authentic and appealing.
      `;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error generating description:', error);
      return 'A beautiful handcrafted item from Uganda, perfect for collectors and gift-giving.';
    }
  }

  async chatWithAI(message: string, context?: string) {
    try {
      console.log('Sending message to Gemini:', message);
      
      if (!API_KEY || API_KEY === 'your-gemini-api-key-here') {
        throw new Error('Gemini API key not configured');
      }

      const prompt = `
        You are a helpful AI assistant for a Ugandan marketplace called Triplugs. 
        You help customers discover authentic Ugandan crafts, foods, and cultural items.
        
        ${context ? `Context: ${context}` : ''}
        
        User message: ${message}
        
        Respond in a friendly, knowledgeable way about Ugandan culture, crafts, and products.
        Keep responses concise and helpful.
      `;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      console.log('Received response from Gemini:', text);
      return text;
    } catch (error) {
      console.error('Error in AI chat:', error);
      
      if (error instanceof Error) {
        if (error.message.includes('API key')) {
          return "I need an API key to work properly. Please check the configuration.";
        }
        if (error.message.includes('quota') || error.message.includes('limit')) {
          return "I'm currently experiencing high demand. Please try again in a moment.";
        }
      }
      
      return "I'm sorry, I'm having trouble responding right now. Please try again later.";
    }
  }

  async generateVendorInsights(vendorData: any) {
    try {
      const prompt = `
        Analyze this Ugandan vendor data and provide insights:
        ${JSON.stringify(vendorData, null, 2)}
        
        Provide insights about:
        - Vendor specialties and unique offerings
        - Cultural authenticity
        - Recommended products
        - What makes this vendor special
        
        Format as a brief, engaging summary (100 words max).
      `;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error generating vendor insights:', error);
      return 'This vendor offers authentic Ugandan crafts with traditional techniques passed down through generations.';
    }
  }

  async translateToLocal(text: string, targetLanguage: string = 'luganda') {
    try {
      const prompt = `
        Translate the following text to ${targetLanguage} (Ugandan local language):
        "${text}"
        
        Provide only the translation, no explanations.
      `;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error translating text:', error);
      return text; // Return original text if translation fails
    }
  }
}

export const geminiService = new GeminiService();