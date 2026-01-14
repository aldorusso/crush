<script>
	import { ArrowLeft, Instagram, Twitter, ExternalLink } from 'lucide-svelte';
	let { data } = $props();
	const { author, articles } = data;
</script>

<div class="bg-white min-h-screen pt-40 pb-40">
	<div class="max-w-7xl mx-auto px-4 md:px-8">
		<!-- Author Header -->
		<div class="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-32 items-end">
			<div class="lg:col-span-8">
				<a href="/" class="inline-flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.4em] text-black/20 hover:text-crush transition-colors mb-12">
					<ArrowLeft class="w-3 h-3" /> Back to Index
				</a>
				<h1 class="text-6xl md:text-[10rem] font-bold serif italic leading-none tracking-tighter mb-8">
					{author.name}<span class="text-crush">.</span>
				</h1>
				<p class="text-[10px] font-bold uppercase tracking-[0.4em] text-black/40 mb-8">{author.role} / Crush Digital</p>
			</div>
			<div class="lg:col-span-4 border-l border-black/5 pl-12 pb-4">
				<p class="text-xl font-serif italic text-black/60 leading-relaxed mb-8">
					"{author.bio}"
				</p>
				<div class="flex gap-6">
					<a href="#" class="hover:text-crush transition-colors"><Instagram class="w-5 h-5" /></a>
					<a href="#" class="hover:text-crush transition-colors"><Twitter class="w-5 h-5" /></a>
					<a href="#" class="hover:text-crush transition-colors"><ExternalLink class="w-5 h-5" /></a>
				</div>
			</div>
		</div>

		<!-- Author's Work Grid -->
		<div class="border-t border-black/5 pt-20">
			<h2 class="text-[10px] font-bold uppercase tracking-[0.5em] text-black/20 mb-16">Editorial Archive</h2>
			
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
				{#each articles as article}
					<a href="/article/{article.slug}" class="group block">
						<div class="aspect-[4/5] bg-zinc-100 mb-8 overflow-hidden relative">
							<img src={article.image} alt={article.title} class="w-full h-full object-cover grayscale opacity-80 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
						</div>
						<p class="text-[9px] font-bold uppercase tracking-widest text-black/40 mb-4">{article.category} / {article.date}</p>
						<h3 class="text-2xl font-serif italic group-hover:text-crush transition-colors leading-tight">{article.title}</h3>
					</a>
				{:else}
					<p class="text-black/20 italic font-serif">Waiting for the next contribution...</p>
				{/each}
			</div>
		</div>
	</div>
</div>
