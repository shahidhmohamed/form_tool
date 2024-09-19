import React, { useState } from "react";
import FormList from "./FormList";
import FormCreate from "./FormCreate";

const FormDashboard: React.FC = () => {
  const [forms, setForms] = useState<{ title: string }[]>([]);
  const [showFormCreate, setShowFormCreate] = useState(false);

  const addForm = (title: string) => {
    setForms([...forms, { title }]);
  };

  return (
    <div className="flex flex-col items-center p-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Hey Mohamed 👋</h1>

      <button
        onClick={() => setShowFormCreate(true)}
        className="bg-black text-white py-2 px-4 rounded mb-4"
      >
        + New Form
      </button>

      {showFormCreate && (
        <FormCreate
          onClose={() => setShowFormCreate(false)}
          onAddForm={addForm}
        />
      )}

      <FormList forms={forms} />
    </div>
  );
};

export default FormDashboard;
