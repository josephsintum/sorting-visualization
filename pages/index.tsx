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

const mergeSort = async (data: number[], setArray) => {
    if (data.length <= 1) return data
    let mid = Math.floor(data.length / 2),
        left = await mergeSort(data.slice(0, mid), setArray),
        right = await mergeSort(data.slice(mid), setArray)

    let result = merge(left, right)
    await timer(500 / data.length)
    setArray([...result])
    return result
}

const merge = (arr1: number[], arr2: number[]) => {
    let sorted = []
    while (arr1.length && arr2.length) {
        if (arr1[0] < arr2[0]) sorted.push(arr1.shift())
        else sorted.push(arr2.shift())
    }
    return sorted.concat(arr1.slice().concat(arr2.slice()))
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
                mergeSort(array, setData).then(() => {
                    setSorting(false)
                })
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
