# Undangan Pernikahan (Web Statis)

Undangan pernikahan satu halaman yang dibuat dengan **HTML + CSS + JavaScript murni** —
tanpa framework, tanpa backend. Cepat, ringan, dan gratis untuk di-hosting.

## Fitur

- Halaman cover/pembuka dengan tombol "Buka Undangan"
- Nama mempelai & info orang tua
- Hitung mundur menuju hari H
- Rangkaian acara (akad & resepsi)
- Galeri foto
- Musik latar (auto play setelah undangan dibuka + tombol play/pause)
- Lokasi via Google Maps (embed + tombol buka di Maps)
- Ucapan & RSVP dari tamu, disimpan di **localStorage** (browser tamu)
- Nama tamu otomatis dari URL: `index.html?to=Nama+Tamu`

## Struktur Folder

```
webinvitation-cursor/
├── index.html          # struktur halaman
├── css/
│   └── style.css       # tampilan/desain
├── js/
│   └── script.js       # logika (countdown, galeri, musik, ucapan)
├── assets/
│   ├── img/            # foto mempelai & galeri (groom.jpg, bride.jpg, ...)
│   └── music/          # song.mp3 (musik latar)
└── README.md
```

## Cara Menjalankan

Cukup buka `index.html` di browser. Atau jalankan server lokal sederhana:

```bash
# Python 3
python -m http.server 8000
# lalu buka http://localhost:8000
```

## Cara Kustomisasi

| Yang diubah | Lokasi |
|---|---|
| Nama mempelai, tanggal, info orang tua, alamat | `index.html` |
| Tanggal hitung mundur | `WEDDING_DATE` di `js/script.js` |
| Daftar foto galeri | `GALLERY_PHOTOS` di `js/script.js` |
| Lokasi peta | ganti `src` & `href` pada bagian `#location` di `index.html` |
| Foto mempelai | taruh `groom.jpg` & `bride.jpg` di `assets/img/` |
| Musik latar | taruh `song.mp3` di `assets/music/` |
| Warna tema | variabel `--gold`, `--cream`, dll di `css/style.css` |

## Catatan tentang Ucapan (localStorage)

Ucapan tamu saat ini disimpan di **localStorage**, artinya datanya hanya tersimpan
di browser/perangkat tamu tersebut (cocok untuk demo/belajar). Jika ingin ucapan
tersimpan online & terlihat oleh semua tamu, langkah berikutnya adalah menghubungkan
ke layanan seperti **Firebase Firestore** atau **Google Sheets**.

## Hosting Gratis

Setelah selesai, upload folder ini ke salah satu:

- **Netlify** (drag & drop folder)
- **Vercel**
- **GitHub Pages**
