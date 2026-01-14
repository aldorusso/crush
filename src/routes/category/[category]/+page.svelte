<script>
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';

	let { data } = $props();
	const { categoryLabel, description, articles } = data;

	onMount(() => {
		gsap.from('.category-header', {
			opacity: 0,
			y: 50,
			duration: 1.2,
			ease: 'power3.out'
		});

		gsap.from('.header-reveal', {
			opacity: 0,
			y: 20,
			duration: 1,
			stagger: 0.2,
			ease: 'power2.out',
			delay: 0.3
		});
// ... (rest of GSAP remains similar but targets cards correctly later)

		gsap.from('.article-card', {
			opacity: 0,
			y: 30,
			stagger: 0.1,
			duration: 0.8,
			ease: 'power2.out',
			delay: 0.5
		});
	});
</script>

<div class="max-w-7xl mx-auto px-4 md:px-8 pt-12 md:pt-24 pb-32">
	<header class="category-header mb-24 md:mb-32">
		<div class="header-reveal">
			<p class="text-crush font-bold tracking-[0.4em] uppercase text-[10px] md:text-xs mb-6">Archive // Section</p>
			<h1 class="text-6xl md:text-9xl font-bold serif italic leading-none mb-12">{categoryLabel}</h1>
		</div>
		<div class="header-reveal">
			<p class="max-w-2xl text-lg md:text-2xl text-black/50 font-serif italic leading-relaxed">
				{description}
			</p>
		</div>
	</header>

	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
		{#each articles as article}
			<a href="/article/{article.slug}" class="article-card group">
				<div class="relative aspect-[4/5] overflow-hidden mb-8 bg-black">
					<img 
						src={article.image} 
						alt={article.title} 
						class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
					/>
				</div>
				<p class="text-xs font-bold tracking-widest uppercase text-black/40 mb-3">{article.date}</p>
				<h2 class="text-3xl font-bold serif italic mb-4 group-hover:text-crush transition-colors leading-tight">
					{article.title}
				</h2>
				<p class="text-black/60 line-clamp-3">
					{article.excerpt}
				</p>
			</a>
		{:else}
			<div class="col-span-full py-20 text-center border-2 border-dashed border-black/10">
				<p class="text-xl text-black/40 serif italic">No articles found in this category yet.</p>
			</div>
		{/each}
	</div>
</div>
