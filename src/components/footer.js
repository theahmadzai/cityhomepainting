/** @jsx jsx */
import { jsx, useThemeUI, Flex, Box, Heading, Paragraph } from 'theme-ui'

const Footer = () => {
  const { theme } = useThemeUI()

  return (
    <Flex
      as="footer"
      sx={{
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTop: `2px solid ${theme.colors.primary}`,
        paddingY: '2rem',
        gap: '4rem',
      }}
    >
      <Box>
        <Heading as="h3">About</Heading>
        <Paragraph>Address</Paragraph>
      </Box>
      <Box>
        <Heading as="h3">Contact Info</Heading>
        <Paragraph>(470)-539-3711</Paragraph>
        <Paragraph>info@pantherspainting.com</Paragraph>
      </Box>
      <Box>
        <Heading as="h3">Get in Touch</Heading>
        <Paragraph sx={{ textAlign: 'justify' }}>
          Subscribe to our RSS feed or follow us on Facebook and Twitter for the
          latest content
        </Paragraph>
      </Box>
    </Flex>
  )
}

export default Footer
