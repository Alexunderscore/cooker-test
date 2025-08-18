"use client";
import React, { useState } from "react";
import {
  Clock,
  Users,
  Trophy,
  Plus,
  Heart,
  MessageCircle,
  Share2,
  ChefHat,
  MapPin,
  Flame,
  Award,
  ArrowLeft,
  MoreHorizontal,
  Search,
  Bookmark,
  Send,
} from "lucide-react";

type Difficulty = "Beginner" | "Intermediate" | "Advanced";

type NutritionFacts = {
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
};

type Meal = {
  id: number;
  userId: number | "current";
  dish: string;
  images: string[];
  cookTime: number;
  difficulty: Difficulty;
  servings: number;
  calories: number;
  likes: number;
  comments: number;
  bookmarks: number;
  location: string;
  timestamp: string;
  ingredients: string[];
  achievements: string[];
  description: string;
  recipe: string;
  tags: string[];
  nutritionFacts: NutritionFacts;
};

type User = {
  id: number | "current";
  name: string;
  username: string;
  avatar: string;
  bio: string;
  location: string;
  joinDate: string;
  stats: {
    meals: number;
    followers: number;
    following: number;
    totalCookTime: number;
    streak: number;
    achievements: number;
  };
  specialties: string[];
  recentPhotos: string[];
};

type Comment = {
  id: number;
  userId: number | "current";
  text: string;
  timestamp: string;
  likes: number;
};

const MealStrava: React.FC = () => {
  const [currentView, setCurrentView] = useState<
    "feed" | "profile" | "leaderboard" | "userProfile" | "mealDetail"
  >("feed");
  const [selectedUserId, setSelectedUserId] = useState<number | "current" | null>(
    null
  );
  const [selectedMealId, setSelectedMealId] = useState<number | null>(null);
  const [showNewMeal, setShowNewMeal] = useState(false);

  const [users] = useState<Record<number, User>>({
    1: {
      id: 1,
      name: "Sarah Chen",
      username: "@sarahcooks",
      avatar: "👩‍🍳",
      bio: "Food blogger & recipe developer. Obsessed with Asian fusion cuisine 🍜",
      location: "San Francisco, CA",
      joinDate: "March 2023",
      stats: {
        meals: 234,
        followers: 1200,
        following: 340,
        totalCookTime: 12500,
        streak: 45,
        achievements: 28,
      },
      specialties: ["Asian Cuisine", "Baking", "Fermentation"],
      recentPhotos: ["🍜", "🍞", "🥟", "🍱", "🧄", "🥢", "🥠", "🍵"],
    },
    2: {
      id: 2,
      name: "Mike Rodriguez",
      username: "@mikethebaker",
      avatar: "👨‍🍳",
      bio: "Sourdough enthusiast & weekend warrior in the kitchen 🥖",
      location: "Austin, TX",
      joinDate: "January 2023",
      stats: {
        meals: 189,
        followers: 890,
        following: 210,
        totalCookTime: 8900,
        streak: 23,
        achievements: 19,
      },
      specialties: ["Bread Making", "BBQ", "Mexican Food"],
      recentPhotos: ["🍞", "🥖", "🌮", "🥩", "🧈", "🌽", "🫘", "🍺"],
    },
    3: {
      id: 3,
      name: "Emma Wilson",
      username: "@emmaeats",
      avatar: "👩‍🍳",
      bio: "Plant-based chef spreading the veggie love 🌱",
      location: "Portland, OR",
      joinDate: "June 2022",
      stats: {
        meals: 312,
        followers: 2100,
        following: 450,
        totalCookTime: 15600,
        streak: 67,
        achievements: 34,
      },
      specialties: ["Vegan", "Raw Food", "Smoothie Bowls"],
      recentPhotos: ["🥗", "🥑", "🍓", "🥬", "🥕", "🫐", "🌿", "🥒"],
    },
  });

  const [meals, setMeals] = useState<Meal[]>([
    {
      id: 1,
      userId: 1,
      dish: "Homemade Ramen Bowl",
      images: ["🍜", "🥢", "🧄", "🥚"],
      cookTime: 45,
      difficulty: "Intermediate",
      servings: 2,
      calories: 520,
      likes: 24,
      comments: 8,
      bookmarks: 5,
      location: "Home Kitchen",
      timestamp: "2 hours ago",
      ingredients: [
        "pork belly",
        "miso paste",
        "soft egg",
        "green onions",
        "ramen noodles",
        "corn",
        "nori",
      ],
      achievements: ["First Ramen", "Noodle Master"],
      description:
        "Finally nailed the perfect tonkotsu broth after 3 attempts! The 12-hour simmer was worth every minute.",
      recipe:
        "Started with pork bones simmered overnight, added miso tare, perfectly soft-boiled eggs marinated in soy sauce for 2 hours.",
      tags: ["comfort-food", "japanese", "noodles"],
      nutritionFacts: { protein: 28, carbs: 45, fat: 18, fiber: 4 },
    },
    {
      id: 2,
      userId: 2,
      dish: "Artisan Sourdough Bread",
      images: ["🍞", "🌾", "🧈", "🥖"],
      cookTime: 240,
      difficulty: "Advanced",
      servings: 1,
      calories: 180,
      likes: 45,
      comments: 12,
      bookmarks: 23,
      location: "Home Kitchen",
      timestamp: "5 hours ago",
      ingredients: ["bread flour", "sourdough starter", "sea salt", "water"],
      achievements: ["Bread Baker", "Fermentation Pro", "Early Bird"],
      description:
        "Day 3 of my sourdough journey and I think I've cracked the code! Perfect crust crackle and gorgeous holes.",
      recipe:
        "Fed starter overnight, mixed at 78% hydration, bulk fermented 5 hours with folds every 30 minutes.",
      tags: ["bread", "fermentation", "artisan"],
      nutritionFacts: { protein: 6, carbs: 34, fat: 1, fiber: 2 },
    },
    {
      id: 3,
      userId: 3,
      dish: "Rainbow Buddha Bowl",
      images: ["🥗", "🥑", "🥕", "🫐"],
      cookTime: 30,
      difficulty: "Beginner",
      servings: 1,
      calories: 420,
      likes: 18,
      comments: 6,
      bookmarks: 12,
      location: "Home Kitchen",
      timestamp: "1 day ago",
      ingredients: [
        "quinoa",
        "roasted sweet potato",
        "avocado",
        "chickpeas",
        "kale",
        "blueberries",
        "tahini",
      ],
      achievements: ["Colorful Plate", "Healthy Choice"],
      description:
        "Sunday meal prep vibes! This bowl is packed with nutrients and tastes like a rainbow.",
      recipe:
        "Roasted sweet potatoes at 400°F for 25 minutes, massaged kale with lemon juice, made tahini dressing.",
      tags: ["vegan", "healthy", "meal-prep"],
      nutritionFacts: { protein: 16, carbs: 52, fat: 18, fiber: 14 },
    },
  ]);

  const [comments] = useState<Record<number, Comment[]>>({
    1: [
      {
        id: 1,
        userId: 2,
        text: "This looks incredible! How long did you simmer the broth?",
        timestamp: "1h ago",
        likes: 3,
      },
      { id: 2, userId: 3, text: "The egg looks perfect! 🤤", timestamp: "45m ago", likes: 1 },
      {
        id: 3,
        userId: 1,
        text: "@mikethebaker 12 hours overnight! Worth every minute",
        timestamp: "30m ago",
        likes: 2,
      },
    ],
    2: [
      { id: 4, userId: 1, text: "That crumb structure is *chefs kiss*", timestamp: "2h ago", likes: 5 },
      { id: 5, userId: 3, text: "I need to try this recipe!", timestamp: "1h ago", likes: 2 },
    ],
  });

  const [newMeal, setNewMeal] = useState({
    dish: "",
    cookTime: "",
    difficulty: "Beginner" as Difficulty,
    description: "",
    ingredients: "",
    servings: 1,
  });

  const getCurrentUser = (): User => ({
    id: "current",
    name: "You",
    username: "@yourcooking",
    avatar: "👤",
    bio: "Home cooking enthusiast on a delicious journey 🍳",
    location: "Your Kitchen",
    joinDate: "August 2025",
    stats: {
      meals: 127,
      followers: 89,
      following: 156,
      totalCookTime: 2340,
      streak: 12,
      achievements: 23,
    },
    specialties: ["Learning", "Experimenting", "Having Fun"],
    recentPhotos: ["🍽️", "🥘", "🍳", "🥗", "🍝", "🥙", "🌮", "🍜"],
  });

  const addMeal = () => {
    if (!newMeal.dish) return;

    const meal: Meal = {
      id: meals.length + 1,
      userId: "current",
      dish: newMeal.dish,
      images: ["🍽️", "👨‍🍳", "🔥", "✨"],
      cookTime: parseInt(newMeal.cookTime) || 30,
      difficulty: newMeal.difficulty,
      servings: newMeal.servings,
      calories: Math.floor(Math.random() * 400) + 200,
      likes: 0,
      comments: 0,
      bookmarks: 0,
      location: "Your Kitchen",
      timestamp: "Just now",
      ingredients: newMeal.ingredients
        .split(",")
        .map((i) => i.trim())
        .filter((i) => i),
      achievements: Math.random() > 0.7 ? ["First Try", "New Recipe"] : [],
      description: newMeal.description,
      recipe: "",
      tags: ["homemade"],
      nutritionFacts: { protein: 15, carbs: 30, fat: 10, fiber: 5 },
    };

    setMeals([meal, ...meals]);
    setNewMeal({ dish: "", cookTime: "", difficulty: "Beginner", description: "", ingredients: "", servings: 1 });
    setShowNewMeal(false);
  };

  const likeMeal = (mealId: number) => {
    setMeals(
      meals.map((meal) => (meal.id === mealId ? { ...meal, likes: meal.likes + 1 } : meal))
    );
  };

  const bookmarkMeal = (mealId: number) => {
    setMeals(
      meals.map((meal) => (meal.id === mealId ? { ...meal, bookmarks: meal.bookmarks + 1 } : meal))
    );
  };

  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  const getDifficultyColor = (difficulty: Difficulty) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "Advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getUserById = (userId: number | "current"): User => {
    if (userId === "current") return getCurrentUser();
    return users[userId];
  };

  const getMealById = (mealId: number) => meals.find((meal) => meal.id === mealId);

  const renderHeader = () => {
    if (currentView === "userProfile") {
      const user = selectedUserId ? getUserById(selectedUserId) : null;
      return (
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button onClick={() => setCurrentView("feed")} className="p-1 hover:bg-gray-100 rounded">
                <ArrowLeft className="w-6 h-6 text-gray-600" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{user?.name}</h1>
                <p className="text-sm text-gray-600">{user?.username}</p>
              </div>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded">
              <MoreHorizontal className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      );
    }

    if (currentView === "mealDetail") {
      return (
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
            <button onClick={() => setCurrentView("feed")} className="p-1 hover:bg-gray-100 rounded">
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">Recipe Details</h1>
            <button className="p-2 hover:bg-gray-100 rounded">
              <Share2 className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <ChefHat className="w-8 h-8 text-orange-500" />
              <h1 className="text-2xl font-bold text-gray-900">MealStrava</h1>
            </div>
            <div className="flex items-center space-x-3">
              <button className="p-2 hover:bg-gray-100 rounded">
                <Search className="w-6 h-6 text-gray-600" />
              </button>
              <button
                onClick={() => setShowNewMeal(true)}
                className="bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-orange-600 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Log Meal</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderNavigation = () => {
    if (currentView === "userProfile" || currentView === "mealDetail") return null;

    return (
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="bg-white rounded-lg p-1 flex space-x-1 shadow-sm">
          {(() => {
            type TabKey = "feed" | "profile" | "leaderboard";
            type Tab = { key: TabKey; label: string; icon: typeof Users };
            const tabs: Tab[] = [
              { key: "feed", label: "Feed", icon: Users },
              { key: "profile", label: "Profile", icon: Trophy },
              { key: "leaderboard", label: "Leaderboard", icon: Award },
            ];
            return tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  onClick={() => setCurrentView(tab.key)}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium capitalize transition-colors flex items-center justify-center space-x-2 ${
                    currentView === tab.key
                      ? "bg-orange-500 text-white"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            });
          })()}
        </div>
      </div>
    );
  };

  const renderFeed = () => {
    return (
      <div className="space-y-6">
        {meals.map((meal) => {
          const user = getUserById(meal.userId);
          return (
            <div key={meal.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <div
                  className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 -mx-2 px-2 py-2 rounded-lg transition-colors"
                  onClick={() => {
                    setSelectedUserId(meal.userId);
                    setCurrentView("userProfile");
                  }}
                >
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-lg">
                    {user.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{user.name}</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <MapPin className="w-3 h-3" />
                      <span>{meal.location}</span>
                      <span>•</span>
                      <span>{meal.timestamp}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="relative bg-gradient-to-br from-orange-100 to-red-100 h-64 flex items-center justify-center cursor-pointer hover:opacity-95 transition-opacity"
                onClick={() => {
                  setSelectedMealId(meal.id);
                  setCurrentView("mealDetail");
                }}
              >
                <div className="text-8xl">{meal.images[0]}</div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur rounded-lg px-3 py-1">
                  <div className="flex items-center space-x-2 text-sm">
                    <Clock className="w-4 h-4 text-orange-500" />
                    <span className="font-medium">{formatTime(meal.cookTime)}</span>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <h2
                  className="text-xl font-bold text-gray-900 mb-2 cursor-pointer hover:text-orange-600 transition-colors"
                  onClick={() => {
                    setSelectedMealId(meal.id);
                    setCurrentView("mealDetail");
                  }}
                >
                  {meal.dish}
                </h2>
                <p className="text-gray-600 mb-3">{meal.description}</p>

                <div className="flex items-center space-x-4 mb-3">
                  <div className="flex items-center space-x-1">
                    <Flame className="w-4 h-4 text-red-500" />
                    <span className="text-sm font-medium">{meal.calories} cal</span>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(meal.difficulty)}`}>
                    {meal.difficulty}
                  </div>
                  <div className="text-sm text-gray-600">
                    {meal.servings} serving{meal.servings > 1 ? "s" : ""}
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {meal.ingredients.slice(0, 4).map((ingredient, idx) => (
                      <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                        {ingredient}
                      </span>
                    ))}
                    {meal.ingredients.length > 4 && (
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                        +{meal.ingredients.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {meal.achievements.length > 0 && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {meal.achievements.map((achievement, idx) => (
                        <div
                          key={idx}
                          className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1"
                        >
                          <Trophy className="w-3 h-3" />
                          <span>{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => likeMeal(meal.id)}
                      className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors"
                    >
                      <Heart className="w-5 h-5" />
                      <span className="text-sm font-medium">{meal.likes}</span>
                    </button>
                    <button
                      onClick={() => {
                        setSelectedMealId(meal.id);
                        setCurrentView("mealDetail");
                      }}
                      className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors"
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span className="text-sm font-medium">{meal.comments}</span>
                    </button>
                  </div>
                  <button
                    onClick={() => bookmarkMeal(meal.id)}
                    className="flex items-center space-x-2 text-gray-600 hover:text-yellow-500 transition-colors"
                  >
                    <Bookmark className="w-5 h-5" />
                    <span className="text-sm font-medium">{meal.bookmarks}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderUserProfile = () => {
    const user = selectedUserId ? getUserById(selectedUserId) : null;
    const userMeals = meals.filter((meal) => meal.userId === selectedUserId);

    if (!user) return null;

    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-orange-100 via-red-50 to-pink-100 p-6 rounded-xl">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-4xl shadow-lg">
                {user.avatar}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
                <p className="text-gray-600">{user.username}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{user.location}</span>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors">
                Follow
              </button>
              <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <MessageCircle className="w-4 h-4" />
              </button>
            </div>
          </div>

          <p className="text-gray-700 mb-4">{user.bio}</p>

          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{user.stats.meals}</div>
              <div className="text-sm text-gray-600">Meals</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{user.stats.followers.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Followers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{user.stats.following}</div>
              <div className="text-sm text-gray-600">Following</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{user.stats.streak}</div>
              <div className="text-sm text-gray-600">Day Streak</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-3">Cooking Specialties</h3>
          <div className="flex flex-wrap gap-2">
            {user.specialties.map((specialty, idx) => (
              <span key={idx} className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                {specialty}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-3">Recent Dishes</h3>
          <div className="grid grid-cols-4 gap-3">
            {user.recentPhotos.map((photo, idx) => (
              <div
                key={idx}
                className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center text-3xl cursor-pointer hover:scale-105 transition-transform shadow-sm"
              >
                {photo}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold">Recent Activity</h3>
          </div>
          <div className="divide-y divide-gray-100">
            {userMeals.map((meal) => (
              <div
                key={meal.id}
                className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => {
                  setSelectedMealId(meal.id);
                  setCurrentView("mealDetail");
                }}
              >
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{meal.images[0]}</div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{meal.dish}</div>
                    <div className="text-sm text-gray-600 flex items-center space-x-2">
                      <span>{meal.timestamp}</span>
                      <span>•</span>
                      <span>{formatTime(meal.cookTime)}</span>
                      <span>•</span>
                      <span>{meal.likes} likes</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(meal.difficulty)}`}>
                      {meal.difficulty}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderMealDetail = () => {
    const meal = selectedMealId ? getMealById(selectedMealId) : undefined;
    if (!meal) return null;
    const user = getUserById(meal.userId);
    const mealComments = comments[meal.id] || [];

    return (
      <div className="space-y-6">
        <div className="relative bg-gradient-to-br from-orange-100 to-red-100 rounded-xl overflow-hidden">
          <div className="aspect-video flex items-center justify-center">
            <div className="text-9xl">{meal.images[0]}</div>
          </div>
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur rounded-lg px-3 py-2">
            <div className="flex items-center space-x-2 text-sm">
              <Clock className="w-4 h-4 text-orange-500" />
              <span className="font-medium">{formatTime(meal.cookTime)}</span>
            </div>
          </div>
          <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(meal.difficulty)}`}>
            {meal.difficulty}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-3">{meal.dish}</h1>
              <div
                className="flex items-center space-x-3 mb-4 cursor-pointer hover:bg-gray-50 -mx-2 px-2 py-2 rounded-lg transition-colors"
                onClick={() => {
                  setSelectedUserId(meal.userId);
                  setCurrentView("userProfile");
                }}
              >
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-xl">
                  {user.avatar}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{user.name}</div>
                  <div className="text-sm text-gray-600">{user.username}</div>
                </div>
              </div>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded">
              <Share2 className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <p className="text-gray-700 mb-4">{meal.description}</p>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <div className="text-sm text-gray-500">Cook Time</div>
              <div className="font-semibold">{formatTime(meal.cookTime)}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <div className="text-sm text-gray-500">Servings</div>
              <div className="font-semibold">{meal.servings}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <div className="text-sm text-gray-500">Calories</div>
              <div className="font-semibold">{meal.calories}</div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Ingredients</h3>
            <div className="flex flex-wrap gap-2">
              {meal.ingredients.map((ingredient, idx) => (
                <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                  {ingredient}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Nutrition Facts</h3>
            <div className="grid grid-cols-4 gap-2 text-sm">
              <div className="bg-gray-50 p-2 rounded">Protein: {meal.nutritionFacts.protein}g</div>
              <div className="bg-gray-50 p-2 rounded">Carbs: {meal.nutritionFacts.carbs}g</div>
              <div className="bg-gray-50 p-2 rounded">Fat: {meal.nutritionFacts.fat}g</div>
              <div className="bg-gray-50 p-2 rounded">Fiber: {meal.nutritionFacts.fiber}g</div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="flex items-center space-x-4">
              <button onClick={() => likeMeal(meal.id)} className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors">
                <Heart className="w-5 h-5" />
                <span className="text-sm font-medium">{meal.likes}</span>
              </button>
              <button onClick={() => bookmarkMeal(meal.id)} className="flex items-center space-x-2 text-gray-600 hover:text-yellow-500 transition-colors">
                <Bookmark className="w-5 h-5" />
                <span className="text-sm font-medium">{meal.bookmarks}</span>
              </button>
            </div>
            <div className="text-sm text-gray-600">{meal.timestamp}</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold">Comments</h3>
          </div>
          <div className="p-6 space-y-4">
            {mealComments.map((c) => {
              const commentUser = getUserById(c.userId);
              return (
                <div key={c.id} className="flex items-start space-x-3">
                  <div className="w-9 h-9 bg-orange-100 rounded-full flex items-center justify-center">
                    {commentUser.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-gray-900">{commentUser.name}</div>
                    <div className="text-sm text-gray-700">{c.text}</div>
                    <div className="text-xs text-gray-500 mt-1">{c.timestamp}</div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="p-4 border-t border-gray-100">
            <div className="flex items-center space-x-2">
              <input
                className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-200"
                placeholder="Add a comment..."
              />
              <button className="px-3 py-2 bg-orange-500 text-white rounded-lg text-sm flex items-center space-x-1 hover:bg-orange-600">
                <Send className="w-4 h-4" />
                <span>Send</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderLeaderboard = () => {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Weekly Leaderboard</h3>
          <div className="divide-y divide-gray-100">
            {[1, 2, 3].map((rank) => {
              const user = users[rank as 1 | 2 | 3];
              return (
                <div key={rank} className="flex items-center justify-between py-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 text-center font-semibold">#{rank}</div>
                    <div className="w-9 h-9 bg-orange-100 rounded-full flex items-center justify-center">
                      {user.avatar}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{user.name}</div>
                      <div className="text-xs text-gray-600">{user.username}</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-700">{user.stats.meals} meals</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const renderNewMealModal = () => {
    if (!showNewMeal) return null;
    return (
      <div className="fixed inset-0 bg-black/30 z-20 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl w-full max-w-lg shadow-xl">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <div className="font-semibold">Log a new meal</div>
            <button onClick={() => setShowNewMeal(false)} className="p-1 hover:bg-gray-100 rounded">
              <MoreHorizontal className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <div className="p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Dish name</label>
              <input
                value={newMeal.dish}
                onChange={(e) => setNewMeal({ ...newMeal, dish: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-200"
                placeholder="e.g. Spicy Tuna Bowl"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">Cook time (min)</label>
                <input
                  value={newMeal.cookTime}
                  onChange={(e) => setNewMeal({ ...newMeal, cookTime: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-200"
                  placeholder="30"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Servings</label>
                <input
                  type="number"
                  value={newMeal.servings}
                  onChange={(e) => setNewMeal({ ...newMeal, servings: Number(e.target.value) })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-200"
                  placeholder="1"
                  min={1}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Difficulty</label>
              <select
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-200"
                value={newMeal.difficulty}
                onChange={(e) => setNewMeal({ ...newMeal, difficulty: e.target.value as Difficulty })}
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Ingredients (comma separated)</label>
              <input
                value={newMeal.ingredients}
                onChange={(e) => setNewMeal({ ...newMeal, ingredients: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-200"
                placeholder="rice, tuna, mayo, sriracha"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                value={newMeal.description}
                onChange={(e) => setNewMeal({ ...newMeal, description: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-200"
                rows={3}
                placeholder="How did it go? What did you tweak?"
              />
            </div>
          </div>
          <div className="p-4 border-t border-gray-100 flex items-center justify-end space-x-2">
            <button className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50" onClick={() => setShowNewMeal(false)}>
              Cancel
            </button>
            <button className="px-4 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600" onClick={addMeal}>
              Save Meal
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderHeader()}
      {renderNavigation()}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {currentView === "feed" && renderFeed()}
        {currentView === "userProfile" && renderUserProfile()}
        {currentView === "mealDetail" && renderMealDetail()}
        {currentView === "leaderboard" && renderLeaderboard()}
      </div>
      {renderNewMealModal()}
    </div>
  );
};

export default MealStrava;

