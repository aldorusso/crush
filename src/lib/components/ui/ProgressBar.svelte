<script>
	import { scrollProgress } from '$lib/stores/scroll.js';
</script>

<div class="fixed top-0 left-0 w-full h-1 z-[100]">
	<div 
		class="h-full bg-crush transition-all duration-150 ease-out shadow-[0_0_10px_rgba(255,0,85,0.5)]" 
		style="width: {$scrollProgress}%"
	></div>
</div>
