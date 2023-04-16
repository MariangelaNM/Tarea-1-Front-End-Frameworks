import React, { useEffect, useState } from 'react';
import data from './data/data.json';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
const Home = () => {

    const [cardData, setcardData] = useState(data);
    const [cardSee, setCardSee] = useState(false);
    const [messageSeeSave, setCardmessageSeeSave] = useState(false);
    const [messageSee, setCardmessageSee] = useState(false);
    const [inputSearch, setInputSearch] = useState('');
    let identificadorTiempoDeEspera;
    const [result, setResult] = React.useState();

    useEffect(() => {
        temporizadorDeRetraso()
    }, []);

    useEffect(() => {
        const token = (JSON.parse(localStorage.getItem("token")).token);
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("https://three-points.herokuapp.com/api/posts", requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                // check for error response
                if (!response.ok) {
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
                setResult(data);
                console.log(result)
            })
            .catch(error => {
                this.setState({ errorMessage: error.toString() });
                console.error('There was an error!', error);
            });

    }, []);


    function temporizadorDeRetraso() {
        identificadorTiempoDeEspera = setTimeout(funcionConRetraso, 3000);
    }

    function funcionConRetraso() {
        setCardSee(true);
    }

    const handleChange = (event) => {
        setInputSearch(event.target.value);
        let newSearchCard = [];
        setCardmessageSee(false)
        if ((search(cardData, event.target.value)) != undefined) {
            setCardmessageSee(false)
            temporizadorDeRetraso()
            newSearchCard.push(search(cardData, event.target.value));
            setcardData(newSearchCard);
        }
        else if (event.target.value === '') {
            setCardmessageSee(false)
            setcardData(data);
        }
        else if (event.target.value != '' && (search(cardData, event.target.value)) === undefined) {
            setCardmessageSee(true)
        }
    };

    function search(obj, key) {
        if (typeof obj !== "object" || obj === null) {
            return obj === key ? obj : undefined;
        }
        for (const [k, v] of Object.entries(obj)) {
            const result = search(v, key);
            if (result !== undefined) {
                return v;

            }
        }
        return undefined;
    }
    function guardar() {

        setCardmessageSeeSave(false)
    }
    const addLike = (index) => {
        var likes = data[index].likes;
        data[index].likes = likes + 1;
        setcardData(data);
        setCardmessageSeeSave(true)
        setTimeout(guardar, 2000)
    }

    return (
        <div>
            <input type="text" className="custom-file-input searchInput" placeholder="Search"
                id="search" name="message" onChange={handleChange}>
            </input>

            {messageSee === true &&
                <h8 style={{ marginLeft: "15px" }}>No se encuentra a "{inputSearch}"</h8>}

            {messageSeeSave === true &&
                <Button style={{ float: 'right' }} variant="success" disabled>
                    <Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    />
                    Guardando...
                </Button>
            }
            {cardSee === true &&

                <div className="row row-cols-1 row-cols-md-3" style={{ margin: '0px', marginTop: '10px' }} >
                    {cardData.map((item, index) => (

                        <div className="col mb-4" id={{ index }}>
                            <div className="card">
                                <img src={item.img}></img>
                                <div className="card-body">
                                    <div className="contenedor-horizontal">
                                        <p className="contenido-horizontal texto-time">3min ago</p>
                                        <p className="contenido-horizontal">
                                            <button type="button" className="btn btn-danger"
                                                onClick={() => {

                                                    temporizadorDeRetraso();
                                                    addLike(index);
                                                }} >

                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-suit-heart-fill" viewBox="0 0 16 16">
                                                    <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z" />
                                                </svg> {item.likes}
                                            </button>
                                        </p>
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

                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">

                    </div>
                    <span className="sr-only" style={{ marginLeft: "2px" }}>Loading...</span>
                </div>
            }

        </div>
    )
};


export default Home