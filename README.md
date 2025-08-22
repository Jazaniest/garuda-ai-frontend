# TaniAI

TaniAI adalah sebuah platform web interaktif yang dirancang untuk membantu 'memerdekakan' para petani di Indonesia. Aplikasi ini menyediakan fitur prediksi komoditas, analisis penyakit tanaman berbasis foto, dan sesi tanya jawab langsung dengan AI untuk memberikan dukungan modern bagi sektor pertanian.



---

## ✨ Fitur Utama

-   🔐 **Autentikasi Pengguna**: Sistem registrasi dan login yang aman terhubung ke backend, dengan sesi yang persisten menggunakan autentikasi berbasis *httpOnly cookie*.
-   🌾 **Prediksi Komoditas**: Form interaktif untuk mendapatkan prediksi harga, saran tanam, dan potensi pasar berdasarkan input komoditas dan lokasi dari pengguna.
-   📸 **Analisis Penyakit Tanaman**: Fitur unggah foto untuk mendeteksi hama atau penyakit pada tanaman dan mendapatkan hasil analisis serta saran penanganan dari AI.
-   💬 **Tanya Jawab AI**: Antarmuka chat untuk pertanyaan umum seputar pertanian, di mana setiap pertanyaan diproses oleh backend untuk mendapatkan jawaban.
-   📜 **Manajemen Sesi**: Pengguna dapat membuat dan beralih antar sesi, di mana setiap sesi (Prediksi, Analisis, atau Tanya Jawab) bersifat sementara dan hanya ada selama halaman aktif.
-   📱 **Desain Responsif & Modern**: Tampilan minimalis dan elegan yang dioptimalkan untuk perangkat desktop maupun mobile menggunakan Tailwind CSS.

---

## 🛠️ Teknologi yang Digunakan

-   **Frontend**: React (dengan Vite)
-   **Styling**: Tailwind CSS
-   **Navigasi**: React Router
-   **Permintaan API**: Axios
-   **Ikon**: Lucide React

---

## 🚀 Panduan Memulai

Berikut adalah cara untuk menjalankan proyek ini di lingkungan pengembangan lokal.

### Prasyarat

-   Node.js (v18 atau lebih baru) & NPM
-   Backend yang sesuai berjalan di `http://localhost:3000` atau ganti urlbase di `axiosConfig`

### Instalasi

1.  **Clone repository ini:**
    ```bash
    git clone <URL_REPOSITORY_ANDA>
    cd <NAMA_FOLDER_PROYEK>
    ```

2.  **Install semua dependensi yang dibutuhkan:**
    ```bash
    npm install
    ```

3.  **Jalankan Backend**
    Pastikan server backend Anda sudah berjalan.

4.  **Jalankan server pengembangan frontend:**
    ```bash
    npm run dev
    ```
    Buka alamat yang ditampilkan di terminal (biasanya `http://localhost:5173`) di browser Anda.

---

## 📂 Struktur Folder

Struktur proyek ini memisahkan antara logika API, komponen UI, state global (Context), dan halaman.

```
src/
├── api/                  # Logika komunikasi dengan backend (axios)
├── components/           # Komponen UI yang dapat digunakan kembali
├── contexts/             # React Context untuk state global (AuthContext)
├── hooks/                # Custom hooks (useAuth, useChatLogic)
├── pages/                # Komponen untuk setiap halaman (Login, Register)
└── App.jsx               # Komponen utama dan pengaturan router
```

---

## 📄 Lisensi

Proyek ini dilisensikan di bawah **MIT License**. Lihat file `LICENSE` untuk detail lebih lanjut.
