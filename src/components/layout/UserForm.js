"use client";
import { useState } from "react";
import { useProfile } from "../UseProfile";
import UploadImage from "@/components/layout/UploadImage";
import AddressInputs from "@/components/layout/AddressInputs";

export default function UserForm({ user, onSave }) {
  const [userName, setUserName] = useState(user?.name || "");
  const [image, setImage] = useState(user?.image || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [streetAddress, setStreetAddress] = useState(user?.streetAddress || "");
  const [postalCode, setPostalCode] = useState(user?.postalCode || "");
  const [city, setCity] = useState(user?.city || "");
  const [country, setCountry] = useState(user?.country || "");
  const [admin, setAdmin] = useState(user?.admin || "");
  const { data: loggedInUserData } = useProfile();

  function handleAddressChange(propName, value) {
    if (propName === "phone") setPhone(value);
    if (propName === "streetAddress") setStreetAddress(value);
    if (propName === "postalCode") setPostalCode(value);
    if (propName === "city") setCity(value);
    if (propName === "country") setCountry(value);
  }
  return (
    <div className="flex gap-4">
      <div>
        <div className="p-2 rounded-lg relative max-w-[300px]">
          {image && <img src={image} alt="Uploaded" />}
          <UploadImage onImageUpload={setImage} />
        </div>
      </div>
      <form
        className="grow"
        onSubmit={(ev) =>
          onSave(ev, {
            name: userName,
            image,
            phone,
            streetAddress,
            city,
            country,
            postalCode,
            admin,
          })
        }
      >
        <label>First and last name</label>
        <input
          className="mt-[-2px]"
          type="text"
          placeholder="First and last name"
          value={userName}
          onChange={(ev) => setUserName(ev.target.value)}
        />

        <label>Email</label>
        <input placeholder="email" type="email" disabled value={user.email} />

        <AddressInputs
          addressProps={{ phone, streetAddress, postalCode, city, country }}
          setAddressProps={handleAddressChange}
        />
        {loggedInUserData.admin && (
          <div>
            <label
              className="p-2 inline-flex items-center gap-2 mb-2"
              htmlFor="adminCb"
            >
              <input
                id="adminCb"
                type="checkbox"
                className=""
                value={"1"}
                checked={admin}
                onClick={(ev) => setAdmin(ev.target.checked)}
              />
              <span>Admin</span>
            </label>
          </div>
        )}
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
