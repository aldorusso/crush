import { fetchArticles } from '$lib/utils/content';

/** @type {import('./$types').PageLoad} */
export async function load() {
    const articles = await fetchArticles();
    return {
        articles
    };
}
