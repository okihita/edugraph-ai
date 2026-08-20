import { ConceptNode, ChatMessage } from './types';

export function getInitialWelcomeMessage(node?: ConceptNode): ChatMessage {
  if (!node) {
    return {
      id: 'msg-init',
      sender: 'assistant',
      text: 'Halo! Saya **EduGraph-AI Socratic Tutor**. Saya memetakan pemahamanmu menggunakan Knowledge Graph & Deep Knowledge Tracing.\n\nPilih salah satu simpul konsep pada graf di sebelah kiri atau klik tombol **"Kuis Diagnostik"** untuk mendeteksi akar pemahamanmu!',
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      isSocraticQuestion: false,
      suggestedResponses: [
        'Saya bingung kenapa nilai Gradient Descent saya divergen',
        'Bisa jelaskan Aturan Rantai (Chain Rule) dengan analogi?',
        'Bagaimana cara menghitung turunan parsial terhadap x?'
      ]
    };
  }

  const isDeficit = node.status === 'deficit';
  return {
    id: `msg-${Date.now()}`,
    sender: 'assistant',
    text: isDeficit
      ? `Saya melihat pemahamanmu pada topik **${node.label}** saat ini masih berada di zona defisit (P(L) = ${(node.masteryScore * 100).toFixed(0)}%).\n\nMari kita bedah secara bertahap. Apa yang menurutmu paling membingungkan dari konsep ini?`
      : `Kamu sedang membuka simpul **${node.label}** (Penguasaan: ${(node.masteryScore * 100).toFixed(0)}%).\n\n${node.description}\n\nApakah kamu ingin mencoba menguji pemahaman atau mendiskusikan penerapannya pada Machine Learning?`,
    timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    conceptId: node.id,
    isSocraticQuestion: true,
    suggestedResponses: isDeficit
      ? [
          'Bagaimana membedakan turunan fungsi luar vs fungsi dalam?',
          'Mengapa kita harus mengalikan turunan di setiap lapisan rantai?',
          'Beri saya satu contoh soal sederhana untuk melatih dasar ini.'
        ]
      : [
          'Uji pemahaman saya dengan 1 pertanyaan terapan!',
          'Bagaimana konsep ini dipakai di Backpropagation Neural Network?',
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

  if (lower.includes('divergen') || lower.includes('gradient descent') || lower.includes('lereng')) {
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
  } else if (lower.includes('turunan parsial') || lower.includes('konstan') || lower.includes('parsial')) {
    replyText = `Kunci dari **Turunan Parsial** $\\frac{\\partial f}{\\partial x}$ adalah disiplin mental: **"Bekukan semua variabel selain x sebagai angka tetap/konstanta"** 🧊.\n\nJika $f(x, y) = 3x^2 y + 2y^3$:\n- Pada suku $3x^2 y$, variabel $y$ diperlakukan seperti angka 5 biasa. Jadi $(3y) \\cdot 2x = 6xy$.\n- Pada suku $2y^3$, karena tidak ada $x$ sama sekali, maka turunannya terhadap $x$ menjadi **0**.\n\nCoba tebak: berapakah $\\frac{\\partial f}{\\partial y}$ untuk fungsi yang sama jika sekarang $x$ yang kita bekukan?`;
    suggestedResponses = [
      '∂f/∂y = 3x^2 + 6y^2',
      'Mengapa suku 3x^2 tidak menjadi 0 saat diturunkan terhadap y?',
      'Paham! Terapkan ini ke fungsi loss MSE.'
    ];
  } else if (lower.includes('12x') || lower.includes('3x^2 + 6y^2') || lower.includes('kiri')) {
    replyText = `**Luar biasa! Penalaranmu 100% tepat.** 🎉\n\nKamu berhasil merekonstruksi logika dasarnya tanpa sekadar menghafal rumus. Deep Knowledge Tracing Engine telah mencatat penguasaan ini dan memperbarui probabilitas kesiapan belajarmu!\n\nApakah kamu siap menguji kemampuanmu pada tantangan simulasi di level berikutnya?`;
    suggestedResponses = [
      'Ya, buka Kuis Diagnostik untuk membuktikan penguasaan!',
      'Bagaimana materi ini dihubungkan dengan dekomposisi Nilai Eigen?',
      'Tampilkan analisis kesiapan saya di dashboard Dosen.'
    ];
  } else {
    replyText = `Saya memahami pertanyaanmu. Dalam metodologi Sokrates EduGraph-AI, mari kita uraikan ini ke dalam komponen paling mendasar:\n\nTopik **${currentConcept?.label || 'STEM'}** memiliki prasyarat ${deficitAncestor ? `yang perlu diperkuat di **${deficitAncestor.label}**` : 'yang saling terkait'}.\n\nApa bagian yang menurutmu paling ambigu: definisi dasarnya, aturan penurunannya, atau interpretasi geometrisnya?`;
    suggestedResponses = [
      'Definisi dasarnya',
      'Aturan penurunannya',
      'Interpretasi geometrisnya pada ruang vektor'
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
