import React, { useState } from 'react';
import { LineChart, Loader2, Leaf, MapPin, DollarSign, ThumbsUp, Store } from 'lucide-react';
import { analyzeLunos } from '../api/analysisApi';
import ReactMarkdown from "react-markdown";

const InputWithIcon = ({ icon, value, ...props }) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none sm:pl-4 text-slate-400">
      {icon}
    </div>
    <input 
      {...props}
      value={value}
      className="block w-full py-2.5 sm:py-3 pl-10 sm:pl-12 pr-3 sm:pr-4 text-sm sm:text-base transition-all border rounded-lg shadow-sm bg-slate-50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
    />
  </div>
);

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
    <div className="h-full overflow-y-auto bg-slate-100 dark:bg-slate-900">
      <div className="w-full max-w-5xl p-3 mx-auto sm:p-4 lg:p-6 xl:p-8">
        {/* Form Card */}
        <div className="p-4 bg-white border shadow-sm sm:p-6 lg:p-8 dark:bg-slate-800 rounded-xl sm:rounded-2xl border-slate-200 dark:border-slate-700">
          {/* Header */}
          <div className="flex flex-col mb-6 sm:flex-row sm:items-center">
            <div className="flex items-center mb-3 sm:mb-0 sm:mr-4">
              <div className="p-2.5 sm:p-3 mr-3 sm:mr-4 bg-indigo-100 rounded-full dark:bg-indigo-900/40">
                <LineChart className="w-5 h-5 text-indigo-600 sm:w-6 sm:h-6 dark:text-indigo-400" />
              </div>
              <div>
                <h2 className="text-lg font-bold sm:text-xl lg:text-2xl text-slate-900 dark:text-slate-100">
                  Prediksi Komoditas
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  Dapatkan analisis agrikultur berbasis AI
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Komoditas Input */}
            <div>
              <label className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                Komoditas
              </label>
              <InputWithIcon 
                icon={<Leaf size={16} className="sm:w-[18px] sm:h-[18px]" />} 
                type="text" 
                name="komoditas" 
                value={formData.komoditas}
                onChange={handleChange} 
                required 
                placeholder="Contoh: Bawang Merah" 
              />
            </div>

            {/* Location Inputs */}
            <div>
              <label className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                Lokasi Tanam
              </label>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 sm:gap-4">
                <InputWithIcon 
                  icon={<MapPin size={16} className="sm:w-[18px] sm:h-[18px]" />} 
                  type="text" 
                  name="desa" 
                  value={formData.desa}
                  onChange={handleChange} 
                  required 
                  placeholder="Desa" 
                />
                <InputWithIcon 
                  icon={<MapPin size={16} className="sm:w-[18px] sm:h-[18px]" />} 
                  type="text" 
                  name="kecamatan" 
                  value={formData.kecamatan}
                  onChange={handleChange} 
                  required 
                  placeholder="Kecamatan" 
                />
                <div className="sm:col-span-2 lg:col-span-1">
                  <InputWithIcon 
                    icon={<MapPin size={16} className="sm:w-[18px] sm:h-[18px]" />} 
                    type="text" 
                    name="kabupaten" 
                    value={formData.kabupaten}
                    onChange={handleChange} 
                    required 
                    placeholder="Kabupaten" 
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={isLoading} 
              className="w-full flex justify-center items-center py-2.5 sm:py-3 px-4 text-sm sm:text-base rounded-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                'Dapatkan Prediksi'
              )}
            </button>
          </form>
        </div>

        {/* Results Card */}
        {result && (
          <div className="p-4 mt-4 bg-white border shadow-sm sm:mt-6 lg:mt-8 sm:p-6 lg:p-8 dark:bg-slate-800 rounded-xl sm:rounded-2xl border-slate-200 dark:border-slate-700 animate-fade-in-up">
            <h3 className="mb-4 text-lg font-bold sm:mb-6 sm:text-xl lg:text-2xl text-slate-900 dark:text-slate-100">
              Hasil Analisis
            </h3>
            
            {result.error ? (
              <div className="p-4 text-center rounded-lg bg-red-50 dark:bg-red-900/20">
                <p className="text-sm text-red-600 sm:text-base dark:text-red-400">
                  {result.error}
                </p>
              </div>
            ) : (
              <div className="space-y-4 sm:space-y-6">
                <div className="p-4 rounded-lg sm:p-6 bg-slate-50 dark:bg-slate-700/50">
                  <div className="prose-sm prose sm:prose max-w-none dark:prose-invert">
                    <ReactMarkdown 
                      className="text-sm leading-relaxed sm:text-base"
                      components={{
                        //eslint-disable-next-line
                        h1: ({node, ...props}) => <h1 className="mb-3 text-lg font-bold sm:text-xl" {...props} />,
                        //eslint-disable-next-line
                        h2: ({node, ...props}) => <h2 className="mb-2 text-base font-semibold sm:text-lg" {...props} />,
                        //eslint-disable-next-line
                        h3: ({node, ...props}) => <h3 className="mb-2 text-sm font-medium sm:text-base" {...props} />,
                        //eslint-disable-next-line
                        p: ({node, ...props}) => <p className="mb-3 text-sm sm:text-base" {...props} />,
                        //eslint-disable-next-line
                        ul: ({node, ...props}) => <ul className="mb-3 ml-4 space-y-1 list-disc" {...props} />,
                        //eslint-disable-next-line
                        ol: ({node, ...props}) => <ol className="mb-3 ml-4 space-y-1 list-decimal" {...props} />,
                        //eslint-disable-next-line
                        li: ({node, ...props}) => <li className="text-sm sm:text-base" {...props} />,
                      }}
                    >
                      {result.result}
                    </ReactMarkdown>
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