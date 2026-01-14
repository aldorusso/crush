<script>
	let { article, Content } = $props();
	
	const mockImages = [
		article.image,
		"/images/hero-fashion.png",
		"/images/architecture-minimalism.png",
		"/images/tech-future.png",
		"/images/luxury-watch.png"
	];
</script>

<div class="after-hours-layout bg-black text-white pt-24 pb-40">
	<div class="max-w-7xl mx-auto px-4 md:px-8 mb-24">
		<div class="flex flex-col md:flex-row md:items-end justify-between gap-12 border-b border-white/10 pb-12">
			<div>
				<span class="text-crush font-bold tracking-[0.5em] uppercase text-[10px] mb-6 block">After Hours / Gallery</span>
				<h1 class="text-6xl md:text-9xl font-serif italic font-bold leading-none tracking-tighter">
					{article.title}
				</h1>
			</div>
			<div class="max-w-sm text-right">
				<p class="text-white/40 text-sm italic mb-4">"{article.excerpt}"</p>
				<p class="text-[10px] font-bold uppercase tracking-widest">{article.location} / JAN 2026</p>
			</div>
		</div>
	</div>

	<div class="max-w-7xl mx-auto px-4 md:px-8">
		<div class="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-[300px] md:auto-rows-[400px]">
			{#each mockImages as img, i}
				<div class="relative overflow-hidden group {i % 3 === 0 ? 'md:col-span-8' : 'md:col-span-4'}">
					<img src={img} alt="Gallery item" class="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" />
					<div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
						<span class="text-[10px] font-bold uppercase tracking-widest border border-white/20 px-4 py-2">View High Res</span>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<div class="max-w-7xl mx-auto px-4 md:px-8 mt-32 grid grid-cols-1 lg:grid-cols-12 gap-16">
		<div class="lg:col-span-8">
			<div class="prose prose-invert prose-xl prose-stone prose-headings:serif prose-headings:italic">
				<Content />
			</div>
		</div>
		
		<aside class="lg:col-span-4 border-l border-white/5 pl-12 hidden lg:block">
			<div class="sticky top-32 flex flex-col gap-12 text-white">
				<div class="bg-white/5 p-8 border border-white/10">
					<h4 class="text-[10px] uppercase tracking-[0.5em] text-white/20 font-bold mb-8">Related Dialogue</h4>
					<div class="flex flex-col gap-8">
						<a href="#" class="group block">
							<p class="text-[9px] font-bold text-crush uppercase tracking-widest mb-2">Next Story</p>
							<h5 class="text-xl font-serif italic group-hover:underline">The Sculptural Silence</h5>
						</a>
						<a href="#" class="group block">
							<p class="text-[9px] font-bold text-white/20 uppercase tracking-widest mb-2">Previous</p>
							<h5 class="text-xl font-serif italic group-hover:underline">Atelier: Hedi Slimane</h5>
						</a>
					</div>
				</div>

				<div class="flex flex-wrap gap-2">
					{#each article.tags as tag}
						<span class="text-[10px] font-bold uppercase tracking-widest text-white/40 py-1 px-3 border border-white/10">{tag}</span>
					{/each}
				</div>
			</div>
		</aside>
	</div>
</div>
