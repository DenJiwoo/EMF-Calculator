import React, { useState } from "react";

export default function AIChat() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [isHover, setIsHover] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("http://localhost:8000/api/ask-ai/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();
      setResponse(data.response);
    } catch (error) {
      setResponse("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="ai-chat-container"
      style={{ display: "flex", flexDirection: "column", height: "100%" }}
    >
      <h1>🤖 Buzz the Bot!</h1>
      <form onSubmit={handleSubmit} style={{ flexShrink: 0 }}>
        <textarea
          placeholder="Prompt thee your electrifying question!"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={6}
          style={{
            width: "100%",
            padding: "0.75rem",
            fontSize: "1.125rem",
            borderRadius: "0.375rem",
            border: "1px solid #D4C9BE",
            resize: "vertical",
            color: "#123458",
            boxSizing: "border-box",
            fontFamily: "inherit",
            backgroundColor: "#F1EFEC",
          }}
        />
        <button
          type="submit"
          disabled={loading}
          onMouseEnter={() => !loading && setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          style={{
            marginTop: "1rem",
            backgroundColor: isHover ? "#123458" : "#4A5C8A", 
            color: "#F1EFEC",
            fontWeight: "700",
            fontSize: "1.125rem",
            border: "none",
            borderRadius: "0.375rem",
            cursor: loading ? "not-allowed" : "pointer",
            padding: "0.6rem 1.2rem",
            transition: "background-color 0.3s ease",
          }}
        >
          {loading ? "Thinking..." : "Submit"}
        </button>
      </form>
      {response && (
        <pre
          style={{
            marginTop: "1.5rem",
            backgroundColor: "#F1EFEC",
            border: "1px solid #D4C9BE",
            borderRadius: "0.5rem",
            padding: "1rem",
            color: "#123458",
            whiteSpace: "pre-wrap",
            flexGrow: 1,
            overflowY: "auto",
            fontSize: "1.125rem",
            fontFamily: "monospace",
          }}
        >
          {response}
        </pre>
      )}
    </div>
  );
}
