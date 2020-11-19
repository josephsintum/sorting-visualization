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

const generateData = (value: number) => Array.from(Array(value)).map(() => Math.floor(Math.random() * 110))

const timer = (ms: number) => new Promise(res => setTimeout(res, ms))

const bubbleSort = async (data: number[], setArray) => {
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < (data.length - i); j++) {
            if (data[j] > data[j + 1]) {
                [data[j], data[j + 1]] = [data[j + 1], data[j]]
                await timer(500 / data.length)
                setArray([...data])
            }
        }
    }
}

const mergeSort = async (mainArray: number[], start: number, end: number, auxArray: number[], setArray) => {
    if (start === end) return
    let middle = Math.floor((start + end) / 2)
    await mergeSort(auxArray, start, middle, mainArray, setArray)
    await mergeSort(auxArray, middle + 1, end, mainArray, setArray)
    await merge(mainArray, start, middle, end, auxArray, setArray)
}

const merge = async (mainArray: number[], start: number, middle: number, end: number, auxArray: number[], setArray) => {
    let k = start, i = start, j = middle + 1
    while (i <= middle && j <= end) {
        if (auxArray[i] <= auxArray[j]) mainArray[k++] = auxArray[i++]
        else mainArray[k++] = auxArray[j++]
        await timer(500 / mainArray.length)
        setArray([...mainArray])
    }
    while (i <= middle) {
        mainArray[k++] = auxArray[i++]
        await timer(500 / mainArray.length)
        setArray([...mainArray])
    }
    while (j <= end) {
        mainArray[k++] = auxArray[j++]
        await timer(500 / mainArray.length)
        setArray([...mainArray])
    }
}


export default function Index() {

    const [algorithm, setAlgorithm] = React.useState('merge')
    const [value, setValue] = React.useState<number>(30)
    const [data, setData] = React.useState<number[]>([])
    const [sorting, setSorting] = React.useState(false)
    // const [index, setIndex] = React.useState([-1, -1])   // todo: index array sorting

    React.useEffect(() => {
        setData(generateData(value))
    }, [value])

    const sort = () => {

        let array = [...data]

        switch (algorithm) {
            case 'bubble':
                setSorting(true)
                bubbleSort(array, setData).then(() => {
                    setSorting(false)
                })
                break
            case 'merge':
                setSorting(true)
                mergeSort(array, 0, array.length - 1, [...array], setData)
                    .then(()=> setSorting(false))

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
            <Grid container spacing={5} style={{ margin: '30px auto' }}>
                <Grid item xs={4}>
                    <Box mb={2}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Sort Algorithms</FormLabel>
                            <br />
                            <RadioGroup aria-label="SortAlgo" name="sortAlgo" value={algorithm}
                                        onChange={(e) => setAlgorithm(e.target.value)}>
                                <FormControlLabel value="bubble" control={<Radio />} label="Bubble" />
                                <FormControlLabel value="merge" control={<Radio />} label="Merge" />
                                <FormControlLabel value="quick" control={<Radio />} label="Quick" disabled />
                                <FormControlLabel value="heap" control={<Radio />} label="Heap" disabled />
                            </RadioGroup>
                        </FormControl>
                    </Box>
                    <Box mb={2}>
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
                             mr="1px"
                             style={{
                                 backgroundColor: '#2196f3',
                                 height: (value * 3),
                                 flexGrow: 1,
                             }}
                        />)}
                </Grid>
            </Grid>
        </Container>
    )
}
