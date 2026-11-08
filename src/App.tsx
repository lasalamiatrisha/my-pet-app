import { useState, useEffect } from "react";

export default function App() {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [breed, setBreed] = useState<string>("barbet");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetch("https://dog.ceo/api/breeds/list/all")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.message) {
          const breedList = Object.keys(data.message);
          setBreeds(breedList);
          if (breedList.length > 0) setBreed(breedList[0]);
        }
      });
  }, []);

  const fetchDogImage = async (selectedBreed: string) => {
    if (!selectedBreed) return;
    setLoading(true);
    try {
      const response = await fetch(`https://dog.ceo/api/breed/${selectedBreed}/images/random`);
      const data = await response.json();
      if (data && data.message) setImageUrl(data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (breed) fetchDogImage(breed);
  }, [breed]);

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="w-full max-w-sm rounded-3xl p-6 flex flex-col items-center space-y-6">
        <h1>My Pet App</h1>
        <div className="w-full space-y-2">
          <label>Choose a Breed</label>
          <div>
            <select value={breed} onChange={(e) => setBreed(e.target.value)} className="w-full">
              {breeds.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="w-full p-4 flex justify-center items-center">
          {loading ? <div>Loading...</div> : <img src={imageUrl} alt={breed} className="w-full h-64 object-cover" />}
        </div>
        <button onClick={() => fetchDogImage(breed)} className="w-full py-4">
          Fetch Again
        </button>
      </div>
    </div>
  );
}