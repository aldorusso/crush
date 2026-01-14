import { fetchArticles } from '$lib/utils/content';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    const { slug } = params;

    // Fetch all articles using the existing utility
    const articles = await fetchArticles();

    // Filter articles by author slug
    // Slug is marcus-voss, author name is Marcus Voss
    const authorName = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    const authorArticles = articles.filter(a => a.author === authorName);

    if (authorArticles.length === 0) {
        return {
            author: {
                name: authorName,
                bio: "A leading voice in contemporary fashion criticism and urban subcultures.",
                role: "Senior Editorial Lead"
            },
            articles: []
        };
    }

    return {
        author: {
            name: authorName,
            bio: `Editorial voice at Crush.news specializing in ${authorArticles[0].category}. Driven by the intersection of brutalism and luxury.`,
            role: "Contributor"
        },
        articles: authorArticles
    };
}
