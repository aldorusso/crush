<script>
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
	import { ArrowRight, ArrowUpRight, Plus, ExternalLink } from 'lucide-svelte';

	let { data } = $props();
	const articles = data.articles;

	// Pick top 3 articles for rotation
	const featuredArticles = articles.slice(0, 3);
	let activeIndex = $state(0);

	// Derived current article data
	const activeArticle = $derived(featuredArticles[activeIndex] || {
		title: "The New Crush.",
		category: "Editorial",
		image: "/images/hero-fashion.png",
		excerpt: "A seasonal curation of the digital avant-garde and the architecture of tomorrow."
	});

	// Split title for cinematic reveal
	let titleFirstHalf = $state("");
	let titleSecondHalf = $state("");

	$effect(() => {
		const words = activeArticle.title.split(' ');
		titleFirstHalf = words.slice(0, Math.ceil(words.length / 2)).join(' ');
		titleSecondHalf = words.slice(Math.ceil(words.length / 2)).join(' ');
	});

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);

		// Hero Reveal Initialization
		const heroTL = gsap.timeline();
		
		function animateHeroIn() {
			heroTL.fromTo('.hero-title-line', 
				{ y: 40, opacity: 0, filter: 'blur(10px)' },
				{ y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.5, ease: 'power4.out', stagger: 0.15 }
			);
			heroTL.fromTo('.hero-meta',
				{ opacity: 0, y: 20 },
				{ opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
				"-=1"
			);
		}

		animateHeroIn();

		let rotationInterval;

		function startRotation() {
			clearInterval(rotationInterval);
			rotationInterval = setInterval(() => {
				goToSlide((activeIndex + 1) % featuredArticles.length);
			}, 9000);
		}

		async function goToSlide(index) {
			if (index === activeIndex) return;
			
			const transitionTL = gsap.timeline();
			
			// Decisive fade out of current content
			transitionTL.to(['.hero-title-line', '.hero-meta'], {
				opacity: 0,
				filter: 'blur(8px)',
				y: -15,
				duration: 0.6,
				stagger: 0.05,
				ease: 'power2.in'
			});

			// Background transition
			transitionTL.to('.parallax-img', {
				scale: 1.15,
				opacity: 0.1,
				duration: 0.8,
				ease: 'power2.inOut'
			}, "-=0.4");

			transitionTL.add(() => {
				activeIndex = index;
			});

			// Reveal new content
			transitionTL.to('.parallax-img', {
				scale: 1.05,
				opacity: 0.3,
				duration: 1.2,
				ease: 'expo.out'
			});

			transitionTL.fromTo('.hero-title-line', 
				{ y: 30, opacity: 0, filter: 'blur(8px)' },
				{ y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.2, ease: 'expo.out', stagger: 0.1 },
				"-=0.8"
			);

			transitionTL.fromTo('.hero-meta',
				{ opacity: 0, y: 15 },
				{ opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
				"-=1"
			);

			// Reset timer after manual interaction
			startRotation();
		}

		animateHeroIn();
		startRotation();

		// Horizontal Scroll Animation
		const horizontalSection = document.querySelector('.horizontal-scroll');
		if (horizontalSection) {
			gsap.to(horizontalSection, {
				x: () => -(horizontalSection.scrollWidth - window.innerWidth),
				ease: 'none',
				scrollTrigger: {
					trigger: '.horizontal-wrapper',
					start: 'top top',
					end: () => `+=${horizontalSection.scrollWidth}`,
					scrub: 1,
					pin: true,
					anticipatePin: 1
				}
			});
		}

		// Reveal Masks
		document.querySelectorAll('.mask-reveal').forEach(el => {
			gsap.to(el, {
				clipPath: 'inset(0% 0% 0% 0%)',
				duration: 1.5,
				ease: 'expo.inOut',
				scrollTrigger: {
					trigger: el,
					start: 'top 85%'
				}
			});
		});

		// Parallax on Scroll
		gsap.to('.parallax-img', {
			yPercent: 15,
			ease: 'none',
			scrollTrigger: {
				trigger: '.parallax-img',
				scrub: true,
				start: "top top",
				end: "bottom top"
			}
		});
	});
</script>

<div class="bg-white selection:bg-crush selection:text-white">
	<!-- Hero Section -->
	<section class="relative min-h-[95vh] md:min-h-screen flex items-center justify-center pt-24 pb-24 md:pb-40 overflow-hidden border-b border-black/5">
		<div class="absolute inset-0 z-0 bg-black pointer-events-none">
			<img 
				src={activeArticle.image} 
				alt={activeArticle.title} 
				class="parallax-img w-full h-full object-cover grayscale opacity-30 scale-105"
			/>
		</div>
		
		<div class="relative z-10 max-w-7xl mx-auto px-4 w-full">
			<div class="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-32 items-start">
				<!-- Title Column (Large/Left) -->
				<div class="lg:col-span-7 xl:col-span-8">
					<div class="hero-meta mb-8 md:mb-12">
						<div class="flex items-center gap-6">
							<p class="text-crush font-bold tracking-[0.6em] uppercase text-[9px] md:text-[10px]">
								{activeArticle.category} // 0{activeIndex + 1}
							</p>
							<span class="w-16 h-px bg-white/10"></span>
						</div>
					</div>

					<h1 class="flex flex-col gap-2 md:gap-4 text-4xl md:text-5xl lg:text-[5.5rem] xl:text-[6.5rem] font-bold leading-[1.1] tracking-[-0.03em] serif italic text-white pointer-events-none">
						<span class="hero-title-line block">{titleFirstHalf}</span>
						<span class="hero-title-line block text-crush lg:pl-16">{titleSecondHalf}</span>
					</h1>

					<!-- Interactive Selectors (Integrated) -->
					<div class="mt-16 md:mt-24 flex items-center gap-4 relative z-30 pointer-events-auto">
						{#each featuredArticles as _, i}
							<button 
								onclick={() => goToSlide(i)}
								class="group flex items-center gap-4 focus:outline-none"
								aria-label="Go to slide {i + 1}"
							>
								<div class="w-12 h-[2px] bg-white/10 relative overflow-hidden group-hover:bg-white/30 transition-colors">
									{#if i === activeIndex}
										<div class="absolute inset-0 bg-crush origin-left animate-slide-right"></div>
									{/if}
								</div>
								<span class="text-[9px] font-bold transition-all duration-500 {i === activeIndex ? 'text-white' : 'text-white/20 group-hover:text-white/40'}">
									0{i + 1}
								</span>
							</button>
						{/each}
					</div>
				</div>

				<!-- Info Column (Side/Right) -->
				<div class="lg:col-span-5 xl:col-span-4 lg:pt-32 flex flex-col gap-12 hero-meta relative z-30 pointer-events-auto">
					<div class="max-w-sm">
						<div class="flex flex-col gap-8 mb-12">
							<div class="p-6 border border-white/5 bg-white/[0.02] backdrop-blur-sm">
								<p class="text-[9px] font-bold uppercase tracking-[0.4em] text-white/20 mb-3">Topic</p>
								<p class="text-white text-xs font-medium tracking-wide uppercase">{activeArticle.category}</p>
							</div>
							<div class="p-6 border border-white/5 bg-white/[0.02] backdrop-blur-sm">
								<p class="text-[9px] font-bold uppercase tracking-[0.4em] text-white/20 mb-3">Vibe</p>
								<p class="text-white text-xs font-medium tracking-wide uppercase italic serif">Experimental / Luxury</p>
							</div>
						</div>

						<p class="text-base md:text-lg font-serif italic text-white/40 mb-12 leading-relaxed">
							{activeArticle.excerpt}
						</p>
						
						<a href="/article/{activeArticle.slug}" class="relative z-40 inline-flex items-center gap-8 group">
							<div class="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-700">
								<ArrowRight class="w-6 h-6 text-white group-hover:text-black transition-colors" />
							</div>
							<span class="text-white text-[10px] font-bold uppercase tracking-[0.5em] group-hover:text-crush transition-colors">Digital Issue</span>
						</a>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Horizontal "Quick Pulse" Section -->
	<section class="horizontal-wrapper bg-black overflow-hidden py-24 md:py-32">
		<div class="px-4 md:px-8 mb-16">
			<h2 class="text-white text-4xl md:text-7xl font-bold serif italic mb-4">Quick Pulse.</h2>
			<p class="text-white/40 uppercase tracking-widest text-[10px]">Essential editorial snapshots</p>
		</div>
		
		<div class="horizontal-scroll flex gap-6 md:gap-8 px-4 md:px-8">
			{#each articles as article}
				<div class="flex-shrink-0 w-[85vw] md:w-[450px]">
					<a href="/article/{article.slug}" class="block aspect-[4/5] bg-neutral-900 overflow-hidden mb-6 relative group">
						<img 
							src={article.image} 
							alt={article.title} 
							class="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700"
						/>
						<div class="absolute inset-0 p-8 flex flex-col justify-end">
							<span class="text-crush text-[10px] font-bold uppercase tracking-widest mb-2">{article.category}</span>
							<h3 class="text-white text-2xl md:text-3xl font-serif italic mb-4 leading-tight">{article.title}</h3>
							<div class="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center text-white group-hover:bg-crush group-hover:border-crush transition-all">
								<Plus class="w-5 h-5" />
							</div>
						</div>
					</a>
				</div>
			{/each}
		</div>
	</section>

	<!-- Main Editorial Grid -->
	<section class="max-w-7xl mx-auto px-4 md:px-8 py-24 md:py-40">
		<div class="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-32">
			<!-- Big Feature -->
			<div class="md:col-span-7">
				<a href="/article/minimalist-architecture" class="group block">
					<div class="bg-black mb-12 overflow-hidden mask-reveal">
						<img 
							src="/images/architecture-minimalism.png" 
							alt="Architecture" 
							class="w-full aspect-[4/5] md:aspect-[3/4] object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
						/>
					</div>
					<div class="flex items-start justify-between">
						<div>
							<p class="text-crush font-bold tracking-widest uppercase text-[10px] mb-4">Culture / Editorial</p>
							<h2 class="text-4xl md:text-6xl font-bold serif italic mb-8 leading-[1.1] group-hover:text-crush transition-colors">
								Minimalist Architecture: <span class="block">The Art of Silence.</span>
							</h2>
							<p class="text-lg md:text-xl text-black/50 max-w-md">How the new wave of designers is reclaiming the urban void as a luxury asset.</p>
						</div>
						<div class="pt-2">
							<ArrowUpRight class="w-8 h-8 text-black/20 group-hover:text-crush transition-colors" />
						</div>
					</div>
				</a>
			</div>

			<!-- Secondary Column (Higher Offset) -->
			<div class="md:col-span-5 md:pt-40 flex flex-col gap-24 md:gap-32">
				{#each articles.filter(a => a.slug !== 'minimalist-architecture').slice(0, 2) as article}
					<a href="/article/{article.slug}" class="group block">
						<div class="bg-black mb-8 overflow-hidden mask-reveal">
							<img 
								src={article.image} 
								alt={article.title} 
								class="w-full aspect-square object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700 group-hover:scale-105"
							/>
						</div>
						<p class="text-black/40 font-bold tracking-widest uppercase text-[10px] mb-4">{article.category} / {article.date}</p>
						<h3 class="text-2xl md:text-3xl font-serif italic group-hover:text-crush transition-colors leading-tight">{article.title}</h3>
					</a>
				{/each}
			</div>
		</div>
	</section>

	<!-- Premium "Sponsored Case" Section -->
	<section class="max-w-7xl mx-auto px-4 md:px-8 py-24 md:py-32 border-t border-black/5">
		<div class="grid grid-cols-1 md:grid-cols-12 gap-12 items-center bg-zinc-50 p-8 md:p-20 relative overflow-hidden group">
			<div class="absolute top-0 right-0 p-8 text-[10px] font-bold tracking-[0.4em] uppercase text-black/10">Partner Showcase</div>
			
			<div class="md:col-span-5 order-2 md:order-1">
				<p class="text-crush font-bold tracking-widest uppercase text-[10px] mb-4">Chronos Collective / Collaboration</p>
				<h2 class="text-4xl md:text-6xl font-serif italic mb-8 leading-tight">The Architecture <span class="block">of Time.</span></h2>
				<p class="text-black/60 text-lg mb-12 leading-relaxed">Introducing the Titanium 01. A timepiece designed with the same brutalist principles that define the modern skyline. Pure. Silent. Eternal.</p>
				<button class="flex items-center gap-4 text-xs font-bold uppercase tracking-widest hover:text-crush transition-colors">
					Examine Selection <ExternalLink class="w-4 h-4" />
				</button>
			</div>
			
			<div class="md:col-span-7 order-1 md:order-2">
				<div class="overflow-hidden mask-reveal">
					<img 
						src="/images/luxury-watch.png" 
						alt="Sponsored" 
						class="w-full aspect-[16/9] object-cover group-hover:scale-105 transition-transform duration-1000"
					/>
				</div>
			</div>
		</div>
	</section>

	<!-- More Articles Grid (Traditional but refined) -->
	<section class="max-w-7xl mx-auto px-4 md:px-8 py-24 md:py-40">
		<div class="mb-16 flex items-end justify-between">
			<h2 class="text-4xl md:text-6xl font-bold serif italic leading-none">The Archives.</h2>
			<a href="#" class="text-xs font-bold uppercase tracking-widest hover:text-crush transition-colors border-b border-black/20 pb-1">View All</a>
		</div>
		
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-8">
			{#each articles.slice(0, 4) as article}
				<a href="/article/{article.slug}" class="group">
					<div class="aspect-square bg-zinc-100 mb-6 overflow-hidden relative">
						<img src={article.image} alt={article.title} class="w-full h-full object-cover grayscale opacity-80 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700" />
					</div>
					<p class="text-[9px] font-bold uppercase tracking-widest text-black/40 mb-2">{article.category} / {article.date}</p>
					<h3 class="text-lg font-serif italic group-hover:text-crush transition-colors leading-tight mb-4">{article.title}</h3>
					<div class="w-full h-[1px] bg-black/5 group-hover:bg-crush transition-colors"></div>
				</a>
			{/each}
		</div>
	</section>

	<!-- Branding Quote -->
	<section class="py-32 md:py-40 bg-white border-y border-black/5">
		<div class="max-w-4xl mx-auto px-4 text-center">
			<h2 class="text-3xl md:text-7xl font-serif italic leading-tight mb-12 px-4 md:px-0">
				"Crush is not about the trend. It's about the <span class="text-crush underline decoration-1 underline-offset-8">texture</span> of the moment."
			</h2>
			<div class="flex items-center justify-center gap-4">
				<span class="h-px w-8 bg-black/10"></span>
				<p class="uppercase tracking-[0.4em] text-[10px] font-bold text-black/40">Editorial Manifesto</p>
				<span class="h-px w-8 bg-black/10"></span>
			</div>
		</div>
	</section>
</div>

<style>
	.vertical-text {
		writing-mode: vertical-rl;
	}
	@keyframes slide-right {
		from { transform: translateX(-100%); }
		to { transform: translateX(0); }
	}
	.animate-slide-right {
		animation: slide-right 9s linear infinite;
	}
</style>
