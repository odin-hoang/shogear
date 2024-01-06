import { useDropzone } from 'react-dropzone';

type FileUploaderProps = {
    fieldChange: Function;
    field: any;
};
const FileUploader = ({ fieldChange, field }: FileUploaderProps) => {
    // type FileUploaderProps = {
    //     fieldChange: Function;
    //     field: FileWithPath[]; // Change Array<any>[] to FileWithPath[]
    // };

    const onDrop = (acceptedFiles: any) => {
        const updateFiles = [...field, ...acceptedFiles];
        fieldChange(updateFiles);
    };
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.png', '.jpeg', '.jpg', '.svg'],
        },
    });

    return (
        <div
            {...getRootProps()}
            className='border-gray-1 mb-4 flex cursor-pointer flex-col items-center rounded-xl border'
        >
            <input {...getInputProps()} className='cursor-pointer' />
            <div className=' flex h-[150px] w-[340px] flex-col items-center justify-center p-5'>
                <img src='/file-upload.svg' width={96} height={77} alt='file upload' />
                <h3 className='text-light-2 mb-6 mt-2 font-semibold'>Chọn hình ảnh</h3>
            </div>
        </div>
    );
};

export default FileUploader;
