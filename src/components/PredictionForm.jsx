import React, { useState } from 'react';
import { LineChart, Loader2 } from 'lucide-react';
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

  return (
    <div className="flex flex-col h-full p-6 overflow-y-auto">
      <div className="p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="flex items-center mb-4">
          <LineChart className="w-8 h-8 mr-3 text-blue-500" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Prediksi Komoditas</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Komoditas</label>
            <input type="text" name="komoditas" onChange={handleChange} required className="block w-full mt-1 border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500" placeholder="Contoh: Cabai Rawit" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Lokasi (Desa, Kecamatan, Kabupaten)</label>
            <div className="grid grid-cols-1 gap-4 mt-1 md:grid-cols-3">
              <input type="text" name="desa" onChange={handleChange} required className="border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500" placeholder="Desa" />
              <input type="text" name="kecamatan" onChange={handleChange} required className="border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500" placeholder="Kecamatan" />
              <input type="text" name="kabupaten" onChange={handleChange} required className="border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500" placeholder="Kabupaten" />
            </div>
          </div>
          <button type="submit" disabled={isLoading} className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300">
            {isLoading ? <Loader2 className="animate-spin" /> : 'Dapatkan Prediksi'}
          </button>
        </form>
      </div>

      {/* Result prompt */}
      {result && (
        <div className="p-6 mt-6 bg-white rounded-lg shadow-md dark:bg-gray-800 animate-fade-in-up">
          <h3 className="mb-4 text-xl font-bold text-gray-800 dark:text-gray-200">Hasil Prediksi</h3>
          {result.error ? (
            <p className="text-red-500">{result.error}</p>
          ) : (
            <div className="space-y-3 text-gray-700 whitespace-pre-wrap dark:text-gray-300">
              {result.result || JSON.stringify(result, null, 2)}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PredictionForm;