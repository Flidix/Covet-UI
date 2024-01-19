import * as yup from 'yup';

const validFileExtensions = { image: ['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp'] };
const MAX_FILE_SIZE = 1000 * 1024;

function isValidFileType(fileName: any, fileType: any) {
  return fileName && validFileExtensions[fileType] && validFileExtensions[fileType].indexOf(fileName.split('.').pop().toLowerCase()) > -1;
}
export const UpdateUserSchema = yup.object().shape({
  username: yup
    .string()
    .required('username is required')
    .max(15),
  userAvatar: yup
    .mixed<File>()
    .test('is-valid-type', 'Not a valid image type',
      (file: File | null) => {
        return isValidFileType(file?.name, 'image');
      })
    .test('is-valid-size', 'Max allowed size is 100KB',
      (file: File | null) => {
        return file?.size && file.size <= MAX_FILE_SIZE;
      })
    .required()
});
