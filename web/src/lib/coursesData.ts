import { Course, ClassAnalytics } from './types';

export const INITIAL_COURSES: Course[] = [
  {
    id: 'course-ml-math',
    code: 'PSD-204',
    title: 'Matematika Sains Data & Machine Learning (STEM)',
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
        x: 60,
        y: 100,
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
        x: 230,
        y: 100,
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
        x: 60,
        y: 300,
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
        x: 230,
        y: 300,
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
        x: 410,
        y: 200,
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
        x: 410,
        y: 360,
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
        x: 590,
        y: 260,
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
        x: 410,
        y: 50,
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
        x: 590,
        y: 90,
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
        x: 770,
        y: 180,
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
  },
  {
    id: 'course-law-soshum',
    code: 'HKP-101',
    title: 'Hukum Pidana & Penalaran Doktrin Yuridis (SOSHUM)',
    faculty: 'Fakultas Hukum (FH)',
    university: 'Universitas Airlangga',
    description: 'Pohon kompetensi penalaran hukum: hierarki norma, unsur melawan hukum, doktrin kesengajaan (dolus), alasan penghapus pidana, dan konstruksi dakwaan.',
    nodes: [
      {
        id: 'asas_legalitas',
        label: 'Asas Legalitas (Nullum Delictum)',
        category: 'Hukum Pidana Dasar',
        description: 'Prinsip tiada perbuatan dapat dipidana kecuali atas kekuatan aturan perundang-undangan pidana yang telah ada sebelum perbuatan (Pasal 1 ayat 1 KUHP).',
        difficulty: 1,
        bloomLevel: 'Remembering',
        prerequisites: [],
        masteryScore: 0.94,
        status: 'mastered',
        x: 60,
        y: 110,
        syllabusReference: 'Silabus Bab 1: Asas-Asas Berlakunya Hukum Pidana',
        summaryNote: 'Menguasai larangan analogi dan asas non-retroaktifitas.',
        quiz: {
          id: 'quiz-law-1',
          question: 'Mengapa hukum pidana Indonesia secara ketat melarang penggunaan penafsiran analogis (analogie)?',
          bloomLevel: 'Understanding',
          options: [
            { id: 'opt-1', text: 'Untuk menjamin kepastian hukum dan mencegah kesewenang-wenangan penguasa sesuai asas legalitas', isCorrect: true, explanation: 'Tepat! Asas legalitas menuntut lex stricta (hukum harus jelas dan tidak boleh diperluas secara analogi).' },
            { id: 'opt-2', text: 'Karena hakim dilarang menafsirkan undang-undang sama sekali', isCorrect: false, explanation: 'Hakim tetap boleh melakukan penafsiran sistematis, teleologis, atau gramatikal, tetapi dilarang menciptakan delik baru via analogi.' },
            { id: 'opt-3', text: 'Karena seluruh undang-undang pidana Belanda sudah usang', isCorrect: false, explanation: 'Larangan analogi adalah doktrin universal perlindungan hak asasi warga negara.' }
          ]
        }
      },
      {
        id: 'unsur_tindak_pidana',
        label: 'Unsur Tindak Pidana (Strafbaar Feit)',
        category: 'Hukum Pidana Dasar',
        description: 'Pemisahan unsur objektif (perbuatan, akibat, melawan hukum) dan unsur subjektif (kesalahan, kesengajaan, kealpaan).',
        difficulty: 2,
        bloomLevel: 'Understanding',
        prerequisites: ['asas_legalitas'],
        masteryScore: 0.86,
        status: 'mastered',
        x: 230,
        y: 110,
        syllabusReference: 'Silabus Bab 2: Teori Strafbaar Feit & Pemisahan Perbuatan vs Pembuat',
        summaryNote: 'Paham perbedaan dualistis vs monistis dalam doktrin tindak pidana.',
        quiz: {
          id: 'quiz-law-2',
          question: 'Dalam aliran dualistis yang dianut mayoritas pakar pidana Indonesia, apa perbedaan antara "tindak pidana" dan "pertanggungjawaban pidana"?',
          bloomLevel: 'Analyzing',
          options: [
            { id: 'opt-1', text: 'Tindak pidana mengenai perbuatannya (objektif), pertanggungjawaban mengenai orangnya (subjektif/kesalahan)', isCorrect: true, explanation: 'Benar! Asas "Geen straf zonder schuld" (tiada pidana tanpa kesalahan).' },
            { id: 'opt-2', text: 'Keduanya sama dan tidak dapat dipisahkan dalam vonis hakim', isCorrect: false, explanation: 'Itu adalah pandangan monistis klasik.' },
            { id: 'opt-3', text: 'Tindak pidana hanya berlaku untuk kejahatan, bukan pelanggaran', isCorrect: false, explanation: 'Keduanya berlaku untuk seluruh delik pidana.' }
          ]
        }
      },
      {
        id: 'mens_rea',
        label: 'Kesengajaan (Dolus) vs Kealpaan (Culpa)',
        category: 'Unsur Subjektif Kognitif',
        description: 'Tiga gradasi kesengajaan: Dolus Directus (tujuan), Dolus Indirectus (kepastian), dan Dolus Eventualis (kesadaran kemungkinan).',
        difficulty: 3,
        bloomLevel: 'Analyzing',
        prerequisites: ['unsur_tindak_pidana'],
        masteryScore: 0.40,
        status: 'deficit',
        x: 410,
        y: 80,
        syllabusReference: 'Silabus Bab 3: Bentuk-Bentuk Kesalahan & Teori Kesengajaan (Weten en Willen)',
        summaryNote: 'Bottleneck: Mahasiswa kerap tertukar membedakan Dolus Eventualis dengan Culpa Lata (kealpaan berat).',
        quiz: {
          id: 'quiz-law-3',
          question: 'Terdakwa melempar batu besar ke kaca bus malam yang sedang melaju kencang untuk memecahkan kaca, namun menyadari lemparan itu sangat mungkin menewaskan penumpang. Sikap batin terdakwa termasuk:',
          bloomLevel: 'Analyzing',
          options: [
            { id: 'opt-1', text: 'Kesengajaan bersyarat / sadar kemungkinan (Dolus Eventualis)', isCorrect: true, explanation: 'Tepat! Teori insyaf kemungkinan: pelaku tetap melakukan perbuatan meskipun menyadari risiko akibat fatal.' },
            { id: 'opt-2', text: 'Kealpaan ringan (Culpa Levis)', isCorrect: false, explanation: 'Pelaku sadar penuh dan berkehendak melempar batu ke bus bergerak.', indicatesDeficitIn: 'mens_rea' },
            { id: 'opt-3', text: 'Alasan pemaaf karena emosi spontan', isCorrect: false, explanation: 'Emosi spontan bukan alasan pemaaf yuridis.', indicatesDeficitIn: 'alasan_penghapus' }
          ]
        }
      },
      {
        id: 'alasan_penghapus',
        label: 'Alasan Pemaaf vs Alasan Pembenar',
        category: 'Doktrin Pembelaan Diri',
        description: 'Alasan pembenar menghapus sifat melawan hukum perbuatan (Noodweer Pasal 49 ayat 1), alasan pemaaf menghapus kesalahan pembuat (Noodweer Excess Pasal 49 ayat 2).',
        difficulty: 3,
        bloomLevel: 'Applying',
        prerequisites: ['unsur_tindak_pidana'],
        masteryScore: 0.36,
        status: 'deficit',
        x: 410,
        y: 260,
        syllabusReference: 'Silabus Bab 4: Alasan Penghapus Pidana & Daya Paksa (Overmacht)',
        summaryNote: 'Mahasiswa keliru mengidentifikasi kapan Noodweer Excess berlaku (harus ada goncangan jiwa hebat akibat serangan seketika).',
        quiz: {
          id: 'quiz-law-4',
          question: 'Seseorang yang diserang begal bersenjata tajam membela diri hingga begal tewas karena keguncangan jiwa yang hebat. Kategori pembelaan ini adalah:',
          bloomLevel: 'Applying',
          options: [
            { id: 'opt-1', text: 'Noodweer Excess (Pasal 49 ayat 2 KUHP) - Alasan Pemaaf', isCorrect: true, explanation: 'Benar! Melampaui batas pembelaan karena goncangan jiwa hebat akibat serangan seketika menghapus kesalahan si pembuat.' },
            { id: 'opt-2', text: 'Noodweer Murni (Pasal 49 ayat 1 KUHP) - Alasan Pembenar', isCorrect: false, explanation: 'Jika melampaui batas proporsionalitas karena goncangan jiwa, dasar hukumnya adalah Noodweer Excess (Pemaaf).', indicatesDeficitIn: 'alasan_penghapus' },
            { id: 'opt-3', text: 'Tindak pidana penganiayaan biasa tanpa ampunan', isCorrect: false, explanation: 'KUHP mengakomodasi pembelaan terpaksa sebagai hak asasi pertahanan diri.', indicatesDeficitIn: 'unsur_tindak_pidana' }
          ]
        }
      },
      {
        id: 'penyertaan_deelneming',
        label: 'Ajaran Penyertaan (Deelneming)',
        category: 'Hukum Pidana Lanjut',
        description: 'Diferensiasi peran pelaku: Pembuat pelaksana (Pleger), yang menyuruh lakukan (Doen Plegen), yang turut serta (Medepleger), dan penganjur (Uitlokker).',
        difficulty: 4,
        bloomLevel: 'Analyzing',
        prerequisites: ['mens_rea'],
        masteryScore: 0.32,
        status: 'deficit',
        x: 590,
        y: 110,
        syllabusReference: 'Silabus Bab 5: Pasal 55 & 56 KUHP tentang Penyertaan Tindak Pidana',
        summaryNote: 'Syarat Medepleger: harus ada kerja sama sadar (bewuste samenwerking) dan pelaksanaan fisik bersama.',
        quiz: {
          id: 'quiz-law-5',
          question: 'Apa syarat mutlak agar seseorang dapat dikualifikasikan sebagai "Medepleger" (turut serta melakukan) dalam Pasal 55 KUHP?',
          bloomLevel: 'Analyzing',
          options: [
            { id: 'opt-1', text: 'Adanya kerja sama sadar (bewuste samenwerking) dan pelaksanaan fisik bersama (feitelijke samenwerking)', isCorrect: true, explanation: 'Tepat! Tanpa kerja sama sadar, pelaku hanya dikualifikasikan sebagai pembantu (Medeplichtige Pasal 56).' },
            { id: 'opt-2', text: 'Hanya perlu hadir di lokasi kejadian tanpa perlu bersepakat', isCorrect: false, explanation: 'Kehadiran pasif tanpa kesepakatan batin tidak memenuhi syarat medeplegen.', indicatesDeficitIn: 'penyertaan_deelneming' },
            { id: 'opt-3', text: 'Menyuruh orang gila melakukan tindak pidana', isCorrect: false, explanation: 'Itu adalah Doen Plegen (menyuruh lakukan), bukan Medeplegen.', indicatesDeficitIn: 'penyertaan_deelneming' }
          ]
        }
      },
      {
        id: 'tanggung_jawab_korporasi',
        label: 'Pertanggungjawaban Korporasi',
        category: 'Pidana Khusus',
        description: 'Doktrin Identification Theory, Direct Liability, dan Vicarious Liability terhadap subjek hukum badan hukum.',
        difficulty: 4,
        bloomLevel: 'Understanding',
        prerequisites: ['unsur_tindak_pidana'],
        masteryScore: 0.60,
        status: 'learning',
        x: 590,
        y: 280,
        syllabusReference: 'Silabus Bab 6: Tindak Pidana Korporasi & UU Tipikor/TPPU',
        summaryNote: 'Sedang mempelajari kapan perbuatan pengurus dianggap sebagai perbuatan korporasi.',
        quiz: {
          id: 'quiz-law-6',
          question: 'Berdasarkan Perma No. 13 Tahun 2016, kapan korporasi dapat dijatuhi pidana atas perbuatan pengurusnya?',
          bloomLevel: 'Understanding',
          options: [
            { id: 'opt-1', text: 'Ketika korporasi memperoleh keuntungan dari tindak pidana dan tidak melakukan langkah pencegahan yang wajar', isCorrect: true, explanation: 'Benar! Adanya keuntungan korporasi dan pembiaran menjadi tolok ukur kesalahan korporasi.' },
            { id: 'opt-2', text: 'Hanya jika seluruh pemegang saham sepakat di RUPS', isCorrect: false, explanation: 'Tindak pidana tidak memerlukan persetujuan RUPS untuk membebankan korporasi.' },
            { id: 'opt-3', text: 'Hanya jika korporasi dinyatakan pailit', isCorrect: false, explanation: 'Kepailitan adalah ranah perdata/niaga, bukan syarat pidana korporasi.' }
          ]
        }
      },
      {
        id: 'analisis_kasus_yuridis',
        label: 'Konstruksi Dakwaan & Analisis Putusan',
        category: 'Praktik Peradilan Pidana',
        description: 'Penyusunan surat dakwaan alternatif, subsidaritas, dan pertimbangan hakim (ratio decidendi) berbasis pembuktian materil.',
        difficulty: 5,
        bloomLevel: 'Evaluating',
        prerequisites: ['penyertaan_deelneming', 'alasan_penghapus', 'tanggung_jawab_korporasi'],
        masteryScore: 0.15,
        status: 'locked',
        x: 770,
        y: 190,
        syllabusReference: 'Silabus Bab 7: Legal Case Method & Moot Court Preparation',
        summaryNote: 'Terkunci. Tuntaskan penguasaan Mens Rea dan Alasan Penghapus Pidana terlebih dahulu.',
        quiz: {
          id: 'quiz-law-7',
          question: 'Dalam surat dakwaan bentuk subsidaritas, bagaimana konsekuensi yuridis jika dakwaan primer terbukti secara sah dan meyakinkan?',
          bloomLevel: 'Evaluating',
          options: [
            { id: 'opt-1', text: 'Dakwaan subsider tidak perlu dipertimbangkan dan dibuktikan lagi oleh majelis hakim', isCorrect: true, explanation: 'Benar! Karakter subsidaritas berjenjang: jika primer terbukti, lapisan bawah gugur untuk diuji.' },
            { id: 'opt-2', text: 'Hakim wajib menghukum terdakwa dengan kedua dakwaan secara kumulatif', isCorrect: false, explanation: 'Itu adalah dakwaan kumulatif, bukan subsidaritas.' },
            { id: 'opt-3', text: 'Terdakwa otomatis dibebaskan dari segala tuntutan hukum', isCorrect: false, explanation: 'Terdakwa justru dijatuhi vonis atas dakwaan primer yang terbukti.' }
          ]
        }
      }
    ],
    edges: [
      { id: 'el1', source: 'asas_legalitas', target: 'unsur_tindak_pidana', relationType: 'requires' },
      { id: 'el2', source: 'unsur_tindak_pidana', target: 'mens_rea', relationType: 'requires' },
      { id: 'el3', source: 'unsur_tindak_pidana', target: 'alasan_penghapus', relationType: 'requires' },
      { id: 'el4', source: 'unsur_tindak_pidana', target: 'tanggung_jawab_korporasi', relationType: 'extends' },
      { id: 'el5', source: 'mens_rea', target: 'penyertaan_deelneming', relationType: 'requires' },
      { id: 'el6', source: 'penyertaan_deelneming', target: 'analisis_kasus_yuridis', relationType: 'requires' },
      { id: 'el7', source: 'alasan_penghapus', target: 'analisis_kasus_yuridis', relationType: 'requires' },
      { id: 'el8', source: 'tanggung_jawab_korporasi', target: 'analisis_kasus_yuridis', relationType: 'extends' }
    ]
  }
];

export const MOCK_ANALYTICS: ClassAnalytics = {
  courseId: 'course-ml-math',
  totalStudents: 78,
  classAverageMastery: 58.4,
  bottleneckConcepts: [
    { conceptId: 'chain_rule', conceptLabel: 'Aturan Rantai (Chain Rule) / Dolus Eventualis', failureRate: 67.9, impactedStudents: 53 },
    { conceptId: 'partial_derivatives', conceptLabel: 'Turunan Parsial & Gradien / Alasan Pemaaf', failureRate: 61.5, impactedStudents: 48 },
    { conceptId: 'eigen_values', conceptLabel: 'Nilai Eigen (STEM) & Ajaran Penyertaan (SOSHUM)', failureRate: 58.9, impactedStudents: 46 },
    { conceptId: 'gradient_descent', conceptLabel: 'Optimasi Gradient Descent & Konstruksi Dakwaan', failureRate: 52.5, impactedStudents: 41 }
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
      name: 'Siti Nurhaliza (FH)',
      nim: '032111082',
      riskLevel: 'High',
      riskScore: 76,
      topBottleneck: 'Dolus Eventualis vs Noodweer Excess',
      lastActive: '1 hari yang lalu',
      recommendedIntervention: 'Pemberian studi kasus dialektika yuridis pertanggungjawaban pidana.'
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
