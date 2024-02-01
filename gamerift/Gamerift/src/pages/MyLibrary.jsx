import React from 'react';
import GameCard from '../components/GameCard';

function MyLibrary({ games, reference }) {
  return (
    <section id="library" className="library" ref={reference}>
      <div className="container-fluid">
        <div className="row mb-3">
          <h1>Lista de desejos</h1>
        </div>
        <div className="row">
          {games.length === 0 ? (
            <h2>Está vazio</h2>
          ) : (
            games.map(game => <GameCard key={game._id} game={game} />)
          )}
        </div>
      </div>
    </section>
  );
}

export default MyLibrary;