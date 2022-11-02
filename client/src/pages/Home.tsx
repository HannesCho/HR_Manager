import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="home-container">
      <div className="first-row">
        <div className="first-row-text">
          <h1>Welcome to MyReS</h1>
          <h2>My Recipe Scrapbook</h2>
          <Link to="/recipes">
            <button className="main-btn">Find your recipes</button>
          </Link>
        </div>
      </div>
      <div className="second-row">
        <div className="second-left"></div>
        <div className="second-middle"></div>
        <div className="second-right"></div>
      </div>
    </div>
  );
}
