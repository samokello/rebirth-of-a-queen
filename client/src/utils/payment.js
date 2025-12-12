 
 export const handlePaystackPayment = async (email, customAmount,selectedAmount, donationSettings,setLoading, buildApiUrl,firstName,lastName) => {
    if (!email) return alert("Email is required.");
    setLoading(true);
    try {
      const amount = parseFloat(customAmount || selectedAmount || donationSettings.defaultAmount || 10);
      const res = await fetch(buildApiUrl('payment/initialize'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          email,
          firstName,
          lastName,
          currency: 'KES'
        })

      });
      const data = await res.json();
      if (data.status) {
        window.location.href = data.authorization_url;
      } else {
        alert(`Payment initialization failed: ${data.message}`);
      }
              console.log(data)

    } catch (err) {
      console.error(err);
      alert("Error connecting to Paystack.");
    } finally {
      setLoading(false);
    }
  };
