import axios from "axios" ;

export default async function handler(req, res) {

    if(req.method !== "POST" ){
        return res.status(405).json({message:"only posts requests are allowed"})
    }

    const { checkIn,checkOut,residency,language,longitude,latitude,radius,currency} = req.body;
    // const { adults,children } = req.body;

    const guests = [
      {
          adults:req.body.adults,
          children: req.body.children
      }
    ]

  if( !checkIn || !checkOut || !residency || !language || !longitude || !latitude || !radius || !currency || !guests ){
        return res.status(400).json({message:"missing required fields"})
  }

  const url = process.env.open_cage_url;
  const username =  process.env.open_cage_username ;
  const password =  process.env.open_cage_password ;

  try{

    const response = await axios.post(url,{
      checkIn,checkOut,residency,language,longitude,latitude,radius,currency,guests
    },

    {
      headers:{
        'Content-Type':"application/json",
        Authorization:  `Basic ${Buffer.from( `${username}:${password}`).toString('base64')}` 
      }
    }

  )
      return res.status(200).json(response.data);
  
  }

  catch(err){
    return res.status(500).json({
      error: err.reponse?.data.error || err.message || "Failed to fetch data from World OTA API"
    })
  }

  }