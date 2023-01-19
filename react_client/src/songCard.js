import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';


export default function SongCard(props) {
  return (
    <Card sx={{ width: "100%", justifyContent: 'center' }}>
      <CardContent>
        <Typography  color="text.secondary" gutterBottom variant="h6">
          Singer: {props.document._source.Singer}
        </Typography>
        <Typography variant="h5" component="div">
          Song: {props.document._source["Name"]}
        </Typography>
        <Typography  color="text.secondary" gutterBottom variant="h6">
          Lyricist: {props.document._source.Lyricist}
        </Typography>
        <Typography  color="text.secondary" gutterBottom variant="h6">
          Composer: {props.document._source["Music Composer"]}
        </Typography>
        
        <Grid container direction='row'>
            <Grid item xs={2}>
                Metaphor
            </Grid>
            <Grid item xs={10}>
            {props.document._source.Metaphor}
            </Grid>
        </Grid>
        

        <Grid container direction='row'>
            <Grid item xs={2}>
                Interpretation
            </Grid>
            <Grid item xs={10}>
            {props.document._source.Interpretation}
            </Grid>
        </Grid>

        <Grid container direction='row'>
            <Grid item xs={2}>
                Source
            </Grid>
            <Grid item xs={10}>
            {props.document._source['Source Domain']}
            </Grid>
        </Grid>

        <Grid container direction='row'>
            <Grid item xs={2}>
                Target
            </Grid>
            <Grid item xs={10}>
            {props.document._source['Target Domain']}
            </Grid>
        </Grid>

        <Grid container direction='row'>
            <Grid item xs={2}>
                Lyrics
            </Grid>
            <Grid item xs={10}>
            {props.document._source['Lyrics']}
            </Grid>
        </Grid>

        <Typography variant="body2">
        </Typography>
      </CardContent>
      <CardActions>
       
      </CardActions>
    </Card>
  );
}