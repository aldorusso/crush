<script>
	import '../app.css';
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
	import { X, ArrowRight, Instagram, Twitter, Youtube } from 'lucide-svelte';
	import { fade } from 'svelte/transition';
	import { throttle } from '$lib/utils/performance.js';
	import { menuStore } from '$lib/stores/menu.js';
	import { scrollStore } from '$lib/stores/scroll.js';
	import Header from '$lib/components/ui/Header.svelte';
	import ProgressBar from '$lib/components/ui/ProgressBar.svelte';

	/** @type {any} */
	let { children } = $props();

	const categories = [
		{ name: 'Front Row', slug: 'front-row', desc: 'Runway & Global Events' },
		{ name: 'Street Archive', slug: 'street-archive', desc: 'Urban Style Identity' },
		{ name: 'Atelier', slug: 'atelier', desc: 'Designer Profiles & Process' },
		{ name: 'Trend Lab', slug: 'trend-lab', desc: 'Micro-Aesthetic Analysis' },
		{ name: 'After Hours', slug: 'after-hours', desc: 'Visual Night Chronicles' }
	];

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);
		
		// Throttled scroll handler for better performance
		const handleScroll = throttle(() => {
			scrollStore.updateScroll(window.scrollY);
		}, 16); // ~60fps

		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	});

	function toggleMenu() {
		menuStore.toggle();
		if ($menuStore) {
			// Majestic Menu Entrance
			setTimeout(() => {
				gsap.from('.menu-item', {
					y: 100,
					opacity: 0,
					duration: 1,
					stagger: 0.1,
					ease: 'expo.out'
				});
				gsap.from('.menu-footer', {
					opacity: 0,
					y: 20,
					duration: 1,
					delay: 0.5,
					ease: 'power2.out'
				});
			}, 10);
		}
	}

</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
</svelte:head>

<div class="min-h-screen bg-white selection:bg-crush selection:text-white">
	<!-- Reading Progress Bar -->
	<ProgressBar />

	<!-- Header -->
	<Header />

	<!-- Majestic Full-Screen Menu Overlay -->
	{#if $menuStore}
		<div class="fixed inset-0 z-[60] bg-black text-white flex flex-col overflow-hidden" transition:fade={{ duration: 400 }}>
			<!-- Menu Header -->
			<div class="flex justify-between items-center px-6 md:px-12 pt-6 md:pt-12 pb-6 md:pb-8 flex-shrink-0">
				<p class="text-[10px] font-bold tracking-[0.5em] uppercase text-white/40">Editorial Index / Vol 01</p>
				<button onclick={toggleMenu} class="group p-4 hover:bg-white/10 rounded-full transition-all flex items-center gap-4">
					<span class="text-[10px] font-bold uppercase tracking-[0.3em]">Close</span>
					<X class="w-8 h-8 group-rotate-90 transition-transform duration-500" />
				</button>
			</div>
			
			<!-- Scrollable Content Area -->
			<div class="flex-1 overflow-y-auto px-6 md:px-12 pb-6">
				<div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
					<nav class="lg:col-span-8 flex flex-col gap-4 md:gap-8">
					{#each categories as cat, i}
						<a 
							href="/category/{cat.slug}" 
							onclick={toggleMenu} 
							class="menu-item group flex flex-col md:flex-row md:items-baseline gap-4 md:gap-8"
						>
							<span class="text-[10px] font-bold text-white/20 tracking-widest uppercase">0{i+1}</span>
							<div class="flex flex-col">
								<h2 class="text-5xl md:text-9xl font-bold serif italic leading-none group-hover:text-crush transition-all group-hover:translate-x-4 duration-500">
									{cat.name}
								</h2>
								<p class="text-[10px] md:text-sm text-white/30 uppercase tracking-[0.2em] font-bold mt-2 md:opacity-0 group-hover:opacity-100 transition-all duration-700">
									{cat.desc}
								</p>
							</div>
						</a>
					{/each}
				</nav>

				<div class="hidden lg:flex lg:col-span-4 flex-col gap-12 border-l border-white/5 pl-20">
					<div>
						<h3 class="text-[10px] uppercase tracking-[0.5em] text-white/20 font-bold mb-6">Latest Edition</h3>
						<div class="aspect-[3/4] bg-zinc-900 mb-6 overflow-hidden relative group">
							<img src="/images/hero-fashion.png" alt="Latest" class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70" />
							<div class="absolute inset-0 flex items-center justify-center">
								<ArrowRight class="w-12 h-12 text-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
							</div>
						</div>
						<p class="text-xl font-serif italic mb-2">The Architecture of Silence</p>
						<p class="text-[10px] font-bold uppercase tracking-widest text-crush">Read Issue 04</p>
					</div>
				</div>
				</div>
			
			<!-- Menu Footer -->
			<div class="menu-footer flex flex-col md:flex-row justify-between items-end md:items-center gap-8 border-t border-white/10 pt-12 mt-12">
				<div class="flex gap-12 text-[10px] font-bold tracking-[0.3em] uppercase">
					<a href="#" class="hover:text-crush transition-colors">Manifesto</a>
					<a href="#" class="hover:text-crush transition-colors">Contact</a>
					<a href="#" class="hover:text-crush transition-colors">Privacy</a>
				</div>
				
				<div class="flex gap-8 items-center">
					<a href="#" class="hover:text-crush transition-colors"><Instagram class="w-5 h-5" /></a>
					<a href="#" class="hover:text-crush transition-colors"><Twitter class="w-5 h-5" /></a>
					<a href="#" class="hover:text-crush transition-colors"><Youtube class="w-5 h-5" /></a>
				</div>
				
				<p class="text-[10px] tracking-[0.3em] uppercase text-white/20">© 2026 Crush Digital. Developed for Excellence.</p>
			</div>
		</div>
	</div>
	{/if}

	<main class="relative z-10 transition-all duration-500" class:blur-sm={$menuStore} class:scale-95={$menuStore} class:opacity-50={$menuStore}>
		{@render children()}
	</main>

	<!-- Footer -->
	<footer class="bg-black text-white pt-24 md:pt-40 pb-12 px-4 md:px-8 mt-40">
		<div class="max-w-7xl mx-auto">
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-32">
				<div class="lg:col-span-1">
					<h2 class="text-6xl md:text-9xl font-bold serif italic mb-8 leading-none">Crush<span class="text-crush">.</span></h2>
					<div class="max-w-md">
						<p class="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-white/40 leading-relaxed mb-6">
							Boutique Editorial Studio
						</p>
						<p class="text-[11px] md:text-sm font-medium uppercase tracking-[0.2em] text-white/20 leading-loose">
							Exploring the intersection of digital avant-garde and high-fashion architecture. Curated in Madrid, distributed globally. Written for the architects of tomorrow.
						</p>
					</div>
				</div>
				<div class="grid grid-cols-2 md:grid-cols-3 gap-12 lg:justify-items-end">
					<div class="flex flex-col gap-6">
						<p class="text-[10px] tracking-[0.4em] uppercase text-white/30 font-bold mb-4">The Index</p>
						{#each categories as cat}
							<a href="/category/{cat.slug}" class="text-lg md:text-xl font-serif italic hover:text-crush transition-colors">{cat.name}</a>
						{/each}
					</div>
					<div class="flex flex-col gap-6">
						<p class="text-[10px] tracking-[0.4em] uppercase text-white/30 font-bold mb-4">Crush HQ</p>
						<a href="#" class="text-lg md:text-xl font-serif italic hover:text-crush transition-colors">Manifesto</a>
						<a href="#" class="text-lg md:text-xl font-serif italic hover:text-crush transition-colors">Privacy</a>
						<a href="#" class="text-lg md:text-xl font-serif italic hover:text-crush transition-colors">Terms</a>
					</div>
					<div class="flex flex-col gap-6">
						<p class="text-[10px] tracking-[0.4em] uppercase text-white/30 font-bold mb-4">Social</p>
						<a href="#" class="text-lg md:text-xl font-serif italic hover:text-crush transition-colors">Instagram</a>
						<a href="#" class="text-lg md:text-xl font-serif italic hover:text-crush transition-colors">X / Twitter</a>
						<a href="#" class="text-lg md:text-xl font-serif italic hover:text-crush transition-colors">Youtube</a>
					</div>
				</div>
			</div>
			
			<div class="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between gap-8 items-end md:items-center">
				<p class="text-5xl md:text-7xl font-bold tracking-tighter serif italic text-white/10">Crush.</p>
				<p class="text-[10px] font-bold tracking-[0.4em] uppercase text-white/20">Worldwide Editorial Presence © 2026</p>
			</div>
		</div>
	</footer>
</div>

<style>
	:global(body) {
		overflow-x: hidden;
		background: #fff;
	}
	
	:global(.prose) {
		max-width: none;
	}
</style>
