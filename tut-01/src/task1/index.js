import ReactDOM from "react-dom";
import Header from "./Header";
import MainContent from "./MainContent";
import Footer from "./Footer";
import "./index.css";

function App() {
    return (
        <div>
            <Header />
            <MainContent />
            <Footer />
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById("root"));
