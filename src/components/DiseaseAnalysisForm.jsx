import React, { useState } from 'react';
import { Stethoscope, UploadCloud, Loader2, Image as ImageIcon, CheckCircle } from 'lucide-react';
import { analyzeUnliDev } from '../api/analysisApi';
import ReactMarkdown from 'react-markdown'

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
      console.log(apiResult)
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
      <div className="w-full max-w-5xl p-3 mx-auto sm:p-4 lg:p-6 xl:p-8">
        {/* Form Card */}
        <div className="p-4 bg-white border shadow-sm sm:p-6 lg:p-8 dark:bg-slate-800 rounded-xl sm:rounded-2xl border-slate-200 dark:border-slate-700">
          {/* Header */}
          <div className="flex flex-col mb-6 sm:flex-row sm:items-center">
            <div className="flex items-center mb-3 sm:mb-0 sm:mr-4">
              <div className="p-2.5 sm:p-3 mr-3 sm:mr-4 bg-teal-100 rounded-full dark:bg-teal-900/40">
                <Stethoscope className="w-5 h-5 text-teal-600 sm:w-6 sm:h-6 dark:text-teal-400" />
              </div>
              <div>
                <h2 className="text-lg font-bold sm:text-xl lg:text-2xl text-slate-900 dark:text-slate-100">
                  Analisis Penyakit Tanaman
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  Unggah foto untuk deteksi dini penyakit
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* File Upload Area */}
            <div>
              <label className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                Foto Tanaman
              </label>
              <div className="flex flex-col items-center justify-center w-full p-4 sm:p-6 mt-1 border-2 border-dashed rounded-lg bg-slate-50 dark:bg-slate-700/50 border-slate-300 dark:border-slate-600 min-h-[200px] sm:min-h-[250px]">
                {!preview ? (
                  <div className="text-center">
                    <UploadCloud className="w-10 h-10 mx-auto mb-3 sm:w-12 sm:h-12 text-slate-400 sm:mb-4" />
                    <label 
                      htmlFor="file-upload" 
                      className="relative text-sm font-semibold text-indigo-600 transition-colors cursor-pointer sm:text-base dark:text-indigo-400 hover:text-indigo-500"
                    >
                      <span>Pilih file untuk diunggah</span>
                      <input 
                        id="file-upload" 
                        type="file" 
                        className="sr-only" 
                        onChange={handleFileChange} 
                        accept="image/*" 
                      />
                    </label>
                    <p className="mt-1 text-xs sm:mt-2 sm:text-sm text-slate-500 dark:text-slate-400">
                      atau seret dan lepas
                    </p>
                    <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                      PNG, JPG, JPEG hingga 10MB
                    </p>
                  </div>
                ) : (
                  <div className="w-full text-center">
                    <div className="relative inline-block">
                      <img 
                        src={preview} 
                        alt="Preview" 
                        className="object-contain max-w-full mx-auto rounded-lg shadow-md max-h-32 sm:max-h-48" 
                      />
                    </div>
                    <div className="flex items-center justify-center mt-3 text-sm text-green-600 sm:mt-4 dark:text-green-400">
                      <CheckCircle size={16} className="flex-shrink-0 mr-2" />
                      <span className="font-medium truncate max-w-[200px] sm:max-w-none">
                        {file.name}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={isLoading || !file} 
              className="w-full flex justify-center items-center py-2.5 sm:py-3 px-4 text-sm sm:text-base rounded-lg font-semibold text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-60 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                'Analisis Foto'
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
                {/* Disease Info */}
                <div className="grid grid-cols-1 gap-4">
                  <div className="w-full p-4 rounded-lg bg-slate-50 dark:bg-slate-700/50">
                    <p className="text-lg text-white break-words sm:text-xl">
                      <ReactMarkdown>{result.result}</ReactMarkdown>
                    </p>
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

export default DiseaseAnalysisForm;