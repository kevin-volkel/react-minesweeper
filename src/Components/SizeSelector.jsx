import React, { useState } from 'react'


const SizeSelector = ({ setFinalBombs, setFinalWidth, setFinalHeight, setCreating }) => {
  const [height, setHeight] = useState(10)
  const [width, setWidth] = useState(10)
  const [bombs, setBombs] = useState(20)
  const [maxBombs, setMaxBombs] = useState(30)
  const maxBombMultiplier = 0.3;

  const handleSubmit = (e) => {
    e.preventDefault();
    setFinalBombs(bombs)
    setFinalWidth(width)
    setFinalHeight(height)
    setCreating(false)  
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch(name) {
      case "height-slider":
        setHeight(value);
        setMaxBombs(Math.floor(width * height * maxBombMultiplier ));
        if(bombs > maxBombs) {
          setBombs(maxBombs);
        }
        break;
      case "width-slider":
        setWidth(value);
        setMaxBombs(Math.floor(width * height * maxBombMultiplier))
        if(bombs > maxBombs) {
          setBombs(maxBombs);
        }
        break;
      case "bombs-slider":
        setBombs(value);
        break;
      default:
        break;
    }
  }

  return (
    <div className="size-selector">
      <form className="size-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Choose the size</h2>
        <div className="slider">
          <label htmlFor="height-slider">Height: {height}</label>
          <input
            name="height-slider"
            id="height-slider"
            type="range"
            min="5"
            max="20"
            value={height}
            onChange={handleChange}
          />
        </div>
        <div className="slider">
          <label htmlFor="width-slider">Width: {width}</label>
          <input
            name="width-slider"
            id="width-slider"
            type="range"
            min="5"
            max="20"
            value={width}
            onChange={handleChange}
          />
        </div>
        <div className="slider">
          <label htmlFor="bombs-slider">Bombs: {bombs}</label>
          <input
            name="bombs-slider"
            id="bombs-slider"
            type="range"
            min="5"
            max={maxBombs}
            value={bombs}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="submit-button">Generate</button>
      </form>
    </div>
  );
};

export default SizeSelector;
