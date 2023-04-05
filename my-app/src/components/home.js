import data from './data/data.json';
const Home = () => {
    return (
        <div>
            <input type="text" class="custom-file-input searchInput" placeholder="Search" id="inputGroupFile02"></input>

            <div class="row row-cols-1 row-cols-md-3" style={{ margin: '0px', marginTop: '10px' }} >

                {data.map((item, index) => (

                    <div class="col mb-4" >


                        <div class="card">
                            <img src={item.img}></img>
                            <div class="card-body">
                                <div class="contenedor-horizontal">
                                    <p class="contenido-horizontal texto-time">3min ago</p>
                                    <p class="contenido-horizontal"><button type="button" class="btn btn-danger">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-suit-heart-fill" viewBox="0 0 16 16">
                                            <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z" />
                                        </svg> {item.likes}k</button></p>
                                </div>
                                <p class="account-letter">@{item.user}</p>
                                <p class="card-text">{item.description}</p>
                                <p class="comments-letter">
                                    <svg style={{ marginRight: "1%" }} xmlns="http://www.w3.org/2000/svg" width="14" height="23" fill="currentColor" class="bi bi-chat-right" viewBox="0 0 16 16">
                                        <path d="M2 1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h9.586a2 2 0 0 1 1.414.586l2 2V2a1 1 0 0 0-1-1H2zm12-1a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12z" />
                                    </svg>
                                    Comments {item.comments}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Home