<script>
	import { Search } from 'lucide-svelte';
	import { menuStore } from '$lib/stores/menu.js';
	import { isHeaderVisible } from '$lib/stores/scroll.js';

	let { transparent = false } = $props();
</script>

<header 
	class="fixed top-0 left-0 w-full z-50 transition-transform duration-500 ease-in-out"
	class:border-b={!transparent}
	class:border-black/5={!transparent}
	class:bg-white/80={!transparent}
	class:backdrop-blur-md={!transparent}
	class:-translate-y-full={!$isHeaderVisible}
>
	<div class="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
		<button 
			class="group flex items-center gap-3 p-2 hover:bg-black/5 rounded-full transition-all" 
			onclick={() => menuStore.toggle()}
		>
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
			<a 
				href="#" 
				class="hidden md:block px-6 py-2 bg-black text-white text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-crush transition-all hover:scale-105 active:scale-95"
			>
				Join The Pulse
			</a>
		</div>
	</div>
</header>
