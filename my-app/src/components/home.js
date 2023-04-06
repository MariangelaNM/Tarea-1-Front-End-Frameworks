import React, { useEffect, useState } from 'react';
import data from './data/data.json';
const Home = () => {

    const [cardSee, setCardSee] = useState(false);
    let identificadorTiempoDeEspera;

    function temporizadorDeRetraso() {
        identificadorTiempoDeEspera = setTimeout(funcionConRetraso, 3000);
    }

    function funcionConRetraso() {
        setCardSee(true);
    }
    useEffect(() => {
        temporizadorDeRetraso()
    });

    return (
        <div>
            <input type="text" className="custom-file-input searchInput" placeholder="Search" id="inputGroupFile02"></input>
            {cardSee === true &&

                <div className="row row-cols-1 row-cols-md-3" style={{ margin: '0px', marginTop: '10px' }} >
                    {data.map((item, index) => (

                        <div className="col mb-4" id={{ index }}>
                            <div className="card">
                                <img src={item.img}></img>
                                <div className="card-body">
                                    <div className="contenedor-horizontal">
                                        <p className="contenido-horizontal texto-time">3min ago</p>
                                        <p className="contenido-horizontal"><button type="button" className="btn btn-danger">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-suit-heart-fill" viewBox="0 0 16 16">
                                                <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z" />
                                            </svg> {item.likes}k</button></p>
                                    </div>
                                    <p className="account-letter">@{item.user}</p>
                                    <p className="card-text">{item.description}</p>
                                    <p className="comments-letter">
                                        <svg style={{ marginRight: "1%" }} xmlns="http://www.w3.org/2000/svg" width="14" height="23" fill="currentColor" className="bi bi-chat-right" viewBox="0 0 16 16">
                                            <path d="M2 1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h9.586a2 2 0 0 1 1.414.586l2 2V2a1 1 0 0 0-1-1H2zm12-1a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12z" />
                                        </svg>
                                        Comments {item.comments}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            }
            {cardSee === false &&

                <div class="d-flex justify-content-center">
                    <div class="spinner-border" role="status">
                   
                    </div>
                    <span class="sr-only" style={{marginLeft:"2px"}}>Loading...</span>
                </div>
            }
        </div>
    )
};


export default Home