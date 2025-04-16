
import { Restaurant } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Star } from 'lucide-react';

interface RestaurantListProps {
  restaurants: Restaurant[];
  selectedFood: string | null;
  isLoading: boolean;
}

const RestaurantList = ({ restaurants, selectedFood, isLoading }: RestaurantListProps) => {
  if (!selectedFood) {
    return null;
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-3">
        Restaurants for {selectedFood}
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <Card key={index} className="animate-pulse">
              <CardHeader className="pb-2">
                <div className="h-6 bg-muted rounded w-3/4"></div>
              </CardHeader>
              <CardContent>
                <div className="h-4 bg-muted rounded w-full mb-2"></div>
                <div className="h-4 bg-muted rounded w-5/6 mb-2"></div>
                <div className="h-4 bg-muted rounded w-2/3"></div>
              </CardContent>
            </Card>
          ))
        ) : (
          restaurants.map((restaurant, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{restaurant.name}</CardTitle>
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{restaurant.location}</span>
                </div>
              </CardHeader>
              <CardContent>
                {restaurant.rating && (
                  <div className="flex items-center mb-2">
                    <Star className="h-4 w-4 mr-1 text-yellow-500 fill-yellow-500" />
                    <span>{restaurant.rating.toFixed(1)}</span>
                  </div>
                )}
                <CardDescription>
                  {restaurant.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default RestaurantList;
