import { useState } from "react";

// 1. MATCH YOUR JSON EXACTLY
interface CustomerData {
  gender: string;
  SeniorCitizen: number;
  Partner: string;
  Dependents: string;
  tenure: number;
  PhoneService: string;
  MultipleLines: string;
  InternetService: string;
  OnlineSecurity: string;
  OnlineBackup: string;
  DeviceProtection: string;
  TechSupport: string;
  StreamingTV: string;
  StreamingMovies: string;
  Contract: string;
  PaperlessBilling: string;
  PaymentMethod: string;
  MonthlyCharges: number;
  TotalCharges: number;
}

interface ChurnPrediction {
  prediction_label: string;
  prediction_value: number;
  churn_probability: number;
}

export default function CustomerForm() {
  // 2. Initialize State with safe defaults matching your JSON types
  const [formData, setFormData] = useState<CustomerData>({
    gender: "Male",
    SeniorCitizen: 0,
    Partner: "No",
    Dependents: "No",
    tenure: 1,
    PhoneService: "No",
    MultipleLines: "No phone service",
    InternetService: "DSL",
    OnlineSecurity: "No",
    OnlineBackup: "No",
    DeviceProtection: "No",
    TechSupport: "No",
    StreamingTV: "No",
    StreamingMovies: "No",
    Contract: "Month-to-month",
    PaperlessBilling: "Yes",
    PaymentMethod: "Electronic check",
    MonthlyCharges: 0,
    TotalCharges: 0,
  });

  const [prediction, setPrediction] = useState<ChurnPrediction | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      // Convert numbers for specific numeric fields, keep others as strings
      [name]: [
        "tenure",
        "MonthlyCharges",
        "TotalCharges",
        "SeniorCitizen",
      ].includes(name)
        ? Number(value)
        : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setPrediction(null);

    try {
      console.log("Sending Data:", formData); // Debug log

      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      const result = await response.json();
      setPrediction(result);
    } catch (error) {
      console.error("Error predicting:", error);
      alert("Failed to connect to the API");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2>Telco Churn Predictor</h2>

      <form
        onSubmit={handleSubmit}
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}
      >
        {/* --- Demographics --- */}
        <div>
          <label>Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            style={{ width: "100%" }}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div>
          <label>Senior Citizen</label>
          <select
            name="SeniorCitizen"
            value={formData.SeniorCitizen}
            onChange={handleChange}
            style={{ width: "100%" }}
          >
            <option value={0}>No</option>
            <option value={1}>Yes</option>
          </select>
        </div>

        <div>
          <label>Partner</label>
          <select
            name="Partner"
            value={formData.Partner}
            onChange={handleChange}
            style={{ width: "100%" }}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div>
          <label>Dependents</label>
          <select
            name="Dependents"
            value={formData.Dependents}
            onChange={handleChange}
            style={{ width: "100%" }}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        {/* --- Services --- */}
        <div>
          <label>Tenure (Months)</label>
          <input
            type="number"
            name="tenure"
            value={formData.tenure}
            onChange={handleChange}
            style={{ width: "100%" }}
          />
        </div>

        <div>
          <label>Phone Service</label>
          <select
            name="PhoneService"
            value={formData.PhoneService}
            onChange={handleChange}
            style={{ width: "100%" }}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div>
          <label>Multiple Lines</label>
          <select
            name="MultipleLines"
            value={formData.MultipleLines}
            onChange={handleChange}
            style={{ width: "100%" }}
          >
            <option value="No phone service">No phone service</option>
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>

        <div>
          <label>Internet Service</label>
          <select
            name="InternetService"
            value={formData.InternetService}
            onChange={handleChange}
            style={{ width: "100%" }}
          >
            <option value="DSL">DSL</option>
            <option value="Fiber optic">Fiber optic</option>
            <option value="No">No</option>
          </select>
        </div>

        <div>
          <label>Online Security</label>
          <select
            name="OnlineSecurity"
            value={formData.OnlineSecurity}
            onChange={handleChange}
            style={{ width: "100%" }}
          >
            <option value="No internet service">No internet service</option>
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>

        <div>
          <label>Online Backup</label>
          <select
            name="OnlineBackup"
            value={formData.OnlineBackup}
            onChange={handleChange}
            style={{ width: "100%" }}
          >
            <option value="No internet service">No internet service</option>
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>

        <div>
          <label>Device Protection</label>
          <select
            name="DeviceProtection"
            value={formData.DeviceProtection}
            onChange={handleChange}
            style={{ width: "100%" }}
          >
            <option value="No internet service">No internet service</option>
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>

        <div>
          <label>Tech Support</label>
          <select
            name="TechSupport"
            value={formData.TechSupport}
            onChange={handleChange}
            style={{ width: "100%" }}
          >
            <option value="No internet service">No internet service</option>
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>

        <div>
          <label>Streaming TV</label>
          <select
            name="StreamingTV"
            value={formData.StreamingTV}
            onChange={handleChange}
            style={{ width: "100%" }}
          >
            <option value="No internet service">No internet service</option>
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>

        <div>
          <label>Streaming Movies</label>
          <select
            name="StreamingMovies"
            value={formData.StreamingMovies}
            onChange={handleChange}
            style={{ width: "100%" }}
          >
            <option value="No internet service">No internet service</option>
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>

        {/* --- Billing --- */}
        <div>
          <label>Contract</label>
          <select
            name="Contract"
            value={formData.Contract}
            onChange={handleChange}
            style={{ width: "100%" }}
          >
            <option value="Month-to-month">Month-to-month</option>
            <option value="One year">One year</option>
            <option value="Two year">Two year</option>
          </select>
        </div>

        <div>
          <label>Paperless Billing</label>
          <select
            name="PaperlessBilling"
            value={formData.PaperlessBilling}
            onChange={handleChange}
            style={{ width: "100%" }}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div style={{ gridColumn: "span 2" }}>
          <label>Payment Method</label>
          <select
            name="PaymentMethod"
            value={formData.PaymentMethod}
            onChange={handleChange}
            style={{ width: "100%" }}
          >
            <option value="Electronic check">Electronic check</option>
            <option value="Mailed check">Mailed check</option>
            <option value="Bank transfer (automatic)">
              Bank transfer (automatic)
            </option>
            <option value="Credit card (automatic)">
              Credit card (automatic)
            </option>
          </select>
        </div>

        <div>
          <label>Monthly Charges ($)</label>
          <input
            type="number"
            name="MonthlyCharges"
            value={formData.MonthlyCharges}
            onChange={handleChange}
            style={{ width: "100%" }}
          />
        </div>

        <div>
          <label>Total Charges ($)</label>
          <input
            type="number"
            name="TotalCharges"
            value={formData.TotalCharges}
            onChange={handleChange}
            style={{ width: "100%" }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            gridColumn: "span 2",
            marginTop: "10px",
            padding: "15px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          {loading ? "Analyzing..." : "Predict Churn Risk"}
        </button>
      </form>

      {/* --- Results --- */}
      {prediction && (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            backgroundColor:
              prediction.prediction_value === 1 ? "#ffebee" : "#e8f5e9",
            border: "1px solid #ccc",
            borderRadius: "8px",
            textAlign: "center",
            color: "black",
          }}
        >
          <h3>Prediction Result</h3>
          <p style={{ fontSize: "1.2em" }}>
            {prediction.prediction_value === 1
              ? "⚠️ Customer is Likely to Churn"
              : "✅ Customer is Safe"}
          </p>
          <p>
            Probability:{" "}
            <strong>{(prediction.churn_probability * 100).toFixed(2)}%</strong>
          </p>
        </div>
      )}
    </div>
  );
}
