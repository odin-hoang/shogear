import axios, { AxiosResponse } from 'axios';

export interface Ward {
   district_id: number,
   ward_id: number;
   ward_name: string;
   ward_type: string;
}
export interface District {
   district_id: number;
   district_name: string;
   district_type: string;
   province_id: number;
   wards: Ward[] | null;
}

export interface Province {
   province_id: number;
   province_name: string;
   province_type: string;
   districts: District[] | null;
}

export const apiGetPublicProvinces = () => new Promise<Province[]>((resolve, reject) => {
   try {
      axios({
         method: 'get',
         url: 'https://vapi.vnappmob.com/api/province/',
      })
         .then((response: AxiosResponse<{ results: Province[] }>) => resolve(response.data.results))
         .catch((error) => reject(error));
   } catch (error) {
      reject(error);
   }
});


export const apiGetPublicDistrict = (provinceId: number) => new Promise<District[]>((resolve, reject) => {
   try {
      axios({
         method: 'get',
         url: `https://vapi.vnappmob.com/api/province/district/${provinceId}`
      })
         .then((response: AxiosResponse<{ results: District[] }>) => resolve(response.data.results))
         .catch((error) => reject(error));
   } catch (error) {
      reject(error);
   }
});

export const apiGetPublicWard = (wardId: number) => new Promise<Ward[]>((resolve, reject) => {
   try {
      axios({
         method: 'get',
         url: `https://vapi.vnappmob.com/api/province/ward/${wardId}`
      })
         .then((response: AxiosResponse<{ results: Ward[] }>) => resolve(response.data.results))
         .catch((error) => reject(error));
   } catch (error) {
      reject(error);
   }
});