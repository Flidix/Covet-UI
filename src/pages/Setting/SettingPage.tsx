import { useNavigate } from 'react-router-dom'
import './SettingPage.css'
import { useForm } from 'react-hook-form';
import { UpdateUserSchema } from '../../validation/UpdateUser';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRef } from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { fetchUpdateUser } from '../../store/reducers/user/UserService';

export const SettingPage = () => {

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(UpdateUserSchema),
    });

    const onSubmit = (data: any) => {
        dispatch(fetchUpdateUser(data))
    }

    const handleFileChange = () => {
        const file = fileInputRef.current?.files?.[0] || null;

        if (!file) return;

        setValue('userAvatar', file)
    };

    return (
        <div className="setting-page">
            <div className="arrow">
                <i className='bx bx-left-arrow-alt' style={{ color: '#e5c200' }} onClick={() => navigate(-1)} ></i>
            </div>
            <div className="update-user-profile">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input type="text"
                        {...register('username')}
                        placeholder="Username"
                    />
                    {errors.username && <div className='error'>{errors.username.message}</div>}

                    <input
                        type="file"
                        hidden={true}
                        {...register('userAvatar')}
                        placeholder="Avatar"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                    />
                    <button type="button" onClick={() => fileInputRef.current?.click()}>Upload</button>
                    {errors.userAvatar && <div className='error'>{errors.userAvatar.message}</div>}
                    <button type='submit'>
                        update
                    </button>
                </form>
            </div>
        </div>
    )
}
