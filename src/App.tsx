import { useState, useEffect } from "react";

const FALLBACK_IMAGE = "https://images.dog.ceo/breeds/barbet/n02110958_114.jpg";

export default function App() {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [breed, setBreed] = useState<string>("barbet");
  const [imageUrl, setImageUrl] = useState<string>(FALLBACK_IMAGE);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch the full list of breeds on initial load
  useEffect(() => {
    fetch("https://dog.ceo/api/breeds/list/all")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.message) {
          const breedList = Object.keys(data.message);
          setBreeds(breedList);
          if (breedList.length > 0) {
            const initialBreed = breedList[0];
            setBreed(initialBreed);
            fetchDogImage(initialBreed);
          }
        }
      })
      .catch((err) => console.error("Error fetching breeds list:", err));
  }, []);

  const fetchDogImage = async (selectedBreed: string) => {
    if (!selectedBreed) return;
    setLoading(true);
    try {
      const response = await fetch(`https://dog.ceo/api/breed/${selectedBreed}/images/random`);
      const data = await response.json();
      if (data && data.message) {
        setImageUrl(data.message);
      } else {
        setImageUrl(FALLBACK_IMAGE);
      }
    } catch (error) {
      console.error("Error fetching image:", error);
      setImageUrl(FALLBACK_IMAGE);
    } finally {
      setLoading(false);
    }
  };

  // Handle manual dropdown selection
  const handleBreedChange = (selectedBreed: string) => {
    setBreed(selectedBreed);
    fetchDogImage(selectedBreed);
  };

  // Handler to pick a random breed and update both selection & picture
  const handleFetchRandom = () => {
    if (breeds.length === 0) return;
    const randomBreed = breeds[Math.floor(Math.random() * breeds.length)];
    setBreed(randomBreed);
    fetchDogImage(randomBreed);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-pink-50 p-4 font-sans">
      <div className="w-full max-w-sm bg-pink-100/70 border border-pink-200 rounded-3xl shadow-xl p-6 flex flex-col items-center space-y-6">
        <h1 className="text-2xl font-bold text-pink-700 tracking-wide">
          My Pet App
        </h1>

        <div className="w-full space-y-2">
          <label className="text-xs font-semibold tracking-wider text-pink-600 uppercase">
            Choose a Breed
          </label>
          <div className="relative">
            <select
              value={breed}
              onChange={(e) => handleBreedChange(e.target.value)}
              className="w-full appearance-none bg-white border border-pink-200 rounded-2xl px-4 py-3 text-pink-950 font-medium focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 cursor-pointer capitalize shadow-sm"
            >
              {breeds.map((b) => (
                <option key={b} value={b}>
                  {b.charAt(0).toUpperCase() + b.slice(1)}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-pink-500 text-sm">
              ▼
            </div>
          </div>
        </div>

        <div className="w-full bg-white border border-pink-200 rounded-2xl p-4 flex justify-center items-center shadow-sm min-h-[280px]">
          {loading ? (
            <div className="text-pink-400 font-medium">Loading...</div>
          ) : (
            <img
              src={imageUrl}
              alt={breed}
              onError={(e) => {
                // If image fails to load, replace src with fallback image
                (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
              }}
              className="w-full h-64 object-cover rounded-xl shadow-sm"
            />
          )}
        </div>

        <button
          onClick={handleFetchRandom}
          className="w-full py-4 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-2xl shadow-md transition-all duration-200 flex items-center justify-center space-x-2 active:scale-95 cursor-pointer"
        >
          <span className="text-lg">🔄</span>
          <span>Fetch Again</span>
        </button>
      </div>
    </div>
  );
}