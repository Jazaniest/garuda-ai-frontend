import React, { useState } from 'react';
import { Stethoscope, UploadCloud, Loader2 } from 'lucide-react';
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
    <div className="flex flex-col h-full p-6 overflow-y-auto">
      <div className="p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="flex items-center mb-4">
          <Stethoscope className="w-8 h-8 mr-3 text-green-500" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Analisis Penyakit Tanaman</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Unggah Foto Tanaman</label>
            <div className="flex justify-center px-6 pt-5 pb-6 mt-1 border-2 border-gray-300 border-dashed rounded-md dark:border-gray-600">
              <div className="space-y-1 text-center">
                {preview ? (
                  <img src={preview} alt="Preview" className="w-auto h-40 mx-auto rounded-md" />
                ) : (
                  <UploadCloud className="w-12 h-12 mx-auto text-gray-400" />
                )}
                <div className="flex text-sm text-gray-600 dark:text-gray-400">
                  <label htmlFor="file-upload" className="relative font-medium text-blue-600 bg-white rounded-md cursor-pointer dark:bg-gray-800 hover:text-blue-500 focus-within:outline-none">
                    <span>Pilih file</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/*" />
                  </label>
                  <p className="pl-1">atau seret dan lepas</p>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-500">{file ? file.name : 'PNG, JPG, GIF hingga 10MB'}</p>
              </div>
            </div>
          </div>
          <button type="submit" disabled={isLoading || !file} className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-green-300">
            {isLoading ? <Loader2 className="animate-spin" /> : 'Analisis Foto'}
          </button>
        </form>
      </div>

      {/* Result prompt */}
        {result && (
            <div className="p-6 mt-6 bg-white rounded-lg shadow-md dark:bg-gray-800 animate-fade-in-up">
            <h3 className="mb-4 text-xl font-bold text-gray-800 dark:text-gray-200">Hasil Analisis</h3>
            {result.error ? (
                <p className="text-red-500">{result.error}</p>
            ) : (
                <div className="space-y-3 text-gray-700 whitespace-pre-wrap dark:text-gray-300">
                {result.analysis || JSON.stringify(result, null, 2)}
                </div>
            )}
            </div>
        )}
    </div>
  );
};

export default DiseaseAnalysisForm;