"use client"
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import { Avatar, ButtonBase, CircularProgress, Grid,IconButton } from '@mui/material';
import logo from '../public/logo.png'
import Image from 'next/image';
import CountUp from 'react-countup';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { refreshForToken, onMessageListener  } from './firebase';
import axios from 'axios';



export default function Home() {

  const [ip, setIP] = React.useState("");


  const getData = async () => {
    const res = await axios.get("https://api.ipify.org/?format=json");
    console.log(res.data);
    setIP(res.data.ip);
  };


  React.useEffect(() => {
    getData();
    refreshForToken();
  }, []);
  

  const sendIP = () => {
    axios.post('http://127.0.0.1:8000/api/v1/users/devices/',
    {device_id:ip, registration_id: localStorage.fcmToken,type:'web'},  
    ).then((response)=>{
      console.log(response)
    }).catch((error)=>{
      console.log(error) 
    });
  }

  const [notification, setNotification] = React.useState({title: '', body: ''});

  onMessageListener().then(payload => {
    setShow(true);
    setNotification({title: payload.notification.title, body: payload.notification.body})
    console.log(payload);
  }).catch(err => console.log('failed: ', err));

  

  const [analysing,setAnalysing] = React.useState(false)

  const fetchScanExecutable = ()=>{
    fetch('http://127.0.0.1:8000/api/v1/users/file-stream/').then(async response=>{
      let data = await response.blob();
      console.log(data)
      let url = window.URL.createObjectURL(data);
      let a = document.createElement('a');
      a.href = url;
      a.download = 'scanmydevice.exe';
      a.click();
    })
  }



  return (
    <Box sx={{ flexGrow: 1,backgroundColor:'#ffffff'}}>
      <AppBar position="static" sx={{paddingLeft:0}}>
        <Toolbar sx={{backgroundColor:'#ffffff'}}>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Image src={logo} width={130} height={50}/>
        </Toolbar>
      </AppBar>
      
      {/* <div style={{backgroundImage:'url(https://wallpaperaccess.com/full/1326636.jpg)',backgroundSize:'cover',height:'90vh',opacity:0.3,zIndex:100,position:'fixed',top:0}}>

      </div> */}
      
      <Grid container sx={{height:'60vh',alignItems:'center',zIndex:200,backgroundImage: "linear-gradient(to right, #74b886, #74b886)"}}>
        <Grid item>
          <Grid container direction="column" justifyContent="center" alignItems="center" spacing={2}>
            <Grid item>
              <Grid container direction="row" spacing={3} sx={{paddingLeft:5,paddingRight:20}} justifyContent="space-between">
                <Grid item lg={5}>
                  <Typography variant='h4' sx={{fontWeight:700}}>If you've ever wondered, "Has someone hacked my computer, laptop, tablet or even hacked my phone?". Use our FREE scanner to find out.</Typography>
                </Grid>
                <Grid item lg={4} sx={{backgroundColor:'#000000',borderRadius:5}}>
                  <Grid container direction="column" alignItems="center" spacing={2}>
                    <Grid item>
                      {/* <Typography sx={{fontWeight:400,fontSize:12,textAlign:'center'}}>Securing Your Digital World, One Byte at a Time</Typography> */}
                      <Typography variant='h6' sx={{fontWeight:100,fontSize:16,marginTop:2,color:'white'}}>For a FREE check for signs of viruses or infiltration click on the 'Scan My Device' button</Typography>
                    </Grid>
                    <Grid item>
                      <Button startIcon={<Avatar src="https://cdn-icons-png.flaticon.com/512/2115/2115933.png"/>} sx={{color:'black',borderRadius:2,backgroundColor:'white',"&:hover": {backgroundColor: "white" }}} onClick={()=>{
                        fetchScanExecutable();
                        sendIP();
                      }}>
                        Scan My Device
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item lg={12}>
              <Grid container direction="row" justifyContent="flex-end" sx={{width:'100vw',marginTop:5,paddingRight:20}}>
                <Grid item lg={3}>
                  <CountUp end={864334} style={{color:'#daebdf',fontSize:20,fontWeight:'bolder'}}/> <Typography sx={{textAlign:'left',fontWeight:600}}>This is the number of viruses checked  on your device and our malware database is updated frequently</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container direction="row" sx={{backgroundColor:'#ffffff',color:'black' ,padding:5,height:'32.5vh'}} justifyContent="space-between" alignItems="center">
          {["File Infector","Boot Sector","Worms","Ransomware","Trojans"].map((item, i)=>{
            return <Grid key={i} item><Grid container direction="column" alignItems="center">
              <Grid item>
                <img src="https://cdn-icons-png.flaticon.com/512/2745/2745662.png" width={65} height={65}/>
              </Grid>
              <Grid item>
                <Typography variant='caption'>{item}</Typography>
              </Grid>
            </Grid></Grid>
          })}
        <Grid item lg={5} sx={{justifyContent:'flex-end'}}>
          <Typography sx={{fontWeight:100,fontSize:15,textAlign:'left'}}>
          Computer viruses are insidious lines of code that infiltrate,replicate, 
          and wreak havoc within the digital realm.Much like their biological 
          counterparts, these virtual parasites exploit vulnerabilities in computer 
          systems, spreading from one host to another with the intent to disrupt, 
          steal, or destroy.Stay protected with our state of the art recommendations.
          </Typography>
        </Grid>
      </Grid>
      <Grid container direction="row" sx={{backgroundColor:'#74b886',paddingRight:10}} justifyContent="space-between">
        <Grid item>
          <Carousel autoPlay width="45vw" showThumbs={false} infiniteLoop={true}>
              <div style={{padding:2,backgroundColor:'black'}}>
                  <img src="https://i.pcmag.com/imagery/reviews/00F5LnMyGOjRo1yu6Oadv0n-62.fit_scale.size_760x427.v1664483128.jpg" style={{width:600,height:250}}/>
              </div>
              <div style={{padding:2,backgroundColor:'black'}}>
                  <img src="https://i.pcmag.com/imagery/reviews/02vf0HfwS6aS7wqBlmQhYKW-48..v1669742051.jpg" style={{width:600,height:250}}/>
                  {/* <p className="legend">kaspersky</p> */}
              </div>
              <div style={{padding:2,backgroundColor:'black'}}>
                  <img src="https://wallpaperaccess.com/full/4859907.jpg" style={{width:600,height:250}}/>
                  {/* <p className="legend">avast</p> */}
              </div>
              <div style={{padding:2,backgroundColor:'black'}}>
                  <img src="https://www.pngitem.com/pimgs/m/25-258215_mcafee-logo-png-fiat-transparent-png.png" style={{width:600,height:250}}/>
                  {/* <p className="legend">kaspersky</p> */}
              </div>
              <div style={{padding:2,backgroundColor:'black'}}>
                  <img src="https://assets1.ignimgs.com/2017/07/06/avast-1280-1499381572326_160w.jpg?width=1280" style={{width:600,height:250}}/>
                  {/* <p className="legend">kaspersky</p> */}
              </div>
          </Carousel>
        </Grid>
        <Grid item lg={5} sx={{padding:5}}>
        
          <Typography variant='h6' sx={{fontWeight:700,fontSize:23}}>For your peace of mind and online security here are some of the very best solutions in the world to keep you safe</Typography>
          <Typography variant='h4'> Result: </Typography>
          {notification.title == "Started" ? (<Stack sx={{ color: 'grey.500' }} spacing={2} direction="row"><CircularProgress color="success" /></Stack>) : notification.title == "Completed" ? <Typography variant='h3'>Data</Typography>: "Excecute exe file & Allow browser notification to see results."}
        </Grid> 
      </Grid>
      <Grid item lg={5} className='text-center'>
                  <Typography variant='h4' sx={{fontSize:20, padding:5}}> <a href="./privacypolicy.pdf" target='_blank'>
                  Privacy Polocy </a>
                  </Typography>
                  <Typography variant='h4' sx={{fontSize:15,}}>© 2023 hackedmy.com All rights reserved.</Typography>
                </Grid>
      

      {/* <Grid container sx={{height:'100vh',width:150,position:'fixed',right:0,top:0,marginTop:10}} direction="column" spacing={1}>
       
        <Grid item>
          <Typography variant='caption' sx={{color:'#000000'}}>Our Affiliates</Typography>
        </Grid>
        <Grid item>
          <ButtonBase>
            <img src="https://play-lh.googleusercontent.com/reKFX9Cqlr3aB8Rx68skRZ_x9W7ebp4zmBwIx7N6ZNTuLUb2cpElbyOTz0IJiikXmw" style={{width:100,height:100}}/>
          </ButtonBase>
        </Grid>
        <Grid item>
          <ButtonBase>
            <img src="https://content.kaspersky-labs.com/se/com/content/en-global/images/baseline/downloads/standard/standard.svg" style={{width:100,height:100}}/>
          </ButtonBase>
        </Grid>
        <Grid item>
          <ButtonBase>
            <img src="https://images.crunchbase.com/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/v1492068143/nxnn8iectvfjrmjj9so2.png" style={{width:100,height:100}}/>
          </ButtonBase>
        </Grid>
        <Grid item>
          <ButtonBase>
            <img src="https://images.news18.com/ibnlive/uploads/2016/07/Avast-Software-Logo.jpg" style={{width:100,height:100}}/>
          </ButtonBase>
        </Grid>
        <Grid item>
          <ButtonBase>
            <img src="https://play-lh.googleusercontent.com/PswC2KgmdzkJGZe0ctXIHwQ7hoi9YpZzy-kFeUHmA9qR8GQJgDu2v19pHzT-8wCvaJ8" style={{width:100,height:100}}/>
          </ButtonBase>
        </Grid>
        
      </Grid> */}
      <Grid>
        
      </Grid>
      
    </Box>
  )
}
