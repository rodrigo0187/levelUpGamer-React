import notFoundImg from "../assets/img/img-notFound/this-is.gif";
function NotFound() {
    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>404 - pagina no encontrada</h1>
            <img src={notFoundImg} alt="quemandose" />
        </div>
    );
}
export default NotFound;
