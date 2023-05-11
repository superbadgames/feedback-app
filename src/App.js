import { useState } from "react";
import Header from "./Components/Header";
import FeedbackList from "./Components/FeedbackList";
import MockFeedbackData from "./MockData/MockFeedbackData";

function App() {
  const [feedback, setFeedback] = useState(MockFeedbackData);

  return (
    <>
      <Header />
      <div className="container">
        <FeedbackList feedback={feedback} />
      </div>
    </>
  );
}

export default App;
