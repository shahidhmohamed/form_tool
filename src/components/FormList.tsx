import React from "react";
import { useNavigate } from "react-router-dom";

interface FormListProps {
  forms: { title: string }[]; // Adjusted to match the structure passed from FormDashboard
}

const FormList: React.FC<FormListProps> = ({ forms }) => {
  const navigate = useNavigate();

  const handleFormClick = (form: { title: string }) => {
    // Navigate to the customize page with form data
    navigate(`/customize/${form.title}`, { state: form });
  };

  return (
    <div className="w-full max-w-md">
      {forms.map((form, index) => (
        <div
          key={index}
          className="border p-4 mb-2 cursor-pointer"
          onClick={() => handleFormClick(form)}
        >
          {form.title}
        </div>
      ))}
    </div>
  );
};

export default FormList;
