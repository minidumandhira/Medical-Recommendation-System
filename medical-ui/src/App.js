import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";

function App() {

  const [symptoms, setSymptoms] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [result, setResult] = useState(null);

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/symptoms")
      .then(res => {

        const options = res.data.map(symptom => ({
          value: symptom,
          label: symptom.replaceAll("_"," ")
        }));

        setSymptoms(options);

      })
      .catch(err => console.error(err));
  }, []);

  const predictDisease = () => {

    const selected = selectedSymptoms.map(s => s.value);

    axios.post("http://127.0.0.1:5000/predict", {
      symptoms: selected
    })
    .then(res => {
      console.log(res.data);
      setResult(res.data);
    })
    .catch(err => console.error(err));

  };

  return (
    <>
      <style>{`
        html {
          scroll-behavior: smooth;
        }
        
        ::-webkit-scrollbar {
          width: 12px;
        }
        
        ::-webkit-scrollbar-track {
          background: #0f0f1e;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #e94560;
          border-radius: 6px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #ff5577;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .card {
          background: #16213e;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.3);
          color: #eee;
          transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
          cursor: pointer;
          animation: fadeInUp 0.6s ease-out backwards;
        }
        
        .card:nth-child(1) { animation-delay: 0.1s; }
        .card:nth-child(2) { animation-delay: 0.2s; }
        .card:nth-child(3) { animation-delay: 0.3s; }
        .card:nth-child(4) { animation-delay: 0.4s; }
        .card:nth-child(5) { animation-delay: 0.5s; }
        .card:nth-child(6) { animation-delay: 0.6s; }
        
        .card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 8px 20px rgba(233, 69, 96, 0.4);
          background: #1f2b4a;
        }
      `}</style>

      <div style={{
        background:"#1a1a2e",
        minHeight:"100vh",
        padding:"40px",
        fontFamily:"Arial",
        color:"#eee"
      }}>

        <h1 style={{
          textAlign:"center",
          marginBottom:"40px",
          color:"#fff"
        }}>
           AI Medical Recommendation System
        </h1>

      <div style={{
        width:"500px",
        margin:"auto"
      }}>

        <Select
          options={symptoms}
          isMulti
          onChange={setSelectedSymptoms}
          placeholder="Search symptoms..."
          styles={{
            control: (base) => ({
              ...base,
              background: "#16213e",
              borderColor: "#0f3460",
              color: "#eee"
            }),
            menu: (base) => ({
              ...base,
              background: "#16213e"
            }),
            option: (base, state) => ({
              ...base,
              background: state.isFocused ? "#0f3460" : "#16213e",
              color: "#eee"
            }),
            multiValue: (base) => ({
              ...base,
              background: "#0f3460"
            }),
            multiValueLabel: (base) => ({
              ...base,
              color: "#eee"
            }),
            input: (base) => ({
              ...base,
              color: "#eee"
            }),
            placeholder: (base) => ({
              ...base,
              color: "#aaa"
            }),
            singleValue: (base) => ({
              ...base,
              color: "#eee"
            })
          }}
        />

        <br/>

        <button
          onClick={predictDisease}
          style={{
            width:"100%",
            padding:"12px",
            background:"#e94560",
            color:"white",
            border:"none",
            borderRadius:"6px",
            fontSize:"16px",
            cursor:"pointer",
            fontWeight:"bold"
          }}
        >
          Predict Disease
        </button>

      </div>


      {result && (

        <div style={{
          maxWidth:"900px",
          margin:"40px auto",
          display:"grid",
          gridTemplateColumns:"1fr 1fr",
          gap:"20px"
        }}>

          <div className="card">
            <h3>🦠 Disease</h3>
            <p>{result.disease}</p>
          </div>

          <div className="card">
            <h3>📖 Description</h3>
            {result.description && result.description.map((d,i)=>(
              <p key={i}>{d}</p>
            ))}
          </div>

          <div className="card">
            <h3>💊 Medications</h3>
            <ul>
              {result.medications && result.medications.map((m,i)=>(
                <li key={i}>{m}</li>
              ))}
            </ul>
          </div>

          <div className="card">
            <h3>🥗 Diet</h3>
            <ul>
              {result.diet && result.diet.map((d,i)=>(
                <li key={i}>{d}</li>
              ))}
            </ul>
          </div>

          <div className="card">
            <h3>⚠️ Precautions</h3>
            <ul>
              {result.precautions && result.precautions.map((p,i)=>(
                <li key={i}>{p}</li>
              ))}
            </ul>
          </div>

          <div className="card">
            <h3>🏃 Workout</h3>
            <ul>
              {result.workout && result.workout.map((w,i)=>(
                <li key={i}>{w}</li>
              ))}
            </ul>
          </div>

        </div>

      )}

      </div>
    </>
  );
}

export default App;