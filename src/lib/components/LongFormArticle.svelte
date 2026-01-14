<script>
	let { article, Content } = $props();
</script>

<div class="atelier-layout pt-24 pb-40">
	<div class="max-w-4xl mx-auto px-4 md:px-8">
		<div class="flex flex-col items-center text-center mb-24">
			<span class="text-crush font-bold tracking-[0.5em] uppercase text-[10px] mb-8">Atelier / Profile</span>
			<h1 class="text-6xl md:text-9xl font-serif italic font-bold leading-none mb-12 tracking-tighter">
				{article.title}
			</h1>
			<div class="w-px h-24 bg-black/10 mb-12"></div>
			<div class="flex flex-col gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-black/40">
				<span>Written by {article.author}</span>
				<span>Photography by Crush Studio</span>
				<span>Location: {article.location}</span>
			</div>
		</div>
	</div>

	<div class="max-w-7xl mx-auto px-4 md:px-8 mb-32">
		<div class="aspect-[3/4] md:aspect-[21/9] overflow-hidden bg-zinc-100">
			<img src={article.image} alt={article.title} class="w-full h-full object-cover" />
		</div>
	</div>

	<div class="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-16">
		<div class="lg:col-span-8">
			<div class="prose prose-stone prose-2xl prose-headings:serif prose-headings:italic prose-blockquote:serif prose-blockquote:italic first-letter:text-crush first-letter:font-serif first-letter:text-8xl first-letter:font-bold first-letter:float-left first-letter:pr-4 first-letter:pt-2">
				<Content />
			</div>
		</div>
		
		<aside class="lg:col-span-4 border-l border-black/5 pl-12 hidden lg:block">
			<div class="sticky top-32 flex flex-col gap-12">
				<div class="bg-white p-8 border border-black/5">
					<h4 class="text-[10px] uppercase tracking-[0.5em] font-bold text-black/20 mb-8">Related Dialogue</h4>
					<div class="flex flex-col gap-8">
						<a href="#" class="group block">
							<p class="text-[9px] font-bold text-crush uppercase tracking-widest mb-2">Next Story</p>
							<h5 class="text-xl font-serif italic group-hover:underline">The Future of Fluidity</h5>
						</a>
						<a href="#" class="group block">
							<p class="text-[9px] font-bold text-black/20 uppercase tracking-widest mb-2">Previous</p>
							<h5 class="text-xl font-serif italic group-hover:underline">Urban Escapism</h5>
						</a>
					</div>
				</div>

				<div class="flex flex-wrap gap-2">
					{#each article.tags as tag}
						<span class="text-[10px] font-bold uppercase tracking-widest text-black/40 py-1 px-3 border border-black/5">{tag}</span>
					{/each}
				</div>
			</div>
		</aside>
	</div>
</div>

<style>
	.atelier-layout {
		background-color: #fcfcfc;
	}
	:global(.atelier-layout .prose p) {
		line-height: 2;
		color: rgba(0,0,0,0.7);
		margin-bottom: 2.5rem;
	}
</style>
