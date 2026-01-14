export async function fetchArticles() {
    const allArticleFiles = import.meta.glob('/src/lib/content/articles/*.md');
    const iterableArticleFiles = Object.entries(allArticleFiles);

    const allArticles = await Promise.all(
        iterableArticleFiles.map(async ([path, resolver]) => {
            const { metadata } = await resolver();
            const slug = path.split('/').pop().slice(0, -3);

            return {
                ...metadata,
                slug,
                // Ensure tags are an array
                tags: metadata.tags ? (typeof metadata.tags === 'string' ? metadata.tags.split(',').map(s => s.trim()) : metadata.tags) : []
            };
        })
    );

    return allArticles.sort((a, b) => new Date(b.date) - new Date(a.date));
}
