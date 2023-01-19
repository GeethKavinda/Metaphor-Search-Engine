//in client/src/App.js
import axios from 'axios';
import { useState,useEffect } from 'react';
import './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Button, Checkbox, FormControlLabel, FormGroup, Grid, TextField } from '@mui/material';
import LeftPanel from './leftPanel';
import SongCard from './songCard';

const App = () => {
  const [query,setQuery] = useState('')
  const [documents,setDocuments] = useState([])
  const [matchAll, setmatchAll] = useState(true);
  const [name, setName] = useState(true);
  const [lyrics, setLyrics] = useState(true);
  const [lyricist, setLyricist] = useState(true);
  const [singer, setSinger] = useState(true);
  const [genre, setGenre] = useState(true);
  const [musicComposer, setMusicComposer] = useState(true);
  const [metaphor, setMetaphor] = useState(true);
  const [interpretation, setIntepretation] = useState(true);
  const [sourceDomain, setSourceDomain] = useState(true);
  const [targetDomain, setTargetDomain] = useState(true);
  
  const [disableMatchingFields, setDisableMatchingFields] = useState(true);
  const [filter, setfilters] = useState([]);
  const [isFiltersLoaded, setIsFiltersLoaded] = useState(false);
  const [filterChecked, setFiltersChecked] = useState([]);
  const [filtersSet,setFiltersSet]= useState(false)

  function changeFilterChecked (filtersArray){
    var newFilterArray = []
    //console.log(filtersArray,filtersArray.length)
    for (var fil = 0;fil<filtersArray.length;fil++){
      const keys = Object.keys(filtersArray[fil])
      
      const values = filtersArray[fil][keys[0]]
      //console.log(values)
      const arr = []
      for (var val=0;val<values.length;val++){
        arr.push(false)

      }
      const obj = {}
      obj[keys[0]]=arr
      newFilterArray.push(obj)
    }
    setFiltersChecked(newFilterArray)
    
  }
  useEffect(()=>{
    getFilterData()
  },[])

  useEffect(()=>{
    if(isFiltersLoaded && filter.length>0 && filterChecked.length>0){
      sendSearchSongRequest()
    }
    
  },[filter,filterChecked])

 

  useEffect(() => {
    if(isFiltersLoaded){
      
      changeFilterChecked(filter)
      setFiltersSet(true)
    }
  },[isFiltersLoaded]);
  
  

  const changeMatchAll = (allVal)=>{
    if(allVal == true){
      setDisableMatchingFields(false)
      setmatchAll(false)
      setName(false)
      setLyrics(false)
      setLyricist(false)
      setSinger(false)
      setGenre(false)
      setMusicComposer(false)
      setMetaphor(false)
      setIntepretation(false)
      setSourceDomain(false)
      setTargetDomain(false)
    }
    else{
      setDisableMatchingFields(true)
      setmatchAll(true)
      setName(true)
      setLyrics(true)
      setLyricist(true)
      setSinger(true)
      setGenre(true)
      setMusicComposer(true)
      setMetaphor(true)
      setIntepretation(true)
      setSourceDomain(true)
      setTargetDomain(true)
    }
  }

  const getMatchResults =()=>{
    var mResults=[]
    if(name){
      mResults.push('Name')
    }
    if(lyrics){
      mResults.push('Lyrics')
    }
    if(lyricist){
      mResults.push('Lyricist')
    }
    if(singer){
      mResults.push('Singer')
    }
    if(genre){
      mResults.push('Genre')
    }
    if(musicComposer){
      mResults.push('Music Composer')
    }
    if(metaphor){
      mResults.push('Metaphor')
    }
    if(interpretation){
      mResults.push('Interpretation')
    } 
    if(sourceDomain){
      mResults.push('Source Domain')
    } 
    if(targetDomain){
      mResults.push('Target Domain')
    } 
    return mResults
  }

  const getFinalFilters = ()=>{
    var filtersObj = {}
    console.log(filterChecked)
    for (var t=0; t<filter.length;t++){
      const key = Object.keys(filter[t])
      var checkedVal = filterChecked[t][key[0]]
      var filtVal = filter[t][key[0]]
      var array =[]
      for (var v =0;v < checkedVal.length; v++){
        if(checkedVal[v]==true){
          array.push(filtVal[v]['key'])
        }
      }
      filtersObj[key[0]+'.keyword'] = array
    }
    return filtersObj

  }

  const getFilterData = () => {
    const results = {
      method: 'GET',
      url: 'http://localhost:3001/filters',
    };
    axios
      .request(results)
      .then((response) => {

        
        const keys = Object.keys(response.data)
        
        const newArrayF = []
        for(var c=0;c<keys.length;c++){
          var newObj = {}
          newObj[keys[c].slice(0,keys[c].length-8)] = response.data[keys[c]]
          newArrayF.push(newObj)
        }
        
        setfilters(newArrayF)

        setIsFiltersLoaded(true)
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const sendSearchSongRequest = () => {
    var queryObject = {}
    const search = query
    const matchResults = getMatchResults()
    const finalFilters = getFinalFilters()
    queryObject['search'] = search
    queryObject['matchResults'] = matchResults

    queryObject['filters']=finalFilters

    const newObj = JSON.stringify(queryObject)
    console.log("searching ", newObj)

    const results = {
      method: 'GET',
      url: 'http://localhost:3001/results',
      params: {
        searchQuery: newObj
      },
    };
    axios
      .request(results)
      .then((response) => {
        console.log("data",response.data);
        setDocuments(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  function setQueryVal(e){
    setQuery(e.target.value)
  }

  return (
    <div className='ap'>
      <div>
          <div> 
            <AppBar position="static" sx={{backgroundColor:"#9500ae"}}>
              <Toolbar sx={{fontSize: "25px"}}>
                Geegle        
              </Toolbar>
            </AppBar>
              <Grid container
                direction="row"
                justifyContent="space-around"
                alignItems="center"
                sx={{marginTop:"60px"}}>
                <Grid item sx={{width:"1000px"}}>
                <TextField id="outlined-basic" label="Search Here......." variant="outlined" fullWidth onChange={setQueryVal}/>
                </Grid>
                <Grid item>
                <Button variant="contained" onClick={sendSearchSongRequest} sx={{backgroundColor:"#dd33fa" ,'&:hover': {
      backgroundColor: '#9500ae',
      color: '#fff'}}}>Search</Button>
                </Grid>
              </Grid>

              <Grid container direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                sx={{marginTop: '20px'}}>
                <Grid item>
                  Matching Fields: 
                </Grid>
                <Grid item>
                <FormGroup>
                  <Grid container direction="row" justifyContent="center"
                alignItems="center">
                    <Grid item>
                    <FormControlLabel control={<Checkbox checked= {matchAll} onChange={()=>changeMatchAll(matchAll)}/>} label="All Fields" />
                    </Grid>
                    <Grid item>
                    <FormControlLabel control={<Checkbox  checked= {name} disabled={disableMatchingFields} onChange={()=>setName(!name)}/>} label="Name" />
                    </Grid>
                    <Grid item>
                    <FormControlLabel control={<Checkbox checked= {lyrics} disabled={disableMatchingFields} onChange={()=>setLyrics(!lyrics)}/>} label="Lyrics" />
                    </Grid>
                    <Grid item>
                    <FormControlLabel control={<Checkbox checked= {lyricist} disabled={disableMatchingFields} onChange={()=>setLyricist(!lyricist)}/>} label="Lyricist" />
                    </Grid>
                    <Grid item>
                    <FormControlLabel control={<Checkbox checked= {singer} disabled={disableMatchingFields}  onChange={()=>setSinger(!singer)}/>} label="Singer" />
                    </Grid>
                    <Grid item>
                    <FormControlLabel control={<Checkbox checked= {genre} disabled={disableMatchingFields} onChange={()=>setGenre(!genre)}/>} label="Genre" />
                    </Grid>
                    <Grid item>
                    <FormControlLabel control={<Checkbox checked= {musicComposer} disabled={disableMatchingFields} onChange={()=>setMusicComposer(!musicComposer)}/>} label="Composer" />
                    </Grid>
                    <Grid item>
                    <FormControlLabel control={<Checkbox checked= {metaphor} disabled={disableMatchingFields} onChange={()=>setMetaphor(!metaphor)}/>} label="Metaphor" />
                    </Grid>
                    <Grid item>
                    <FormControlLabel control={<Checkbox checked= {interpretation} disabled={disableMatchingFields} onChange={()=>setIntepretation(!interpretation)}/>} label="Interpretation" />
                    </Grid>
                    <Grid item>
                    <FormControlLabel control={<Checkbox checked= {sourceDomain} disabled={disableMatchingFields} onChange={()=>setSourceDomain(!sourceDomain)}/>} label="Source" />
                    </Grid>
                    <Grid item>
                    <FormControlLabel control={<Checkbox checked= {targetDomain} disabled={disableMatchingFields} onChange={()=>setTargetDomain(!targetDomain)}/>} label="Target" />
                    </Grid>
                  </Grid>
                  
                  
                </FormGroup>
                  
                </Grid>
                
              </Grid>

              <Grid container direction="row" justifyContent='flex-start' sx={{marginTop:'80px'}}>
                <Grid item xs={3}>
                  {filtersSet==true && filterChecked.length>0?<LeftPanel filters={filter} checkedFilters={filterChecked} setFiltersChecked={setFiltersChecked}/>:null}
                  
                </Grid>
                
                <Grid item xs={9} sx={{paddingLeft:'10%',paddingRight:'10%', }}>
                  <div >Number of Hits: {documents.length}</div>
                  <div>
                  {documents.map(function(document, i){
                            return <div>
                              <SongCard document={document}/>
                              </div>
                    })}
                  </div>
                
                  
                </Grid>
              </Grid>

          </div>
          <br></br>
        
      </div>

    </div>
  );
};

export default App;