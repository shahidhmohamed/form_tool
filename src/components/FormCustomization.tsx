import React, { useState } from "react";
import { BiCube } from "react-icons/bi";
import { HiOutlineCircleStack } from "react-icons/hi2";
import { Link, useLocation } from "react-router-dom";
import { Draggable, DragDropContext, Droppable } from "react-beautiful-dnd";
import { RxCross2 } from "react-icons/rx";
import { IoIosPlayCircle, IoIosSettings } from "react-icons/io";

const FormCustomization: React.FC = () => {
  const location = useLocation();
  const form = location.state; // Retrieve form data from location state

  // State for form and fields
  const [formTitle, setFormTitle] = useState(
    form?.title || "Welcome to our form"
  );
  const [formDescription, setFormDescription] = useState(
    form?.description || "This is a description of the form"
  );
  const [formButtonText, setFormButtonText] = useState(
    form?.buttonText || "Start"
  );
  const [fields, setFields] = useState<
    { id: string; type: string; title: string; description: string }[]
  >([]);
  const [showFieldModal, setShowFieldModal] = useState(false);
  const [editingFieldId, setEditingFieldId] = useState<string | null>(null);
  const [selectedView, setSelectedView] = useState<"welcome" | string | null>(
    null // Start with no selection
  );

  const availableFields = ["Name", "Email", "Phone Number"]; // Extend this list if needed

  // Add field from modal
  const addField = (fieldType: string) => {
    const newFieldId = Date.now().toString(); // Simple unique ID based on timestamp
    const newField = {
      id: newFieldId,
      type: fieldType,
      title: `${fieldType} Field`,
      description: `This is a ${fieldType} field`,
    };
    setFields((prevFields) => [...prevFields, newField]);
    setEditingFieldId(newFieldId); // Set editing field
    setSelectedView(newFieldId); // Show field editor and preview
    setShowFieldModal(false); // Close the field modal
  };

  // Show editor for specific field
  const editField = (fieldId: string) => {
    setEditingFieldId(fieldId);
    setSelectedView(fieldId); // Show field details in the right panel
  };

  // Show editor for welcome section
  const editWelcome = () => {
    setEditingFieldId(null);
    setSelectedView("welcome");
  };

  const closeEditor = () => {
    setEditingFieldId(null);
    setSelectedView(null); // Clear the selected view
  };

  // Save changes made to the Welcome section
  const saveWelcome = () => {
    setSelectedView("welcome");
    closeEditor(); // Close editor after saving
  };

  // Handle drag end
  const handleOnDragEnd = (result: any) => {
    const { destination, source } = result;
    if (!destination) return;

    const reorderedFields = Array.from(fields);
    const [movedField] = reorderedFields.splice(source.index, 1);
    reorderedFields.splice(destination.index, 0, movedField);

    setFields(reorderedFields);
  };

  // Delete field
  const deleteField = (fieldId: string) => {
    setFields(fields.filter((field) => field.id !== fieldId));
    if (selectedView === fieldId) {
      setSelectedView(null); // Clear the selected view if deleted field is selected
      setEditingFieldId(null); // Clear the editor
    }
  };

  // Handle input change for field details
  const handleFieldChange = (
    fieldId: string,
    fieldType: "title" | "description",
    value: string
  ) => {
    setFields((prevFields) =>
      prevFields.map((field) =>
        field.id === fieldId ? { ...field, [fieldType]: value } : field
      )
    );
  };

  // Handle done click for editing fields
  const handleFieldDone = () => {
    closeEditor();
    setSelectedView(null); // Show the list of fields
  };

  return (
    <div className="flex flex-col md:flex-row">
      {/* Left section - Settings Panel */}
      <div className="w-full md:w-[25%] p-4 min-h-screen flex-shrink-0">
        {/* Hide the dashboard, breadcrumb, and steps when an editor is active */}
        {!selectedView && (
          <>
            <div className="text-sm mb-4 flex items-center justify-between">
              {/* Dashboard Link */}
              <div className="flex items-center font-semibold">
                <Link to="/" className="flex items-center text-gray-400">
                  <BiCube className="mr-2" /> Dashboard
                </Link>

                {/* Breadcrumb separator and current form name */}
                <span className="mx-2 font-semibold">&gt;</span>
                <span className="font-semibold">
                  {form?.title || "Untitled Form"}
                </span>
              </div>
              <IoIosSettings className="text-2xl" />
            </div>

            <div>
              <div className="flex items-center mt-6 text-s">
                <HiOutlineCircleStack className="mr-2" /> {/* Icon */}
                <span className="font-bold">Steps</span>
              </div>
              <span className="text-gray-500 text-[12px]">
                The steps users will take to complete the form
              </span>
            </div>
          </>
        )}

        {/* Editors */}
        <div className="mb-4 mt-5">
          {/* Show either the welcome section editor, field editor, or nothing */}
          {selectedView === "welcome" && (
            <div>
              {/* Welcome Section Editor */}
              <div>
                <div className="mb-4">
                  <label className="block text-sm mb-1">Title</label>
                  <input
                    type="text"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="p-2 w-full"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm mb-1">Description</label>
                  <textarea
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    className="p-2 w-full"
                  ></textarea>
                </div>

                <div className="mb-4">
                  <label className="block text-sm mb-1">Button Text</label>
                  <input
                    type="text"
                    value={formButtonText}
                    onChange={(e) => setFormButtonText(e.target.value)}
                    className="p-2 w-full"
                  />
                </div>

                <button
                  className="bg-black text-white py-2 px-4 rounded mb-4"
                  onClick={saveWelcome}
                >
                  Done
                </button>
              </div>
            </div>
          )}

          {/* Field Editor */}
          {editingFieldId && (
            <div>
              {fields
                .filter((field) => field.id === editingFieldId)
                .map((field) => (
                  <div key={field.id}>
                    <div className="mb-4">
                      <label className="block text-sm mb-1">Field Title</label>
                      <input
                        type="text"
                        value={field.title}
                        onChange={(e) =>
                          handleFieldChange(field.id, "title", e.target.value)
                        }
                        className="p-2 w-full"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm mb-1">
                        Field Description
                      </label>
                      <textarea
                        value={field.description}
                        onChange={(e) =>
                          handleFieldChange(
                            field.id,
                            "description",
                            e.target.value
                          )
                        }
                        className="p-2 w-full"
                      ></textarea>
                    </div>

                    <button
                      className="bg-black text-white py-2 px-4 rounded mb-4"
                      onClick={handleFieldDone}
                    >
                      Done
                    </button>
                  </div>
                ))}
            </div>
          )}

          {/* Display fields only if no editor is open */}
          {!selectedView && (
            <>
              {/* Welcome Section Button */}
              <div
                className="cursor-pointer text-sm mb-2 bg-slate-100 rounded-lg text-center w-full flex items-center justify-start h-10 mx-0 hover:bg-slate-200"
                onClick={editWelcome}
              >
                <button className="p-2">
                  <IoIosPlayCircle />
                </button>
                <span className="text-center w-full">Welcome Screen</span>
              </div>

              {/* Draggable Field List */}
              <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="field-list">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="space-y-2"
                    >
                      {fields.map((field, index) => (
                        <Draggable
                          key={field.id}
                          draggableId={field.id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                              className="flex items-center justify-between text-sm mb-2 bg-slate-100 rounded-lg text-center w-full h-10 mx-0"
                              onClick={() => editField(field.id)}
                            >
                              <span className="p-2">{field.title}</span>
                              <button
                                className="p-2"
                                onClick={() => deleteField(field.id)}
                              >
                                <RxCross2 />
                              </button>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </>
          )}
        </div>

        {/* Add Field Button */}
        <div className="bg-black text-white text-center py-2 px-4 rounded mt-2">
          <button onClick={() => setShowFieldModal(true)}>Add Field</button>
        </div>

        {/* Modal for selecting new field type */}
        {showFieldModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded">
              <h3 className="text-xl mb-4">Select Field Type</h3>
              <ul>
                {availableFields.map((fieldType) => (
                  <li
                    key={fieldType}
                    className="cursor-pointer py-2"
                    onClick={() => addField(fieldType)}
                  >
                    {fieldType}
                  </li>
                ))}
              </ul>
              <button
                className="mt-4 bg-black text-white py-2 px-4 rounded"
                onClick={() => setShowFieldModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Right section - Form Preview */}
      <div className="w-full md:w-[75%] bg-black p-4 rounded-2xl mt-5 mb-5 mr-2 flex-grow">
        {/* Conditional rendering for the right side */}
        {(!selectedView || selectedView === "welcome") && (
          <div className="p-4 mt-5">
            {/* Added top margin to move output slightly down */}
            <h2 className="text-xl font-bold text-white">{formTitle}</h2>
            <p className="text-white">{formDescription}</p>
            <button className="bg-blue-500 text-white py-2 px-4 rounded mt-4">
              {formButtonText}
            </button>
          </div>
        )}

        {selectedView && selectedView !== "welcome" && (
          <div className="p-4 mt-5">
            {/* Added top margin here too */}
            <h2 className="text-xl font-bold text-white">
              {fields.find((field) => field.id === selectedView)?.title}
            </h2>
            <p className="text-white">
              {fields.find((field) => field.id === selectedView)?.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormCustomization;
