import React from 'react';

interface Movie {
  title: string;
  year: number;
  director: string;
  description: string;
  genre: string;
  rating: string;
  runtime: string;
  image: string;
  scareLevel: string;
  qualityLevel: string;
  goreLevel: string;
  trailer: string;
}

interface MovieResultProps {
  movie: Movie;
  onRestart: () => void;
}

// Function to extract YouTube video ID from URL
function getYouTubeVideoId(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

const MovieResult: React.FC<MovieResultProps> = ({ movie, onRestart }) => {
  const videoId = movie.trailer ? getYouTubeVideoId(movie.trailer) : null;

  return (
    <div className="movie-result-container">
      <div className="movie-header">
        You should watch: <h1 className="movie-title">{movie.title}</h1>
        <p className="movie-year">({movie.year})</p>
      </div>
      
      <div className="movie-content">
        <div className="movie-poster">
          <img src={movie.image} alt={`${movie.title} poster`} />
        </div>
        
        <div className="movie-details">
          <div className="movie-info">
            <p><strong>Director:</strong> {movie.director}</p>
            <p><strong>Genre:</strong> {movie.genre}</p>
            <p><strong>Rating:</strong> {movie.rating}</p>
            <p><strong>Runtime:</strong> {movie.runtime}</p>
            <p><strong>Scare Level:</strong> {movie.scareLevel}</p>
            <p><strong>Quality Level:</strong> {movie.qualityLevel}</p>
            <p><strong>Gore Level:</strong> {movie.goreLevel}</p>
          </div>
          
          <div className="movie-description">
            <h3>Description</h3>
            <p>{movie.description}</p>
          </div>
          
          {videoId && (
            <div className="movie-trailer">
              <h3>Trailer</h3>
              <div className="trailer-embed">
                <iframe
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title={`${movie.title} Trailer`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <a 
                href={movie.trailer} 
                target="_blank" 
                rel="noopener noreferrer"
                className="trailer-link"
              >
                Watch on YouTube
              </a>
            </div>
          )}
        </div>
      </div>
      
      <div className="movie-actions">
        <button className="restart-button" onClick={onRestart}>
          Find Another Movie
        </button>
      </div>
    </div>
  );
};

export default MovieResult;
