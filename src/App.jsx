import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { lazy, Suspense } from 'react';

import Loader from './components/Loader/Loader';
import Navigation from './components/Navigation/Navigation';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const MovieCast = lazy(() => import('./components/MovieCast/MovieCast'));
const MovieDetailsPage = lazy(() =>
  import('./pages/MovieDetailsPage/MovieDetailsPage')
);
const MoviesPage = lazy(() => import('./pages/MoviesPage/MoviesPage'));
const MovieReviews = lazy(() =>
  import('./components/MovieReviews/MovieReviews')
);
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));

import './App.css';

function App() {
  return (
    <div className="container">
      <Toaster />
      <Navigation />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
