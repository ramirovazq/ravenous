const clientId = 'fMogiUCHUzyAzRq_OJSEwA';
const secret = 'J7KUn5i136fdIUlxn0ctxUcklYN5ZZjDwj5alKPW1lOibKNhrUNfR64dO9Xa6cU2';
let accessToken;



const Yelp = {
    getAccessToken: function(){
        if(accessToken){
            return new Promise(resolve => resolve(accessToken));
        }
        return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/oauth2/token?grant_type=client_credentials&client_id=${clientId}&client_secret=${secret}`, 
                      {method: 'POST'}).then(
            response => { 
                if(response.ok){
                    console.log("--------------------- response.ok");
                    return response.json();
                }
                throw new Error('Requested failed');
            }
        ).then(jsonResponse =>{ 
            console.log("el jsonResponse -------------");
            console.log(jsonResponse)
            accessToken = jsonResponse.access_token; });
    },
    search: function(term, location, sortBy){

        return Yelp.getAccessToken().then(() => { 
                    return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`,
                                { headers: {Authorization: `Bearer ${accessToken}`}
                    });
            }).then(jsonResponse =>{
                if(jsonResponse.businesses){
                    return jsonResponse.businesses.map(business => {
                        return {
                               id: business.id,
                               imageSrc: business.image_url,
                               name: business.name,
                               address: business.location.address1,
                               city: business.location.city,
                               state: business.location.state,
                               zipCode: business.location.zipCode,
                               category: business.categories,
                               rating: business.rating,
                               reviewCount: business.review_ount
                            }
                    });
                }//if 
            })
    }//search
};

export default Yelp;
