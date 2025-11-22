// frontend/src/Dashboard.tsx
import { useEffect, useState } from "react";

// 1. Define the shape of the data we expect from the Python API
interface ChurnPrediction {
  customerId: string;
  riskScore: number;
  status: "Likely to Churn" | "Safe";
}

function Dashboard() {
  // 2. State for handling data, loading status, and errors
  const [predictions, setPredictions] = useState<ChurnPrediction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 3. Simulate fetching data from the API on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // --- REAL API CALL WOULD GO HERE ---
        // const response = await fetch('http://localhost:5000/api/predictions');
        // const data = await response.json();

        // --- MOCKED DATA FOR NOW ---
        console.log("Simulating API call...");
        await new Promise((resolve) => setTimeout(resolve, 1500)); // Wait 1.5s
        const mockData: ChurnPrediction[] = [
          {
            customerId: "CUST-001",
            riskScore: 0.95,
            status: "Likely to Churn",
          },
          { customerId: "CUST-002", riskScore: 0.15, status: "Safe" },
          {
            customerId: "CUST-003",
            riskScore: 0.78,
            status: "Likely to Churn",
          },
        ];
        // ------------------------------------

        setPredictions(mockData);
      } catch (err) {
        setError("Failed to fetch predictions.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 4. Render based on state
  if (loading) return <div style={{ padding: 20 }}>Loading Dashboard...</div>;
  if (error)
    return <div style={{ color: "red", padding: 20 }}>Error: {error}</div>;

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Churn Prediction Dashboard</h1>
      <table
        border={1}
        cellPadding={10}
        style={{ borderCollapse: "collapse", width: "100%" }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f0f0f0", color: "black" }}>
            <th>Customer ID</th>
            <th>Risk Score</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {predictions.map((pred) => (
            <tr key={pred.customerId}>
              <td>{pred.customerId}</td>
              <td>{(pred.riskScore * 100).toFixed(0)}%</td>
              <td
                style={{
                  color: pred.status === "Likely to Churn" ? "red" : "green",
                  fontWeight: "bold",
                }}
              >
                {pred.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
