import { useState } from "react";
import "./App.css";
import MarkdownRenderer from "./MarkdownRenderer";

function App() {
  const [markdown, setMarkdown] = useState("");

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    if (file && file.name.endsWith(".md")) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const result = ev.target?.result;
        if (typeof result === "string") setMarkdown(result);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col items-center space-y-2">
        <label className="font-semibold text-lg">Upload Markdown File</label>
        <div>
          <input
            type="file"
            accept=".md"
            onChange={handleUpload}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cusrsor:pointer"
          />
        </div>
      </div>

      {markdown && (
        <div className="border border-gray-300 rounded-lg p-6 shadow-sm">
          <MarkdownRenderer key={markdown} content={markdown} />
        </div>
      )}
    </div>
  );
}

export default App;
