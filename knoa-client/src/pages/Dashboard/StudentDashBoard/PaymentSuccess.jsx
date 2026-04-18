import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionId) {
      // 1. Confirm payment & Save enrollment in DB
      axiosSecure
        .post("/verify-payment", { sessionId })
        .then((res) => {
          if (res.data.success) {
            // 2. Show the success alert
            Swal.fire({
              icon: "success",
              title: "Payment Confirmed!",
              text: "Your request is pending admin approval.",
              confirmButtonColor: "#03b4d8",
            }).then(() => {
              navigate("/dashboard/my-enrollments");
            });
          }
        })
        .catch((err) => {
          console.error("Verification failed", err);
          Swal.fire("Error", "We couldn't verify your payment.", "error");
        });
    }
  }, [sessionId, axiosSecure, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#39B8AD] mb-4"></div>
      <h2 className="text-2xl font-bold text-[#03045e]">
        Verifying Payment...
      </h2>
      <p className="text-gray-500">Please do not close this window.</p>
    </div>
  );
};

export default PaymentSuccess;
