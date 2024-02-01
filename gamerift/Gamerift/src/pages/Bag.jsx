import React, { useState, useEffect } from 'react';
import './bag.css';
import ShopBagItem from '../components/ShopBagItem';

function Bag({ games, reference }) {
  const [total, setTotal] = useState(0);

  const handleTotalPayment = () => {
    // Calculate total without applying discounts
    let total = games
      .map(game => game.price)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
      .toFixed(2);

    return total;
  };

  useEffect(() => {
    setTotal(handleTotalPayment());
  }, [games]);

  return (
    <section id="bag" className="bag" ref={reference}>
      <div className="container-fluid">
        <div className="row mb-3">
          <h1>Carrinho</h1>
        </div>
        {games.length === 0 ? (
          <h2>Está Vazio </h2>
        ) : (
          <>
            <div className="row">
              <div className="table-responsive">
                <table className="shopBagTable table table-borderless align-middle ">
                  <thead>
                    <tr>
                      <th scope="col">No.</th>
                      <th scope="col">Preview</th>
                      <th scope="col">Jogo</th>
                      <th scope="col">Preço</th>
                      <th scope="col">Retirar</th>
                    </tr>
                  </thead>

                  <tbody>
                    {games.map((game, index) => (
                      <ShopBagItem index={index} key={game._id} game={game} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="row d-flex justify-content-between mt-5">
              <div className="col-lg-2 align-items-center">
                <p className="itemCount">Total Items: {games.length}</p>
              </div>
              <div className="col-lg-10 d-flex justify-content-end">
                <div className="payment">
                  Total: €{total}
                  <a href="#">
                    Check out <i className="bi bi-wallet-fill"></i>
                  </a>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default Bag;
