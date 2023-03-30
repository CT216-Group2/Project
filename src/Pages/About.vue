<template>
  <div class="fullPage">

    <div class="whoBox" >
      <div class="imgCont" style="display: inline-block; float: left">
        <img src="https://umbc.edu/wp-content/uploads/2022/06/edited-Fouts-group-image_67194113-scaled-e1655476278541.jpg" style="object-fit: cover; max-height: 100%; max-width: 320px; border-radius: .45em; margin: .1vw">
      </div>
      <div class="whoCont" style="display: inline-block">
        <h1>Who Are We</h1>
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
            <p>“Where Students Meet Houses"</p>
            <footer class="blockquote-footer">The Team<cite title="Source Title"></cite></footer>
          </blockquote>
        </div>
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
.fullPage{
  font-family:  Roboto Slab, serif;
}
.whoBox {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 20px;
  padding: 20px;
  background-color: white;
  box-shadow: 0 0 10px rgba(0,0,0,0.5);
}
.whoBox img {
  width: 300px;
  max-height: 100%;
  object-fit: cover;
  border-radius: .45em;
}
.card, .whatBox {
  margin-top: 20px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0,0,0,0.5);
}
.imgCont{
  margin-right:10px;
}
.whatBox{
  background-color: white;
  margin: 20px;
  padding: 20px;
}
.card-header {
  font-size: 1.25em;
  font-weight: bold;
  background-color: #FFFDD0;
}
</style>