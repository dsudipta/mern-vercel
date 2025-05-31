
import { Navigate } from "react-router-dom";

const Index = () => {
  // Simply redirect to the landing page
  return <Navigate to="/" replace />;
};

export default Index;
