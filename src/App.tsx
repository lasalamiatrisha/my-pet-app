export default function App() {
  return (
    <div>
      <h1>My Pet App</h1>
      <div>
        <label>Choose a Breed</label>
        <select>
          <option>Loading breeds...</option>
        </select>
      </div>
      <div>
        <div>Loading image...</div>
      </div>
      <button>Fetch Again</button>
    </div>
  );
}