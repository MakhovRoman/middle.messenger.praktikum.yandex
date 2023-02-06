import { APIError } from 'api/types';

export default function hasError(response: any): response is APIError {
    return response.response && response.response.reason;
}
