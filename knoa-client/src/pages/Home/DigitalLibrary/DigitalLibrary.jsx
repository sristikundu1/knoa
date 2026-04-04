import React from "react";

const DigitalLibrary = () => {
  const books = [
    { title: "React Cheat Sheet", type: "PDF", size: "1.2 MB" },
    { title: "Node.js Best Practices", type: "E-Book", size: "4.5 MB" },
  ];
  return (
    <div className="max-w-7xl mx-auto py-20 px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {books.map((book, i) => (
          <div
            key={i}
            className="p-6 bg-white border border-gray-100 rounded-3xl hover:shadow-xl transition-shadow text-center"
          >
            <div className="w-16 h-16 bg-[#39b8ad]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-[#39b8ad] font-black text-xs">
                {book.type}
              </span>
            </div>
            <h5 className="font-bold text-gray-800 mb-1">{book.title}</h5>
            <p className="text-gray-400 text-xs mb-4">{book.size}</p>
            <button className="text-[#0077b6] text-sm font-bold hover:underline">
              Download Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DigitalLibrary;
