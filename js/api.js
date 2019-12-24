const base_url = "https://api.football-data.org/v2/";
const standings = "competitions/2019/standings/";
const matches = "competitions/2019/matches/";
const team = "competitions/2019/teams/";
var option = {
  method: "get",
  mode: "cors",
  headers: {
    "X-Auth-Token": "a12b032d87f748319f6d17872c5d6d1b"
  }
};

function status(response) {
  if (response.status !== 200) {
    console.log("Error " + response.status);
    return Promise.reject(new Error(response.statusText));
  } else {
    return response;
  }
}

function json(response) {
  return response.json();
}

function error(error) {
  console.log("Error :" + error);
}

function getTeam() {
  fetch(base_url+ team, option)   
  .then(status)
  .then(json)
  .then(function (data) {
    var contentHTML = "";
    data.teams.forEach(function (list) {
      var url = list.crestUrl.replace(/^http:\/\//i, "https://");
      contentHTML += `
       <div class="col s12 m6">
          <div class="card">
            <div class="card-image deep-orange">
              <img src="${url}" class="responsive-img" style="width: 336px; height:300px;padding: 50px"/>
              <a href="./detail.html?id=${list.id}" class="btn waves-effect white grey-text darken-text-2 right">detail</a>
              <h3 class="card-title">${list.id}</h3>                       
            </div>
            <div class="card-content">
            <p>${list.name}</p>       
              <a href="${list.website}">${list.website}</a>
            </div>  
          </div>
        </div>
     
      `;
    });
    document.getElementById("team").innerHTML = contentHTML;
  })    
  .catch(error);
}

function getTeamId() {
  var urlParams = new URLSearchParams(window.location.search);
  var id = urlParams.get("id");

  fetch(base_url + "teams/" + id, option)
  .then(status)
  .then(json)
  .then(function(data) {
    var url = data.crestUrl.replace(/^http:\/\//i, "https://");
    var squadName = "";
    data.squad.forEach(function(squad) {
      squadName += `
      ${squad.name} (${squad.position})</br>
      `;
    });
    var detail = "";
    var url = data.crestUrl.replace(/^http:\/\//i, "https://");
    detail = `    
    <div class="row">
      <img class="responsive-img" src="${url}" style="max-width: 200px;max-height:200px"/>
    </div>
      <table class="highlight striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
		    <tbody>
 		      <tr>
            <td>ID Team</td>
            <td>${data.id}</td>
          </tr>
		      <tr>
            <td>Team Name</td>
            <td>${data.name}</td>
          </tr>
          <tr>
            <td>Phone</td>
            <td>${data.phone}</td>
          </tr>
          <tr>
            <td>Address</td>
            <td>${data.address}</td>
          </tr>
          <tr>
            <td>Webiste</td>
            <td>${data.website}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>${data.email}</td>
          </tr>
          <tr>
            <td>Founded</td>
            <td>${data.founded}</td>
          </tr>
          <tr>
            <td>Club Colors</td>
            <td>${data.clubColors}</td>
          </tr>
          <tr>
            <td>Venue</td>
            <td>${data.venue}</td>
          </tr>
          <tr>
            <td>Squad</td>
            <td>${data.squad.length}</td>
          </tr>
          <tr>
            <td>Squad Name</td>
            <td>${squadName}</td>
          </tr>
          <tr>
            <td>Last Updated</td>
            <td>${data.lastUpdated}</td>
          </tr>                        
          <tr>
            <td class="fixed-action-btn">
              <button onclick="addTeam(${data.id},'${data.name}','${data.website}','${url}')"
              <a class="btn-floating btn-large red" id="save">
              <i class="large material-icons">save</i>
              </a>
            </td>
          </tr>
        </tbody>
      </table>                 
    `;
    document.getElementById("detail").innerHTML = detail;
  })
  .catch(error);
}

function getStandings() {
  fetch(base_url + standings, option)
  .then(status)
  .then(json)
  .then(function(data) {
    var seasonHTML = "";
    var contentHTML = "";
    seasonHTML += `    
    <div class="row">
      <h4 class="blue-text">Season</h4>
      <h6 class="orange-text">${data.season.startDate} - ${data.season.endDate}</h6>
    </div>  
    `;
    document.querySelector("#title-season").innerHTML = seasonHTML;
  
    data.standings[0].table.forEach(function(table, index) {
      var url = table.team.crestUrl.replace(/^http:\/\//i, "https://");
      contentHTML += `
      <tr>
        <td>${table.position} <img style="max-width: 25px;max-height: 25px;" class="circle" src="${url}"/></td>
        <td>${table.team.name}</td>
        <td>${table.playedGames}</td>
        <td>${table.won}</td>
        <td>${table.draw}</td>
        <td>${table.lost}</td>
        <td>${table.goalsFor}</td>
        <td>${table.goalsAgainst}</td>
        <td>${table.goalDifference}</td>
        <td>${table.points}</td>
      </tr>
      `;                    
    });
    document.querySelector("#table-detailTeam").innerHTML = contentHTML;
    })
      .catch(error);
  }
  
function getMatches() {
  fetch(base_url + matches, option)
  .then(status)
  .then(json)
  .then(function(data) {
    var title_match = `
    <div class="row">
      <h4>${data.competition.name}</h4>
      <h6 class="blue-text">Last update : ${data.competition.lastUpdated}</h6>
    </div>            
    `;    
    document.querySelector("#title-matches").innerHTML = title_match;
    var matchesHTML = "";
    data.matches.forEach(function(match) {
      var winner;
      if (match.score.winner == "HOME_TEAM") {
        winner = match.homeTeam.name;
      } else if (match.score.winner == "AWAY_TEAM") {
        winner = match.awayTeam.name;
      } else if (match.status == "FINISHED") {
        winner = "Draw";
      } else {
        winner = "-";
      }
      if (match.status == "FINISHED") {
        matchesHTML += `
        <tr>
          <td class="orange-text">${match.homeTeam.name}</br>${match.awayTeam.name}</td>
          <td>${winner}</td>
          <td>${match.score.fullTime.homeTeam} - ${match.score.fullTime.awayTeam}</td>
          <td>${match.matchday}</td>
          <td>${match.utcDate}</td>
          <td>${match.status}</td>
        </tr>            
        `;
      } else {
        matchesHTML += `
        <tr>
          <td class="green-text">${match.homeTeam.name}</br>${match.awayTeam.name}</td>
          <td>${winner}</td>
          <td>None</td>
          <td>${match.matchday}</td>
          <td>${match.utcDate}</td>
          <td>${match.status}</td>
        </tr>            
        `;
      }
    });
    document.querySelector("#matches-detail").innerHTML = matchesHTML;
  })
  .catch(error);
}  
  
function getFavourite(items){

  var kontenSave = "";

  items.forEach(function(item){
      var id = item.idTeam;
      var name = item.nameTeam;
      var website = item.websiteTeam;
      var url = item.urlTeam;

      kontenSave +=`
      <div class="col s12 m6">
        <div class="card">
          <div class="card-image deep-orange">
            <img src="${url}" class="responsive-img" style="width: 336px; height:300px;padding: 50px"/>
            <a href="./detail.html?id=${id}" class="btn waves-effect white grey-text darken-text-2 right">detail</a>
            <button onclick="delTeam(${id})" class="btn waves-effect white grey-text darken-text-2">Delete</button>
            <h3 class="card-title">${id}</h3>                       
          </div>
          <div class="card-content">
          <p>${name}</p>       
            <a href="${website}">${website}</a>
          </div>  
        </div>
      </div>        
      `;
  });
  document.getElementById("saved").innerHTML=kontenSave
}

function showAddSuccessNotification(name){
  const title = "Adding Success";
  const option = {
    'body': 'Adding '+name+' to favourite'
  }

  if(Notification.permission === "granted"){
      navigator.serviceWorker.ready.then(function(registration){
          registration.showNotification(title,option);
      })
  }
}

function showDeleteSuccessNotification(name){
  const title = "Delete Success";
  const option = {
    'body': 'Delete item from favourite'
  }

  if(Notification.permission === "granted"){
      navigator.serviceWorker.ready.then(function(registration){
          registration.showNotification(title,option);
      })
  }
}