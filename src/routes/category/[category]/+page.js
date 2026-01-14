import { fetchArticles } from '$lib/utils/content';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    const allArticles = await fetchArticles();
    const articles = allArticles.filter(
        (a) => a.category.toLowerCase() === params.category.toLowerCase().replace(/-/g, ' ')
    );

    /** @type {Record<string, string>} */
    const descriptions = {
        'front-row': "Runway & Global Events. A direct lens into the most influential fashion capitals, capturing the collection debuts and high-stakes choreography of international fashion weeks.",
        'street-archive': "Urban Style Identity. Documenting the raw energy of urban fashion subcultures and the evolution of luxury in the daily vernacular of the global city.",
        'atelier': "Designer Profiles & Process. An intimate look at the craftsmanship behind the labels, exploring the technical mastery and conceptual foundations of contemporary design.",
        'trend-lab': "Micro-Aesthetic Analysis. Decoding the emerging visual languages and cultural shifts that define the near-future of style and identity.",
        'after-hours': "Visual Night Chronicles. A curated archive of nocturnal aesthetics, fashion galas, and the cinematic atmosphere of the global creative community after dark."
    };

    return {
        categoryLabel: params.category.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
        description: descriptions[params.category.toLowerCase()] || "Curated editorial snapshots from the digital avant-garde.",
        articles
    };
}
