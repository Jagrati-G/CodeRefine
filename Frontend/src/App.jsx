import React, { useState, useEffect } from 'react';
import "prismjs/themes/prism-tomorrow.css";
import prism from "prismjs";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import "highlight.js/styles/github-dark.css";
import axios from 'axios';
import './App.css';

// 1. Is line ko dhyan se copy-paste kar
import EditorComponent from "react-simple-code-editor";
const Editor = EditorComponent.default || EditorComponent;

function App() {
  const [code, setCode] = useState(`function sum() {
  return a + b;
}`);


  const [review, setReview] = useState(``);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    prism.highlightAll();
  }, []);

  async function reviewCode() {
    setLoading(true); // Button par "Wait..." dikhna shuru ho jayega
    setReview("");    // Purana review saaf kar do taaki nayi loading feel ho (Optional)

    try {
      const response = await axios.post('https://coderefine-umfb.onrender.com/ai/get-review', { code });
      setReview(response.data);
    } catch (err) {
      console.error("Error fetching review:", err);
      setReview("❌ Failed to get review. Please try again.");
    } finally {
      setLoading(false); // Success ho ya error, loading band karni hai
    }
  }

  return (
    <div className="app-wrapper"> {/* Pura project isme rahega */}

      <header className="navbar">
        <h1 className="brand-logo">Code<span>Refine</span></h1>
      </header>

      <main>
        <div className="left">
          <div className="code"> {/* Is CSS class mein scrollbar aayega */}
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => prism.highlight(code, prism.languages.javascript, 'javascript')}
              padding={20}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                minHeight: "100%", // Ye line add karo
                backgroundColor: "transparent" // Taaki div ka background dikhe
              }}
            />
          </div>
          <div
            onClick={loading ? null : reviewCode}
            className="review"
            style={{ opacity: loading ? 0.7 : 1, cursor: loading ? "not-allowed" : "pointer" }}
          >
            {loading ? "Reviewing..." : "Review"}
          </div>
        </div>

        <div className="right">
          {review ? (
            <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
              {review}
            </ReactMarkdown>
          ) : (
            <div className="empty-state">
              <p>Response will appear here...</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}




export default App;