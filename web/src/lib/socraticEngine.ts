import { ConceptNode, ChatMessage } from './types';

export function getInitialWelcomeMessage(node?: ConceptNode): ChatMessage {
  if (!node) {
    return {
      id: 'msg-init',
      sender: 'assistant',
      text: 'Halo! Saya **EduGraph-AI Socratic Tutor** (Cross-Disciplinary: STEM & SOSHUM).\n\nSaya memetakan alur prasyarat pemikiranmu menggunakan **Knowledge Graph & Deep Knowledge Tracing**—baik untuk penurunan rumus kuantitatif maupun analisis doktrin yuridis dan teori sosial!\n\nPilih salah satu simpul konsep pada graf atau klik **"Uji Kuis Diagnostik"** untuk mendeteksi akar pemahamanmu!',
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      isSocraticQuestion: false,
      suggestedResponses: [
        'Saya bingung kenapa nilai Gradient Descent saya divergen',
        'Apa beda Dolus Eventualis dengan Culpa Lata dalam kasus pidana?',
        'Bisa jelaskan Aturan Rantai (Chain Rule) dengan analogi?'
      ]
    };
  }

  const isDeficit = node.status === 'deficit';
  return {
    id: `msg-${Date.now()}`,
    sender: 'assistant',
    text: isDeficit
      ? `Saya melihat pemahamanmu pada topik **${node.label}** saat ini berada di zona defisit (P(L) = ${(node.masteryScore * 100).toFixed(0)}%).\n\nMari kita bedah secara bertahap menggunakan metode Sokrates. Apa yang menurutmu paling membingungkan dari konsep ini?`
      : `Kamu sedang membuka simpul **${node.label}** (Penguasaan: ${(node.masteryScore * 100).toFixed(0)}%).\n\n${node.description}\n\nApakah kamu ingin mencoba menguji pemahaman atau mendiskusikan penerapannya pada studi kasus nyata?`,
    timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    conceptId: node.id,
    isSocraticQuestion: true,
    suggestedResponses: isDeficit
      ? [
          'Bagaimana membedakan unsur subjektif vs unsur objektif perbuatan?',
          'Mengapa kita harus mengalikan turunan di setiap lapisan rantai?',
          'Beri saya satu studi kasus nyata untuk melatih dasar ini.'
        ]
      : [
          'Uji pemahaman saya dengan 1 pertanyaan terapan!',
          'Bagaimana doktrin/prasyarat ini dihubungkan dengan analisis kasus akhir?',
          'Lanjut ke topik prasyarat berikutnya.'
        ]
  };
}

export function generateSocraticReply(
  userText: string,
  currentConcept?: ConceptNode,
  deficitAncestor?: ConceptNode
): ChatMessage {
  const lower = userText.toLowerCase();
  let replyText = '';
  let suggestedResponses: string[] = [];
  let isSocratic = true;

  // SOSHUM: Hukum & Doktrin Yuridis
  if (lower.includes('dolus') || lower.includes('kesengajaan') || lower.includes('culpa') || lower.includes('sikap batin')) {
    replyText = `Mari kita gunakan metode dialektika Sokrates untuk membedah **Sikap Batin Pelaku (Mens Rea)** ⚖️:\n\nBayangkan seseorang melempar bom molotov ke kantor kosong malam hari demi merusak inventaris, tetapi ia melihat ada satpam tidur di pos samping pintu.\n\n1. Apakah pelaku *berkehendak (willen)* membunuh satpam?\n2. Mengapa ketika pelaku tetap melempar molotov dan satpam tewas, hukum menggolongkannya sebagai **Dolus Eventualis** dan bukan sekadar kealpaan (Culpa)?`;
    suggestedResponses = [
      'Karena pelaku menyadari kemungkinan fatal tetapi tetap mengambil risiko tersebut',
      'Apa yang membedakan Dolus Eventualis dengan Culpa Lata (kealpaan berat)?',
      'Bagaimana konsekuensi ancaman pidananya pada dakwaan primer?'
    ];
  } else if (lower.includes('pembelaan') || lower.includes('noodweer') || lower.includes('pemaaf') || lower.includes('pembenar')) {
    replyText = `Pertanyaan yuridis yang sangat fundamental!\n\nKunci pembedanya terletak pada **"Apa yang dihapus oleh hukum?"**:\n- **Alasan Pembenar (Noodweer Pasal 49 ayat 1):** Menghapus sifat melawan hukum perbuatan (perbuatan membela diri menjadi *halal/sah*).\n- **Alasan Pemaaf (Noodweer Excess Pasal 49 ayat 2):** Perbuatannya tetap *melawan hukum*, tetapi si pembuat dimaafkan karena **goncangan jiwa yang hebat** akibat serangan seketika.\n\nJika seorang korban jambret mengejar pelaku yang sudah kabur 500 meter lalu menabraknya hingga tewas, apakah ini masih masuk Noodweer Excess? Coba analisis unsur *serangan seketika (ogenblikkelijke aanranding)*-nya!`;
    suggestedResponses = [
      'Tidak masuk, karena serangan sudah berhenti dan tidak seketika lagi',
      'Mengapa perbuatan tersebut bergeser menjadi tindakan main hakim sendiri?',
      'Bagaimana cara jaksa menyusun konstruksi dakwaan untuk kasus tersebut?'
    ];
  } else if (lower.includes('tidak masuk') || lower.includes('serangan sudah berhenti') || lower.includes('menyadari kemungkinan fatal')) {
    replyText = `**Analisis yuridis Anda 100% presisi dan tajam!** ⚖️🎉\n\nAnda berhasil menerapkan asas hukum secara deduktif tanpa terjebak opini emosional. Deep Knowledge Tracing Engine telah mencatat penguasaan doktrin ini dan menaikkan probabilitas kesiapan analisis kasus kompleks Anda!\n\nApakah Anda siap menguji kasus pembelaan darurat pada level berikutnya?`;
    suggestedResponses = [
      'Ya, buka Kuis Diagnostik kasus tindak pidana!',
      'Bagaimana menghubungkan doktrin ini dengan Ajaran Penyertaan (Medepleger)?',
      'Tampilkan status pemahaman saya di dasbor Dosen.'
    ];
  }
  // STEM: Kalkulus & Machine Learning
  else if (lower.includes('divergen') || lower.includes('gradient descent') || lower.includes('lereng')) {
    replyText = `Pertanyaan bagus! Bayangkan kamu sedang menuruni lereng bukit curam dalam kabut tebal:\n\n1. Jika turunan $\\frac{\\partial L}{\\partial w} > 0$ (lereng menanjak ke kanan), ke arah mana kamu harus melangkah agar ketinggianmu berkurang?\n2. Mengapa jika langkah kakimu (**learning rate** $\\eta$) terlalu besar, kamu justru bisa terlempar melompati lembah ke puncak seberang?`;
    suggestedResponses = [
      'Kita harus melangkah ke kiri (mengurangi nilai w)',
      'Karena langkah terlalu besar membuat nilai w melompati titik minimum',
      'Bagaimana cara memilih nilai learning rate yang pas?'
    ];
  } else if (lower.includes('aturan rantai') || lower.includes('chain rule') || lower.includes('fungsi luar')) {
    replyText = `Mari gunakan analogi **Kotak di dalam Kotak (Matryoshka Doll)** 🪆:\n\nJika fungsi kita adalah $f(x) = (2x^2 + 1)^3$:\n- **Kotak Luar:** $[\\dots]^3$ $\\rightarrow$ turunannya adalah $3[\\dots]^2$\n- **Kotak Dalam:** $(2x^2 + 1)$ $\\rightarrow$ turunannya adalah $4x$\n\nSekarang, coba kamu kalikan turunan Kotak Luar dengan turunan Kotak Dalam. Berapa hasil akhirnya?`;
    suggestedResponses = [
      'Hasilnya adalah 12x(2x^2 + 1)^2',
      'Mengapa turunan angka 1 di dalam kurung menjadi 0?',
      'Bisa berikan satu soal latihan lagi?'
    ];
  } else if (lower.includes('12x') || lower.includes('kiri')) {
    replyText = `**Luar biasa! Penalaran logikamu 100% tepat.** 🎉\n\nKamu berhasil merekonstruksi logika dasarnya tanpa sekadar menghafal rumus. Deep Knowledge Tracing Engine telah mencatat penguasaan ini dan memperbarui probabilitas kesiapan belajarmu!\n\nApakah kamu siap menguji kemampuanmu pada tantangan simulasi di level berikutnya?`;
    suggestedResponses = [
      'Ya, buka Kuis Diagnostik untuk membuktikan penguasaan!',
      'Bagaimana materi ini dihubungkan dengan dekomposisi Nilai Eigen?',
      'Tampilkan analisis kesiapan saya di dashboard Dosen.'
    ];
  } else {
    replyText = `Saya memahami pertanyaanmu. Dalam metodologi Sokrates EduGraph-AI, mari kita uraikan ini ke dalam komponen paling mendasar:\n\nTopik **${currentConcept?.label || 'Materi Kuliah'}** memiliki prasyarat ${deficitAncestor ? `yang perlu diperkuat di **${deficitAncestor.label}**` : 'yang saling berjenjang'}.\n\nApa bagian yang menurutmu paling ambigu: definisi normatif/teoretisnya, penerapannya pada kasus/komputasi, atau interpretasi logikanya?`;
    suggestedResponses = [
      'Definisi normatif / teoretis dasarnya',
      'Penerapan pada analisis kasus / perhitungan',
      'Studi komparasi dengan doktrin / metode alternatif'
    ];
  }

  return {
    id: `msg-${Date.now()}`,
    sender: 'assistant',
    text: replyText,
    timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    conceptId: currentConcept?.id,
    isSocraticQuestion: isSocratic,
    suggestedResponses
  };
}
