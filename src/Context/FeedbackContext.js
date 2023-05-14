import { createContext, useState, useEffect } from "react";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([]);
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchFeedback();
  }, []);

  // delete feedback item
  const handleDeleteFeedback = async (id) => {
    if (window.confirm("Are you sure?")) {
      await fetch(`/feedback/${id}`, { method: "DELETE" });

      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };

  // Fetch feedback
  const fetchFeedback = async () => {
    const resp = await fetch(`/feedback?_sort=id&_order=desc`);

    const data = await resp.json();
    setFeedback(data);
    setIsLoading(false);
  };

  // Add new feedback item
  const handleAddFeedback = async (newFeedback) => {
    const resp = await fetch("/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFeedback),
    });

    const data = await resp.json();

    setFeedback([data, ...feedback]);
  };

  // Set item to be updated
  const handleEditFeedback = (item) => {
    setFeedbackEdit({ item, edit: true });
  };

  const handleUpdateFeedback = async (id, updatedItem) => {
    const resp = await fetch(`/feedback/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedItem),
    });

    const data = await resp.json();

    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...data } : item))
    );
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        isLoading,
        handleDeleteFeedback,
        handleAddFeedback,
        handleEditFeedback,
        handleUpdateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
