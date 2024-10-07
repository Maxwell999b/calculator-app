import Calculator from "../components/Calculator";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <Navbar />
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <Calculator />
      </main>
      <Footer />
    </div>
  );
}
