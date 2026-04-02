import React from "react";

const CourseFilter = ({ title, items, activeItem, onSelect }) => {
  return (
    <div>
      <div>
        <h4 className="text-lg font-black text-slate-800 mb-4 border-b border-slate-100 pb-2">
          {title}
        </h4>
        <ul className="space-y-3">
          {items.map((item) => (
            <li
              key={item}
              onClick={() => onSelect(item)} // When clicked, it calls setCategory/setLevel/setPrice
              className={`flex items-center gap-2 text-sm font-medium cursor-pointer transition-colors ${
                activeItem === item
                  ? "text-[#00b4d8]"
                  : "text-slate-600 hover:text-[#00b4d8]"
              }`}
            >
              <span
                className={
                  activeItem === item ? "text-[#00b4d8]" : "text-slate-300"
                }
              >
                ▶
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CourseFilter;
