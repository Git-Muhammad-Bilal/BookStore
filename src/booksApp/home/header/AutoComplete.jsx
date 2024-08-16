import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { Avatar, Card, CardContent, CardMedia, ListItemAvatar, ListItemText, Typography, styled } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Stack, border, borderColor, borderRadius, display, height, maxHeight, textAlign } from '@mui/system';
import useDebounce from '../../costomHooks/UseDebounce';
import { useLazyFetchBooksForAutoCompleteQuery } from '../../rtkquery/BooksListSlice';
import { Login } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';

const StyledAutocomplete = styled(Autocomplete)(({ theme }) => {
  return ({
    '&.MuiAutocomplete': {
      height: '700px',
      backgroundColor: 'blue'
    },

    '& .MuiInputBase-input': {
      color: theme.palette.common.white,
    },

    '& .MuiOutlinedInput-root': {
      '& fieldset': {
       
        borderColor: '#455a64',

      },
      '&:hover fieldset': {
        borderColor: 'white'

      },
    },
    boxShadow: theme.shadows[2],
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#455a64',
    minWidth: '40%',
    borderRadius: '3px',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  });
});

const TextFieldDiv = styled(TextField)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    marginLeft: '3px',
    transition: theme.transitions.create('width'),
    height: '5px',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 1),
  color: 'white',
  display: 'flex',
  alignItems: 'center',

}));


export default function MyAutocomplete({ setSerVal, SetOpenSerachBarForSmScreen }) {
  const [open, setOpen] = useState(false);
  const [val, setVal] = useState('');

  const debouncedVal = useDebounce(val, 500);
  const [fetchBooks, result] = useLazyFetchBooksForAutoCompleteQuery()
  const books = result.currentData?.docs || []
  const navigate = useNavigate()
  const searchBooks = (e) => {
    let value = e?.target?.value
    setVal(value)
    setSerVal(value)
    if (e?.type === 'enter') {
      setSerVal(debouncedVal)
      setVal('')
    }
  }
  useEffect(() => {

    if (debouncedVal) {
      fetchBooks(debouncedVal)
    }
  }, [debouncedVal])


const renderOption = (props, book, state) => {
    if (!book) {
      return;
    }
    return (
      <li {...props} >

        <Stack direction={'row'} gap={2} columnGap={3} alignItems={'center'}>
          <Card sx={{ boxShadow: 4, width: '40px' }} >
            <CardMedia
              sx={{ boxShadow: 3, m: 'auto', width: 50, height: 50 }}
              image={book?.cover_i ? `https://covers.openlibrary.org/b/id/${book?.cover_i}.jpg` : 'https://openlibrary.org/images/icons/avatar_book-sm.png'}
              title={book?.title}
              alt={'not found'}
            />
          </Card>
          <Box>

            <Typography overflow={'hidden'} variant="p"  >
              {book?.title}
            </Typography>
          </Box>
        </Stack>
      </li>
    );
  }

  function handleOptionSelect(_, book) {
    let id = book.key?.replace('/works/', '')
    navigate(`/BookToBuy/Book/${id}`)
    SetOpenSerachBarForSmScreen(false)

  }
  return (
    <>
      {

        <StyledAutocomplete
          id="asynchronous-demo"
          open={open}
          onOpen={() => {
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
          }}
          isOptionEqualToValue={(book, val) => {
            if (book.tile === val) {
              return book.title

            }
          }}
          getOptionLabel={(book) => {
            if (result.status === 'rejected') {
              return 'not found'
            }
            return book.title

          }}

          options={books}
          onChange={handleOptionSelect}
          onInputChange={(e) => {
            searchBooks(e)
          }}
          loading={result?.isLoading}
          renderInput={(params) => (
            <TextFieldDiv
              value={val}
              sx={{ color: 'white' }}
              {...params}
              label="serch books"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment >
                    {result?.isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                    {
                      open ||
                      <SearchIconWrapper>
                        <SearchIcon />
                      </SearchIconWrapper>
                    }
                  </React.Fragment>
                ),
              }}
              InputLabelProps={{
                style: { color: 'white', fontSize: '14px', marginTop: '-6px' }
              }}


            />
          )}
          renderOption={renderOption}
        />
      }
    </>
  );
}

