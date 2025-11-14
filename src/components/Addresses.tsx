import { useEffect, useState } from "react";

interface AddressType {
  street: string;
}
const Addresses = () => {
  let [addresses, setAddresses] = useState<AddressType[]>([]);

  useEffect(() => {
    const adr = [{ street: "street1" }, { street: "street2" }];
    setAddresses(adr);
    console.log("get Adresses");
  }, []);
  return (
    <div className="w-full p-4">
      <h2 className="text-2xl pl-4">
        {addresses.length > 0 ? "Adresses" : "No Adresses"}
      </h2>
      {addresses.map((address) => (
        <p>Street: {address.street}</p>
      ))}
    </div>
  );
};

export default Addresses;
