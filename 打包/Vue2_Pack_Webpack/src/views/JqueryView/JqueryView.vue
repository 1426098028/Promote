<template>
  <div>全局 CDN Jquery</div>
</template>

<script>
export default {
  data() {
    return {};
  },
  beforeCreate() {
    // eslint-disable-next-line no-undef
    console.log("jquery", jQuery);
    // eslint-disable-next-line no-undef
    console.log("jquery", $);
  },
};
</script>
