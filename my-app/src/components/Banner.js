// src/components/Banner.js
import React from 'react';

const Banner = () => {
  return (
    <div className="banner">
      {/* Dòng chữ "Top 10 Film" xoay vòng */}
      
      <div className="title-rotate">Top 10 Movies</div>

      <div className="slider" style={{ '--quantity': 10 }}>
        <div className="item" style={{ '--position': 1 }}>
          <img src="/img/shawshank.jpg" alt="The Shawshank Redemption" />
        </div>
        <div className="item" style={{ '--position': 2 }}>
          <img src="/img/godfather.jpg" alt="The Godfather" />
        </div>
        <div className="item" style={{ '--position': 3 }}>
          <img src="/img/schindlers-list.jpg" alt="Schindler's List" />
        </div>
        <div className="item" style={{ '--position': 4 }}>
          <img src="/img/pulp-fiction.jpg" alt="Pulp Fiction" />
        </div>
        <div className="item" style={{ '--position': 5 }}>
          <img src="/img/dark-knight.jpg" alt="The Dark Knight" />
        </div>
        <div className="item" style={{ '--position': 6 }}>
          <img src="/img/forrest-gump.jpg" alt="Forrest Gump" />
        </div>
        <div className="item" style={{ '--position': 7 }}>
          <img src="/img/avatar.jpg" alt="Avatar" />
        </div>
        <div className="item" style={{ '--position': 8 }}>
          <img src="/img/inception.jpg" alt="Inception" />
        </div>
        <div className="item" style={{ '--position': 9 }}>
          <img src="/img/matrix.jpg" alt="The Matrix" />
        </div>
        <div className="item" style={{ '--position': 10 }}>
          <img src="/img/parasite.jpg" alt="Parasite" />
        </div>
      </div>
      <div className="content">
        <div className="model"></div>
      </div>
    </div>
  );
};

export default Banner;
