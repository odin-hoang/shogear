import { FaBars } from "react-icons/fa";
import Icons from "../../assets/icons";
import Action from "./action";
const Header = () => {
  const listActions = [
    {
      icon: Icons.headphone,
      name1: "Hotline",
      name2: "1800.6975",
    },
    {
      icon: Icons.showroom,
      name1: "Hệ thống",
      name2: "Showroom",
    },
    {
      icon: Icons.order,
      name1: "Tra cứu",
      name2: "đơn hàng",
    },
    {
      icon: Icons.shopcart,
      name1: "Giỏ",
      name2: "hàng",
    },
  ];
  return (
    <div className="flex bg-primary-default p-3">
      <div className="my-auto text-white ">
        <FaBars className="h-6 w-6" />
      </div>
      <div className="logo my-auto ml-4">
        <img
          src="https://file.hstatic.net/200000636033/file/logo-mobile_1e5b7fc485b24cf985b3d63cfa1f88be.svg"
          className=" w-[40px]"
        ></img>
      </div>
      <div className="search ml-4 flex h-10 w-full rounded border bg-white">
        <input
          className="font-italic placeholder:text-placeholder text-placeholder pl-2 font-sf text-sm outline-none"
          placeholder="Bạn cần tìm gì?"
        ></input>
        <span></span>
      </div>
      <div className="actions flex w-auto align-bottom">
        {listActions.map((item, index) => {
          return (
            <Action
              name1={item.name1}
              name2={item.name2}
              icon={item.icon}
              key={index}
            />
          );
        })}
        <div className="shopcart bg-primary-900 my-auto ml-4 h-10 w-10 rounded align-middle">
          <img
            src={Icons.shopcart}
            className="mx-auto my-auto h-[36px] w-[18px]"
          ></img>
        </div>
      </div>
    </div>
  );
};
export default Header;
