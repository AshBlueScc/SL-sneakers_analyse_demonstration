<template>
  <div class="element-card"> 
        <div class="front-facing"> 
            <h1 class="abr">Au</h1> 
            <p class="title">金</p> 
            <span class="atomic-number">79</span> 
            <span class="atomic-mass">196.97</span> 
        </div> 
        <div class="back-facing"> 
            <p>金是一种过渡金属，在溶解后可以形成三价及单价正离子。金与大部分化学物都不会发生化学反应，但可以被氯、氟、王水及氰化物侵蚀。金能够被水银溶解，形成汞齐，但这并非化学反应。</p> 
        </div> 
    </div>
</template>
<script>
  // $('.element-card').on('click', function() { 
  //       if ($(this).hasClass('open')) { 
  //           $(this).removeClass('open'); 
  //       } else { 
  //           $('.element-card').removeClass('open'); 
  //           $(this).addClass('open'); 
  //       } 
  //   });
  export default {};
</script>
<style lang="scss" scoped>
.element-card { 
    position:relative; 
    width:100px; 
    height:130px; 
    -webkit-transform-style:preserve-3d; 
    transform-style:preserve-3d; 
    -webkit-transform:rotatey(0deg) translatex(0px) translatey(0px); 
    transform:rotatey(0deg) translatex(0px) translatey(0px); 
    -webkit-transition:all 0.6s cubic-bezier(0.68,-0.55,0.265,1.55); 
    transition:all 0.6s cubic-bezier(0.68,-0.55,0.265,1.55); 
    box-shadow:4px 4px 20px rgba(0,0,0,0.4); 
    margin:5px; 
    cursor:pointer; 
} 
.element-card:hover { 
    -webkit-transform:rotatey(45deg) translatex(0px) translatey(0px); 
    transform:rotatey(45deg) translatex(0px) translatey(0px); 
} 
// .element-card.open { 
//     width:200px; 
//     height:260px; 
//     -webkit-transform:rotatey(-180deg) translatex(0px) translatey(0px); 
//     transform:rotatey(-180deg) translatex(0px) translatey(0px); 
// } 
// .element-card .front-facing { 
//     -webkit-transform:rotateY(0deg) translateZ(2px); 
//     transform:rotateY(0deg) translateZ(2px); 
//     position:absolute; 
//     top:0; 
//     left:0; 
//     bottom:0; 
//     right:0; 
//     background-color:#ecf0f1; 
//     border:2px white solid; 
//     border-radius:5px; 
// }
</style>
