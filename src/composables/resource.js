import { base_url } from '../utils/constants';

export async function useResource(endpoint) {
    try {
        const response = await fetch(`${base_url}/${endpoint}`);
        const resource = await response.json();

        return resource;
    } catch (err) {
        throw err;
    }
}
