import React from "react";

function App() {
  // First we need some state to save our image URLs too
  // this one starts as an empty array
  const [imageUrls, setImageUrls] = React.useState([]);

  // Next we need a function that calls the API
  // it has to be async, so we can use fetch() with the await keyword
  async function loadCatImageUrl() {
    const response = await fetch("https://aws.random.cat/meow");
    const data = await response.json();

    // To create a new array that consists of an existing array plus a new element
    // we use the spread syntax: [...oldArray, newItem]
    // This will re-render the App component with the new updated array inside imageUrls
    setImageUrls([...imageUrls, data.file]);
  }

  // Every image URL is stored at a specific index in  the array
  // so we can filter for the index to remove it.
  // This function doesn't have to async, because it only updates a local variable
  // and doesn't call fetch()
  function removeImageUrl(indexToRemove) {
    // only keep images which index isn't the one we want to remove
    const updatedCatImageUrls = imageUrls.filter(function (imageUrl, index) {
      const keepImage = indexToRemove !== index;
      return keepImage;
    });

    // re-renders App component
    setImageUrls(updatedCatImageUrls);
  }

  // This useEffect hook will be called when the App component was rendered for the first time.
  // it takes a callback function that does some work and a "dependency array"
  // If the dependency array is empty, the callback will only be called once
  // If the dependency array has some state (like imageUrls),
  // the callback will be called every time that variable changes
  // So if we put imageUrls in the array, a call to setImageUrls() will also execute this callback again.
  React.useEffect(function () {
    loadCatImageUrl();
  }, []);

  // finally we can map over the imageUrls array to convert every URL to an <img> element
  // so catImageElements will be an array of <img> elements.
  // on the first render this array is empty
  // the second run happens after the useEffect hook executed our callback
  // we receive one image URL and convert it to one <img> element
  // for every button click we get one more element
  const catImageElements = imageUrls.map(function (imageUrl, index) {
    return (
      <img
        src={imageUrl}
        alt="Cat"
        style={{ maxHeight: 200 }}
        onClick={() => removeImageUrl(index)}
      />
    );
  });

  // React can render variables with arrays of strings or arrays of elements, also empty arrays
  // so we can use put the catImageElements array into curly braces inside JSX
  return (
    <div>
      <button onClick={loadCatImageUrl}>Load new cat image!</button>
      <h1>Cat Images!</h1>
      {catImageElements}
    </div>
  );
}

export default App;
