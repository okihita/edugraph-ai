"""
=============================================================================
KAGGLE MINI-PROJECT TUTORIAL: STUDENT ACADEMIC RISK PREDICTION
EduGraph-AI · Campus Data Week 2026 Innovation Case Competition
=============================================================================
Panduan Langkah-demi-Langkah Belajar Machine Learning untuk Kompetisi Kaggle:
1. Load Data (train.csv, test.csv, sample_submission.csv)
2. Exploratory Data Analysis (EDA)
3. Feature Engineering (Membuat fitur prediktif baru)
4. Stratified K-Fold Cross-Validation (Menghindari Overfitting & Data Leakage)
5. Training Model Ensemble (LightGBM)
6. Evaluasi Metrik Lokal (ROC-AUC & Accuracy)
7. Generate File Prediksi Akhir (submission.csv)
"""

import pandas as pd
import numpy as np
import os
import lightgbm as lgb
from sklearn.model_selection import StratifiedKFold
from sklearn.metrics import roc_auc_score, accuracy_score, f1_score
from sklearn.preprocessing import LabelEncoder

# =====================================================================
# LANGKAH 1: LOAD DATASET
# =====================================================================
print("=" * 60)
print("LANGKAH 1: MEMUAT DATASET")
print("=" * 60)

DATA_DIR = os.path.dirname(os.path.abspath(__file__))
train_df = pd.read_csv(os.path.join(DATA_DIR, "train.csv"))
test_df = pd.read_csv(os.path.join(DATA_DIR, "test.csv"))
sample_sub = pd.read_csv(os.path.join(DATA_DIR, "sample_submission.csv"))

print(f"Jumlah baris Train: {train_df.shape[0]}, Kolom: {train_df.shape[1]}")
print(f"Jumlah baris Test:  {test_df.shape[0]}, Kolom: {test_df.shape[1]}")
print("\n5 Baris Pertama Data Latih (train.csv):")
print(train_df.head())

# =====================================================================
# LANGKAH 2: EXPLORATORY DATA ANALYSIS (EDA)
# =====================================================================
print("\n" + "=" * 60)
print("LANGKAH 2: ANALISIS DISTRIBUSI TARGET (is_at_risk)")
print("=" * 60)

target_counts = train_df['is_at_risk'].value_counts()
print(f"Aman (0):     {target_counts.get(0, 0)} mahasiswa ({target_counts.get(0, 0)/len(train_df)*100:.1f}%)")
print(f"Berisiko (1): {target_counts.get(1, 0)} mahasiswa ({target_counts.get(1, 0)/len(train_df)*100:.1f}%)")

# =====================================================================
# LANGKAH 3: FEATURE ENGINEERING & PREPROCESSING
# =====================================================================
print("\n" + "=" * 60)
print("LANGKAH 3: FEATURE ENGINEERING (Membuat Fitur Cerdas)")
print("=" * 60)

def create_features(df):
    data = df.copy()
    
    # 1. Rasio kehadiran terhadap jam LMS (Interaksi belajar aktif vs pasif)
    data['lms_per_attendance'] = data['weekly_lms_hours'] / (data['attendance_rate'] + 1.0)
    
    # 2. Indeks performa akademik gabungan (GPA x Quiz)
    data['academic_performance_index'] = data['gpa_sem1'] * (data['quiz_avg_score'] / 100.0)
    
    # 3. Rasio tugas telat terhadap kehadiran
    data['late_to_attendance_ratio'] = data['late_assignments'] / (data['attendance_rate'] / 100.0 + 0.1)
    
    # 4. Fitur interaksi risiko
    data['is_low_attendance'] = (data['attendance_rate'] < 75.0).astype(int)
    data['is_low_gpa'] = (data['gpa_sem1'] < 2.50).astype(int)
    
    return data

train_feat = create_features(train_df)
test_feat = create_features(test_df)

# Encode categorical feature 'faculty'
le = LabelEncoder()
train_feat['faculty_encoded'] = le.fit_transform(train_feat['faculty'])
test_feat['faculty_encoded'] = le.transform(test_feat['faculty'])

features = [
    'attendance_rate', 'gpa_sem1', 'weekly_lms_hours', 'quiz_avg_score',
    'late_assignments', 'faculty_encoded', 'lms_per_attendance',
    'academic_performance_index', 'late_to_attendance_ratio',
    'is_low_attendance', 'is_low_gpa'
]

X = train_feat[features]
y = train_feat['is_at_risk']
X_test = test_feat[features]

print(f"Fitur yang digunakan ({len(features)} fitur):")
for f in features:
    print(f" - {f}")

# =====================================================================
# LANGKAH 4 & 5: 5-FOLD STRATIFIED CROSS-VALIDATION & MODELING
# =====================================================================
print("\n" + "=" * 60)
print("LANGKAH 4 & 5: PELATIHAN MODEL DENGAN 5-FOLD CROSS VALIDATION")
print("=" * 60)

N_SPLITS = 5
skf = StratifiedKFold(n_splits=N_SPLITS, shuffle=True, random_state=42)

oof_preds = np.zeros(len(train_df))
test_preds = np.zeros(len(test_df))
feature_importances = np.zeros(len(features))

lgb_params = {
    'objective': 'binary',
    'metric': 'auc',
    'boosting_type': 'gbdt',
    'learning_rate': 0.05,
    'num_leaves': 15,
    'max_depth': 4,
    'feature_fraction': 0.8,
    'random_state': 42,
    'verbose': -1
}

for fold, (train_idx, val_idx) in enumerate(skf.split(X, y), 1):
    X_tr, y_tr = X.iloc[train_idx], y.iloc[train_idx]
    X_va, y_va = X.iloc[val_idx], y.iloc[val_idx]
    
    train_data = lgb.Dataset(X_tr, label=y_tr)
    val_data = lgb.Dataset(X_va, label=y_va, reference=train_data)
    
    model = lgb.train(
        lgb_params,
        train_data,
        num_boost_round=300,
        valid_sets=[train_data, val_data],
        callbacks=[lgb.early_stopping(stopping_rounds=30, verbose=False)]
    )
    
    val_pred = model.predict(X_va, num_iteration=model.best_iteration)
    oof_preds[val_idx] = val_pred
    
    # Predict on test data
    test_preds += model.predict(X_test, num_iteration=model.best_iteration) / N_SPLITS
    feature_importances += model.feature_importance(importance_type='gain') / N_SPLITS
    
    fold_auc = roc_auc_score(y_va, val_pred)
    fold_acc = accuracy_score(y_va, (val_pred >= 0.5).astype(int))
    print(f"Fold {fold} | Validation ROC-AUC: {fold_auc:.4f} | Accuracy: {fold_acc*100:.2f}%")

# =====================================================================
# LANGKAH 6: EVALUASI PERFORMA KESELURUHAN (OUT-OF-FOLD)
# =====================================================================
print("\n" + "=" * 60)
print("LANGKAH 6: HASIL EVALUASI LOKAL AKHIR (OUT-OF-FOLD)")
print("=" * 60)

overall_auc = roc_auc_score(y, oof_preds)
overall_acc = accuracy_score(y, (oof_preds >= 0.5).astype(int))
overall_f1 = f1_score(y, (oof_preds >= 0.5).astype(int))

print(f"⭐ Overall Out-of-Fold ROC-AUC: {overall_auc:.4f}")
print(f"⭐ Overall Out-of-Fold Accuracy: {overall_acc*100:.2f}%")
print(f"⭐ Overall Out-of-Fold F1-Score: {overall_f1:.4f}")

print("\nTop 5 Fitur Paling Berpengaruh (Feature Importance):")
fi_df = pd.DataFrame({'feature': features, 'importance': feature_importances}).sort_values('importance', ascending=False)
for idx, row in fi_df.head(5).iterrows():
    print(f" - {row['feature']:<26}: {row['importance']:.2f}")

# =====================================================================
# LANGKAH 7: MEMBUAT FILE SUBMISSION (submission.csv)
# =====================================================================
print("\n" + "=" * 60)
print("LANGKAH 7: EKSPOR FILE SUBMISSION UNTUK KAGGLE")
print("=" * 60)

submission_df = pd.DataFrame({
    'student_id': test_df['student_id'],
    'is_at_risk': (test_preds >= 0.5).astype(int)
})

output_path = os.path.join(DATA_DIR, "my_first_submission.csv")
submission_df.to_csv(output_path, index=False)

print(f"✅ Berhasil! File prediksi tersimpan di: {output_path}")
print(f"Jumlah baris file submission: {len(submission_df)}")
print("\n5 Baris Pertama File Submission:")
print(submission_df.head())
print("\n" + "=" * 60)
print("SELESAI! File 'my_first_submission.csv' siap di-upload ke Kaggle!")
print("=" * 60)
