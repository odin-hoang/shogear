type ActionData = {
    name1: string;
    name2: string;
    icon: string;
    count?: number;
};
const Action = (data: ActionData) => {
    return (
        <>
            {data.count !== undefined ? (
                <div className='ml-2 hidden cursor-pointer space-x-3 align-middle md:flex '>
                    <div className='card w-[18px] shrink-0 text-white'>
                        <img src={data.icon} className=' h-[36px] w-[18px]'></img>
                        <span className='count-holder'>{data.count}</span>
                    </div>

                    <div className='hidden  w-full flex-col font-sf text-xs font-semibold  text-white md:block'>
                        <div className='mb-0.5 whitespace-nowrap text-left'>{data.name1}</div>
                        <div className='whitespace-pre'>{data.name2}</div>
                    </div>
                </div>
            ) : (
                <div className='ml-2 hidden cursor-pointer space-x-3 align-middle md:flex'>
                    <div className='card w-[18px] shrink-0'>
                        <img src={data.icon} className=' h-[36px] w-[18px]'></img>
                    </div>

                    <div className='hidden  w-full flex-col font-sf text-xs font-semibold  text-white md:block'>
                        <div className='mb-0.5 whitespace-nowrap'>{data.name1}</div>
                        <div className='whitespace-pre'>{data.name2}</div>
                    </div>
                </div>
            )}
        </>
    );
};
export default Action;
