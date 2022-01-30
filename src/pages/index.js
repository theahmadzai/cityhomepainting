/** @jsx jsx */
import { jsx, useThemeUI, Grid, Box, Heading } from 'theme-ui'
import { StaticImage } from 'gatsby-plugin-image'
import Layout from '../components/layout'

const IndexPage = () => {
  const { theme } = useThemeUI()

  return (
    <Layout>
      <Grid marginTop={4} columns={[1, '1fr 3fr']}>
        <Box p={2}>
          <Heading as="h1" sx={{ fontSize: '1.5rem' }}>
            City Home Painting
          </Heading>
        </Box>
      </Grid>
    </Layout>
  )
}

export default IndexPage
