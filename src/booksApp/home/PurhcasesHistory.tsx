import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Container, Stack, styled } from '@mui/system';
import { Card, CardMedia, InputBase } from '@mui/material';
import axiosApi from '../axiosApi/AxiosApi';

const HistoryContainer = styled('div')(({ theme }) => ({
    margin: 'auto',
    marginTop: '100px',
    width: '90%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '30px'
    
}));

const PurchaseWrapper = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '30px'
}));



export default function PurhcasesHistory() {
    const [purhcases, setPurchases] = useState([])
    const [total, setTotal] = useState(0)
    let to = 0

    const getPurhcases = async () => {
        const { data } = await axiosApi.get('getPurhchases')

        setPurchases(data);
    }

    useEffect(() => {
        getPurhcases()
    }, [])

    const removePurhcaseFromHistory = async (id) => {
        const { data } = await axiosApi.get(`removePurhcaseHistory/${id}`)

        setPurchases(data);

    }

    return (
        <>
            <HistoryContainer>
            <Typography variant='h6'  >
                Total Purchases! {total}
            </Typography>
                <PurchaseWrapper>

                {
                    purhcases?.map((purhcase, ind) => {
                        const { title, price, quantity, _id, image, time, date } = purhcase
                        to += price
                        ind === purhcases.length - 1 && !total && setTotal(to)

                        return <Card key={_id} sx={{ width: '460px', height: 100 }}  >
                            <Stack direction="row" alignItems={'start'} >
                                <Box>
                                    <CardMedia
                                        sx={{ width: 80, height: 100 }}
                                        image={image ? `https://covers.openlibrary.org/b/id/${image}.jpg` : 'https://openlibrary.org/images/icons/avatar_book-sm.png'}
                                        title={title}
                                    />

                                </Box>
                                <Box width={'100%'} display={'flex'} flexDirection={'column'} alignItems={'start'} pl={2} gap={2}>

                                    <Stack height={56} width={'94%'} direction={'row'} alignItems={'start'} justifyContent={'space-between'} >
                                        <Box>
                                            <Typography gutterBottom  fontSize={14} >
                                                {title}
                                            </Typography>

                                            <Typography fontSize={14} >
                                                $ {price}
                                            </Typography>

                                            <Typography variant="body2" color="text.secondary">
                                                {time}
                                            </Typography>



                                            <Typography variant="body2" color="text.secondary">
                                                {date}
                                            </Typography>
                                        </Box>
                                        <Button onClick={() => removePurhcaseFromHistory(_id)}
                                            sx={{ fontSize: 9, minWidth: '20px' }}
                                            variant='contained'
                                            size="small"
                                            color='primary'
                                            > X
                                        </Button>
                                    </Stack>

                                </Box>

                            </Stack>


                        </Card>
                    })
                }

                </PurchaseWrapper>
            </HistoryContainer>
        </>

    )
}