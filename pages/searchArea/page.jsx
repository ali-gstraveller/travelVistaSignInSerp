import { useEffect, useState } from "react";
import axios from "axios";

export default function SearchArea() {

    const [inventory, setInventory] = useState('all');
    const [language, setLanguage] = useState('en');
    const [response, setResponse] = useState(null);
    const [checkIn, setCheckIn] = useState('2024-12-25');
    const [checkOut, setCheckOut] = useState('2024-12-26');
    const [residency,setResidency] = useState('gb');
    const [longitude,setLongitude] = useState (13.38886);
    const [latitude,setLatitude]= useState(52.517036);
    const [radius, setRadius] = useState(200);
    const [adults, setAdults] = useState(2);
    const [children,setChildren] = useState() ;
    const [currency,setCurrency] = useState("EUR")
    const [guests, setGuests] = useState([{adults:2,children:[]}])
    const [city,setCity] = useState('berlin');
    const [geoData, setGeoData] = useState(null);
    const [error, setError] = useState("");
  
    
    useEffect(()=>{

        fetchGeoData();

    },[city])
    
    
    const fetchGeoData = async () => {
        setGeoData(null);
        setError("")
    
        try {
          
          const response = await fetch("api/geo", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ city })
          });
    
          const data = await response.json();
    
          if (response.ok) {
    
            setGeoData(data);
            setLongitude(data.longitude);
            setLatitude(data.latitude);
              console.log("geo data=>",data)
          }
    
          else {
            setError(data.message || "failed to get cordinates")
          }
    
        }
        catch (error) {
          setError('an error occurred')
        }
      }

      const fetchHotelInfo = async ()=> {

        try{
          const response = await axios.post('/api/search',{ checkIn,checkOut,residency,language,
            adults,children,longitude, latitude,radius,currency });
          setResponse(response.data);
          console.log('fetch hotel info response.data=>',response.data)
        }
        catch(err){
          setError(err?.res?.data?.error || err?.message  || "Something went wrong"  )
        }
          }

    return <div>
        <div style={{ marginBottom: '20px' }}>
        <label style={{color:'white'}} >
          City:
          <input
            type="text"
            value={city}
            onChange={ (e) => setCity(e.target.value) }
            style={{ marginLeft: '10px' }}
          />
        </label>
      </div>
                   <div style={{ marginBottom: '20px' }}>
        <label style={{color:'white'}} >
          Language:
          <input
            type="text"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            style={{ marginLeft: '10px' }}
          />
        </label>
      </div>

       {/* added code  */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{color:'white'}}>
          Check-In :
          <input
            type="text"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            style={{ marginLeft: '10px' }}
          />
        </label>
      </div>
      {/* */ }
             {/* added code  */}
             <div style={{ marginBottom: '20px' }}>
        <label style={{color:'white'}}>
          Check-Out:
          <input
            type="text"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            style={{ marginLeft: '10px' }}
          />
        </label>
      </div>
      {/* */ }
      {/* added code  */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{color:'white'}}>
          Residency:
          <input
            type="text"
            value={residency}
            onChange={(e) => setResidency(e.target.value)}
            style={{ marginLeft: '10px' }}
          />
        </label>
      </div>
      {/* */ }
      {/* added code  */}
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{color:'white'}}>  Guests:   </h3>

        <label style={{color:'white'}}  >
          Adults:
          <input
            type="text"
            value={adults}
            onChange={(e) => setAdults(e.target.value)}
            style={{ marginLeft: '10px' }}
          /> <br/>
        </label>
        <label style={{color:'white'}}>
          Children:
          <input
            type="text"
            value={children}
            onChange={(e) => setChildren(e.target.value)}
            style={{ marginLeft: '10px' }}
          />
        </label>
      </div>
      {/* */ }
       {/* added code  */}
       <div style={{ marginBottom: '20px' }}>
        <label style={{color:'white'}}>
          currency:
          <input
            type="text"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            style={{ marginLeft: '10px' }}
          />
        </label>
      </div>
      {/* */ }
             {/* added code  */}
             <div style={{ marginBottom: '20px' }}>
        <label style={{color:'white'}}>
          radius:
          <input
            type="text"
            value={radius}
            onChange={(e) => setRadius(e.target.value)}
            style={{ marginLeft: '10px' }}
          />
        </label>
      </div>  
            <button  style={{ borderRadius:"15px", padding:'9px'}}> Submit </button>    
          

<button onClick={fetchHotelInfo} style={{ padding: '10px 20px' }}>
Fetch Info
</button>

<div style={{ marginTop: '20px' }}>


{error && <p style={{ color: 'red' }}>Error: {error}</p>}
  
  {/* {response && (
  <pre style={{ background: '#f4f4f4', padding: '10px' }}>
    {JSON.stringify(response, null, 2)}
  </pre> 
) 
 }   */}

 { response && 

    <div>

          <h1> These are available hotels       </h1>

          { 
          response.data.hotels.map(  (data)=>{
            return <div>   {data.id}   <button> book now</button>    </div> 
          }) 
          }

         {/* <a href={response.data.url}  > {response.data.url}       </a> */}

     </div>
 }


</div>
</div>

   

}