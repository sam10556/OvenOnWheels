import { useState } from "react";
import Trash from "@/components/icons/Trash";
import Plus from "@/components/icons/Plus";
import ChevronDown from "@/components/icons/ChevronDown";
import ChevronUp from "@/components/icons/ChevronUp";

export default function MenuItemsPriceProps({
  name,
  addLabel,
  props,
  setProps,
}) {
  const [isOpen, setIsOpen] = useState(false);
  function addProps() {
    setProps((oldProps) => {
      return [...oldProps, { name: "", price: 0 }];
    });
  }

  function editProps(ev, index, prop) {
    const newValue = ev.target.value;
    setProps((prevSizes) => {
      const newSizes = [...prevSizes];
      newSizes[index][prop] = newValue;
      return newSizes;
    });
  }

  function removeProps(indexToRemove) {
    setProps((prev) => prev.filter((v, index) => index !== indexToRemove));
  }
  return (
    <div className="bg-gray-200 p-2 rounded-md mb-2">
      <button
        type="button"
        onClick={()=>setIsOpen(prev => !prev)}
        className="inline-flex border-0 justify-start gap-3 p-1"
      >
        {isOpen && <ChevronUp />}
        {!isOpen && <ChevronDown />}
        <span>{name}</span>
        <span>({props?.length})</span>
      </button>
      <div className={isOpen ? 'block' : 'hidden'}>

      {props?.length > 0 &&
        props.map((size, index) => (
          <div className="flex items-end gap-2">
            <div>
              <label>Name</label>
              <input
                type="text"
                placeholder="Size name"
                value={size.name}
                onChange={(ev) => editProps(ev, index, "name")}
              />
            </div>
            <div>
              <label>Extra price</label>
              <input
                type="text"
                placeholder="Extra Price"
                value={size.price}
                onChange={(ev) => editProps(ev, index, "price")}
              />
            </div>
            <div>
              <button
                type="button"
                onClick={() => removeProps(index)}
                className="bg-white mb-2 px-2"
              >
                <Trash />
              </button>
            </div>
          </div>
        ))}
      <button
        type="button"
        onClick={addProps}
        className="bg-white items-center gap-2 justify-center flex"
      >
        <Plus className="w-4 h-4" />
        <span>{addLabel}</span>
      </button>
      </div>
    </div>
  );
}
