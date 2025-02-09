// import React from "react";
// import { useNavigate } from "react-router-dom";
// import APNI1 from "../assets/APNI1.png";

// const Payment = () => {
//     const navigate = useNavigate();

//     const handlePayment = (method) => {
//         alert(`Payment successful with ${method}!`);
//         navigate("/home");  // Redirect back to home after payment
//     };

//     return (
//         <div className="h-screen flex flex-col justify-center items-center bg-green-200">
//             <img src={APNI1} alt="Logo" className="w-16 absolute top-2 left-3 z-10" />
//             <h2 className="text-2xl font-bold mb-4">Select Payment Method</h2>
            
//             <button
//                 className="w-64 p-4 mb-4 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition"
//                 onClick={() => handlePayment("Cash")}
//             >
//                 Pay with Cash
//             </button>

//             <button
//                 className="w-64 p-4 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition"
//                 onClick={() => handlePayment("UPI")}
//             >
//                 Pay with UPI
//             </button>

//             <button
//                 className="mt-4 text-red-500"
//                 onClick={() => navigate("/home")}
//             >
//                 Cancel & Go Back
//             </button>
//         </div>
//     );
// };

// export default Payment;
