import "./index.css";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";

function App() {
  return (
    <div className="min-h-screen bg-bg flex max-lg:flex-col">
      <Sidebar />
      <MainContent />
    </div>
  );
}

export default App;
