import { yupResolver } from '@hookform/resolvers/yup'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { MainSchema } from '../validation/MainValidation'
import { useAppDispatch } from '../hooks/redux'
import { createGroup } from '../store/reducers/group/GroupService'


interface CreateGroupSubmit {
    name: string;
}

interface props {
    setModal: (value: boolean) => void
}
export const CreateGroupForm: FC<props> = ({ setModal }) => {

    const [selectedFile, setSelectedFile] = useState(null)
    const dispatch = useAppDispatch()

    const onSubmit = (data: CreateGroupSubmit) => {
        setModal(false)
        dispatch(createGroup({ name: data.name, file: selectedFile }))
    }

    const handleFileChange = (event: any) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const {
        register,
        handleSubmit,
    } = useForm({
        resolver: yupResolver(MainSchema),
    })


    return (
        <form encType='multipart/form-data' onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register('name')}
            type="text"
          />
          <input type="file"
            onChange={handleFileChange}
          />
          <button type={'submit'}>send</button> <br />
        </form>
    )
}
