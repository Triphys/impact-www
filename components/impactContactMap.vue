<template>

  <div class="impact-page impact-page-contact site-grid" >

    <div class="gc -maximize">
      <div class="g-12 map">
        <GMap
          ref="gMap"
          :center="{lat: cmsLocations[0].latitude, lng: cmsLocations[0].longitude}"
          :options="{fullscreenControl: false, streetViewControl: false, mapTypeControl: false, zoomControl: false, gestureHandling: 'cooperative', styles: mapStyle}"
          :zoom="13"
        >
          <GMapMarker
            v-for="location in cmsLocations"
            :key="location.id"
            :position="{lat: location.latitude, lng: location.longitude}"
            :options="{icon: pins.icon}"
          >
          </GMapMarker>
        </GMap>
        <a v-if="raw.primary.directions_link.url" :href="raw.primary.directions_link.url" target="_blank" class="btn-direction">Get directions</a>
      </div>
    </div>  

  </div>

</template>

<script>
export default {
  props: ['sliceRaw'],
  name: 'one-map',
  data() {
    return {
      raw: this.sliceRaw,
      anchor: this.sliceRaw.primary.anchor[0].text || false,
      theme: '-theme-' + this.sliceRaw.primary.theme.toLowerCase() || false,
      title: this.sliceRaw.primary.title1[0].text || false,
      text: this.sliceRaw.primary.text[0].text || false,
      cmsLocations: this.sliceRaw.items[0].coordinates.latitude !== 0 ? [this.sliceRaw.items[0].coordinates] : [ { "latitude": 59.338675, "longitude": 18.068568000000013 } ],
      pins: {
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA2CAYAAACMRWrdAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Qzk4NjA0RjM0QjI4MTFFQTg0OUNGOTlDNDZFMEM3QzIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Qzk4NjA0RjQ0QjI4MTFFQTg0OUNGOTlDNDZFMEM3QzIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpDOTg2MDRGMTRCMjgxMUVBODQ5Q0Y5OUM0NkUwQzdDMiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpDOTg2MDRGMjRCMjgxMUVBODQ5Q0Y5OUM0NkUwQzdDMiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pt1s6r8AAATbSURBVHja7Jp9aFV1GMd35zazzE022UpaTbqmTfMFscT5gogmQxwkaIVoq6E1NREbhFSmCEH5RvmCNo3QYq4/lHwZSktE3cytmJvOtULm8CWz0KWja5u37xPPHT9+nnPu7+WeeZUe+Pyxc85zzvn+fs95fs/zuwuEw+GEB9ESEx5QS+qGZ2SC10Ee6AWawA5w0tenUij6SD5oCzvbR34+O+DjNzYSVIEUj2uKwOd+PNwvYRTip8DwKNfdAIPAlfsleSxTEEWWCjbcLzMWBPWgp4ZPPjgQz8ICoBJM1PRrAc+C9ngNxUIDUWRPgpXxOmNZ4Bx/NyZ2g9e8ULzN2GcWoshWgMcs7xHzBXpG2M6qQA/wPdgSLwt0H9AIHjf0vw1GgPFgM401GAeO3+sZ22w5W++BbKn0OgtSbN7LVlSepag6FnDI4dz79yoUaQGuA88Y+neCFzgMt7qE6HPcDXRrVlxuIYpsHbgK1ricT2HBge78xoaAfyxCsBk87BKCshV1VyjSLJ8Az1vMFlUnA11CULbrYLB2B2AwGostEwatU/3BdQ2fMr+zIqXlmxaiWkEfsN/AN9/PUDwIXrQIwekgg/c8dK0V5HA2jelmziuWor4CNVwom9gR/r6VhKnOWDq/UIbhS13jfusWaOCR1/UfzJ35j2B3rJLHl5YJ42XhXpMN/OeAYaADXAapsUgeUyxFfetwzy80/A9z5f+DcGyjrTBaRM9biGrj1C7fNx1cVfBvBwPA29LxO2C0jbC1lrM13+PesxX83/FYYn4CSSbCRoFOC1HUNAaiDNw+D//Ii3tds1RXWBK3FKZGIRRUXPD/cvDv5IGdFeU5NJNP6Ah71zIEl2lUCYsc/OkT6AuuKDxrj6owGum/LUTVcBZTFZbIex4RawG9wTaNZxZEE0bfxBELUdTKDDUorHPBbb7HNDBB87kXeDBchb1hGYIrLdr5D8HX4CHQZPDsNW7CsjRbCdnOgJ4Wwsg3gwfHxFo4rO+q7r8BLxnWgnfAWFAdg5+ffgdpBr4F3AH8DG5GqvtxFqLIPuXiVnffPszF9W/8dwdY5bEP4mbloALUgm3//TRlULvJRiXXI2CToT+tRY8KIUkZtVbD/w+QCVYItWXXN2azGFO1Pt7CfzUvMYmCuJFcyavYXN5cCgkbRV3CfjV8qe2cxZoN/Rs5TTc4lEefKPgf4hmuFo7Vi8IqDV6K+qI08LGhKKrQx/COb5iLgkEanQWF8FNgiXR8pyisxODFCrie6zAUtp6FhIRj1VLVMtXDn1qZHIfKf6ooLI0/QlUrB8ngtEXCoYRxzKVVEUNyl8M1kQGQN1wrnBboORpZKEsIIdOE86bLOTkk+0mDHuISbJ5DU5vtVlIdUMxCuVII6Vgpd9VtHtfIIfmacO4DHtg/JZ9ir1oxO8oDKxyykI5d5LDfq9g9i8X5d5w9k/lTEO2o3NQ61WxveWShbIcspJtwZipeG+L1KfJeT/M+R4FD6AZV+rEAj4BsC3ljpd1QVJlG8yj2duK+Bq2Zl6IkG88OWm42j3EIVhqKusZJoNTAt1B6t93CuRNuGzpebUSJlKWKLELwVTDJ0LdEeq8UFlssN5eqP0okcaVM/8VWCsoM2wmq3hfwvYKavr+ApaAtXv6t7///CfbL/hVgAMKP5l3j6gFzAAAAAElFTkSuQmCC"
      },

      mapStyle: [
                  {
                    "elementType": "geometry",
                    "stylers": [
                      {
                        "color": "#212121"
                      }
                    ]
                  },
                  {
                    "elementType": "labels",
                    "stylers": [
                      {
                        "visibility": "off"
                      }
                    ]
                  },
                  {
                    "elementType": "labels.icon",
                    "stylers": [
                      {
                        "visibility": "off"
                      }
                    ]
                  },
                  {
                    "elementType": "labels.text.fill",
                    "stylers": [
                      {
                        "color": "#757575"
                      }
                    ]
                  },
                  {
                    "elementType": "labels.text.stroke",
                    "stylers": [
                      {
                        "color": "#212121"
                      }
                    ]
                  },
                  {
                    "featureType": "administrative",
                    "elementType": "geometry",
                    "stylers": [
                      {
                        "color": "#212121"
                      }
                    ]
                  },
                  {
                    "featureType": "administrative.country",
                    "elementType": "labels.text.fill",
                    "stylers": [
                      {
                        "color": "#9e9e9e"
                      }
                    ]
                  },
                  {
                    "featureType": "administrative.land_parcel",
                    "stylers": [
                      {
                        "visibility": "off"
                      }
                    ]
                  },
                  {
                    "featureType": "administrative.locality",
                    "elementType": "labels.text.fill",
                    "stylers": [
                      {
                        "color": "#bdbdbd"
                      }
                    ]
                  },
                  {
                    "featureType": "administrative.neighborhood",
                    "stylers": [
                      {
                        "visibility": "off"
                      }
                    ]
                  },
                  {
                    "featureType": "poi",
                    "elementType": "labels.text.fill",
                    "stylers": [
                      {
                        "color": "#757575"
                      }
                    ]
                  },
                  {
                    "featureType": "poi.business",
                    "stylers": [
                      {
                        "visibility": "off"
                      }
                    ]
                  },
                  {
                    "featureType": "poi.park",
                    "elementType": "geometry",
                    "stylers": [
                      {
                        "color": "#181818"
                      }
                    ]
                  },
                  {
                    "featureType": "poi.park",
                    "elementType": "labels.text.fill",
                    "stylers": [
                      {
                        "color": "#616161"
                      }
                    ]
                  },
                  {
                    "featureType": "poi.park",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                      {
                        "color": "#1b1b1b"
                      }
                    ]
                  },
                  {
                    "featureType": "road",
                    "stylers": [
                      {
                        "color": "#f98620"
                      }
                    ]
                  },
                  {
                    "featureType": "road",
                    "elementType": "geometry.fill",
                    "stylers": [
                      {
                        "color": "#f98620"
                      },
                      {
                        "weight": 1.5
                      }
                    ]
                  },
                  {
                    "featureType": "road",
                    "elementType": "labels.icon",
                    "stylers": [
                      {
                        "visibility": "off"
                      }
                    ]
                  },
                  {
                    "featureType": "road",
                    "elementType": "labels.text.fill",
                    "stylers": [
                      {
                        "color": "#8a8a8a"
                      }
                    ]
                  },
                  {
                    "featureType": "road.arterial",
                    "elementType": "geometry",
                    "stylers": [
                      {
                        "color": "#373737"
                      }
                    ]
                  },
                  {
                    "featureType": "road.arterial",
                    "elementType": "labels",
                    "stylers": [
                      {
                        "visibility": "off"
                      }
                    ]
                  },
                  {
                    "featureType": "road.highway",
                    "elementType": "geometry",
                    "stylers": [
                      {
                        "color": "#3c3c3c"
                      }
                    ]
                  },
                  {
                    "featureType": "road.highway",
                    "elementType": "geometry.fill",
                    "stylers": [
                      {
                        "color": "#f98620"
                      }
                    ]
                  },
                  {
                    "featureType": "road.highway",
                    "elementType": "labels",
                    "stylers": [
                      {
                        "visibility": "off"
                      }
                    ]
                  },
                  {
                    "featureType": "road.highway.controlled_access",
                    "elementType": "geometry",
                    "stylers": [
                      {
                        "color": "#4e4e4e"
                      }
                    ]
                  },
                  {
                    "featureType": "road.highway.controlled_access",
                    "elementType": "geometry.fill",
                    "stylers": [
                      {
                        "color": "#f98620"
                      },
                      {
                        "weight": 1.5
                      }
                    ]
                  },
                  {
                    "featureType": "road.local",
                    "stylers": [
                      {
                        "visibility": "off"
                      }
                    ]
                  },
                  {
                    "featureType": "road.local",
                    "elementType": "labels.text.fill",
                    "stylers": [
                      {
                        "color": "#616161"
                      }
                    ]
                  },
                  {
                    "featureType": "transit",
                    "stylers": [
                      {
                        "visibility": "off"
                      }
                    ]
                  },
                  {
                    "featureType": "transit",
                    "elementType": "labels.text.fill",
                    "stylers": [
                      {
                        "color": "#757575"
                      }
                    ]
                  },
                  {
                    "featureType": "water",
                    "stylers": [
                      {
                        "color": "#313131"
                      }
                    ]
                  },
                  {
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [
                      {
                        "color": "#000000"
                      }
                    ]
                  },
                  {
                    "featureType": "water",
                    "elementType": "geometry.fill",
                    "stylers": [
                      {
                        "color": "#1a1a1a"
                      }
                    ]
                  },
                  {
                    "featureType": "water",
                    "elementType": "labels.text.fill",
                    "stylers": [
                      {
                        "color": "#3d3d3d"
                      }
                    ]
                  }
                ],
    }
  },
  mounted() {
      if (process.client) {
        if (document.querySelector('.nuxt-link-handler')){
          document.querySelector('.nuxt-link-handler').classList.add("-debug-comp")
          document.querySelector('.nuxt-link-handler').addEventListener('click', event => {
            event.preventDefault()
            this.$router.push(event.target.pathname)
          })
        }
      }
    },
}
</script>


<style lang="scss">

  .impact-page-contact {

    display: block;
    background-color: #1a1a1a;
    padding-top: 48px !important;
    padding-bottom: 0px !important;
    
    .header-primary {
      text-align: center;
      margin-bottom: 16px;
    }
    .map {
      position: relative;

    }
    .GMap__Wrapper {
      height: auto;
      min-height: 66vh;
    }
    .GMap__Wrapper {
      > div {
        height: 108% !important;  
      }
    }

    .btn-direction {
      position: absolute;
      right: 32px;
      bottom: 32px;
      text-decoration: none;
      color: $white;
      display: block;
      background: $orange;
      height: 32px;
      padding: 0 16px;
      line-height: 32px;
      text-align: center;
      margin: 0 0 0 8px;
      border-radius: 100px;
      text-transform: uppercase;
      font-size: 16px;
      font-family: $font-oswald;

      &:hover {
        background: darken($orange, 12);

      }
    }

    .gc-text {
      margin-bottom: 48px
    }

    .adress-card {
      position: relative;
      svg {
        display: none;
      }
      > div {
        background-color: #313131;
        border-radius: 3px;
        box-shadow: 0 10px 20px 0 rgba(0,0,0,.1);
        padding: 16px 18px;

        p {
          margin: 0;
          color: #aaa;
          font-size: 14px;
          strong {
            color:$orange;
            font-size: 16px;
          }
          i, em {
            color:$orange;
            font-style: normal;
          }
        }

      } 
    }

    .col {
      flex: 1;
      box-sizing: border-box;

    }
    .col-body {
      padding: 32px;
    }

    .teaser-image {
      position: relative;
      overflow: hidden;
      z-index: 0;

      figure {
        @include aspect-ratio-img(2.3,1);

        .triangel {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translate(-50%, 0);
          width: 0;
          height: 0;
          border-left: 16px solid transparent;
          border-right: 16px solid transparent;
          border-bottom: 16px solid $white;
        }
      }

    }



    // 600px
    @media screen and (min-width: 600px)  {
      .header-primary {
        text-align: left;
      }
      .header-primary .header {
        margin-bottom: 12px;
      }
      .gc{
        &.-flex-center-600 {
          display: flex;
          align-items: center;
          flex-direction: row;
        }
      }
    }


    // 768px
    @media screen and (min-width: 768px)  {

      .adress-card {
        svg {
          fill: #aaa;
          display: block;
          position: absolute;
          top: 28px;
          right: 44px;
          height: 64px;
          width: 64px;
        }        
      }

      &.-image-right {
        flex-direction: row-reverse;
        text-align: right;
        .header-primary {
          text-align: right;
        }
      }

      .col-body {
        padding: 24px;
      }

      .teaser-image {
        figure {
          @include aspect-ratio-img(16,12);
          .triangel {
            position: absolute;
            bottom: 50%;
            left: auto;
            right: 0;
            transform: translate(0, 50%);
            width: 0;
            height: 0;
            border-top: 24px solid transparent;
            border-bottom: 24px solid transparent;
            border-right: 24px solid $white;
          }
        }
      }

    }

    // 1024px
    @media screen and (min-width: 1024px)  {

      .col-body {
        padding: 32px;
      }

      .teaser-image {
        figure {
          @include aspect-ratio-img(16,9);
        }
      }

    }

    // 1280px
    @media screen and (min-width: 1280px)  {

      .col-body {
        padding: 56px;
      }

    }

  }

</style>
