import {
    useEffect,
    useState
} from 'react';
import axios from 'axios';
import { ServerResponse, mainType } from '../types/Types';

const useFetch = (url: string): ServerResponse => {
    const [data, setData] = useState<mainType[]>([]);
    const [loading, setLoading] = useState<boolean | boolean[]>([true]);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        axios.get<mainType[]>(url).then((res) => {
            setData(res.data)
        }).catch(error => {
            setError(error);
        }).finally(() => {
            setLoading(false);
        });
    }, [url]);

    return {
        data,
        loading,
        error
    };
};

export default useFetch;

