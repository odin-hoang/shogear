type ActionData = {
  name1: string;
  name2: string;
  icon: string;
};
const Action = (data: ActionData) => {
  return (
    <div className="ml-5 flex cursor-pointer space-x-3 align-middle">
      <div className="w-[18px]">
        <img src={data.icon} className=" h-[36px] w-[18px]"></img>
      </div>
      <div className="flex hidden  w-[60px] flex-col font-sf text-xs font-semibold  text-white lg:block">
        <div className="mb-0.5">{data.name1}</div>
        <div>{data.name2}</div>
      </div>
    </div>
  );
};
export default Action;
