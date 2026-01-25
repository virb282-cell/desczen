import Razorpay from "razorpay";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { amount } = req.body; // paise me, e.g. 19900

    if (!amount) {
      return res.status(400).json({ error: "Amount is required" });
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET
    });

    const options = {
      amount: amount,
      currency: "INR",
      receipt: "deskzen_rcpt_001",
      payment_capture: 1
    };

    const order = await razorpay.orders.create(options);

    return res.status(200).json(order);
  } catch (err) {
    console.error("Razorpay order error:", err);
    return res.status(500).json({ error: "Unable to create order" });
  }
}
