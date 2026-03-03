import Sidebar from "../components/Sidebar";
import MainContent from "../components/MainContent";
import HelloCanvas from "../components/HelloCanvas/HelloCanvas";

export default function Home() {
  return (
    <div className="min-h-screen bg-bg flex max-lg:flex-col">
      <Sidebar />
      <MainContent />
      <HelloCanvas />
    </div>
  );
}
