<template>


   <div class="whoBox" >
     <div class="imgCont" style="display: inline-block; float: left">
       <img src="https://umbc.edu/wp-content/uploads/2022/06/edited-Fouts-group-image_67194113-scaled-e1655476278541.jpg" style="object-fit: cover; max-height: 100%; max-width: 320px; border-radius: .45em; margin: .1vw">
     </div>
      <div class="whoCont" style="display: inline-block">
        <h1>Who Are We?</h1>
        <p>
          <br>AccommodateMe consists of five founding members, Michael, Daniel, Bill, Finn and Éanna
          all studying Computer Science in University of Galway. We all live in rented accommodation in Galway
          City and know first hand how hard it is to secure affordable accommodation in the current Housing Crisis.
        </p>
      </div>
  </div>

  <div class="whatBox">
    <div class="whatCont">
    <h1>What we Do</h1>
      <p>
        <br>Our primary goal would be to connect students with suitable accommodation options in Galway.
        We let students choose which area they would like to live in, and create groups with other viable tenants
        to contact the landlord and show interest in the property.
      </p>
    </div>


  <div class="card">
    <div class="card-header">
      Our Motto
    </div>
    <div class="card-body">
      <blockquote class="blockquote mb-0">
        <p>“Where Student Meets Houses"</p>
        <footer class="blockquote-footer"> <cite title="Source Title"></cite></footer>
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