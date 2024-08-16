import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
// import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { slectSubject } from './booksApp/rtkquery/BooksSubjectSlice';
import HomeIcon from '@mui/icons-material/Home';
import { keyframes, styled } from '@mui/system';
import { Link, useLocation } from 'react-router-dom';
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateX(-10px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

// Styled components
const StyledBreadcrumbs = styled(Breadcrumbs)`
  padding: 8px 16px;
  background-color: #f0f0f0;
  border-radius: 4px;
  
`;

const StyledLink = styled(Link)`
  font-size: 16px;
  color: black;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
  animation: ${fadeIn} 0.5s ease-in-out;
  `;




export default function BasicBreadcrumbs() {
  const subjects = useSelector(({ subject }) => subject.subjectsList)
  const subj = useSelector(({ subject }) => subject.subject)
  const { pathname } = useLocation()
  const disptach = useDispatch()

  return (
    <StyledBreadcrumbs sx={{ postion: 'sticky' }} aria-label="breadcrumb" maxItems={2} >
      {/* <StyledLink> */}
      <HomeIcon fontSize="small" />
      {/* </StyledLink> */}
      {subjects?.map((s, ind) => {
        return <StyledLink
          sx={{ color: subj === s ? 'blue' : 'inhereit' }}
          onClick={() => disptach(slectSubject(s))}
          key={ind} underline="hover"
          color="inherit"
          to={s === "favorite" ? "/BookToBuy/Favorites?page=1" : "/BookToBuy/List?page=1"}>
          {s}
        </StyledLink>
      })}

    </StyledBreadcrumbs>
  );
}

