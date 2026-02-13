import React, { useState, useRef } from "react";

const Dropdown = ({ options, onSelect, selectedValue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const handleOptionClick = (optionObj) => {
    onSelect(optionObj.value); // Pass the value property of the option object to the callback
    setIsOpen(false);
  };
  
  const toggleDropdown = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-3/12" ref={dropdownRef}>
      <button className="p-2 overflow-y-auto rounded-lg bg-zinc-400/20" onClick={toggleDropdown}>
        {selectedValue?.option || "Select an option"}
      </button>
      {isOpen && (
        <div className="rounded-lg dropdown-menu bg-zinc-700">
          {options.map((optionObj, index) => (
            <div
              className="dropdown-item"
              key={optionObj.id}
              onClick={() => handleOptionClick(optionObj)}
            >
              {optionObj.option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;