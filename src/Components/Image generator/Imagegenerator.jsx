import React, { useState, useRef } from 'react';
import './Imagegenerator.css';
import default_image from '../Assets/ai-image.webp';

const Imagegenerator = () => {
  const [image_url, setImage_url] = useState('/');
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    if (inputRef.current.value === '') {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        'https://api.openai.com/v1/images/generations',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer sk-3OSXO-JZTwECh89x1yfv9AinCZ_nV3SnDUi3J4n4iIT3BlbkFJ5fIM3RxCfywHtAnwTPc-D_xMCfn2Nf0fiL0ySG2HkA', // Replace with your actual API key
            'User-Agent': 'Chrome',
          },
          body: JSON.stringify({
            prompt: `${inputRef.current.value}`, 
            n: 1,
            size: '512x512',
          }),
        }
      );

      const data = await response.json();

      if (data && data.data && data.data.length > 0) {
        setImage_url(data.data[0].url); 
      } else {
        console.error('No image URL returned');
      }
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='ai-image-generator'>
      <div className='header'>Ai Image <span>Generator</span></div>
      <div className='img-loading'>
        <div className='image'>
          <img src={image_url === '/' ? default_image : image_url} alt='' />
        </div>
        <div className='loading'>
          <div className={loading ? 'loading-bar-full' : 'loading-bar'}></div>
          <div className={loading ? 'loading-text' : 'display-none'}>Loading....</div>
        </div>
      </div>
      <div className='search-box'>
        <input
          type='text'
          ref={inputRef}
          className='search-input'
          placeholder='Describe What You Want To See'
        />
        <div className='generate-btn' onClick={generateImage}>Generate</div>
      </div>
    </div>
  );
};

export default Imagegenerator;
