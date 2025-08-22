import React, { useState } from 'react';
import { Stethoscope, UploadCloud, Loader2, Image as ImageIcon, CheckCircle } from 'lucide-react';
import { analyzeUnliDev } from '../api/analysisApi';

const DiseaseAnalysisForm = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Silakan pilih file gambar terlebih dahulu.");
      return;
    }
    setIsLoading(true);
    setResult(null);

    try {
      const apiResult = await analyzeUnliDev(file);
      setResult(apiResult);
      //eslint-disable-next-line
    } catch (error) {
      setResult({ error: "Gagal menganalisis foto." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full overflow-y-auto bg-slate-100 dark:bg-slate-900">
      <div className="max-w-4xl p-4 mx-auto sm:p-6 lg:p-8">
        <div className="p-6 bg-white border shadow-sm sm:p-8 dark:bg-slate-800 rounded-2xl border-slate-200 dark:border-slate-700">
          <div className="flex items-center mb-6">
            <div className="p-3 mr-4 bg-teal-100 rounded-full dark:bg-teal-900/40">
              <Stethoscope className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold sm:text-2xl text-slate-900 dark:text-slate-100">Analisis Penyakit Tanaman</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">Unggah foto untuk deteksi dini penyakit.</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">Foto Tanaman</label>
              <div className="flex flex-col items-center justify-center w-full p-6 mt-1 border-2 border-dashed rounded-lg bg-slate-50 dark:bg-slate-700/50 border-slate-300 dark:border-slate-600">
                {!preview ? (
                  <div className="text-center">
                    <UploadCloud className="w-12 h-12 mx-auto text-slate-400" />
                    <label htmlFor="file-upload" className="relative mt-4 text-sm font-semibold text-indigo-600 cursor-pointer dark:text-indigo-400 hover:text-indigo-500">
                      <span>Pilih file untuk diunggah</span>
                      <input id="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/*" />
                    </label>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">atau seret dan lepas</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <img src={preview} alt="Preview" className="mx-auto rounded-lg shadow-md max-h-48" />
                    <div className="flex items-center justify-center mt-4 text-sm text-green-600 dark:text-green-400">
                      <CheckCircle size={16} className="mr-2" />
                      <span className="font-medium">{file.name}</span>
                    </div>
                     <label htmlFor="file-upload" className="relative mt-2 text-sm font-semibold text-indigo-600 cursor-pointer dark:text-indigo-400 hover:text-indigo-500">
                      <span>Ganti file</span>
                      <input id="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/*" />
                    </label>
                  </div>
                )}
              </div>
            </div>
            <button type="submit" disabled={isLoading || !file} className="w-full flex justify-center py-3 px-4 rounded-lg font-semibold text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-60 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02]">
              {isLoading ? <Loader2 className="animate-spin" /> : 'Analisis Foto'}
            </button>
          </form>
        </div>
        
        {result && (
          <div className="p-6 mt-8 bg-white border shadow-sm sm:p-8 dark:bg-slate-800 rounded-2xl border-slate-200 dark:border-slate-700 animate-fade-in-up">
            <h3 className="mb-6 text-xl font-bold sm:text-2xl text-slate-900 dark:text-slate-100">Hasil Analisis</h3>
            {result.error ? <p className="text-center text-red-500">{result.error}</p> : (
              <div className="space-y-4">
                <div className="font-medium text-slate-800 dark:text-slate-200">Penyakit Terdeteksi: <span className="text-lg font-bold text-rose-500">{result.penyakit}</span></div>
                <div className="font-medium text-slate-800 dark:text-slate-200">Tingkat Keyakinan: <span className="font-semibold">{result.keyakinan}</span></div>
                <div>
                  <h4 className="mt-4 font-semibold text-slate-800 dark:text-slate-200">Rekomendasi Penanganan:</h4>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{result.saran}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DiseaseAnalysisForm;