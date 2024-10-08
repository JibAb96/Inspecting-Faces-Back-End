
const returnClarifaiRequestOption = (imageURL) => {
    const PAT = '32b5a7739849494480ba1a6bc8f25fd8';
    const USER_ID = 'jibab96';
    const APP_ID = 'Inspecting-Faces';
    const IMAGE_URL = imageURL;
  
    const raw = JSON.stringify({
      "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
      },
      "inputs": [
        {
          "data": {
            "image": {
              "url": IMAGE_URL
  
            }
          }
        }
      ]
    });
    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
      },
      body: raw
    };
    return requestOptions
  }

const handleApiCall = (req, res) => {
    fetch("https://api.clarifai.com/v2/models/face-detection/outputs", 
      returnClarifaiRequestOption(req.body.input))
      .then(res => res.json())
    .then(data => {
        res.json(data)
    }).catch(err => res.status(400).json("unable to work with api"))
}


const imageRequest = (req, res, db) => {
    const { id } = req.body;
    db("users").where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then(entries => {
        res.json(entries[0].entries)
    })
    .catch(err => res.status(400).json("unable to get entries"))
    
}

export {imageRequest, handleApiCall}