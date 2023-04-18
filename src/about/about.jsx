import React from 'react';
import './about.css';

export function About(props) {
  const [imageUrl, setImageUrl] = React.useState('');
  const [quote, setQuote] = React.useState('Loading...');
  const [quoteAuthor, setQuoteAuthor] = React.useState('unknown');

  // We only want this to render the first time the component is created and so we provide an empty dependency list.
  React.useEffect(() => {
    const random = Math.floor(Math.random() * 1000);
    const apiUrl = `https://picsum.photos/v2/list?page=${random}&limit=1&category=holidays`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const containerEl = document.querySelector('#picture');

        const width = containerEl.offsetWidth;
        const height = containerEl.offsetHeight;
        const imageUrl = `https://picsum.photos/id/${data[0].id}/${width}/${height}?grayscale`;
        setImageUrl(imageUrl);
      })
      .catch();

    const apiUrlQuotes = 'https://api.quotable.io/random?tags=love';

    fetch(apiUrlQuotes)
      .then((response) => response.json())
      .then((data) => {
        setQuote(data.content);
        setQuoteAuthor(data.author);
      })
      .catch();
  }, []);

  let imgEl = '';

  if (imageUrl) {
    imgEl = <img src={imageUrl} alt='Holiday' />;
  }

  return (
    <main id="snow" className='container-fluid bg-secondary text-center'style={{ minHeight: "100vh" }}>
      <div>
        <div id='picture' className='picture-box'>
          {imgEl}
        </div>

        <p>
          Santa's List is where you can make a christmas list with links to products you desire.
        </p>

        <p>
          Make sure and add as many items as you can think of. Santa will be checking this list twice.
          Take a look at number of things your friends are adding to their list in the Nice List page.
        </p>

        <div className='quote-box bg-light text-dark'>
          <p className='quote'>{quote}</p>
          <p className='author'>{quoteAuthor}</p>
        </div>
      </div>
    </main>
  );
}
