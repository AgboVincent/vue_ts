<template>
<canvas ref="myCanvas" class="canvas-overlay" :style="{height: height, width: width}"></canvas>
</template>

<script>   
export default {
    name: "BoundingBox",
    components: {},
    props: ["box", "width", "height"],
    data(){
        return{
            canvas: null
        }
    },
    methods:{
        draw() {
            let canvas = this.$refs['myCanvas'];
            const context = canvas.getContext('2d');
            context.strokeStyle = "#1f75fe";
            context.beginPath();
            context.lineWidth = 5;
            context.rect(this.box[0]*0.2, this.box[1]*0.2, this.box[2]*0.2, this.box[3]*0.2);
            context.stroke();
        }
    },
    mounted(){
        this.draw();
        console.log(this.url)
    }
}
</script>

<style scoped>
.canvas-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
}
    
</style>