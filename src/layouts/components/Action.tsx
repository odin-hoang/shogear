type ActionData = {
    name1: string;
    name2: string;
    icon: string;
    // count: number;
};

const Action = (data: ActionData) => {
    return (
        <div className='ml-3 flex cursor-pointer space-x-3 align-middle'>
            <div className='position-relative  w-[18px] shrink-0'>
                <img src={data.icon} className='h-[36px] w-[18px]' alt='icon' />
            </div>
            <div className=' hidden w-full flex-col font-sf text-xs font-semibold text-white lg:block '>
                <div className='mb-0.5 whitespace-nowrap'>{data.name1}</div>
                <div className='whitespace-pre'>{data.name2}</div>
            </div>
        </div>
    );
};

export default Action;
