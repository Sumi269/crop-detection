import { useState } from "react";

export default function UploadBox({ onUpload }) {
  const [file, setFile] = useState(null);

  const handleUpload = () => {
    if (!file) return;
    onUpload(file);
  };

  return (
    <div className="p-4 border rounded">
      <input
        type="file"
        accept="image/jpeg,image/png"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button
        onClick={handleUpload}
        className="bg-green-500 text-white px-4 py-2 mt-2"
      >
        Upload
      </button>
    </div>
  );
}