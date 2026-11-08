import { useState, useEffect } from "react";

export default function App() {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const fetchDogImage = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://dog.ceo/api/breeds/image/random");
      const data = await response.json();
      if (data && data.message) {
        setImageUrl(data.message);
      }
    } catch (error) {
      console.error("Error fetching image:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDogImage();
  }, []);

  return (
    <div>
      <h1>My Pet App</h1>
      <div>
        <label>Choose a Breed</label>
        <select>
          <option>Barbet</option>
        </select>
      </div>
      <div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <img src={imageUrl} alt="Dog" style={{ width: "300px", height: "300px" }} />
        )}
      </div>
      <button onClick={fetchDogImage}>Fetch Again</button>
    </div>
  );
}