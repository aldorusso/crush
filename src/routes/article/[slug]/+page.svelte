<script>
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { 
		Calendar, User, Share2, Bookmark, 
		ArrowLeft, Twitter, Instagram, Linkedin, 
		Copy, Check, MapPin, Tag
	} from 'lucide-svelte';
	import LongFormArticle from '$lib/components/LongFormArticle.svelte';
	import EditorialGallery from '$lib/components/EditorialGallery.svelte';

	let { data } = $props();
	const { article, content: Content } = data;

	let copied = $state(false);
	let scrollProgress = $state(0);

	onMount(() => {
		const handleScroll = () => {
			const height = document.documentElement.scrollHeight - window.innerHeight;
			scrollProgress = (window.scrollY / height) * 100;
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});

	async function copyLink() {
		await navigator.clipboard.writeText(window.location.href);
		copied = true;
		setTimeout(() => (copied = false), 2000);
	}
</script>

<svelte:head>
	<title>{article.title} — Crush.news</title>
	<meta name="description" content={article.excerpt} />
	<link rel="canonical" href="https://crush.news/article/{article.slug}" />
	
	<!-- OpenGraph / Social Deep Meta -->
	<meta property="og:title" content={article.title} />
	<meta property="og:description" content={article.excerpt} />
	<meta property="og:image" content={article.image} />
	<meta property="og:type" content="article" />
	<meta property="og:url" content="https://crush.news/article/{article.slug}" />
	<meta property="article:published_time" content={article.date} />
	<meta property="article:author" content={article.author} />
	<meta property="article:section" content={article.category} />
	{#each article.tags as tag}
		<meta property="article:tag" content={tag} />
	{/each}
	
	<!-- Twitter Deck -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@crush_news" />
	<meta name="twitter:title" content={article.title} />
	<meta name="twitter:description" content={article.excerpt} />
	<meta name="twitter:image" content={article.image} />
	
	<!-- Professional JSON-LD SEO -->
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "NewsArticle",
			"mainEntityOfPage": {
				"@type": "WebPage",
				"@id": "https://crush.news/article/{article.slug}"
			},
			"headline": "{article.title}",
			"description": "{article.excerpt}",
			"image": ["{article.image}"],
			"datePublished": "{article.date}",
			"dateModified": "{article.date}",
			"author": {
				"@type": "Person",
				"name": "{article.author}",
				"url": "https://crush.news/author/{article.author.toLowerCase().replace(' ', '-')}"
			},
			"publisher": {
				"@type": "Organization",
				"name": "Crush.news",
				"logo": {
					"@type": "ImageObject",
					"url": "https://crush.news/logo.png"
				}
			}
		}
	</script>
</svelte:head>

{#if article.category === 'Atelier'}
	<LongFormArticle {article} {Content} />
{:else if article.category === 'After Hours'}
	<EditorialGallery {article} {Content} />
{:else}
	<!-- Standard Boutique Article Layout -->
	<div class="bg-white min-h-screen">
		<div class="max-w-7xl mx-auto px-4 md:px-8 py-8 flex items-center justify-between text-[10px] font-bold tracking-[0.4em] uppercase text-black/20">
			<a href="/" class="flex items-center gap-4 text-black/40 hover:text-crush transition-colors">
				<ArrowLeft class="w-3 h-3" /> Back to Index
			</a>
			<div class="bg-black/5 px-4 py-1 rounded-full text-black/60">
				{article.category} / {article.date}
			</div>
		</div>

		<header class="max-w-5xl mx-auto px-4 md:px-8 pt-12 text-center">
			<h1 class="text-5xl md:text-8xl font-serif italic font-bold leading-[1.1] mb-12 tracking-tight">
				{article.title}
			</h1>
			
			<div class="flex flex-wrap items-center justify-center gap-8 text-[10px] font-bold tracking-widest uppercase text-black/40 border-y border-black/5 py-8">
				{#if article.designer}
					<div class="flex items-center gap-3">
						<Tag class="w-3 h-3" />
						<span class="text-black">Design by {article.designer}</span>
					</div>
				{/if}
				{#if article.location}
					<div class="flex items-center gap-3">
						<MapPin class="w-3 h-3" />
						<span>{article.location}</span>
					</div>
				{/if}
				<div class="flex items-center gap-3">
					<User class="w-3 h-3" />
					<span>Words by <a href="/author/{article.author.toLowerCase().replace(' ', '-')}" class="text-black hover:text-crush transition-colors underline decoration-black/10 underline-offset-4">{article.author}</a></span>
				</div>
			</div>
		</header>

		<div class="w-full h-[70vh] md:h-[90vh] overflow-hidden my-24 bg-black relative">
			<img src={article.image} alt={article.title} class="w-full h-full object-cover scale-105 opacity-90" />
		</div>

		<div class="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-16 pb-40">
			<aside class="hidden lg:block lg:col-span-1 border-r border-black/5 pr-8">
				<div class="sticky top-32 flex flex-col gap-8">
					<p class="vertical-text text-[10px] uppercase tracking-[0.5em] text-black/20 font-bold mb-8">Share</p>
					<button onclick={copyLink} class="w-12 h-12 rounded-full border border-black/5 flex items-center justify-center hover:bg-crush hover:text-white transition-all">
						{#if copied} <Check class="w-4 h-4" /> {:else} <Copy class="w-4 h-4" /> {/if}
					</button>
				</div>
			</aside>

			<main class="lg:col-span-7">
				<div class="prose prose-stone prose-xl lg:prose-2xl prose-headings:serif prose-headings:italic max-w-none first-letter:text-crush first-letter:font-serif first-letter:text-7xl first-letter:font-bold first-letter:float-left first-letter:pr-3">
					<Content />
				</div>
			</main>

			<aside class="hidden lg:block lg:col-span-4">
				<div class="sticky top-32 flex flex-col gap-12">
					<!-- Editor's Note -->
					<div class="bg-zinc-50 p-8 border border-black/5">
						<h4 class="text-[10px] uppercase tracking-[0.4em] font-bold text-black/20 mb-6">Editor's Note</h4>
						<p class="text-sm font-serif italic text-black/60 leading-relaxed mb-4">
							"This piece represents our commitment to the intersection of brutalist architecture and high-end fashion."
						</p>
						<p class="text-[10px] font-bold uppercase tracking-widest text-black/40">— Editorial Team</p>
					</div>

					<!-- Related Context -->
					<div class="bg-white p-8 border border-black/5">
						<h4 class="text-[10px] uppercase tracking-[0.4em] font-bold text-black/20 mb-8">Related Dialogue</h4>
						<div class="flex flex-col gap-8">
							<a href="#" class="group block">
								<p class="text-[9px] font-bold text-crush uppercase tracking-widest mb-2">Next Story / 02</p>
								<h5 class="text-lg font-serif italic group-hover:underline">The Future of Fluidity</h5>
							</a>
							<a href="#" class="group block">
								<p class="text-[9px] font-bold text-black/20 uppercase tracking-widest mb-2">Previous / 01</p>
								<h5 class="text-lg font-serif italic group-hover:underline">Urban Escapism</h5>
							</a>
						</div>
					</div>

					<!-- Tags -->
					<div class="bg-zinc-50 p-8 border border-black/5">
						<h4 class="text-[10px] uppercase tracking-[0.4em] font-bold text-black/20 mb-8">Tags</h4>
						<div class="flex flex-wrap gap-2">
							{#each article.tags as tag}
								<span class="text-[10px] font-bold uppercase tracking-widest text-black/40 py-1 px-3 border border-black/5 bg-white">{tag}</span>
							{/each}
						</div>
					</div>

					<!-- Reading Progress (Sidebar) -->
					<div class="bg-zinc-50 p-8 border border-black/5">
						<h4 class="text-[10px] uppercase tracking-[0.4em] font-bold text-black/20 mb-4">Reading Progress</h4>
						<div class="w-full h-1 bg-black/5">
							<div class="h-full bg-crush transition-all duration-300" style="width: {scrollProgress}%"></div>
						</div>
					</div>
				</div>
			</aside>
		</div>
	</div>
{/if}

<style>
	:global(.prose) {
		max-width: none;
	}
	:global(.prose blockquote) {
		border-left: 2px solid var(--color-crush);
		padding-left: 2rem;
		font-style: italic;
		font-size: 1.5rem;
		margin: 3rem 0;
	}
</style>
