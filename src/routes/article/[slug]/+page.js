import { fetchArticles } from '$lib/utils/content';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    const articles = await fetchArticles();
    const article = articles.find((a) => a.slug === params.slug);

    if (!article) {
        throw error(404, 'Article not found');
    }

    // Dynamic import of the component
    const component = await import(`../../../lib/content/articles/${params.slug}.md`);

    return {
        article,
        content: component.default
    };
}
