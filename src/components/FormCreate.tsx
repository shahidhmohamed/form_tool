import React, { useState } from "react";

interface FormCreateProps {
  onClose: () => void;
  onAddForm: (title: string) => void;
}

const FormCreate: React.FC<FormCreateProps> = ({ onClose, onAddForm }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = () => {
    if (title.trim()) {
      onAddForm(title);
      onClose();
    }
  };

  return (
    <div className="mt-6 bg-white p-6 rounded shadow-md max-w-lg w-full">
      <h2 className="text-xl font-semibold mb-4">Create a Form</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border rounded px-4 py-2 mb-4 w-full"
        placeholder="Form Title"
      />
      <div className="flex justify-end space-x-4">
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Create
        </button>
        <button
          onClick={onClose}
          className="bg-gray-300 text-black py-2 px-4 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default FormCreate;
