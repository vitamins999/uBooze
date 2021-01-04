import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

export const notifyError = (message) => toast.error(message);
export const notifySuccess = (message) => toast.success(message);
