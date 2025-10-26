import { useState } from 'react';
import QuestionComponent from './components/QuestionComponent';
import MovieResult from './components/MovieResult';
import questionsData from './data/questions.json';
import moviesData from './data/movies.json';
import './App.css';

interface Option {
  id: string;
  text: string;
  nextQuestion?: string;
  movieId?: string;
}

interface Question {
  id: string;
  text: string;
  options: Option[];
}

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

type AppState = 'question' | 'result';

function App() {
  const [currentQuestionId, setCurrentQuestionId] = useState<string>('1');
  const [appState, setAppState] = useState<AppState>('question');
  const [recommendedMovie, setRecommendedMovie] = useState<Movie | null>(null);
  const [questions] = useState<Question[]>(questionsData.questions);
  const [movies] = useState<Record<string, Movie>>(moviesData.movies);

  const currentQuestion = questions.find(q => q.id === currentQuestionId);

  const handleAnswer = (option: Option) => {
    if (option.movieId) {
      // This is a final answer - show the movie recommendation
      const movie = movies[option.movieId];
      if (movie) {
        setRecommendedMovie(movie);
        setAppState('result');
      }
    } else if (option.nextQuestion) {
      // Move to the next question
      setCurrentQuestionId(option.nextQuestion);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionId('1');
    setAppState('question');
    setRecommendedMovie(null);
  };

  if (appState === 'result' && recommendedMovie) {
    return (
      <div className="app">
        <MovieResult movie={recommendedMovie} onRestart={handleRestart} />
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="app">
        <div className="error-message">
          <h1>Something went wrong!</h1>
          <p>Unable to load questions. Please refresh the page.</p>
          <button onClick={handleRestart}>Restart</button>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="app-header">
        <h1>🎬 Scary Movie Picker</h1>
        <p>Answer a few questions to get your perfect horror movie recommendation!</p>
      </div>
      
      <QuestionComponent 
        question={currentQuestion} 
        onAnswer={handleAnswer} 
      />
      
      <div className="progress-indicator">
        <p>Question {currentQuestionId} of {questions.length}</p>
      </div>
    </div>
  );
}

export default App;
