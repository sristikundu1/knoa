import React from "react";

const CertificateVerify = () => {
  return (
    <div className="max-w-2xl mx-auto py-20 px-6 text-center">
      <div className="bg-[#03045e] p-12 rounded-[40px] text-white shadow-2xl">
        <h2 className="text-3xl font-bold mb-4">Verify Credentials</h2>
        <p className="text-blue-200 mb-8">
          Enter the unique ID found on the bottom of the Knoa certificate.
        </p>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="KNOA-1234-5678"
            className="flex-1 px-6 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-[#39b8ad]"
          />
          <button className="bg-[#39b8ad] hover:bg-[#2fa399] px-8 py-4 rounded-2xl font-bold transition-transform active:scale-95">
            Verify Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CertificateVerify;
