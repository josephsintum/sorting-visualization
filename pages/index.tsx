import * as React from 'react';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import {Grid} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";


export default function Index() {

    const [sortAlgo, setSortAlgo] = React.useState("bubble")
    const [value, setValue] = React.useState<number>(30);

    return (
        <Container maxWidth="lg">
            <Grid container spacing={2} style={{margin:"50px"}}>
                <Grid item xs={4}>
                    <Box>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Sort Algorithms</FormLabel>
                            <RadioGroup aria-label="SortAlgo" name="sortAlgo" value={sortAlgo}
                                        onChange={(e) => setSortAlgo(e.target.value)}>
                                <FormControlLabel value="bubble" control={<Radio/>} label="Bubble"/>
                                <FormControlLabel value="merge" control={<Radio/>} label="Merge"/>
                                <FormControlLabel value="quick" control={<Radio/>} label="Quick"/>
                                <FormControlLabel value="heap" control={<Radio/>} label="Heap"/>
                            </RadioGroup>
                        </FormControl>
                    </Box>
                    <Box>
                        <Slider value={value}
                                onChange={(e, newValue) => setValue(newValue as number)}
                                valueLabelDisplay="auto"
                                min={10}
                                max={110}
                                aria-labelledby="continuous-slider"/>
                    </Box>

                    <Box>
                        <Button variant="contained" color="primary">
                            Sort
                        </Button>
                    </Box>
                </Grid>
                <Grid item sm={8}>

                </Grid>
            </Grid>
        </Container>
    );
}
