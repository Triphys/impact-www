<template>
  <div>

    <div v-for="(slice, index) in slices" :key="'slice-' + index">

      <!-- {{slice}} -->
      <!-- {{slice.slice_type}} -->


      <!-- HEADER -->
      <template v-if="slice.slice_type === 'content_-_heading'">
        <slice-heading :sliceRaw="slice"/>
      </template>

    
      <!-- TEXT -->
      <template v-if="slice.slice_type === 'text'">
        <slice-text :sliceRaw="slice"/>
      </template>


      <!-- IMAGE & TEXT -->
      <template v-if="slice.slice_type === 'image-and-text'">
        <slice-text :sliceRaw="slice"/>
      </template>


      <!-- VIDEO -->
      <template v-if="slice.slice_type === 'video'">
        <slice-video :sliceRaw="slice"/>
      </template>


      <!-- IMAGE -->
      <template v-if="slice.slice_type === 'image'">
        <slice-image :sliceRaw="slice"/>
      </template>


      <!-- IMAGE + TEXT -->
      <template v-if="slice.slice_type === 'image___text_'">
        <slice-image-text :sliceRaw="slice"/>
      </template>


    </div>
  </div>
</template>

<script>

import sliceHeading  from '~/components/slices/impact-heading.vue'
import sliceVideo  from '~/components/slices/impact-video.vue'
import sliceImage  from '~/components/slices/impact-image.vue'
import sliceText  from '~/components/slices/impact-text.vue'
import sliceImageText  from '~/components/slices/impact-content.vue'


export default {
  name: 'site-slices',
  props: [
    'slicesRaw'
  ],
  components: {
    sliceHeading,
    sliceImageText,
    sliceVideo,
    sliceImage,
    sliceText,
    sliceImageText
  },
  data () {
    return {
      slices: this.slicesRaw
    };
  }

};
</script>

