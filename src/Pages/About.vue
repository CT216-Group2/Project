<template>


   <div class="whoBox" >
     <div class="imgCont" style="display: inline-block; float: left">
       <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.oCEiGtGNOp4ljlQ3vEUBkAHaFj%26pid%3DApi&f=1&ipt=549483e457826ea98d5c32e4ce17193e1cdc401d42c4cedf939283a4217d79c7&ipo=images" style="object-fit: cover; max-height: 100%; max-width: 320px; border-radius: .45em; margin: .1vw">
     </div>
      <div class="whoCont" style="display: inline-block">
        <h1>Who Are We?</h1>
        <p>
          <br>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci veli
        </p>
      </div>
  </div>

  <div class="whatBox">
    <div class="whatCont">
    <h1>What We Do</h1>
      <p>
        <br>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci veli
      </p>
    </div>


  <div class="card">
    <div class="card-header">
      Our Motto
    </div>
    <div class="card-body">
      <blockquote class="blockquote mb-0">
        <p>“Dogs have important jobs, like barking when the doorbell rings, but cats have no function in a house whatsoever."</p>
        <footer class="blockquote-footer">W. Bruce Cameron <cite title="Source Title">A Dogs Purpose</cite></footer>
      </blockquote>
    </div>
  </div>
  </div>


</template>

<script>
export default {
  name: "About"
}
</script>

<style scoped>
  .whoBox, .whatBox{
    width: 100vw;
  }

  .imgCont{
    width: 30vw;
    margin-top: 10vh;
    padding: 0px;
    border-radius: .45em;
    max-height: 100%;
    margin-left: 2vw;
  }

  .whoCont, .whatCont {
    margin-top: 10vh;
    padding: 3vh;
    border-radius: .45em;
    background-color: #FFFDD0;
    width: 55vw;
    color: black;
    border: solid;
    border-width: 1px;
    border-color: #9e9e9e;
  }
  .whoCont{
    align-content: end;
    margin-left: 5vw;
    margin-right: 2vw;
    align-content: end;
  }
  .whatCont{
    display: inline-block;
    margin-left: 2vw;
    text-align: left;
  }
  .card-header{
    background-color: #FFFDD0;
  }
  .card{
    display: inline-block;
    margin-top: 10vh;
    width: 25vw;
    float: right;
    margin-right: 10vw;
  }
</style>