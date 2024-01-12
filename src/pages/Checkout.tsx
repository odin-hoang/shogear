import bgImage from '../assets/images/page-cart-bg.jpg';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { ChangeEvent, useEffect, useState } from 'react';
import { numberWithCommas } from '../lib/scripts';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { apiGetPublicProvinces, apiGetPublicDistrict, apiGetPublicWard } from '../services/app';
import { Province, District, Ward } from '../services/app';
import { createOrder } from '../services/orderService';
import { useUserContext } from '../utils/authContext';
import { updateShippingFee } from '../features/cart/cart-slice';

const Checkout = () => {
    const { getUser } = useUserContext();
    const currentUser = getUser();
    const cartItems = useSelector((state: RootState) => state.cart.cartItems);
    const cart = useSelector((state: RootState) => state.cart.shippingFee);
    // const [discountCode, setDiscountCode] = useState('');
    // const [isLabelVisible, setLabelVisibility] = useState(true);
    const [provinces, setProvinces] = useState<Province[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [wards, setWards] = useState<Ward[]>([]);
    const [selectedProvince, setSelectedProvince] = useState<string>('');
    const [selectedDistrict, setSelectedDistrict] = useState<string>('');
    const [selectedWard, setSelectedWard] = useState<string>('');
    const [street, setStreet] = useState<string>('');
    const [name, setName] = useState<string>(currentUser?.lastName + ' ' + currentUser?.firstName || '');
    const [nameError, setNameError] = useState<string | null>(null);
    const [phone, setPhone] = useState<string>(currentUser?.phone || '');
    const [email, setEmail] = useState<string>(currentUser?.email || '');
    const [phoneError, setPhoneError] = useState<string | null>(null);
    const [provinceError, setProvinceError] = useState<string | null>(null);
    const [districtError, setDistrictError] = useState<string | null>(null);
    const [wardError, setWardError] = useState<string | null>(null);
    const [streetError, setStreetError] = useState<string | null>(null);

    const handleSubmit = async () => {
        const isNameValid = validateName(name);
        const isPhoneValid = validatePhoneForm(phone);
        const isProvinceValid = validateProvince(selectedProvince);
        const isDistrictValid = validateDistrict(selectedDistrict);
        const isWardValid = validateWard(selectedWard);
        const isStreetValid = validateStreet(street);
        if (
            isNameValid &&
            isPhoneValid &&
            isProvinceValid &&
            isDistrictValid &&
            isWardValid &&
            isStreetValid &&
            cart !== -1
        ) {
            toast.success('Đặt hàng thành công!');
            //send request here
            console.log(cartItems);
            const provinceName = provinces.filter((item) => item.province_id == parseInt(selectedProvince));
            const districtName = districts.filter((item) => item.district_id == parseInt(selectedDistrict));
            const wardName = wards.filter((item) => item.ward_id == parseInt(selectedWard));
            let items = cartItems.map((item) => ({
                product_id: item.id,
                quantity: item.quantity,
            }));
            console.log(getUser());

            const data = {
                user: currentUser?.id,
                total_price: 100000,
                full_name: name,
                phone_number: phone,
                ward: wardName?.[0]?.ward_name,
                district: provinceName?.[0]?.province_name,
                province: districtName?.[0].district_name,
                discountCode: 'discountCode',
                email: email,
                items: items,
            };
            const order: any = await createOrder(data);
            if (order?.data) {
                console.log(order);
                // navigate(order?.data?.orderUrl);
                localStorage.setItem('order', JSON.stringify(order?.data));
                window.open(order?.data?.orderUrl, '_blank');
            }
            console.log(JSON.stringify(data));
        } else {
            toast.error('Hãy kiểm tra lại thông tin đơn hàng.');
        }
    };
    const dispatch = useDispatch();
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (cartItems.length === 0) {
            dispatch(updateShippingFee(-1));
        }
    }, []);
    const sumTotal = cartItems.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);
    const calculateTotal = () => {
        return cartItems.length === 0 ? sumTotal : cart === -1 ? sumTotal : sumTotal + cart;
    };
    const methodShip = () => {
        switch (cart) {
            case 0:
                return 'Miễn phí';
                break;
            case 10000:
                return 'Tiêu chuẩn';
                break;
            case 20000:
                return 'Nhanh';
                break;
            default:
                break;
        }
    };
    // const handleInputChange = (event: { target: { value: SetStateAction<string> } }) => {
    //     setDiscountCode(event.target.value);
    // };
    // const handleInputBlur = () => {
    //     if (!discountCode) {
    //         setLabelVisibility(true);
    //     }
    // };
    // xu li address
    // fetch province
    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const provincesData = await apiGetPublicProvinces();
                setProvinces(provincesData);
            } catch (error) {
                console.error('Error fetching provinces:', error);
            }
        };
        fetchProvinces();
    }, []);
    const fetchDistricts = async (provinceId: number) => {
        try {
            const response = await apiGetPublicDistrict(provinceId);
            setDistricts(response);
        } catch (error) {
            console.error('Error fetching districts:', error);
        }
    };
    const fetchWards = async (districtId: number) => {
        try {
            const response = await apiGetPublicWard(districtId);
            setWards(response);
        } catch (error) {
            console.error('Error fetching districts:', error);
        }
    };

    const handleProvinceChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const provinceId = event.target.value;
        setSelectedProvince(provinceId);
        setSelectedDistrict('');
        setSelectedWard('');
        fetchDistricts(Number(provinceId));
    };

    const handleDistrictChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const districtId = event.target.value;
        setSelectedDistrict(districtId);
        setSelectedWard('');
        fetchWards(Number(districtId));
    };

    // validation all
    const validateName = (value: string) => {
        if (!value.trim()) {
            setNameError('Name is required!');
            return false;
        }
        setNameError(null);
        return true;
    };

    const validatePhone = (value: string) => {
        const numericValue = value.replace(/\D/g, '');

        if (value === '') {
            setPhoneError('Phone number is required!');
            return false;
        }
        if (!/^\d+$/.test(numericValue)) {
            setPhoneError('Phone number only contain digits!');
            return false;
        }
        if (numericValue !== value) {
            setPhoneError('Phone number only contain digits!');
            return false;
        }
        setPhoneError(null);
        return true;
    };
    const validatePhoneForm = (value: string) => {
        const numericValue = value.replace(/\D/g, '');
        const phoneRegex = /^(03|05|07|08|09)\d{8}$/;
        if (!phoneRegex.test(numericValue)) {
            setPhoneError('Invalid phone number format!');

            return false;
        }
        return true;
    };
    const validateProvince = (value: string) => {
        if (value === '') {
            setProvinceError('Province is required!');
            return false;
        }
        setProvinceError(null);
        return true;
    };
    const validateDistrict = (value: string) => {
        if (value === '') {
            setDistrictError('District is required!');
            return false;
        }
        setDistrictError(null);
        return true;
    };
    const validateWard = (value: string) => {
        if (value === '') {
            setWardError('Ward is required!');
            return false;
        }
        setWardError(null);
        return true;
    };
    const validateStreet = (value: string) => {
        if (value === '') {
            setStreetError('Street is required!');
            return false;
        }
        setStreetError(null);
        return true;
    };
    return (
        <div className='checkout bg-white px-6 py-6'>
            <div className='bg-cover bg-center p-0' style={{ backgroundImage: `url(${bgImage})` }}>
                <h1 className='py-[3rem] text-center text-[3rem]'>Thanh toán</h1>
            </div>
            <nav className='mb-16 border-b border-solid border-gray-300 border-opacity-50 bg-white'>
                <div className='w-[100%] px-[10px] py-[1.4rem]'>
                    <ol className='m-0 flex rounded-none bg-transparent p-0'>
                        <li className='breadcrumb-item text-[#777]'>
                            <Link className='text-link' to='/'>
                                Trang chủ
                            </Link>
                            <span className='mx-2'> / </span>
                        </li>
                        <li className='breadcrumb-item'>Thanh toán</li>
                    </ol>
                </div>
            </nav>
            <div className='pb-16'>
                <div>
                    {/* <div className='flex h-[40px] flex-1 flex-shrink-0 gap-[10px]'>
                        <div className='checkout-discount relative mb-2 max-w-[340px]'>
                            <form action=''>
                                <input
                                    type='text'
                                    id='checkout-discount-input'
                                    className='h-[40px] w-[330px] rounded-sm border-[0.1rem] border-dashed border-[#d7d7d7] px-4 text-[#999]'
                                    onClick={() => setLabelVisibility(false)}
                                    onChange={handleInputChange}
                                    onBlur={handleInputBlur}
                                    value={discountCode}
                                />
                                {isLabelVisible && (
                                    <label
                                        id='checkout-discount-label'
                                        htmlFor='checkout-discount-input'
                                        className='absolute left-0 top-[60%] w-[100%] overflow-hidden text-ellipsis whitespace-nowrap px-4 text-[#999]'
                                    >
                                        Have a coupon?{' '}
                                        <span className='text-[#fcb941]'>Click here to enter your code</span>
                                    </label>
                                )}
                            </form>
                        </div>
                        <button className='button'>Add</button>
                    </div> */}
                    <div className='billing flex flex-wrap'>
                        <div className='flex-basis-75 min-w-[70%] max-w-[70%] flex-none flex-shrink-0 pr-[10px]'>
                            <h2 className='mb-6 mt-7 text-[1.2rem] font-medium'>Chi tiết thanh toán</h2>
                            <div className='flex flex-wrap px-[-10px] text-[#999]'>
                                <div className='max-w[33.33%] basis-[33.33%] pr-[10px]'>
                                    <label className='mb-2 inline-block w-[100%] ' htmlFor='fullname'>
                                        Tên người nhận<span>*</span>
                                    </label>
                                    <input
                                        className='mb-4 h-[40px] w-[100%] rounded-sm border-[0.05rem] border-solid border-[#d7d7d7] px-4'
                                        type='text'
                                        name='fullname'
                                        value={name}
                                        onChange={(e) => {
                                            validateName(e.target.value);
                                            setName(e.target.value);
                                        }}
                                    />
                                    {nameError && <p className='mb-2 text-red-500'>{nameError}</p>}
                                </div>
                                <div className='max-w[33.33%] basis-[33.33%] px-[10px]'>
                                    <label className='mb-2 inline-block w-[100%] ' htmlFor='phone'>
                                        Số điện thoại<span>*</span>
                                    </label>
                                    <input
                                        className='mb-4 h-[40px] w-[100%] rounded-sm border-[0.05rem] border-solid border-[#d7d7d7] px-4'
                                        type='text'
                                        name='phone'
                                        value={phone}
                                        onChange={(e) => {
                                            validatePhone(e.target.value);
                                            setPhone(e.target.value);
                                        }}
                                    />
                                    {phoneError && <p className='mb-2 text-red-500'>{phoneError}</p>}
                                </div>
                                <div className='max-w[33.33%] basis-[33.33%] pl-[10px]'>
                                    <label className='mb-2 inline-block w-[100%] ' htmlFor='email'>
                                        Email<span>*</span>
                                    </label>
                                    <input
                                        className='mb-4 flex h-[40px] w-[100%] flex-col rounded-sm border-[0.05rem] border-solid border-[#d7d7d7] px-4'
                                        type='text'
                                        name='email'
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                        }}
                                    />
                                </div>
                            </div>
                            <div className='flex flex-wrap text-[#999]'>
                                <div className='max-w[33.33%] basis-[33.33%] pr-[10px]'>
                                    <label className='mb-2 inline-block w-[100%] ' htmlFor='city'>
                                        Tỉnh/Thành phố <span>*</span>
                                    </label>
                                    <select
                                        id='city'
                                        className='mb-4 h-[40px]  w-[100%] rounded-sm border-[0.05rem] border-solid border-[#d7d7d7] pl-2 outline-none'
                                        name='province'
                                        onChange={handleProvinceChange}
                                        value={selectedProvince}
                                        // size={4}
                                    >
                                        <option value='' disabled>{`--Chọn Thành Phố/Tỉnh--`}</option>
                                        {provinces.map((item) => {
                                            return (
                                                <option className='' key={item.province_id} value={item.province_id}>
                                                    {item.province_name}
                                                </option>
                                            );
                                        })}
                                    </select>
                                    {provinceError && <p className='mb-2 text-red-500'>{provinceError}</p>}
                                </div>
                                <div className='max-w[33.33%] basis-[33.33%] px-[10px]'>
                                    <label className='mb-2 inline-block w-[100%] ' htmlFor='district'>
                                        Quận/Huyện <span>*</span>
                                    </label>

                                    <select
                                        id='district'
                                        className='mb-4 h-[40px] w-[100%] rounded-sm border-[0.05rem] border-solid border-[#d7d7d7] pl-2 outline-none'
                                        name='district'
                                        onChange={handleDistrictChange}
                                        value={selectedDistrict}
                                        disabled={!selectedProvince} // Disable if no province is selected
                                    >
                                        <option value='' disabled>{`--Chọn Quận/Huyện--`}</option>
                                        {districts.map((item) => (
                                            <option key={item.district_id} value={item.district_id}>
                                                {item.district_name}
                                            </option>
                                        ))}
                                    </select>
                                    {districtError && <p className='mb-2 text-red-500'>{districtError}</p>}
                                </div>
                                <div className='max-w[33.33%] basis-[33.33%] pl-[10px]'>
                                    <label className='mb-2 inline-block w-[100%] ' htmlFor='Ward'>
                                        Phường/Xã <span>*</span>
                                    </label>

                                    <select
                                        id='ward'
                                        className='mb-4 h-[40px] w-[100%] rounded-sm border-[0.05rem] border-solid border-[#d7d7d7] pl-2 outline-none'
                                        name='ward'
                                        value={selectedWard}
                                        onChange={(event) => setSelectedWard(event.target.value)}
                                        disabled={!selectedDistrict} // Disable if no district is selected
                                    >
                                        <option value='' disabled>{`--Chọn Phường/Xã--`}</option>
                                        {wards.map((item) => (
                                            <option key={item.ward_id} value={item.ward_id}>
                                                {item.ward_name}
                                            </option>
                                        ))}
                                    </select>
                                    {wardError && <p className='mb-2 text-red-500'>{wardError}</p>}
                                </div>
                            </div>
                            <div className='text-[#999]'>
                                <label className='mb-2 inline-block w-[100%] ' htmlFor='street'>
                                    Đường<span>*</span>
                                </label>

                                <input
                                    className='mb-4 flex h-[40px] w-[100%] flex-col rounded-sm border-[0.05rem] border-solid border-[#d7d7d7] px-4'
                                    type='text'
                                    name='street'
                                    onChange={(e) => setStreet(e.target.value)}
                                />
                                {streetError && <p className='mb-2 text-red-500'>{streetError}</p>}
                            </div>
                            <div className='text-[#999]'>
                                <label htmlFor=''>Ghi chú</label>
                                <textarea
                                    className='mb-5 min-h-[150px] w-[100%] rounded-sm border-[0.05rem] border-solid border-[#d7d7d7] p-3 text-[0.9rem]'
                                    name='note'
                                    id='note'
                                    cols={105}
                                    rows={4}
                                    placeholder='Ghi chú về đơn hàng của bạn, ví dụ ghi chú đặc biệt cho việc giao hàng'
                                ></textarea>
                            </div>
                        </div>
                        <aside className='flex-basis-25 min-w-[30%] max-w-[30%] flex-1 flex-shrink-0 pl-[10px]'>
                            <div className='mb-[2rem] border border-dashed border-[#d7d7d7] bg-[#f9f9f9] px-[2rem] pb-[0.5rem] pt-2'>
                                <h3 className='boder-solid border-b border-[#cccccc] py-[1.2rem] text-[1.2rem] font-medium'>
                                    Đơn hàng của bạn
                                </h3>
                                <table className='table-billing w-[100%]'>
                                    <tbody>
                                        <tr>
                                            <td className='w-[50%] border-b-[0.1rem] border-solid border-[#ebebeb] py-4 font-normal'>
                                                Sản phẩm{' '}
                                            </td>
                                            <td className='w-[50%] border-b-[0.1rem] border-solid border-[#ebebeb] py-4 text-right font-normal'>
                                                <span>Tổng tiền</span>
                                            </td>
                                        </tr>
                                        {cartItems.map((item, index) => (
                                            <tr key={index}>
                                                <td className='border-b-[0.1rem] border-solid border-[#ebebeb] py-4 text-[14px] font-normal text-[#999]'>
                                                    {item.name} x {item.quantity}
                                                </td>
                                                <td className='border-b-[0.1rem] border-solid border-[#ebebeb] py-4 text-right text-[14px] font-normal text-[#999]'>
                                                    {numberWithCommas(item.price * item.quantity)} VND
                                                </td>
                                            </tr>
                                        ))}

                                        <tr>
                                            <td className='border-b-[0.1rem] border-solid border-[#ebebeb] py-4 font-normal'>
                                                Tổng tiền hàng:{' '}
                                            </td>
                                            <td className='border-b-[0.1rem] border-solid border-[#ebebeb] py-4 text-right'>
                                                <span>{`${numberWithCommas(sumTotal)} VND`}</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='border-b-[0.1rem] border-solid border-[#ebebeb] pb-4 pt-4'>
                                                Phí vận chuyển:
                                            </td>
                                            <td className='border-b-[0.1rem] border-solid border-[#ebebeb] pb-4 pt-4 text-right'>
                                                {cartItems.length > 0 ? (
                                                    cart !== -1 ? (
                                                        methodShip()
                                                    ) : (
                                                        <Link
                                                            to='/cart'
                                                            className='text-decoration-underline text-[#e30005] '
                                                        >
                                                            Chọn
                                                        </Link>
                                                    )
                                                ) : (
                                                    // Display a message or a link to select products
                                                    <Link
                                                        to='/cart'
                                                        className='text-decoration-underline text-[#e30005] '
                                                    >
                                                        Chọn
                                                    </Link>
                                                )}
                                            </td>
                                        </tr>
                                        <tr className=''>
                                            <td className='max-w-[33.33%] py-[1.5rem] text-[#fcb941]'>Thành tiền:</td>
                                            <td className='py-[1.5rem] text-right text-[#fcb941]'>
                                                {numberWithCommas(calculateTotal())} VND
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <Link
                                    to='/cart'
                                    className='view-cart m-auto mb-4 flex w-[60%] justify-center border-[0.1rem] border-solid border-[#fcb941] p-2 text-[#fcb941]'
                                >
                                    <span className=''>Xem lại giỏ hàng</span>
                                </Link>
                            </div>
                            {/* Chuyển hướng sau khi đặt hàng */}
                            <div
                                className='continue-shopping m-auto flex w-[60%] cursor-pointer justify-center border-[0.1rem] border-solid border-[#d7d7d7] px-4 py-2'
                                onClick={() => handleSubmit()}
                            >
                                <span className=''>ĐẶT HÀNG</span>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
