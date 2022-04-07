import { Typography } from '@mui/material';
import Footer from '../../components/Footer';
import ResidenceCard from '../../components/ResidenceCard';
import { Box, Container } from '@mui/material';

function Home() {
    return (
        <>  
            <Container component="main" maxWidth="lg">
            <Box           
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
            }}>
                <Typography variant="h5" gutterBottom component="div">Esguerra Residences</Typography>
                <Typography variant="h8" gutterBottom component="div">Note that we started collecting reviews as of 2021</Typography>
                <ResidenceCard />
            </Box>
            </Container>
            <Footer />
        </>
    );
}

export default Home;