<script>
	import '../app.css';
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
	import { Menu, Search, X, ArrowRight, Instagram, Twitter, Youtube } from 'lucide-svelte';
	import { fade, fly } from 'svelte/transition';

	/** @type {any} */
	let { children } = $props();

	let isMenuOpen = $state(false);
	let lastScrollY = $state(0);
	let isHeaderVisible = $state(true);
	let scrollProgress = $state(0);

	const categories = [
		{ name: 'Front Row', slug: 'front-row', desc: 'Runway & Global Events' },
		{ name: 'Street Archive', slug: 'street-archive', desc: 'Urban Style Identity' },
		{ name: 'Atelier', slug: 'atelier', desc: 'Designer Profiles & Process' },
		{ name: 'Trend Lab', slug: 'trend-lab', desc: 'Micro-Aesthetic Analysis' },
		{ name: 'After Hours', slug: 'after-hours', desc: 'Visual Night Chronicles' }
	];

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);
		
		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			const height = document.documentElement.scrollHeight - window.innerHeight;
			scrollProgress = (currentScrollY / height) * 100;

			if (currentScrollY > lastScrollY && currentScrollY > 100) {
				isHeaderVisible = false;
			} else {
				isHeaderVisible = true;
			}
			lastScrollY = currentScrollY;
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	});

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
		if (isMenuOpen) {
			document.body.style.overflow = 'hidden';
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
		} else {
			document.body.style.overflow = 'auto';
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
	<div class="fixed top-0 left-0 w-full h-1 z-[100]">
		<div class="h-full bg-crush transition-all duration-150 ease-out shadow-[0_0_10px_rgba(255,0,85,0.5)]" style="width: {scrollProgress}%"></div>
	</div>

	<!-- Header -->
	<header 
		class="fixed top-0 left-0 w-full z-50 transition-transform duration-500 ease-in-out border-b border-black/5 bg-white/80 backdrop-blur-md"
		class:-translate-y-full={!isHeaderVisible}
	>
		<div class="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
			<button class="group flex items-center gap-3 p-2 hover:bg-black/5 rounded-full transition-all" onclick={toggleMenu}>
				<div class="relative w-6 h-6 flex flex-col justify-center gap-1.5">
					<span class="w-full h-0.5 bg-black transition-transform group-hover:scale-x-75"></span>
					<span class="w-full h-0.5 bg-black"></span>
				</div>
				<span class="text-[10px] font-bold uppercase tracking-[0.3em] hidden md:block">Index</span>
			</button>

			<a href="/" class="text-4xl font-bold tracking-tighter serif italic group">
				Crush<span class="text-crush transition-all group-hover:pl-1">.</span>
			</a>

			<div class="flex items-center gap-4">
				<button class="p-2 hover:bg-black/5 rounded-full transition-colors">
					<Search class="w-5 h-5" />
				</button>
				<a href="#" class="hidden md:block px-6 py-2 bg-black text-white text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-crush transition-all hover:scale-105 active:scale-95">
					Join The Pulse
				</a>
			</div>
		</div>
	</header>

	<!-- Majestic Full-Screen Menu Overlay -->
	{#if isMenuOpen}
		<div class="fixed inset-0 z-[60] bg-black text-white p-6 md:p-12 flex flex-col" transition:fade={{ duration: 400 }}>
			<!-- Menu Header -->
			<div class="flex justify-between items-center mb-12 md:mb-20">
				<p class="text-[10px] font-bold tracking-[0.5em] uppercase text-white/40">Editorial Index / Vol 01</p>
				<button onclick={toggleMenu} class="group p-4 hover:bg-white/10 rounded-full transition-all flex items-center gap-4">
					<span class="text-[10px] font-bold uppercase tracking-[0.3em]">Close</span>
					<X class="w-8 h-8 group-rotate-90 transition-transform duration-500" />
				</button>
			</div>
			
			<div class="grid grid-cols-1 lg:grid-cols-12 flex-1 items-center">
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
	{/if}

	<main class="relative z-10 transition-all duration-500" class:blur-sm={isMenuOpen} class:scale-95={isMenuOpen} class:opacity-50={isMenuOpen}>
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
