import React, { useCallback, useState } from 'react';
import { useDropzone, FileWithPath } from 'react-dropzone';
import Button from '../../../../components/Button';

type FileUploaderProps = {
    fieldChange: Function;
    field: any;
};
const FileUploader = ({ fieldChange, field }: FileUploaderProps) => {
    type FileUploaderProps = {
        fieldChange: Function;
        field: FileWithPath[]; // Change Array<any>[] to FileWithPath[]
    };

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
            <div className=' flex h-[300px] w-[340px] flex-col items-center justify-center p-5'>
                <img src='/file-upload.svg' width={96} height={77} alt='file upload' />
                <h3 className='text-light-2 mb-6 mt-2 font-semibold'>Drag photo here</h3>
                <p className='mb-6 font-normal'>SVG, PNG, JPG</p>
                <Button
                    type='button'
                    className='bg-purple-light-1 text-primary-2 border-purple-light-2
            border-[1px]
            hover:bg-purple-100 '
                >
                    Select from computer
                </Button>
            </div>
        </div>
    );
};

export default FileUploader;
