import { useState } from "react";

const TicketPurchase = ({ event }) => {
  const [quantity, setQuantity] = useState(1);

  const handlePurchase = () => {
    alert(`You selected ${quantity} ticket(s) for ${event.title}.`);
  };

  return (
    <div className="bg-white shadow-md p-4 rounded-lg">
      <h3 className="text-xl font-bold">{event.title}</h3>
      <p>Price: ${event.price}</p>
      <div className="mt-2">
        <label className="mr-2">Quantity:</label>
        <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="border p-1 w-16" min="1" />
      </div>
      <button onClick={handlePurchase} className="mt-2 bg-green-500 text-white px-4 py-2">Proceed to Payment</button>
    </div>
  );
};

export default TicketPurchase;
