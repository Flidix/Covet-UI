import { yupResolver } from '@hookform/resolvers/yup'
import { FC, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { MainSchema } from '../validation/MainValidation'
import { useAppDispatch } from '../hooks/redux'
import { createGroup } from '../store/reducers/group/GroupService'


interface CreateGroupSubmit {
    name: string;
    file: File;
}

interface props {
    setModal: (value: boolean) => void
}

export const CreateGroupForm: FC<props> = ({ setModal }) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const dispatch = useAppDispatch();
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(MainSchema),
    });

    const onSubmit = (data: CreateGroupSubmit) => {
        setModal(false);
        dispatch(createGroup({ name: data.name, file: data.file }));
    };

    const handleFileChange = () => {
        const file = fileInputRef.current?.files?.[0] || null;

        if (!file) return;

        setValue('file', file)
    };

    return (
        <form encType='multipart/form-data' onSubmit={handleSubmit(onSubmit)}>
            <div className='createGroupForm'>
                <input
                    className='createGroupName'
                    {...register('name')}
                    type="text"
                />
                {errors.name && <div className='error'>{errors.name.message}</div>}
                <input
                    hidden={true}
                    className='createGroupFile'
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                />
                <button type="button" onClick={() => fileInputRef.current?.click()}>Upload</button>
                {errors.file && <div className='error'>{errors.file.message}</div>}
                <button className='createGroupButton' type='submit'>
                    Create
                </button>
            </div>
        </form>
    );
};