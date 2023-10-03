import { Menu } from "@headlessui/react";
import { Fragment } from "react";
import Image from "next/image";
type Props = {
  label: string;
  filters: Array<string>;
  state: string;
  setState: (e: string) => void;
};
export default function CustomMenu({ label, filters, state, setState }: Props) {
  return (
    <div className="flexStart flex-col w-full gap-7 relative">
      <label htmlFor={label} className="w-full text-gray-100">
        {label}
      </label>
      <Menu as="div" className="self-start relative">
        <div>
          <Menu.Button className="flexCenter custom_menu-btn">
            {state || `Select ${label}`}
            <Image
              src="/arrow-down.svg"
              width={10}
              height={5}
              alt="arrow down"
            />
          </Menu.Button>
          <Menu.Items className="flexStart custom_menu-items">
            {filters.map((tag) => {
              return (
                <Menu.Item key={tag}>
                  <button
                    type="button"
                    className="custom_menu-item"
                    value={tag}
                    onClick={(e) => {
                      setState(e.currentTarget.value);
                    }}
                  >
                    {tag}
                  </button>
                </Menu.Item>
              );
            })}
          </Menu.Items>
        </div>
      </Menu>
    </div>
  );
}
