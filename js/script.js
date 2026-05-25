const questions = [
    { q: "Apa fungsi utama dari Router?", a: ["Menghubungkan jaringan", "Mencetak dokumen", "Menyimpan foto", "Menampilkan gambar"], correct: 0 },
    { q: "Perangkat yang berfungsi menghubungkan banyak komputer dalam LAN adalah?", a: ["Mouse", "Switch/Hub", "Printer", "Monitor"], correct: 1 },
    { q: "Kabel yang biasa digunakan untuk jaringan LAN adalah?", a: ["UTP", "Listrik", "Telepon", "Antena"], correct: 0 },
    { q: "Urutan kabel straight diawali dengan warna?", a: ["Coklat", "Biru", "Putih Orange", "Hijau"], correct: 2 },
    { q: "IP Address 192.168.1.1 termasuk kelas?", a: ["Kelas A", "Kelas B", "Kelas C", "Kelas D"], correct: 2 }
];

let currentIdx = 0;
let score = 0;

// Fungsi untuk memuat soal ke layar
function loadQuestion() {
    const q = questions[currentIdx];
    
    // Reset tampilan agar soal muncul, layar lain sembunyi
    document.getElementById('quiz-content').style.display = "block";
    document.getElementById('feedback-overlay').style.display = "none";
    document.getElementById('final-score-screen').style.display = "none";
    
    // Update teks nomor soal dan pertanyaan
    document.getElementById('question-number').innerText = `Soal ${currentIdx + 1}/${questions.length}`;
    document.getElementById('question-text').innerText = q.q;
    
    const container = document.getElementById('options-container');
    container.innerHTML = ""; // Bersihkan opsi sebelumnya
    
    // Buat tombol opsi jawaban secara dinamis
    q.a.forEach((opt, i) => {
        const btn = document.createElement('div');
        btn.style.cssText = "background: white; border: 2px solid #e2e8f0; padding: 15px; border-radius: 12px; cursor: pointer; font-weight: 600; color: #1e293b; transition: 0.2s;";
        btn.innerText = String.fromCharCode(65 + i) + ". " + opt;
        
        // Efek hover sederhana
        btn.onmouseover = () => btn.style.borderColor = "#38b6ff";
        btn.onmouseout = () => btn.style.borderColor = "#e2e8f0";
        
        btn.onclick = () => checkAnswer(i);
        container.appendChild(btn);
    });
}

// Fungsi mengecek jawaban benar atau salah
function checkAnswer(idx) {
    const isCorrect = idx === questions[currentIdx].correct;
    document.getElementById('quiz-content').style.display = "none";
    document.getElementById('feedback-overlay').style.display = "block";
    
    const icon = document.getElementById('feedback-icon');
    const text = document.getElementById('feedback-text');
    
    if(isCorrect) {
        icon.innerHTML = "✅";
        text.innerText = "Jawabanmu Benar!";
        text.style.color = "#22c55e";
        score += 20; // Tambah skor (5 soal x 20 = 100)
    } else {
        icon.innerHTML = "❌";
        text.innerText = "Waduh, Masih Salah!";
        text.style.color = "#ef4444";
    }
}

// Fungsi navigasi ke soal berikutnya atau ke skor akhir
function nextQuestion() {
    currentIdx++;
    if(currentIdx < questions.length) {
        loadQuestion();
    } else {
        showFinalScore();
    }
}

// Fungsi menampilkan hasil akhir (🏆)
function showFinalScore() {
    // Sembunyikan elemen kuis dan footer navigasi
    document.getElementById('quiz-content').style.display = "none";
    document.getElementById('feedback-overlay').style.display = "none";
    if(document.getElementById('quiz-footer')) {
        document.getElementById('quiz-footer').style.display = "none";
    }
    
    // Tampilkan layar skor akhir dan isi nilainya
    document.getElementById('final-score-screen').style.display = "block";
    document.getElementById('final-score-value').innerText = score;
    
    // Update judul header menjadi 'Hasil Akhir'
    const headerTitle = document.querySelector('.header-blue h3');
    if(headerTitle) {
        headerTitle.innerHTML = '<i class="fas fa-trophy"></i> Hasil Akhir';
    }
}

// Jalankan kuis pertama kali
loadQuestion();