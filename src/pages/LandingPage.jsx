import React from 'react';
import { Link } from 'react-router-dom';
import { BrainCircuit, LineChart, Stethoscope, Bot } from 'lucide-react';

const LandingPage = () => {
  const features = [
    {
      icon: <LineChart className="w-8 h-8 text-indigo-500" />,
      title: "Prediksi Cerdas",
      description: "Dapatkan prediksi harga, saran tanam, dan analisis potensi pasar untuk komoditas Anda."
    },
    {
      icon: <Stethoscope className="w-8 h-8 text-teal-500" />,
      title: "Analisis Penyakit",
      description: "Unggah foto tanaman Anda dan biarkan AI mendeteksi penyakit serta memberikan solusi penanganan."
    },
    {
      icon: <Bot className="w-8 h-8 text-sky-500" />,
      title: "Tanya Jawab AI",
      description: "Ajukan pertanyaan apa pun seputar pertanian dan dapatkan jawaban instan dari asisten AI kami."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-slate-200 dark:border-slate-700">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center">
              <BrainCircuit className="w-8 h-8 text-indigo-600" />
              <span className="ml-3 text-xl font-bold">TaniAI</span>
            </Link>
            <div className="flex items-center space-x-2">
                <Link to="/login" className="px-4 py-2 text-sm font-semibold transition-colors rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">
                    Masuk
                </Link>
                <Link to="/register" className="px-4 py-2 text-sm font-semibold text-white transition-colors bg-indigo-600 rounded-lg shadow-sm hover:bg-indigo-700">
                    Daftar
                </Link>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative flex items-center min-h-screen pt-16">
          <div className="w-full px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8 md:py-0">
            <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
              {/* Kolom Teks */}
              <div className="text-center lg:text-left animate-fade-in-right">
                <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl text-slate-900 dark:text-white">
                  Optimalkan Hasil Panen dengan Asisten AI Pertanian
                </h1>
                <p className="max-w-xl mx-auto mt-6 text-lg text-slate-600 dark:text-slate-300 lg:mx-0">
                  Dapatkan prediksi komoditas, analisis penyakit tanaman, dan jawaban instan untuk semua kebutuhan pertanian modern Anda.
                </p>
                <div className="flex flex-col items-center justify-center gap-4 mt-10 sm:flex-row lg:justify-start">
                  <Link to="/register" className="w-full px-8 py-3 text-lg font-semibold text-white transition-all transform bg-indigo-600 rounded-lg shadow-lg sm:w-auto hover:bg-indigo-700 hover:scale-105">
                    Mulai Sekarang
                  </Link>
                  <Link to="/login" className="w-full px-8 py-3 text-lg font-semibold transition-all bg-white rounded-lg shadow-lg sm:w-auto text-slate-700 dark:text-slate-200 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700">
                    Masuk
                  </Link>
                </div>
              </div>
              
              {/* Kolom Gambar */}
              <div className="flex justify-center lg:justify-end animate-fade-in-left">
                <img 
                  src="/images/Tani.avif" 
                  alt="AI untuk Pertanian" 
                  className="rounded-2xl shadow-2xl w-full max-w-md object-cover aspect-[4/3] lg:aspect-square"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white sm:py-24 dark:bg-slate-800/50">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Solusi Cerdas untuk Petani Modern</h2>
              <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">Semua yang Anda butuhkan dalam satu platform.</p>
            </div>
            <div className="grid grid-cols-1 gap-8 mt-16 md:grid-cols-3">
              {features.map((feature, index) => (
                <div key={index} className="flex flex-col items-center p-8 text-center border bg-slate-50 dark:bg-slate-800 rounded-2xl border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-center w-16 h-16 mb-6 bg-white rounded-full shadow-md dark:bg-slate-900">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{feature.title}</h3>
                  <p className="mt-2 text-slate-500 dark:text-slate-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t dark:bg-slate-800/50 border-slate-200 dark:border-slate-700">
        <div className="px-4 py-6 mx-auto text-sm text-center max-w-7xl sm:px-6 lg:px-8 text-slate-500 dark:text-slate-400">
          <p>&copy; {new Date().getFullYear()} TaniAI. All rights reserved.</p>
          <p className="mt-3">
            created by{" "}
            <a 
                href="https://jazaniest.vercel.app" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-500 hover:underline"
            >
                dev jzx
            </a>{" "}
            &{" "}
            <a 
                href="https://portfolio-tau-puce-59.vercel.app" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-500 hover:underline"
            >
                dev rifky
            </a>
         </p>    

        </div>
        <div className="px-4 py-6 mx-auto text-sm text-center max-w-7xl sm:px-6 lg:px-8 text-slate-500 dark:text-slate-400">
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;