import React, { useState } from "react";

interface FormCreateProps {
  onClose: () => void;
  onAddForm: (title: string, description: string, buttonText: string) => void;
}

const FormCreate: React.FC<FormCreateProps> = ({ onClose, onAddForm }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [buttonText, setButtonText] = useState("");

  const handleSubmit = () => {
    onAddForm(title, description, buttonText);
    onClose();
  };

  return (
    <div className="p-4 border bg-white rounded">
      <h2 className="text-xl font-bold mb-4">Create New Form</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="block mb-2 p-2 border border-gray-300 rounded"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="block mb-2 p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        value={buttonText}
        onChange={(e) => setButtonText(e.target.value)}
        placeholder="Button Text"
        className="block mb-2 p-2 border border-gray-300 rounded"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Add Form
      </button>
      <button
        onClick={onClose}
        className="bg-gray-300 text-black py-2 px-4 rounded ml-2"
      >
        Cancel
      </button>
    </div>
  );
};

export default FormCreate;
