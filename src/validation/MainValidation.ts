import * as yup from 'yup';

type FileExtensionType = { [key: string]: string[] };

const validFileExtensions: FileExtensionType = { image: ['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp'] };
const MAX_FILE_SIZE = 1000 * 1024;

function isValidFileType(fileName: string | undefined, fileType: string): boolean {
  return !!fileName && validFileExtensions[fileType]?.includes(fileName.split('.').pop()?.toLowerCase() ?? '');
}

export const MainSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .max(26),
  file: yup
    .mixed<Nullable<File | undefined>>()
    .test('is-valid-type', 'Not a valid image type',
      (file: Nullable<File>) => {
        return !!file?.name && isValidFileType(file.name, 'image');
      })
    .test('is-valid-size', 'Max allowed size is 100KB',
      (file: Nullable<File>) => {
        return !!file?.size && file.size <= MAX_FILE_SIZE;
      })
    .required()
});

type Nullable<T> = T | null | undefined;
