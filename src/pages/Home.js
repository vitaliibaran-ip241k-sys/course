import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-container">
      <div className="hero">
        <h1>
          Прокачай свої <span>технічні навички</span>
          <br />
          Одне видання за раз
        </h1>

        <p>
          Обирай електронні видання з JavaScript, React, Python та інших
          технологій. Розвивайся разом з EC-Reading.
        </p>

        <div className="buttons">
          <Link to="/catalog" className="btn primary">
            Переглянути каталог
          </Link>
          <Link to="/register" className="btn secondary">
            Почати безкоштовно
          </Link>
        </div>

        <div className="stats">
        <div className="stat-card">
            <h3>30+</h3>
            <p>Електронних видань</p>
        </div>

        <div className="stat-card">
            <h3>10+</h3>
            <p>Категорій</p>
        </div>

        <div className="stat-card rating">
            <h3>4.9★</h3>
            <p>Середній рейтинг</p>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Home;