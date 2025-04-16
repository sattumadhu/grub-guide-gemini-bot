
import { useState } from 'react';
import { FoodItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface FoodSuggestionsProps {
  foodItems: FoodItem[];
  onSelectFood: (food: string) => void;
  isLoading: boolean;
}

const FoodSuggestions = ({ foodItems, onSelectFood, isLoading }: FoodSuggestionsProps) => {
  if (foodItems.length === 0 && !isLoading) {
    return null;
  }

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-3">Food Suggestions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <Card key={index} className="animate-pulse">
              <CardHeader className="pb-2">
                <div className="h-6 bg-muted rounded w-3/4"></div>
              </CardHeader>
              <CardContent>
                <div className="h-4 bg-muted rounded w-full mb-2"></div>
                <div className="h-4 bg-muted rounded w-5/6"></div>
                <div className="h-8 mt-4 bg-muted rounded w-1/3"></div>
              </CardContent>
            </Card>
          ))
        ) : (
          foodItems.map((food, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{food.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">{food.description}</CardDescription>
                <Button onClick={() => onSelectFood(food.name)}>
                  Find Restaurants
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default FoodSuggestions;
