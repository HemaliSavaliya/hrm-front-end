import Link from 'next/link'
import { Button, Typography, Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import FooterIllustrations from 'src/views/pages/misc/FooterIllustrations'

// ** Styled Components
const BoxWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    width: '90vw'
  }
}))

const Img = styled('img')(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    height: 400
  }
}))

const TreeIllustration = styled('img')(({ theme }) => ({
  left: 0,
  bottom: '5rem',
  position: 'absolute',
  [theme.breakpoints.down('lg')]: {
    bottom: 0
  }
}))

const Error404 = () => {
  return (
    <Box className='content-center'>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <BoxWrapper>
          {/* <Typography variant='h1'>404</Typography> */}
          <Typography variant='h4' sx={{ mb: 1, textTransform: 'capitalize', fontWeight: 800, color: '#9155fd' }}>
            Page Not Found ⚠️
          </Typography>
          <Typography pt={3} fontSize={18}>
            We couldn&prime;t find the page you are looking for.
          </Typography>
        </BoxWrapper>
        <Img alt='error-illustration' src='/images/pages/not-found.png' />
        <Link passHref href='/'>
          <Button variant='contained' sx={{ px: 5.5 }}>
            Back to Home
          </Button>
        </Link>
      </Box>
      <FooterIllustrations image={<TreeIllustration alt='tree' src='/images/pages/tree.png' />} />
    </Box>
  )
}
Error404.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default Error404
