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
    <div>
      <h1>My Pet App</h1>
      <div>
        <label>Choose a Breed</label>
        <select value={breed} onChange={(e) => setBreed(e.target.value)}>
          {breeds.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      </div>
      <div>
        {loading ? <div>Loading...</div> : <img src={imageUrl} alt={breed} style={{ width: "300px", height: "300px" }} />}
      </div>
      <button onClick={() => fetchDogImage(breed)}>Fetch Again</button>
    </div>
  );
}