
import { ChatMessage, FoodItem, Restaurant } from '@/types';

const API_KEY = 'AIzaSyCM-VEUxwcJ8BRWBb7vuq4T_TvvBmOfj04';
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent';

export async function getFoodSuggestions(prompt: string): Promise<FoodItem[]> {
  try {
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `Based on this prompt: "${prompt}", suggest 5 food items with brief descriptions. Return the response as a JSON array with objects containing 'name' and 'description' fields. For example: [{"name": "Pizza", "description": "Italian dish with a flattened base of leavened wheat-based dough topped with various ingredients"}]`,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 800,
        },
      }),
    });

    const data = await response.json();
    
    // Extract the text response from Gemini
    const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
    // Find the JSON part of the response
    const jsonMatch = textResponse.match(/\[.*\]/s);
    
    if (jsonMatch) {
      try {
        const foodItems = JSON.parse(jsonMatch[0]);
        return foodItems;
      } catch (e) {
        console.error('Failed to parse JSON:', e);
        return [];
      }
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching food suggestions:', error);
    return [];
  }
}

export async function getRestaurants(foodItem: string): Promise<Restaurant[]> {
  try {
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `Suggest 5 fictitious restaurants that serve ${foodItem}. Include their name, location, and a brief description. Return the response as a JSON array with objects containing 'name', 'location', 'rating', and 'description' fields. For example: [{"name": "Pizza Palace", "location": "123 Main St, New York, NY", "rating": 4.5, "description": "Famous for their thin crust pizzas and homemade sauce."}]`,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 800,
        },
      }),
    });

    const data = await response.json();
    
    // Extract the text response from Gemini
    const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
    // Find the JSON part of the response
    const jsonMatch = textResponse.match(/\[.*\]/s);
    
    if (jsonMatch) {
      try {
        const restaurants = JSON.parse(jsonMatch[0]);
        return restaurants;
      } catch (e) {
        console.error('Failed to parse JSON:', e);
        return [];
      }
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching restaurant suggestions:', error);
    return [];
  }
}
