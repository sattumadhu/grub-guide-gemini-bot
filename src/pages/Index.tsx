
import { useState } from 'react';
import ChatInterface from '@/components/ChatInterface';
import FoodSuggestions from '@/components/FoodSuggestions';
import RestaurantList from '@/components/RestaurantList';
import { ChatMessage, FoodItem, Restaurant } from '@/types';
import { getFoodSuggestions, getRestaurants } from '@/services/geminiService';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';

const Index = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      role: 'bot', 
      content: 'Hello! I\'m your food guide assistant. What kind of food are you in the mood for today?' 
    }
  ]);
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [selectedFood, setSelectedFood] = useState<string | null>(null);
  const [isLoadingFoods, setIsLoadingFoods] = useState(false);
  const [isLoadingRestaurants, setIsLoadingRestaurants] = useState(false);

  const handleSendMessage = async (message: string) => {
    // Add user message to chat
    setMessages(prev => [...prev, { role: 'user', content: message }]);
    
    // Reset previous suggestions
    setSelectedFood(null);
    setRestaurants([]);
    
    // Get food suggestions
    setIsLoadingFoods(true);
    try {
      const suggestions = await getFoodSuggestions(message);
      setFoodItems(suggestions);
      
      // Add bot response
      setMessages(prev => [
        ...prev, 
        { 
          role: 'bot', 
          content: `Based on your interest in "${message}", here are some food suggestions. Click on any item to find restaurants that serve it!` 
        }
      ]);
    } catch (error) {
      console.error('Error getting food suggestions:', error);
      toast.error("Failed to get food suggestions. Please try again.");
      setMessages(prev => [
        ...prev, 
        { 
          role: 'bot', 
          content: 'Sorry, I had trouble finding food suggestions. Could you try a different query?' 
        }
      ]);
    } finally {
      setIsLoadingFoods(false);
    }
  };

  const handleSelectFood = async (foodName: string) => {
    setSelectedFood(foodName);
    setIsLoadingRestaurants(true);
    setRestaurants([]);
    
    try {
      const restaurantList = await getRestaurants(foodName);
      setRestaurants(restaurantList);
    } catch (error) {
      console.error('Error getting restaurants:', error);
      toast.error("Failed to get restaurant information. Please try again.");
    } finally {
      setIsLoadingRestaurants(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="p-4 border-b">
        <h1 className="text-2xl font-bold text-center">Grub Guide</h1>
      </header>
      
      <main className="flex-1 container mx-auto p-4 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-card rounded-lg shadow h-[500px] flex flex-col border">
            <ChatInterface 
              messages={messages} 
              onSendMessage={handleSendMessage} 
              isLoading={isLoadingFoods} 
            />
          </div>
          
          <div className="lg:col-span-2">
            <FoodSuggestions 
              foodItems={foodItems} 
              onSelectFood={handleSelectFood}
              isLoading={isLoadingFoods}
            />
            
            <RestaurantList 
              restaurants={restaurants} 
              selectedFood={selectedFood}
              isLoading={isLoadingRestaurants}
            />
          </div>
        </div>
      </main>
      
      <footer className="p-4 border-t text-center text-sm text-muted-foreground">
        Powered by Gemini API
      </footer>
      
      <Toaster />
    </div>
  );
};

export default Index;
