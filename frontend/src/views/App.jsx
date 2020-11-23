import '../assets/styles/App.css';
import Navbar from '../components/Navbar';
import Table from '../components/Table';
function App() {
    return (
        <div className="App container-fluid ">
            <Navbar></Navbar>
            <div className="d-flex flex-column align-items-center">
                <h3>Agenda de Contatos</h3>
                <Table></Table>
            </div>
        </div>
    );
}

export default App;
