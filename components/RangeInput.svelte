<script>
  export let inputPrice = 2;
  export let min;
  export let max;
</script>

<div class="p-2 w-full font-sans text-sm rounded-md border">
  <label for="rangeInput">
    Minimum Price: ${inputPrice}
  </label>
  <input
    id="rangeInput"
    type="range"
    class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
    {min}
    {max}
    bind:value={inputPrice}
  />

</div>
