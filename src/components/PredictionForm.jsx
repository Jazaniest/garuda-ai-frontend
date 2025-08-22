import React, { useState } from 'react';
import { LineChart, Loader2, Leaf, MapPin, DollarSign, ThumbsUp, Store } from 'lucide-react';
import { analyzeLunos } from '../api/analysisApi';

const PredictionForm = () => {
  const [formData, setFormData] = useState({ komoditas: '', desa: '', kecamatan: '', kabupaten: '' });
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setResult(null);
    const prompt = `Berikan analisis dan prediksi untuk komoditas "${formData.komoditas}" yang akan ditanam di lokasi Desa ${formData.desa}, Kecamatan ${formData.kecamatan}, Kabupaten ${formData.kabupaten}. Analisis harus mencakup prediksi harga, saran tanam, dan potensi pasar.`;

    try {
      const apiResult = await analyzeLunos(prompt);
      setResult(apiResult); 
      //eslint-disable-next-line
    } catch (error) {
      setResult({ error: "Gagal mendapatkan prediksi dari server." });
    } finally {
      setIsLoading(false);
    }
  };

  const InputWithIcon = ({ icon, ...props }) => (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400">
        {icon}
      </div>
      <input 
        {...props} 
        className="block w-full py-3 pl-12 pr-4 transition-all border rounded-lg shadow-sm bg-slate-50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>
  );

  return (
    <div className="h-full overflow-y-auto bg-slate-100 dark:bg-slate-900">
      <div className="max-w-4xl p-4 mx-auto sm:p-6 lg:p-8">
        <div className="p-6 bg-white border shadow-sm sm:p-8 dark:bg-slate-800 rounded-2xl border-slate-200 dark:border-slate-700">
          <div className="flex items-center mb-6">
            <div className="p-3 mr-4 bg-indigo-100 rounded-full dark:bg-indigo-900/40">
              <LineChart className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold sm:text-2xl text-slate-900 dark:text-slate-100">Prediksi Komoditas</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">Dapatkan analisis agrikultur berbasis AI.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">Komoditas</label>
              <InputWithIcon icon={<Leaf size={18} />} type="text" name="komoditas" onChange={handleChange} required placeholder="Contoh: Bawang Merah" />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">Lokasi Tanam</label>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <InputWithIcon icon={<MapPin size={18} />} type="text" name="desa" onChange={handleChange} required placeholder="Desa" />
                <InputWithIcon icon={<MapPin size={18} />} type="text" name="kecamatan" onChange={handleChange} required placeholder="Kecamatan" />
                <InputWithIcon icon={<MapPin size={18} />} type="text" name="kabupaten" onChange={handleChange} required placeholder="Kabupaten" />
              </div>
            </div>

            <button type="submit" disabled={isLoading} className="w-full flex justify-center py-3 px-4 rounded-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02]">
              {isLoading ? <Loader2 className="animate-spin" /> : 'Dapatkan Prediksi'}
            </button>
          </form>
        </div>

        {result && (
          <div className="p-6 mt-8 bg-white border shadow-sm sm:p-8 dark:bg-slate-800 rounded-2xl border-slate-200 dark:border-slate-700 animate-fade-in-up">
            <h3 className="mb-6 text-xl font-bold sm:text-2xl text-slate-900 dark:text-slate-100">Hasil Analisis</h3>
            {result.error ? <p className="text-center text-red-500">{result.error}</p> : (
              <div className="space-y-6">
                <div className="flex items-start p-4 rounded-lg bg-slate-50 dark:bg-slate-700/50">
                  <DollarSign className="flex-shrink-0 w-6 h-6 mt-1 mr-4 text-green-500" />
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-slate-200">Prediksi Harga</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{result.harga}</p>
                  </div>
                </div>
                <div className="flex items-start p-4 rounded-lg bg-slate-50 dark:bg-slate-700/50">
                  <ThumbsUp className="flex-shrink-0 w-6 h-6 mt-1 mr-4 text-yellow-500" />
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-slate-200">Saran Tanam</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{result.saran}</p>
                  </div>
                </div>
                <div className="flex items-start p-4 rounded-lg bg-slate-50 dark:bg-slate-700/50">
                  <Store className="flex-shrink-0 w-6 h-6 mt-1 mr-4 text-sky-500" />
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-slate-200">Potensi Pasar</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{result.pasar}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PredictionForm;