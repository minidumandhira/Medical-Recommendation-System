#  Medical Recommendation System

A machine learning-based web application that predicts diseases and provides medical recommendations based on user-input symptoms.

---

##  Features

*  Disease prediction using Machine Learning (SVM)
*  Provides medical recommendations based on predicted disease
*  Interactive frontend built with React
*  Fast backend using Flask API
*  Full-stack integration (Frontend + Backend)

---

##  Technologies Used

### Backend:

* Python
* Flask
* Flask-CORS
* Scikit-learn
* Pandas
* NumPy
* Joblib

### Frontend:

* React.js
* HTML, CSS, JavaScript

---

##  Project Structure

```
Medical-Recommendation-System/
│
├── medical-ui/        # React frontend
├── model/             # Trained ML model files
├── Datasets/          # Dataset files
├── api.py             # Flask backend
├── medicalrecom.ipynb # Model training notebook
├── requirements.txt
├── README.md
└── .gitignore
```

---

## ⚙️ Installation & Setup

### 1️. Clone the repository

```
git clone https://github.com/your-username/Medical-Recommendation-System.git
cd Medical-Recommendation-System
```

---

### 2️.Setup Backend

```
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python api.py
```

# Backend runs on:
http://127.0.0.1:5000

---

### 3️. Setup Frontend

Open a new terminal:

```
cd medical-ui
npm install
npm start
```

# Frontend runs on:
http://localhost:3000

---

##  Machine Learning Model

* Algorithm: **Support Vector Machine (SVM)**
* Preprocessing: **Label Encoding**
* Libraries: Scikit-learn

---



---

##  License

This project is for educational purposes.

---

##  Author

**Minidu Mandhira**
