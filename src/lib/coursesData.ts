import { Course, ClassAnalytics } from './types';

export const INITIAL_COURSES: Course[] = [
  {
    id: 'course-ml-math',
    code: 'PSD-204',
    title: 'Matematika untuk Sains Data & Machine Learning',
    faculty: 'Fakultas Teknologi Maju dan Multidisiplin (FTMM)',
    university: 'Universitas Airlangga',
    description: 'Fondasi komputasi aljabar linier, kalkulus multivariat, dan optimasi gradien untuk algoritma pembelajaran mesin.',
    nodes: [
      {
        id: 'scalars_vectors',
        label: 'Skalar & Vektor',
        category: 'Aljabar Linier',
        description: 'Operasi vektor dasar, norm L1/L2, dot product, dan proyeksi ortogonal pada ruang Euclidean.',
        difficulty: 1,
        bloomLevel: 'Remembering',
        prerequisites: [],
        masteryScore: 0.95,
        status: 'mastered',
        x: 80,
        y: 120,
        syllabusReference: 'Silabus Bab 1: Vektor Ruang dan Geometri Komputasi',
        summaryNote: 'Mahasiswa telah menguasai dot product dan visualisasi vektor ortogonal.',
        quiz: {
          id: 'quiz-vec-1',
          question: 'Berapakah hasil perkalian dot product antara vektor u = [2, 3] dan v = [4, -1]?',
          latex: '\\vec{u} \\cdot \\vec{v} = (2 \\times 4) + (3 \\times -1)',
          bloomLevel: 'Applying',
          options: [
            { id: 'opt-1', text: '5', isCorrect: true, explanation: 'Tepat: 8 + (-3) = 5.' },
            { id: 'opt-2', text: '11', isCorrect: false, explanation: 'Salah tanda pada perkalian elemen kedua.' },
            { id: 'opt-3', text: '8', isCorrect: false, explanation: 'Lupa menjumlahkan komponen sumbu-y.' }
          ]
        }
      },
      {
        id: 'matrix_ops',
        label: 'Operasi Matriks',
        category: 'Aljabar Linier',
        description: 'Perkalian matriks dimensi m×k dengan k×n, transposisi, dan sifat non-komutatif perkalian.',
        difficulty: 2,
        bloomLevel: 'Understanding',
        prerequisites: ['scalars_vectors'],
        masteryScore: 0.88,
        status: 'mastered',
        x: 240,
        y: 120,
        syllabusReference: 'Silabus Bab 2: Matriks Transformasi Linear',
        summaryNote: 'Menguasai syarat kesesuaian dimensi kolom-baris pada perkalian matriks.',
        quiz: {
          id: 'quiz-mat-1',
          question: 'Jika matriks A berukuran 3x2 dan matriks B berukuran 2x4, berapa ukuran matriks hasil AB?',
          latex: 'A_{3 \\times 2} \\times B_{2 \\times 4} = C_{m \\times n}',
          bloomLevel: 'Understanding',
          options: [
            { id: 'opt-1', text: '3 × 4', isCorrect: true, explanation: 'Benar! Dimensi dalam (2) cocok, dimensi luar (3x4) menjadi ukuran hasil.' },
            { id: 'opt-2', text: '2 × 2', isCorrect: false, explanation: 'Ukuran matriks hasil ditentukan oleh baris pertama dan kolom kedua.' },
            { id: 'opt-3', text: 'Tidak dapat dikalikan', isCorrect: false, explanation: 'Matriks dapat dikalikan karena jumlah kolom A sama dengan jumlah baris B.' }
          ]
        }
      },
      {
        id: 'single_derivative',
        label: 'Turunan Dasar',
        category: 'Kalkulus',
        description: 'Definisi limit diferensiasi, aturan pangkat (power rule), dan gradien garis singgung.',
        difficulty: 2,
        bloomLevel: 'Remembering',
        prerequisites: [],
        masteryScore: 0.92,
        status: 'mastered',
        x: 80,
        y: 320,
        syllabusReference: 'Silabus Bab 4: Kalkulus Diferensial Dasar',
        summaryNote: 'Kuasai aturan f\'(x) = n*x^(n-1).',
        quiz: {
          id: 'quiz-der-1',
          question: 'Berapakah turunan pertama dari fungsi f(x) = 3x^4 - 5x + 7?',
          latex: 'f\'(x) = \\frac{d}{dx}(3x^4 - 5x + 7)',
          bloomLevel: 'Applying',
          options: [
            { id: 'opt-1', text: '12x^3 - 5', isCorrect: true, explanation: 'Benar: 3*(4)x^3 - 5 + 0 = 12x^3 - 5.' },
            { id: 'opt-2', text: '12x^4 - 5x', isCorrect: false, explanation: 'Pangkat harus dikurangi satu saat diturunkan.' },
            { id: 'opt-3', text: '7x^3 - 5', isCorrect: false, explanation: 'Koefisien dikalikan dengan pangkat lama.' }
          ]
        }
      },
      {
        id: 'chain_rule',
        label: 'Aturan Rantai (Chain Rule)',
        category: 'Kalkulus',
        description: 'Diferensiasi fungsi komposit f(g(x)), pondasi utama komputasi gradien berlapis pada neural network.',
        difficulty: 3,
        bloomLevel: 'Applying',
        prerequisites: ['single_derivative'],
        masteryScore: 0.42,
        status: 'deficit',
        x: 240,
        y: 320,
        syllabusReference: 'Silabus Bab 5: Aturan Rantai & Diferensiasi Komposit',
        summaryNote: 'Miskonsepsi sering terjadi: lupa mengalikan dengan turunan fungsi dalam g\'(x).',
        quiz: {
          id: 'quiz-chain-1',
          question: 'Tentukan turunan dari f(x) = (2x^2 + 1)^3 terhadap x.',
          latex: '\\frac{d}{dx}[g(x)]^n = n[g(x)]^{n-1} \\cdot g\'(x)',
          bloomLevel: 'Applying',
          options: [
            { id: 'opt-1', text: '12x (2x^2 + 1)^2', isCorrect: true, explanation: 'Luar: 3(2x^2+1)^2 dikali Dalam: 4x -> 12x(2x^2+1)^2.' },
            { id: 'opt-2', text: '3 (2x^2 + 1)^2', isCorrect: false, explanation: 'Lupa mengalikan dengan turunan fungsi dalam g\'(x) = 4x!', indicatesDeficitIn: 'chain_rule' },
            { id: 'opt-3', text: '6x (2x^2 + 1)^3', isCorrect: false, explanation: 'Pangkat luar belum dikurangi 1.', indicatesDeficitIn: 'single_derivative' }
          ]
        }
      },
      {
        id: 'partial_derivatives',
        label: 'Turunan Parsial & Gradien',
        category: 'Kalkulus Multivariat',
        description: 'Vektor gradien ∇f berisi turunan parsial terhadap setiap variabel independen dengan menganggap variabel lain sebagai konstanta.',
        difficulty: 3,
        bloomLevel: 'Analyzing',
        prerequisites: ['matrix_ops', 'chain_rule'],
        masteryScore: 0.38,
        status: 'deficit',
        x: 420,
        y: 220,
        syllabusReference: 'Silabus Bab 6: Kalkulus Multivariat & Vektor Gradien',
        summaryNote: 'Terganggu oleh kelemahan di Aturan Rantai saat menurunkan fungsi multivariat.',
        quiz: {
          id: 'quiz-part-1',
          question: 'Diberikan fungsi f(x, y) = 3x^2 y + 2y^3. Tentukan turunan parsial ∂f/∂x.',
          latex: '\\frac{\\partial f}{\\partial x} \\text{ saat } y \\text{ dianggap konstan}',
          bloomLevel: 'Analyzing',
          options: [
            { id: 'opt-1', text: '6xy', isCorrect: true, explanation: 'Benar! y dianggap konstanta: 3(2x)y + 0 = 6xy.' },
            { id: 'opt-2', text: '6xy + 6y^2', isCorrect: false, explanation: 'Salah: suku 2y^3 tidak mengandung x, sehingga turunannya terhadap x adalah 0!', indicatesDeficitIn: 'partial_derivatives' },
            { id: 'opt-3', text: '3x^2 + 6y^2', isCorrect: false, explanation: 'Salah menurunkan x^2 menjadi x tanpa mengalikan pangkat.', indicatesDeficitIn: 'single_derivative' }
          ]
        }
      },
      {
        id: 'loss_functions',
        label: 'Fungsi Biaya (Loss Function)',
        category: 'Machine Learning Core',
        description: 'Formulasi matematis Mean Squared Error (MSE) untuk regresi dan Binary Cross Entropy (BCE) untuk klasifikasi.',
        difficulty: 3,
        bloomLevel: 'Understanding',
        prerequisites: ['scalars_vectors'],
        masteryScore: 0.55,
        status: 'learning',
        x: 420,
        y: 380,
        syllabusReference: 'Silabus Bab 7: Objective Functions & Empirical Risk Minimization',
        summaryNote: 'Paham konsep error, sedang mempelajari turunan analitik dari MSE.',
        quiz: {
          id: 'quiz-loss-1',
          question: 'Mengapa pada Mean Squared Error (MSE) kita mengalikan kuadrat selisih dengan faktor 1/2?',
          latex: 'L(w) = \\frac{1}{2m} \\sum_{i=1}^{m} (\\hat{y}^{(i)} - y^{(i)})^2',
          bloomLevel: 'Understanding',
          options: [
            { id: 'opt-1', text: 'Untuk membatalkan faktor 2 saat diturunkan dengan aturan pangkat', isCorrect: true, explanation: 'Tepat! Turunan dari u^2 adalah 2u, yang saling meniadakan dengan 1/2 sehingga gradien menjadi bersih.' },
            { id: 'opt-2', text: 'Karena data dibagi dua kelompok train dan test', isCorrect: false, explanation: 'Faktor 1/2 murni kenyamanan kalkulus matematis untuk turunan.' },
            { id: 'opt-3', text: 'Agar nilai error selalu bernilai negatif', isCorrect: false, explanation: 'MSE selalu bernilai positif non-negatif.' }
          ]
        }
      },
      {
        id: 'gradient_descent',
        label: 'Optimasi Gradient Descent',
        category: 'Machine Learning Core',
        description: 'Algoritma iteratif pembaruan bobot w := w - η ∇L menuju titik minimum lokal kurva loss.',
        difficulty: 4,
        bloomLevel: 'Applying',
        prerequisites: ['partial_derivatives', 'loss_functions'],
        masteryScore: 0.30,
        status: 'deficit',
        x: 600,
        y: 280,
        syllabusReference: 'Silabus Bab 8: Algoritma Optimasi Konveks & Learning Rate',
        summaryNote: 'Kritis: Mahasiswa bingung mengapa learning rate terlalu besar menyebabkan osilasi divergensi.',
        quiz: {
          id: 'quiz-gd-1',
          question: 'Jika gradien ∂L/∂w bernilai positif (+4.5) dan learning rate η = 0.1, apa yang terjadi pada nilai bobot w baru?',
          latex: 'w_{baru} = w_{lama} - \\eta \\frac{\\partial L}{\\partial w}',
          bloomLevel: 'Applying',
          options: [
            { id: 'opt-1', text: 'Nilai w berkurang sebesar 0.45', isCorrect: true, explanation: 'Benar! w := w - (0.1 * 4.5) = w - 0.45. Menuruni lereng positif berarti bergerak ke kiri.' },
            { id: 'opt-2', text: 'Nilai w bertambah sebesar 0.45', isCorrect: false, explanation: 'Salah tanda: jika gradien positif, kita harus mengurangi bobot agar mendekati lembah loss!', indicatesDeficitIn: 'gradient_descent' },
            { id: 'opt-3', text: 'Nilai w tidak berubah', isCorrect: false, explanation: 'Bobot selalu diperbarui selama gradien tidak sama dengan nol.', indicatesDeficitIn: 'gradient_descent' }
          ]
        }
      },
      {
        id: 'matrix_inverse',
        label: 'Invers Matriks & Determinan',
        category: 'Aljabar Linier',
        description: 'Determinan nol (matriks singular), reduksi baris Gauss-Jordan, dan keterbalikan matriks persegi.',
        difficulty: 3,
        bloomLevel: 'Understanding',
        prerequisites: ['matrix_ops'],
        masteryScore: 0.62,
        status: 'learning',
        x: 420,
        y: 60,
        syllabusReference: 'Silabus Bab 3: Matriks Invers dan Sistem Persamaan Linier',
        summaryNote: 'Mampu menghitung determinan 2x2, sedang memperdalam matriks singular.',
        quiz: {
          id: 'quiz-inv-1',
          question: 'Matriks A memiliki determinan det(A) = 0. Manakah kesimpulan yang benar?',
          latex: '\\det(A) = 0 \\implies A^{-1} = \\text{?}',
          bloomLevel: 'Understanding',
          options: [
            { id: 'opt-1', text: 'Matriks A bersifat singular dan tidak memiliki invers', isCorrect: true, explanation: 'Benar! Karena rumus invers melibatkan 1/det(A), pembagian dengan nol tidak terdefinisi.' },
            { id: 'opt-2', text: 'Matriks A adalah matriks identitas', isCorrect: false, explanation: 'Determinan matriks identitas adalah 1.' },
            { id: 'opt-3', text: 'Invers dari A adalah matriks nol', isCorrect: false, explanation: 'Matriks singular tidak memiliki invers sama sekali.' }
          ]
        }
      },
      {
        id: 'eigen_values',
        label: 'Nilai & Vektor Eigen (PCA)',
        category: 'Aljabar Linier Lanjut',
        description: 'Persamaan karakteristik Av = λv, dekomposisi spektral, dan reduksi dimensi Principal Component Analysis.',
        difficulty: 4,
        bloomLevel: 'Analyzing',
        prerequisites: ['matrix_inverse'],
        masteryScore: 0.35,
        status: 'deficit',
        x: 600,
        y: 100,
        syllabusReference: 'Silabus Bab 9: Dekomposisi Matriks & Reduksi Dimensi',
        summaryNote: 'Konsep bottleneck kelas: banyak mahasiswa gagal menghubungkan matriks kovariansi dengan arah variansi data maksimum.',
        quiz: {
          id: 'quiz-eigen-1',
          question: 'Pada dekomposisi PCA, arah sumbu komponen utama pertama (PC1) bersesuaian dengan:',
          latex: 'A v = \\lambda v',
          bloomLevel: 'Analyzing',
          options: [
            { id: 'opt-1', text: 'Vektor eigen yang memiliki nilai eigen (eigenvalue) terbesar', isCorrect: true, explanation: 'Tepat! Nilai eigen terbesar merepresentasikan arah variansi data terbesar.' },
            { id: 'opt-2', text: 'Vektor eigen dengan nilai eigen terkecil', isCorrect: false, explanation: 'Nilai eigen terkecil merepresentasikan arah dengan variansi terendah (noise).' },
            { id: 'opt-3', text: 'Rata-rata dari seluruh baris matriks data', isCorrect: false, explanation: 'Komponen utama dicari dari dekomposisi matriks kovariansi, bukan sekadar rata-rata.' }
          ]
        }
      },
      {
        id: 'backprop',
        label: 'Backpropagation Neural Network',
        category: 'Deep Learning',
        description: 'Algoritma propagasi mundur kesalahan menggunakan aturan rantai multivariat untuk menghitung gradien seluruh layer bobot.',
        difficulty: 5,
        bloomLevel: 'Evaluating',
        prerequisites: ['gradient_descent', 'eigen_values'],
        masteryScore: 0.15,
        status: 'locked',
        x: 780,
        y: 200,
        syllabusReference: 'Silabus Bab 10: Multi-Layer Perceptrons & Backpropagation Algorithm',
        summaryNote: 'Terkunci. Mahasiswa harus menuntaskan perbaikan Gradient Descent dan Aturan Rantai terlebih dahulu.',
        quiz: {
          id: 'quiz-bp-1',
          question: 'Dalam backpropagation, gradien bobot layer tersembunyi ∂L/∂W_1 dihitung dengan merambatkan gradien dari mana?',
          latex: '\\frac{\\partial L}{\\partial W_1} = \\frac{\\partial L}{\\partial y_{pred}} \\frac{\\partial y_{pred}}{\\partial h} \\frac{\\partial h}{\\partial W_1}',
          bloomLevel: 'Evaluating',
          options: [
            { id: 'opt-1', text: 'Dari output layer mundur ke input layer menggunakan aturan rantai', isCorrect: true, explanation: 'Benar! Sinyal error dihitung di output lalu dirambatkan ke belakang layer demi layer.' },
            { id: 'opt-2', text: 'Dari input layer maju ke output layer secara acak', isCorrect: false, explanation: 'Itu adalah tahap forward pass, bukan backward pass.' },
            { id: 'opt-3', text: 'Langsung dari data latih tanpa melalui fungsi aktivasi', isCorrect: false, explanation: 'Turunan fungsi aktivasi wajib dikalikan di setiap layer perantara.' }
          ]
        }
      }
    ],
    edges: [
      { id: 'e1', source: 'scalars_vectors', target: 'matrix_ops', relationType: 'requires' },
      { id: 'e2', source: 'matrix_ops', target: 'matrix_inverse', relationType: 'requires' },
      { id: 'e3', source: 'matrix_inverse', target: 'eigen_values', relationType: 'requires' },
      { id: 'e4', source: 'single_derivative', target: 'chain_rule', relationType: 'requires' },
      { id: 'e5', source: 'chain_rule', target: 'partial_derivatives', relationType: 'requires' },
      { id: 'e6', source: 'matrix_ops', target: 'partial_derivatives', relationType: 'applies' },
      { id: 'e7', source: 'partial_derivatives', target: 'gradient_descent', relationType: 'requires' },
      { id: 'e8', source: 'scalars_vectors', target: 'loss_functions', relationType: 'applies' },
      { id: 'e9', source: 'loss_functions', target: 'gradient_descent', relationType: 'requires' },
      { id: 'e10', source: 'gradient_descent', target: 'backprop', relationType: 'requires' },
      { id: 'e11', source: 'eigen_values', target: 'backprop', relationType: 'extends' }
    ]
  }
];

export const MOCK_ANALYTICS: ClassAnalytics = {
  courseId: 'course-ml-math',
  totalStudents: 78,
  classAverageMastery: 58.4,
  bottleneckConcepts: [
    { conceptId: 'chain_rule', conceptLabel: 'Aturan Rantai (Chain Rule)', failureRate: 67.9, impactedStudents: 53 },
    { conceptId: 'partial_derivatives', conceptLabel: 'Turunan Parsial & Gradien', failureRate: 61.5, impactedStudents: 48 },
    { conceptId: 'eigen_values', conceptLabel: 'Nilai & Vektor Eigen (PCA)', failureRate: 58.9, impactedStudents: 46 },
    { conceptId: 'gradient_descent', conceptLabel: 'Optimasi Gradient Descent', failureRate: 52.5, impactedStudents: 41 }
  ],
  atRiskStudents: [
    {
      id: 'st-01',
      name: 'Rian Pratama',
      nim: '162211045',
      riskLevel: 'High',
      riskScore: 84,
      topBottleneck: 'Aturan Rantai & Turunan Parsial',
      lastActive: '2 jam yang lalu',
      recommendedIntervention: 'Bimbingan Remedial Sokrates Modul Kalkulus Multivariat & latihan interaktif.'
    },
    {
      id: 'st-02',
      name: 'Siti Nurhaliza',
      nim: '162211082',
      riskLevel: 'High',
      riskScore: 76,
      topBottleneck: 'Nilai Eigen & Matriks Invers',
      lastActive: '1 hari yang lalu',
      recommendedIntervention: 'Pemberian materi mikro visualisasi geometri dekomposisi matriks.'
    },
    {
      id: 'st-03',
      name: 'Ahmad Fauzan',
      nim: '162211019',
      riskLevel: 'Medium',
      riskScore: 54,
      topBottleneck: 'Gradient Descent Sign Rules',
      lastActive: '30 menit yang lalu',
      recommendedIntervention: 'Latihan simulasi penentuan arah lereng kurva loss.'
    }
  ]
};
