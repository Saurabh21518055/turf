document.addEventListener("DOMContentLoaded", async ()=>{
  const bookingId = urlParam("bookingId");
  const amount = Number(urlParam("amount")||0);
  if(!bookingId) return location.href="index.html";

  qs("#bkId").textContent = bookingId;
  qs("#amount").textContent = formatINR(amount);

  qs("#btnPay").addEventListener("click", startPayment);

  async function startPayment(){
    // ask backend to create gateway order
    // const { orderId, publicKey, amountInPaise } = await api(`/payments/create-order`, { method:"POST", body:{ bookingId }});
    // Razorpay sample:
    const options = {
      key: "rzp_test_PUBLIC_KEY", // replace with backend-provided key
      amount: amount * 100,
      currency: "INR",
      name: "TurfBook",
      description: `Booking ${bookingId}`,
      handler: () => {
        // final truth via webhook; optimistic redirect:
        location.href = `booking-confirmation.html?bookingId=${bookingId}`;
      }
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  }
});
