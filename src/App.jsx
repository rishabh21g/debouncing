import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [show, setShow] = useState(false);
  const [cache , setCache]= useState({})
  const fetchdata = async () => {
    if(cache[input]){
      console.log("Cache Returned" + input)
      setResults(cache[input])
      return
    }
    console.log("API CALLED" + input)
    const data = await fetch(`https://dummyjson.com/recipes/search?q=${input}`);
    const recipesArr = await data.json();
    
    setResults(recipesArr?.recipes);
    setCache((prev)=>{
      return(
        {...prev , [input]:recipesArr.recipes}
      )
    })
  };
  useEffect(() => {
    const timer = setTimeout(fetchdata, 400);
    return ()=>{
      clearTimeout(timer)
    }
  }, [input]);
  return (
    <div className="container">
      <h1>Auto search bar...</h1>
      <input
        type="text"
        placeholder="enter your search query"
        id="text"
        className="input-box"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onFocus={() => setShow(true)}
        onBlur={() => setShow(false)}
      />
      {show && (
        <div className="products">
          {results.map((rp) => {
            return (
              <div key={rp.id} className="result">
                {rp.name}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;
