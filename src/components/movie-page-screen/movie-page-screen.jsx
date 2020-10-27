import React from "react";
import PropTypes from "prop-types";
import {filmType, reviewType} from "../../custom-prop-types";
import {getRatingDesc} from "../../utils.js";

import FilmsList from "../films-list/films-list";
import Tabs from "../tabs/tabs";

const TABS_LABELS = [`Overview`, `Details`, `Reviews`];

const getOverviewContent = (currentFilm) => {
  const {
    description,
    rating,
    director,
    starring,
  } = currentFilm;

  return (
    <React.Fragment>
      <div className="movie-rating">
        <div className="movie-rating__score">{rating.value}</div>
        <p className="movie-rating__meta">
          <span className="movie-rating__level">{getRatingDesc(rating.value)}</span>
          <span className="movie-rating__count">{rating.count} ratings</span>
        </p>
      </div>

      <div className="movie-card__text">
        <p>{description}</p>

        <p className="movie-card__director"><strong>Director: {director}</strong></p>

        <p className="movie-card__starring"><strong>Starring: {starring.slice(0, 4).join(`, `)} and other</strong></p>
      </div>
    </React.Fragment>
  );
};

const getDetailsContent = (currentFilm) => {
  const {
    duration,
    releaseDate,
    director,
    starring,
    genre
  } = currentFilm;

  return (
    <div className="movie-card__text movie-card__row">
      <div className="movie-card__text-col">
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Director</strong>
          <span className="movie-card__details-value">{director}</span>
        </p>
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Starring</strong>
          <span className="movie-card__details-value">
            {starring.slice(0, -1).map((star) =>
              <React.Fragment key={star}>
                {`${star}, `} <br />
              </React.Fragment>
            )}
            {starring.slice(-1)}
          </span>
        </p>
      </div>

      <div className="movie-card__text-col">
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Run Time</strong>
          <span className="movie-card__details-value">{duration}</span>
        </p>
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Genre</strong>
          <span className="movie-card__details-value">{genre}</span>
        </p>
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Released</strong>
          <span className="movie-card__details-value">{releaseDate}</span>
        </p>
      </div>
    </div>
  );
};

const getReviewContent = (review, index) => {
  const {
    text,
    author,
    dateTime,
    rating,
  } = review;

  return (
    <div className="review" key={`review-${index}`}>
      <blockquote className="review__quote">
        <p className="review__text">{text}</p>

        <footer className="review__details">
          <cite className="review__author">{author}</cite>
          <time className="review__date" dateTime="2016-12-24">{dateTime}</time>
        </footer>
      </blockquote>

      <div className="review__rating">{rating}</div>
    </div>
  );
};
const getReviewsContent = (reviews) => {
  return (
    <div className="movie-card__reviews movie-card__row">
      <div className="movie-card__reviews-col">
        {reviews.slice(0, 3).map((review, index) => getReviewContent(review, index))}
      </div>
      <div className="movie-card__reviews-col">
        {reviews.slice(3, 6).map((review, index) => getReviewContent(review, index))}
      </div>
    </div>
  );
};

const MoviePageScreen = (props) => {
  const {films, reviews} = props;
  const filmID = parseInt(props.match.params.id, 10);

  const currentFilm = films.find((film) => film.id === filmID);
  const {
    title,
    fullImg,
    genre,
    releaseDate,
    similarFilmsID,
  } = currentFilm;

  const similarFilms = films.filter(
      (film) => similarFilmsID.some(
          (similarID) => film.id === similarID
      )
  );
  const currentFilmReviews = reviews.find((review) => review.filmId === filmID);

  return <React.Fragment>
    <section className="movie-card movie-card--full">
      <div className="movie-card__hero">
        <div className="movie-card__bg">
          <img src={`${fullImg}`} alt={title} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header movie-card__head">
          <div className="logo">
            <a href="main.html" className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="user-block">
            <div className="user-block__avatar">
              <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
            </div>
          </div>
        </header>

        <div className="movie-card__wrap">
          <div className="movie-card__desc">
            <h2 className="movie-card__title">{title}</h2>
            <p className="movie-card__meta">
              <span className="movie-card__genre">{genre}</span>
              <span className="movie-card__year">{releaseDate}</span>
            </p>

            <div className="movie-card__buttons">
              <button className="btn btn--play movie-card__button" type="button">
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                <span>Play</span>
              </button>
              <button className="btn btn--list movie-card__button" type="button">
                <svg viewBox="0 0 19 20" width="19" height="20">
                  <use xlinkHref="#add"></use>
                </svg>
                <span>My list</span>
              </button>
              <a href="add-review.html" className="btn movie-card__button">Add review</a>
            </div>
          </div>
        </div>
      </div >

      <div className="movie-card__wrap movie-card__translate-top">
        <div className="movie-card__info">
          <div className="movie-card__poster movie-card__poster--big">
            <img src={fullImg} alt="The Grand Budapest Hotel poster" width="218" height="327" />
          </div>

          <div className="movie-card__desc">
            <Tabs
              labels={TABS_LABELS}

            >
              {getOverviewContent(currentFilm)}
              {getDetailsContent(currentFilm)}
              {getReviewsContent(currentFilmReviews.reviews)}
            </Tabs>
          </div>
        </div>
      </div>
    </section >

    <div className="page-content">
      <section className="catalog catalog--like-this">
        <h2 className="catalog__title">More like this</h2>

        <FilmsList
          films={similarFilms.slice(0, 4)}
          history={props.history}
        />
      </section>

      <footer className="page-footer">
        <div className="logo">
          <a href="main.html" className="logo__link logo__link--light">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
        </div>

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  </React.Fragment>;
};

MoviePageScreen.propTypes = {
  // films: PropTypes.arrayOf(filmType).isRequred,
  films: PropTypes.arrayOf(filmType).isRequired,
  reviews: PropTypes.arrayOf(reviewType).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
  history: PropTypes.object,
};

export default MoviePageScreen;
