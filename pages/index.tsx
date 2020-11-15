import * as React from 'react'
import Container from '@material-ui/core/Container'
import { Grid } from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'
import Slider from '@material-ui/core/Slider'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'

const generateData = (value) => Array.from(Array(value)).map(x => Math.floor(Math.random() * 110))

const timer = () => new Promise(res => setTimeout(res, 50))

const bubbleSort = async (array: number[], setArray) => {
    const data = [...array]
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < (data.length - i); j++) {
            if (data[j] > data[j + 1]) {
                [data[j], data[j + 1]] = [data[j + 1], data[j]]
                await timer()
                setArray([...data])
            }
        }
    }
}

export default function Index() {

    const [algorithm, setAlgorithm] = React.useState('bubble')
    const [value, setValue] = React.useState<number>(30)
    const [data, setData] = React.useState<number[]>([])
    const [sorting, setSorting] = React.useState(false)
    // const [index, setIndex] = React.useState([-1, -1])   // todo: index array sorting

    React.useEffect(() => {
        setData(generateData(value))
    }, [value])

    const sort = () => {
        switch (algorithm) {
            case 'bubble':
                setSorting(true)
                bubbleSort(data, setData).then(() => {
                    setSorting(false)
                })
                break
            case 'merge':
                console.log('to be implemented')
                break
            case 'quick':
                console.log('to be implemented')
                break
            case 'heap':
                console.log('to be implemented')
                break
            default:
                throw new Error('Choice doesn\'t exist!')
        }
    }

    return (
        <Container maxWidth="lg">
            <Grid container spacing={2} style={{ margin: '50px' }}>
                <Grid item xs={4}>
                    <Box>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Sort Algorithms</FormLabel>
                            <RadioGroup aria-label="SortAlgo" name="sortAlgo" value={algorithm}
                                        onChange={(e) => setAlgorithm(e.target.value)}>
                                <FormControlLabel value="bubble" control={<Radio />} label="Bubble" />
                                <FormControlLabel value="merge" control={<Radio />} label="Merge" disabled />
                                <FormControlLabel value="quick" control={<Radio />} label="Quick" disabled />
                                <FormControlLabel value="heap" control={<Radio />} label="Heap" disabled />
                            </RadioGroup>
                        </FormControl>
                    </Box>
                    <Box>
                        <Slider value={value}
                                onChange={(e, newValue) => setValue(newValue as number)}
                                valueLabelDisplay="auto"
                                min={10}
                                max={110}
                                aria-labelledby="continuous-slider" disabled={sorting} />
                    </Box>

                    <Box>
                        <Button variant="contained" color="primary" onClick={() => sort()} disabled={sorting}>
                            Sort
                        </Button>
                    </Box>
                </Grid>
                <Grid item sm={8}
                      container
                      justify="space-evenly"
                      alignItems="baseline"
                      direction="row">
                    {data.map((value, index) =>
                        <Box key={index}
                             style={{
                                 backgroundColor: '#2196f3',
                                 height: (value * 3),
                                 flexGrow: 1,
                                 marginRight: 2,
                             }} />)}
                </Grid>
            </Grid>
        </Container>
    )
}
